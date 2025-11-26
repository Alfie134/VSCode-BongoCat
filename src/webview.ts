// Handles sending messages between extension and WebView
// Resizing with the terminal
// Position tracking 
//  Reacting to theme light/dark mode 
import * as vscode from 'vscode';

export function createCatWebview (context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel (
        'bongoCat',
        '',
        vscode.ViewColumn.Active,
        {
            enableScripts: true,
            retainContextWhenHidden: true, 
            enableCommandUris: true
        }
    );

    panel.webview.html = getWebviewContent(panel.webview);
}

function getWebviewContent(webview: vscode.Webview): string {
    const styleUri = webview.asWebviewUri (
        vscode.Uri.joinPath(vscode.Uri.file(__dirname), "..", "media", "style.css")
    );

    const scriptUri = webview.asWebviewUri (
        vscode.Uri.joinPath(vscode.Uri.file(__dirname), "..", "media", "cat.js")
    );
    return `
    <html>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="${styleUri}">
        </head>
        <body>
        <div id="bongo-cat">
            <h1 style="color:white;">MEOW</h1>
        </div>
        </body>
    </html>`;
//         <html>
//         <head>
//             <meta charset="UTF-8"></meta>
//             <style>
//                 body {
//                     background: transparent;
//                     margin: 0;
//                     padding: 0;
//                     overflow: hidden;
//                 }
//             </style>
//         </head>
//         <body>
//             <div id="bongo-cat"></div>
//             <div id="bongo-cat" style="background:rgba(255,105,180,0.4);"></div>
//             <script src="${scriptUri}">
//                 document.body.style.background = 'transparent';
//             </scirpt>
//         </body>
//         </html>`;
    }