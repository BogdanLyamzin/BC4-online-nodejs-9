const fs = require("fs").promises;
// const fs = require("fs/promises");
const path = require("path");

// console.log(process.cwd());
// console.log(__dirname);

const readFile = async (filePath)=> {
    try {
        const data = await fs.readFile(filePath, "utf8");
        console.log(data);
        return data;
    }
    catch(error){
        throw error;
    }
}

const replaceFileContent = async (filePath, newData) => {
    try {
        const data = await fs.writeFile(filePath, newData);
        console.log(data);
    }
    catch(error){
        throw error;
    }
}

const addToFile = async(filePath, data) => {
    try {
        const newData = await fs.appendFile(filePath,`${data}\n`)
        console.log(newData);
    }
    catch(error){
        throw error;
    }
}

const moveFile = async(from, to) => {
    try {   
        const result = await fs.rename(from, to);
        console.log(result);
    }
    catch(error){
        throw error;
    } 
}

const deleteFile = async(filePath)=> {
    try {
        await fs.unlink(filePath)
    }
    catch(error){
        throw error;
    }
}

const filePath = path.join(process.cwd(), "text.txt");
const newFileContent = "JS >> Django"
// readFile(filePath)

// replaceFileContent(filePath, newFileContent)

// addToFile(filePath, "React >> Django")

// const fileReadRequest = fs.readFile(filePath, "utf8");

// moveFile(filePath, "files/text.txt")

deleteFile(filePath)

// fileReadRequest
//     .then(data => console.log(data))
//     .catch(error => console.log(error))





// fs.readFile(filePath, "utf8", (error, data)=> {
//     if(error){
//         console.log("Something was wrong");
//     }
//     console.log(data);
// })