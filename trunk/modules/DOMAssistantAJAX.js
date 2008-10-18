// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation
/*global DOMAssistant */
DOMAssistant.AJAX = function () {
	var globalXMLHttp = null;
	var readyState = 0;
	var status = -1;
	var statusText = "";
	var requestPool = [];
	var createAjaxObj = function (url, method, callback, addToContent) {
		var params = null;
		if (/POST/i.test(method)) {
			url = url.split("?");
			params = url[1];
			url = url[0];
		}
		return {
			url : url,
			method : method,
			callback : callback,
			params : params,
			headers : {},
			responseType : "text",
			addToContent : addToContent || false
		};
	};
	var inProgress = function (xhr) {
		return (xhr.readyState >= 1 && xhr.readyState <= 3);
	};
	return {
		publicMethods : [
			"ajax",
			"get",
			"post",
			"load"
		],
		
		initRequest : function () {
			var XMLHttp = null;
			if (typeof XMLHttpRequest !== "undefined") {
				XMLHttp = new XMLHttpRequest();
				DOMAssistant.AJAX.initRequest = function () {
					return requestPool.length? requestPool.pop() : new XMLHttpRequest();
				};
			}
			else if (typeof window.ActiveXObject !== "undefined") {
				var XMLHttpMS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
				for (var i=0; i<XMLHttpMS.length; i++) {
					try {
						XMLHttp = new window.ActiveXObject(XMLHttpMS[i]);
						DOMAssistant.AJAX.initRequest = function () {
							return requestPool.length? requestPool.pop() : new window.ActiveXObject(XMLHttpMS[i]);
						};
						break;
					}
					catch (e) {
						XMLHttp = null;
					}
				}
			}
			return XMLHttp;
		},
		
		ajax : function (ajaxObj) {
			if (!ajaxObj.noParse && ajaxObj.url && /\?/.test(ajaxObj.url) && ajaxObj.method && /POST/i.test(ajaxObj.method)) {
				var url = ajaxObj.url.split("?");
				ajaxObj.url = url[0];
				ajaxObj.params = url[1] + ((url[1].length > 0 && ajaxObj.params)? ("&" + ajaxObj.params) : "");
			}
			return DOMAssistant.AJAX.makeCall.call(this, ajaxObj);
		},
		
		get : function (url, callback, addToContent) {
			var ajaxObj = createAjaxObj(url, "GET", callback, addToContent);
			return DOMAssistant.AJAX.makeCall.call(this, ajaxObj);
		},
		
		post : function (url, callback) {
			var ajaxObj = createAjaxObj(url, "POST", callback);
			return DOMAssistant.AJAX.makeCall.call(this, ajaxObj);
		},
		
		load : function (url, addToContent) {
			DOMAssistant.AJAX.get.call(this, url, DOMAssistant.AJAX.replaceWithAJAXContent, addToContent);
		},
		
		makeCall : function (ajaxObj) {
			var XMLHttp = DOMAssistant.AJAX.initRequest();
			if (XMLHttp) {
				globalXMLHttp = XMLHttp;
				var ajaxCall = function (elm) {
					var url = ajaxObj.url,
						method = ajaxObj.method || "GET",
						callback = ajaxObj.callback,
						params = ajaxObj.params,
						headers = ajaxObj.headers,
						responseType = ajaxObj.responseType || "text",
						addToContent = ajaxObj.addToContent,
						timeout = ajaxObj.timeout || null,
						ex = ajaxObj.exception,
						timeoutId = null;
					XMLHttp.open(method, url, true);
					XMLHttp.setRequestHeader("AJAX", "true");
					XMLHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					if (method === "POST") {
						var contentLength = params? params.length : 0;
						XMLHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						XMLHttp.setRequestHeader("Content-length", contentLength);
						if (XMLHttp.overrideMimeType) {
							XMLHttp.setRequestHeader("Connection", "close");
						}
					}
					for (var i in headers) {
						if (typeof i === "string") {
							XMLHttp.setRequestHeader(i, headers[i]);
						}
					}
					if (typeof callback === "function") {
						XMLHttp.onreadystatechange = function () {
							if (XMLHttp.readyState === 4) {
								if (timeoutId) {
									window.clearTimeout(timeoutId);
								}
								var response = /xml/i.test(responseType)? XMLHttp.responseXML : XMLHttp.responseText;
								if (/json/i.test(responseType)) {
									response = (typeof JSON === "object" && typeof JSON.parse === "function")? JSON.parse(response) : eval("(" + response + ")");
								}
								readyState = 4;
								status = XMLHttp.status;
								statusText = XMLHttp.statusText;
								globalXMLHttp = null;
								XMLHttp.onreadystatechange = function () {};
								requestPool.push(XMLHttp);
								callback.call(elm, response, addToContent);
							}
						};
					}
					XMLHttp.send(params);
					if (timeout) {
						timeoutId = window.setTimeout( function () {
							if (inProgress(XMLHttp)) {
								XMLHttp.abort();
								if (typeof ex === "function") {
									readyState = 0;
									status = 408;
									statusText = "Request timeout";
									globalXMLHttp = XMLHttp = null;
									ex.call(elm, statusText);
								}
							}
						}, timeout);
					}
				}(this);
			}
			return this;
		},
		
		replaceWithAJAXContent : function (content, add) {
			if (add) {
				this.innerHTML += content;
			}
			else {
				var elms = this.all || this.getElementsByTagName("*");
				for (var i=0, elm, attr; (elm=elms[i]); i++) {
					attr = elm.attributes;
					if (attr) {
						for (var j=0, jl=attr.length, att; j<jl; j++) {
							att = attr[j].nodeName.toLowerCase();
							if (typeof elm[att] === "function") {
								elm[att] = null;
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