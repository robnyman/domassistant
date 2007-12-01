// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant. Module inspiration by Dean Edwards, Matthias Miller, and John Resig: http://dean.edwards.name/weblog/2006/06/again/
/*extern DOMAssistant */
DOMAssistant.DOMLoad = function () {
	var DOMLoaded = false;
	var DOMLoadTimer = null;
	var functionsToCall = [];
	var execFunctions = function () {
		if (DOMLoaded) {
			clearInterval(DOMLoadTimer);
		}
		for (var i=0, il=functionsToCall.length; i<il; i++) {
			try{
				functionsToCall[i]();
			}
			catch(e) {
				// Optional: handle error here
			}
		}
	};
	var DOMHasLoaded = function () {
		if (DOMLoaded) {
			return;
		}
		DOMLoaded = true;
		execFunctions();
	};
	/* Internet Explorer */
	/*@cc_on @*/
	/*@if (@_win32)
		if (document.getElementById) {
			document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
		    document.getElementById("ieScriptLoad").onreadystatechange = function() {
		        if (this.readyState == "complete") {
		            DOMHasLoaded();
		        }
		    };
		}
	/*@end @*/
	/* Mozilla/Opera 9 */
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", DOMHasLoaded, false);
	}
	/* Safari */
	if (navigator.userAgent.search(/WebKit/i) !== -1) {
	    DOMLoadTimer = setInterval(function () {
			if (document.readyState.search(/loaded|complete/i) !== -1) {
				var loaded = new DOMHasLoaded();
			}
		}, 10);
	}
	/* Other web browsers */
	window.onload = DOMHasLoaded;
	
	return{
		DOMReady : function () {
			for (var i=0, il=arguments.length, func, callFunc; i<il; i++) {
				func = arguments[i];
				callFunc = (typeof func === "function")? func : new Function(func);
				functionsToCall.push(callFunc);
			}
		}
	};
}();
DOMAssistant.DOMReady = DOMAssistant.DOMLoad.DOMReady;