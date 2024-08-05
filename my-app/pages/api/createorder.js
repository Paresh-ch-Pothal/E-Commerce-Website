// pages/api/createorder/[productCode].js

import mongoose from 'mongoose';
import Order from '@/models/order';
import connectToMongoDb from '@/middleware/mongoose';

const handler = async (req, res) => {
    await connectToMongoDb();

    const { method, query: { productCode } } = req;

    if (method === 'POST') {
        const { email, orderId, paymentInfo, products, address, amount, status } = req.body;

        try {
            // Assuming products is an object with the structure you provided
            const productDetails = products[productCode]

            const newOrder = new Order({
                email,
                orderId,
                paymentInfo,
                products: { [productCode]: productDetails },
                address,
                amount,
                status: status || 'Initiated'
            });

            const savedOrder = await newOrder.save();
            res.status(201).json(savedOrder);
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default connectToMongoDb(handler);
