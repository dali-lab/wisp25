import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;


const express = require("express"); 
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();


const mongo_uri = process.env.MONGO_URI; 
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect( mongo_uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB not connected:", err));

  
  const Connection = require("./chat.js");
const { env } = require("process");

  app.post('/newConnection', async (req, res) => {
    try {
      const newConnection = new Connection(req.body);
      await newConnection.save();
      res.status(201).json({ message: 'Connection added!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  

  app.get("/", (req, res) => {
    res.send("Server is running!");
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  })

