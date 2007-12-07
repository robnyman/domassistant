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
				div:nth-child(n5+3)
				input:enabled
				input:disabled
				input:checked
				p, a
			*/
			if (document.evaluate) {
				DOMAssistant.cssSelection = function (cssRule) {
					var cssRules = cssRule.replace(/\s*(,)\s*/, "$1").split(",");
					var elm = new HTMLArray();
					var cssSelectors, xPathExpression, cssSelector, splitRule, xPathExpression, nextTag, followingElm;
					for (var i=0, il=cssRules.length; i<il; i++) {						
						cssSelectors = cssRules[i].split(" ");
						xPathExpression = ".";
						for (var j=0, jl=cssSelectors.length; j<jl; j++) {
							cssSelector = /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|(\[\w+(\^|\$|\*)?=?[\w\-\_]+?\]+))\))?)*)?(>|\+|~)?/.exec(cssSelectors[j]);
							splitRule = {
								tag : (!cssSelector[1] || cssSelector[2] === "*")? "*" : cssSelector[1], // tag name								
								id : (cssSelector[2] !== "*")?  cssSelector[2] : null, // id
								allClasses : cssSelector[3], // All classes, preceded by a .
								allAttr : cssSelector[5], // All attributes, with [ ]
								pseudoClass : cssSelector[10], // Pseudo-class
								pseudoValue : cssSelector[12], // Pseudo-class parentheses first value (digit, odd or even)
								tagRelation : cssSelector[17] // If the following tag should be a direct child, direct or general sibling (>, +, or ~)
							};
							values = "";
							for (var b=0; b<cssSelector.length; b++) {
								values += b + ": " + cssSelector[b] + "\n";
							}
							//alert(values);
							if (splitRule.tagRelation) {
								switch (splitRule.tagRelation) {
									case ">":
										xPathExpression += "/child::";
										break;
									case "+":
										xPathExpression += "/following-sibling::*[1]/self::";
										break;
									case "~":
										xPathExpression += "/following-sibling::";
										break;
								}
							}
							else {
								xPathExpression += (j > 0 && /(>|\+|~)/.test(cssSelectors[j-1]))? splitRule.tag : ("//" + splitRule.tag);
							}
							//xPathExpression += splitRule.tag;
							if (splitRule.id) {
								xPathExpression += "[@id = '" + splitRule.id.replace(/^#/, "") + "']";
							}
							if (splitRule.allClasses) {
								xPathExpression += splitRule.allClasses.replace(/\.([\w\-_]+)/g, "[contains(concat(' ', @class, ' '), ' $1 ')]");
							}
							if (splitRule.allAttr) {
								xPathExpression += splitRule.allAttr.replace(/(\w+)(\^|\$|\*)?=?([\w\-_]+)?/g, function (match, p1, p2, p3, p4) {
									var regExpReturn = match;
									switch (p2) {
										case "^":
											regExpReturn = "starts-with(@" + p1 + ", '" + p3 + "')";
											break;
										case "$":
											regExpReturn = "substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), 6) = '" + p3 + "'";
											break;
										case "*":
											regExpReturn = "contains(concat(' ', @" + p1 + ", ' '), '" + p3 + "')";
											break;
										default :
											regExpReturn = "@" + p1 + ((p3)? "='" + p3 + "'" : "");
									}
									return regExpReturn;
								});
							}
							if (splitRule.pseudoClass) {
								var pseudoValue = splitRule.pseudoValue;
								switch (splitRule.pseudoClass.replace(/^:/, "")) {
									case "first-child":
										xPathExpression += "[position() = 1]";
										break;
									case "last-child":
										xPathExpression += "[position() = last()]";
										break;
									case "only-child":
										xPathExpression += "[count(preceding-sibling::*) = 0 and position() = last()]";
										break;
									case "empty":
										xPathExpression += "[count(child::*) = 0 and string-length(text()) = 0]";
										break;
									case "enabled":
										xPathExpression += "[not(@disabled)]";
										break;
									case "disabled":
										xPathExpression += "[@disabled]";
										break;
									case "checked":
										xPathExpression += "[@checked='checked']"; // Doesn't work in Opera 9.24
										break;
									case "nth-child":
										var pseudoSelection = "/child::*[position()";
										if (/^\d+$/.test(pseudoValue)) {
											pseudoSelection += " = " + pseudoValue;
										}
										else if (/^odd|even$/.test(pseudoValue)) {
											pseudoSelection += " mod 2 = " + ((pseudoValue === "odd")? 1 : 0);
										}
										else{
											var pseudoSelector = /^(\d+)n((\+|\-)(\d+))?$/.exec(pseudoValue);
											var nthSelector = parseInt(pseudoSelector[1], 10);
											var nOperatorVal = 0;
											if(pseudoSelector[3] && pseudoSelector[4]) {
												nOperatorVal = parseInt((pseudoSelector[3] + pseudoSelector[4]), 10);
												if (nOperatorVal < 0) {
													nOperatorVal = nthSelector + nOperatorVal;
												}
												pseudoSelection += " = " + nOperatorVal + " or ";
											}
											if (nthSelector < nOperatorVal) {
												var nOperatorDiff = ((nOperatorVal - nthSelector) % 2 === 0)? 0 : 1;
												pseudoSelection += ((pseudoSelector[3])? " position()" : "") + " mod " + nthSelector + " = " + nOperatorDiff + " and position() > " + nOperatorVal;
											}
											else if (nOperatorVal === nthSelector) {
												pseudoSelection += ((pseudoSelector[3])? " position()" : "") + " mod " + nthSelector + " = 0";
											}
											else {
												alert("else");
												pseudoSelection += ((pseudoSelector[3])? " position()" : "") + " mod " + nthSelector + " = " + nOperatorVal;
											}
										}
										pseudoSelection += "]";
										xPathExpression += pseudoSelection;
										break;	
								}
							}	
						}
						alert("xPathExpression: " + xPathExpression);
						var xPathNodes = document.evaluate(xPathExpression, document, null, 0, null);
						var node = xPathNodes.iterateNext();
						while(node) {
							elm.push(node);
							node = xPathNodes.iterateNext();
						}
					}
					return elm;
				};
			}
			else {				
				DOMAssistant.cssSelection = function (cssRule) {
					var cssRules = cssRule.replace(/\s*(,)\s*/, "$1").split(",");
					var elm = new HTMLArray();
					var cssSelectors, prevElm, matchingElms, childOrSiblingRef, nextTag, nextRegExp, refSeparator, refPrevElm, nextSib, refPrevElmFound;
					for (var a=0, al=cssRules.length; a<al; a++) {
						cssSelectors = cssRules[a].split(" ");
						prevElm = new HTMLArray();
						prevElm.push(DOMAssistant.$(document));
						for (var i=0, il=cssSelectors.length; i<il; i++) {
							matchingElms = new HTMLArray();
							var rule = cssSelectors[i];
							childOrSiblingRef = /^(>|\+|~)$/.exec(rule);
							if (childOrSiblingRef) {
								nextTag = cssSelectors[i+1];
								if (nextTag) {
									nextRegExp = new RegExp("(^|\\s)" + /^\w+/.exec(nextTag) + "(\\s|$)", "i");
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
									//i = i + 1;
									prevElm = matchingElms;
								}
							}
							else {
								var cssSelector = /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|(\[\w+(\^|\$|\*)?=?[\w\-\_]+?\]+))\))?)*)?/.exec(rule);
								var splitRule = {
									tag : (!cssSelector[1] || cssSelector[2] === "*")? "*" : cssSelector[1], // tag name								
									id : (cssSelector[2] !== "*")?  cssSelector[2] : null, // id
									allClasses : cssSelector[3], // All classes, preceded by a .
									allAttr : cssSelector[5], // All attributes, with [ ]
									pseudoClass : cssSelector[10], // Pseudo-class
									pseudoValue : cssSelector[12] // Pseudo-class parentheses first value (digit, odd or even)
								};
					
								var values = "";
								for (var b=0; b<cssSelector.length; b++) {
									values += b + ": " + cssSelector[b] + "\n";
								}
								//alert(values);
								if (i > 0 && /(>|\+|~)/.test(cssSelectors[i - 1])) {
									//alert("prev");
									matchingElms = prevElm;
									//alert(matchingElms[4].innerHTML);
								}
								else if (splitRule.tag && !splitRule.id) {
									matchingElms = prevElm.elmsByTag(splitRule.tag);
								}
								if (splitRule.id) {
									var idElm = DOMAssistant.$(splitRule.id.replace(/^#/, ""));
									matchingElms = new HTMLArray();
									if(idElm) {
										matchingElms.push(idElm);
									}
								}
								if (splitRule.allClasses) {
									splitRule.allClasses = splitRule.allClasses.replace(/^\./, "").split(".");
									var classTag = (matchingElms.length > 0)? matchingElms : null;
									matchingElms = new HTMLArray();
									for (var n=0, nl=splitRule.allClasses.length, innerRegExp; n<nl; n++) {
										matchingElms = prevElm.elmsByClass(splitRule.allClasses[n], classTag);
										if (matchingElms.length === 0) {
											break;
										}
									}
								}
								if (splitRule.allAttr) {
									splitRule.allAttr = splitRule.allAttr.replace(/(\])(\[)/, "$1 $2").split(" ");
									var attrElms = (matchingElms.length > 0)? matchingElms : null;
									matchingElms = new HTMLArray();
									var matchingAttributeElms;
									for (var p=0, pl=splitRule.allAttr.length, attributeMatch; p<pl; p++) {
										matchingAttributeElms = new HTMLArray();
										attributeMatch = /(\w+)(\^|\$|\*)?=?([\w\-_]+)?/.exec(splitRule.allAttr[p]);
										var attribute = attributeMatch[1];
										var attrVal = attributeMatch[3] || "*";
										var tag = (attrElms)? attrElms : null;
										var substrMatchSelector = attributeMatch[2] || null;
										//alert(attribute + "\n" + attrVal + "\n" + tag + "\n" + substrMatchSelector);
										matchingAttributeElms = prevElm.elmsByAttribute(attribute, attrVal, tag, substrMatchSelector);
										if (matchingAttributeElms.length === 0) {
											break;
										}
									}
									matchingElms = matchingAttributeElms;
								}
								if (splitRule.pseudoClass) {
									var pseudoClass = splitRule.pseudoClass;
									var pseudoValue = splitRule.pseudoValue;
									var previousMatch = matchingElms;
									matchingElms = new HTMLArray();
									if (/^not$/.test(pseudoClass)) {
						
									}
									else {
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
													var pseudoSelector = /^(odd|even)|(\d+)n((\+|\-)(\d+))?$/.exec(pseudoValue);
													if (/^\d+$/.test(pseudoValue)) {
														matchingElms.push(childNodes[pseudoValue-1]);
													}
													else if(pseudoSelector) {
														var iteratorStart = (pseudoSelector[1] === "even")? 1 : 0;
														var iteratorAdd = 2;
														var nRepeat = parseInt(pseudoSelector[2], 10);
														if (nRepeat > 0) {
															iteratorAdd = nRepeat;
															var nOperatorVal = parseInt((pseudoSelector[4] + pseudoSelector[5]), 10);
															if (nOperatorVal !== 0) {
																iteratorStart = nOperatorVal - 1;
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
									}
									prevElm = matchingElms;
								}
							}
							prevElm = matchingElms;
						}
						for (var u=0, ul=prevElm.length; u<ul; u++) {
							elm.push(prevElm[u]);
						}
						alert(elm);
					}
					return elm;
				};		
			}
			return DOMAssistant.cssSelection.call(this, cssRule); 
		},
	
		elmsByClass : function (className, tag) {
			if (document.evaluate) {
				DOMAssistant.elmsByClass = function (className, tag) {
					var returnElms = new HTMLArray();
					var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag : "*") + "[contains(concat(' ', @class, ' '), ' " + className + " ')]", this, null, 0, null);
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
					var elms;
					if(tag && typeof tag === "object"){
						elms = (tag.constructor === Array)? tag : [tag];
					}
					else {
						elms = this.getElementsByTagName(tag || "*");
					}
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
					var attribute = (typeof attrVal === "undefined")? null : ("(^|\\s)" + attrVal + "(\\s|$)");
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