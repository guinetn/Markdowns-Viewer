# Mdiew: Markdowns Viewer

Click on a markdown file in a (.json defined) list to render it as true markdown.

# FEATURES
- Display a list of files defined in .json
- Click a file to visualize it as true markdown
- Reopen last opened file at startup (localstorage)

## SETTINGS
1. Put your .md files in the /md folder
2. Add the list of these md files into *md-files.json*  
Eg, for the next 5 files:

```json
{ 
  "files: ["abc.md", "def.md", "ghi.md", "jkl.md", "mno.md"] 
}
```

## START

- ***Try it online***: https://guinetn.github.io/Mdiew/index.html  
- From VSCode  
> Open index.html  
> Click on status bar "Go live" or  
> On index.html, right-click → Open with [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  

### TECHNICAL NOTES

It use only Showdown for the md to html transformation
> [Showdown, A JS Markdown to HTML bidirectional converter](http://showdownjs.com)