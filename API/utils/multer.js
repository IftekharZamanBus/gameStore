const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExtenstion(file.mimetype)}`)
     }
  })

  const getExtenstion = mimetype => {
    switch(mimetype){
        case "image/png":
            return ".png"
        case "image/jpeg":
            return ".jpeg"
        case "image/jpg":
            return ".jpg"
        
    }
  }

  module.exports = {storage}