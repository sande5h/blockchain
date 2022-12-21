const express = require('express');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const app = express();
const port = process.argv[2]; //different port number


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

// to register new node and broadcast node to other nodes and register
// only register not broadcast by other nodes
app.post('/register-and-broadcast-node',function(req,res){
	const newNodeUrl = req.body.newNodeUrl;
	if (bitcoin.networkNodes.indexOf(newNodeUrl)==-1) bitcoin.networkNodes.push(newNodeUrl);
	const regNodesPromises =[];   //array to save all request
	bitcoin.networkNodes.forEach(networkNodeUrl => {

	const requestOptions={
		uri:networkNodeUrl+'/register-node',
		method: 'POST',
		body:{newNodeUrl:newNodeUrl},
		json: true
	};
	regNodesPromises.push(rp(requestOptions));
	});	

   Promise.all(reqNodesPromises)                //sent all promises saved in the array
   .then(data =>{
   	const bulkRegisterOptions ={							//register all nodes in new url
   		uri: newNodeUrl +'register-nodes-bulk',
   		method:'POST',
   		body:{ allNetworkNodes :[...bitcoin.networkNodes,bitcoin.currentNodeUrl]},
   		json: true
   	}

   	return rp(bulkRegisterOptions);
   })

   .then(data =>{
   	res.json({note:'New node registered with node succesfully'});
   })

})

//to register a node for every node not broadcast in the network
app.post('/register-node',function(req,res){
	const newNodeUrl = req.body.newNodeUrl;
	const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;   //present in this node or not
	const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;										//this node or not
	if(nodeNotAlreadyPresent && notCurrentNode)bitcoin.networkNodes.push(newNodeUrl);
	res.json({ note:'new node registered succesfully with this node in the network'})
})

// new node to register all nodes already in the network
app.post('/register-nodes-bulk',function(req,res){
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl=>{
		const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(allNetworkNodes) == -1;   //present in this node or not
	const notCurrentNode = bitcoin.currentNodeUrl !== allNetworkNodes;										//this node or not
	if(nodeNotAlreadyPresent && notCurrentNode)bitcoin.networkNodes.push(allNetworkNodes)
	});

	res.json({ note: ' bulk registration successfull'})
	
});


app.listen(port, function(){
  console.log(`Example app listening on port ${port}`)
}
);
