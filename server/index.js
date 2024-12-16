const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());



const uri = process.env.MONGODB_URI;

// console.log(uri);

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
    // Send a ping to confirm a successful connection
    console.log("Connected to the server");

    const database = client.db("visa-navigator");
    const visaCollection = database.collection("visas");
    const applicationCollection = database.collection("applications");


    app.get('/visas', async (req, res) => {
      const visas = await visaCollection.find().toArray();
      res.send(visas);
    });

    app.get('/visas/:id', async (req, res) => {
      const id = req.params.id;
      const visa = await visaCollection.findOne({ _id: new ObjectId(id) });
      res.send(visa);
    });

    app.get('/latest', async (req, res) => {
      const visas = await visaCollection.find().sort({ createdAt: -1 }).limit(6).toArray();
      res.send(visas);
    });

    app.put('/visas/:id', async (req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID format' });
      }
      const { _id, ...visa } = req.body; // Exclude _id from the update data
      try {
        const result = await visaCollection.updateOne({ _id: new ObjectId(id) }, { $set: visa });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.delete('/visas/:id', async (req, res) => {
      const id = req.params.id;
      const result = await visaCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post('/visas', async (req, res) => {
      const visa = req.body;
      const result = await visaCollection.insertOne(visa);
      res.send(result);
      console.log(result)
    });




    app.post('/applications', async (req, res) => {
      const application = req.body;
      const result = await applicationCollection.insertOne(application);
      res.send(result);
    });

    app.get('/applications', async (req, res) => {
      const applications = await applicationCollection.find().toArray();
      res.send(applications);
    });

    app.delete('/applications/:id', async (req, res) => {
      const id = req.params.id;
      const result = await applicationCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });




  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Server is running on port ${ port }`)
})