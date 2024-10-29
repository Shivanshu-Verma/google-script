const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});
// Endpoint to forward requests to Google Apps Script
app.post("/proxy", async (req, res) => {
  try {
    // Replace this with your actual Google Apps Script URL
    const googleScriptURL =
      "https://script.google.com/macros/s/AKfycbxV14yJJZsbG9NK4kmrXXY_ae2DnpY6af6OfNuLwJ8mfI5KZ2nn8sByByAD2qrOVrd1/exec";

    // Forward the request data to the Google Apps Script
    const response = await axios.post(googleScriptURL, req.body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Send the response from Google Apps Script back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding the request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});

module.exports = app;
