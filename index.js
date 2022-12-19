const { ethers } = require('ethers');
const { CONTRACT_ABI } = require('./contracts/abi');
require('dotenv').config();

const CONTRACT_ADDRESS = '0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A';

const provider = new ethers.providers.AlchemyProvider(
  'goerli',
  process.env.TEST_API_KEY
);

const wallet = new ethers.Wallet(process.env.TEST_PRIVATE_KEY, provider);

(async () => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

  // Interact with inc() function to add 1 to the counter
  const tx1 = await contract.inc();
  console.log(`tx1 hash: ${tx1.hash}`);

  // Interact with dec() function to substract 1 to the counter
  const tx2 = await contract.dec();
  console.log(`tx2 hash: ${tx2.hash}`);

  // reading the counter value
  const currentValue = await contract.get();
  console.log(`counter: ${currentValue.toString()}`);
})();
