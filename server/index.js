const express = require("express");
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const cors = require('cors');

const app = express();
app.use(cors({
  origin: "https://shortify-url-three.vercel.app", 
  methods: ["GET", "POST"],
  credentials: true,
}));



const PORT = 3000;

connectToMongoDB('mongodb+srv://dhruvad575:DJvOwdRN4Pj5od5u@cluster0.vppvt.mongodb.net/shortify?retryWrites=true&w=majority&appName=Cluster0')
.then( () => console.log("Connected to MongoDB"))

app.use(express.json());//gives beloow error if not used 
// if (!body.url) return res.status(400).send("URL is REQUIRED") //.json({ error: 'url is required'})
// ^

// TypeError: Cannot read properties of undefined (reading 'url')

app.use('/', urlRoute)
app.get("/", (req, res) => {
  res.send("Server is running");
});



app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
