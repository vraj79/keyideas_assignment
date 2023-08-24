const express = require("express");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'User registration failed.' + error });
    }
});

userRouter.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
            password: password,
            approved: true,
        });

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials or user not approved' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' + error });
    }
});

// userRouter.get('/orders', async (req, res) => {
//     try {
//         const result = await Order.aggregate([
//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'userId',
//                     foreignField: '_id',
//                     as: 'userDetails',
//                 },
//             },
//             {
//                 $unwind: '$userDetails',
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     firstName: '$userDetails.firstName',
//                     lastName: '$userDetails.lastName',
//                     orderDate: 1,
//                     totalAmount: 1,
//                 },
//             },
//         ]);

//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({ message: 'An error occurred.' + error });
//     }
// });

userRouter.get('/orders', async (req, res) => {
    try {
        const result = await Order.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $lookup: {
                    from: 'products', // Assuming your collection name is 'products'
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $unwind: '$productDetails',
            },
            {
                $project: {
                    _id: 0,
                    firstName: '$userDetails.firstName',
                    lastName: '$userDetails.lastName',
                    productName: '$productDetails.name',
                    orderDate: 1,
                    totalAmount: 1,
                },
            },
        ]);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' + error });
    }
});

userRouter.post('/create/orders', async (req, res) => {
    const { userId, productIds } = req.body;

    try {
        const products = await Product.find({
            _id: { $in: productIds },
            'stock.quantity': { $gt: 1 },
        });
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // if (product.stock.quantity > 0) {
        // Create an order and deduct the stock quantity
        const newOrder = new Order({
            userId: user._id,
            productId: productIds,
            status: 'Pending', // You can set the initial status here
        });

        for (let i = 0; i < products.length; i++) {
            products[i].stock.quantity -= 1;
            await products[i].save();
        }

        await newOrder.save();

        return res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred' });
    }
});
module.exports = userRouter;