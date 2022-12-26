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
	return hash;
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



module.exports = Blockchain;