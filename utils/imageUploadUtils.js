const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fileFilter = (req,file,cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('Only Image files are allowed!'),false)

    }
    cb(null,true)
}
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder: 'profile_pics_chat',
        format: async (req,file)=>{
          if(file.mimetype === 'image/jpeg') return jpg;
          if(file.mimetype === 'image/png') return png;
          return 'jpg';
        },
        public_id: (req,file)=> file.fieldname + '-' + Date.now()
    },
});

const upload = multer({storage:storage, fileFilter:fileFilter});
module.exports = {upload}