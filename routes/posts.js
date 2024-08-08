const express = require("express")
const router = express.Router();
const Transaction = require("../models/Transaction")

router.post("/add", async (req,res)=>{
    const {description , amount , type }= req.body;
    try{
        await Transaction.create({description, amount, type});
        res.redirect('/');
    }
    catch(err){
        res.status(500).send('Internal Server Error');
    }
})


router.post('/delete/:id', async (req,res)=>{
    try{
        await Transaction.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }
    catch(err){
        res.status(500).send('Internal Server Error');
    }
})

router.get('/', async (req,res)=>{
    try{
        const transactions = await Transaction.find();

        const incomeTotal = transactions
        .filter(transactions => transactions.type === 'income')
        .reduce((acc,curr)=> acc + curr.amount,0);


        const expenseTotal = transactions
        .filter(transactions => transactions.type === 'expense')
        .reduce((acc,curr)=> acc + curr.amount, 0);

        const moneyLeft = incomeTotal-expenseTotal;

        res.render('index',{transactions , incomeTotal , expenseTotal , moneyLeft})
    }

    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
})

module.exports = router;