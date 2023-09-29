import { EditorView, keymap, placeholder, lineNumbers } from "@codemirror/view"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { defaultKeymap } from "@codemirror/commands"
import { bold, heading } from '#'

const bg = "rgb(0, 0, 0)";
const fg = "rgb(255, 255, 255)";
const gray = "rgb(138, 146, 157)";
const red = "rgb(187, 45, 62)";
const doc = `Lorem ipsum\n\n## dolor sit amet, consectetur adipiscing elit.\n\n`
    + `**Nam ac massa augue.** Quisque vitae nunc sed nisi pulvinar pulvinar eget eu tortor. `
    + `Quisque risus eros, sodales sit amet odio id, posuere accumsan massa. Vivamus arcu diam, `
    + `auctor sit amet pharetra ac, gravida in urna. Sed faucibus dignissim risus, non sodales `
    + `elit ullamcorper a. Sed a accumsan neque. Vestibulum non sem quis velit faucibus congue `
    + `vitae vel arcu.\n\nFusce diam nisl, lobortis et convallis quis, tempus eu sem. Nunc vitae `
    + `sem facilisis, tincidunt ante vitae, auctor justo. Donec ornare lorem in sem ornare, eu `
    + `rutrum lacus sodales. Pellentesque tristique est felis, sit amet consectetur velit tempor `
    + `euismod. Suspendisse potenti. Maecenas facilisis sollicitudin iaculis. Phasellus quis rutrum `
    + `eros, et sagittis eros. Aenean a fringilla neque. Morbi nec mauris tellus. Praesent lacus nulla, `
    + `venenatis in augue congue, maximus commodo metus. Proin id dignissim justo. Sed eu iaculis `
    + `lectus, ac viverra erat. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis `
    + `parturient montes, nascetur ridiculus mus. Sed condimentum massa a nulla consequat, `
    + `vel mattis neque feugiat.`

const defaults = [
    placeholder("..."),
    lineNumbers(),
    markdown({
        base: markdownLanguage,
        addKeymap: true,
    }),
    keymap.of(defaultKeymap),
    EditorView.lineWrapping,
    EditorView.baseTheme({
        "&.cm-editor": {
            background: `${bg}`,
            color: `${fg}`,
            border: "1px solid rgb(33, 33, 33)",
            borderRadius: "8px",
            minWidth: "700px",
            maxWidth: "800px",
            cursor: "text",
        },
        ".cm-scroller": {
            overflow: "hidden",
            fontFamily: "inherit",
        },
        ".cm-codeblock": {
            fontFamily: "monospace",
        },
        ".cm-content": {
            "caret-color": `${red}`,
        },
        ".cm-gutters": {
            background: `${bg}`,
            color: `${gray}`,
            border: "none"
        }
    })
]
const editor = document.getElementById('editor')
if (!editor)
    throw new Error('dom node with id of `editor` not found');

let view = new EditorView({
    doc,
    extensions: [
        ...defaults,
        bold(),                 // "@dvft/editor/markdown/bold"
        heading()               // "@dvft/editor/markdown/heading"
    ],
    parent: editor // <-- Handles mounting to DOM
})