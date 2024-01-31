const mongoose = require("mongoose")

const Feedback = mongoose.model("Feedback", new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {type: String, required: true},
    rating: {type: String, required: true}
}))

module.exports = Feedback