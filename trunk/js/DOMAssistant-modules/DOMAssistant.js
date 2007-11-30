/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
*/
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
		HTMLArray.prototype = [];
		HTMLArray.prototype.DOM = this;
		var current;
		for(var i=0; i<this.baseMethodsToAdd.length; i++){
			current = this.baseMethodsToAdd[i];
			this.methodsToAdd.push([current, this[current]]);
			HTMLArray.prototype[current] = HTMLArrayBaseMethods[current];
		}
	},
	
	applyMethod : function (method, func){
		if(typeof this[method] !== "function"){
			this[method] = func;
		}
	},
	
	addMethods : function (elm){
		if(elm){
			var elms = (elm.constructor === Array)? elm : [elm];
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
			var cssRule = arguments[0].match(/[#\.\s]/);
			
			
			elm = (arguments.length > 1)? new HTMLArray() : null;
			var current;
			for(var i=0; i<arguments.length; i++){
				current = arguments[i];
				if(typeof current !== "object"){
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
		if(document.evaluate){
			DOMAssistant.elmsByClass = function (className, tag){
				var returnElms = new HTMLArray();
				var xPathNodes = document.evaluate(".//" + (tag || "*") + "[contains(concat(' ', @class, ' '), ' " + className + " ')]", this, null, 0, null);
				var node = xPathNodes.iterateNext();
				while(node){
					returnElms.push(node);
					node = xPathNodes.iterateNext();
				}
				return returnElms;
			};
		}
		else{
			DOMAssistant.elmsByClass = function (className, tag){
				var returnElms = new HTMLArray();
				var elms = this.getElementsByTagName(tag || "*");			
				var regExp = new RegExp("(^|\\s)" + className + "(\\s|$)");
				for(var i=0,elm,elmsLength = elms.length; i<elmsLength; i++){
					elm = elms[i];		
					if(regExp.test(elm.className)){
						returnElms.push(elm);
					}
				}
				return returnElms;
			};
		}
		return DOMAssistant.elmsByClass(className, tag);
	},
	
	elmsByAttribute : function (attr, attrVal, tag){
	    if(document.evaluate){
			DOMAssistant.elmsByAttribute = function (attr, attrVal, tag){
				var returnElms = new HTMLArray();
				var attributeVal = (typeof attrVal === "undefined" || attrVal === "*")? "" : " = '" + attrVal + "'";
				var xPathNodes = document.evaluate(".//" + (tag || "*") + "[@" + attr + attributeVal + "]", this, null, 0, null);
				var node = xPathNodes.iterateNext();
				while(node){
					returnElms.push(node);
					node = xPathNodes.iterateNext();
				}
				return returnElms;
			};
		}
		else{
			DOMAssistant.elmsByAttribute = function (attr, attrVal, tag){
				var returnElms = new HTMLArray();
				var attributeVal = (typeof attrVal === "undefined" || attrVal === "*")? null : new RegExp("(^|\\s)" + attrVal + "(\\s|$)");
				var elms = ((!tag || tag === "*") && this.all)? this.all : this.getElementsByTagName(tag || "*");
			    for(var i=0,current,currentAttr,elmsLength = elms.length; i<elmsLength; i++){
			        current = elms[i];
			        currentAttr = current.getAttribute(attr);
			        if(typeof currentAttr === "string" && currentAttr.length > 0){
			            if(!attributeVal || typeof attributeVal === "undefined" || (attributeVal && attributeVal.test(currentAttr))){
							returnElms.push(current);
			            }
			        }
			    }
				return returnElms;
			};
		}
	    return DOMAssistant.elmsByAttribute(attr, attrVal, tag);
	}	
};
DOMAssistant.init();