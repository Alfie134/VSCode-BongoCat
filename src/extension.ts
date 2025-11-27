//  Entry point of the project
    // Registers the cat
    // Listens to typing events
    //Creates the WebView overlay

import { createCatWebview } from './webview';
import * as vscode from 'vscode';

export function activate (context: vscode.ExtensionContext) {
    console.log('Bongo-Terminal-Cat activated 😺');

    const startCommand = vscode.commands.registerCommand('bongoCat.start', () => {
        createCatWebview(context);
    });
    

    context.subscriptions.push(startCommand);

    const panel = createCatWebview(context);

    // hookCatMessaging(panel, context);
}

export function deactivate() {}