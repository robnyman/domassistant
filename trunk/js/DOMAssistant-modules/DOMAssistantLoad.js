/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	
	This module by Robert Nyman, http://www.robertnyman.com
	Inspired and influenced by Dean Edwards, Matthias Miller, and John Resig: http://dean.edwards.name/weblog/2006/06/again/
*/
/*extern DOMAssistant, $ */
DOMAssistant.functionsToCall = [];

DOMAssistant.DOMReady = function () {
	var func;
	var functionToCall;
	for (var i=0; i<arguments.length; i++) {
		func = arguments[i];
		functionToCall = (typeof func === "function")? func : new Function(func);
		this.functionsToCall.push(functionToCall);
	}
};

DOMAssistant.initLoad = function () {
	this.DOMLoaded = false;
	this.DOMLoadTimer = null;
};

DOMAssistant.DOMHasLoaded = function () {
	if(DOMAssistant.DOMLoaded) {
		return;
	}
	DOMAssistant.DOMLoaded = true;
	DOMAssistant.execFunctions();
};

DOMAssistant.execFunctions = function () {
	if(this.DOMLoaded) {
		clearInterval(this.DOMLoadTimer);
	}
	var functionToCall;
	for(var i=0; i<this.functionsToCall.length; i++) {
		try{
			this.functionsToCall[i]();
		}
		catch(e) {
			// Optional: handle error here
		}
	}
};
// ---
/* Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
	if(document.getElementById) {
		document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
	    document.getElementById("ieScriptLoad").onreadystatechange = function() {
	        if (this.readyState == "complete") {
	            DOMAssistant.DOMHasLoaded();
	        }
	    };
	}
/*@end @*/
// ---
/* Mozilla/Opera 9 */
if(document.addEventListener) {
	document.addEventListener("DOMContentLoaded", DOMAssistant.DOMHasLoaded, false);
}
// ---
/* Safari */
if(navigator.userAgent.search(/WebKit/i) !== -1) {
    DOMAssistant.DOMLoadTimer = setInterval(function () {
		if(document.readyState.search(/loaded|complete/i) !== -1) {
			DOMAssistant.DOMHasLoaded();
		}
	}, 10);
}
// ---
/* Other web browsers */
window.onload = DOMAssistant.DOMHasLoaded;
// ---
DOMAssistant.initLoad();