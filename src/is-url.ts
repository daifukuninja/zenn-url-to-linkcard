import isUrl = require('is-url');

// validate text is Url string
// or angle bracketed Url string 
export const validateUrl = (text:string) => {
	// If it suspect angle bracketed, remove 1 character before and after
	if (text.startsWith("<") && text.endsWith(">")) {
		text = text.slice(2).slice(0, -1);
	}
	return isUrl(text);
};
