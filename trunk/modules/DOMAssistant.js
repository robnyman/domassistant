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
				var pluginMethod;
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
						for (var j=0, jl=arguments.length; j<jl; j++) {
							elm.push(arguments[j]);
						}
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
					var prevParents, currentRule, identical, cssSelectors, childOrSiblingRef, nextTag, nextSelector, nextRegExp, refSeparator, nextSib, current, previous, prevParent, addElm, firstChild, lastChild, parentTagsByType, matchingChild, childrenNodes, childNodes;
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
									if (!current.added) {
										addElm = false;
										elmClass = current.className;
										for (var q=0, ql=regExpClassNames.length; q<ql; q++) {
											addElm = regExpClassNames[q].test(elmClass);
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
										switch (pseudoClass.match(pseudoClassRegExp)[0]) {
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
														for (var y=0, yl=previousMatch.length; y<yl; y++) {
															matchingElms.push(previousMatch[y]);
														}
													}
												}
												else {
													var pseudoSelector = /^(odd|even)|(\d*)n((\+|\-)(\d+))?$/.exec(pseudoValue);
													var nRepeat = parseInt(pseudoSelector[2], 10);
													var iteratorStart = (pseudoSelector[1] === "even")? 1 : 0;
													var iteratorAdd = 2;
													if (nRepeat > 0) {
														iteratorAdd = nRepeat;
														var nOperatorVal = (pseudoSelector[4])? parseInt((pseudoSelector[4] + pseudoSelector[5]), 10) : 0;
														iteratorStart = nOperatorVal - 1;
													}
													for (var z=0; (previous=previousMatch[z]); z++) {
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
															prevParent.childElms = true;
															prevParents.push(prevParent);
															for (var zz=iteratorStart, zzl=childNodes.length; zz<zzl; zz=zz+iteratorAdd) {
																if (zz < 0) {
																	continue;
																}
																current = childNodes[zz];
																if (!current.added && current.nodeName === previous.nodeName) {
																	current.added = true;
																	matchingElms.push(current);
																}
															}
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
												var regExpContains = new RegExp(pseudoValue);
												for (var zContains=0; (previous=previousMatch[zContains]); zContains++) {
													if (!previous.added) {
														if (regExpContains.test(previous.innerText)) {
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
						for (var iPrevElm=0, iPrevElmL=prevElm.length; iPrevElm<iPrevElmL; iPrevElm++) {
							elm.push(prevElm[iPrevElm]);
						}
					}
					return elm;	
				};
			}
			if (document.querySelectorAll) {
				var cssSelectionBackup = DOMAssistant.cssSelection;
				DOMAssistant.cssSelection = function (cssRule) {
					try {
						var elm = new HTMLArray();
						var results = this.querySelectorAll(cssRule);
						for (var i = 0, il = results.length; i<il; i++) {
							elm.push(results[i]);
						}
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
						var results = this.getElementsByClassName(className);
						for (var i=0, il=results.length; i<il; i++) {
							returnElms.push(results[i]);
						}
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