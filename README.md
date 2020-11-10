# Mdiew: Markdowns Viewer

Click on a markdown file in a (.json defined) list to render it as true markdown.

## SETTINGS
1. Put your .md files in the /md folder
2. Add the list of these md files into *mdlist.json*  
Eg, for the next 5 files:

```json
{ 
  "files: ["abc.md", "def.md", "ghi.md", "jkl.md", "mno.md"] 
}
```

## RUN IT
- https://guinetn.github.io/Mdiew/index.html
- or Open *index.html*, a basic server is needed (Liveserver, a Vscode Extension)

### TECHNICAL NOTES

It use only Showdown for the md to html transformation
> [Showdown, A JS Markdown to HTML bidirectional converter](http://showdownjs.com)

