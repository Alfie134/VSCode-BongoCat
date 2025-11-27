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
            localResourceRoots: [
                vscode.Uri.joinPath(context.extensionUri),
                vscode.Uri.joinPath(context.extensionUri, 'media')
            ]
        }
    );

    panel.webview.onDidReceiveMessage(message => {
        console.log('EXTENSION RECIEVED', message);

        if (message.type === 'requestCatAssets') {
            const baseUri = panel.webview.asWebviewUri(
                vscode.Uri.joinPath(context.extensionUri, 'media')
            ).toString();

            console.log("sending base uri:", baseUri);

            panel.webview.postMessage({
                type: 'catAssets', 
                base: baseUri
            });
        }
    });

    panel.webview.html = getWebviewContent(panel.webview, context);

    return panel;
}

// export function hookCatMessaging(panel: vscode.WebviewPanel, context: vscode.ExtensionContext) {
//     panel.webview.onDidReceiveMessage(message => {
//         if(message.type === 'requestCatAssets') {
//             panel.webview.postMessage({
//                 type: 'catAssets',
//                 base: panel.webview.asWebviewUri(
//                     vscode.Uri.joinPath(context.extensionUri, 'media')
//                 ).toString()
//             });
//         }
//     });
// }


function getWebviewContent(webview: vscode.Webview, context: vscode.ExtensionContext): string {
    const styleUri = webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, 'media', 'style.css')
    );

    const scriptUri = webview.asWebviewUri(
vscode.Uri.joinPath(context.extensionUri, 'media', 'cat.js')
);

    return `
    <html>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="${styleUri}">
        </head>
        <body>
            <div id="bongo-cat"></div>

            <script>
                const vscode = acquireVsCodeApi();
                window.addEventListener("DOMContentLoaded", () => {
                    vscode.postMessage({ type: 'requestCatAssets' });
                });
            </script>

            <script src="${scriptUri}"></script>
        </body>
    </html>`;
}