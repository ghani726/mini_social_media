// Imports

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const PostModel = require('./models/post.model');
const sharp = require('sharp');
const app = express();


// Middleware

app.use(cors());
app.use(express.json());

const uploadImage = multer({storage: multer.memoryStorage()})


// Route to create a new post with an image and caption

app.post("/post", uploadImage.array("image", 10), async (req, res)=> {
    
    // IF No Files, give an error
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }

    // If more than one file, give an error
    if (req.files.length > 1){
        return res.status(400).send('Only one file allowed');
    }

    // Extract caption and image from the request
    const caption = req.body.caption;
    const image = req.files[0];

    // Convert in .webp


        // 1. Convert and compress the buffer using Sharp
        const webpBuffer = await sharp(image.buffer)
            .webp({ quality: 80 }) // Converts to webp and reduces file size
            .toBuffer();

        // 2. Change the file extension for ImageKit naming
        const originalName = image.originalname.split('.')[0];
        const fileName = `${originalName}.webp`;


    // Upload the webp buffer to ImageKit

    const imageLink = await uploadFile(webpBuffer, fileName)


    // Create a new post in the database with the image URL and caption
    const post = await PostModel.create({
        image: imageLink.url,
        caption: caption,
    })

    // Return a success response with the created post details
    return res.status(201).json({
        message: "Post Created Successfully",
        post
    })
})


// Route to fetch all posts
app.get("/feed", async (req, res)=> {

    // Fetch all posts from the database
    const posts = await PostModel.find()

    // Return a success response with the list of posts
    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
})


// Export the app for use in the server file
module.exports = app;