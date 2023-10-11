# Sen

Simple, reusable CodeMirror (v6+) extensions.

## Usage

The extensions are exported as functions that return an array of extensions that you can apply to your view.

Import the ones that you want, and execute them like this:

```js
import { EditorView } from "@codemirror/view";
import { bold, heading, block } from "@jmkng/sen/markdown";

let view = new EditorView({
  // ...
  extensions: [
    // ...
    bold(), // "@jmkng/sen/editor/markdown/bold"
    heading(), // "@jmkng/sen/markdown/heading"
    block(), // "@jmkng/sen/markdown/block"
  ],
  // ...
});
```

The extensions are designed to be mostly self contained, so you can just copy/paste most of the code into your own project if you don't want a dependency on the package.

## Demo

A demo application that uses most of the plugins is available.

1. Generate the `demo/dist/demo.js` bundle with `npm run bundle:demo`, or `npm run bundle:demo:-w` to watch for changes in development.
2. Open the `demo/index.html` file in your browser.
