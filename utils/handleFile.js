import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = 'public'
    let dirfile = ''
    if (!req.query.filename) {
      dirfile = '/uploads/files/'
      if (file.mimetype.startsWith('image')) {
        dirfile = "/uploads/img/";
      }
    } else {
      dirfile = '/base/'
    }

    cb(null, dir + dirfile)
  },
  filename: function(req, file, cb) {
    let namefile = req.query.filename || "file-" + Date.now() + path.extname(file.originalname)
    cb(null, namefile);
  },
});

let upload = multer({
  storage: storage,
});

let handleFile = upload.single("file");


export default handleFile;
