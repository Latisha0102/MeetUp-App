const {initializeDatabse} = require('./db/db.connect')
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())

const corsOption ={
    origin : "*",
    credentials: true
}

app.use(cors(corsOption))
const Event = require("./model/event.model")


//get all events

async function getAllEvents(){
 try{
    const event = await Event.find()
    return event
 }catch(error){
    console.log(error)
 }
}
app.get("/events" , async(req,res)=>{
       try{
        const event = await getAllEvents()
       }catch(error){
        res.status(400).json({error: "Error in retrieving data"})
       }
})

app.post("/events", async (req,res) =>{
    const newEvent = new Event(req.body)
    await newEvent.save()
    res.json(newEvent)
})

initializeDatabse()

PORT = 3000

app.listen(PORT , () =>{
    console.log("SErver is running on",PORT)
})