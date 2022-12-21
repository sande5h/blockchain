const express = require('express');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const app = express();
const port = process.argv[2]; //different port number


const uuid = require('uuid');
const nodeAddress = uuid.v4().split('-').join('');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/blockchain', function(req, res) {
	res.send(bitcoin);
  
});

app.post('/transcation',function(req, res){

	const blockIndex = bitcoin.createNewTransaction(req.body.amount , req.body.sender, req.body.receipt)
	res.json({ note: `transcation will be added in block ${blockIndex}.`});
});

app.get('/mine', function(req, res) {

  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData ={
  	transcations: bitcoin.pendingTranscations,
  	index: lastBlock['index']+1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
  bitcoin.createNewTransaction(12.5, "00", nodeAddress);

  const newBlock= bitcoin.createNewBlock(nonce,previousBlockHash,blockHash);
  res.json({
  	note: `New Block mined Successfully`,
  	block: newBlock
  });
});

// to register a node and select node
app.post('/register-and-broadcast-node',function(req,res){



})



app.listen(port, function(){
  console.log(`Example app listening on port ${port}`)
}
);
