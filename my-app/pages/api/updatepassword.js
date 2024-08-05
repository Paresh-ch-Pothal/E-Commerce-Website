import User from "@/models/user";
import connectToMongoDb from "@/middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
import CryptoJS from 'crypto-js'

const handler = async (req, res) => {
    if (req.method === "POST") {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let dbuser=await User.findOne({email: user.email})
        const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        const decryptPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptPassword == req.body.password && req.body.npassword == req.body.cpassword) {
            dbuser = await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString()});
            res.status(200).json({ success: true });
            return
        }
        res.status(200).json({ success:false });
        return

    }
    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectToMongoDb(handler)
