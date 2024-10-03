const mongoose = require('mongoose');
// console.log(mongoose)
mongoose.connect("mongodb://localhost:27017/Project").then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
    username: {
        type:String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    }
});

// // collection part
const collection = new mongoose.model("faculties", Loginschema);

module.exports = collection;