const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Project").then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})
// Create Optional Questions Schema
const OptionalQuestionsSchema = new mongoose.Schema({
    social_media_links: {
        type: String,
        required: false
    },
    research_interests: {
        type: String,
        required: false
    },
    publications: {
        type: String,
        required: false
    }
});

const OptionalQuestions = mongoose.model("OptionalQuestions", OptionalQuestionsSchema);

module.exports = OptionalQuestions;
