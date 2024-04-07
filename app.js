// server.js

import express from 'express';
import admin from 'firebase-admin';
import data from './config/keys.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
const serviceAccount = data; // Path to your service account key JSON file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://speeeeeeeedbreaker-default-rtdb.firebaseio.com', // Your Firebase Realtime Database URL
});

// Reference to your Firebase Realtime Database
const database = admin.database();

const app = express();
const PORT = 3000;
app.use(express.json());

// Route to handle POST requests to add data
app.post('/data', (req, res) => {
  console.log(req);
  // Sample data
  const postData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Push the data to Firebase
  database
    .ref('data')
    .push(postData)
    .then(() => {
      res.status(201).json({ message: 'Data added successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.get('/status', (req, res) => {
  res.type('text');
  res.end('Status: Active');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
