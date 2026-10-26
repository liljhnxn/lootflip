// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title LootFlip
 * @notice On-chain ledger for the LootFlip mystery-box game on Botchain Testnet.
 * @dev Records box openings with client-generated randomness. The contract records
 * results and validates collectible ID and rarity integrity, but does not independently
 * generate or verify randomness.
 */
contract LootFlip {
    enum Rarity {
        COMMON,     // 0 (60% intended probability)
        RARE,       // 1 (25% intended probability)
        EPIC,       // 2 (12% intended probability)
        LEGENDARY   // 3 (3% intended probability)
    }

    struct OpeningRecord {
        uint256 openingId;
        address opener;
        uint8 collectibleId;
        Rarity rarity;
        uint64 timestamp;
    }

    // Incremental opening ID starting at 1
    uint256 private _nextOpeningId = 1;

    // Opening records indexed by opening ID
    mapping(uint256 => OpeningRecord) private _openings;

    // List of opening IDs recorded by each user wallet
    mapping(address => uint256[]) private _userOpeningIds;

    // Events
    event OpeningRecorded(
        uint256 indexed openingId,
        address indexed opener,
        uint8 indexed collectibleId,
        Rarity rarity,
        uint64 timestamp
    );

    // Custom errors
    error InvalidCollectibleId(uint8 collectibleId);
    error InvalidRarity(uint8 rarity);
    error MismatchedRarity(uint8 collectibleId, uint8 rarity);
    error OpeningNotFound(uint256 openingId);
    error IndexOutOfBounds(uint256 index, uint256 length);

    /**
     * @notice Returns the expected rarity for a valid collectible ID (1-12).
     * Collectibles 1-3: COMMON (0)
     * Collectibles 4-6: RARE (1)
     * Collectibles 7-9: EPIC (2)
     * Collectibles 10-12: LEGENDARY (3)
     */
    function getExpectedRarity(uint8 collectibleId) public pure returns (Rarity) {
        if (collectibleId >= 1 && collectibleId <= 3) {
            return Rarity.COMMON;
        } else if (collectibleId >= 4 && collectibleId <= 6) {
            return Rarity.RARE;
        } else if (collectibleId >= 7 && collectibleId <= 9) {
            return Rarity.EPIC;
        } else if (collectibleId >= 10 && collectibleId <= 12) {
            return Rarity.LEGENDARY;
        } else {
            revert InvalidCollectibleId(collectibleId);
        }
    }

    /**
     * @notice Records a mystery-box opening.
     * @param collectibleId The ID of the collectible revealed (1 to 12).
     * @param rarity The rarity of the collectible (0 = COMMON, 1 = RARE, 2 = EPIC, 3 = LEGENDARY).
     * @return openingId The newly assigned unique opening ID.
     */
    function recordOpening(uint8 collectibleId, uint8 rarity) external returns (uint256 openingId) {
        if (collectibleId < 1 || collectibleId > 12) {
            revert InvalidCollectibleId(collectibleId);
        }
        if (rarity > 3) {
            revert InvalidRarity(rarity);
        }

        Rarity expected = getExpectedRarity(collectibleId);
        if (uint8(expected) != rarity) {
            revert MismatchedRarity(collectibleId, rarity);
        }

        openingId = _nextOpeningId++;
        uint64 currentTime = uint64(block.timestamp);

        OpeningRecord memory record = OpeningRecord({
            openingId: openingId,
            opener: msg.sender,
            collectibleId: collectibleId,
            rarity: expected,
            timestamp: currentTime
        });

        _openings[openingId] = record;
        _userOpeningIds[msg.sender].push(openingId);

        emit OpeningRecorded(openingId, msg.sender, collectibleId, expected, currentTime);
    }

    /**
     * @notice Total number of openings recorded across all users.
     */
    function totalOpenings() external view returns (uint256) {
        return _nextOpeningId - 1;
    }

    /**
     * @notice Retrieve an opening record by its unique opening ID.
     */
    function getOpening(uint256 openingId) external view returns (OpeningRecord memory) {
        if (openingId == 0 || openingId >= _nextOpeningId) {
            revert OpeningNotFound(openingId);
        }
        return _openings[openingId];
    }

    /**
     * @notice Retrieve the number of openings recorded by a specific wallet.
     */
    function getUserOpeningCount(address user) external view returns (uint256) {
        return _userOpeningIds[user].length;
    }

    /**
     * @notice Retrieve a user's opening record by their history index (0 to count - 1).
     */
    function getUserOpeningByIndex(address user, uint256 index) external view returns (OpeningRecord memory) {
        uint256 len = _userOpeningIds[user].length;
        if (index >= len) {
            revert IndexOutOfBounds(index, len);
        }
        uint256 opId = _userOpeningIds[user][index];
        return _openings[opId];
    }

    /**
     * @notice Retrieve a paginated slice of user openings in reverse-chronological order (newest first).
     * @param user The wallet address.
     * @param offset Number of items to skip from the newest.
     * @param limit Maximum number of items to return.
     */
    function getUserOpenings(
        address user,
        uint256 offset,
        uint256 limit
    ) external view returns (OpeningRecord[] memory) {
        uint256 total = _userOpeningIds[user].length;
        if (offset >= total || limit == 0) {
            return new OpeningRecord[](0);
        }

        uint256 remaining = total - offset;
        uint256 size = remaining < limit ? remaining : limit;
        OpeningRecord[] memory result = new OpeningRecord[](size);

        for (uint256 i = 0; i < size; i++) {
            // Newest first: total - 1 - offset - i
            uint256 idx = total - 1 - offset - i;
            uint256 opId = _userOpeningIds[user][idx];
            result[i] = _openings[opId];
        }

        return result;
    }
}
