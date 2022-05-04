const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/main'));

// Port setting
const port = 3000;
app.listen(port, function(){
  const dir = './uploadedFiles';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);  //폴더 존재하는지 확인하고 없으면 생성

  console.log('server on! http://localhost:'+port);
});