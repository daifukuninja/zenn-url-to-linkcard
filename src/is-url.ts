import isUrl = require('is-url');

// validate text is Url string
// or angle bracketed Url string 
export const validateUrl = (text:string): boolean => {
	// If it suspect angle bracketed, remove 1 character before and after
	const unbracketed = unbracketString(text);
	return isUrl(unbracketed);
};

export const unbracketString = (text:string): string => {
	if (text.startsWith("<") && text.endsWith(">")) {
		text = text.slice(1).slice(0, -1);
	}
	return text;
}