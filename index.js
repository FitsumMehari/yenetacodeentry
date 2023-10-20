const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const Product = require("./models/Product");
const { log } = require("console");

const app = express();
const PORT = 3000;

const MONGODB_URL =
    "mongodb+srv://products:products@products.vle04p4.mongodb.net/?retryWrites=true&w=majority";

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

app.get("/getProducts", async(req, res) => {
    await Product.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {});
});

app.get("/getProduct:id", async(req, res) => {
    try {
        const product = await Product.findById(req.params.id.substring(1));
        res.status(200).json(product);
    } catch (error) {}
});

app.delete("/:id", async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id.substring(1));
        res.status(200).json(product);
        console.log(product);
    } catch (error) {}
});

app.post("/", async(req, res) => {
    console.log(req.body.productDetails);
    try {
        const product = await new Product({
            pName: req.body.productDetails.pName,
            pDesc: req.body.productDetails.pDesc,
            pPrice: req.body.productDetails.pPrice,
            pQuantity: req.body.productDetails.pQuantity,
            isAvialable: true,
        });

        await product
            .save()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                // next(err);
            });
    } catch (err) {
        // next(err);
    }
});

app.put("/:id", async(req, res) => {
    console.log(req.params.id.substring(1));
    try {
        const product = await Product.findOneAndUpdate({}, {
            pName: req.body.productDetails.pName,
            pDesc: req.body.productDetails.pDesc,
            pPrice: req.body.productDetails.pPrice,
            pQuantity: req.body.productDetails.pQuantity,
            isAvialable: true,
        }, {
            new: true,
        });

        res.status(200);
    } catch (err) {
        // next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});