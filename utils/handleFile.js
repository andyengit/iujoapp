import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/img/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "IujoAppImage-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

let handleFile = upload.single("file");


export default handleFile;
