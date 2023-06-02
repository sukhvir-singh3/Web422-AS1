/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: sukhvir singh Student ID: 155312218 Date: 19-05-2023
* Link: https://gold-lucky-sawfish.cyclic.app/
*
********************************************************************************/
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const HTTP_PORtT = process.env.PORT || 8080
// This is to use the trimpDB module
const TripDB = require("./modules/tripDB.js")
const db = new TripDB()

require('dotenv').config()
const { MONGODB_CONN_STRING } = process.env
// const connectString = `mongodb+srv://dbUser:sukhvir1313@senecaweb.eab8l8x.mongodb.net/sample_training?retryWrites=true&w=majority`

app.use(cors())
app.use(express.json())

//Note: hi professor i was not sure to make the html file, since it was not a requirement from the docx file
//my api works as long as we test it from the thunder client

app.get('/', (req,res)=>{
    res.json({message: "API Listening"})
})

// TAKS 1
// This route will add the trips in our collection
app.post("/api/trips",(req,res)=>{
    const data = req.body
    db.addNewTrip(data)
    .then((data)=>{
        console.log(`This data has been added ${data}`)
        res.status(201).json(data)
    }).catch((err)=>{
        // Needed to pass valid error code
        res.status(500).json({errorMessage:`Error while Addeding Data`, err})
    })
})

// TAKS 2
// This route will get the trips based on page and perpage query
app.get("/api/trips",(req,res)=>{
   const page = parseInt(req.query.page)
   const perpage = parseInt(req.query.perPage)

   if(isNaN(page) || isNaN(perpage)){
    //needed to pass valid error code
        res.status(400).json(`Error occured while retrieving data`) 
        return
   }

   db.getAllTrips(page,perpage)
        .then((trip)=>{
            console.log(trip)
            //res.json({message:"Successfully retrieved Trips"})
        	res.status(201).json(trip)
        }).catch((err)=>{
            //needed to pass valid error code
            res.status(500).json({errorMessage:`Error occured while retrieving data ${err}`})
        })
})

// TAKS 3
//This route will return trips based on the _id
app.get('/api/trips/:id', (req,res)=>{
    const id = req.params.id
    db.getTripById(id)
        .then((trip)=>{
            console.log(trip)
        	res.status(201).json(trip)
        }).catch((err)=>{
            // Needed to pass valid error code
            res.status(500).json({errorMessage:`error while getting trip by _id(${id}), ${err}`})
        })

})

// TAKS 4
// This route will update one trip based on the _id specified in route
app.put('/api/trips/:id', (req,res)=>{
    const id = req.params.id
    const data = req.body

    db.updateTripById(data, id)
        .then(()=>{
        	res.status(201).json(data)
        }).catch((err)=>{
            // Needed to pass valid error code
            res.status(500) .json({errorMessage:`unable to update trip based on id provided: ${err}`})
        })
})

// TAKS 5
//This route will be used to delete the trip based on _id
app.delete('/api/trips/:id', (req,res)=>{
    const id = req.params.id

    db.deleteTripById(id)
        .then(()=>{
            res.json("Trip has been deleted! based on id")
        }).catch((err)=>{
                // Needed to pass valid error code
            res.status(500).json({errorMessage:`unable to delete trip based on id provided: ${err}`})
        })
})

db.initialize(MONGODB_CONN_STRING)
    .then(()=>{
        app.listen(8080,()=>{
            console.log("Server listening on 8080")
        })
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({errorMessage:"Unable to connect to local server:", err})
    })
