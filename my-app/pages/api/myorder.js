import Order from "@/models/order";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import connectToMongoDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    const token = req.body.token;
    const data = jwt.verify(token, process.env.JWT_SECRET)
    let order = await Order.find({ email: data.email ,status: "Paid"})
    res.status(200).json({ order });
}

export default connectToMongoDb(handler)
