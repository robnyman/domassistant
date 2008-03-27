// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7
var DOMAssistant = function () {
	var HTMLArray = function () {
		// Constructor
	};
	var isIE = /*@cc_on!@*/false;
	return {
		allMethods : [],
		publicMethods : [
			"cssSelect",
			"elmsByClass",
			"elmsByAttribute",
			"elmsByTag"
		],
		initCore : function () {
			this.applyMethod.call(window, "$", this.$);
			this.applyMethod.call(window, "$$", this.$$);
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
			HTMLArray.prototype.first = function () {
				return (typeof this[0] !== "undefined")? DOMAssistant.addMethodsToElm(this[0]) : null;
			};
			HTMLArray.prototype.end = function () {
				return this.previousSet;
			};
			HTMLArray.prototype.pushAll = function (newSet) {
				for (var i=0, iL=newSet.length; i<iL; i++) {
					this.push(newSet[i]);
				}
				return this;
			};
			this.attach(this);
		},
		
		addMethods : function (name, method) {
			if (typeof this.allMethods[name] === "undefined") {
				this.allMethods[name] = method;
				this.addHTMLArrayPrototype(name, method);
			}
		},
		
		addMethodsToElm : function (elm) {
			for (var method in this.allMethods) {
				if (typeof this.allMethods[method] !== "undefined") {
					this.applyMethod.call(elm, method, this.allMethods[method]);
				}
			}
			return elm;
		},
		
		applyMethod : function (method, func) {
			if (typeof this[method] !== "function") {
				this[method] = func;
			}
		},
		
		attach : function (plugin) {
			var publicMethods = plugin.publicMethods;
			if (typeof publicMethods === "undefined") {
				for (var method in plugin) {
					if (method !== "init" && typeof plugin[method] !== "undefined") {
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
		
		addHTMLArrayPrototype : function (name, method) {
			HTMLArray.prototype[name] = function () {
				var elmsToReturn = new HTMLArray();
				elmsToReturn.previousSet = this;
				var elms;
				for (var i=0, il=this.length; i<il; i++) {
					elms = method.apply(this[i], arguments);
					if (typeof elms !== "undefined" && elms !== null && elms.constructor === Array) {
						elmsToReturn.pushAll(elms);
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
					if (/^#[\w\u00C0-\uFFFF\-\_]+$/.test(arg)) {
						var idMatch = DOMAssistant.$$(arg.substr(1), false);
						if (idMatch) {
							elm.push(idMatch);
						}
					}
					else {
						elm = DOMAssistant.cssSelection.call(document, arg);
					}
				}
				else if (typeof arg === "object") {
					if (arguments.length === 1) {
						elm = DOMAssistant.$$(arg);
					}
					else {
						elm.pushAll(arguments);
					}
				}
			}
			return elm;
		},
	
		$$ : function (id, addMethods) {
			var elm = (typeof id === "object")? id : document.getElementById(id);
			var applyMethods = addMethods || true;
			if (typeof id === "string" && elm && elm.id !== id) {
				elm = null;
				for (var i=0, item; (item=document.all[i]); i++) {
					if (item.id === id) {
						elm = item;
						break;
					}
				}
			}
			if (elm && applyMethods) {
				DOMAssistant.addMethodsToElm(elm);
			}
			return elm;
		},
	
		cssSelection : function (cssRule) {
			if (document.evaluate) {
				DOMAssistant.cssSelection = function (cssRule) {
					var cssRules = cssRule.replace(/\s*(,)\s*/g, "$1").split(",");
					var elm = new HTMLArray();
					var currentRule, identical, cssSelectors, xPathExpression, cssSelector, splitRule;
					var cssSelectorRegExp = /^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?(>|\+|~)?/;
					var selectorSplitRegExp = new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]", "g");
					for (var i=0; (currentRule=cssRules[i]); i++) {
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
						cssSelectors = currentRule.match(selectorSplitRegExp);
						xPathExpression = ".";
						for (var j=0, jl=cssSelectors.length; j<jl; j++) {
							cssSelector = cssSelectorRegExp.exec(cssSelectors[j]);
							splitRule = {
								tag : (!cssSelector[1] || cssSelector[3] === "*")? "*" : cssSelector[1],
								id : (cssSelector[3] !== "*")? cssSelector[2] : null,
								allClasses : cssSelector[4],
								allAttr : cssSelector[6],
								pseudoClass : cssSelector[12],
								pseudoValue : cssSelector[14],
								tagRelation : cssSelector[21]
							};
							if (splitRule.pseudoClass === ":lang") {
								splitRule.allAttr = "[lang=" + splitRule.pseudoValue + "]" + splitRule.allAttr;
								splitRule.pseudoClass = splitRule.pseudoValue = null;
							}
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
								xPathExpression += (j > 0 && /(>|\+|~)/.test(cssSelectors[j-1]))? splitRule.tag : ("/descendant::" + splitRule.tag);
							}
							if (splitRule.id) {
								xPathExpression += "[@id = '" + splitRule.id.replace(/^#/, "") + "']";
							}
							if (splitRule.allClasses) {
								xPathExpression += splitRule.allClasses.replace(/\.([\w\u00C0-\uFFFF\-_]+)/g, "[contains(concat(' ', @class, ' '), ' $1 ')]");
							}
							if (splitRule.allAttr) {
								xPathExpression += splitRule.allAttr.replace(/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/g, function (match, p1, p2, p3) {
									var regExpReturn = match;
									switch (p2) {
										case "^":
											regExpReturn = "starts-with(@" + p1 + ", '" + p3 + "')";
											break;
										case "$":
											regExpReturn = "substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), " + p3.length + ") = '" + p3 + "'";
											break;
										case "*":
											regExpReturn = "contains(concat(' ', @" + p1 + ", ' '), '" + p3 + "')";
											break;
										case "|":
											regExpReturn = "(@" + p1 + "='" + p3 + "' or starts-with(@" + p1 + ", '" + p3 + "-'))";
											break;
										case "~":
											regExpReturn = "(@" + p1 + "='" + p3 + "' or starts-with(@" + p1 + ", '" + p3 + " ') or substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), " + p3.length + ") = ' " + p3 + "' or contains(concat(' ', @" + p1 + ", ' '), ' " + p3 + " '))";
											break;
										default:
											regExpReturn = "@" + p1 + ((p3)? "='" + p3 + "'" : "");
									}
									return regExpReturn;
								});
							}
							if (splitRule.pseudoClass) {
								var pseudoValue = splitRule.pseudoValue;
								switch (splitRule.pseudoClass.replace(/^:/, "")) {
									case "first-child":
										xPathExpression += "[count(preceding-sibling::*) = 0]";
										break;
									case "first-of-type":
										xPathExpression += "[count(preceding-sibling::" + splitRule.tag + ") = 0]";
										break;
									case "last-child":
										xPathExpression += "[count(following-sibling::*) = 0]";
										break;
									case "last-of-type":
										xPathExpression += "[count(following-sibling::" + splitRule.tag + ") = 0]";
										break;
									case "only-child":
										xPathExpression += "[count(preceding-sibling::*) = 0 and count(following-sibling::*) = 0]";
										break;
									case "only-of-type":
										xPathExpression += "[count(preceding-sibling::" + splitRule.tag + ") = 0 and count(following-sibling::" + splitRule.tag + ") = 0]";
										break;		
									case "nth-of-type":
										xPathExpression += "[" + pseudoValue + "]";
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
										else {
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
											}
											pseudoSelection += "(count(./preceding-sibling::*) + 1)";
											if (nthSelector < nOperatorVal) {
												var nOperatorDiff = ((nOperatorVal - nthSelector) % 2 === 0)? 0 : 1;
												pseudoSelection += " mod " + nthSelector + " = " + nOperatorDiff + " and position() >= " + nOperatorVal;
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
										notSelector = notSelector.replace(/^\.([\w\u00C0-\uFFFF\-_]+)/g, "contains(concat(' ', @class, ' '), ' $1 ')");
										notSelector = notSelector.replace(/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/g, function (match, p1, p2, p3) {
											var regExpReturn = match;
											switch (p2) {
												case "^":
													regExpReturn = "starts-with(@" + p1 + ", '" + p3 + "')";
													break;
												case "$":
													regExpReturn = "substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), " + p3.length + ") = '" + p3 + "'";
													break;
												case "*":
													regExpReturn = "contains(concat(' ', @" + p1 + ", ' '), '" + p3 + "')";
													break;
												case "|":
													regExpReturn = "(@" + p1 + "='" + p3 + "' or starts-with(@" + p1 + ", '" + p3 + "-'))";
													break;
												case "~":
													regExpReturn = "(@" + p1 + "='" + p3 + "' or starts-with(@" + p1 + ", '" + p3 + " ') or substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), " + p3.length + ") = ' " + p3 + "' or contains(concat(' ', @" + p1 + ", ' '), ' " + p3 + " '))";
													break;
												default:
													regExpReturn = "@" + p1 + ((p3)? "='" + p3 + "'" : "");
											}
											return regExpReturn;
										});
										xPathExpression += "[not(" + notSelector + ")]";
										break;
								}
							}	
						}
						var xPathNodes = document.evaluate(xPathExpression, this, null, 0, null);
						var node = xPathNodes.iterateNext();
						while (node) {
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
					var matchableElms = new HTMLArray();
					var prevParents, currentRule, identical, cssSelectors, childOrSiblingRef, nextTag, nextSelector, nextRegExp, nextSib, current, previous, prevParent, addElm, firstChild, lastChild, parentTagsByType, matchingChild, childrenNodes, childNodes;
					var childOrSiblingRefRegExp = /^(>|\+|~)$/;
					var cssSelectorRegExp = /^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?/;
					var selectorSplitRegExp;
					try {
						selectorSplitRegExp = new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]", "g");
					}
					catch (e) {
						selectorSplitRegExp = /[^\s]+/g;
					}
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
						if (isIE) {
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
					for (var a=0; (currentRule=cssRules[a]); a++) {
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
						cssSelectors = currentRule.match(selectorSplitRegExp);
						prevElm = [];
						prevElm.push(this);				
						for (var i=0, rule; (rule=cssSelectors[i]); i++) {
							var isChildOrSibling = false;
							matchingElms = matchableElms = [];
							if (i > 0 && childOrSiblingRefRegExp.test(rule)) {
								childOrSiblingRef = childOrSiblingRefRegExp.exec(rule);
								if (childOrSiblingRef) {
									isChildOrSibling = true;
									nextSelector = cssSelectors[i+1];
									nextTag = /^\w+/.exec(nextSelector);
									if (nextTag) {
										nextRegExp = new RegExp("(^|\\s)" + nextTag + "(\\s|$)", "i");
									}
									switch (childOrSiblingRef[0]) {
										case ">":
											for (var j=0, jl=prevElm.length, children; j<jl; j++) {
												children = prevElm[j].childNodes;
												for (var k=0, child; (child=children[k]); k++) {
													if (!nextTag || nextRegExp.test(child.nodeName)) {
														matchableElms.push(child);
													}
												}
											}
											break;
										case "+":
											for (var l=0; (nextSib=prevElm[l]); l++) {
												while ((nextSib = nextSib.nextSibling) && nextSib.nodeType !== 1) {
													continue;
												}
												if (nextSib) {
													if (!nextTag || nextRegExp.test(nextSib.nodeName)) {
														matchableElms.push(nextSib);
													}
												}
											}
											break;
										case "~":
											for (var m=0; (nextSib=prevElm[m]); m++) {
												while ((nextSib = nextSib.nextSibling) && !nextSib.added) {
													if (!nextTag || nextRegExp.test(nextSib.nodeName)) {
														nextSib.added = true;
														matchableElms.push(nextSib);
													}
												}
											}
											break;
									}
									prevElm = matchingElms = matchableElms;
									clearAdded();
									i = i + 1;
									rule = cssSelectors[i];
									prevElm.skipTag = true;
								}
							}
							var cssSelector = cssSelectorRegExp.exec(rule);
							var splitRule = {
								tag : (!cssSelector[1] || cssSelector[3] === "*")? "*" : cssSelector[1],
								id : (cssSelector[3] !== "*")? cssSelector[2] : null,
								allClasses : cssSelector[4],
								allAttr : cssSelector[6],
								pseudoClass : cssSelector[12],
								pseudoValue : cssSelector[14]
							};
							if (splitRule.pseudoClass === ":lang") {
								splitRule.allAttr = "[lang=" + splitRule.pseudoValue + "]" + splitRule.allAttr;
								splitRule.pseudoClass = splitRule.pseudoValue = null;
							}
							if (splitRule.id) {
								var DOMElm = document.getElementById(splitRule.id.replace(/#/, ""));
								if (DOMElm) {
									if (isChildOrSibling) {
										for (var mn=0, mnl=matchableElms.length; mn<mnl; mn++) {
											if (matchableElms[mn] === DOMElm) {
												matchingElms.push(DOMElm);
												break;
											}
										}
									}
									else {
										matchingElms.push(DOMElm);
									}
								}
								prevElm = matchingElms;
							}
							else if (splitRule.tag && !prevElm.skipTag) {
								if (!matchingElms.length && prevElm.length === 1) {
									matchingElms = prevElm[0].getElementsByTagName(splitRule.tag);
								}
								else {
									for (var n=0, nl=prevElm.length, tagCollectionMatches, tagMatch; n<nl; n++) {
										tagCollectionMatches = prevElm[n].getElementsByTagName(splitRule.tag);
										for (var o=0; (tagMatch=tagCollectionMatches[o]); o++) {
											if (!tagMatch.added) {
												tagMatch.added = true;
												matchingElms.push(tagMatch);
											}
										}
									}
								}
								prevElm = matchingElms;
								clearAdded();
							}
							prevElm.skipTag = false;
							if (splitRule.allClasses) {
								splitRule.allClasses = splitRule.allClasses.replace(/^\./, "").split(".");
								var regExpClassNames = [];
								for (var qp=0, qpl=splitRule.allClasses.length; qp<qpl; qp++) {
									regExpClassNames.push(new RegExp("(^|\\s)" + splitRule.allClasses[qp] + "(\\s|$)"));
								}
								var matchingClassElms = [];
								for (var p=0, elmClass; (current=prevElm[p]); p++) {
									elmClass = current.className;
									if (elmClass && !current.added) {
										addElm = false;
										for (var q=0, ql=regExpClassNames.length; q<ql; q++) {
											addElm = regExpClassNames[q].test(elmClass);
											if (!addElm) {
												break;
											}
										}
										if (addElm) {
											current.added = true;
											matchingClassElms.push(current);
										}
									}
								}
								clearAdded();
								matchingElms = matchingClassElms;
								prevElm = matchingElms;
							}
							if (splitRule.allAttr) {
								splitRule.allAttr = splitRule.allAttr.match(/\[[^\]]+\]/g);
								var regExpAttributes = [];
								var attributeMatchRegExp = /(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/;
								for (var sp=0, spl=splitRule.allAttr.length, attributeMatch, attributeValue, attrVal, substrMatchSelector; sp<spl; sp++) {
									attributeMatch = attributeMatchRegExp.exec(splitRule.allAttr[sp]);
									attributeValue = (attributeMatch[3])? attributeMatch[3].replace(/\./g, "\\.") : null;
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
											case "|":
												attrVal = ("(^" + attributeValue + "$)|(^" + attributeValue + "\\-)");
												break;	
											case "~":
												attrVal = ("\\b" + attributeValue + "\\b");
												break;	
										}
									}
									regExpAttributes.push([((attrVal)? new RegExp(attrVal) : null), attributeMatch[1]]);
								}
								var matchingAttributeElms = [];
								for (var r=0, currentAttr; (current=matchingElms[r]); r++) {
									if (!current.added) {
										for (var s=0, sl=regExpAttributes.length, attributeRegExp; s<sl; s++) {
											addElm = false;
											attributeRegExp = regExpAttributes[s][0];
											currentAttr = getAttr(current, regExpAttributes[s][1]);
											if (typeof currentAttr === "string" && currentAttr.length) {
												if (!attributeRegExp || typeof attributeRegExp === "undefined" || (attributeRegExp && attributeRegExp.test(currentAttr))) {
													addElm = true;
												}
											}
											if (!addElm) {
												break;
											} 
										}
										if (addElm) {
											current.added = true;
											matchingAttributeElms.push(current);
										}
									}
								}
								clearAdded();
								matchingElms = matchingAttributeElms;
								prevElm = matchingElms;
							}
							if (splitRule.pseudoClass) {
								var pseudoClassRegExp = /((first|last|only|nth)-child|(first|last|only|nth)-of-type|empty|enabled|disabled|checked|contains)/i;
								var pseudoClass = splitRule.pseudoClass;
								var pseudoValue = splitRule.pseudoValue;
								var previousMatch = matchingElms;
								matchingElms = [];
								prevParents = [];
								if (/^:not$/.test(pseudoClass)) {
									pseudoValue = pseudoValue.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/, "[id=$1]");
									var notTag = /^(\w+)/.exec(pseudoValue);
									var notClass = /^\.([\w\u00C0-\uFFFF\-_]+)/.exec(pseudoValue);
									var notAttr = /\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/.exec(pseudoValue);
									var notRegExp = new RegExp("(^|\\s)" + ((notTag)? notTag[1] : (notClass)? notClass[1] : "") + "(\\s|$)", "i");
									if (notAttr) {
										var notAttribute = (notAttr[3])? notAttr[3].replace(/\./g, "\\.") : null;
										var notMatchingAttrVal = "^" + notAttribute + "$";
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
												case "|":
													notMatchingAttrVal = ("(^" + notAttribute + "$)|(^" + notAttribute + "\\-)");
													break;	
												case "~":
													notMatchingAttrVal = ("\\b" + notAttribute + "\\b");
											}
										}
										notRegExp = new RegExp(notMatchingAttrVal, "i");
									}
									for (var t=0, notElm; (notElm=previousMatch[t]); t++) {
										addElm = null;
										if (notTag && !notRegExp.test(notElm.nodeName)) {
											addElm = notElm;
										}		
										else if (notClass && !notRegExp.test(notElm.className)) {
											addElm = notElm;
										}
										else if (notAttr) {
											var att = getAttr(notElm, notAttr[1]);
											if (!att || !notRegExp.test(att)) {
												addElm = notElm;
											}
										}
										if (addElm && !addElm.added) {
											addElm.added = true;
											matchingElms.push(addElm);
										}
									}
									clearAdded();
									prevElm = matchingElms;
								}
								else {
									var pseudoClassMatches = pseudoClass.match(pseudoClassRegExp);
									if (pseudoClassMatches && typeof pseudoClassMatches[0] === "string") {
										switch (pseudoClassMatches[0]) {
											case "first-child":
												for (var u=0; (previous=previousMatch[u]); u++) {
													firstChild = previous.parentNode.firstChild;
													while (firstChild.nodeType !== 1 && firstChild.nextSibling) {
														firstChild = firstChild.nextSibling;
													}
													if (firstChild === previous) {
														matchingElms.push(previous);
													}
												}
												break;
											case "last-child":
												for (var v=0; (previous=previousMatch[v]); v++) {
													lastChild = previous.parentNode.lastChild;
													while (lastChild.nodeType !== 1 && lastChild.previousSibling) {
														lastChild = lastChild.previousSibling;
													}
													if (lastChild === previous) {
														matchingElms.push(previous);
													}
												}
												break;
											case "only-child":
												for (var w=0; (previous=previousMatch[w]); w++) {
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
												break;
											case "nth-child":
												if (/^\d+$/.test(pseudoValue)) {
													var nthChild = parseInt(pseudoValue, 10);
													for (var x=0, childCounter; (previous=previousMatch[x]); x++) {
														childCounter = 0;
														prevParent = previous.parentNode;
														matchingChild = prevParent.firstChild;
														if (matchingChild.nodeType === 1) {
															childCounter = childCounter + 1;
														}
														while (childCounter < nthChild && (matchingChild = matchingChild.nextSibling)) {
															if (matchingChild.nodeType === 1) {
																childCounter = childCounter + 1;
															}
														}
														if (childCounter === nthChild && matchingChild && !matchingChild.added && (matchingChild.nodeName === previous.nodeName)) {
															matchingChild.added = true;
															matchingElms.push(matchingChild);
														}
													}
													clearAdded();
												}
												else if (/^n$/.test(pseudoValue)) {
													if (!matchingElms.length) {
														matchingElms = previousMatch;
													}
													else {
														matchingElms.pushAll(previousMatch);
													}
												}
												else {
													var pseudoSelector = /^(odd|even)|(\d*)(n)((\+|\-)(\d+))?$/.exec(pseudoValue);
													var nRepeat = (!pseudoSelector[2] && pseudoSelector[3])? 1 : parseInt(pseudoSelector[2], 10);
													var iteratorStart = (pseudoSelector[1] === "even")? 2 : 1;
													var iteratorAdd = 2;
													if (nRepeat > 0) {
														iteratorStart = iteratorAdd = nRepeat;
														if (pseudoSelector[5]) {
															var adder = parseInt(pseudoSelector[6], 10);
															if (pseudoSelector[5] === "+") {
																iteratorStart = adder;
															}
															else {
																var nn = 1;
																while ((iteratorStart=(nRepeat*(nn++))-adder) < 1) {
																	continue;
																}
															}
														}
													}
													for (var z=0; (previous=previousMatch[z]); z++) {
														prevParent = previous.parentNode;
														if (!prevParent.childElms) {
															var iteratorNext = iteratorStart, childCount = 0;
															var childElm = prevParent.firstChild;
															var firstCount = true;
															while (firstCount || (childElm = childElm.nextSibling)) {
																if (childElm.nodeType === 1) {
																	if (++childCount === iteratorNext) {
																		if (!childElm.added && childElm.nodeName === previous.nodeName) {
																			childElm.added = true;
																			matchingElms.push(childElm);
																		}
																		iteratorNext += iteratorAdd;
																	}
																}
																firstCount = false;
															}
															prevParent.childElms = true;
															prevParents.push(prevParent);
														}
													}
													clearAdded();
													clearChildElms();
												}
												break;
											case "first-of-type":
												for (var zFirst=0; (previous=previousMatch[zFirst]); zFirst++) {
													firstChild = previous.parentNode.getElementsByTagName(previous.nodeName)[0];
													if (firstChild === previous) {
														matchingElms.push(previous);
													}
												}
												break;
											case "last-of-type":
												for (var zLast=0; (previous=previousMatch[zLast]); zLast++) {
													if (!previous.added) {
														prevParent = previous.parentNode;
														parentTagsByType = prevParent.getElementsByTagName(previous.nodeName);
														lastChild = parentTagsByType[parentTagsByType.length - 1];
														while (lastChild.parentNode !== prevParent) {
															lastChild = lastChild.parentNode;
														}
														if (lastChild === previous) {
															previous.added = true;
															matchingElms.push(previous);
														}
													}
												}
												break;
											case "only-of-type":
												for (var zOnly=0; (previous=previousMatch[zOnly]); zOnly++) {
													parentTagsByType = previous.parentNode.getElementsByTagName(previous.nodeName);
													if (parentTagsByType.length === 1) {
														matchingElms.push(previous);
													}
												}
												break;
											case "nth-of-type":
												var nthIndex = parseInt(pseudoValue, 10);
												for (var zNth=0; (previous=previousMatch[zNth]); zNth++) {
													childNodes = [];
													parentTagsByType = previous.parentNode.childNodes;
													if (parentTagsByType.length >= nthIndex) {
														for (var zInnerNth=0, childNode; (zInnerNth !== nthIndex && (childNode=parentTagsByType[zInnerNth])); zInnerNth++) {
															if (childNode.nodeName === previous.nodeName) {
																childNodes.push(childNode);
															}
														}
														current = childNodes[childNodes.length - 1];
														if (current && current === previous) {
															matchingElms.push(previous);
														}
													}
												}
												break;
											case "empty":
												for (var zEmpty=0; (previous=previousMatch[zEmpty]); zEmpty++) {
													childrenNodes = previous.parentNode.childNodes;
													if (!childrenNodes.length) {
														matchingElms.push(previous);
													}
												}
												break;
											case "enabled":
												for (var zEnabled=0; (previous=previousMatch[zEnabled]); zEnabled++) {
													if (!previous.disabled) {
														matchingElms.push(previous);
													}
												}
												break;
											case "disabled":
												for (var zDisabled=0; (previous=previousMatch[zDisabled]); zDisabled++) {
													if (previous.disabled) {
														matchingElms.push(previous);
													}
												}
												break;
											case "checked":
												for (var zChecked=0; (previous=previousMatch[zChecked]); zChecked++) {
													if (previous.checked) {
														matchingElms.push(previous);
													}
												}
												break;
											case "contains":
												for (var zContains=0; (previous=previousMatch[zContains]); zContains++) {
													if (!previous.added) {
														if (previous.innerText.indexOf(pseudoValue) !== -1) {
															previous.added = true;
															matchingElms.push(previous);
														}
													}
												}
												clearAdded();
												break;
										}
										prevElm = matchingElms;
									}
								}
							}
						}
						elm.pushAll(prevElm);
					}
					return elm;	
				};
			}
			if (document.querySelectorAll) {
				var cssSelectionBackup = DOMAssistant.cssSelection;
				DOMAssistant.cssSelection = function (cssRule) {
					try {
						var elm = new HTMLArray();
						elm.pushAll(this.querySelectorAll(cssRule));
						return elm;
					}
					catch (e) {
						return cssSelectionBackup.call(this, cssRule);
					}
				};
			}
			return DOMAssistant.cssSelection.call(this, cssRule); 
		},
		
		cssSelect : function (cssRule) {
			return DOMAssistant.cssSelection.call(this, cssRule);
		},
	
		elmsByClass : function (className, tag) {
			if (document.evaluate) {
				DOMAssistant.elmsByClass = function (className, tag) {
					var returnElms = new HTMLArray();
					if (this.getElementsByClassName && !tag) {
						returnElms.pushAll(this.getElementsByClassName(className));
					}
					else {
						var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag.toLowerCase() : "*") + "[contains(concat(' ', @class, ' '), ' " + className + " ')]", this, null, 0, null);
						var node = xPathNodes.iterateNext();
						while (node) {
							returnElms.push(node);
							node = xPathNodes.iterateNext();
						}
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
					for (var i=0, elm; (elm=elms[i]); i++) {
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
					var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag.toLowerCase() : "*") + "[" + attribute + "]", this, null, 0, null);
					var node = xPathNodes.iterateNext();
					while (node) {
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
					for (var i=0,current,currentAttr; (current=elms[i]); i++) {
						currentAttr = current.getAttribute(attr, 2);
						if (typeof currentAttr === "string" && currentAttr.length) {
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
					var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag.toLowerCase() : "*"), this, null, 0, null);
					var node = xPathNodes.iterateNext();
					while (node) {
						returnElms.push(node);
						node = xPathNodes.iterateNext();
					}
					return returnElms;
				};
			}
			else {			
				DOMAssistant.elmsByTag = function (tag) {
					var returnElms = new HTMLArray();
					returnElms.pushAll(this.getElementsByTagName(tag));
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
	var readyState = 0;
	var status = -1;
	var statusText = "";
	var createAjaxObj = function (url, method, callback, addToContent) {
		var params = null;
		if (/POST/i.test(method)) {
			url = url.split("?");
			params = url[1];
			url = url[0];
		}
		return {
			url: url,
			method : method,
			callback : callback,
			params : params,
			headers : {},
			responseType : "text",
			addToContent : addToContent || false
		};
	};
	return {
		publicMethods : [
			"ajax",
			"get",
			"post",
			"load",
			"replaceWithAJAXContent"
		],
		
		initRequest : function () {
			var XMLHttp = null;
			if (typeof XMLHttpRequest !== "undefined") {
				XMLHttp = new XMLHttpRequest();
				DOMAssistant.AJAX.initRequest = function () {
					return new XMLHttpRequest();
				};
			}
			else if (typeof window.ActiveXObject !== "undefined") {
				var XMLHttpMS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
				for (var i=0; i<XMLHttpMS.length; i++) {
					try	{
						XMLHttp = new window.ActiveXObject(XMLHttpMS[i]);
						DOMAssistant.AJAX.initRequest = function () {
							return new window.ActiveXObject(XMLHttpMS[i]);
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
			if (ajaxObj.url && /\?/.test(ajaxObj.url) && ajaxObj.method && /POST/i.test(ajaxObj.method)) {
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
					var url = ajaxObj.url;
					var method = ajaxObj.method || "GET";
					var callback = ajaxObj.callback;
					var params = ajaxObj.params;
					var headers = ajaxObj.headers;
					var responseType = ajaxObj.responseType || "text";
					var addToContent = ajaxObj.addToContent;
					XMLHttp.open(method, url, true);
					XMLHttp.setRequestHeader("AJAX", "true");
					XMLHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					if (method === "POST") {
						var contentLength = (params)? params.length : 0;
						XMLHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						XMLHttp.setRequestHeader("Content-length", contentLength);
						if (XMLHttp.overrideMimeType) {
							XMLHttp.setRequestHeader("Connection", "close");
						}
					}
					for (var i in headers){
						if (typeof i === "string") {
							XMLHttp.setRequestHeader(i, headers[i]);
						}
					}
					if (typeof callback === "function") {
						XMLHttp.onreadystatechange = function () {
							if (XMLHttp.readyState === 4) {
								var response = (/xml/i.test(responseType))? XMLHttp.responseXML : XMLHttp.responseText;
								callback.call(elm, response, addToContent);
								readyState = 4;
								status = XMLHttp.status;
								statusText = XMLHttp.statusText;
								globalXMLHttp = null;
								XMLHttp = null;
							}
						};
					}
					XMLHttp.send(params);
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
		
		setStyle : function (style, value) {
			if (typeof this.style.cssText !== "undefined") {
				var styleToSet = this.style.cssText;
				if (typeof style === "object") {
					for (var i in style) {
						if (typeof i === "string") {
							styleToSet += ";" + i + ":" + style[i];
						}
					}
				}
				else {
					styleToSet += ";" + style + ":" + value;
				}
				this.style.cssText = styleToSet;
			}
			return this;
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
			while (prevSib && prevSib.nodeType !== 1) {
				prevSib = prevSib.previousSibling;
			}
			return DOMAssistant.$(prevSib);
		},

		next : function () {
			var nextSib = this.nextSibling;
			while (nextSib && nextSib.nodeType !== 1) {
				nextSib = nextSib.nextSibling;
			}
			return DOMAssistant.$(nextSib);
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
				else {
					this.setAttribute(i, attr[i]);
				}	
			}
			return this;
		},

		addContent : function (content) {
			if (typeof content === "string") {
				this.innerHTML += content;
			}
			else if (typeof content === "object" && content) {
				this.appendChild(content);
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
	var uniqueHandlerId = 1;
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
				if (!this.uniqueHandlerId) {
					this.uniqueHandlerId = uniqueHandlerId++;
				}
				var alreadyExists = false;
				if (func.attachedElements && func.attachedElements[evt + this.uniqueHandlerId]) {
					alreadyExists = true;
				}
				if (!alreadyExists) {
					if (!this.events) {
						this.events = {};
					}
					if (!this.events[evt]) {
						this.events[evt] = [];
						var existingEvent = this["on" + evt];
						if (existingEvent) {
							this.events[evt].push(existingEvent);
						}
					}							
					this.events[evt].push(func);
					this["on" + evt] = DOMAssistant.Events.handleEvent;
					if (typeof this.window === "object") {
						this.window["on" + evt] = DOMAssistant.Events.handleEvent;
					}
					if (!func.attachedElements) {
						func.attachedElements = {};
					}
					func.attachedElements[evt + this.uniqueHandlerId] = true;
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
			if (this.events) {
				var eventColl = this.events[evt];
				for (var i=0; i<eventColl.length; i++) {
					if (eventColl[i] === func) {
						delete eventColl[i];
						eventColl.splice(i, 1);
					}
				}
				func.attachedElements[evt + this.uniqueHandlerId] = null;
			}
			return this;
		},

		preventDefault : function (evt) {
			if (evt && evt.preventDefault) {
				DOMAssistant.Events.preventDefault = function (evt) {
					evt.preventDefault();
				};
			}
			else {
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
			else {
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
	var addedStrings = {};
	var errorHandling = null;
	var execFunctions = function () {
		for (var i=0, il=functionsToCall.length; i<il; i++) {
			try {
				functionsToCall[i]();
			}
			catch (e) {
				if (errorHandling && typeof errorHandling === "function") {
					errorHandling(e);
				}
			}
		}
		functionsToCall = [];
	};
	var DOMHasLoaded = function () {
		if (DOMLoaded) {
			return;
		}
		DOMLoaded = true;
		execFunctions();
	};
	/* Internet Explorer */
	/*@cc_on
	@if (@_win32 || @_win64)
		if (document.getElementById) {
			document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
			document.getElementById("ieScriptLoad").onreadystatechange = function() {
				if (this.readyState === "complete") {
					DOMHasLoaded();
				}
			};
		}
	@end @*/
	/* Mozilla/Opera 9 */
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", DOMHasLoaded, false);
	}
	/* Safari, iCab, Konqueror */
	if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
		DOMLoadTimer = setInterval(function () {
			if (/loaded|complete/i.test(document.readyState)) {
				DOMHasLoaded();
				clearInterval(DOMLoadTimer);
			}
		}, 10);
	}
	/* Other web browsers */
	window.onload = DOMHasLoaded;
	
	return {
		DOMReady : function () {
			for (var i=0, il=arguments.length, funcRef; i<il; i++) {
				funcRef = arguments[i];
				if (!funcRef.DOMReady && !addedStrings[funcRef]) {
					if (typeof funcRef === "string") {
						addedStrings[funcRef] = true;
						funcRef = new Function(funcRef);
					}
					funcRef.DOMReady = true;
					functionsToCall.push(funcRef);
				}
			}
			if (DOMLoaded) {
				execFunctions();
			}
		},
		
		setErrorHandling : function (funcRef) {
			errorHandling = funcRef;
		}
	};
}();
DOMAssistant.DOMReady = DOMAssistant.DOMLoad.DOMReady;