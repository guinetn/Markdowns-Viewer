# Miew: Markdowns Viewer

Click a markdown file listed to render it as true markdown. The list is made from a simple json enumerating files.

![miew screenshoot](assets/miew.png)

# FEATURES
- Display a list of files defined in .json
- Click a file to visualize it as true markdown
- Reopen last opened file at startup (localstorage)
- A tool is available to import files list into the .json file

## SETTINGS
1. Put your .md files in the /md folder
2. Add the list of these md files into *md-files.json*  
Eg, for the next 5 files:

```json
{ 
  "files: ["abc.md", "def.md", "ghi.md", "jkl.md", "mno.md"] 
}
```

I create a generator to produce the .json file containing the list of the .md files you want to see:
>.\generate_json.ps1 $PWD/md  
>.\generate_json.ps1 $PWD/md "md-files.json"   
> 1st arg: Folder to explore (must be in the current ($pwd) folder  
> 2nd (optional) arg: output filename)  

## START

- ***Try it online***: https://guinetn.github.io/Miew/index.html  
- or , from VSCode:  
> Open index.html  
> Click on status bar "Go live", this will run [LiveServer, a VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  

### TECHNICAL NOTES

- **md-files.json** file contains the relative paths to the .md files

- It use ShowdownJS for the md to html transformation
> [Showdown: A JS Markdown to HTML bidirectional converter](http://showdownjs.com)

