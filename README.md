# @dvft/editor

Simple, reusable CodeMirror (v6+) extensions.

## Usage

The extensions are exported as functions that return an array of [Extension](https://codemirror.net/docs/ref/#state.Extension) types. Import the ones that you want, and then execute them within your extensions array:

```
import {EditorView, keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"
import {bold} from "@dvft/editor"

let myView = new EditorView({
  doc: "hello",
  extensions: [
    keymap.of(defaultKeymap),
    bold()
    ],
  parent: document.body
})
```

## Demo

To build and view the demo, use `npm run bundle:demo` to generate the `demo/dist/demo.js` bundle. After that, just open the index.html file.
