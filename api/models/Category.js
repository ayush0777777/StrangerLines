const mongoose = require("mongoose");

// A mongoose schema defines structure of the document, default value, validators, etc
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

// A mongoose model provides an interface to the database for creating, querying, updating and deleting records

// Creating a collection 
module.exports = mongoose.model("Category", CategorySchema);