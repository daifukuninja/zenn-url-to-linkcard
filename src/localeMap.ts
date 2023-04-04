import * as vscode from 'vscode';
import localeDefault from '../package.nls.json';
import localeJa from '../package.nls.ja.json';

export type LocaleKeyType = keyof typeof localeDefault;

interface LocaleEntry
{
	[key: string]: string;
}
const localeTableKey = vscode.env.language;
const localeTable = Object.assign(localeDefault, ((<{[key : string] : LocaleEntry}>{
    ja : localeJa
})[localeTableKey] || { }));
const localeString = (key : string) : string => localeTable[key] || key;

export const localeMap = (key : LocaleKeyType) : string => localeString(key);
