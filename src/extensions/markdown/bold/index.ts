import { Range } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { syntaxTree } from "@codemirror/language"
import { StyleSpec } from "style-mod";

interface BoldOptions {
  /** 
   * Override the CSS assigned by the plugin.
   * 
   * Example:
   * { ".cm-bold": { color: "red" } }
   * 
   * Default:
   * { ".cm-bold": { fontWeight: "bold" } }
   */
  styles: {
    ".cm-bold": StyleSpec;
  }
}

// export default (options?: BoldOptions) => [plugin, options || theme]
export default (options?: BoldOptions) => [
  plugin,
  options?.styles ? EditorView.theme(options.styles) : theme
]

const theme = EditorView.theme({
  ".cm-bold": {
    fontWeight: "bold",
  },
});

const handles = {
  bold: "cm-bold",
};

const plugin = ViewPlugin.fromClass(
  class Bold {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = highlight(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged || update.selectionSet) this.decorations = highlight(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

const highlight = (view: EditorView): DecorationSet => {
  const widgets: Range<Decoration>[] = [];
  const ranges = view.state.selection.ranges;

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      enter: ({ type, from, to }) => {
        if (type.name !== "StrongEmphasis") return;

        const line = view.lineBlockAt(from);
        const cursorOverlaps = ranges.some(
          ({ from: rangeFrom, to: rangeTo }) =>
            rangeFrom <= line.to && rangeTo >= line.from
        );
        if (cursorOverlaps) return;

        widgets.push(Decoration.mark({ class: handles.bold }).range(from, to));

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