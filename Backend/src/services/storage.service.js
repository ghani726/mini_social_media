require("dotenv").config()


const {ImageKit} = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

const uploadFile = async (buffer, originalname) => {
    try {
        const res = await imagekit.files.upload({
            file: buffer.toString("base64"),
            fileName: originalname
        })

        return res;
    } catch(err){
        console.log(err);
        
    }
}

module.exports = uploadFile