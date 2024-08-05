const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import Order from '@/models/order';
import connectToMongoDb from '@/middleware/mongoose';
import Product from '@/models/product';
import pincodes from "../../pincode.json"


const handler = async (req, res) => {
    if (req.method == "POST") {

        //check if the pincode is serviceable
        if(!Object.keys(pincodes).inlcudes(req.body.pincode)){
            res.status(400).json({success: false,"error": "The pincode you have entered is not serviceable",cartClear: false})
            return;
        }


        //check if the cart is tempered with
        let product,sumtotal=0
        let cart=req.body.cart;
        if(req.body.subtotal <=0){
            res.status(400).json({success: false,"error": "Your cart is empty please build your cart",cartClear: false})
            return;
        }
        for(let item in cart){
            console.log(item)
            sumtotal+=cart[item].price * cart[item].qty;
            product=await Product.findOne({slug: item})


            //check if the cart items are out of stocks
            if(product.availableQty < cart[item].qty){
                res.status(400).json({success: false,"error": "some items in your cart is out of stock please try again!!",cartClear: true})
                return
            }


            if (product.price != cart[item].price){
                res.status(400).json({success: false,"error": "The price of some items in your cart have been changed",cartClear: true})
                return
            }
        }
        if(sumtotal !== req.body.subtotal){
            res.status(400).json({success: false,"error": "The price of some items in your cart have been changed",cartClear: true})
                return
        }

        

        //check if the details are valid
        
        if(req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))){
            res.status(200).json({sucess: false,"error": "Please enter your 10 digit mobile number",cartClear: false})
            return
        }
        if(req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))){
            res.status(200).json({sucess: false,"error": "Please enter your six digit pincode",cartClear: false})
            return
        }



        //Inititae an order correspoding to this order id
        let order = new Order({
            email: re.body.email,
            orderId: req.body.oid,
            address:req.body.address,
            city:req.body.city,
            name:req.body.name,
            state:req.body.state,
            phone: req.body.phone,
            pincode:req.body.pincode,
            amount: req.body.subtotal,
            product: req.body.cart
        })
        await order.save()



        var paytmParams = {};
        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subtotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MKEY)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        const requestAsync = async () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    // hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        let ress=JSON.parse(response).body
                        ress.success=true;
                        ress.cartClear=false
                        resolve(ress)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        }
        let myr = await requestAsync();

    }
}

export default connectToMongoDb(handler)