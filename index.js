// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
// const app = express();
// const mongoURL = 'mongodb://0.0.0.0:27017/Images';

// // Create Mongoose connection
// mongoose.connect(mongoURL)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// // Create a GridFS stream
// let gfs; // GridFS stream
// mongoose.connection.once('open', () => {
//     const db = mongoose.connection.db;
//     gfs = new mongoose.mongo.GridFSBucket(db);
//   console.log('GridFS stream initialized');
// });

// // Create a Mongoose schema for the uploaded image
// const imageSchema = new mongoose.Schema({
//   filename: String,
//   contentType: String,
//   fileId: mongoose.Schema.Types.ObjectId,
// });

// // Create a Mongoose model based on the schema
// const Image = mongoose.model('Image', imageSchema);

// // Create a storage engine for multer-gridfs-storage
// const storage = new GridFsStorage({
//   url: mongoURL,
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: 'uploads', // The name of the GridFS bucket (collection)
//     };
//   },
// });

// const upload = multer({ storage });

// app.post('/upload', upload.single('image'), async (req, res) => {
//   const { originalname, mimetype } = req.file;

//   // Create a new image document in the database with fileId reference
//   const image = new Image({
//     filename: originalname,
//     contentType: mimetype,
//     fileId: new mongoose.Types.ObjectId(req.file.id),
//   });
// console.log(req.file.id)
//   try {
//     await image.save();
//     res.status(200).json({ message: 'Image uploaded successfully!' });
//   } catch (err) {
//     console.error('Error saving image document:', err);
//     res.status(500).json({ error: 'Failed to save the image document.' });
//   }
// });

// app.get('/image/:imageId', async (req, res) => {
//     const { imageId } = req.params;
  
//     try {
//       const image = await Image.findById(imageId);
//       if (!image) {
//         return res.status(404).json({ error: 'Image not found.' });
//       }
  
//       const readstream =  gfs.openDownloadStream(ObjectId(image.fileId));
  
//       readstream.on('error', (err) => {
//         console.error('Error reading image:', err);
//         res.status(404).json({ error: 'Image not found.' });
//       });
  
//       res.set('Content-Type', image.contentType);
//       readstream.pipe(res);
//     } catch (err) {
//       console.error('Error finding image:', err);
//       res.status(500).json({ error: 'Failed to fetch the image.' });
//     }
//   });
  


// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const { MongoClient, ObjectId } = require('mongodb');

// const app = express();
// const mongoURL = 'mongodb://0.0.0.0:27017/Images';

// // Create Mongoose connection
// mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// let gfs; // GridFS stream

// // Set up GridFSBucket using the native MongoDB driver
// mongoose.connection.once('open', () => {
//   const db = mongoose.connection.db;
//   gfs = new mongoose.mongo.GridFSBucket(db);
//   console.log('GridFS stream initialized');
// });

// // Create a Mongoose schema for the uploaded image
// const imageSchema = new mongoose.Schema({
//   filename: String,
//   contentType: String,
//   fileId: mongoose.ObjectId,
// });

// // Create a Mongoose model based on the schema
// const Image = mongoose.model('Image', imageSchema);

// // Create a storage engine for multer-gridfs-storage
// const storage = new GridFsStorage({
//   url: mongoURL,
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: 'uploads', // The name of the GridFS bucket (collection)
//     };
//   },
// });

// const upload = multer({ storage });

// app.post('/upload', upload.single('image'), async (req, res) => {
//   const { originalname, mimetype } = req.file;

//   // Create a new image document in the database with fileId reference
//   const image = new Image({
//     filename: originalname,
//     contentType: mimetype,
//     fileId: new mongoose.Types.ObjectId(req.file.id),
//   });

//   try {
//     await image.save();
//     res.status(200).json({ message: 'Image uploaded successfully!' });
//   } catch (err) {
//     console.error('Error saving image document:', err);
//     res.status(500).json({ error: 'Failed to save the image document.' });
//   }
// });

// // ...

// app.get('/image/:imageId', async (req, res) => {
//     const { imageId } = req.params;
  
//     try {
//       const image = await Image.findById(imageId);
//       if (!image) {
//         return res.status(404).json({ error: 'Image not found.' });
//       }
  
//     //   console.log('Image:', image.fileId); // Log the image document to inspect its values
  
//       const readstream =  gfs.openDownloadStream(image.fileId);
  
//       readstream.on('error', (err) => {
//         console.error('Error reading image:', err);
//         res.status(404).json({ error: 'Image not found.' });
//       });
  
//       // Log the actual file ID to compare with the stored `fileId` in the Image document
//       console.log('File ID:', image.fileId);
  
//       res.set('Content-Type', image.contentType);
//       readstream.pipe(res);
//     } catch (err) {
//       console.error('Error finding image:', err);
//       res.status(500).json({ error: 'Failed to fetch the image.' });
//     }
//   });
  
//   // ...
  

// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const { ObjectId } = mongoose.Types;
// const multer = require('multer');

// const app = express();
// const mongoURL = 'mongodb://0.0.0.0:27017/testingImage';

// mongoose.connect(mongoURL)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// let gfs; // GridFS stream
// mongoose.connection.once('open', () => {
//   gfs = Grid(mongoose.connection.db, mongoose.mongo);
//   console.log('GridFS stream initialized');
// });

// const storage = new GridFsStorage({
//   url: mongoURL,
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: 'uploads',
//     };
//   },
// });

// const upload = multer({ storage });

// app.post('/upload', upload.single('image'), (req, res) => {
//   res.status(200).json({ message: 'Image uploaded successfully!' });
// });


// app.get('/image/:imageId', (req, res) => {
//     const { imageId } = req.params;

//     try {
//       const fileId = new ObjectId(imageId);
  
//       console.log(fileId);
//       // Find the file in the GridFS collection by its ObjectId
//       gfs.files.findOne({ _id: fileId }, (err, file) => {
//         if (err) {
//           console.error('Error finding file:', err);
//           return res.status(500).json({ error: 'Failed to fetch the image.' });
//         }
  
//         if (!file) {
//           return res.status(404).json({ error: 'Image not found.' });
//         }
  
//         // Set the appropriate content type and disposition for the response
//         res.set('Content-Type', file.contentType);
//         res.set('Content-Disposition', `inline; filename="${file.filename}"`);
  
//         // Create a read stream and pipe it to the response to send the image data
//         const readstream = gfs.createReadStream({ _id: fileId });
//         readstream.pipe(res);
//       });
//     } catch (err) {
//       console.error('Error finding image:', err);
//       res.status(500).json({ error: 'Failed to fetch the image.' });
//     }
//   });

// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });


const express = require('express');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://0.0.0.0:27017/ImageChunk';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

// Create GridFS stream for handling file chunks
let gfs;
conn.once('open', () => {
   //Init Stream
   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  })
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create a new Mongoose model for storing image metadata
const ImageModel = mongoose.model('Image', new mongoose.Schema({
  filename: String,
  fileId: mongoose.Types.ObjectId
}));

// Multer middleware for handling file uploads
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads' // Same as the collection name for GridFS
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// Express app setup
const app = express();

// Route for handling image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Create a new image document to store metadata
    const image = new ImageModel({
      filename: req.file.filename,
      fileId: req.file.id
    });

    // Save the image metadata to the database
    await image.save();

    res.status(201).json({ message: 'Image uploaded successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload image.' });
  }
});
// ... (previous code)

// GET route for fetching the image by filename
app.get('/image/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;

    // Find the image metadata in the ImageModel collection
    const image = await ImageModel.findOne({ filename: filename });

    if (!image) {
      return res.status(404).json({ error: 'Image not found.' });
    }

    // Fetch the image chunks from GridFS using gridfs-stream
    const readStream = gridfsBucket.openDownloadStream(new mongoose.Types.ObjectId(image.fileId));

    // Set the appropriate content type for the response
    res.set('Content-Type', 'image/jpeg'); // Change this based on the image type

    // Pipe the image chunks to the response
    readStream.pipe(res); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch image.' });
  }
});


// ... (rest of the code)

// const port = 3000;
// app.listen(port, () => console.log(`Server started on port ${port}`));
// ... (rest of the code)

// const port = 3000;
// app.listen(port, () => console.log(`Server started on port ${port}`));



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});