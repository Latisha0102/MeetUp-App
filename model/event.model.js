const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    type: String,
    date :String,
    time: String,
    location: String,
    description: String,
    image: String,
    creator: String,
    dressCode: String,
    price: String,
    ageRestriction: String,
    tags: String,
    speakers: [{type: String}]
})

const Event = mongoose.model("Event" , eventSchema)

module.exports(Event)