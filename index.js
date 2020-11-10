const preview = document.querySelector("#preview");
const title = document.querySelector(".mdiew-title");

const config = {
  directory: "md/",
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
    a.setAttribute("href", "/");
    a.setAttribute("class", "mdLink");
    a.innerHTML = `<div class='mdDiv'>${f.replace(".md", "")}</div>`;
    a.addEventListener("click", selectFile);
    files.appendChild(a);
  });
}

function selectFile(event) {
  event.preventDefault();
  const fileToRender = `${config.directory}${event.currentTarget.innerText}.md`;
  getFile(fileToRender, transformFile);
}

function transformFile(file, data) {
  var converter = new showdown.Converter();
  preview.innerHTML = converter.makeHtml(data);
  title.innerText = `MVIEW - ${file}`;
  localStorage["lastOpened"] = file;
}

function getFile(file, callback) {
  fetch(file)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error on ${file}. Status:${response.status}`);
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
        console.log(`HTTP exception on ${file}`);
      }
      reader.readAsText(myBlob);
    })
    .catch(function (error) {
      console.log(`HTTP exception on ${file}. ${error}`);
    });
}
