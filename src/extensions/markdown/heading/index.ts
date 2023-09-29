import { syntaxTree } from "@codemirror/language";
import { Range } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { StyleSpec } from "style-mod";

export default (options?: HeadingOptions) => [
    plugin,
    options?.styles ? EditorView.theme(options.styles) : theme
]

interface HeadingOptions {
    /** 
     * Override the CSS styles assigned by the plugin for headings.
     * 
     * Example:
     * 
     * ```
     * {
     *   ".cm-heading": { fontWeight: "bold" },
     *   ".cm-heading-1": { fontSize: "2.00em" },
     *   ".cm-heading-2": { fontSize: "1.50em" },
     *   ".cm-heading-3": { fontSize: "1.17em" },
     *   ".cm-heading-4": { fontSize: "1.00em" },
     *   ".cm-heading-5": { fontSize: "0.83rem" },
     *   ".cm-heading-6": { fontSize: "0.67rem" },
     * }
     * ````
     */
    styles: {
        ".cm-heading"?: StyleSpec;
        ".cm-heading-1"?: StyleSpec,
        ".cm-heading-2"?: StyleSpec,
        ".cm-heading-3"?: StyleSpec,
        ".cm-heading-4"?: StyleSpec,
        ".cm-heading-5"?: StyleSpec,
        ".cm-heading-6"?: StyleSpec,
    }
}

// https://html.spec.whatwg.org/multipage/rendering.html#sections-and-headings
const theme = EditorView.theme({
    ".cm-heading": { fontWeight: "bold" },
    ".cm-heading-1": { fontSize: "2.00em" },
    ".cm-heading-2": { fontSize: "1.50em" },
    ".cm-heading-3": { fontSize: "1.17em" },
    ".cm-heading-4": { fontSize: "1.00em" },
    ".cm-heading-5": { fontSize: "0.83rem" },
    ".cm-heading-6": { fontSize: "0.67rem" },
});

const plugin = ViewPlugin.fromClass(
    class Heading {
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
    const ranges = view.state.selection.ranges;

    for (const { from, to } of view.visibleRanges) {
        syntaxTree(view.state).iterate({
            enter: ({ type, name, from, to }) => {
                const line = view.lineBlockAt(from);

                // If the cursor overlaps, don't apply any decorations.
                const cursorOverlaps = ranges.some(
                    ({ from: rangeFrom, to: rangeTo }) =>
                        rangeFrom <= line.to && rangeTo >= line.from
                );
                if (cursorOverlaps) return;

                if (type.name.includes("Heading")) {
                    // Assign a decoration that styles the line as a heading.
                    const level = parseInt(/[1-6]$/.exec(name)![0]);
                    const decoration = Decoration.line({
                        class: ["cm-heading", getClassFromNumber(level)].join(" "),
                    });

                    widgets.push(decoration.range(view.state.doc.lineAt(from).from))
                } else if (type.name === "HeaderMark" && /[#]/.test(view.state.sliceDoc(from, to))) {
                    const decoration = Decoration.replace({}) // <-- Empty object hides stuff.
                    widgets.push(decoration.range(from, to + 1))
                }
            },
            from,
            to,
        })
    }

    return Decoration.set(widgets, true);
}

const getClassFromNumber = (num: number): string => {
    switch (num) {
        case 1:
            return 'cm-heading-1'
        case 2:
            return 'cm-heading-2'
        case 3:
            return 'cm-heading-3'
        case 4:
            return 'cm-heading-4'
        case 5:
            return 'cm-heading-5'
        case 6:
            return 'cm-heading-6'
        default:
            return ""
    }
}