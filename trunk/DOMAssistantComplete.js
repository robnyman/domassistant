/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
*/
var DOMAssistant = {
	methodsToAdd : [],
	baseMethodsToAdd : [
		"elmsByClass",
		"elmsByAttribute"	
	],
	
	init : function (){
		this.applyMethod.call(window, "$", this.$);
		window.DOMAssistant = this;
		if(window.ActiveXObject && document.all){
			HTMLArray = Array;
		}
		HTMLArray.prototype = new Array;
		HTMLArray.prototype.DOM = this;
		var current;
		for (var i=0; i<this.baseMethodsToAdd.length; i++) {
			current = this.baseMethodsToAdd[i];
			this.methodsToAdd.push([current, this[current]]);
			HTMLArray.prototype[current] = HTMLArrayBaseMethods[current];
		};
	},
	
	applyMethod : function (method, func){
		if(typeof this[method] != "function"){
			this[method] = func;
		}
	},
	
	addMethods : function (elm){
		if(elm){
			var elms = (elm.constructor == Array)? elm : [elm];
			for(var i=0; i<elms.length; i++){	
				for(var j=0; j<this.methodsToAdd.length; j++){
	            	this.applyMethod.call(elms[i], this.methodsToAdd[j][0], this.methodsToAdd[j][1]);
	            }
			}
		}
	},
	
	$ : function (){
		var elm = null;
		if(document.getElementById){
			elm = (arguments.length > 1)? new HTMLArray() : null;
			var current;
			for(var i=0; i<arguments.length; i++){
				current = arguments[i];
				if(typeof current != "object"){
					current = document.getElementById(current);
				}
				if(arguments.length > 1){
					elm.push(current);
				}
				else{
					elm = current;
				}
			}
			DOMAssistant.addMethods(elm);
		}
		return elm;
    },
	
	elmsByClass : function (className, tag){
		var returnElms = new HTMLArray();
		if(document.evaluate){
			var xPathNodes = document.evaluate(".//" + (tag || "*") + "[contains(concat(' ', @class, ' '), ' " + className + " ')]", this, null, 0, null);
			var node = xPathNodes.iterateNext();
			while(node){
				returnElms.push(node);
				node = xPathNodes.iterateNext();
			}
		}
		else{
			var elms = this.getElementsByTagName(tag || "*");			
			var regExp = new RegExp("(^|\\s)" + className + "(\\s|$)");
			for(var i=0,elm,elmsLength = elms.length; i<elmsLength; i++){
				elm = elms[i];		
				if(regExp.test(elm.className)){
					returnElms.push(elm);
				}
			}
		}
		return returnElms;
	},
	
	elmsByAttribute : function (attr, attrVal, tag){
		var returnElms = new HTMLArray();
	    if(document.evaluate){
			var attributeVal = (typeof attrVal == "undefined" || attrVal == "*")? "" : " = '" + attrVal + "'";
			var xPathNodes = document.evaluate(".//" + (tag || "*") + "[@" + attr + attributeVal + "]", this, null, 0, null);
			var node = xPathNodes.iterateNext();
			while(node){
				returnElms.push(node);
				node = xPathNodes.iterateNext();
			}
		}
		else{
			var elms = ((!tag || tag == "*") && this.all)? this.all : this.getElementsByTagName(tag || "*");
			var attributeVal = (typeof attrVal == "undefined" || attrVal == "*")? null : new RegExp("(^|\\s)" + attrVal + "(\\s|$)");
		    for(var i=0,current,currentAttr,elmsLength = elms.length; i<elmsLength; i++){
		        current = elms[i];
		        currentAttr = current.getAttribute(attr);
		        if(typeof currentAttr == "string" && currentAttr.length > 0){
		            if(!attributeVal || typeof attributeVal == "undefined" || (attributeVal && attributeVal.test(currentAttr))){
						returnElms.push(current);
		            }
		        }
		    }
		}
	    return returnElms;
	}	
}

function HTMLArray(){
	// Constructor
}

var HTMLArrayBaseMethods = {	
	elmsByClass : function (className, tag){
		var elmsWithClass = new HTMLArray();
		var elms;
		for (var i=0; i<this.length; i++) {
			elms = this.DOM.elmsByClass.call(this[i], className, tag);
			for (var j=0; j<elms.length; j++) {
				elmsWithClass.push(elms[j]);
			}
		}
		return elmsWithClass;
	},
	elmsByAttribute : function (attr, attrVal, tag){
		var elmsWithAttr = new HTMLArray();
		var elms;
		for (var i=0; i<this.length; i++) {
			elms = this.DOM.elmsByAttribute.call(this[i], attr, attrVal, tag);
			for (var j=0; j<elms.length; j++) {
				elmsWithAttr.push(elms[j]);
			}
		}
		return elmsWithAttr;
	}
};

DOMAssistant.init();
/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	
	This module by Robert Nyman, http://www.robertnyman.com
	Inspired and influenced by Dean Edwards, Matthias Miller, and John Resig: http://dean.edwards.name/weblog/2006/06/again/
*/
DOMAssistant.functionsToCall = [];

DOMAssistant.DOMReady = function (){
	var func;
	var functionToCall;
	for (var i=0; i<arguments.length; i++) {
		func = arguments[i];
		functionToCall = (typeof func == "function")? func : new Function(func);
		this.functionsToCall.push(functionToCall);
	};
};

DOMAssistant.initLoad = function (){
	this.DOMLoaded = false;
	this.DOMLoadTimer = null;
};

DOMAssistant.DOMHasLoaded = function (){
	if(DOMAssistant.DOMLoaded) return;
	DOMAssistant.DOMLoaded = true;
	DOMAssistant.execFunctions();
};

DOMAssistant.execFunctions = function (){
	if(this.DOMLoaded){
		clearInterval(this.DOMLoadTimer);
	}
	var functionToCall;
	for(var i=0; i<this.functionsToCall.length; i++){
		try{
			this.functionsToCall[i]();
		}
		catch(e){
			// Optional: handle error here
		}
	}
};
// ---
/* Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
	if(document.getElementById){
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
if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", DOMAssistant.DOMHasLoaded, false);
}
// ---
/* Safari */
if(navigator.userAgent.search(/WebKit/i) != -1){
    DOMAssistant.DOMLoadTimer = setInterval(function (){
		if(document.readyState.search(/loaded|complete/i) != -1) {
			DOMAssistant.DOMHasLoaded();
		}
	}, 10);
}
// ---
/* Other web browsers */
window.onload = DOMAssistant.DOMHasLoaded;
// ---
DOMAssistant.initLoad();
/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	
	This module by Robert Nyman, http://www.robertnyman.com
*/
DOMAssistant.CSSMethodsToAdd = [
	"addClass",
	"removeClass",
	"hasClass",
	"getStyle"
];

DOMAssistant.initCSS = function (){
	var current;
	for (var i=0; i<this.CSSMethodsToAdd.length; i++) {
		current = this.CSSMethodsToAdd[i];
		this.methodsToAdd.push([current, this[current]]);
		HTMLArray.prototype[current] = HTMLArrayCSSMethods[current];
	};
};

DOMAssistant.addClass = function (className){
	var currentClass = this.className;
	if(!new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i").test(currentClass)){
		this.className = currentClass + ((currentClass.length > 0)? " " : "") + className;
	}
	return this;
};

DOMAssistant.removeClass = function (className){
	var classToRemove = new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i");
	this.className = this.className.replace(classToRemove, function (match){
		var retVal = "";
		if(new RegExp("^\\s+.*\\s+$").test(match)){
			retVal = match.replace(/(\s+).+/, "$1");
		}
		return retVal;
	}).replace(/^\s+|\s+$/g, "");
	return this;
};

DOMAssistant.hasClass = function (className){
	return new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i").test(this.className);
};

DOMAssistant.getStyle = function (cssRule){
	var cssVal = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		cssVal = document.defaultView.getComputedStyle(this, "").getPropertyValue(cssRule);
	}
	else if(this.currentStyle){
		cssVal = cssRule.replace(/\-(\w)/g, function (match, p1){
			return p1.toUpperCase();
		});
		cssVal = this.currentStyle[cssVal];
	}
	return cssVal;
};

var HTMLArrayCSSMethods = {
	addClass : function (className){
		for (var i=0; i<this.length; i++) {
			this.DOM.addClass.call(this[i], className);
		}
		return this;
	},
	removeClass : function (className){
		for (var i=0; i<this.length; i++) {
			this.DOM.removeClass.call(this[i], className);
		}
		return this;
	},
	hasClass : function (className){
		var hasClass = [];
		for (var i=0; i<this.length; i++) {
			hasClass.push(this.DOM.hasClass.call(this[i], className));
		}
		return hasClass;
	},
	getStyle : function (cssRule){
		var hasStyle = [];
		for (var i=0; i<this.length; i++) {
			hasStyle.push(this.DOM.getStyle.call(this[i], cssRule));
		}
		return hasStyle;
	}
};

DOMAssistant.initCSS();
/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	
	This module by Robert Nyman, http://www.robertnyman.com
*/
DOMAssistant.EventMethodsToAdd = [
	"addEvent",
	"removeEvent"
];

DOMAssistant.initEvents = function (){
	var current;
	for (var i=0; i<this.EventMethodsToAdd.length; i++) {
		current = this.EventMethodsToAdd[i];
		this.methodsToAdd.push([current, this[current]]);
		HTMLArray.prototype[current] = HTMLArrayEventMethods[current];
	};
};

DOMAssistant.addEvent = function (evt, func){
	if(this.addEventListener){
		this.addEventListener(evt, func, false);
	}
	else{
		if(!this.events){
			this.events = {};
		}
		if(!this.events[evt]){
			this.events[evt] = [];
		}							
		this.events[evt].push(func);
		this["on" + evt] = DOMAssistant.handleEvent;
		if(typeof this.window == "object"){
			this.window["on" + evt] = DOMAssistant.handleEvent;
		}
	}
	return this;
};

DOMAssistant.handleEvent = function (evt){
	var evt = evt || event;
	var eventType = evt.type;
	var eventColl = this.events[eventType];
	for (var i=0; i<eventColl.length; i++) {
		eventColl[i].call(this, evt);
	}
};

DOMAssistant.removeEvent = function (evt, func){
	if(this.removeEventListener){
		this.removeEventListener(evt, func, false);
	}
	else if(this.events){
		var eventColl = this.events[evt];
		for (var i=0; i<eventColl.length; i++) {
			if(eventColl[i] == func){
				delete eventColl[i]
				eventColl.splice(i, 1);
			}
		}
	}
	return this;
};

DOMAssistant.preventDefault = function (evt){
	if(evt && evt.preventDefault){
		evt.preventDefault();
	}
	else{
		event.returnValue = false;
	}
};

DOMAssistant.cancelBubble = function (evt){
	if(evt && evt.stopPropagation){
		evt.stopPropagation();
	}
	else{
		event.cancelBubble = true;
	}
};

var HTMLArrayEventMethods = {
	addEvent : function (evt, func){
		for (var i=0; i<this.length; i++) {
			this.DOM.addEvent.call(this[i], evt, func);
		}
		return this;
	},
	removeEvent : function (evt, func){
		for (var i=0; i<this.length; i++) {
			this.DOM.removeEvent.call(this[i], evt, func);
		}
		return this;
	}
};

DOMAssistant.initEvents();
/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	
	This module by Robert Nyman, http://www.robertnyman.com
*/
DOMAssistant.ContentMethodsToAdd = [
	"prev",
	"next",
	"create",
	"setAttributes",
	"addContent",
	"replaceContent",
	"remove"
];

DOMAssistant.initContent = function (){
	var current;
	for (var i=0; i<this.ContentMethodsToAdd.length; i++) {
		current = this.ContentMethodsToAdd[i];
		this.methodsToAdd.push([current, this[current]]);
		HTMLArray.prototype[current] = HTMLArrayContentMethods[current];
	};
};

DOMAssistant.prev = function (){
	var prevSib = this.previousSibling;
	while(prevSib && prevSib.nodeType != 1){
		prevSib = prevSib.previousSibling;
	}
	return prevSib;
};

DOMAssistant.next = function (){
	var nextSib = this.nextSibling;
	while(nextSib && nextSib.nodeType != 1){
		nextSib = nextSib.nextSibling;
	}
	return nextSib;
};

DOMAssistant.create = function (name, attr, append, content){
	var elm = document.createElement(name);
	elm = DOMAssistant.$(elm);
	if(attr){
		elm.setAttributes(attr);
	}
	if(typeof content != "undefined"){
		elm.addContent(content);
	}
	if(append){
		DOMAssistant.addContent.call(this, elm);
	}
	return elm;
};

DOMAssistant.setAttributes = function (attr){	
	for(var i in attr){
		if(/class/i.test(i)){
			this.className = attr[i];
		}
		else{
			this.setAttribute(i, attr[i]);
		}	
	}
	return this;
};

DOMAssistant.addContent = function (content){
	var retVal = null;
	if(typeof content == "string"){
		retVal = this.innerHTML += content;
	}
	else{		
		retVal = this.appendChild(content);
	}
	return this;
};

DOMAssistant.replaceContent = function (newContent){
	for(var i=(this.childNodes.length - 1); i>=0; i--){
    	this.childNodes[i].parentNode.removeChild(this.childNodes[i]);
    }
	this.addContent(newContent);
	return this;
};

DOMAssistant.remove = function (){
	this.parentNode.removeChild(this);
	return null;
};

var HTMLArrayContentMethods = {
	prev : function (){
		var previousElms = new HTMLArray();
		var elm;
		for (var i=0; i<this.length; i++) {
			elm = this.DOM.prev.call(this[i]);
			if(elm){
				previousElms.push(elm);
			}
		}
		return previousElms;
	},
	next : function (){
		var nextElms = new HTMLArray();
		var elm;
		for (var i=0; i<this.length; i++) {
			elm = this.DOM.next.call(this[i]);
			if(elm){
				nextElms.push(elm);
			}
		}
		return nextElms;
	},
	create : function (name, attr, append, content){
		var newElms = new HTMLArray();
		var elm;
		for (var i=0; i<this.length; i++) {
			elm = this.DOM.create.call(this[i], name, attr, append, content);
			if(elm){
				newElms.push(elm);
			}
		}
		return newElms;
	},
	setAttributes : function (attr){
		for (var i=0; i<this.length; i++) {
			this.DOM.setAttributes.call(this[i], attr);
		}
		return this;
	},
	addContent : function (content){
		for (var i=0; i<this.length; i++) {
			this.DOM.addContent.call(this[i], content);
		}
		return this;
	},
	replaceContent : function (newContent){
		for (var i=0; i<this.length; i++) {
			this.DOM.replaceContent.call(this[i], newContent);
		}
		return this;
	},
	remove : function (){
		for (var i=0; i<this.length; i++) {
			this.DOM.remove.call(this[i]);
		}
		return this;
	}
};

DOMAssistant.initContent();
// ---
DOMAssistant.AJAX = {
	XMLHttp : null,
	callbackFunction : null,
	response : null,
	
	init: function (){
		if(!this.XMLHttp){
			if(typeof XMLHttpRequest != "undefined"){
				this.XMLHttp = new XMLHttpRequest();
			}
			else if(typeof window.ActiveXObject != "undefined"){
				try {
					this.XMLHttp = new ActiveXObject("Msxml2.XMLHTTP.4.0");
				}
				catch(e){
					try {
						this.XMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
					}
					catch(e){
						try {
							this.XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
						}
						catch(e){
							this.XMLHttp = null;
						}
					}
				}
			}
		}
		return this.XMLHttp;
	},
	
	get : function (url, callbackFunction){
		if(this.init()){
			if(typeof callbackFunction != "undefined"){
				this.callbackFunction = callbackFunction;
			}
			// This line needed to properly control the onreadystatechange event for Firefox
			this.XMLHttp.onreadystatechange = function (){};
			this.XMLHttp.abort();
			this.XMLHttp.open("GET", url, true);
			this.XMLHttp.onreadystatechange = this.contentReady;
			this.XMLHttp.send(null);
		}
	},
	
	contentReady : function (){
		var AJAXObj = DOMAssistant.AJAX;
		if(AJAXObj.XMLHttp && AJAXObj.XMLHttp.readyState == 4){
			AJAXObj.response = AJAXObj.XMLHttp.responseText;
			if(AJAXObj.callbackFunction && typeof AJAXObj.callbackFunction == "function"){
				AJAXObj.callbackFunction(AJAXObj.response);
			}
		}
	}
};
// ---