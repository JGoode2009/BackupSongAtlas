const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('/Users/jonathangoode/Downloads/songatlasstorage-firebase-adminsdk-35d3v-f386f514e1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'songatlasstorage.appspot.com',
});

const app = express();
const bucket = admin.storage().bucket();

app.get('/download/:folder/:filename', async (req, res) => {
  const { folder, filename } = req.params;

  const file = bucket.file(`${folder}/${filename}`);

  try {
    const [fileExists] = await file.exists();

    if (fileExists) {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '1 week', // Adjust the expiration time as per your requirement
      });

      res.redirect(url);
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





