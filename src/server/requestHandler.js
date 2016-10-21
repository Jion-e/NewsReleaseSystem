var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    firebase = require("firebase");

var config = {
  apiKey: "AIzaSyDxUppBRTczs5FWVfmQaiqKve6zaw1_-_I",
  authDomain: "newssystem-2b6d6.firebaseapp.com",
  databaseURL: "https://newssystem-2b6d6.firebaseio.com",
  storageBucket: "newssystem-2b6d6.appspot.com",
  messagingSenderId: "830388281949"
}
firebase.initializeApp(config)

// var storage = firebase.storage();
// var storageRef = storage.ref();

// console.log(firebase);
function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload" multiple="multiple">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    form.uploadDir = "D:\\img";
    console.log("about to parse1");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        console.log(files.upload.path);
        fs.renameSync(files.upload.path, "D:\\img\\test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
  });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("D:\\img\\test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

function uploadStorage(files){
  // const file = document.getElementById('cke_108_fileInput_input').files[0];
  const file = files
  const id = Date.parse(new Date()) / 1000

  const metadata = {
    // contentType: 'image/jpeg'
  };

  const uploadTask = storageRef.child('images/' + id).put(file, metadata);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) { //进度
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    },
    function(error) {   //错误
      switch (error.code) {
        case 'storage/unauthorized':
          console.log("无权限上传");
          break;
        case 'storage/canceled':
          console.log("已上传取消");
          break;
        case 'storage/unknown':
          break;
      }
    },
    function() { //成功
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL);
    });
}
exports.start = start;
exports.upload = upload;
exports.show = show;
