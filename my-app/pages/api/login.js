import User from "@/models/user";
import connectToMongoDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
import  jwt from 'jsonwebtoken';


const handler = async (req, res) => {
    if (req.method == "POST") {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            const decryptPassword = bytes.toString(CryptoJS.enc.Utf8);

            if ( decryptPassword === password ) {
                const token=jwt.sign({name: user.name,email: user.email},process.env.AES_SECRET,{expiresIn: "2d"})
                res.status(200).json({ success: true, user,token,email: user.email })
            }
            res.status(200).json({ success: false, error: "invlaid information" })
        }
        else {
            res.status(200).json({ success: false, error: "No user found" })
        }
    }
    else {
        res.status(400).json({success: false, error: "This method is not allowed" })
    }
}

export default connectToMongoDb(handler)