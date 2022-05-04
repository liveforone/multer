// <main.js> //
//==dependencies==//
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage  = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploadedFiles/');
  },
  filename(req, file, cb) {
    //중복파일이 업로드되더라도 앞에 시간이 있기 때문에 구별가능
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
//upload 미들웨어를 만들고 저장되는 파일의 이름을 무작위로 변경한다.
const upload = multer({ dest: 'uploadedFiles/' });
//파일명을 유지하는 미들웨어를 만듦
const uploadWithOriginalFilename = multer({ storage: storage });


//==routing==//
router.get('/', (req,res) => {
  res.render('upload');
});

//single로 하나의 파일을 처리, singe() form에서 사용된 파일 input 필드의 이름(name)이 들어갑니다.
router.post('/uploadFile', upload.single('attachment'), (req,res) => {
  res.render('confirmation', { file:req.file, files:null });
});  //싱글파일은 file:req.file로

//하나의 파일인데, 파일명을 유지
router.post('/uploadFileWithOriginalFilename', uploadWithOriginalFilename.single('attachment'), (req,res) => {
  res.render('confirmation', { file:req.file, files:null });
});  //싱글파일은 file:req.file로

//여러개의 파일을 처리하기 위해 upload.array()를 사용
router.post('/uploadFiles', upload.array('attachments'), (req,res) => {
  res.render('confirmation', { file: null, files:req.files} );
});  //다중 파일은 files:req.fiels로

//여러개 파일인데, 파일명을 유지
router.post('/uploadFilesWithOriginalFilename', uploadWithOriginalFilename.array('attachments'), (req,res) => {
  res.render('confirmation', { file:null, files:req.files });
});  //다중 파일은 files:req.fiels로

module.exports = router;