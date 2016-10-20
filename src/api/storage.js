import firebase from 'firebase'

const storage = firebase.storage();
const storageRef = storage.ref();

export default {
  uploadImage() {
    debugger
    const file = document.getElementById('cke_108_fileInput_input').files[0];
    const id = Date.parse(new Date()) / 1000

    const metadata = {
      contentType: 'image/jpeg'
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
  },
}

function getImage(id) {
  const starsRef = storageRef.child('images/id');

  starsRef.getDownloadURL().then(function(url) {
    console.log('url:' + url);
  }).catch(function(error) {
    switch (error.code) {
      case 'storage/object_not_found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
}
