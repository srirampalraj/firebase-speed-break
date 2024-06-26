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

app.post('/addVehicle', (req, res) => {
  const postData = {
    speed: parseInt(req.body.speed).toString(),
    dateTime: new Date().toISOString(),
  };

  if (postData.speed) {
    database
      .ref('db')
      .push(postData)
      .then(() => {
        res.status(201).json({ message: 'Data added successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
