import { Range } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { syntaxTree } from "@codemirror/language"
import { StyleSpec } from "style-mod";

export default (options?: BoldOptions) => [
  plugin,
  options?.styles ? EditorView.theme(options.styles) : theme
]

interface BoldOptions {
  /** 
   * Override the CSS assigned by the plugin.
   * 
   * Example:
   * 
   * ```
   * {
   *   ".cm-bold": { fontWeight: "bold" } 
   * }
   * ```
   */
  styles: {
    ".cm-bold": StyleSpec;
  }
}

const theme = EditorView.theme({
  ".cm-bold": {
    fontWeight: "bold",
  },
});


const plugin = ViewPlugin.fromClass(
  class Bold {
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
      enter: ({ type, from, to }) => {
        if (type.name !== "StrongEmphasis") return;

        // Don't apply to any line covered by a selection.
        const line = view.lineBlockAt(from);
        const cursorOverlaps = ranges.some(
          ({ from: rangeFrom, to: rangeTo }) =>
            rangeFrom <= line.to && rangeTo >= line.from
        );
        if (cursorOverlaps) return;

        widgets.push(Decoration.mark({ class: "cm-bold" }).range(from, to));

        // Hide the "**" marks.
        widgets.push(Decoration.replace({}).range(from, from + 2));
        widgets.push(Decoration.replace({}).range(to - 2, to));
      },
      from,
      to,
    });
  }


  return Decoration.set(widgets, true);
};