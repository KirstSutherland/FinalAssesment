

/** Import the MongoClient object from the "mongodb" library
const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://localhost:27017/";

// Create a new instance of MongoClient with the specified URI
const client = new MongoClient(uri);

// Define an asynchronous function named "run"
async function run() {
  try {*/
    /** Query for a subject Maths

    // Query for a subject with the given id ('659be0ba55536751c8c91d18')
    const query = { id: '659be0ba55536751c8c91d18' };

    // Use the MongoClient to connect to the 'EducationApp' database
    // and retrieve the 'Subject' collection, then find one document that matches the query
    const subject = await client.db('EducationApp').collection('Subject').findOne(query);

    // Log the retrieved subject to the console
    console.log(subject);*/
/**  } finally {
    // Ensure that the MongoDB client will be closed when the operation finishes or encounters an error
    await client.close();
  }
}
// Call the run function and catch any errors, then log them to the console
run().catch(console.dir);*/