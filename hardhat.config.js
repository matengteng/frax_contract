require("dotenv").config();
require('hardhat-deploy');
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("hardhat-spdx-license-identifier");
require('hardhat-abi-exporter');
require("@nomiclabs/hardhat-ethers");

let accounts = [];

var fs = require("fs");
const keythereum = require("keythereum");
const prompt = require('prompt-sync')();
(async function () {
  try {
    const root = '.keystore';
    var pa = fs.readdirSync(root);
    for (let index = 0; index < pa.length; index++) {
      let ele = pa[index];
      let fullPath = root + '/' + ele;
      var info = fs.statSync(fullPath);
      //console.dir(ele);
      if (!info.isDirectory() && ele.endsWith(".keystore")) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const json = JSON.parse(content);
        const password = prompt('Input password for 0x' + json.address + ': ', { echo: '*' });
        //console.dir(password);
        const privatekey = keythereum.recover(password, json).toString('hex');
        //console.dir(privatekey);
        accounts.push('0x' + privatekey);
        //console.dir(keystore);
      }
    }
  } catch (ex) {
  }
  try {
    const file = '.secret';
    var info = fs.statSync(file);
    if (!info.isDirectory()) {
      const content = fs.readFileSync(file, 'utf8');
      let lines = content.split('\n');
      for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        if (line == undefined || line == '') {
          continue;
        }
        if (!line.startsWith('0x') || !line.startsWith('0x')) {
          line = '0x' + line;
        }
        accounts.push(line);
      }
    }
  } catch (ex) {
  }
})();

module.exports = {
  defaultNetwork: "hardhat",
  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true
  },
  namedAccounts: {
    deployer: {
      default: 0,
      256: '0xf6E657d3f1BD03A11153c9449fb21B73064908DF',
      128: '0xf6E657d3f1BD03A11153c9449fb21B73064908DF',
    },
    admin: {
      default: 0,
      256: '0x7C95966cD35C27bFc950c163f44cF8462377b19b',
      128: '0x7C95966cD35C27bFc950c163f44cF8462377b19b',
    }
  },
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: `https://http-testnet.hecochain.com`
        //blockNumber: 8215578,
      },
      live: true,
      saveDeployments: true,
      tags: ["local"],
      timeout: 2000000,
    },
    ropsten: {
      url: 'https://http-testnet.hecochain.com',
      accounts: accounts,
      chainId: 256,
      tags: ["test"],
      gasMultiplier: 1.5,
    },
    mainnet: {
      url: `https://http-mainnet-node.huobichain.com`,
      accounts: accounts,
      chainId: 128,
      tags: ["main"],
      gasMultiplier: 1.5,
    },
  },
  solidity: {
    compilers: [
      {
				version: "0.5.17",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			},
			{
				version: "0.6.11",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			},
			{
				version: "0.7.6",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			},
			{
				version: "0.8.0",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			},
			{
				version: "0.8.2",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			},
			{
				version: "0.8.4",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			}
    ]
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
(function () {
  Object.assign(module.exports.namedAccounts);
})()