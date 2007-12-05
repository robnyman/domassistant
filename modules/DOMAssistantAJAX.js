// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
/*extern DOMAssistant */
DOMAssistant.AJAX = function () {
	var XMLHttp = null;
	var callbackFunction = null;
	return {
		init: function () {
			if (!XMLHttp) {
				if (typeof XMLHttpRequest !== "undefined") {
					XMLHttp = new XMLHttpRequest();
				}
				else if (typeof window.ActiveXObject !== "undefined") {
					try{
						XMLHttp = new window.ActiveXObject("Msxml2.XMLHTTP.4.0");
					}
					catch(e) {
						try{
							XMLHttp = new window.ActiveXObject("MSXML2.XMLHTTP");
						}
						catch(e2) {
							try{
								XMLHttp = new window.ActiveXObject("Microsoft.XMLHTTP");
							}
							catch(e3) {
								XMLHttp = null;
							}
						}
					}
				}
			}
			return XMLHttp;
		},
	
		get : function (url, callBack) {
			if (this.init()) {
				callbackFunction = callBack;
				// This line needed to properly control the onreadystatechange event for Firefox
				XMLHttp.onreadystatechange = function () {};
				XMLHttp.abort();
				XMLHttp.open("GET", url, true);
				XMLHttp.setRequestHeader("AJAX", "true");
				XMLHttp.onreadystatechange = this.contentReady;
				XMLHttp.send(null);
			}
		},
		
		getReadyState : function () {
			return (XMLHttp && typeof XMLHttp.readyState !== "undefined")? XMLHttp.readyState : null;
		},
		
		callFunction : function () {
			if (callbackFunction && typeof callbackFunction === "function") {
				callbackFunction(XMLHttp.responseText);
			}
		},
	
		contentReady : function () {
			var AJAXObj = DOMAssistant.AJAX;
			if (AJAXObj.getReadyState() === 4) {
				AJAXObj.callFunction();
			}
		}
	};
}();