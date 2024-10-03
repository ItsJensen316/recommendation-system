const mongoose = require('mongoose');
// console.log(mongoose)
mongoose.connect("mongodb://localhost:27017/Project").then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Professional Information Schema
const ProfessionalInformationSchema = new mongoose.Schema({
    employee_code: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: ["Professor", "Assistant Professor", "Associate Professor", "Lecturer"],
        required: true
    },
    department: {
        type: String,
        required: true
    },
    date_of_joining: {
        type: Date,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: false
    }
});

const ProfessionalInformation = mongoose.model("ProfessionalInformation", ProfessionalInformationSchema);

module.exports = ProfessionalInformation;
