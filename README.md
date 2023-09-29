# @dvft/editor

Simple, reusable CodeMirror (v6+) extensions.

## Usage

The extensions are exported as functions that return an array of extensions that you can apply to your view.

Import the ones that you want, and execute them like this:

```js
import { EditorView } from "@codemirror/view";
import { bold, heading } from "@dvft/editor/markdown";

let view = new EditorView({
  // ...
  extensions: [
    // ...
    bold(), // "@dvft/editor/markdown/bold"
    heading(), // "@dvft/editor/markdown/heading"
  ],
  // ...
});
```

The extensions are designed to be mostly self contained, so you can just copy/paste most of the code into your own project if you don't want a dependency on the package.

## Demo

A demo application that uses most of the plugins is available.

Use `npm run bundle:demo` to generate the `demo/dist/demo.js` bundle. After that, just open the `demo/index.html` file in your browser.
