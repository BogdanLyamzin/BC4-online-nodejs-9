const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");

const tempDir = path.join(process.cwd(), "temp");
const uploadImageDir = path.join(process.cwd(), "upload", "images");

// create multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        const now = new Date();
        const prefix = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`
        cb(null, `${prefix}_${file.originalname}`)
    },
    limit: {
        fileSize:1024000
    }
})

const uploadMiddlware = multer({
    storage
})

const app = express();

app.get("/", (req, res, next)=> {
    console.log(req.params);
    res.send("<h2>Welcome</h2>")
})

app.post("/profile", express.json(), uploadMiddlware.single("avatar"), async (req, res, next)=> {
    try {
        const {path: tempFileName, filename} = req.file;
        const newFileName = path.join(uploadImageDir, filename)
        await fs.rename(tempFileName, newFileName)
    }
    catch(error){
        next(error)
    }
})

const productsImages = [
    {
        name: "main-img", maxCount: 1
    },
    {
        name: "second-img", maxCount: 1
    }
]

app.post("/products", express.json(), uploadMiddlware.fields(productsImages), (req, res, next)=> {

})

app.listen(3000, ()=> console.log("Seerver runnig"))