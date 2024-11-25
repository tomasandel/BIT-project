const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "connectionString"; 
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db("mongodbVSCodePlaygroundDB"); 
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
}

connectToDatabase();


// Vulnerable endpoint
app.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const user = await db.collection("users").findOne(req.body);
    console.log("Query result:", user);

    if (user) {
        res.send("Login successful!, welcome " + user.username);
    } else {
        res.send("Invalid credentials.");
    }
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Server error.");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});