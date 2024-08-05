import User from "@/models/user";
import connectToMongoDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == "POST") {
        const {name,email,password}=req.body
        let user=new User({name,email,password : CryptoJS.AES.encrypt(password,process.env.AES_SECRET).toString()})
        await user.save();
        

        res.status(200).json({success: "success"})
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectToMongoDb(handler)