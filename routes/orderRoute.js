const express = require("express");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const orderRouter = express.Router();

orderRouter.post('/placeOrder', async (req, res) => {
    const { userId, productIds } = req.body;

    try {
        const products = await Product.find({
            _id: { $in: productIds },
            'stock.quantity': { $gte: 1 },
        });

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newOrder = new Order({
            userId: user._id,
            productIds,
            status: 'Pending',
        });

        for (let i = 0; i < products.length; i++) {
            products[i].stock.quantity -= 1;
            await products[i].save();
        }

        await newOrder.save();

        return res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred.'+error });
    }
});

module.exports = orderRouter;
