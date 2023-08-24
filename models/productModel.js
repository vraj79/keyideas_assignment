const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: {
        warehouseId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
    },
});

module.exports = ProductModel = mongoose.model("product", ProductSchema);

