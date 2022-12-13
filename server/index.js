const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;
const { connectDB } = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddlware");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", require("./routes/authRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/create-checkout-session", require("./routes/stripeRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on port:${port}`));
