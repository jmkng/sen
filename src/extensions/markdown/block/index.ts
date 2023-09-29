import { Range } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { foldedRanges, syntaxTree } from "@codemirror/language"
import { StyleSpec } from "style-mod";

export default (options?: BlockOptions) => [
    plugin,
    options?.styles ? EditorView.theme(options.styles) : theme
]

interface BlockOptions {
    /**
     * Override the default CSS styles applied by the plugin.
     *
     * Example:
     *
     * ```
     * {
     *   ".cm-block": {
     *     backgroundColor: "var(--color-shade)",
     *     width: "99%",
     *     margin: "0 auto",
     *   },
     *   ".cm-block-begin": {
     *     borderRadius: "2px 2px 0 0",
     *     margin: "15px auto 0 auto",
     *   },
     *   ".cm-block-end": {
     *     borderRadius: "0 0 2px 2px",
     *     margin: "0 auto 15px auto",
     *   },
     * }
     * ```
     */
    styles: {
        ".cm-block"?: StyleSpec;
        ".cm-block-begin"?: StyleSpec;
        ".cm-block-end"?: StyleSpec;
    }
}

const theme = EditorView.theme({
    ".cm-block": {
        margin: "0 auto",
    },
    ".cm-block-begin": {
        borderRadius: "2px 2px 0 0",
    },
    ".cm-block-end": {
        borderRadius: "0 0 2px 2px",
    },
});


const plugin = ViewPlugin.fromClass(
    class Block {
        decorations: DecorationSet;

        constructor(view: EditorView) {
            this.decorations = decorateView(view);
        }

        update(update: ViewUpdate) {
            if (update.docChanged || update.viewportChanged || update.selectionSet)
                this.decorations = decorateView(update.view);
        }
    },
    {
        decorations: (v) => v.decorations,
    }
);

const decorateView = (view: EditorView): DecorationSet => {
    const widgets: Range<Decoration>[] = [];

    for (const { from, to } of view.visibleRanges) {
        syntaxTree(view.state).iterate({
            enter: ({ type, from, to }) => {
                if (!["FencedCode", "CodeBlock"].includes(type.name)) return;

                let inRange = view.viewportLineBlocks.filter(block => block.from <= to && from <= block.to)
                const folded = foldedRanges(view.state).iter();
                while (foldedRanges(view.state).iter().value) {
                    inRange = inRange.filter(line => {
                        const overlap = folded.from <= line.to && line.from <= folded.to
                        return !overlap
                    })
                    folded.next();
                }
                inRange.forEach((block, index) => {
                    const decoration = Decoration.line({ class: ["cm-block", index === 0 ? "cm-block-begin" : block.to === to ? "cm-block-end" : ""].join(" ") })
                    widgets.push(decoration.range(block.from));
                })
            },
            from,
            to,
        });
    }

    return Decoration.set(widgets, true);
};