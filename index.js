const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const Product = require("./models/Product");

const app = express();
const PORT = 3000;

const MONGODB_URL = "mongodb+srv://products:products@products.vle04p4.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log("DB connected successfully!");
    })
    .catch((error) => {
        console.log(error);
    });

app.use(express.static("app"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./app/pages/home.html"));
});

app.post("/", async(req, res) => {
    try {
        const product = new Product({
            // name: req.body.username,
            // description: req.body.rating,
            // price: req.body.review_string,
            // quanity: req.body.productQuantity,
            // isAvialable: true
            name: "name",
            description: "desc",
            price: "price",
            quanity: 15,
            isAvialable: true
        });

        await product.save().then((result) => {
            console.log(result);
            // res.status(200).json(result)
        }).catch((err) => {
            // next(err);
        });

    } catch (err) {
        // next(err);
    }
});

app.put("/", (req, res) => {});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});