const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
    name: String,
});

module.exports = WarehouseModel = mongoose.model("warehouse", warehouseSchema);