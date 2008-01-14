// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
/*extern DOMAssistant */
DOMAssistant.AJAX = function () {
	var baseMethodsToAdd = [
		"get",
		"post",
		"load",
		"replaceWithAJAXContent"
	];
	var HTMLArrayAJAXMethods = {
		get : function (url, callBack) {
			for (var i=0, il=this.length; i<il; i++) {
				this.AJAX.get.call(this[i], url, callBack);
			}
			return this;
		},
		post : function (url, callBack) {
			for (var i=0, il=this.length; i<il; i++) {
				this.AJAX.post.call(this[i], url, callBack);
			}
			return this;
		},
		load : function (url) {
			for (var i=0, il=this.length; i<il; i++) {
				this.AJAX.load.call(this[i], url);
			}
			return this;
		},
		replaceWithAJAXContent : function (content) {
			for (var i=0, il=this.length; i<il; i++) {
				this.AJAX.replaceWithAJAXContent.call(this[i], content);
			}
			return this;
		}
	};
	var XMLHttp = null;
	var callbackFunction = null;
	var args = null;
	var getElm = null;
	var loadElm = null;
	var addToContent = false;
	return {
		init : function () {
			DOMAssistant.addHTMLArrayPrototype("AJAX", this);
			for (var i=0, il=baseMethodsToAdd.length, current; i<il; i++) {
				current = baseMethodsToAdd[i];
				DOMAssistant.addMethod([current, this[current]]);
				DOMAssistant.addHTMLArrayPrototype(current, HTMLArrayAJAXMethods[current]);
			}
		},
		
		initRequest : function () {
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
			return DOMAssistant.AJAX.makeCall.call(this, url, callBack, "GET");
		},
		
		post : function (url, callBack) {
			return DOMAssistant.AJAX.makeCall.call(this, url, callBack, "POST");
		},
		
		makeCall : function  (url, callBack, method) {
			if (DOMAssistant.AJAX.initRequest()) {
				callbackFunction = callBack;
				getElm = this;
				// This line needed to properly control the onreadystatechange event for Firefox
				XMLHttp.onreadystatechange = function () {};
				XMLHttp.abort();
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
				XMLHttp.onreadystatechange = DOMAssistant.AJAX.contentReady;
				XMLHttp.send(sendVal);
			}
			return this;
		},
		
		getReadyState : function () {
			return (XMLHttp && typeof XMLHttp.readyState !== "undefined")? XMLHttp.readyState : null;
		},
		
		getStatus : function () {
			return XMLHttp.status;
		},
		
		getStatusText : function () {
			return XMLHttp.statusText;
		},
		
		callFunction : function () {
			var response = XMLHttp.responseText;
			if (loadElm) {
				loadElm.replaceWithAJAXContent(response, addToContent);
				loadElm = null;
			}
			else if (callbackFunction && typeof callbackFunction === "function" && getElm) {
				callbackFunction.call(getElm, response);
				args = null;
			}
		},
	
		contentReady : function () {
			var AJAXObj = DOMAssistant.AJAX;
			if (AJAXObj.getReadyState() === 4) {
				AJAXObj.callFunction();
			}
		},
		
		setLoadElm : function (elm) {
			loadElm = elm;
		},
		
		setAddToContent : function (add) {
			addToContent = add;
		},
		
		load : function (url, add) {
			DOMAssistant.AJAX.setLoadElm(this);
			DOMAssistant.AJAX.setAddToContent(add || false);
			DOMAssistant.AJAX.get(url);
		},
		
		replaceWithAJAXContent : function (content, add) {
			var elms = this.elmsByTag("*");
			elms.push(this);
			var attr;
			for (var i=0, il=elms.length, elm; i<il; i++) {
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
			if (add) {
				this.innerHTML += content;
			}
			else {
				this.innerHTML = content;
			}
		}
	};
}();
DOMAssistant.AJAX.init();