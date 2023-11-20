"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-gfm-table";
exports.ids = ["vendor-chunks/mdast-util-gfm-table"];
exports.modules = {

/***/ "(rsc)/./node_modules/mdast-util-gfm-table/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/mdast-util-gfm-table/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gfmTableFromMarkdown: () => (/* binding */ gfmTableFromMarkdown),\n/* harmony export */   gfmTableToMarkdown: () => (/* binding */ gfmTableToMarkdown)\n/* harmony export */ });\n/* harmony import */ var mdast_util_to_markdown_lib_util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-to-markdown/lib/util/container-phrasing.js */ \"(rsc)/./node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js\");\n/* harmony import */ var mdast_util_to_markdown_lib_handle_inline_code_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mdast-util-to-markdown/lib/handle/inline-code.js */ \"(rsc)/./node_modules/mdast-util-to-markdown/lib/handle/inline-code.js\");\n/* harmony import */ var markdown_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! markdown-table */ \"(rsc)/./node_modules/markdown-table/index.js\");\n/**\n * @typedef {import('mdast').Table} Table\n * @typedef {import('mdast').TableRow} TableRow\n * @typedef {import('mdast').TableCell} TableCell\n * @typedef {import('mdast').InlineCode} InlineCode\n *\n * @typedef {import('markdown-table').MarkdownTableOptions} MarkdownTableOptions\n *\n * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext\n * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension\n * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle\n *\n * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension\n * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle\n * @typedef {import('mdast-util-to-markdown').Context} ToMarkdownContext\n * @typedef {import('mdast-util-to-markdown').SafeOptions} SafeOptions\n */ /**\n * @typedef Options\n *   Configuration.\n * @property {boolean | null | undefined} [tableCellPadding=true]\n *   Whether to add a space of padding between delimiters and cells.\n * @property {boolean | null | undefined} [tablePipeAlign=true]\n *   Whether to align the delimiters.\n * @property {MarkdownTableOptions['stringLength'] | null | undefined} [stringLength]\n *   Function to detect the length of table cell content, used when aligning\n *   the delimiters between cells\n */ \n\n\n// To do: next major: use `state` and `state` utilities from `mdast-util-to-markdown`.\n// To do: next major: use `defaultHandlers.inlineCode`.\n// To do: next major: expose functions.\n/**\n * Extension for `mdast-util-from-markdown` to enable GFM tables.\n *\n * @type {FromMarkdownExtension}\n */ const gfmTableFromMarkdown = {\n    enter: {\n        table: enterTable,\n        tableData: enterCell,\n        tableHeader: enterCell,\n        tableRow: enterRow\n    },\n    exit: {\n        codeText: exitCodeText,\n        table: exitTable,\n        tableData: exit,\n        tableHeader: exit,\n        tableRow: exit\n    }\n};\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */ function enterTable(token) {\n    /** @type {Array<'left' | 'right' | 'center' | 'none'>} */ // @ts-expect-error: `align` is custom.\n    const align = token._align;\n    this.enter({\n        type: \"table\",\n        align: align.map((d)=>d === \"none\" ? null : d),\n        children: []\n    }, token);\n    this.setData(\"inTable\", true);\n}\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */ function exitTable(token) {\n    this.exit(token);\n    this.setData(\"inTable\");\n}\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */ function enterRow(token) {\n    this.enter({\n        type: \"tableRow\",\n        children: []\n    }, token);\n}\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */ function exit(token) {\n    this.exit(token);\n}\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */ function enterCell(token) {\n    this.enter({\n        type: \"tableCell\",\n        children: []\n    }, token);\n}\n// Overwrite the default code text data handler to unescape escaped pipes when\n// they are in tables.\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */ function exitCodeText(token) {\n    let value = this.resume();\n    if (this.getData(\"inTable\")) {\n        value = value.replace(/\\\\([\\\\|])/g, replace);\n    }\n    const node = /** @type {InlineCode} */ this.stack[this.stack.length - 1];\n    node.value = value;\n    this.exit(token);\n}\n/**\n * @param {string} $0\n * @param {string} $1\n * @returns {string}\n */ function replace($0, $1) {\n    // Pipes work, backslashes don’t (but can’t escape pipes).\n    return $1 === \"|\" ? $1 : $0;\n}\n/**\n * Create an extension for `mdast-util-to-markdown` to enable GFM tables in\n * markdown.\n *\n * @param {Options | null | undefined} [options]\n *   Configuration.\n * @returns {ToMarkdownExtension}\n *   Extension for `mdast-util-to-markdown` to enable GFM tables.\n */ function gfmTableToMarkdown(options) {\n    const settings = options || {};\n    const padding = settings.tableCellPadding;\n    const alignDelimiters = settings.tablePipeAlign;\n    const stringLength = settings.stringLength;\n    const around = padding ? \" \" : \"|\";\n    return {\n        unsafe: [\n            {\n                character: \"\\r\",\n                inConstruct: \"tableCell\"\n            },\n            {\n                character: \"\\n\",\n                inConstruct: \"tableCell\"\n            },\n            // A pipe, when followed by a tab or space (padding), or a dash or colon\n            // (unpadded delimiter row), could result in a table.\n            {\n                atBreak: true,\n                character: \"|\",\n                after: \"[\t :-]\"\n            },\n            // A pipe in a cell must be encoded.\n            {\n                character: \"|\",\n                inConstruct: \"tableCell\"\n            },\n            // A colon must be followed by a dash, in which case it could start a\n            // delimiter row.\n            {\n                atBreak: true,\n                character: \":\",\n                after: \"-\"\n            },\n            // A delimiter row can also start with a dash, when followed by more\n            // dashes, a colon, or a pipe.\n            // This is a stricter version than the built in check for lists, thematic\n            // breaks, and setex heading underlines though:\n            // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>\n            {\n                atBreak: true,\n                character: \"-\",\n                after: \"[:|-]\"\n            }\n        ],\n        handlers: {\n            table: handleTable,\n            tableRow: handleTableRow,\n            tableCell: handleTableCell,\n            inlineCode: inlineCodeWithTable\n        }\n    };\n    /**\n   * @type {ToMarkdownHandle}\n   * @param {Table} node\n   */ function handleTable(node, _, context, safeOptions) {\n        return serializeData(handleTableAsData(node, context, safeOptions), node.align);\n    }\n    /**\n   * This function isn’t really used normally, because we handle rows at the\n   * table level.\n   * But, if someone passes in a table row, this ensures we make somewhat sense.\n   *\n   * @type {ToMarkdownHandle}\n   * @param {TableRow} node\n   */ function handleTableRow(node, _, context, safeOptions) {\n        const row = handleTableRowAsData(node, context, safeOptions);\n        const value = serializeData([\n            row\n        ]);\n        // `markdown-table` will always add an align row\n        return value.slice(0, value.indexOf(\"\\n\"));\n    }\n    /**\n   * @type {ToMarkdownHandle}\n   * @param {TableCell} node\n   */ function handleTableCell(node, _, context, safeOptions) {\n        const exit = context.enter(\"tableCell\");\n        const subexit = context.enter(\"phrasing\");\n        const value = (0,mdast_util_to_markdown_lib_util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__.containerPhrasing)(node, context, {\n            ...safeOptions,\n            before: around,\n            after: around\n        });\n        subexit();\n        exit();\n        return value;\n    }\n    /**\n   * @param {Array<Array<string>>} matrix\n   * @param {Array<string | null | undefined> | null | undefined} [align]\n   */ function serializeData(matrix, align) {\n        return (0,markdown_table__WEBPACK_IMPORTED_MODULE_1__.markdownTable)(matrix, {\n            align,\n            // @ts-expect-error: `markdown-table` types should support `null`.\n            alignDelimiters,\n            // @ts-expect-error: `markdown-table` types should support `null`.\n            padding,\n            // @ts-expect-error: `markdown-table` types should support `null`.\n            stringLength\n        });\n    }\n    /**\n   * @param {Table} node\n   * @param {ToMarkdownContext} context\n   * @param {SafeOptions} safeOptions\n   */ function handleTableAsData(node, context, safeOptions) {\n        const children = node.children;\n        let index = -1;\n        /** @type {Array<Array<string>>} */ const result = [];\n        const subexit = context.enter(\"table\");\n        while(++index < children.length){\n            result[index] = handleTableRowAsData(children[index], context, safeOptions);\n        }\n        subexit();\n        return result;\n    }\n    /**\n   * @param {TableRow} node\n   * @param {ToMarkdownContext} context\n   * @param {SafeOptions} safeOptions\n   */ function handleTableRowAsData(node, context, safeOptions) {\n        const children = node.children;\n        let index = -1;\n        /** @type {Array<string>} */ const result = [];\n        const subexit = context.enter(\"tableRow\");\n        while(++index < children.length){\n            // Note: the positional info as used here is incorrect.\n            // Making it correct would be impossible due to aligning cells?\n            // And it would need copy/pasting `markdown-table` into this project.\n            result[index] = handleTableCell(children[index], node, context, safeOptions);\n        }\n        subexit();\n        return result;\n    }\n    /**\n   * @type {ToMarkdownHandle}\n   * @param {InlineCode} node\n   */ function inlineCodeWithTable(node, parent, context) {\n        let value = (0,mdast_util_to_markdown_lib_handle_inline_code_js__WEBPACK_IMPORTED_MODULE_2__.inlineCode)(node, parent, context);\n        if (context.stack.includes(\"tableCell\")) {\n            value = value.replace(/\\|/g, \"\\\\$&\");\n        }\n        return value;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1nZm0tdGFibGUvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQkMsR0FFRDs7Ozs7Ozs7OztDQVVDLEdBRXNGO0FBQ1o7QUFDL0I7QUFFNUMsc0ZBQXNGO0FBQ3RGLHVEQUF1RDtBQUN2RCx1Q0FBdUM7QUFFdkM7Ozs7Q0FJQyxHQUNNLE1BQU1HLHVCQUF1QjtJQUNsQ0MsT0FBTztRQUNMQyxPQUFPQztRQUNQQyxXQUFXQztRQUNYQyxhQUFhRDtRQUNiRSxVQUFVQztJQUNaO0lBQ0FDLE1BQU07UUFDSkMsVUFBVUM7UUFDVlQsT0FBT1U7UUFDUFIsV0FBV0s7UUFDWEgsYUFBYUc7UUFDYkYsVUFBVUU7SUFDWjtBQUNGLEVBQUM7QUFFRDs7O0NBR0MsR0FDRCxTQUFTTixXQUFXVSxLQUFLO0lBQ3ZCLHdEQUF3RCxHQUN4RCx1Q0FBdUM7SUFDdkMsTUFBTUMsUUFBUUQsTUFBTUUsTUFBTTtJQUMxQixJQUFJLENBQUNkLEtBQUssQ0FDUjtRQUNFZSxNQUFNO1FBQ05GLE9BQU9BLE1BQU1HLEdBQUcsQ0FBQyxDQUFDQyxJQUFPQSxNQUFNLFNBQVMsT0FBT0E7UUFDL0NDLFVBQVUsRUFBRTtJQUNkLEdBQ0FOO0lBRUYsSUFBSSxDQUFDTyxPQUFPLENBQUMsV0FBVztBQUMxQjtBQUVBOzs7Q0FHQyxHQUNELFNBQVNSLFVBQVVDLEtBQUs7SUFDdEIsSUFBSSxDQUFDSixJQUFJLENBQUNJO0lBQ1YsSUFBSSxDQUFDTyxPQUFPLENBQUM7QUFDZjtBQUVBOzs7Q0FHQyxHQUNELFNBQVNaLFNBQVNLLEtBQUs7SUFDckIsSUFBSSxDQUFDWixLQUFLLENBQUM7UUFBQ2UsTUFBTTtRQUFZRyxVQUFVLEVBQUU7SUFBQSxHQUFHTjtBQUMvQztBQUVBOzs7Q0FHQyxHQUNELFNBQVNKLEtBQUtJLEtBQUs7SUFDakIsSUFBSSxDQUFDSixJQUFJLENBQUNJO0FBQ1o7QUFFQTs7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SUFBSTlCLFFBQVF2Qiw0RkFBVUEsQ0FBQzJCLE1BQU11QyxRQUFRYjtRQUVyQyxJQUFJQSxRQUFRekIsS0FBSyxDQUFDdUMsUUFBUSxDQUFDLGNBQWM7WUFDdkM1QyxRQUFRQSxNQUFNRyxPQUFPLENBQUMsT0FBTztRQUMvQjtRQUVBLE9BQU9IO0lBQ1Q7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRwbGF0ZS8uL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLWdmbS10YWJsZS9saWIvaW5kZXguanM/NjdiZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuVGFibGV9IFRhYmxlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlRhYmxlUm93fSBUYWJsZVJvd1xuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5UYWJsZUNlbGx9IFRhYmxlQ2VsbFxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5JbmxpbmVDb2RlfSBJbmxpbmVDb2RlXG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWFya2Rvd24tdGFibGUnKS5NYXJrZG93blRhYmxlT3B0aW9uc30gTWFya2Rvd25UYWJsZU9wdGlvbnNcbiAqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLWZyb20tbWFya2Rvd24nKS5Db21waWxlQ29udGV4dH0gQ29tcGlsZUNvbnRleHRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bicpLkV4dGVuc2lvbn0gRnJvbU1hcmtkb3duRXh0ZW5zaW9uXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLWZyb20tbWFya2Rvd24nKS5IYW5kbGV9IEZyb21NYXJrZG93bkhhbmRsZVxuICpcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtdG8tbWFya2Rvd24nKS5PcHRpb25zfSBUb01hcmtkb3duRXh0ZW5zaW9uXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLXRvLW1hcmtkb3duJykuSGFuZGxlfSBUb01hcmtkb3duSGFuZGxlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLXRvLW1hcmtkb3duJykuQ29udGV4dH0gVG9NYXJrZG93bkNvbnRleHRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtdG8tbWFya2Rvd24nKS5TYWZlT3B0aW9uc30gU2FmZU9wdGlvbnNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIE9wdGlvbnNcbiAqICAgQ29uZmlndXJhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFt0YWJsZUNlbGxQYWRkaW5nPXRydWVdXG4gKiAgIFdoZXRoZXIgdG8gYWRkIGEgc3BhY2Ugb2YgcGFkZGluZyBiZXR3ZWVuIGRlbGltaXRlcnMgYW5kIGNlbGxzLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3RhYmxlUGlwZUFsaWduPXRydWVdXG4gKiAgIFdoZXRoZXIgdG8gYWxpZ24gdGhlIGRlbGltaXRlcnMuXG4gKiBAcHJvcGVydHkge01hcmtkb3duVGFibGVPcHRpb25zWydzdHJpbmdMZW5ndGgnXSB8IG51bGwgfCB1bmRlZmluZWR9IFtzdHJpbmdMZW5ndGhdXG4gKiAgIEZ1bmN0aW9uIHRvIGRldGVjdCB0aGUgbGVuZ3RoIG9mIHRhYmxlIGNlbGwgY29udGVudCwgdXNlZCB3aGVuIGFsaWduaW5nXG4gKiAgIHRoZSBkZWxpbWl0ZXJzIGJldHdlZW4gY2VsbHNcbiAqL1xuXG5pbXBvcnQge2NvbnRhaW5lclBocmFzaW5nfSBmcm9tICdtZGFzdC11dGlsLXRvLW1hcmtkb3duL2xpYi91dGlsL2NvbnRhaW5lci1waHJhc2luZy5qcydcbmltcG9ydCB7aW5saW5lQ29kZX0gZnJvbSAnbWRhc3QtdXRpbC10by1tYXJrZG93bi9saWIvaGFuZGxlL2lubGluZS1jb2RlLmpzJ1xuaW1wb3J0IHttYXJrZG93blRhYmxlfSBmcm9tICdtYXJrZG93bi10YWJsZSdcblxuLy8gVG8gZG86IG5leHQgbWFqb3I6IHVzZSBgc3RhdGVgIGFuZCBgc3RhdGVgIHV0aWxpdGllcyBmcm9tIGBtZGFzdC11dGlsLXRvLW1hcmtkb3duYC5cbi8vIFRvIGRvOiBuZXh0IG1ham9yOiB1c2UgYGRlZmF1bHRIYW5kbGVycy5pbmxpbmVDb2RlYC5cbi8vIFRvIGRvOiBuZXh0IG1ham9yOiBleHBvc2UgZnVuY3Rpb25zLlxuXG4vKipcbiAqIEV4dGVuc2lvbiBmb3IgYG1kYXN0LXV0aWwtZnJvbS1tYXJrZG93bmAgdG8gZW5hYmxlIEdGTSB0YWJsZXMuXG4gKlxuICogQHR5cGUge0Zyb21NYXJrZG93bkV4dGVuc2lvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGdmbVRhYmxlRnJvbU1hcmtkb3duID0ge1xuICBlbnRlcjoge1xuICAgIHRhYmxlOiBlbnRlclRhYmxlLFxuICAgIHRhYmxlRGF0YTogZW50ZXJDZWxsLFxuICAgIHRhYmxlSGVhZGVyOiBlbnRlckNlbGwsXG4gICAgdGFibGVSb3c6IGVudGVyUm93XG4gIH0sXG4gIGV4aXQ6IHtcbiAgICBjb2RlVGV4dDogZXhpdENvZGVUZXh0LFxuICAgIHRhYmxlOiBleGl0VGFibGUsXG4gICAgdGFibGVEYXRhOiBleGl0LFxuICAgIHRhYmxlSGVhZGVyOiBleGl0LFxuICAgIHRhYmxlUm93OiBleGl0XG4gIH1cbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBlbnRlclRhYmxlKHRva2VuKSB7XG4gIC8qKiBAdHlwZSB7QXJyYXk8J2xlZnQnIHwgJ3JpZ2h0JyB8ICdjZW50ZXInIHwgJ25vbmUnPn0gKi9cbiAgLy8gQHRzLWV4cGVjdC1lcnJvcjogYGFsaWduYCBpcyBjdXN0b20uXG4gIGNvbnN0IGFsaWduID0gdG9rZW4uX2FsaWduXG4gIHRoaXMuZW50ZXIoXG4gICAge1xuICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgIGFsaWduOiBhbGlnbi5tYXAoKGQpID0+IChkID09PSAnbm9uZScgPyBudWxsIDogZCkpLFxuICAgICAgY2hpbGRyZW46IFtdXG4gICAgfSxcbiAgICB0b2tlblxuICApXG4gIHRoaXMuc2V0RGF0YSgnaW5UYWJsZScsIHRydWUpXG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZXhpdFRhYmxlKHRva2VuKSB7XG4gIHRoaXMuZXhpdCh0b2tlbilcbiAgdGhpcy5zZXREYXRhKCdpblRhYmxlJylcbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBlbnRlclJvdyh0b2tlbikge1xuICB0aGlzLmVudGVyKHt0eXBlOiAndGFibGVSb3cnLCBjaGlsZHJlbjogW119LCB0b2tlbilcbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBleGl0KHRva2VuKSB7XG4gIHRoaXMuZXhpdCh0b2tlbilcbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBlbnRlckNlbGwodG9rZW4pIHtcbiAgdGhpcy5lbnRlcih7dHlwZTogJ3RhYmxlQ2VsbCcsIGNoaWxkcmVuOiBbXX0sIHRva2VuKVxufVxuXG4vLyBPdmVyd3JpdGUgdGhlIGRlZmF1bHQgY29kZSB0ZXh0IGRhdGEgaGFuZGxlciB0byB1bmVzY2FwZSBlc2NhcGVkIHBpcGVzIHdoZW5cbi8vIHRoZXkgYXJlIGluIHRhYmxlcy5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZXhpdENvZGVUZXh0KHRva2VuKSB7XG4gIGxldCB2YWx1ZSA9IHRoaXMucmVzdW1lKClcblxuICBpZiAodGhpcy5nZXREYXRhKCdpblRhYmxlJykpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcXFwoW1xcXFx8XSkvZywgcmVwbGFjZSlcbiAgfVxuXG4gIGNvbnN0IG5vZGUgPSAvKiogQHR5cGUge0lubGluZUNvZGV9ICovICh0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoIC0gMV0pXG4gIG5vZGUudmFsdWUgPSB2YWx1ZVxuICB0aGlzLmV4aXQodG9rZW4pXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9ICQwXG4gKiBAcGFyYW0ge3N0cmluZ30gJDFcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHJlcGxhY2UoJDAsICQxKSB7XG4gIC8vIFBpcGVzIHdvcmssIGJhY2tzbGFzaGVzIGRvbuKAmXQgKGJ1dCBjYW7igJl0IGVzY2FwZSBwaXBlcykuXG4gIHJldHVybiAkMSA9PT0gJ3wnID8gJDEgOiAkMFxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBleHRlbnNpb24gZm9yIGBtZGFzdC11dGlsLXRvLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIHRhYmxlcyBpblxuICogbWFya2Rvd24uXG4gKlxuICogQHBhcmFtIHtPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZH0gW29wdGlvbnNdXG4gKiAgIENvbmZpZ3VyYXRpb24uXG4gKiBAcmV0dXJucyB7VG9NYXJrZG93bkV4dGVuc2lvbn1cbiAqICAgRXh0ZW5zaW9uIGZvciBgbWRhc3QtdXRpbC10by1tYXJrZG93bmAgdG8gZW5hYmxlIEdGTSB0YWJsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZm1UYWJsZVRvTWFya2Rvd24ob3B0aW9ucykge1xuICBjb25zdCBzZXR0aW5ncyA9IG9wdGlvbnMgfHwge31cbiAgY29uc3QgcGFkZGluZyA9IHNldHRpbmdzLnRhYmxlQ2VsbFBhZGRpbmdcbiAgY29uc3QgYWxpZ25EZWxpbWl0ZXJzID0gc2V0dGluZ3MudGFibGVQaXBlQWxpZ25cbiAgY29uc3Qgc3RyaW5nTGVuZ3RoID0gc2V0dGluZ3Muc3RyaW5nTGVuZ3RoXG4gIGNvbnN0IGFyb3VuZCA9IHBhZGRpbmcgPyAnICcgOiAnfCdcblxuICByZXR1cm4ge1xuICAgIHVuc2FmZTogW1xuICAgICAge2NoYXJhY3RlcjogJ1xccicsIGluQ29uc3RydWN0OiAndGFibGVDZWxsJ30sXG4gICAgICB7Y2hhcmFjdGVyOiAnXFxuJywgaW5Db25zdHJ1Y3Q6ICd0YWJsZUNlbGwnfSxcbiAgICAgIC8vIEEgcGlwZSwgd2hlbiBmb2xsb3dlZCBieSBhIHRhYiBvciBzcGFjZSAocGFkZGluZyksIG9yIGEgZGFzaCBvciBjb2xvblxuICAgICAgLy8gKHVucGFkZGVkIGRlbGltaXRlciByb3cpLCBjb3VsZCByZXN1bHQgaW4gYSB0YWJsZS5cbiAgICAgIHthdEJyZWFrOiB0cnVlLCBjaGFyYWN0ZXI6ICd8JywgYWZ0ZXI6ICdbXFx0IDotXSd9LFxuICAgICAgLy8gQSBwaXBlIGluIGEgY2VsbCBtdXN0IGJlIGVuY29kZWQuXG4gICAgICB7Y2hhcmFjdGVyOiAnfCcsIGluQ29uc3RydWN0OiAndGFibGVDZWxsJ30sXG4gICAgICAvLyBBIGNvbG9uIG11c3QgYmUgZm9sbG93ZWQgYnkgYSBkYXNoLCBpbiB3aGljaCBjYXNlIGl0IGNvdWxkIHN0YXJ0IGFcbiAgICAgIC8vIGRlbGltaXRlciByb3cuXG4gICAgICB7YXRCcmVhazogdHJ1ZSwgY2hhcmFjdGVyOiAnOicsIGFmdGVyOiAnLSd9LFxuICAgICAgLy8gQSBkZWxpbWl0ZXIgcm93IGNhbiBhbHNvIHN0YXJ0IHdpdGggYSBkYXNoLCB3aGVuIGZvbGxvd2VkIGJ5IG1vcmVcbiAgICAgIC8vIGRhc2hlcywgYSBjb2xvbiwgb3IgYSBwaXBlLlxuICAgICAgLy8gVGhpcyBpcyBhIHN0cmljdGVyIHZlcnNpb24gdGhhbiB0aGUgYnVpbHQgaW4gY2hlY2sgZm9yIGxpc3RzLCB0aGVtYXRpY1xuICAgICAgLy8gYnJlYWtzLCBhbmQgc2V0ZXggaGVhZGluZyB1bmRlcmxpbmVzIHRob3VnaDpcbiAgICAgIC8vIDxodHRwczovL2dpdGh1Yi5jb20vc3ludGF4LXRyZWUvbWRhc3QtdXRpbC10by1tYXJrZG93bi9ibG9iLzUxYTIwMzgvbGliL3Vuc2FmZS5qcyNMNTc+XG4gICAgICB7YXRCcmVhazogdHJ1ZSwgY2hhcmFjdGVyOiAnLScsIGFmdGVyOiAnWzp8LV0nfVxuICAgIF0sXG4gICAgaGFuZGxlcnM6IHtcbiAgICAgIHRhYmxlOiBoYW5kbGVUYWJsZSxcbiAgICAgIHRhYmxlUm93OiBoYW5kbGVUYWJsZVJvdyxcbiAgICAgIHRhYmxlQ2VsbDogaGFuZGxlVGFibGVDZWxsLFxuICAgICAgaW5saW5lQ29kZTogaW5saW5lQ29kZVdpdGhUYWJsZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7VG9NYXJrZG93bkhhbmRsZX1cbiAgICogQHBhcmFtIHtUYWJsZX0gbm9kZVxuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlVGFibGUobm9kZSwgXywgY29udGV4dCwgc2FmZU9wdGlvbnMpIHtcbiAgICByZXR1cm4gc2VyaWFsaXplRGF0YShcbiAgICAgIGhhbmRsZVRhYmxlQXNEYXRhKG5vZGUsIGNvbnRleHQsIHNhZmVPcHRpb25zKSxcbiAgICAgIG5vZGUuYWxpZ25cbiAgICApXG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpc27igJl0IHJlYWxseSB1c2VkIG5vcm1hbGx5LCBiZWNhdXNlIHdlIGhhbmRsZSByb3dzIGF0IHRoZVxuICAgKiB0YWJsZSBsZXZlbC5cbiAgICogQnV0LCBpZiBzb21lb25lIHBhc3NlcyBpbiBhIHRhYmxlIHJvdywgdGhpcyBlbnN1cmVzIHdlIG1ha2Ugc29tZXdoYXQgc2Vuc2UuXG4gICAqXG4gICAqIEB0eXBlIHtUb01hcmtkb3duSGFuZGxlfVxuICAgKiBAcGFyYW0ge1RhYmxlUm93fSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZVJvdyhub2RlLCBfLCBjb250ZXh0LCBzYWZlT3B0aW9ucykge1xuICAgIGNvbnN0IHJvdyA9IGhhbmRsZVRhYmxlUm93QXNEYXRhKG5vZGUsIGNvbnRleHQsIHNhZmVPcHRpb25zKVxuICAgIGNvbnN0IHZhbHVlID0gc2VyaWFsaXplRGF0YShbcm93XSlcbiAgICAvLyBgbWFya2Rvd24tdGFibGVgIHdpbGwgYWx3YXlzIGFkZCBhbiBhbGlnbiByb3dcbiAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgdmFsdWUuaW5kZXhPZignXFxuJykpXG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge1RvTWFya2Rvd25IYW5kbGV9XG4gICAqIEBwYXJhbSB7VGFibGVDZWxsfSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZUNlbGwobm9kZSwgXywgY29udGV4dCwgc2FmZU9wdGlvbnMpIHtcbiAgICBjb25zdCBleGl0ID0gY29udGV4dC5lbnRlcigndGFibGVDZWxsJylcbiAgICBjb25zdCBzdWJleGl0ID0gY29udGV4dC5lbnRlcigncGhyYXNpbmcnKVxuICAgIGNvbnN0IHZhbHVlID0gY29udGFpbmVyUGhyYXNpbmcobm9kZSwgY29udGV4dCwge1xuICAgICAgLi4uc2FmZU9wdGlvbnMsXG4gICAgICBiZWZvcmU6IGFyb3VuZCxcbiAgICAgIGFmdGVyOiBhcm91bmRcbiAgICB9KVxuICAgIHN1YmV4aXQoKVxuICAgIGV4aXQoKVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8c3RyaW5nPj59IG1hdHJpeFxuICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ+IHwgbnVsbCB8IHVuZGVmaW5lZH0gW2FsaWduXVxuICAgKi9cbiAgZnVuY3Rpb24gc2VyaWFsaXplRGF0YShtYXRyaXgsIGFsaWduKSB7XG4gICAgcmV0dXJuIG1hcmtkb3duVGFibGUobWF0cml4LCB7XG4gICAgICBhbGlnbixcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3I6IGBtYXJrZG93bi10YWJsZWAgdHlwZXMgc2hvdWxkIHN1cHBvcnQgYG51bGxgLlxuICAgICAgYWxpZ25EZWxpbWl0ZXJzLFxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogYG1hcmtkb3duLXRhYmxlYCB0eXBlcyBzaG91bGQgc3VwcG9ydCBgbnVsbGAuXG4gICAgICBwYWRkaW5nLFxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogYG1hcmtkb3duLXRhYmxlYCB0eXBlcyBzaG91bGQgc3VwcG9ydCBgbnVsbGAuXG4gICAgICBzdHJpbmdMZW5ndGhcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VGFibGV9IG5vZGVcbiAgICogQHBhcmFtIHtUb01hcmtkb3duQ29udGV4dH0gY29udGV4dFxuICAgKiBAcGFyYW0ge1NhZmVPcHRpb25zfSBzYWZlT3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlVGFibGVBc0RhdGEobm9kZSwgY29udGV4dCwgc2FmZU9wdGlvbnMpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW5cbiAgICBsZXQgaW5kZXggPSAtMVxuICAgIC8qKiBAdHlwZSB7QXJyYXk8QXJyYXk8c3RyaW5nPj59ICovXG4gICAgY29uc3QgcmVzdWx0ID0gW11cbiAgICBjb25zdCBzdWJleGl0ID0gY29udGV4dC5lbnRlcigndGFibGUnKVxuXG4gICAgd2hpbGUgKCsraW5kZXggPCBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBoYW5kbGVUYWJsZVJvd0FzRGF0YShcbiAgICAgICAgY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBzYWZlT3B0aW9uc1xuICAgICAgKVxuICAgIH1cblxuICAgIHN1YmV4aXQoKVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VGFibGVSb3d9IG5vZGVcbiAgICogQHBhcmFtIHtUb01hcmtkb3duQ29udGV4dH0gY29udGV4dFxuICAgKiBAcGFyYW0ge1NhZmVPcHRpb25zfSBzYWZlT3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlVGFibGVSb3dBc0RhdGEobm9kZSwgY29udGV4dCwgc2FmZU9wdGlvbnMpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW5cbiAgICBsZXQgaW5kZXggPSAtMVxuICAgIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgICBjb25zdCByZXN1bHQgPSBbXVxuICAgIGNvbnN0IHN1YmV4aXQgPSBjb250ZXh0LmVudGVyKCd0YWJsZVJvdycpXG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgLy8gTm90ZTogdGhlIHBvc2l0aW9uYWwgaW5mbyBhcyB1c2VkIGhlcmUgaXMgaW5jb3JyZWN0LlxuICAgICAgLy8gTWFraW5nIGl0IGNvcnJlY3Qgd291bGQgYmUgaW1wb3NzaWJsZSBkdWUgdG8gYWxpZ25pbmcgY2VsbHM/XG4gICAgICAvLyBBbmQgaXQgd291bGQgbmVlZCBjb3B5L3Bhc3RpbmcgYG1hcmtkb3duLXRhYmxlYCBpbnRvIHRoaXMgcHJvamVjdC5cbiAgICAgIHJlc3VsdFtpbmRleF0gPSBoYW5kbGVUYWJsZUNlbGwoXG4gICAgICAgIGNoaWxkcmVuW2luZGV4XSxcbiAgICAgICAgbm9kZSxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgc2FmZU9wdGlvbnNcbiAgICAgIClcbiAgICB9XG5cbiAgICBzdWJleGl0KClcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7VG9NYXJrZG93bkhhbmRsZX1cbiAgICogQHBhcmFtIHtJbmxpbmVDb2RlfSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBpbmxpbmVDb2RlV2l0aFRhYmxlKG5vZGUsIHBhcmVudCwgY29udGV4dCkge1xuICAgIGxldCB2YWx1ZSA9IGlubGluZUNvZGUobm9kZSwgcGFyZW50LCBjb250ZXh0KVxuXG4gICAgaWYgKGNvbnRleHQuc3RhY2suaW5jbHVkZXMoJ3RhYmxlQ2VsbCcpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcfC9nLCAnXFxcXCQmJylcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxufVxuIl0sIm5hbWVzIjpbImNvbnRhaW5lclBocmFzaW5nIiwiaW5saW5lQ29kZSIsIm1hcmtkb3duVGFibGUiLCJnZm1UYWJsZUZyb21NYXJrZG93biIsImVudGVyIiwidGFibGUiLCJlbnRlclRhYmxlIiwidGFibGVEYXRhIiwiZW50ZXJDZWxsIiwidGFibGVIZWFkZXIiLCJ0YWJsZVJvdyIsImVudGVyUm93IiwiZXhpdCIsImNvZGVUZXh0IiwiZXhpdENvZGVUZXh0IiwiZXhpdFRhYmxlIiwidG9rZW4iLCJhbGlnbiIsIl9hbGlnbiIsInR5cGUiLCJtYXAiLCJkIiwiY2hpbGRyZW4iLCJzZXREYXRhIiwidmFsdWUiLCJyZXN1bWUiLCJnZXREYXRhIiwicmVwbGFjZSIsIm5vZGUiLCJzdGFjayIsImxlbmd0aCIsIiQwIiwiJDEiLCJnZm1UYWJsZVRvTWFya2Rvd24iLCJvcHRpb25zIiwic2V0dGluZ3MiLCJwYWRkaW5nIiwidGFibGVDZWxsUGFkZGluZyIsImFsaWduRGVsaW1pdGVycyIsInRhYmxlUGlwZUFsaWduIiwic3RyaW5nTGVuZ3RoIiwiYXJvdW5kIiwidW5zYWZlIiwiY2hhcmFjdGVyIiwiaW5Db25zdHJ1Y3QiLCJhdEJyZWFrIiwiYWZ0ZXIiLCJoYW5kbGVycyIsImhhbmRsZVRhYmxlIiwiaGFuZGxlVGFibGVSb3ciLCJ0YWJsZUNlbGwiLCJoYW5kbGVUYWJsZUNlbGwiLCJpbmxpbmVDb2RlV2l0aFRhYmxlIiwiXyIsImNvbnRleHQiLCJzYWZlT3B0aW9ucyIsInNlcmlhbGl6ZURhdGEiLCJoYW5kbGVUYWJsZUFzRGF0YSIsInJvdyIsImhhbmRsZVRhYmxlUm93QXNEYXRhIiwic2xpY2UiLCJpbmRleE9mIiwic3ViZXhpdCIsImJlZm9yZSIsIm1hdHJpeCIsImluZGV4IiwicmVzdWx0IiwicGFyZW50IiwiaW5jbHVkZXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/mdast-util-gfm-table/lib/index.js\n");

/***/ })

};
;