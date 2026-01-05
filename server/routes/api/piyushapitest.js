const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

router.get('/', async (req, res) => {
    try {
        // 1 Connect to eth
        const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

        // 2 USDT contract on eth
        const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

        // 3 ABI 
        const abi = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function totalSupply() view returns (uint256)"
        ];

        const contract = new ethers.Contract(contractAddress, abi, provider);

        const name = await contract.name();
        const symbol = await contract.symbol();
        const supply = await contract.totalSupply();

        // for bigint 
        const readableSupply = ethers.formatUnits(supply, 6);

        const output = {
            msg: "Smart Contract Data",
            contractName: name,
            ticker: symbol,
            totalCoins: readableSupply
        };


        console.log("--------------------------------------");
        console.log("Fetching Smart Contract Info...");
        console.log(output);
        console.log("--------------------------------------");

        res.json(output);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;