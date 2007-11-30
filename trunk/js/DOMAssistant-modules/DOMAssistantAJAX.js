/*extern DOMAssistant, $ */
// ---
DOMAssistant.AJAX = {
	XMLHttp : null,
	callbackFunction : null,
	response : null,
	
	init: function () {
		if(!this.XMLHttp) {
			if(typeof XMLHttpRequest !== "undefined") {
				this.XMLHttp = new XMLHttpRequest();
			}
			else if(typeof window.ActiveXObject !== "undefined") {
				try {
					this.XMLHttp = new window.ActiveXObject("Msxml2.XMLHTTP.4.0");
				}
				catch(e) {
					try {
						this.XMLHttp = new window.ActiveXObject("MSXML2.XMLHTTP");
					}
					catch(e2) {
						try {
							this.XMLHttp = new window.ActiveXObject("Microsoft.XMLHTTP");
						}
						catch(e3) {
							this.XMLHttp = null;
						}
					}
				}
			}
		}
		return this.XMLHttp;
	},
	
	get : function (url, callbackFunction) {
		if(this.init()) {
			if(typeof callbackFunction !== "undefined") {
				this.callbackFunction = callbackFunction;
			}
			// This line needed to properly control the onreadystatechange event for Firefox
			this.XMLHttp.onreadystatechange = function () {};
			this.XMLHttp.abort();
			this.XMLHttp.open("GET", url, true);
			this.XMLHttp.onreadystatechange = this.contentReady;
			this.XMLHttp.send(null);
		}
	},
	
	contentReady : function () {
		var AJAXObj = DOMAssistant.AJAX;
		if(AJAXObj.XMLHttp && AJAXObj.XMLHttp.readyState === 4) {
			AJAXObj.response = AJAXObj.XMLHttp.responseText;
			if(AJAXObj.callbackFunction && typeof AJAXObj.callbackFunction === "function") {
				AJAXObj.callbackFunction(AJAXObj.response);
			}
		}
	}
};
// ---