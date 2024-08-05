const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: String,
        default: " "
    },
    products: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    name: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Initiated",
        required: true
    },
    deliveryStatus: {
        type: String,
        default: "unshipped",
        required: true
    },
    transactionId: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;
