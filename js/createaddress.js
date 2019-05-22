const bitcoin = require("bitcoinjs-lib");
const TESTNET = bitcoin.networks.testnet
const keyPair = bitcoin.ECPair.makeRandom({ network: TESTNET })
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: TESTNET })
let pk = keyPair.toWIF();
console.log(address, pk);