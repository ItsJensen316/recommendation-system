const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Project").then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})
// Create Address Details Schema
const AddressDetailsSchema = new mongoose.Schema({
    residential_address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const AddressDetails = mongoose.model("AddressDetails", AddressDetailsSchema);

module.exports = AddressDetails;
