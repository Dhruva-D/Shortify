const express = require("express");
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const cors = require('cors');

const app = express();
app.use(cors()); // Add this line to enable CORS for all routes



const PORT = 3000;

connectToMongoDB('mongodb://localhost:27017/short-url').then( () => console.log("Connected to MongoDB"))

app.use(express.json());//gives beloow error if not used 
// if (!body.url) return res.status(400).send("URL is REQUIRED") //.json({ error: 'url is required'})
// ^

// TypeError: Cannot read properties of undefined (reading 'url')

app.use('/', urlRoute)


app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
