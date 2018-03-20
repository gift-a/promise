console.log("let's get started");

const dbRef = firebase.database();
console.log(dbRef);

const input = document.getElementById("input");
const uploader = document.getElementById("uploader");

input.addEventListener("change", e => {
  const file = e.target.files[0];
  console.log(firebase);
  let storageRef = firebase.storage().ref(`files/${file.name}`);
  let task = storageRef.put(file);

  task.on(
    "state_changed",
    function progress(snapshot) {
      let persentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      uploader.value = persentage;
    },
    function error(err) {},
    function complete() {}
  );
});

let storageRef = firebase.storage().ref("files/countries.txt");
storageRef
  .getDownloadURL()
  .then(function(url) {
    console.log(url);
    return httpGet(url);
  })
  .then(response => console.log(response));

// function loadFile() {
//   return new Promise(resolve => {
//     const btn = document.getElementById("btn");
//     btn.addEventListener("click", () => resolve());
//   });
// }

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

// loadFile()
//   .then(() => httpGet(""))
//   .then(response => console.log(response))
//   .catch(e => console.error(e));
