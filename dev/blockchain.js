const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];    //acessing the 3rd value in the apckagejs 
const uuid = require('uuid');

//main blockchain feature:
function Blockchain() {
	this.chain=[];																//chain		
	this.pendingtransactions=[];												//storingPending transaction
	this.currentNodeUrl = currentNodeUrl;                                       //current node
	this.networkNodes = [];                                                     //other nodes for blockchain to be aware
	this.createNewBlock(100,'0','0');                                            //genesis block
}

//newBlock
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash){
	const newBlock ={
		index: this.chain.length +1,
		timeStamp: Date.now(),
		transactions: this.pendingtransactions,
		nonce: nonce,
		hash: hash,
		previousBlockHash: previousBlockHash
	};

	this.pendingtransactions =[];//empty transaction
	this.chain.push(newBlock);// push into chain

	return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1];
}

// Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
//   const newTransaction = {
//     amount: amount,
//     sender: sender,
//     recipient: recipient
//   };
//   this.pendingtransactions.push(newTransaction);
//   return this.getLastBlock()['index'] + 1;
// }
//refractoring transaction

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
	const newtransaction = {
	  amount: amount,
	  sender: sender,
	  recipient: recipient,
	  transactionId: uuid.v4().split('-').join('')

	};
	
	return newtransaction;
  };
  
  Blockchain.prototype.addTransactionToPendingTransaction = function(transactionObj) {
	  this.pendingtransactions.push(transactionObj);
	  return this.getLastBlock()['index'] + 1;
  };
  



Blockchain.prototype.hashBlock= function ( previousBlockHash,currentBlockData, nonce)
{
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash =sha256(dataAsString);
	return hash;````````````````````
}

Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData){
	let nonce = 0;
	let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
	while(hash.substring(0,4)!== '0000'){
		nonce++;
		hash=this.hashBlock(previousBlockHash,currentBlockData,nonce);
	}

	return nonce;
}

Blockchain.prototype.chainIsValid = function (blockchain){
	let validChain = true;
	for (var i = 1; i< blockchain.length; i++){
		
		const currentBlock = blockchain[i];
		const prevBlock = blockchain[i-1];
		const blockHash = this.hashBlock(prevBlock['hash'],{transactions:currentBlock['transactions'],index: currentBlock['index']},currentBlock['nonce']);
		if(blockHash.substring(0,4) !== '0000') validChain=false;
		if(currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
	};

	const genesisBlock = blockchain[0];
	const correctNonce= genesisBlock['nonce']=== 100;
	const correctHash= genesisBlock['hash']=== '0';
	const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
	const correctTranscations = genesisBlock ['transactions'].length === 0;
	if(!correctNonce || !correctHash || !correctPreviousBlockHash || !correctTranscations) validChain= false;
	return validChain;
};


module.exports = Blockchain;