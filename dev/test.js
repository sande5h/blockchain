const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
const bc1={
    "chain": [
    {
    "index": 1,
    "timeStamp": 1672042354312,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timeStamp": 1672042411692,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timeStamp": 1672042472751,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "000",
    "recipient": "347d7e06e9c442939e745a60d53d9a69",
    "transactionId": "4767b76dd68c4f33a01edb9f418bf4ce"
    },
    {
    "amount": 10,
    "sender": "sandesh",
    "recipient": "anil",
    "transactionId": "84e81901919844feabc7af75a802ab5a"
    },
    {
    "amount": 20,
    "sender": "sandesh",
    "recipient": "anil",
    "transactionId": "26bab8bd730d431eb6fd1ae743d854ab"
    },
    {
    "amount": 30,
    "sender": "sandesh",
    "recipient": "anil",
    "transactionId": "eaf8c571259643ae82a34bc819709193"
    }
    ],
    "nonce": 111173,
    "hash": "000087100683c00b70c2a5f7afb4767446b7a37d1d5b4c7c3ee056b8b78f3857",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timeStamp": 1672042522364,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "000",
    "recipient": "347d7e06e9c442939e745a60d53d9a69",
    "transactionId": "ad3574c9107b41aeafdb05f872911922"
    },
    {
    "amount": 40,
    "sender": "sandesh",
    "recipient": "anil",
    "transactionId": "a55d0bbd23224bf89c09ad8af3980ae7"
    },
    {
    "amount": 50,
    "sender": "sandesh",
    "recipient": "anil",
    "transactionId": "6c081aa67b6f40ce9d232fddce97875c"
    },
    {
    "amount": 60,
    "sender": "sandesh",
    "recipient": "anil",
    "transactionId": "7121e4726ba04efbbace5a11c6ff0315"
    }
    ],
    "nonce": 25909,
    "hash": "0000a176c9c77dbf50fe4c230b4deea5e86646a2f85f36c62fe65102d1b82180",
    "previousBlockHash": "000087100683c00b70c2a5f7afb4767446b7a37d1d5b4c7c3ee056b8b78f3857"
    },
    {
    "index": 5,
    "timeStamp": 1672042531468,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "000",
    "recipient": "347d7e06e9c442939e745a60d53d9a69",
    "transactionId": "764c68f6a6644cb3b0330b3e223ce605"
    }
    ],
    "nonce": 12298,
    "hash": "0000d856bbbb45196d9b0e5f770e4a6bf8465aa20433f01f73eae81198224fe2",
    "previousBlockHash": "0000a176c9c77dbf50fe4c230b4deea5e86646a2f85f36c62fe65102d1b82180"
    },
    {
    "index": 6,
    "timeStamp": 1672042534168,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "000",
    "recipient": "347d7e06e9c442939e745a60d53d9a69",
    "transactionId": "850e9281964344f3a90da8e97bb72b1c"
    }
    ],
    "nonce": 132207,
    "hash": "00000f8625728d6f797ad3b691a96fd65e20009f133e6795135ca682e8029ca4",
    "previousBlockHash": "0000d856bbbb45196d9b0e5f770e4a6bf8465aa20433f01f73eae81198224fe2"
    }
    ],
    "pendingtransactions": [
    {
    "amount": 12.5,
    "sender": "000",
    "recipient": "347d7e06e9c442939e745a60d53d9a69",
    "transactionId": "5e0fdecaad26465baa983897ef2fa519"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": [
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005"
    ]
    };
    

console.log('VALID',bitcoin.chainIsValid(bc1.chain));
