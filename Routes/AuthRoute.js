const {signUp,Login, SendMail, UpdateProfile, UpdateProfileImg}=require("../Controllers/AuthController")
const router = require("express").Router();
const multer = require('multer');
const path = require('path');

// Set up multer storage and file name configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); // Specify the directory where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid duplicates
//   },
// });
const storage = multer.diskStorage({});

// Create a multer instance with the storage configuration
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },

});

router.post("/signup", signUp)
router.post('/login', Login)
router.put("/update-profile/:id",UpdateProfile)
router.put("/uploads/update-pic/:id",upload.single('file'), UpdateProfileImg)
router.post('/sendmail', SendMail)
module.exports= router;





