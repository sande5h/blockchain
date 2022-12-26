const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];    //acessing the 3rd value in the apckagejs 

//main blockchain feature:
function Blockchain() {
	this.chain=[];																//chain		
	this.pendingTranscations=[];												//storingPending transcation
	this.currentNodeUrl = currentNodeUrl;                                       //current node
	this.networkNodes = [];                                                     //other nodes for blockchain to be aware
	this.createNewBlock(100,'0','0');                                            //genesis block
}

//newBlock
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash){
	const newBlock ={
		index: this.chain.length +1,
		timeStamp: Date.now(),
		transcations: this.pendingTranscations,
		nonce: nonce,
		hash: hash,
		previousBlockHash: previousBlockHash
	};

	this.pendingTranscations =[];//empty transcation
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
//   this.pendingTranscations.push(newTransaction);
//   return this.getLastBlock()['index'] + 1;
// }
//refractoring transcation

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
	const newTranscation = {
	  amount: amount,
	  sender: sender,
	  recipient: recipient
	};
	
	return newTranscation;
  }
  
  Blockchain.prototype.addTranscationToPendingTranscation = function(transcationObj) {
	  this.pendingTranscations.push(transcationObj);
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