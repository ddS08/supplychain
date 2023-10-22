import Web3 from "web3";

export async function getPublicKeyFromMetaMask(): Promise<string> {
 try {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      // Request account access if needed


      await window.ethereum.request({ method: 'eth_requestAccounts' });

  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get the Ethereum address
  const accounts = await web3.eth.getAccounts();
  const ethereumAddress = accounts[0];

  console.log('Ethereum Address:', ethereumAddress);
      return ethereumAddress;
    } else {
      throw new Error('MetaMask is not installed. Please install it to use this app.');
    }
 } catch (error) {
    console.error('Error getting public key from MetaMask:', error);
    throw error;
 }
}

