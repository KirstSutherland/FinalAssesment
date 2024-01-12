import { SubjectService } from "src/app/services/subject.service";
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    // Query for a student t
    const query = { id: '659be0ba55536751c8c91d18' };
    const subject = await client.db('EducationApp').collection('Subject').findOne(query);

    console.log(subject);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);