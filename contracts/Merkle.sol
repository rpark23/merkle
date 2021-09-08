// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract MerkleProof {
  function verify(
    bytes32[] memory proof,
    bytes32 root,
    address user,
    uint256 tokens,
    uint256 index
  ) public pure returns (bool) {
    bytes32 hash = keccak256(abi.encode(user, tokens));

    for (uint256 i = 0; i < proof.length; i++) {
      bytes32 proofElement = proof[i];

      if (index % 2 == 0) {
        hash = keccak256(abi.encode(hash, proofElement));
      } else {
        hash = keccak256(abi.encode(proofElement, hash));
      }
      index = index / 2;
    }

    return hash == root;
  }
}

contract TestMerkleProof is MerkleProof {
  bytes32[] public hashes;

  constructor(address[] memory addresses, uint256[] memory tokens) {
    uint256 n = addresses.length;

    for (uint256 i = 0; i < n; i++) {
      hashes.push(keccak256(abi.encode(addresses[i], tokens[i])));
    }

    uint256 offset = 0;
    //uint256 odd = 0;

    while (n > 1) {
      for (uint256 i = 0; i < n - 1; i += 2) {
        hashes.push(
          keccak256(abi.encode(hashes[offset + i], hashes[offset + i + 1]))
        );
      }
      /*if (n % 2 != 0 && odd > 0) {
        hashes.push(keccak256(abi.encode(hashes[offset + n - 1], hashes[odd])));
        odd = 0;
        offset += n;
        n = (n + 1) / 2;
      } else {
        if (n % 2 != 0) {
          odd = offset + n - 1;
        }
        offset += n;
        n = n / 2;
      }*/

      if (n % 2 != 0) {
        hashes.push(
          keccak256(abi.encode(hashes[offset + n - 1], hashes[offset + n - 1]))
        );
        offset += n;
        n = (n + 1) / 2;
      } else {
        offset += n;
        n = n / 2;
      }
    }
  }

  function getRoot() public view returns (bytes32) {
    return hashes[hashes.length - 1];
  }
}
