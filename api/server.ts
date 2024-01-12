const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/subjects', (req, res) => {
    // get data from db
    // const result = await db.collection('subjects').find().toArray()

    


    // res.send(result)
    res.send([
        {
            name: 'Maths',
            id: 1
        },
        {
            name: 'Science',
            id: 2
        }
    ]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});