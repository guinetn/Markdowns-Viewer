# Markdowns-Viewer
A single html page to visualise listed markdown files (.json config)

## SETTINGS
1. Put your .md files in the /md folder
2. Add the list of these md files into *mdlist.json*  
Eg, for the next 5 files:

```js
 ["abc.md", "def.md", "ghi.md", "jkl.md", "mno.md"]
```
3. Choose a Bootstrap theme from [Bootswatch][] and set it:  
Edit *MDViewer.html*  
Set the theme name:  
```html
<xmp theme="**BOOTSWATCH_THEME_NAME_GOES_HERE**" style="display:none;" id="mydata">
```
## RUN IT
Open *MDViewer.html* and select a file 

### TECHNICAL NOTES
It use only [StrapdownJS][] as md transformer

[StrapdownJS]:http://strapdownjs.com/
[Bootswatch]:Bootswatch.com
