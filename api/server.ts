
const mongo = require('mongodb')
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// MongoDB connection URI
const uri = "mongodb://localhost:27017/";
// Create a new instance of MongoClient with the specified URI
const client = new mongo.MongoClient(uri);

app.get('/subjects', async (req, res) => {
    // get data from db
    // const result = await db.collection('subjects').find().toArray()

    //Query for a subject Maths

    // Query for a subject with the given id ('659be0ba55536751c8c91d18')
    const query = { subjectID: '1' };

    // Use the MongoClient to connect to the 'EducationApp' database
    // and retrieve the 'Subject' collection, then find one document that matches the query
    const result = await client.db('EducationApp').collection('Subjects').find().toArray();


    res.send(result)
    /**res.send([
        {
            name: 'Maths',
            id: 1
        },
        {
            name: 'Science',
            id: 2
        }
    ]);*/
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});