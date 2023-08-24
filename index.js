const express = require("express");
const connectDB = require("./database/db");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const productRouter = require("./routes/productRoute");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use('/user', userRouter)
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.get('/', (req, res) => {
    res.send("Hello World");
});

const port = process.env.PORT || 8080;

app.listen(port, connectDB(), () => console.log(`Server running on port ${port} 🔥`));