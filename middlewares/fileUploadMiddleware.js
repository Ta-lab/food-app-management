const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        // Make file name unique to avoid overwriting
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to accept only images (e.g., jpg, png)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only jpg, jpeg, and png are allowed.'), false);
    }
};

// Set up multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024  // Max size 10 MB
    }
});

module.exports = upload;
