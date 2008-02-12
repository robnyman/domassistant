// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
var DOMAssistant = function () {
	var HTMLArray = function (prevSet) {
		// Constructor
	};
	var isIE = document.all && !/Opera/i.test(navigator.userAgent);
	var isOpera = /Opera/i.test(navigator.userAgent); // Hopefully temporary till Opera fixes the XPath implementation
	var allMethods = [];
	return {
		publicMethods : [
			"elmsByClass",
			"elmsByAttribute",
			"elmsByTag"
		],
		initCore : function () {
			this.applyMethod.call(window, "$", this.$);
			window.DOMAssistant = this;
			if (isIE) {
				HTMLArray = Array;
			}
			HTMLArray.prototype = [];
			HTMLArray.prototype.each = function (functionCall) {
				for (var i=0, il=this.length; i<il; i++) {
					functionCall.call(this[i]);
				}
				return this;
			};
			HTMLArray.prototype.end = function () {
				return this.previousSet;
			};
			this.attach(this);
		},
		
		addMethods : function (name, method) {
			allMethods.push([name, method]);
			this.addHTMLArrayPrototype(name, method);
		},
		
		addMethodsToElm : function (elm) {
			for (var i=0, il=allMethods.length; i<il; i++) {
				this.applyMethod.call(elm, allMethods[i][0], allMethods[i][1]);
			}
		},
		
		applyMethod : function (method, func) {
			if (typeof this[method] !== "function") {
				this[method] = func;
			}
		},
		
		attach : function (plugin) {
			var publicMethods = plugin.publicMethods;
			if (typeof publicMethods === "undefined") {
				var pluginMethod;
				for (var method in plugin) {
					if (typeof plugin[method] !== "undefined") {
						this.addMethods(method, plugin[method]);
					}
				}
			}
			else if (publicMethods.constructor === Array) {
				for (var i=0, il=publicMethods.length, current; i<il; i++) {
					current = publicMethods[i];
					this.addMethods(current, plugin[current]);
				}
			}
			if (typeof plugin.init === "function") {
				plugin.init();
			}
		},
		
		createHTMLArray : function() {
			return new HTMLArray();
		},
		
		addHTMLArrayPrototype : function (name, method) {
			HTMLArray.prototype[name] = function () {
				var elmsToReturn = new HTMLArray();
				elmsToReturn.previousSet = this;
				var elms;
				for (var i=0, il=this.length; i<il; i++) {
					elms = method.apply(this[i], arguments);
					if (elms!==null && elms.constructor === Array) {
						for (var j=0, jl=elms.length; j<jl; j++) {
							elmsToReturn.push(elms[j]);
						}
					}
					else {
						elmsToReturn.push(elms);
					}	
				}
				return elmsToReturn;
			};
		},
	
		$ : function () {
			var elm = new HTMLArray();
			if (document.getElementById) {
				var arg = arguments[0];
				if (typeof arg === "string") {
					arg = arg.replace(/^[^#]*(#)/, "$1");
					if (/^#[\w\-\_]+$/.test(arg)) {
						var idMatch = document.getElementById(arg.substr(1));
						if (idMatch) {
							elm = idMatch;
							DOMAssistant.addMethodsToElm(elm);
						}
					}
					else {
						elm = DOMAssistant.cssSelection(arg);
					}
				}
				else if (typeof arg === "object") {
					if (arguments.length === 1) {
						elm = arg;
						DOMAssistant.addMethodsToElm(elm);
					}
					else {
						for (var i=0, il=arguments.length; i<il; i++) {
							elm.push(arguments[i]);
						}
					}
				}
			}
			return elm;
	    },
	
		cssSelection : function  (cssRule) {
			if (document.evaluate && !isOpera) {
				DOMAssistant.cssSelection = function (cssRule) {
					var cssRules = cssRule.replace(/\s*(,)\s*/g, "$1").split(",");
					var elm = new HTMLArray();
					var currentRule, identical, cssSelectors, xPathExpression, cssSelector, splitRule, nextTag, followingElm;
					var cssSelectorRegExp =  /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?(>|\+|~)?/;
					for (var i=0, il=cssRules.length; i<il; i++) {
						currentRule = cssRules[i];
						if (i > 0) {
							identical = false;
							for (var x=0, xl=i; x<xl; x++) {
								if (cssRules[i] === cssRules[x]) {
									identical = true;
									break;
								}
							}
							if (identical) {
								continue;
							}
						}
						cssSelectors = currentRule.split(" ");
						xPathExpression = ".";
						for (var j=0, jl=cssSelectors.length; j<jl; j++) {
							cssSelector = cssSelectorRegExp.exec(cssSelectors[j]);
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
									case "contains":
										xPathExpression += "[contains(., '" + pseudoValue + "')]";
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
										var pseudoSelection = "[";
										if (/^\d+$/.test(pseudoValue)) {
											pseudoSelection += "position() = " + pseudoValue;
										}
										else if (/^n$/.test(pseudoValue)) {
											pseudoSelection = "";
										}
										else{
											if (/^odd$/.test(pseudoValue)) {
												pseudoValue = "2n+1";
											}
											else if (/^even$/.test(pseudoValue)) {
												pseudoValue = "2n+0";
											}
											var pseudoSelector = /^(\d+)n((\+|\-)(\d+))?$/.exec(pseudoValue);
											var nthSelector = parseInt(pseudoSelector[1], 10);
											var nOperatorVal = 0;
											if (pseudoSelector[3] && pseudoSelector[4]) {
												nOperatorVal = parseInt((pseudoSelector[3] + pseudoSelector[4]), 10);
												if (nOperatorVal < 0) {
													nOperatorVal = nthSelector + nOperatorVal;
												}
												//pseudoSelection += "position() = " + nOperatorVal + " or ";
											}
											pseudoSelection += "(count(./preceding-sibling::*) + 1)";
											if (nthSelector < nOperatorVal) {
												var nOperatorDiff = ((nOperatorVal - nthSelector) % 2 === 0)? 0 : 1;
												pseudoSelection += " mod " + nthSelector + " = " + nOperatorDiff + " and position() > " + nOperatorVal;
											}
											else if (nOperatorVal === nthSelector) {
												pseudoSelection += " mod " + nthSelector + " = 0";
											}
											else {
												pseudoSelection += " mod " + nthSelector + " = " + nOperatorVal;
											}
										}
										if (!/^n$/.test(pseudoValue)) {
											pseudoSelection += "]";
										}
										xPathExpression += pseudoSelection;
										break;	
									case "not":
										pseudoValue = pseudoValue.replace(/^\[#([\w\-\_]+)\]$/, "[id=$1]");
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
					var cssRules = cssRule.replace(/\s*(,)\s*/g, "$1").split(",");
					var elm = new HTMLArray();
					var prevElm = new HTMLArray();
					var matchingElms = new HTMLArray();
					var prevParents, currentRule, identical, cssSelectors, childOrSiblingRef, nextTag, nextRegExp, refSeparator, refPrevElm, nextSib, refPrevElmFound, current, previous, prevParent, addElm, firstChild, lastChild, parentTagsByType, matchingChild, childrenNodes, childNodes;
					var childOrSiblingRefRegExp = /^(>|\+|~)$/;
					var cssSelectorRegExp = /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d*n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?/;
					var matchedObjects;
					function clearAdded() {
						for (var n=0, nl=prevElm.length; n<nl; n++) {
							prevElm[n].added = false;
						}
					}
					function clearChildElms () {
						for (var n=0, nl=prevParents.length; n<nl; n++) {
							prevParents[n].childElms = null;
						}
					}
					function getAttr(elm, attr) {
						if(isIE) {
							switch (attr) {
								case "id":
									return elm.id;
								case "for":
									return elm.htmlFor;
								case "class":
									return elm.className;
							}
						}
						return elm.getAttribute(attr, 2);
					}
					for (var a=0, al=cssRules.length; a<al; a++) {
						currentRule = cssRules[a];
						if (a > 0) {
							identical = false;
							for (var b=0, bl=a; b<bl; b++) {
								if (cssRules[a] === cssRules[b]) {
									identical = true;
									break;
								}
							}
							if (identical) {
								continue;
							}
						}
						cssSelectors = currentRule.split(" ");
						prevElm = [];
						prevElm.push(document);
						
						for (var i=0, il=cssSelectors.length; i<il; i++) {
							var rule = cssSelectors[i];
							matchingElms = [];
							if (i > 0 && childOrSiblingRefRegExp.test(rule)) {
								childOrSiblingRef = childOrSiblingRefRegExp.exec(rule);
								if (childOrSiblingRef) {
									nextTag = /^\w+/.exec(cssSelectors[i+1]);
									if (nextTag) {
										nextRegExp = new RegExp("(^|\\s)" + nextTag + "(\\s|$)", "i");
										refSeparator = childOrSiblingRef[0];
										if (refSeparator === ">") {
											for (var j=0, jl=prevElm.length, children; j<jl; j++) {
												children = prevElm[j].childNodes;
												for (var k=0, kl=children.length; k<kl; k++) {
													if (nextRegExp.test(children[k].nodeName)) {
														matchingElms.push(children[k]);
													}
												}
											}	
										}
										else if (refSeparator === "+") {
											for (var l=0, ll=prevElm.length; l<ll; l++) {
												nextSib = prevElm[l].nextSibling;
												while (nextSib && nextSib.nodeType !== 1) {
													nextSib = nextSib.nextSibling;
												}
												if (nextSib) {
													if (nextRegExp.test(nextSib.nodeName)) {
														matchingElms.push(nextSib);
													}
												}
											}	
										}
										else if (refSeparator === "~") {
											for (var m=0, ml=prevElm.length; m<ml; m++) {
												nextSib = prevElm[m].nextSibling;
												while (nextSib && nextSib.nodeType !== 1) {
													nextSib = nextSib.nextSibling;
												}
												while (nextSib) {
													if (!nextSib.added && nextRegExp.test(nextSib.nodeName)) {
														nextSib.added = true;
														matchingElms.push(nextSib);
													}
													nextSib = nextSib.nextSibling;
												}
											}
											clearAdded();
										}
									}
								}
								prevElm = matchingElms;
								i = i+1;
							}
							else {
								var cssSelector = cssSelectorRegExp.exec(rule);
								var splitRule = {
									tag : (!cssSelector[1] || cssSelector[2] === "*")? "*" : cssSelector[1],
									id : (cssSelector[2] !== "*")?  cssSelector[2] : null,
									allClasses : cssSelector[3],
									allAttr : cssSelector[5],
									pseudoClass : cssSelector[10],
									pseudoValue : cssSelector[12]
								};
								if (splitRule.id) {
									matchingElms.push(document.getElementById(splitRule.id.replace(/#/, "")));
									prevElm = matchingElms;
								}
								else if (splitRule.tag) {
									var tagCollectionMatches;
									for (var n=0, nl=prevElm.length; n<nl; n++) {
										tagCollectionMatches = prevElm[n].getElementsByTagName(splitRule.tag);
										for (var o=0, ol=tagCollectionMatches.length; o<ol; o++) {
											if (!tagCollectionMatches[o].added) {
												tagCollectionMatches[o].added = true;
												matchingElms.push(tagCollectionMatches[o]);
											}
										}
									}
									prevElm = matchingElms;
									clearAdded();
								}
								
								if (splitRule.allClasses) {
									splitRule.allClasses = splitRule.allClasses.replace(/^\./, "").split(".");
									var matchingClassElms = [];
									for (var p=0, pl=matchingElms.length, elmClass; p<pl; p++) {
										current = matchingElms[p];
										if (!current.added) {
											addElm = false;
											elmClass = current.className;
											for (var q=0, ql=splitRule.allClasses.length, classToMatch, classMatch; q<ql; q++) {
												classToMatch = new RegExp("(^|\\s)" + splitRule.allClasses[q].replace(/\./, "") + "(\\s|$)");
												addElm = classToMatch.test(elmClass);
												if (!addElm) {
													break;
												}
											}
										}
										if (addElm) {
											current.added = true;
											matchingClassElms.push(current);
										}
									}
									clearAdded();
									matchingElms = matchingClassElms;
									prevElm = matchingElms;
								}
								if (splitRule.allAttr) {
									splitRule.allAttr = splitRule.allAttr.replace(/(\])(\[)/, "$1 $2").split(" ");
									var matchingAttributeElms = [];
									var attributeMatchRegExp = /(\w+)(\^|\$|\*)?=?([\w\-_]+)?/;
									for (var r=0, rl=matchingElms.length, currentAttr, attributeValue; r<rl; r++) {
										current = matchingElms[r];
										if (!current.added) {
											for (var s=0, sl=splitRule.allAttr.length, attributeMatch, attribute, attrVal, tag, substrMatchSelector; s<sl; s++) {
												addElm = false;
												attributeMatch = attributeMatchRegExp.exec(splitRule.allAttr[s]);
												attributeValue = attributeMatch[3] || null;
												attrVal = (attributeValue)? ("^" + attributeValue + "$") : null;
												substrMatchSelector = attributeMatch[2] || null;
												if (typeof substrMatchSelector === "string") {
													switch (substrMatchSelector) {
														case "^":
															attrVal = ("^" + attributeValue);
															break;
														case "$":
															attrVal = (attributeValue + "$");
															break;
														case "*":
															attrVal = (attributeValue);
															break;	
													}
												}
												var attributeRegExp = (attrVal)? new RegExp(attrVal) : null;
									        	currentAttr = getAttr(current, attributeMatch[1]);
										        if (typeof currentAttr === "string" && currentAttr.length > 0) {
													if (!attributeRegExp || typeof attributeRegExp === "undefined" || (attributeRegExp && attributeRegExp.test(currentAttr))) {
														addElm = true;
										            }
										        }
												if (!addElm) {
													continue;
												} 
											}
											if (addElm) {
												matchingAttributeElms.push(current);
											}
										}
									}
									clearAdded();
									matchingElms = matchingAttributeElms;
									prevElm = matchingElms;
								}
								if (splitRule.pseudoClass) {
									var pseudoClass = splitRule.pseudoClass;
									var pseudoValue = splitRule.pseudoValue;
									var previousMatch = matchingElms;
									matchingElms = [];
									prevParents = [];
									if (/^:not$/.test(pseudoClass)) {
										pseudoValue = pseudoValue.replace(/^\[#([\w\-\_]+)\]$/, "[id=$1]");
										var notTag = /^(\w+)/.exec(pseudoValue);
										var notClass = /\.([\w\-_]+)/.exec(pseudoValue);
										var notAttr = /\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/.exec(pseudoValue);
										var notRegExp = new RegExp("(^|\\s)" + ((notTag)? notTag[1] : (notClass)? notClass[1] : "") + "(\\s|$)", "i");
										if (notAttr) {
											var notAttribute = notAttr[3];
											var notMatchingAttrVal = "^" + notAttr[3] + "$";
											var substrNoMatchSelector = notAttr[2];
											if (typeof substrNoMatchSelector === "string") {
												switch (substrNoMatchSelector) {
													case "^":
														notMatchingAttrVal = ("^" + notAttribute);
														break;
													case "$":
														notMatchingAttrVal = (notAttribute + "$");
														break;
													case "*":
														notMatchingAttrVal = (notAttribute);
														break;	
												}
											}
											notRegExp = new RegExp(notMatchingAttrVal, "i");
										}
										for (var t=0, tl=previousMatch.length, notElm; t<tl; t++) {
											notElm = previousMatch[t];
											addElm = null;
											if (notTag && !notRegExp.test(notElm.nodeName)) {
												addElm = notElm;
											}		
											else if (notClass && !notRegExp.test(notElm.className)) {
												addElm = notElm;
											}
											else if (notAttr) {
												if (!getAttr(notElm, notAttr[1]) || !notRegExp.test(getAttr(notElm, notAttr[1]))) {
													addElm = notElm;
												}
											}
											if (addElm && !addElm.added) {
												addElm.added = true;
												matchingElms.push(addElm);
											}
										}
										prevElm = matchingElms;
									}
									else {
										if (/first-child/.test(pseudoClass)) {
											for (var u=0, ul=previousMatch.length; u<ul; u++) {
												previous = previousMatch[u];
												prevParent = previous.parentNode;
												firstChild = prevParent.firstChild;
												while (firstChild.nodeType !== 1 && firstChild.nextSibling) {
													firstChild = firstChild.nextSibling;
												}
												if (firstChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/last-child/.test(pseudoClass)) {
											for (var v=0, vl=previousMatch.length; v<vl; v++) {
												previous = previousMatch[v];
												prevParent = previous.parentNode;
												lastChild = prevParent.lastChild;
												while (lastChild.nodeType !== 1 && lastChild.previousSibling) {
													lastChild = lastChild.previousSibling;
												}
												if (lastChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/only-child/.test(pseudoClass)) {
											for (var w=0, wl=previousMatch.length; w<wl; w++) {
												previous = previousMatch[w];
												prevParent = previous.parentNode;
												firstChild = prevParent.firstChild;
												while (firstChild.nodeType !== 1 && firstChild.nextSibling) {
													firstChild = firstChild.nextSibling;
												}
												lastChild = prevParent.lastChild;
												while (lastChild.nodeType !== 1 && lastChild.previousSibling) {
													lastChild = lastChild.previousSibling;
												}
												if (firstChild === previous && lastChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/nth-child/.test(pseudoClass)) {
											if (/^\d+$/.test(pseudoValue)) {
												var nthChild = parseInt(pseudoValue, 10);
												for (var x=0, xl=previousMatch.length, childCounter; x<xl; x++) {
													childCounter = 0;
													previous = previousMatch[x];
													prevParent = previous.parentNode;
													matchingChild = prevParent.firstChild;
													if(matchingChild.nodeType === 1) {
														childCounter = childCounter + 1;
													}
													while (childCounter < nthChild && matchingChild.nextSibling) {
														matchingChild = matchingChild.nextSibling;
														if (matchingChild.nodeType === 1) {
															childCounter = childCounter + 1;
														}
													}
														
													if (childCounter === nthChild && matchingChild && !matchingChild.added && (matchingChild.nodeName === previous.nodeName)) {
														matchingChild.added = true;
														matchingElms.push(previous);
													}
												}
												clearAdded();
											}
											else if (/^n$/.test(pseudoValue)) {
												for (var y=0, yl=previousMatch.length; y<yl; y++) {
													matchingElms.push(previousMatch[y]);
												}
											}
											else{
												var pseudoSelector = /^(odd|even)|(\d+)n((\+|\-)(\d+))?$/.exec(pseudoValue);
												var nRepeat = parseInt(pseudoSelector[2], 10);
												var iteratorStart = (pseudoSelector[1] === "even")? 1 : 0;
												var iteratorAdd = 2;
												if (nRepeat > 0) {
													iteratorAdd = nRepeat;
													var nOperatorVal = (pseudoSelector[4])? parseInt((pseudoSelector[4] + pseudoSelector[5]), 10) : 0;
													iteratorStart = nOperatorVal - 1;
												}
												for (var z=0, zl=previousMatch.length; z<zl; z++) {
													previous = previousMatch[z];
													prevParent = previous.parentNode;
													if (!prevParent.childElms) {
														childrenNodes = prevParent.childNodes;
														childNodes = [];
														var childElm = prevParent.firstChild;
														if (childElm.nodeType === 1) {
															childNodes.push(childElm);
														}
														while (childElm && childElm.nextSibling) {
															childElm = childElm.nextSibling;
															if (childElm.nodeType === 1) {
																childNodes.push(childElm);
															}
														}
														prevParent.childElms = childNodes;
														prevParents.push(prevParent);
													}
													else {
														childNodes = prevParent.childElms;
													}
													for (var zz=iteratorStart, zzl=childNodes.length; zz<zzl; zz=zz+iteratorAdd) {
														if (zz < 0) {
															continue;
														}
														current = childNodes[zz];
														if (!current.added && current.nodeName === previous.nodeName) {
															current.added = true;
															matchingElms.push(previous);
														}
													}
												}
												clearAdded();
												clearChildElms();
											}
											prevElm = matchingElms;
										}
										else if (/first-of-type/.test(pseudoClass)) {
											for (var zFirst=0, zFirstL=previousMatch.length; zFirst<zFirstL; zFirst++) {
												previous = previousMatch[zFirst];
												prevParent = previous.parentNode;
												parentTagsByType = prevParent.getElementsByTagName(previous.nodeName);
												firstChild = parentTagsByType[0];
												if (firstChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/last-of-type/.test(pseudoClass)) {
											for (var zLast=0, zLastL=previousMatch.length; zLast<zLastL; zLast++) {
												previous = previousMatch[zLast];
												prevParent = previous.parentNode;
												parentTagsByType = prevParent.getElementsByTagName(previous.nodeName);
												lastChild = parentTagsByType[parentTagsByType.length - 1];
												if (lastChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/only-of-type/.test(pseudoClass)) {
											for (var zOnly=0, zOnlyL=previousMatch.length; zOnly<zOnlyL; zOnly++) {
												previous = previousMatch[zOnly];
												prevParent = previous.parentNode;
												parentTagsByType = prevParent.getElementsByTagName(previous.nodeName);
												firstChild = parentTagsByType[0];
												lastChild = parentTagsByType[parentTagsByType.length - 1];
												if (firstChild === previous && lastChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/empty/.test(pseudoClass)) {
											for (var zEmpty=0, zEmptyL=previousMatch.length; zEmpty<zEmptyL; zEmpty++) {
												previous = previousMatch[zEmpty];
												prevParent = previous.parentNode;
												childrenNodes = prevParent.childNodes;
												if (childrenNodes.length === 0) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/enabled/.test(pseudoClass)) {
											for (var zEnabled=0, zEnabledL=previousMatch.length; zEnabled<zEnabledL; zEnabled++) {
												previous = previousMatch[zEnabled];
												if (!previous.disabled) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/disabled/.test(pseudoClass)) {
											for (var zDisabled=0, zDisabledL=previousMatch.length; zDisabled<zDisabledL; zDisabled++) {
												previous = previousMatch[zDisabled];
												if (previous.disabled) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/checked/.test(pseudoClass)) {
											for (var zChecked=0, zCheckedL=previousMatch.length; zChecked<zCheckedL; zChecked++) {
												previous = previousMatch[zChecked];
												if (previous.checked) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/contains/.test(pseudoClass)) {
											for (var zContains=0, zContainsL=previousMatch.length; zContains<zContainsL; zContains++) {
												previous = previousMatch[zContains];
												if (!previous.added) {
													if (new RegExp("(^|\\s)" + pseudoValue + "(\\s|$)").test(previous.innerHTML)) {
														previous.added = true;
														matchingElms.push(previous);
													}
												}
											}
											clearAdded();
											prevElm = matchingElms;
										}
									}
								}
							}
						}
						for (var iPrevElm=0, iPrevElmL=prevElm.length; iPrevElm<iPrevElmL; iPrevElm++) {
							elm.push(prevElm[iPrevElm]);
						}
					}
					return elm;
				};		
			}
			return DOMAssistant.cssSelection.call(this, cssRule); 
		},
	
		elmsByClass : function (className, tag) {
			if (false && document.evaluate && !isOpera) {
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
					if (window.ActiveXObject && document.all) {
						attr = attr.replace(/class/, "className");
					}
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
			if (false && document.evaluate && !isOpera) {
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
		}
	};	
}();
DOMAssistant.initCore();
DOMAssistant.AJAX = function () {
	var globalXMLHttp = null;
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
							//alert(XMLHttp.readyState + "\n\n" + callBack);
							if(XMLHttp.readyState === 4) {
								callBack.call(elm, XMLHttp.responseText, addToContent);
							}
						}
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
			return (globalXMLHttp && typeof globalXMLHttp.readyState !== "undefined")? globalXMLHttp.readyState : null;
		},
		
		getStatus : function () {
			var status = -1;
			if (globalXMLHttp && typeof globalXMLHttp.readyState !== "undefined" && globalXMLHttp.readyState === 4) {
				status = globalXMLHttp.status;
			}
			return status;
		},
		
		getStatusText : function () {
			var statusText = "";
			if (globalXMLHttp && typeof globalXMLHttp.readyState !== "undefined" && globalXMLHttp.readyState === 4) {
				statusText = globalXMLHttp.statusText;
			}
			return statusText;
		}
	};
}();
DOMAssistant.attach(DOMAssistant.AJAX);
DOMAssistant.CSS = function () {
	return {
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
		
		replaceClass : function (className, newClass) {
			var classToRemove = new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i");
			this.className = this.className.replace(classToRemove, function (match, p1, p2) {
				var retVal = p1 + newClass + p2;
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
DOMAssistant.attach(DOMAssistant.CSS);
DOMAssistant.Content = function () {
	return {
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
			var retVal = this;
			if (typeof content === "string") {
				this.innerHTML += content;
			}
			else{		
				retVal = this.appendChild(content);
			}
			return retVal;
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
			DOMAssistant.$(this).addContent(newContent);
			return this;
		},

		remove : function () {
			this.parentNode.removeChild(this);
			return null;
		}
	};
}();
DOMAssistant.attach(DOMAssistant.Content);
DOMAssistant.Events = function () {
	return {
		publicMethods : [
			"addEvent",
			"removeEvent",
			"preventDefault",
			"cancelBubble"
		],
		
		init : function () {
			window.addEvent = this.addEvent;
			window.removeEvent = this.removeEvent;
			DOMAssistant.preventDefault = this.preventDefault;
			DOMAssistant.cancelBubble = this.cancelBubble;
		},

		addEvent : function (evt, func) {
			var XULEvent = (/^DOM/.test(evt));
			if (XULEvent) {
				if (this.addEventListener) {
					this.addEventListener(evt, func, false);
				}
			}
			else {
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
			}
			return this;
		},

		handleEvent : function (evt) {
			var currentEvt = evt || event;
			var currentTarget = currentEvt.target || currentEvt.srcElement || document;
			while (currentTarget.nodeType !== 1 && currentTarget.parentNode) {
				currentTarget = currentTarget.parentNode;
			}			
			currentEvt.eventTarget = currentTarget;
			var eventType = currentEvt.type;
			var eventColl = this.events[eventType];
			var eventCollLength = eventColl.length;
			var eventReturn;
			for (var i=0; i<eventCollLength; i++) {
				eventReturn = eventColl[i].call(this, currentEvt);
				if (i === (eventCollLength - 1)) {
					return eventReturn;
				}
			}
		},

		removeEvent : function (evt, func) {
			var eventColl = this.events[evt];
			for (var i=0; i<eventColl.length; i++) {
				if (eventColl[i] === func) {
					delete eventColl[i];
					eventColl.splice(i, 1);
				}
			}
			return this;
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
DOMAssistant.attach(DOMAssistant.Events);
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