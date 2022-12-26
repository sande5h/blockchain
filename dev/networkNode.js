const express = require('express');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const app = express();
const port = process.argv[2]; //different port number

// const bitcoin;
const uuid = require('uuid');
const nodeAddress = uuid.v4().split('-').join('');
// request promise
const rp=require('request-promise');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/blockchain', function(req, res) {
	res.send(bitcoin);
  
});

// app.post('/transaction',function(req, res){

// 	const blockIndex = bitcoin.createNewTransaction(req.body.amount , req.body.sender, req.body.receipt)
// 	res.json({ note: `transaction will be added in block ${blockIndex}.`});
// });//refractor

app.post('/transaction', function (req, res) {
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransaction(newTransaction);
    res.json({ note: `Transaction will be added in block ${blockIndex}` });
});

app.post('/transaction/broadcast', function (req, res) {
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    bitcoin.addTransactionToPendingTransaction(newTransaction);
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        };
        requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises)
        .then(data => {
            res.json({ note: "Transaction created and broadcasted successfully!" });
        });
});




app.get('/mine', function(req, res) {

  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData ={
  	transactions: bitcoin.pendingtransactions,
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

// to register new node and broadcast node to other nodes and register
// only register not broadcast by other nodes
app.post('/register-and-broadcast-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

    const regNodesPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl: newNodeUrl },
            json: true
        };
        regNodesPromises.push(rp(requestOptions));
    });
    Promise.all(regNodesPromises)
        .then(data => {
            const bulkRegisterOptions = {
                uri: newNodeUrl + '/register-nodes-bulk',
                method: 'POST',
                body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
                json: true
            };
            return rp(bulkRegisterOptions);
        })
        .then(data => {
            res.json({ note: 'new node registered in network successfully !' });
        });
});

// register a node with a network
app.post('/register-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
    res.json({ note: "new node registered successfully" });
});

// register multiple nodes at once
app.post('/register-nodes-bulk', function (req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
    });
    res.json({ note: 'Bulk registration of nodes successful!' });
});
app.listen(port, function(){
  console.log(`Example app listening on port ${port}`)
}
);
