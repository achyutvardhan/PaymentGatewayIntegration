const express = require('express')
const app =  express()
const razorpay = require('razorpay')

app.use(express.json({ extended: false }));

app.post('/payment/order',async(req,res)=>{
    try{

        const option = {
            amount : 5000,
            currency : "INR",
            receipt : "receipt_order_01"
        }
        const instance = new razorpay({
            key_id : "rzp_test_iKeJwRRYd7XA1L",
            key_secret : "XKWFFBSrYwF82WmntiCgtA4u"
        });
        const order = await instance.orders.create(option);
        if(!order)
        res.status(400).send("Some error occured")
    
        res.json(order);
    }catch(error){
        res.status(500).send(error);
    }
})

app.post('/payment/success',async(req,res)=>{
    
})

app.listen(8080, ()=>{
    console.log("listening to the port 8080....")
})