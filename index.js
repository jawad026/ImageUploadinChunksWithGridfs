const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const cors = require("cors");
// Replace with your MongoDB connection string
const mongoURI = "mongodb://0.0.0.0:27017/ImageChunk";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

// Create GridFS stream for handling file chunks
let gfs;
conn.once("open", () => {
  //Init Stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create a new Mongoose model for storing image metadata
const ImageModel = mongoose.model(
  "Image",
  new mongoose.Schema({
    filename: String,
    fileId: mongoose.Types.ObjectId,
  })
);

// Multer middleware for handling file uploads
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads", // Same as the collection name for GridFS
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// Express app setup
const app = express();

app.use(cors());
// Route for handling image upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Create a new image document to store metadata
    const image = new ImageModel({
      filename: req.file.filename,
      fileId: req.file.id,
    });

    // Save the image metadata to the database
    await image.save();

    res.status(201).json({ message: "Image uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload image." });
  }
});
// ... (previous code)

// GET route for fetching the image by filename
app.get("/image/:fileId", async (req, res) => {
  try {
    // Fetch the image chunks from GridFS using gridfs-stream
    const readStream = gridfsBucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.fileId)
    );

    // Set the appropriate content type for the response
    res.set("Content-Type", "image/jpeg"); // Change this based on the image type

    // Pipe the image chunks to the response
    readStream.pipe(res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch image." });
  }
});

app.get("/image", async (req, res) => {
  try {
    // Find the image metadata in the ImageModel collection
    const image = await ImageModel.find();
    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }
    // Set the appropriate content type for the response
    res.status = 200;
    res.json(image);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch image." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
