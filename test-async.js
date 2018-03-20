console.log("let's get started");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => console.log("click"));

function textFromFile() {
  return new Promise(resolve => {
    const input = document.getElementById("input");
    input.addEventListener("change", e => resolve(e));
  });
}

textFromFile()
  .then(event => {
    return new Promise(resolve => {
      console.log("change");
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", e => resolve(e));
      reader.readAsText(file);
    });
  })
  .then(event => {
    return new Promise(resolve => {
      setTimeout(() => console.log("3 sec"), 3000);
      console.log("load");
      const text = event.target.result;
      resolve(text);
    });
  })
  .then(text => new Promise(resolve => resolve(text.split(", "))))
  .then(arr => {
    return new Promise(resolve => {
      console.log("text");
      const list = arr.reduce(function(accum, item) {
        return accum + `<li>${item}</li>`;
      }, "");
      for (let i = 0; i < 100000000; i++) {
        let num = Math.pow(i, 10000) * Math.pow(i, 10000);
      }
      resolve(list);
    });
  })
  .then(list => {
    console.log("list");
    return new Promise(resolve => resolve(`<ul>${list}</ul>`));
  })
  .then(ul => new Promise(resolve => (document.body.innerHTML += ul)))
  .catch(e => console.error(e));

console.log("finish of file js");
