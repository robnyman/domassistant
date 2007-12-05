// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
var DOMAssistant = function () {
	var methodsToAdd = [];
	var baseMethodsToAdd = [
		"elmsByClass",
		"elmsByAttribute",
		"elmsByTag"
	];
	var HTMLArray = function () {
		// Constructor
	};
	var HTMLArrayBaseMethods = {
		elmsByClass : function (className, tag) {
			var elmsWithClass = new HTMLArray();
			var elms;
			for (var i=0, il=this.length; i<il; i++) {
				elms = this.DOM.elmsByClass.call(this[i], className, tag);
				for (var j=0, jl=elms.length; j<jl; j++) {
					elmsWithClass.push(elms[j]);
				}
			}
			return elmsWithClass;
		},
		elmsByAttribute : function (attr, attrVal, tag, substrMatchSelector) {
			var elmsWithAttr = new HTMLArray();
			var elms;
			for (var i=0, il=this.length; i<il; i++) {
				elms = this.DOM.elmsByAttribute.call(this[i], attr, attrVal, tag, substrMatchSelector);
				for (var j=0, jl=elms.length; j<jl; j++) {
					elmsWithAttr.push(elms[j]);
				}
			}
			return elmsWithAttr;
		},
		elmsByTag : function (tag) {
			var elmsWithTag = new HTMLArray();
			var elms;
			for (var i=0, il=this.length; i<il; i++) {
				elms = this.DOM.elmsByTag.call(this[i], tag);
				for (var j=0, jl=elms.length; j<jl; j++) {
					elmsWithTag.push(elms[j]);
				}
			}
			return elmsWithTag;
		}
	};
	
	return {
		init : function () {
			this.applyMethod.call(window, "$", this.$);
			window.DOMAssistant = this;
			if (window.ActiveXObject && document.all) {
				HTMLArray = Array;
			}
			HTMLArray.prototype = [];
			HTMLArray.prototype.DOM = this;
			var current;
			for (var i=0, il=baseMethodsToAdd.length; i<il; i++) {
				current = baseMethodsToAdd[i];
				methodsToAdd.push([current, this[current]]);
				HTMLArray.prototype[current] = HTMLArrayBaseMethods[current];
			}
		},
		
		createHTMLArray : function() {
			return new HTMLArray();
		},
		
		addMethod : function (method) {
			methodsToAdd.push(method);
		},
		
		addHTMLArrayPrototype : function (key, method) {
			HTMLArray.prototype[key] = method;
		},
	
		applyMethod : function (method, func) {
			if (typeof this[method] !== "function") {
				this[method] = func;
			}
		},
	
		addMethods : function (elm) {
			if (elm) {
				var elms = (elm.constructor === Array)? elm : [elm];
				for (var i=0, il=elms.length; i<il; i++) {	
					for (var j=0, jl=methodsToAdd.length; j<jl; j++) {
						this.applyMethod.call(elms[i], methodsToAdd[j][0], methodsToAdd[j][1]);
		            }
				}
			}
		},
	
		$ : function () {
			var elm = null;
			if (document.getElementById) {
				var arg = arguments[0];
				if (typeof arg === "string" && /[\*>\+#\.\[\s\:]/.test(arg)) {
					elm = DOMAssistant.cssSelection(arg);
				}
				else {
					elm = (arguments.length > 1)? new HTMLArray() : null;
					var current;
					for (var u=0, ul=arguments.length; u<ul; u++) {
						current = arguments[u];
						if (typeof current !== "object") {
							current = document.getElementById(current);
						}
						if (arguments.length > 1) {
							elm.push(current);
						}
						else {
							elm = current;
						}
					}
				}
				DOMAssistant.addMethods(elm);
			}
			return elm;
	    },
	
		cssSelection : function  (cssRule) {
			
			// if (document.evalute) {
			// 				var cssRules = cssRule.replace(/\s*(,)\s*/, "$1").split(",");
			// 				var elm = new HTMLArray();
			// 				for (var a=0, al=cssRules.length; a<al; a++) {
			// 					var cssSelectors = cssRules[a].split(" ");
			// 					var prevElm = new HTMLArray();
			// 					prevElm.push(DOMAssistant.$(document));
			// 					var matchingElms, childOrSiblingRef, nextTag, nextRegExp, refSeparator, refPrevElm, nextSib, refPrevElmFound;
			// 					try {
			// 						for (var i=0, il=cssSelectors.length; i<il; i++) {
			// 							
			// 						}
			// 					}
			// 					catch (e) {
			// 						alert(e);
			// 					}
			// 				}
			// 			}
			// 			else {
			// 				
			// 			}
			
			
			/* 
				#container
				.item
				#container.item
				p.info.error
				div p
				div > p
				div + p
				div ~ p
				[id]
				[id=container]
				[type=text][value=Yes]
				[id^=empt]
				[id$=parent]
				[id*=mpt]
				div:first-child
				div:last-child
				div:only-child
				div:empty
				div:nth-child(3)
				div:nth-child(odd)
				div:nth-child(even)
				div:nth-child(n3+3)
			*/
			
			
			var cssRules = cssRule.replace(/\s*(,)\s*/, "$1").split(",");
			var elm = new HTMLArray();
			for (var a=0, al=cssRules.length; a<al; a++) {
				var cssSelectors = cssRules[a].split(" ");
				var prevElm = new HTMLArray();
				prevElm.push(DOMAssistant.$(document));
				var matchingElms, childOrSiblingRef, nextTag, nextRegExp, refSeparator, refPrevElm, nextSib, refPrevElmFound;
				try {
					for (var i=0, il=cssSelectors.length; i<il; i++) {
						matchingElms = new HTMLArray();
						var rule = cssSelectors[i];
						//var cssSelector = /^((\w+)?((#|\*|\.)([\w\-_]+))?)?(:(\w+[\w\-]*)(\(((odd|even)|\d+n?((\+|\-)\d+)?)\))?)?/.exec(rule);
						var cssSelector = /^(\w+)?(#([\w\-_]+)|\*)?((\.([\w\-_]+))*)?(((\w+)?\[(\w+)(\^|\$|\*)?=?([\w\-\_]+)?\]+)*)?(:(\w+[\w\-]*)(\(((odd|even)|\d+n?((\+|\-)\d+)?)\))?)?/.exec(rule);
						var splitRule = {
							complete : cssSelector[0],
							tag : cssSelector[1], // tag name
							type : cssSelector[2], // # + id or *
							id : cssSelector[3], // id
							tag : cssSelector[4], // All classes, preceded by .
							tag : cssSelector[6], // class name
							tag : cssSelector[10], // attribute
							tag : cssSelector[12], // attribute value
							tag : cssSelector[0],
							tag : cssSelector[0],
							tag : cssSelector[0],							
						};
						
						
						/*
							Find tag name, id character and id or a . and the class name:
							^(\w+)?(#|\*|\.)?([\w\-_]+)?
							
							Find one or several attribute values:
							(((\w+)?\[(\w+)(\^|\$|\*)?=?([\w\-\_]+)?\]+)*)?
							
							Find the pseudo-class and its value:
							(:(\w+[\w\-]*)(\(((odd|even)|\d+n?((\+|\-)\d+)?)\))?)?
							
							
						*/
						
						//alert(cssSelector.join("\n"));
						alert("0: " + cssSelector[0] + "\n1: " + cssSelector[1] + "\n2: " + cssSelector[2] + "\n3: " + cssSelector[3] + "\n4: " + cssSelector[4] + "\n5: " + cssSelector[5] + "\n6: " + cssSelector[6] + "\n7: " + cssSelector[7] + "\n8: " + cssSelector[8] + "\n9: " + cssSelector[9] + "\n10: " + cssSelector[10] + "\n11: " + cssSelector[11] + "\n12: " + cssSelector[12]);
						// (:\w+[\w\-]*)(\(((odd|even)|\d+n?((\+|\-)\d+)?)\))?
						// (:\w+[\w\-]*)(\(((odd|even)|\d+n?((\+|\-)\d+)?)\))?
						
						childOrSiblingRef = /^(>|\+|~)$/.exec(rule);
						if (childOrSiblingRef) {
							nextTag = cssSelectors[i+1];
							if (nextTag) {
								nextRegExp = new RegExp("(^|\\s)" + nextTag + "(\\s|$)", "i");
								refSeparator = childOrSiblingRef[0];
									for (var j=0, jl=prevElm.length, children; j<jl; j++) {
									refPrevElm = prevElm[j];
									if (/\+/.test(refSeparator)) {
										nextSib = refPrevElm.nextSibling;
										if (nextSib) {
											while(nextSib && nextSib.nodeType !== 1 && nextSib.nextSibling) {
												nextSib = nextSib.nextSibling;
											}
											if (nextRegExp.test(nextSib.nodeName)) {
												matchingElms.push(nextSib);
											}
										}
									}
									else {
										if (/>/.test(refSeparator)) {
											children = refPrevElm.childNodes;
											refPrevElmFound = true;
										}
										else {
											children = refPrevElm.parentNode.childNodes;
											refPrevElmFound = false;
										}
										for (var k=0, kl=children.length, refChild; k<kl; k++) {
											refChild = children[k];
											if (refChild === refPrevElm) {
												refPrevElmFound = true;
											}
											if (refPrevElmFound && refChild.nodeType === 1 && nextRegExp.test(refChild.nodeName)) {
												matchingElms.push(refChild);
											}
										}
									}	
								}
								i = i + 1;
								prevElm = matchingElms;
							}
						}
						else {
							if (/^(\w+|\*)/.test(rule)) {
								/^(\w+|\*)/.exec(rule);
								matchingElms = prevElm.elmsByTag(RegExp.$1);
							}
							if (/#\w+/.test(rule)) {
								var id = /\w*#(\w[\w\-]+)/.exec(rule)[1];
								rule = rule.replace(/\w*#(\w+[\w\-\_]+)/, "");
								var idElm = DOMAssistant.$(id);
								matchingElms = new HTMLArray();
								if(idElm) {
									matchingElms.push(idElm);
								}
							}
							//var classMatch = /(\w+)?\[(\w+)(\^|\$|\*)?=?([\w\-\_]+)?\]/.exec(rule);
							if ((matchingElms.length === 0 || (matchingElms.length > 0 && matchingElms[0])) && /\./.test(rule)) {
								var classes = rule.split(".");
								if (classes.length > 1) {
									var tagForClass = (classes[0].length > 0)? classes[0] : null;
									var firstClass = classes[1];
									var regExp = new RegExp("(^|\\s)" + firstClass + "(\\s|$)");
									if (matchingElms.length > 0) {
										if (!regExp.test(matchingElms[0].className)) {
											matchingElms = new HTMLArray();
										}
									}
									else {
										matchingElms = prevElm.elmsByClass(firstClass, tagForClass);
									}
									if (matchingElms.length > 0) {
										if (classes.length > 2) {
											var followingMatchingElms = new HTMLArray();
											var match;
											for (var n=2, nl=classes.length, innerRegExp; n<nl; n++) {
												innerRegExp = new RegExp("(^|\\s)" + classes[n] + "(\\s|$)");
												for (var o=0, ol=matchingElms.length, item; o<ol; o++) {
													match = matchingElms[o];
													if (innerRegExp.test(match.className)) {
														followingMatchingElms.push(match);
													}
													else {
														break;
													}
												}
											}
											matchingElms = followingMatchingElms;
										}
									}
								}
							}
							var attributeMatch = /(\w+)?\[(\w+)(\^|\$|\*)?=?([\w\-\_]+)?\]/.exec(rule);
							if (attributeMatch) {
								var attributeSelectors = rule.replace(/(\])(\[)/, "$1 $2").split(" ");
								var preDefElms = (matchingElms.length > 0)? matchingElms : null;
								var matchingAttributeElms;
								for (var p=0, pl=attributeSelectors.length; p<pl; p++) {
									matchingAttributeElms = new HTMLArray();
									attributeMatch = /(\w+)?\[(\w+)(\^|\$|\*)?=?(\w+)?\]/.exec(attributeSelectors[p]);
									var attribute = RegExp.$2;
									var attrVal = (RegExp.$4.length > 0)? RegExp.$4 : "*";
									var tag = (preDefElms)? preDefElms : (RegExp.$1.length > 0)? RegExp.$1 : null;
									var substrMatchSelector = (RegExp.$3.length > 0)? RegExp.$3 : null;
									matchingAttributeElms = prevElm.elmsByAttribute(attribute, attrVal, tag, substrMatchSelector);
									if (matchingAttributeElms.length === 0) {
										break;
									}
									for (var q=0, ql=matchingAttributeElms.length, matchElm; q<ql; q++) {
										matchingElms.push(matchingAttributeElms[q]);
									}
								}
								matchingElms = matchingAttributeElms;
							}
							var pseudoMatch = /:(\w+[\w\-]*)(\(((odd|even)|\d+n?((\+|\-)\d+)?)\))?/.exec(rule);
							if (pseudoMatch && matchingElms.length > 0) {
								var pseudoClass = RegExp.$1;
								var nthSelector = RegExp.$3;
								var previousMatch = matchingElms;
								matchingElms = new HTMLArray();
								//if (/(\bchild\b)|empty/.test(pseudoClass)) {
									for (var r=0, rl=previousMatch.length, previous, switchMatch, firstLastOnly, childrenNodes, childNodes, firstChild, lastChild; r<rl; r++) {
										previous = previousMatch[r];
										if (/enabled|disabled|checked/.test(pseudoClass)) {
											if((/enabled/.test(pseudoClass) && !previous.disabled) || (/disabled/.test(pseudoClass) && previous.disabled) || (/checked/.test(pseudoClass) && previous.checked)){
												matchingElms.push(previous);
											}
											continue;
										}
										firstLastOnly = /(first|last|only)-child/.test(pseudoClass);
										childrenNodes = (firstLastOnly)? previous.parentNode.childNodes : previous.childNodes;
										if (/empty/.test(pseudoClass) && childrenNodes.length === 0) {
											matchingElms.push(previous);
											continue;
										}
										childNodes = [];
										for (var s=0, sl=childrenNodes.length, currentChild; s<sl; s++) {
											currentChild = childrenNodes[s];
											if (currentChild.nodeType === 1) {
												childNodes.push(currentChild);
											}
										}
										if (childNodes.length > 0) {
											if (firstLastOnly) {
												if((/first-child/.test(pseudoClass) && previous === childNodes[0]) || (/last-child/.test(pseudoClass) && previous === childNodes[childNodes.length - 1]) || (/only-child/.test(pseudoClass) && childNodes.length === 1)){
													matchingElms.push(previous);
												}
												continue;
											}
											if (/nth-child/.test(pseudoClass)) {
												if (/^\d+$/.test(nthSelector)) {
													matchingElms.push(childNodes[nthSelector-1]);
												}
												else if (/^(odd|even)|(\d+)n((\+|\-)(\d+))?$/.exec(nthSelector)) {
													var iteratorStart = (RegExp.$1 === "even")? 1 : 0;
													var iteratorAdd = 2;
													var nRepeat = parseInt(RegExp.$2, 10);
													if (nRepeat > 0) {
														iteratorAdd = nRepeat;
														var nOperatorValue = parseInt(RegExp.$4 + RegExp.$5, 10);
														if (nOperatorValue !== 0) {
															iteratorStart = nOperatorValue - 1;
														}
													}
													for (var t=iteratorStart, tl=childNodes.length; t<tl; t=t+iteratorAdd) {
														if (t < 0) {
															continue;
														}
														matchingElms.push(childNodes[t]);
													}
												}
											}
										}
									}
								//}
								prevElm = matchingElms;
							}
							prevElm = matchingElms;
						}
					}
				}
				catch(e) {
					alert(e);
				}
				for (var o=0, ol=prevElm.length; o<ol; o++) {
					elm.push(prevElm[o]);
				}
			}
			//alert(elm);
			return elm;
		},
	
		elmsByClass : function (className, tag) {
			if (document.evaluate) {
				DOMAssistant.elmsByClass = function (className, tag) {
					var returnElms = new HTMLArray();
					var xPathNodes = document.evaluate(".//" + (tag || "*") + "[contains(concat(' ', @class, ' '), ' " + className + " ')]", this, null, 0, null);
					var node = xPathNodes.iterateNext();
					while(node) {
						returnElms.push(node);
						node = xPathNodes.iterateNext();
					}
					return returnElms;
				};
			}
			else {
				DOMAssistant.elmsByClass = function (className, tag) {
					var returnElms = new HTMLArray();
					var elms = this.getElementsByTagName(tag || "*");			
					var regExp = new RegExp("(^|\\s)" + className + "(\\s|$)");
					for (var i=0,elm,il=elms.length; i<il; i++) {
						elm = elms[i];		
						if (regExp.test(elm.className)) {
							returnElms.push(elm);
						}
					}
					return returnElms;
				};
			}
			return DOMAssistant.elmsByClass.call(this, className, tag);
		},
	
		elmsByAttribute : function (attr, attrVal, tag, substrMatchSelector) {
			if (document.evaluate) {
				DOMAssistant.elmsByAttribute = function (attr, attrVal, tag, substrMatchSelector) {
					var returnElms = new HTMLArray();
					var attribute = "@" + attr + ((typeof attrVal === "undefined" || attrVal === "*")? "" : " = '" + attrVal + "'");
					if(typeof substrMatchSelector === "string"){
						switch (substrMatchSelector) {
							case "^":
								attribute = "starts-with(@" + attr + ", '" + attrVal + "')";
								break;
							case "$":
								attribute = "substring(@" + attr + ", (string-length(@" + attr + ") - " + (attrVal.length - 1) + "), 6) = '" + attrVal + "'";
								break;
							case "*":
								attribute = "contains(concat(' ', @" + attr + ", ' '), '" + attrVal + "')";
								break;	
						}
					}
					var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag : "*") + "[" + attribute + "]", this, null, 0, null);
					var node = xPathNodes.iterateNext();
					while(node) {
						returnElms.push(node);
						node = xPathNodes.iterateNext();
					}
					return returnElms;
				};
			}
			else {
				DOMAssistant.elmsByAttribute = function (attr, attrVal, tag, substrMatchSelector) {
					var returnElms = new HTMLArray();
					var attribute = (typeof attrVal === "undefined" || attrVal === "*")? null : ("(^|\\s)" + attrVal + "(\\s|$)");
					if(typeof substrMatchSelector === "string"){
						switch (substrMatchSelector) {
							case "^":
								attribute = ("^" + attrVal);
								break;
							case "$":
								attribute = (attrVal + "$");
								break;
							case "*":
								attribute = (attrVal);
								break;	
						}
					}
					var attributeRegExp = new RegExp(attribute);
					var elms;
					if(tag && typeof tag === "object"){
						elms = (tag.constructor === Array)? tag : [tag];
					}
					else {
						elms = this.getElementsByTagName(tag || "*");
					}
					for (var i=0,il=elms.length,current,currentAttr; i<il; i++) {
				        current = elms[i];
				        currentAttr = current.getAttribute(attr, 2);
				        if (typeof currentAttr === "string" && currentAttr.length > 0) {
				            if (!attributeRegExp || typeof attributeRegExp === "undefined" || (attributeRegExp && attributeRegExp.test(currentAttr))) {
								returnElms.push(current);
				            }
				        }
				    }
					return returnElms;
				};
			}
		    return DOMAssistant.elmsByAttribute.call(this, attr, attrVal, tag, substrMatchSelector);
		},
	
		elmsByTag : function (tag) {
			if (document.evaluate) {
				DOMAssistant.elmsByTag = function (tag) {
					var returnElms = new HTMLArray();
					var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag : "*"), this, null, 0, null);
					var node = xPathNodes.iterateNext();
					while(node) {
						returnElms.push(node);
						node = xPathNodes.iterateNext();
					}
					return returnElms;
				};
			}
			else {			
				var returnElms = new HTMLArray();
				var elmsWithTag = this.getElementsByTagName(tag);
				for (var i=0, il=elmsWithTag.length; i<il; i++) {
					returnElms.push(elmsWithTag[i]);
				}
				return returnElms;
			}
			return DOMAssistant.elmsByTag.call(this, tag);	
		}
	};	
}();
DOMAssistant.init();