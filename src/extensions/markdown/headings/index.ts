// import { Extension, Range } from "@codemirror/state";
// import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
// import { syntaxTree } from "@codemirror/language"

// export default (styles?: Extension) => [plugin, styles || theme]

// // #region Theme
// const theme = EditorView.baseTheme({
//     // ".cm-bold": {
//     //     fontWeight: "bold",
//     // },
// });

// const handles = {
//     // bold: "cm-bold",
// };
// // #endregion Theme

// // #region Implementation
// const plugin = ViewPlugin.fromClass(
//     class Headings {
//         decorations: DecorationSet;

//         constructor(view: EditorView) {
//             this.decorations = highlight(view);
//         }

//         update(update: ViewUpdate) {
//             if (update.docChanged || update.viewportChanged || update.selectionSet) this.decorations = highlight(update.view);
//         }
//     },
//     {
//         decorations: (v) => v.decorations,
//     }
// );

// const highlight = (view: EditorView): DecorationSet => {
//     const widgets: Range<Decoration>[] = [];
//     const ranges = view.state.selection.ranges;

//     for (const { from, to } of view.visibleRanges) {
//         syntaxTree(view.state).iterate({
//             enter: ({ type, from, to }) => {
//                 if (type.name !== "StrongEmphasis") return;

//                 const line = view.lineBlockAt(from);
//                 const cursorOverlaps = ranges.some(
//                     ({ from: rangeFrom, to: rangeTo }) =>
//                         rangeFrom <= line.to && rangeTo >= line.from
//                 );
//                 if (cursorOverlaps) return;

//                 widgets.push(Decoration.mark({ class: handles.bold }).range(from, to));

//                 // Hide the "**" marks.
//                 widgets.push(Decoration.replace({}).range(from, from + 2));
//                 widgets.push(Decoration.replace({}).range(to - 2, to));
//             },
//             from,
//             to,
//         });
//     }


//     return Decoration.set(widgets, true);
// };
// // #endregion Implementation