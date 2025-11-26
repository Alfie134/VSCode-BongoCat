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