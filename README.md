# editor

Simple, reusable CodeMirror (v6+) extensions.

## Usage

The extensions are exported as functions that return an array of `Extension` types, so you can import the ones you need and execute those functions within your extensions array.

## Demo

The `/demo` directory contains `index.html` and `demo.js` files, which can be hooked up to a bundled version of the library.

Generate the bundle:

```
npm run bundle:demo
```

Which should create `bundle.js` within the `/demo` directory. The `demo.js` file already has an import for the bundle, so you can load the `/demo` directory with any static server to interact with it.

```
cd demo
python3 -m http.server
```
