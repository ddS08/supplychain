
const SupplyChainABI = require('../../../supply-chain-truffle-react/client/src/artifacts/SupplyChain.json').abi;
import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

function createContractInstance() {
    const contractAddress = '0x445c90B4034E488517E572719E9887147bf0ECdf'; // Replace with your contract's address
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

async function qrblock()
{
  const myContract = createContractInstance();
    try {
    const supplierPlace = "Mumbai";
    const adminaddress='0x4D61290539D9a062E119aa2AE179faEB6d73b8b9';
    const name = "Medicine Name";
    const description = "Medicine Description";
    const quantity = 100;
    const price = 10;
    const manufacturingDate = Date.now();
    const expiryDate = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;
    await myContract.methods.addMedicine(name, description, quantity, price, manufacturingDate, expiryDate).
    send({ from: adminaddress, gas: 6000000 });;

    console.log('RETAILER added successfully.');
    
} catch (error) {
  console.error('Error adding RETAILER', error);
    

}
}

async function medblock(name,quantity,price,manufacturingDate,expiryDate,supplierAddress,medicineID,distributorAddress,manufacturerAddress)
{
  const myContract = createContractInstance();
    try {
    const supplierPlace = "Mumbai";
    const adminaddress='0x4D61290539D9a062E119aa2AE179faEB6d73b8b9';
    const description = "Medicine Description";
    await myContract.methods.addMedicine(name, description, quantity, price, manufacturingDate, expiryDate).
    send({ from: adminaddress, gas: 6000000 });;

    console.log('medicine created added successfully.');
    
} catch (error) {
  console.error('Error adding RETAILER f', error);
    

}
try {

  const adminaddress='0x4D61290539D9a062E119aa2AE179faEB6d73b8b9';
  console.log(manufacturerAddress);
  const receiverAddress = manufacturerAddress;
  console.log(supplierAddress);

  await myContract.methods.RMSsupply(medicineID, receiverAddress, quantity)
  .send({ from: supplierAddress,gas: 6000000 });;

  console.log('medicine received from supplier added successfully.');
  
} catch (error) {
console.error('Error adding RETAILER g', error);
}

try {

  const adminaddress='0x4D61290539D9a062E119aa2AE179faEB6d73b8b9';
  const description = "Medicine Description";
  await myContract.methods.Manufacturing(medicineID, distributorAddress, quantity)
  .send({ from: manufacturerAddress,gas: 6000000 });;


  console.log('medicine sent to distributor added successfully.');
  
} catch (error) {
console.error('Error adding RETAILER h', error);
}

}

export {RMSctr,MANctr,DISctr,RETctr,addRMS,addMAN ,addDIS,addRET,qrblock,medblock, DISinfo,RETsend,getManuinfo};


async function DISinfo(medicineID){
    
  const myContract = createContractInstance();
  try {
    const adminaddress='0x4D61290539D9a062E119aa2AE179faEB6d73b8b9';
    console.log(medicineID);
    const val = await myContract.methods.getMedicineProcessingHistory(medicineID).call({ from: adminaddress });
    console.log("val",val);
    return val;
  
} catch (error) {
console.error('Error adding Distributor', error);
  

}
}


async function RETsend(medicineID,distributorAddress,RetailerAddress)
{
  const myContract = createContractInstance();
  try {
    const quantity = '100';
    const adminaddress='0x4D61290539D9a062E119aa2AE179faEB6d73b8b9';
    const description = "Medicine Description";
    await myContract.methods.Distribute(medicineID, RetailerAddress, quantity)
    .send({ from: distributorAddress,gas: 6000000 });;
  
  
    console.log('medicine sent to distributor added successfully.');
    
  } catch (error) {
  console.error('Error adding RETAILER h', error);
  }
  
  }


  async function getManuinfo(manufacturerAddress){
    const myContract = createContractInstance();
    try{
      const val = await myContract.methods.getManufacturerMedicine(manufacturerAddress)
    .call();
    return val;
    }
    catch(error){
      console.log(error);
    }
  }


