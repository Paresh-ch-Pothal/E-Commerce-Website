import Order from '@/models/order';
import connectToMongoDb from '@/middleware/mongoose';
import Product from '@/models/product';
import PaytmChecksum from 'paytmchecksum';



const handler = async (req, res) => {

    // initiate shipping
    // Redirect user
    let order;

    //validate paytm checksumm
    var paytmChecksum="";

    var paytmParams = {};

    const received_data = req.body
    for(var key in received_data){
        if(key == "CHECKSUM_VALUE"){
            paytmChecksum=received_data[key]
        }
        else{
            paytmParams[key]=received_data[key];
        }
    }
    
    var isVerifySignature = PaytmChecksum.verifySignature(paytmParams,process.env.PAYTM_MKEY,paytmChecksum);
    if (!isVerifySignature) {
        console.log("Checksum Matched");
        res.status(500).send("Some error Ocuured");
        return
    }

    //update status into order table afetr checking the transaction status 
    if (req.body.STATUS == 'TXT_SUCCESS') {
        order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Paid", paymentInfo: JSON.stringify(req.body), transactioniId: req.body.TXNID })
        let products = order.products
        for (let slug in products) {
            await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
        }

    }
    else if (req.body.STATUS == 'PENDING') {
        order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Pending", paymentInfo: JSON.stringify(req.body) ,transactioniId: req.body.TXNID})
    }

    // res.status(200).json({body: req.body });
}

export default connectToMongoDb(handler)