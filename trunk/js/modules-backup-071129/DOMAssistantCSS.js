/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	
	This module by Robert Nyman, http://www.robertnyman.com
*/
/*extern DOMAssistant, $, HTMLArray */
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
	}
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
DOMAssistant.initCSS();