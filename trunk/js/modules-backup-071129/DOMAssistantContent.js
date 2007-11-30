/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	
	This module by Robert Nyman, http://www.robertnyman.com
*/
/*extern DOMAssistant, $, HTMLArray */
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
	}
};

DOMAssistant.prev = function (){
	var prevSib = this.previousSibling;
	while(prevSib && prevSib.nodeType !== 1){
		prevSib = prevSib.previousSibling;
	}
	return prevSib;
};

DOMAssistant.next = function (){
	var nextSib = this.nextSibling;
	while(nextSib && nextSib.nodeType !== 1){
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
	if(typeof content !== "undefined"){
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
	if(typeof content === "string"){
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
DOMAssistant.initContent();