import Forgot from "@/models/forgot";
import User from "@/models/user";
import connectToMongoDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    //check if the user exist
    //send an email to the user
    if (req.body.sendMail) {
        let token = "codingcodingtshirtthisrtwearthecode";
        let forgot = new Forgot({
            email: req.body.email,
            token: token
        })

        let email = `
    We have sent you this email in response to your request to reset your password on Coding-Tshirt. 
    <br /><br />
    To reset your password, please follow the link below:
    <a href="https://coding-tshirt.com/forgot?token-${token}">Click here to reset Your password</a>
    <br /><br />
    We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.
    <br /><br />
`;

        res.status(200).json({ success: true });
    }
    else{
        //Reset user Password

        let dbuser=await User.findOne({email: req.body.email})
        const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        const decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptPassword == req.body.password) {
            dbuser = await User.findOneAndUpdate({ email: req.body.email }, { password: CryptoJS.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString()});
            res.status(200).json({ success: true });
            return
        }
        res.status(200).json({ success:false });
        return
    }
}

export default connectToMongoDb(handler)