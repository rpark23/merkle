const { ethers } = require("ethers");

module.exports = async function (deployer) {
  /*const provider = new ethers.providers.JsonRpcProvider();
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

  const N = 7;
  accounts = accounts.slice(0, N);
  tokens = tokens.slice(0, N);
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
  console.log(hashMap);

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
    if (n % 2 != 0 && odd) {
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
    }
    level += 1;
    hashMap.set(level, newHashes);
    console.log(hashMap);
  }
  const ZERO = ethers.utils.formatBytes32String("");

  const generateProof = (index) => {
    let proof = [];
    for (let i = 0; i < nLevels; i++) {
      let hashes = hashMap.get(i);
      if (index % 2 != 0) {
        proof.push(hashes[i - 1]);
      } else if (index == hashes.length - 1) {
        proof.push(ZERO);
      } else {
        proof.push(hashes[i + 1]);
      }
      index = Math.floor(index / 2);
    }
    return proof;
  };
  console.log(generateProof(6));*/
  /*let hashes = [];
  for (let i = 0; i < accounts.length; i++) {
    hashes.push(
      ethers.utils.keccak256(
        coder.encode(["address", "uint256"], [accounts[i], tokens[i]])
      )
    );
  }
  let n = accounts.length;
  let offset = 0;
  let odd = 0;

  while (n > 0) {
    for (let i = 0; i < n - 1; i += 2) {
      hashes.push(
        ethers.utils.keccak256(
          coder.encode(
            ["bytes32", "bytes32"],
            [hashes[offset + i], hashes[offset + i + 1]]
          )
        )
      );
    }
    if (n % 2 != 0 && odd > 0) {
      hashes.push(
        ethers.utils.keccak256(
          coder.encode(
            ["bytes32", "bytes32"],
            [hashes[offset + n - 1], hashes[odd]]
          )
        )
      );
      odd = 0;
      offset += n;
      n = (n + 1) / 2;
    } else {
      if (n % 2 != 0) {
        odd = offset + n - 1;
      }
      offset += n;
      n = Math.floor(n / 2);
    }
  }*/
  /*console.log(
    ethers.utils.keccak256(
      coder.encode(["bytes32", "bytes32"], [hashes[0], hashes[1]])
    )
  );
  console.log(
    ethers.utils.keccak256(
      coder.encode(["bytes32", "bytes32"], [hashes[2], hashes[3]])
    )
  );
  console.log(
    ethers.utils.keccak256(
      coder.encode(["bytes32", "bytes32"], [hashes[4], hashes[5]])
    )
  );*/
};
