const header = document.querySelector(".miew-header");
const settings = document.querySelector(".miew-settings");
const preview = document.querySelector("#preview");

const config = {
  jsonfile: "md-files.json",
  files: [],  
  fileCurrent: 0,
  fonts: "monospace sans-serif system-ui cursive none sans-serif",
  fontSizes: "large larger small smaller medium x-large x-small unset",
  currentFont: "",
  currentFontSize: ""
};

init();

function init() {

  showdown.setFlavor('github');
  
  getJson(config.jsonfile);
  
  if (localStorage["lastOpened"] != null)
    getFile(localStorage["lastOpened"], transformFile);

  restoreSettings();
  
  document.addEventListener("keypress", changeSettings);
}

function getJson(jsonfile) {    
  fetch(jsonfile)
    .then((res) => res.json())
    .then((jsonContent) => fillList(jsonContent))
    .catch(function (err) {
      preview.innerHTML = `<h2>Something went wrong with '${jsonfile}:<br>${err}'</h2>`;
    });
}

function fillList(data) {
  
  config.files = data.files;
  const filesContainer = document.querySelector("#filesList");

  data.files.forEach((f) => {
    let a = document.createElement("a");    
        a.className = "mdLink";
        a.innerHTML = `<div class='file'>${f.split("\\").pop()}</div>`;
        a.setAttribute("data-file", f)
        a.addEventListener("click", selectFile);
    filesContainer.appendChild(a);
  });
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function restoreSettings() {
  
  config.currentFont = localStorage["fontFamily"];
  config.currentFontSize = localStorage["fontSize"];

  if (config.currentFont != null) {
    preview.setAttribute( "data-font", config.fonts.split(" ").indexOf(config.currentFont) - 1 );
    setFontFamily(config.fonts, "font");
  }
  
  if (config.currentFontSize != null) {
    preview.setAttribute("data-size", config.fontSizes.split(" ").indexOf(config.currentFontSize) - 1);
    setFontSize(config.fontSizes, "size");
  }  

  showSettings();
}

function changeSettings(event) {
  
  switch (event.key.toUpperCase()) {
    case "F":
      config.currentFont = setFontFamily(config.fonts, "font");
      break;
    case "S":
      config.currentFontSize = setFontSize(config.fontSizes, "size");
      break;
    case "C":
      config.fileCurrent = navigateToFile(-1);
      break;
    case "V":
      config.fileCurrent = navigateToFile(+1);
      break;
  }

  showSettings();
}

function showSettings() {
    settings.innerHTML = `${config.currentFont??""} ${config.currentFontSize??""}`;
}

function navigateToFile(updown) {
  config.fileCurrent+=updown;
  // Limits
  if (config.fileCurrent < 0)
    config.fileCurrent = config.files.length-1;  
  if (config.fileCurrent >= config.files.length)
    config.fileCurrent = 0;   

  getFile(config.files[config.fileCurrent], transformFile);  
}


function increaseProperty(elements, property) {
  const pName = `data-${property}`;
  let currentIndex = parseInt(preview.getAttribute(pName));
  currentIndex = currentIndex >= elements.length - 1 ? 0 : currentIndex + 1;
  preview.setAttribute(pName, currentIndex);
  return currentIndex;
}

function setFontFamily(fontsAvailable, property) {
  const fonts = fontsAvailable.split(" ");
  let fontIndex = increaseProperty(fonts, property);
  const selectedFont = fonts[fontIndex];
  preview.style.fontFamily = selectedFont;  
  localStorage["fontFamily"] = selectedFont;
  return selectedFont;
}

function setFontSize(fontSizes, property) {
   const sizes = fontSizes.split(" ");
   let sizeIndex = increaseProperty(sizes, property);
   const selectedSize = sizes[sizeIndex];
   preview.style.fontSize = selectedSize;  
   localStorage["fontSize"] = selectedSize;
   return selectedSize;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function selectFile(event) {
  event.preventDefault();
  const fileToRender = event.currentTarget.getAttribute('data-file');
  getFile(fileToRender, transformFile);
}

function transformFile(file, data) {
  
  // Transform md → html
  var converter = new showdown.Converter();
  preview.innerHTML = converter.makeHtml(data);

  // Store current status
  header.innerText = `MIEW → ${file}`;
  localStorage["lastOpened"] = file;
  config.fileCurrent = config.files.indexOf(file);
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
