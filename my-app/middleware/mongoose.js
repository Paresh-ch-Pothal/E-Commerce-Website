import mongoose from "mongoose";

const connectToMongoDb = (handler) => async (req, res) => {
    try {
        // Check if already connected
        if (mongoose.connections[0].readyState !== 1) {
            // Not connected, so connect now
            await mongoose.connect("mongodb://localhost:27017/Coding-Tshirt", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000, // 30 seconds
                socketTimeoutMS: 45000, // 45 seconds
            });
            console.log('Connected to MongoDB');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Connection successful or already connected, proceed with the handler
    return handler(req, res);
};

export default connectToMongoDb;
