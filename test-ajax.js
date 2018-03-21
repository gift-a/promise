console.log("let's get started");

const input = document.getElementById("input");
const uploader = document.getElementById("uploader");

loadFile()
  .then(e => putFile(e))
  .then(storageRef => storageRef.getDownloadURL())
  .then(url => httpGet(url))
  .then(response => console.log(response));

function loadFile() {
  return new Promise((resolve, reject) => {
    input.addEventListener("change", e => resolve(e));
  });
}

function putFile(e) {
  return new Promise((resolve, reject) => {
    const file = e.target.files[0];
    let storageRef = firebase.storage().ref(`files/${file.name}`);
    let task = storageRef.put(file);

    task.on(
      "state_changed",
      function progress(snapshot) {
        let persentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        uploader.value = persentage;
      },
      function error(err) {
        reject(err);
      },
      function complete() {
        resolve(storageRef);
      }
    );
  });
}

function httpGet(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}
