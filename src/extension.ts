'use strict';
import * as vscode from 'vscode';
import { unbracketString, validateUrl } from './is-url';
import { localeMap } from './localeMap';
import isUrl from 'is-url';

const SUPPORTED_DOC_ID = [
	"markdown"	// support for markdown only
];

const showInfomationAndExit = (message: string) => {
	vscode.window.showInformationMessage(message);
	return;
};

export function activate(context: vscode.ExtensionContext) {
	// TODO: 複数行のURL処理に対応する:データのクレンジングをする -> 改行コードで分割、空行の削除、各行のtrim、行ごとの"<>"除去、
	let fromClipboard = vscode.commands.registerCommand('zenn-url-to-linkcard.fromClipboard', () => {
		const promise = vscode.env.clipboard.readText();
		promise.then((text) => {
			const unbracketed: string = unbracketString(text);
			if (!isUrl(unbracketed)) {
				return showInfomationAndExit(localeMap("showInformationMessage.selectionTextIsNotUrl"));
			}
			const editor = vscode.window.activeTextEditor;
			if (editor == null) {
				return;
			}
			const doc = editor.document;
			if (doc == null || !SUPPORTED_DOC_ID.includes(doc.languageId)) {
				return showInfomationAndExit(localeMap("showInformationMessage.unsupportedDocumentType"));
			}
			// text is Url
			editor.edit(builder => {
				builder.insert(editor.selection.active, `@[card](${unbracketed})\n`);
			});
		});
	});

	let fromSelection = vscode.commands.registerCommand('zenn-url-to-linkcard.fromSelection', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor == null) {
			return;
		}
		const doc = editor.document;
		if (doc == null) {
			return;
		}
		const text = doc.getText(editor.selection).trim();
		const unbracketed: string = unbracketString(text);
		if (!isUrl(unbracketed)) {
			return showInfomationAndExit(localeMap("showInformationMessage.selectionTextIsNotUrl"));
		}
		// text is Url
		editor.edit(builder => {
			builder.replace(editor.selection, `@[card](${unbracketed})\n`);
		});
	});

	context.subscriptions.push(fromClipboard);
	context.subscriptions.push(fromSelection);
}

export function deactivate() {}
