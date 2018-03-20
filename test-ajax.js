console.log("let's get started");

const dbRef = firebase.database();
console.log(dbRef);

function loadFile() {
  return new Promise(resolve => {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", () => resolve());
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

loadFile()
  .then(() => httpGet("https://myproject-8daba.firebaseio.com/countries.txt"))
  .then(response => console.log(response))
  .catch(e => console.error(e));
