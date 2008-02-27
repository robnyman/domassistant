// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
/*extern DOMAssistant */
DOMAssistant.AJAX = function () {
	var globalXMLHttp = null;
	var readyState = 0;
	var status = -1;
	var statusText = "";
	return {
		publicMethods : [
			"get",
			"post",
			"load",
			"replaceWithAJAXContent"
		],
		
		initRequest : function () {
			var XMLHttp = null;
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
			return XMLHttp;
		},
	
		get : function (url, callBack, addToContent) {
			return DOMAssistant.AJAX.makeCall.call(this, url, callBack, "GET", addToContent);
		},
		
		post : function (url, callBack) {
			return DOMAssistant.AJAX.makeCall.call(this, url, callBack, "POST");
		},
		
		load : function (url, add) {
			DOMAssistant.AJAX.get.call(this, url, DOMAssistant.AJAX.replaceWithAJAXContent, (add || false));
		},
		
		makeCall : function  (url, callBack, method, addToContent) {
			var XMLHttp = DOMAssistant.AJAX.initRequest();
			if (XMLHttp) {
				globalXMLHttp = XMLHttp;
				var ajaxCall = function (elm) {
					var params = url.split("?");
					var callURL = (method === "POST")? params[0] : url;
					XMLHttp.open(method, callURL, true);
					XMLHttp.setRequestHeader("AJAX", "true");				
					var sendVal = null;
					if (method === "POST") {
						var paramVal = params[1];
						var contentLength = (paramVal)? paramVal.length : 0;
						sendVal = paramVal;
						XMLHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						XMLHttp.setRequestHeader("Content-length", contentLength);
						XMLHttp.setRequestHeader("Connection", "close");
					}
					if (typeof callBack === "function") {
						XMLHttp.onreadystatechange = function () {
							if(XMLHttp.readyState === 4) {
								callBack.call(elm, XMLHttp.responseText, addToContent);
								readyState = 4;
								status = XMLHttp.status;
								statusText = XMLHttp.statusText;
								globalXMLHttp = null;
								XMLHttp = null;
							}
						};
					}
					XMLHttp.send(sendVal);
				}(this);				
			}
			return this;
		},
		
		replaceWithAJAXContent : function (content, add) {
			if (add) {
				this.innerHTML += content;
			}
			else {
				var elms = this.elmsByTag("*");
				for (var i=0, il=elms.length, elm, attr; i<il; i++) {
					elm = elms[i];
					attr = elm.attributes;
					if (attr) {
						for (var j=0, jl=attr.length; j<jl; j++) {
							if (typeof elm[attr[j].name] === "function") {
								elm[attr[j].name] = null;
							}
						}
					}	
				}
				this.innerHTML = content;
			}
		},
		
		getReadyState : function () {
			return (globalXMLHttp && typeof globalXMLHttp.readyState !== "undefined")? globalXMLHttp.readyState : readyState;
		},
		
		getStatus : function () {
			return status;
		},
		
		getStatusText : function () {
			return statusText;
		}
	};
}();
DOMAssistant.attach(DOMAssistant.AJAX);