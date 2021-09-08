const { ethers } = require("ethers");

const TestMerkleProof = artifacts.require("TestMerkleProof");

module.exports = async function (deployer) {
  const provider = new ethers.providers.JsonRpcProvider();
  let accounts = await provider.listAccounts();

  let tokens = [
    ethers.utils.parseEther("1000"),
    ethers.utils.parseEther("1"),
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ];

  const N = 10;
  accounts = accounts.slice(0, N);
  tokens = tokens.slice(0, N);

  await deployer.deploy(TestMerkleProof, accounts, tokens);
  const merkle = await TestMerkleProof.deployed();

  const root = await merkle.getRoot();
  let i = 0;
  let hash = await merkle.hashes(i);
  while (hash != root) {
    console.log(`Hash ${i}: ${hash}`);
    i++;
    hash = await merkle.hashes(i);
  }
  console.log(`Root: ${root}`);

  const nLevels = Math.ceil(Math.log2(N));
  let hashMap = new Map();
  let hashes = [];
  const coder = ethers.utils.defaultAbiCoder;
  for (let i = 0; i < N; i++) {
    hashes.push(
      ethers.utils.keccak256(
        coder.encode(["address", "uint256"], [accounts[i], tokens[i]])
      )
    );
  }
  hashMap.set(0, hashes);

  let level = 0;
  let n = N;
  let odd = false;
  let oLevel;
  let oIndex;
  while (level < nLevels) {
    hashes = hashMap.get(level);
    newHashes = [];
    for (let i = 0; i < n - 1; i += 2) {
      newHashes.push(
        ethers.utils.keccak256(
          coder.encode(["bytes32", "bytes32"], [hashes[i], hashes[i + 1]])
        )
      );
    }
    if (n % 2 > 0) {
      newHashes.push(
        ethers.utils.keccak256(
          coder.encode(["bytes32", "bytes32"], [hashes[n - 1], hashes[n - 1]])
        )
      );
      n = n + 1;
    }
    n = n / 2;

    /*if (n % 2 != 0 && odd) {
      newHashes.push(
        ethers.utils.keccak256(
          coder.encode(
            ["bytes32", "bytes32"],
            [hashes[n - 1], hashMap.get(oLevel)[oIndex]]
          )
        )
      );
      odd = false;
      n = (n + 1) / 2;
    } else {
      if (n % 2 != 0) {
        odd = true;
        oLevel = level;
        oIndex = n - 1;
      }
      n = Math.floor(n / 2);
    }*/
    level += 1;
    hashMap.set(level, newHashes);
  }
  console.log(hashMap);

  const ZERO = ethers.utils.formatBytes32String("");
  const generateProof = (index) => {
    let proof = [];
    for (let i = 0; i < nLevels; i++) {
      console.log(index);
      let hashes = hashMap.get(i);
      if (index % 2 == 0) {
        proof.push(hashes[index + 1]);
      } else if (index == hashes.length - 1) {
        hashes[index];
        index = index + 1;
      } else {
        proof.push(hashes[index - 1]);
      }
      index = Math.floor(index / 2);
      /*if (index % 2 != 0) {
        proof.push(hashes[index - 1]);
      } else if (index == hashes.length - 1) {
        if (index > 0) {
          proof.push(ZERO);
        } else {
          proof.push(hashes[index]);
        }
      } else {
        proof.push(hashes[index + 1]);
      }
      index = Math.floor(index / 2);*/
    }
    return proof;
  };

  const INDEX = 6;
  const proof = generateProof(INDEX);
  console.log(proof);

  console.log(hashMap.get(nLevels)[0]);

  console.log(
    await merkle.verify(
      proof,
      hashMap.get(nLevels)[0],
      accounts[INDEX],
      tokens[INDEX],
      INDEX
    )
  );

  /*const proof = [
    ethers.utils.formatBytes32String(""),
    await merkle.hashes(9),
    await merkle.hashes(10),
  ];
  console.log(proof);
  console.log(await merkle.verify(proof, root, accounts[6], tokens[6], 6));*/

  /*const coder = ethers.utils.defaultAbiCoder;
  const hash1 = ethers.utils.keccak256(
    coder.encode(["address", "uint256"], [accounts[0], tokens[0]])
  );
  console.log(hash1);
  const hash2 = ethers.utils.keccak256(
    coder.encode(["address", "uint256"], [accounts[1], tokens[1]])
  );
  console.log(hash2);
  const hash3 = ethers.utils.keccak256(
    coder.encode(["address", "uint256"], [accounts[2], tokens[2]])
  );
  console.log(hash3);
  const hash4 = ethers.utils.keccak256(
    coder.encode(["bytes32", "bytes32"], [hash1, hash2])
  );
  console.log(hash4);
  const hash5 = ethers.utils.keccak256(
    coder.encode(["bytes32", "bytes32"], [hash4, hash3])
  );
  console.log(hash5);*/
  /*const proof = [
    await merkle.hashes(1),
    await merkle.hashes(11),
    await merkle.hashes(16),
  ];*/
  //console.log(await merkle.verify(proof, root, await merkle.hashes(0), 0));
};
