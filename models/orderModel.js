const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productIds: [mongoose.Schema.Types.ObjectId],
  status: String,
  orderDate: Date,
  totalAmount: Number,
});

module.exports = OrderModel = mongoose.model("order", OrderSchema);