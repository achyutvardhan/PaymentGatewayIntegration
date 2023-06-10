const express = require('express')
const app =  express()
const razorpay = require('razorpay')
const cors = require('cors')
require('dotenv').config();
app.use(cors());
app.use(express.json({ extended: false }));

app.post('/payment/orders',async(req,res)=>{
    try{

        const option = {
            amount : 1000,
            currency : "INR",
            receipt : "receipt_order_01"
        }
        const instance = new razorpay({
            key_id : process.env.KEY_ID,
            key_secret : process.env.KEY_SECRET,
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
    try {

        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;


        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(8080, ()=>{
    console.log("listening to the port 8080....")
})