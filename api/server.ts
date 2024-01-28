
const mongo = require('mongodb')
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// MongoDB connection URI
const uri = "mongodb://localhost:27017/";
// Create a new instance of MongoClient with the specified URI
const client = new mongo.MongoClient(uri);

const corsOperations = {
    origin: "http://localhost:4200",
}
app.use(cors(corsOperations));
app.use(express.json());

/**GET ALL DOCUMENTS IN SUBJECT COLLECTION */
app.get('/subject', async (req, res) => {
    const allSubjects = await client.db('EducationApp').collection('Subjects').find().toArray();
    res.send(allSubjects);
});

/**GET ALL DOCUMENTS IN STUDENT COLLECTION */
app.get('/student', async (req, res) => {
  const allStudents = await client.db('EducationApp').collection('Students').find().toArray();
  res.send(allStudents);
});

/**GET A SPECIFIC SUBJECT IN SUBJECT COLLECTION */
app.get('/subject/:searchValue', async (req, res) => {
    try {
        const subjectNameToFind = req.params.searchValue; // Use req.params to get the route parameter
        const query = { subjectName: subjectNameToFind };
        const searchSubject = await client.db('EducationApp').collection('Subjects').findOne(query);
        res.send(searchSubject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**GET A SPECIFIC STUDENT IN STUDENT COLLECTION */
app.get('/student/:searchValue', async (req, res) => {
  try {
      console.log('here');
      const studentIDToFind = req.params.searchValue; // Use req.params to get the route parameter
      const query = { studentID: studentIDToFind };
      const searchStudent = await client.db('EducationApp').collection('Students').findOne(query);
      res.send(searchStudent);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**DELETE A SPECIFIC DOCUMENT IN THE SUBJECTS COLLECTION*/
app.delete('/api/subjects/:deleteInputValue', async (req, res) => {
  try {
    const deleteInputValue = req.params.deleteInputValue;
    const query = { subjectName: deleteInputValue };
    const deletedSubject = await client.db('EducationApp').collection('Subjects').findOneAndDelete(query);
    res.send(deletedSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**DELETE A SPECIFIC DOCUMENT IN THE STUDENTS COLLECTION*/
app.delete('/api/student/:deleteInputValue', async (req, res) => {
  try {
    const deleteInputValue = req.params.deleteInputValue;
    const query = { studentID: deleteInputValue };
    const deletedStudent = await client.db('EducationApp').collection('Students').findOneAndDelete(query);
    res.send(deletedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**ADD A NEW SUBJECT TO THE SUBJECTS COLLECTION */
app.post('/api/subjects', async (req, res) => {
  try {
    const { subjectName, teacherName } = req.body;

    // Fetch the latest subjectID from the database and increment it
    const latestSubject = await client.db('EducationApp').collection('Subjects').findOne({}, { sort: { subjectID: -1 } });

    const newSubjectID = (latestSubject?.subjectID || 0) + 1;

    // Create a new subject object
    const newSubject = {subjectID: newSubjectID, subjectName: subjectName, teacherName: teacherName,
    };

    // Insert the new subject into the database
    const result = await client.db('EducationApp').collection('Subjects').insertOne(newSubject);

    res.status(201).json(result.ops[0]); // Send back the created subject
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', details: error.message });

  }
});

/**ADD A NEW STUDENT TO THE STUDENTS COLLECTION */
app.post('/api/student', async (req, res) => {
  try {
    const { newStudentID, newFirstName, newLastName } = req.body;

    // Create a new subject object
    const newStudent = {studentID: newStudentID, firstName: newFirstName, lastName: newLastName, };

    // Insert the new subject into the database
    const result = await client.db('EducationApp').collection('Students').insertOne(newStudent);

    res.status(201).json(result.ops[0]); // Send back the created subject
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', details: error.message });

  }
});
/**UPDATE A VALUE FOR A SPECIFIC SUBJECT IN THE SUBJECTS COLLECTION */ 
app.put('/api/subjects/:subjectName/:property', async (req, res) => {
  try {
      const subjectNameToUpdate = req.params.subjectName;
      const propertyToUpdate = req.params.property;
      const newValue = req.body.newValue;

      const query = { subjectName: subjectNameToUpdate };
      const updateField = { [propertyToUpdate]: newValue };

      const updatedSubject = await client.db('EducationApp').collection('Subjects').findOneAndUpdate(
          query,
          { $set: updateField },
          { returnDocument: 'after' }
      );

      if (updatedSubject.value) {
          res.send(updatedSubject.value);
      } else {
          res.status(404).json({ error: 'Subject not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**UPDATE A VALUE FOR A SPECIFIC STUDENT IN THE STUDENTS COLLECTION */ 
app.put('/api/student/:studentID/:property', async (req, res) => {
  try {
    const studentIDToUpdate = req.params.studentID;
    const propertyToUpdate = req.params.property;
    const newValue = req.body.newValue;

    const query = { studentID: studentIDToUpdate }; // Change to studentID
    const updateField = { [propertyToUpdate]: newValue };

    const updatedStudent = await client
      .db('EducationApp')
      .collection('Students')
      .findOneAndUpdate(
        query,
        { $set: updateField },
        { returnDocument: 'after' }
      );

    if (updatedStudent.value) {
      res.send(updatedStudent.value);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});