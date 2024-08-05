const mongoose=require("mongoose");
const forgotSchema=new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    },

},{
    timestamps: true
})

const Forgot = mongoose.models.Forgot || mongoose.model("Forgot", forgotSchema);
module.exports=Forgot;
