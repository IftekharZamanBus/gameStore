// Import the multer library for handling file uploads
const multer = require('multer');
const path = require('path');

// Define disk storage settings for multer
const storage = multer.diskStorage({
    // Set the destination folder for uploaded files
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'))
    },
    // Set the filename for uploaded files
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExtension(file.mimetype)}`)
    }
});

// Define a function to get file extension based on MIME type
const getExtension = mimetype => {
    switch(mimetype){
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
        case "image/jpg":
            return ".jpg";
        default:
            return ""; // Handle other mimetypes if needed
    }
};

// Create a multer instance with the defined storage settings
const upload = multer({ storage: storage });

// Export the multer instance for use in other parts of your application
module.exports = upload;
