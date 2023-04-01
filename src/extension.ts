import * as vscode from 'vscode';
import isUrl = require('is-url');

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "zenn-url-to-linkcard" is now active!');

	let disposable = vscode.commands.registerCommand('zenn-url-to-linkcard.helloWorld', () => {
		const promise = vscode.env.clipboard.readText();
		promise.then((text) => {
			if (isUrl(text)) {
				console.log(`${text} is URL!`);
				return;
			}
			console.log(`${text} is not URL...`);
		});
		vscode.window.showInformationMessage('Hello World from zenn-url-to-linkcard!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
