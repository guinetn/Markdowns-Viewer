const header = document.querySelector(".miew-header");
const preview = document.querySelector("#preview");

const config = {
  filesList: "md-files.json",
};

init();

function init() {
  getFilesList(config.filesList);
  if (localStorage["lastOpened"] != null)
    getFile(localStorage["lastOpened"], transformFile);
}

function getFilesList(mdFiles) {
  fetch(mdFiles)
    .then((res) => res.json())
    .then((data) => fillList(data))
    .catch(function (err) {
      preview.innerHTML = `<h2>Something went wrong with '${mdFiles}:<br>${err}'</h2>`;
    });
}

function fillList(data) {
  const files = document.querySelector("#filesList");

  data.files.forEach((f) => {
    let a = document.createElement("a");    
    a.className = "mdLink";
    a.innerHTML = `<div class='file'>${f.split("\\").pop()}</div>`;
    a.setAttribute("data-file", f)
    a.addEventListener("click", selectFile);
    files.appendChild(a);
  });
}

function selectFile(event) {
  event.preventDefault();
  const fileToRender = event.currentTarget.getAttribute('data-file');
  getFile(fileToRender, transformFile);
}

function transformFile(file, data) {
  var converter = new showdown.Converter();
  preview.innerHTML = converter.makeHtml(data);
  header.innerText = `MIEW → ${file}`;
  localStorage["lastOpened"] = file;
}

function getFile(file, callback) {
  fetch(file)
    .then(function (response) {
      if (!response.ok) {
         const err = `HTTP error on ${file}. Status:${response.status}`;
         preview.innerHTML =  err;
         throw new Error(err);
      }
      return response.blob();
    })
    .then(function (myBlob) {
      var reader = new FileReader();
      var textFile = /text.*/;
      if (myBlob.type.match(textFile)) {
        reader.onload = function (event) {
          callback(file, event.target.result);
        };
      } else {
        const err = `HTTP exception on ${file}`;
        preview.innerHTML = err;
        console.log(err);
      }
      reader.readAsText(myBlob);
    })
    .catch(function (error) {
       const err = `HTTP exception on ${file}. ${error}`;
       preview.innerHTML = err;
       console.log(err);
    });
}
