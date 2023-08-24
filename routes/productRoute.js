const express = require("express");
const Product = require("../models/productModel");
const Warehouse = require("../models/warehouseModel");

const productRouter = express.Router();

productRouter.post('/create', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product Added successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Product Addition failed.' + error });
    }
})

productRouter.post('/add/warehouse',async(req,res)=>{
    try {
        const warehouse = new Warehouse(req.body);
        await warehouse.save();
        res.status(201).json({ message: 'Warehouse Added successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Warehouse Addition failed.' + error });
    }
})
module.exports = productRouter;