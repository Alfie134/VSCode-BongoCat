"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatWebview = createCatWebview;
// Handles sending messages between extension and WebView
// Resizing with the terminal
// Position tracking 
//  Reacting to theme light/dark mode 
const vscode = __importStar(require("vscode"));
function createCatWebview(context) {
    const panel = vscode.window.createWebviewPanel('bongoCat', '', vscode.ViewColumn.Active, {
        enableScripts: true,
        retainContextWhenHidden: true,
        enableCommandUris: true
    });
    panel.webview.html = getWebviewContent(panel.webview);
}
function getWebviewContent(webview) {
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(vscode.Uri.file(__dirname), "..", "media", "style.css"));
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(vscode.Uri.file(__dirname), "..", "media", "cat.js"));
    return `
        <html>
        <head>
            <meta charset="UTF-8"></meta>
            <title> Bongo Cat </title>
            <link rel="stylesheet" href="${styleUri}"></link>
        </head>
        <body>
            <div id="bongo-cat"></div>
            <script src="${scriptUri}"></scirpt>
        </body>
        </html>`;
}
//# sourceMappingURL=webview.js.map