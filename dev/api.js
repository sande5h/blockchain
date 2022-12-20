const express = require('express')
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.get('/blockchain', function(req, res) {
	res.send(bitcoin);
  
});

app.post('/transcation',function(req, res){
	console.log(req.body);
	res.send(`the amount is ${req.body.amount} bitcoin `)

});

//test for git
//test fot git push
// test last
// app.get('/mine',function(req,res){

 
// });

app.listen(port, function(){
  console.log(`Example app listening on port ${port}`)
}
);
