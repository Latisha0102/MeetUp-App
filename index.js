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
    const allEvents = await Event.find()
    return allEvents
 }catch(error){
    console.log(error)
 }
}
app.get("/events" , async(req,res)=>{
       try{
        const event = await getAllEvents()
      if(event.length != 0){
        res.json(event)
      }else{
           res.send(400),json({message: "No event found"})
      }
        
       }catch(error){
        res.status(500).json({error: "Error in retrieving data"})
       }
})

async function createEvent(newEvent){
  try{
    const event = new Event(newEvent)
    const saveEvent= await event.save()
    return saveEvent
  }catch(error){
    console.log(error)
  }
}
app.post("/events", async (req,res) =>{
   try{
   const savedEvent = await createEvent(req.body)
   res.status(201).json({message: "Event added successfully" , event: savedEvent})
   }catch(error){
    res.status(500).json({error: "Error in creating event"})
   }
})

initializeDatabse()

async function getEventByTitle(eventTitle){
  try{
    const event = await Event.findOne({title: eventTitle})
    return event
  }catch(error){
    console.log(error)
  }
}

app.get("/events/:title", async (req,res) => {
  try{
    const event = await getEventByTitle(req.params.title)
  if(event){
    res.json(event)
  }else{
    res.status(404).json({message: "Event not found"})
  }
  }catch(error){
    res.json(500).json({error: "Failed to fetch events."})
  }
})
const PORT = 3000

app.listen(PORT , () =>{
    console.log("SErver is running on",PORT)
})