const mongoose = require('mongoose');
// console.log(mongoose)
mongoose.connect("mongodb://localhost:27017/Project").then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const PersonalDetailsSchema = new mongoose.Schema({
    userId: {
        type:String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    DoB: {
        type: Date,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    phone: {
        type: Number,
        // required: true
    },
    email: {
        type: String,
        // required: true
    }
});

// // collection part
const collection = new mongoose.model("PersonalDetails", PersonalDetailsSchema);

module.exports = collection;