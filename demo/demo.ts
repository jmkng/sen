import { EditorView, keymap } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
import { bold } from '#'

window.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor')
    if (!editor) throw new Error('dom node with id of `editor` not found');

    let _ = new EditorView({
        doc: "...",
        extensions: [
            keymap.of(defaultKeymap),
            bold()
        ],
        parent: editor
    })
});