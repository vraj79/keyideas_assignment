const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    approved: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
});

module.exports = UserModel = mongoose.model("user", UserSchema);