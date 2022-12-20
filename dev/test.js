const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
bitcoin.createNewBlock(2319, 'OIUHYTREWQ', 'OIJUYTREWQ');
bitcoin.createNewTransaction(100, 'ramu', 'sandesh');
bitcoin.createNewBlock(2329, 'OIJUYTREWQ', 'OIUHGTREWQ');
bitcoin.createNewTransaction(300, 'ALEX123', 'JEN123');
bitcoin.createNewTransaction(300, 'ALEX123', 'JEN123');
bitcoin.createNewTransaction(300, 'ALEX123', 'JEN123');
bitcoin.createNewTransaction(300, 'ALEX123', 'JEN123');
bitcoin.createNewBlock(2339, 'OIUHGTREWQ', 'OIUHTYTREWQ');
bitcoin.createNewTransaction(301, 'ALEX123', 'JEN123');
bitcoin.createNewTransaction(303, 'ALEX123', 'JEN123');
bitcoin.createNewBlock(2339, 'OIUHGTREWQ', 'OIUHTYTREWQ');



console.log(bitcoin);
