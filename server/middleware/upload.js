import multer from "multer";
import path from 'path';
import fs from 'fs';

const uploadDir = 'uploads/';

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({

    destination: (req,file,cb) => cb(null,uploadDir),
    
    filename: (req,file,cb) => cb(null,`${Date.now()}-${file.originalname}`),
});

const fileFilter = (req,file,cb) =>{
    const allowedTypes = ['application/pdf'];

    cb(null,allowedTypes.includes(file.mimetype));
};

const uploadPDF = multer({
    storage,fileFilter,
    limits:{
        fileSize: 2 * 1024 *1024
    }
});

export default uploadPDF;