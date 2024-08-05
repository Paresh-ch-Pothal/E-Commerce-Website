import Product from "@/models/product";
import connectToMongoDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == "POST") {
        for (let i = 0; i < req.body.length; i++) {
            const { title, slug, desc, img, category, size, color, price, availableQty } = req.body[i];
            let product = await Product.create({
                title, slug, desc, img, category, size, color, price, availableQty
            })
            res.status(200).json({ success: "success",product})
        }

    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectToMongoDb(handler)