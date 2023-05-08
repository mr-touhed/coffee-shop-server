require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express()
// meddleware 
app.use(cors())
app.use(express.json())

// 

//  

const port = process.env.PORT || 5000;



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.uhatjmn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeeCollection = client.db("coffeeDB").collection("coffee")



    app.post("/coffees", async (req,res) =>{
        const newData = req.body;
        console.log(newData);
        const result = await coffeeCollection.insertOne(newData)
        res.send(result)
    })
    app.get("/coffees", async(req,res) =>{
        const cursor = coffeeCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.delete("/coffees/:id", async(req,res) =>{
        const id = req.params.id
        console.log(id);
        const query = {_id: new ObjectId(id)}
        const result = await coffeeCollection.deleteOne(query)
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);








app.listen(port, () => console.log(`Coffee Server Is Running Now Port ${port}`))

