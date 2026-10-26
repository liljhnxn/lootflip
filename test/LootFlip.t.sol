// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {LootFlip} from "../contracts/LootFlip.sol";

// Helper contract to simulate a second user wallet
contract OpenerCaller {
    function callRecord(address target, uint8 collectibleId, uint8 rarity) external returns (uint256) {
        return LootFlip(target).recordOpening(collectibleId, rarity);
    }
}

contract LootFlipTest {
    LootFlip lootFlip;
    OpenerCaller secondUser;

    function setUp() public {
        lootFlip = new LootFlip();
        secondUser = new OpenerCaller();
    }

    function test_InitialState() public view {
        require(lootFlip.totalOpenings() == 0, "Initial openings should be 0");
    }

    function test_AllRaritiesAndCollectibles() public {
        // Common: IDs 1, 2, 3
        for (uint8 id = 1; id <= 3; id++) {
            uint256 op = lootFlip.recordOpening(id, 0);
            LootFlip.OpeningRecord memory r = lootFlip.getOpening(op);
            require(r.collectibleId == id, "Mismatch Common ID");
            require(uint8(r.rarity) == 0, "Mismatch Common Rarity");
        }

        // Rare: IDs 4, 5, 6
        for (uint8 id = 4; id <= 6; id++) {
            uint256 op = lootFlip.recordOpening(id, 1);
            LootFlip.OpeningRecord memory r = lootFlip.getOpening(op);
            require(r.collectibleId == id, "Mismatch Rare ID");
            require(uint8(r.rarity) == 1, "Mismatch Rare Rarity");
        }

        // Epic: IDs 7, 8, 9
        for (uint8 id = 7; id <= 9; id++) {
            uint256 op = lootFlip.recordOpening(id, 2);
            LootFlip.OpeningRecord memory r = lootFlip.getOpening(op);
            require(r.collectibleId == id, "Mismatch Epic ID");
            require(uint8(r.rarity) == 2, "Mismatch Epic Rarity");
        }

        // Legendary: IDs 10, 11, 12
        for (uint8 id = 10; id <= 12; id++) {
            uint256 op = lootFlip.recordOpening(id, 3);
            LootFlip.OpeningRecord memory r = lootFlip.getOpening(op);
            require(r.collectibleId == id, "Mismatch Legendary ID");
            require(uint8(r.rarity) == 3, "Mismatch Legendary Rarity");
        }

        require(lootFlip.totalOpenings() == 12, "Total openings should be 12");
        require(lootFlip.getUserOpeningCount(address(this)) == 12, "User opening count should be 12");
    }

    function test_MultipleWalletsIsolation() public {
        uint256 op1 = lootFlip.recordOpening(1, 0);
        uint256 op2 = secondUser.callRecord(address(lootFlip), 4, 1);

        require(op1 == 1, "Op 1 ID should be 1");
        require(op2 == 2, "Op 2 ID should be 2");
        require(lootFlip.totalOpenings() == 2, "Total openings should be 2");

        require(lootFlip.getUserOpeningCount(address(this)) == 1, "Wallet 1 count should be 1");
        require(lootFlip.getUserOpeningCount(address(secondUser)) == 1, "Wallet 2 count should be 1");

        LootFlip.OpeningRecord memory rec1 = lootFlip.getUserOpeningByIndex(address(this), 0);
        LootFlip.OpeningRecord memory rec2 = lootFlip.getUserOpeningByIndex(address(secondUser), 0);

        require(rec1.opener == address(this), "Opener 1 mismatch");
        require(rec2.opener == address(secondUser), "Opener 2 mismatch");
        require(rec1.collectibleId == 1, "Collectible 1 mismatch");
        require(rec2.collectibleId == 4, "Collectible 2 mismatch");
    }

    function test_RevertInvalidOpeningQueries() public {
        // Querying ID 0 or non-existent ID 999
        (bool success0, ) = address(lootFlip).call(
            abi.encodeWithSelector(LootFlip.getOpening.selector, 0)
        );
        require(!success0, "Opening 0 should revert");

        (bool success999, ) = address(lootFlip).call(
            abi.encodeWithSelector(LootFlip.getOpening.selector, 999)
        );
        require(!success999, "Opening 999 should revert");

        // Querying user index out of bounds
        (bool successIdx, ) = address(lootFlip).call(
            abi.encodeWithSelector(LootFlip.getUserOpeningByIndex.selector, address(this), 0)
        );
        require(!successIdx, "Index 0 on empty user history should revert");
    }

    function test_RevertInvalidCollectibleId() public {
        (bool successLow, ) = address(lootFlip).call(
            abi.encodeWithSelector(LootFlip.recordOpening.selector, 0, 0)
        );
        require(!successLow, "Collectible 0 should revert");

        (bool successHigh, ) = address(lootFlip).call(
            abi.encodeWithSelector(LootFlip.recordOpening.selector, 13, 3)
        );
        require(!successHigh, "Collectible 13 should revert");
    }

    function test_RevertMismatchedRarity() public {
        // Collectible 1 is COMMON (0), passing RARE (1) should revert
        (bool success1, ) = address(lootFlip).call(
            abi.encodeWithSelector(LootFlip.recordOpening.selector, 1, 1)
        );
        require(!success1, "Mismatched rarity 1 should revert");

        // Collectible 12 is LEGENDARY (3), passing COMMON (0) should revert
        (bool success2, ) = address(lootFlip).call(
            abi.encodeWithSelector(LootFlip.recordOpening.selector, 12, 0)
        );
        require(!success2, "Mismatched rarity 2 should revert");
    }

    function test_GetUserOpeningsPagination() public {
        lootFlip.recordOpening(1, 0);
        lootFlip.recordOpening(4, 1);
        lootFlip.recordOpening(7, 2);

        require(lootFlip.getUserOpeningCount(address(this)) == 3, "Count should be 3");

        LootFlip.OpeningRecord[] memory page = lootFlip.getUserOpenings(address(this), 0, 2);
        require(page.length == 2, "Page length should be 2");
        require(page[0].collectibleId == 7, "Newest should be collectible 7");
        require(page[1].collectibleId == 4, "Second newest should be collectible 4");

        LootFlip.OpeningRecord[] memory page2 = lootFlip.getUserOpenings(address(this), 2, 2);
        require(page2.length == 1, "Page 2 length should be 1");
        require(page2[0].collectibleId == 1, "Oldest should be collectible 1");
    }
}
