const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    pName: {
        type: String,
        // required: true
    },
    pDesc: {
        type: String,
        // required: true
    },
    pPrice: {
        type: String,
        // required: true
    },
    pQuantity: {
        type: Number,
        // require: true
    },
    isAvialable: {
        type: Boolean,
    },
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);
module.exports = Product;