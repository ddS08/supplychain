
const SupplyChainABI = require('../../../supply-chain-truffle-react/client/src/artifacts/SupplyChain.json').abi;
import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

function createContractInstance() {
    const contractAddress = '0x6EB23dFbb3ddfb7dB7243d5FDC0849F8866Cb583'; // Replace with your contract's address
    return new web3.eth.Contract(SupplyChainABI, contractAddress);
    
  }
  
  // Function to add an RMS (supplier)
  async function RMSctr() {
    const myContract = createContractInstance();
  
    try {
      // Call the addRMS function
      const rmsCtr = await myContract.methods.rmsCtr().call();
      console.log(rmsCtr);
      const rms = {};
      for (let i = 0; i < rmsCtr; i++) {
        rms[i] = await myContract.methods.RMS(i + 1).call();
      }
      console.log(rms);
  
      // Successfully called addRMS
      console.log('supplier count found');
    } catch (error) {
      console.error('Error supplier count found', error);
    }
  }


  async function MANctr() {
    const myContract = createContractInstance();
    try {
      // Call the addRMS function
      const manCtr = await myContract.methods.manCtr().call();
      console.log(manCtr);
      const man = {};
      for (let i = 0; i < manCtr; i++) {
        man[i] = await myContract.methods.MAN(i + 1).call();
      }
      console.log(man);
  
      // Successfully called addRMS
      console.log('Manufacturer count found');
    } catch (error) {
      console.error('Error manufacturer count found', error);
    }
  }

  async function DISctr() {
    const myContract = createContractInstance();
    try {
      // Call the addRMS function
      const disCtr = await myContract.methods.disCtr().call();
      const dis = {};
      for (let i = 0; i < disCtr; i++) {
        dis[i] = await myContract.methods.DIS(i + 1).call();
      }
      console.log(dis);
  
      // Successfully called addRMS
      console.log('Distributor count found');
    } catch (error) {
      console.error('Error distributor count found', error);
    }
  }

  async function RETctr() {
    const myContract = createContractInstance();
    try {
      // Call the addRMS function
      const retCtr = await myContract.methods.retCtr().call();
      const ret = {};
      for (let i = 0; i < retCtr; i++) {
        ret[i] = await myContract.methods.RET(i + 1).call();
      }
      console.log(ret);
  
      // Successfully called addRMS
      console.log('ret count found');
    } catch (error) {
      console.error('Error ret count found', error);
    }
  }
  
  
  





async function addRMS(supplierAddress,supplierName,adminaddress){
    
    const myContract = createContractInstance();
    try {
    const supplierPlace = "Mumbai";
    await myContract.methods.addRMS(supplierAddress, supplierName, supplierPlace)
      .send({ from: adminaddress, gas: 6000000 });

    console.log('Supplier added successfully.',result);
    
} catch (error) {
  console.error('Error adding supplier:', error);
    

}
}

async function addMAN(supplierAddress,supplierName,adminaddress){
    
    const myContract = createContractInstance();
    try {
    const supplierPlace = "Mumbai";
    await myContract.methods.addManufacturer(supplierAddress, supplierName, supplierPlace)
      .send({ from: adminaddress, gas: 6000000 });

    console.log('sdasd Manufacturer added successfully.');
    
} catch (error) {
  console.error('Error adding Manufacturer:', error);
    

}
}

async function addDIS(supplierAddress,supplierName,adminaddress){
    
    const myContract = createContractInstance();
    try {
    const supplierPlace = "Mumbai";
    await myContract.methods.addDistributor(supplierAddress, supplierName, supplierPlace)
      .send({ from: adminaddress, gas: 6000000 });

    console.log('Distributor added successfully.');
    
} catch (error) {
  console.error('Error adding Distributor', error);
    

}
}
async function addRET(supplierAddress,supplierName,adminaddress){
    
    const myContract = createContractInstance();
    try {
    const supplierPlace = "Mumbai";
    await myContract.methods.addRetailer(supplierAddress, supplierName, supplierPlace)
      .send({ from: adminaddress, gas: 6000000 });

    console.log('RETAILER added successfully.');
    
} catch (error) {
  console.error('Error adding RETAILER', error);
    

}
}
export {RMSctr,MANctr,DISctr,RETctr,addRMS,addMAN ,addDIS,addRET};




