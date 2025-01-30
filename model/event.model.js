const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    type: String,
    date :String,
    startingTime: String,
    endingTime: String,
    location: String,
    description: String,
    image: String,
    organizer: String,
    dressCode: String,
    price: String,
    ageRestrictions: String,
    tags: [{type: String}],
    speakers: [{name: String , position: String}]
})

const Event = mongoose.model("Event" , eventSchema)

module.exports = Event