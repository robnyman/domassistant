// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
var DOMAssistant = function () {
	var methodsToAdd = [];
	var baseMethodsToAdd = [
		"elmsByClass",
		"elmsByAttribute",
		"elmsByTag",
		"each"
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
		},
		each : function (functionCall) {
			for (var i=0, il=this.length; i<il; i++) {
				functionCall.call(this[i]);
			}
			return this;
		}
	};
	var isOpera = /Opera/i.test(navigator.userAgent); // Hopefully temporary till Opera fixes the XPath implementation
	
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
			if (document.evaluate && !isOpera) {
				DOMAssistant.cssSelection = function (cssRule) {
					var cssRules = cssRule.replace(/\s*(,)\s*/, "$1").split(",");
					var elm = new HTMLArray();
					var cssSelectors, xPathExpression, cssSelector, splitRule, nextTag, followingElm;
					for (var i=0, il=cssRules.length; i<il; i++) {						
						cssSelectors = cssRules[i].split(" ");
						xPathExpression = ".";
						for (var j=0, jl=cssSelectors.length; j<jl; j++) {
							cssSelector = /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[\w+(\^|\$|\*)?=?[\w\-\_]+?\]+))\))?)*)?(>|\+|~)?/.exec(cssSelectors[j]);
							splitRule = {
								tag : (!cssSelector[1] || cssSelector[2] === "*")? "*" : cssSelector[1],
								id : (cssSelector[2] !== "*")?  cssSelector[2] : null,
								allClasses : cssSelector[3],
								allAttr : cssSelector[5],
								pseudoClass : cssSelector[10],
								pseudoValue : cssSelector[12],
								tagRelation : cssSelector[19]
							};
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
										xPathExpression += "[1 and not(preceding-sibling::*)]";
										break;
									case "first-of-type":
										xPathExpression += "[1]";
										break;
									case "last-child":
										xPathExpression += "[last() and not(following-sibling::*)]";
										break;
									case "last-of-type":
										xPathExpression += "[last()]";
										break;
									case "only-child":
										xPathExpression += "[1 and not(preceding-sibling::*) and not(following-sibling::*)]";
										break;
									case "only-of-type":
										xPathExpression += "[count(preceding-sibling::" + splitRule.tag + ") = 0 and position() = last()]";
										break;		
									case "nth-of-type":
										xPathExpression += "[" + pseudoValue + "]";
										break;
									case "nth-last-of-type":
										xPathExpression += "[last() - " + pseudoValue + "]";
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
											if (pseudoSelector[3] && pseudoSelector[4]) {
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
												pseudoSelection += ((pseudoSelector[3])? " position()" : "") + " mod " + nthSelector + " = " + nOperatorVal;
											}
										}
										pseudoSelection += "]";
										xPathExpression += pseudoSelection;
										break;	
									case "not":
										var notSelector = pseudoValue.replace(/^(\w+)/, "self::$1");
										notSelector = notSelector.replace(/\.([\w\-_]+)/g, "contains(concat(' ', @class, ' '), ' $1 ')");
										notSelector = notSelector.replace(/\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/g, function (match, p1, p2, p3, p4) {
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
										xPathExpression += "[not(" + notSelector + ")]";
										break;
								}
							}	
						}
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
					var prevElm = new HTMLArray();
					var matchingElms = new HTMLArray();
					var cssSelectors, childOrSiblingRef, nextTag, nextRegExp, refSeparator, refPrevElm, nextSib, refPrevElmFound;
					function addToMatchingElms (item) {
						var exists = false;
						for (var b=0, bl=matchingElms.length; b<bl; b++) {
							if (matchingElms[b] === item) {
								exists = true;
								break;
							}
						}
						if (!exists) {
							matchingElms.push(item);
						}
					}
					function addToPrevElm (item) {
						var exists = false;
						for (var b=0, bl=prevElm.length; b<bl; b++) {
							if (prevElm[b] === item) {
								exists = true;
								break;
							}
						}
						if (!exists) {
							prevElm.push(item);
						}
					}
					function emptyMatchingElms () {
						for (var c=(matchingElms.length-1); c>=0; c--) {
							matchingElms[c] = null;
						}
						matchingElms = new HTMLArray();
					}
					function emptyPrevElm () {
						for (var c=(prevElm.length-1); c>=0; c--) {
							prevElm[c] = null;
						}
						prevElm = new HTMLArray();
					}
					function emptyPrevElmAndAddMatching () {
						if (prevElm !== matchingElms) {
							emptyPrevElm();
							for (var d=0, dl=matchingElms.length; d<dl; d++) {
								addToPrevElm(matchingElms[d]);
							}
							emptyMatchingElms();
						}
					}
					for (var a=0, al=cssRules.length; a<al; a++) {
						cssSelectors = cssRules[a].split(" ");
						emptyPrevElm();
						prevElm.push(DOMAssistant.$(document));
						for (var i=0, il=cssSelectors.length; i<il; i++) {
							var rule = cssSelectors[i];
							childOrSiblingRef = /^(>|\+|~)$/.exec(rule);
							if (childOrSiblingRef) {
								nextTag = /^\w+/.exec(cssSelectors[i+1]);
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
													addToMatchingElms(nextSib);
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
													continue;
												}
												if (refPrevElmFound && refChild.nodeType === 1 && nextRegExp.test(refChild.nodeName)) {
													addToMatchingElms(refChild);
												}
											}
										}	
									}
									emptyPrevElmAndAddMatching();
								}
							}
							else {
								var cssSelector = /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[\w+(\^|\$|\*)?=?[\w\-\_]+?\]+))\))?)*)?/.exec(rule);
								var splitRule = {
									tag : (!cssSelector[1] || cssSelector[2] === "*")? "*" : cssSelector[1],
									id : (cssSelector[2] !== "*")?  cssSelector[2] : null,
									allClasses : cssSelector[3],
									allAttr : cssSelector[5],
									pseudoClass : cssSelector[10],
									pseudoValue : cssSelector[12]
								};
								var values = "";
								if (i > 0 && /(>|\+|~)/.test(cssSelectors[i - 1])) {
									emptyMatchingElms();
									matchingElms = prevElm;
								}
								else if (splitRule.tag && !splitRule.id) {
									emptyMatchingElms();
									matchingElms = prevElm.elmsByTag(splitRule.tag);
								}
								if (splitRule.id) {
									var idElm = DOMAssistant.$(splitRule.id.replace(/^#/, ""));
									emptyMatchingElms();
									if (idElm) {
										addToMatchingElms(idElm);
									}
								}
								if (splitRule.allClasses) {
									splitRule.allClasses = splitRule.allClasses.replace(/^\./, "").split(".");
									var classTag = (matchingElms.length > 0)? matchingElms : null;
									for (var n=0, nl=splitRule.allClasses.length, matchingClassElms; n<nl; n++) {
										matchingClassElms = prevElm.elmsByClass(splitRule.allClasses[n], classTag);
										if (matchingClassElms.length === 0) {
											break;
										}
									}
									emptyMatchingElms();
									matchingElms = matchingClassElms;									
								}
								if (splitRule.allAttr) {
									splitRule.allAttr = splitRule.allAttr.replace(/(\])(\[)/, "$1 $2").split(" ");
									var attrElms = (matchingElms.length > 0)? matchingElms : null;
									for (var p=0, pl=splitRule.allAttr.length, matchingAttributeElms, attributeMatch, attribute, attrVal, tag, substrMatchSelector; p<pl; p++) {
										matchingAttributeElms = new HTMLArray();
										attributeMatch = /(\w+)(\^|\$|\*)?=?([\w\-_]+)?/.exec(splitRule.allAttr[p]);
										attribute = attributeMatch[1];
										attrVal = attributeMatch[3] || "*";
										tag = (attrElms)? attrElms : null;
										substrMatchSelector = attributeMatch[2] || null;
										matchingAttributeElms = prevElm.elmsByAttribute(attribute, attrVal, tag, substrMatchSelector);
										if (matchingAttributeElms.length === 0) {
											break;
										}
									}
									emptyMatchingElms();
									matchingElms = matchingAttributeElms;
								}
								if (splitRule.pseudoClass) {
									var pseudoClass = splitRule.pseudoClass;
									var pseudoValue = splitRule.pseudoValue;
									var previousMatch = matchingElms;
									matchingElms = new HTMLArray();
									if (/^:not$/.test(pseudoClass)) {
										var notTag = /^(\w+)/.exec(pseudoValue);
										var notClass = /\.([\w\-_]+)/.exec(pseudoValue);
										var notAttr = /\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/.exec(pseudoValue);
										var notRegExp = new RegExp("(^|\\s)" + ((notTag)? notTag[1] : (notClass)? notClass[1] : "") + "(\\s|$)", "i");
										if (notAttr) {
											var notMatchingAttr = ("(^|\\s)" + notAttr[1] + "(\\s|$)");
											var notMatchingAttrVal = notAttr[3];
											var substrNoMatchSelector = notAttr[2];
											if (typeof substrNoMatchSelector === "string") {
												switch (substrNoMatchSelector) {
													case "^":
														notMatchingAttr = ("^" + notMatchingAttrVal);
														break;
													case "$":
														notMatchingAttr = (notMatchingAttrVal + "$");
														break;
													case "*":
														notMatchingAttr = (notMatchingAttrVal);
														break;	
												}
											}
											notRegExp = new RegExp(notMatchingAttr, "i");
										}
										for (var r=0, rl=previousMatch.length, notElm, addElm; r<rl; r++) {
											notElm = previousMatch[r];
											addElm = null;
											if (notTag && !notRegExp.test(notElm.nodeName)) {
												addElm = notElm;
											}		
											else if (notClass && !notRegExp.test(notElm.className)) {
												addElm = notElm;
											}
											else if (notAttr) {
												if (!notElm.getAttribute(notAttr[1]) || !notRegExp.test(notElm.getAttribute(notAttr[1]))) {
													addElm = notElm;
												}
											}
											if (addElm) {
												addToMatchingElms(addElm);
											}
										}
									}
									else {
										for (var s=0, sl=previousMatch.length, previous, switchMatch, firstLastOnly, nthOfType, childrenNodes, childNodes, elmType, nthPos; s<sl; s++) {
											previous = previousMatch[s];
											if (/enabled|disabled|checked/.test(pseudoClass)) {
												if ((/enabled/.test(pseudoClass) && !previous.disabled) || (/disabled/.test(pseudoClass) && previous.disabled) || (/checked/.test(pseudoClass) && previous.checked)) {
													addToMatchingElms(previous);
												}
												continue;
											}
											firstLastOnly = /:(first|last|only)-(child|of-type)/.test(pseudoClass);
											nthOfType = /nth-(last-)?of-type/.test(pseudoClass);
											childrenNodes = (firstLastOnly || nthOfType)? previous.parentNode.childNodes : previous.childNodes;
											if (/empty/.test(pseudoClass) && childrenNodes.length === 0) {
												addToMatchingElms(previous);
												continue;
											}
											childNodes = [];
											elmType = new RegExp((("of-type")? ("(^|\\s)" + splitRule.tag + "(\\s|$)") : "."), "i");
											for (var t=0, tl=childrenNodes.length, currentChild; t<tl; t++) {
												currentChild = childrenNodes[t];
												if (currentChild.nodeType === 1 && elmType.test(currentChild.nodeName)) {
													childNodes.push(currentChild);
												}
											}
											if (childNodes.length > 0) {
												if (firstLastOnly) {
													if ((/first-(child|of-type)/.test(pseudoClass) && previous === childNodes[0]) || (/last-(child|of-type)/.test(pseudoClass) && previous === childNodes[childNodes.length - 1]) || (/only-(child|of-type)/.test(pseudoClass) && childNodes.length === 1)) {
														var isRightElm = true;
														if (/(first|last|only)-child/.test(pseudoClass)) {
															var childNode = (/first/.test(pseudoClass))? childNodes[0] : childNodes[childNodes.length - 1];
															var sibling;
															if (/first/.test(pseudoClass)) {
																sibling = childNode.previousSibling;
																while (sibling) {
																	if (sibling.nodeType === 1) {
																		isRightElm = false;
																		break;
																	}
																	sibling = sibling.previousSibling;
																}
															}
															else if (/last/.test(pseudoClass)) {
																sibling = childNode.nextSibling;
																while (sibling) {
																	if (sibling.nodeType === 1) {
																		isRightElm = false;
																		break;
																	}
																	sibling = sibling.nextSibling;
																}
															}
															else {
																sibling = childNode.previousSibling;
																while (sibling) {
																	if (sibling.nodeType === 1) {
																		isRightElm = false;
																		break;
																	}
																	sibling = sibling.previousSibling;
																}
																if (isRightElm) {
																	sibling = childNode.nextSibling;
																	while (sibling) {
																		if (sibling.nodeType === 1) {
																			isRightElm = false;
																			break;
																		}
																		sibling = sibling.nextSibling;
																	}
																}
															}
														}
														if (isRightElm) {
															addToMatchingElms(previous);
														}
													}
													continue;
												}
												if (nthOfType) {
													nthPos = (/last/i.test(pseudoClass))? ((childNodes.length-1) - pseudoValue) : (pseudoValue - 1);
													if (childNodes[nthPos]) {
														addToMatchingElms(childNodes[nthPos]);
													}
												}
												if (/nth-child/.test(pseudoClass)) {
													var pseudoSelector = /^(odd|even)|(\d+)n((\+|\-)(\d+))?$/.exec(pseudoValue);
													if (/^\d+$/.test(pseudoValue)) {
														addToMatchingElms(childNodes[pseudoValue-1]);
													}
													else if (pseudoSelector) {
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
														for (var u=iteratorStart, ul=childNodes.length; u<ul; u=u+iteratorAdd) {
															if (u < 0) {
																continue;
															}
															addToMatchingElms(childNodes[u]);
														}
													}
												}
											}
										}
									}
								}
								emptyPrevElmAndAddMatching();
							}
						}
						for (var v=0, vl=prevElm.length; v<vl; v++) {
							elm.push(prevElm[v]);
						}
					}
					return elm;
				};		
			}
			return DOMAssistant.cssSelection.call(this, cssRule); 
		},
	
		elmsByClass : function (className, tag) {
			if (document.evaluate && !isOpera) {
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
					if (tag && typeof tag === "object") {
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
			if (document.evaluate && !isOpera) {
				DOMAssistant.elmsByAttribute = function (attr, attrVal, tag, substrMatchSelector) {
					var returnElms = new HTMLArray();
					var attribute = "@" + attr + ((typeof attrVal === "undefined" || attrVal === "*")? "" : " = '" + attrVal + "'");
					if (typeof substrMatchSelector === "string") {
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
					if (typeof substrMatchSelector === "string") {
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
					if (tag && typeof tag === "object") {
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
			if (document.evaluate && !isOpera) {
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
				DOMAssistant.elmsByTag = function (tag) {
					var returnElms = new HTMLArray();
					var elmsWithTag = this.getElementsByTagName(tag);
					for (var i=0, il=elmsWithTag.length; i<il; i++) {
						returnElms.push(elmsWithTag[i]);
					}
					return returnElms;
				};
			}
			return DOMAssistant.elmsByTag.call(this, tag);
		},
		
		each : function (functionCall) {
			functionCall.call(this);
			return this;
		}
	};	
}();
DOMAssistant.init();
DOMAssistant.AJAX = function () {
	var baseMethodsToAdd = [
		"get",
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
			if (DOMAssistant.AJAX.initRequest()) {
				callbackFunction = callBack;
				getElm = this;
				// This line needed to properly control the onreadystatechange event for Firefox
				XMLHttp.onreadystatechange = function () {};
				XMLHttp.abort();
				XMLHttp.open("GET", url, true);
				XMLHttp.setRequestHeader("AJAX", "true");
				XMLHttp.onreadystatechange = DOMAssistant.AJAX.contentReady;
				XMLHttp.send(null);
			}
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
DOMAssistant.CSS = function () {
	var baseMethodsToAdd = [
		"addClass",
		"removeClass",
		"hasClass",
		"getStyle"
	];
	var HTMLArrayCSSMethods = {
		addClass : function (className) {
			for (var i=0, il=this.length; i<il; i++) {
				this.CSS.addClass.call(this[i], className);
			}
			return this;
		},
		removeClass : function (className) {
			for (var i=0, il=this.length; i<il; i++) {
				this.CSS.removeClass.call(this[i], className);
			}
			return this;
		},
		hasClass : function (className) {
			var hasClass = [];
			for (var i=0, il=this.length; i<il; i++) {
				hasClass.push(this.CSS.hasClass.call(this[i], className));
			}
			return hasClass;
		},
		getStyle : function (cssRule) {
			var hasStyle = [];
			for (var i=0, il=this.length; i<il; i++) {
				hasStyle.push(this.CSS.getStyle.call(this[i], cssRule));
			}
			return hasStyle;
		}
	};
	return {
		init : function () {
			DOMAssistant.addHTMLArrayPrototype("CSS", this);
			for (var i=0, il=baseMethodsToAdd.length, current; i<il; i++) {
				current = baseMethodsToAdd[i];
				DOMAssistant.addMethod([current, this[current]]);
				DOMAssistant.addHTMLArrayPrototype(current, HTMLArrayCSSMethods[current]);
			}
		},

		addClass : function (className) {
			var currentClass = this.className;
			if (!new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i").test(currentClass)) {
				this.className = currentClass + ((currentClass.length > 0)? " " : "") + className;
			}
			return this;
		},

		removeClass : function (className) {
			var classToRemove = new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i");
			this.className = this.className.replace(classToRemove, function (match) {
				var retVal = "";
				if (new RegExp("^\\s+.*\\s+$").test(match)) {
					retVal = match.replace(/(\s+).+/, "$1");
				}
				return retVal;
			}).replace(/^\s+|\s+$/g, "");
			return this;
		},

		hasClass : function (className) {
			return new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i").test(this.className);
		},

		getStyle : function (cssRule) {
			var cssVal = "";
			if (document.defaultView && document.defaultView.getComputedStyle) {
				cssVal = document.defaultView.getComputedStyle(this, "").getPropertyValue(cssRule);
			}
			else if (this.currentStyle) {
				cssVal = cssRule.replace(/\-(\w)/g, function (match, p1) {
					return p1.toUpperCase();
				});
				cssVal = this.currentStyle[cssVal];
			}
			return cssVal;
		}
	};
}();
DOMAssistant.CSS.init();
DOMAssistant.Content = function () {
	var baseMethodsToAdd = [
		"prev",
		"next",
		"create",
		"setAttributes",
		"addContent",
		"replaceContent",
		"remove"
	];
	var createHTMLArray = DOMAssistant.createHTMLArray;
	var HTMLArrayContentMethods = {
		prev : function () {
			var previousElms = createHTMLArray();
			var elm;
			for (var i=0, il=this.length; i<il; i++) {
				elm = this.Content.prev.call(this[i]);
				if (elm) {
					previousElms.push(elm);
				}
			}
			return previousElms;
		},
		next : function () {
			var nextElms = createHTMLArray();
			var elm;
			for (var i=0, il=this.length; i<il; i++) {
				elm = this.Content.next.call(this[i]);
				if (elm) {
					nextElms.push(elm);
				}
			}
			return nextElms;
		},
		create : function (name, attr, append, content) {
			var newElms = createHTMLArray();
			var elm;
			for (var i=0, il=this.length; i<il; i++) {
				elm = this.Content.create.call(this[i], name, attr, append, content);
				if (elm) {
					newElms.push(elm);
				}
			}
			return newElms;
		},
		setAttributes : function (attr) {
			for (var i=0, il=this.length; i<il; i++) {
				this.Content.setAttributes.call(this[i], attr);
			}
			return this;
		},
		addContent : function (content) {
			for (var i=0, il=this.length; i<il; i++) {
				this.Content.addContent.call(this[i], content);
			}
			return this;
		},
		replaceContent : function (newContent) {
			for (var i=0, il=this.length; i<il; i++) {
				this.Content.replaceContent.call(this[i], newContent);
			}
			return this;
		},
		remove : function () {
			for (var i=0, il=this.length; i<il; i++) {
				this.Content.remove.call(this[i]);
			}
			return this;
		}
	};
	return {
		init : function () {
			DOMAssistant.addHTMLArrayPrototype("Content", this);
			for (var i=0, il=baseMethodsToAdd.length, current; i<il; i++) {
				current = baseMethodsToAdd[i];
				DOMAssistant.addMethod([current, this[current]]);
				DOMAssistant.addHTMLArrayPrototype(current, HTMLArrayContentMethods[current]);
			}
		},

		prev : function () {
			var prevSib = this.previousSibling;
			while(prevSib && prevSib.nodeType !== 1) {
				prevSib = prevSib.previousSibling;
			}
			return prevSib;
		},

		next : function () {
			var nextSib = this.nextSibling;
			while(nextSib && nextSib.nodeType !== 1) {
				nextSib = nextSib.nextSibling;
			}
			return nextSib;
		},

		create : function (name, attr, append, content) {
			var elm = DOMAssistant.$(document.createElement(name));
			if (attr) {
				elm.setAttributes(attr);
			}
			if (typeof content !== "undefined") {
				elm.addContent(content);
			}
			if (append) {
				DOMAssistant.Content.addContent.call(this, elm);
			}
			return elm;
		},

		setAttributes : function (attr) {	
			for (var i in attr) {
				if (/class/i.test(i)) {
					this.className = attr[i];
				}
				else{
					this.setAttribute(i, attr[i]);
				}	
			}
			return this;
		},

		addContent : function (content) {
			var retVal = null;
			if (typeof content === "string") {
				retVal = this.innerHTML += content;
			}
			else{		
				retVal = this.appendChild(content);
			}
			return this;
		},

		replaceContent : function (newContent) {
			for (var i=(this.childNodes.length - 1), child, attr; i>=0; i--) {
				child = this.childNodes[i];
				attr = child.attributes;
				if (attr) {
					for (var j=0, jl=attr.length; j<jl; j++) {
						if (typeof child[attr[j].name] === "function") {
							child[attr[j].name] = null;
						}
					}
				}
		    	child.parentNode.removeChild(child);
		    }
			this.addContent(newContent);
			return this;
		},

		remove : function () {
			this.parentNode.removeChild(this);
			return null;
		}
	};
}();
DOMAssistant.Content.init();
DOMAssistant.Events = function () {
	var baseMethodsToAdd = [
		"addEvent",
		"removeEvent"
	];
	var HTMLArrayEventMethods = {
		addEvent : function (evt, func) {
			for (var i=0, il=this.length; i<il; i++) {
				this.Events.addEvent.call(this[i], evt, func);
			}
			return this;
		},
		removeEvent : function (evt, func) {
			for (var i=0, il=this.length; i<il; i++) {
				this.Events.removeEvent.call(this[i], evt, func);
			}
			return this;
		}
	};
	return {
		init : function () {
			DOMAssistant.addHTMLArrayPrototype("Events", this);
			DOMAssistant.preventDefault = this.preventDefault;
			DOMAssistant.cancelBubble = this.cancelBubble;
			for (var i=0, il=baseMethodsToAdd.length, current; i<il; i++) {
				current = baseMethodsToAdd[i];
				DOMAssistant.addMethod([current, this[current]]);
				DOMAssistant.addHTMLArrayPrototype(current, HTMLArrayEventMethods[current]);
			}
		},

		addEvent : function (evt, func) {
			if (this.addEventListener) {
				DOMAssistant.Events.addEvent = function (evt, func) {
					this.addEventListener(evt, func, false);
					return this;
				};
			}
			else{
				DOMAssistant.Events.addEvent = function (evt, func) {
					if (!this.events) {
						this.events = {};
					}
					if (!this.events[evt]) {
						this.events[evt] = [];
					}							
					this.events[evt].push(func);
					this["on" + evt] = DOMAssistant.Events.handleEvent;
					if (typeof this.window === "object") {
						this.window["on" + evt] = DOMAssistant.Events.handleEvent;
					}
					return this;
				};
			}
			return DOMAssistant.Events.addEvent.call(this, evt, func);
		},

		handleEvent : function (evt) {
			var currentEvt = evt || event;
			var eventType = currentEvt.type;
			var eventColl = this.events[eventType];
			for (var i=0; i<eventColl.length; i++) {
				eventColl[i].call(this, currentEvt);
			}
		},

		removeEvent : function (evt, func) {
			if (this.removeEventListener) {
				DOMAssistant.Events.removeEvent = function (evt, func) {
					this.removeEventListener(evt, func, false);
					return this;
				};
			}
			else if (this.events) {
				DOMAssistant.Events.removeEvent = function (evt, func) {
					var eventColl = this.events[evt];
					for (var i=0; i<eventColl.length; i++) {
						if (eventColl[i] === func) {
							delete eventColl[i];
							eventColl.splice(i, 1);
						}
					}
					return this;
				};
			}
			return DOMAssistant.Events.removeEvent.call(this, evt, func);
		},

		preventDefault : function (evt) {
			if (evt && evt.preventDefault) {
				DOMAssistant.Events.preventDefault = function (evt) {
					evt.preventDefault();
				};
			}
			else{
				DOMAssistant.Events.preventDefault = function (evt) {
					event.returnValue = false;
				};
			}
			return DOMAssistant.Events.preventDefault(evt);
		},

		cancelBubble : function (evt) {
			if (evt && evt.stopPropagation) {
				DOMAssistant.Events.cancelBubble = function (evt) {
					evt.stopPropagation();
				};
			}
			else{
				DOMAssistant.Events.cancelBubble = function (evt) {
					event.cancelBubble = true;
				};
			}
			return DOMAssistant.Events.cancelBubble(evt);
		}
	};
}();
DOMAssistant.Events.init();
DOMAssistant.DOMLoad = function () {
	var DOMLoaded = false;
	var DOMLoadTimer = null;
	var functionsToCall = [];
	var execFunctions = function () {
		if (DOMLoaded) {
			clearInterval(DOMLoadTimer);
		}
		for (var i=0, il=functionsToCall.length; i<il; i++) {
			try{
				functionsToCall[i]();
			}
			catch(e) {
				// Optional: handle error here
			}
		}
	};
	var DOMHasLoaded = function () {
		if (DOMLoaded) {
			return;
		}
		DOMLoaded = true;
		execFunctions();
	};
	/* Internet Explorer */
	/*@cc_on @*/
	/*@if (@_win32)
		if (document.getElementById) {
			document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
		    document.getElementById("ieScriptLoad").onreadystatechange = function() {
		        if (this.readyState === "complete") {
		            DOMHasLoaded();
		        }
		    };
		}
	/*@end @*/
	/* Mozilla/Opera 9 */
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", DOMHasLoaded, false);
	}
	/* Safari */
	if (navigator.userAgent.search(/WebKit/i) !== -1) {
	    DOMLoadTimer = setInterval(function () {
			if (document.readyState.search(/loaded|complete/i) !== -1) {
				var loaded = new DOMHasLoaded();
			}
		}, 10);
	}
	/* Other web browsers */
	window.onload = DOMHasLoaded;
	
	return {
		DOMReady : function () {
			for (var i=0, il=arguments.length, func, callFunc; i<il; i++) {
				func = arguments[i];
				callFunc = (typeof func === "function")? func : new Function(func);
				functionsToCall.push(callFunc);
			}
		}
	};
}();
DOMAssistant.DOMReady = DOMAssistant.DOMLoad.DOMReady;