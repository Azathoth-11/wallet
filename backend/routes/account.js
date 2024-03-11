const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const router = express.Router();


router.get('/balance', authMiddleware, async (req, res)=>{

    const userID = req.userId;
    const account = await Account.findOne({userId: userID})

    res.json({
        "balance": account.balance
    });

});


router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    console.log(amount)

    const account = await Account.findOne({
        userId: req.userId
    });

    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.json({
        message: "Transfer successful"
    })
});



module.exports = router;