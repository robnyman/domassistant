// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7
var DOMAssistant = function () {
	var HTMLArray = function () {
		// Constructor
	};
	var isIE = /*@cc_on!@*/false;
	var cachedElms = [];
	var pushAll = function (set1, set2) {
		for (var j=0, jL=set2.length; j<jL; j++) {
			set1.push(set2[j]);
		}
		return set1;
	};
	if (isIE) {
		pushAll = function (set1, set2) {
			if (set2.slice) {
				return set1.concat(set2);
			}
			for (var i=0, iL=set2.length; i<iL; i++) {
				set1[set1.length] = set2[i];
			}
			return set1;
		};
	}
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
				for (var method in plugin) {
					if (method !== "init" && typeof plugin[method] !== "undefined") {
						this.addMethods(method, plugin[method]);
					}
				}
			}
			else if (publicMethods.constructor === Array) {
				for (var i=0, current; (current=publicMethods[i]); i++) {
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
						elmsToReturn = pushAll(elmsToReturn, elms);
					}
					else {
						elmsToReturn.push(elms);
					}	
				}
				return elmsToReturn;
			};
		},
	
		getSequence: function (expression) {
			var start, add = 2, max = -1, modVal = -1;
			var expressionRegExp = /^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n((\+|\-)(\d+))?)|(\-(([1-9]\d*)?)n\+(\d+)))$/;
			var pseudoValue = expressionRegExp.exec(expression);
			if (!pseudoValue) {
				return null;
			}
			else {
				if (pseudoValue[2]) {	// odd or even
					start = (pseudoValue[2] === "odd")? 1 : 2;
					modVal = (start === 1)? 1 : 0;
				}
				else if (pseudoValue[3]) {	// single digit
					start = parseInt(pseudoValue[3], 10);
					add = 0;
					max = start;
				}
				else if (pseudoValue[4]) {	// an+b
					add = pseudoValue[6]? parseInt(pseudoValue[6], 10) : 1;
					start = pseudoValue[7]? parseInt(pseudoValue[8] + pseudoValue[9], 10) : 0;
					while (start < 1) {
						start += add;
					}
					modVal = (start > add)? (start - add) % add : ((start === add)? 0 : start);
				}
				else if (pseudoValue[10]) {	// -an+b
					add = pseudoValue[12]? parseInt(pseudoValue[12], 10) : 1;
					start = max = parseInt(pseudoValue[13], 10);
					while (start > add) {
						start -= add;
					}
					modVal = (max > add)? (max - add) % add : ((max === add)? 0 : max);
				}
			}
			return { start: start, add: add, max: max, modVal: modVal };
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
					elm = (arguments.length === 1)? DOMAssistant.$$(arg) : pushAll(elm, arguments);
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
					var cssSelectorRegExp = /^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?(>|\+|~)?/;
					var selectorSplitRegExp = new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]", "g");
					function attrToXPath(match, p1, p2, p3) {
						var xpathReturn = match;
						switch (p2) {
							case "^":
								xpathReturn = "starts-with(@" + p1 + ", '" + p3 + "')";
								break;
							case "$":
								xpathReturn = "substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), " + p3.length + ") = '" + p3 + "'";
								break;
							case "*":
								xpathReturn = "contains(concat(' ', @" + p1 + ", ' '), '" + p3 + "')";
								break;
							case "|":
								xpathReturn = "(@" + p1 + "='" + p3 + "' or starts-with(@" + p1 + ", '" + p3 + "-'))";
								break;
							case "~":
								xpathReturn = "(@" + p1 + "='" + p3 + "' or starts-with(@" + p1 + ", '" + p3 + " ') or substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), " + p3.length + ") = ' " + p3 + "' or contains(concat(' ', @" + p1 + ", ' '), ' " + p3 + " '))";
								break;
							default:
								xpathReturn = "@" + p1 + (p3? "='" + p3 + "'" : "");
						}
						return xpathReturn;
					}
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
								allPseudos : cssSelector[10],
								tagRelation : cssSelector[21]
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
								xPathExpression += (j > 0 && /(>|\+|~)/.test(cssSelectors[j-1]))? splitRule.tag : ("/descendant::" + splitRule.tag);
							}
							if (splitRule.id) {
								xPathExpression += "[@id = '" + splitRule.id.replace(/^#/, "") + "']";
							}
							if (splitRule.allClasses) {
								xPathExpression += splitRule.allClasses.replace(/\.([\w\u00C0-\uFFFF\-_]+)/g, "[contains(concat(' ', @class, ' '), ' $1 ')]");
							}
							if (splitRule.allAttr) {
								xPathExpression += splitRule.allAttr.replace(/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/g, attrToXPath);
							}
							if (splitRule.allPseudos) {
								var pseudoSplitRegExp = /:(\w[\w\-]*)(\(([^\)]+)\))?/;
								splitRule.allPseudos = splitRule.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);
								for (var y=0, yL=splitRule.allPseudos.length; y<yL; y++) {
									var pseudo = splitRule.allPseudos[y].match(pseudoSplitRegExp);
									var pseudoClass = pseudo[1]? pseudo[1].toLowerCase() : null;
									var pseudoValue = pseudo[3]? pseudo[3] : null;
									switch (pseudoClass) {
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
											var pseudoSelection = "";
											if (!/^n$/.test(pseudoValue)) {
												var sequence = DOMAssistant.getSequence(pseudoValue);
												if (sequence) {
													pseudoSelection = "[";
													if (sequence.start === sequence.max) {
														pseudoSelection += "position() = " + sequence.start;
													}
													else {
														pseudoSelection += "(count(./preceding-sibling::*) + 1) mod " + sequence.add + " = " + sequence.modVal + ((sequence.start > 1)? " and position() >= " + sequence.start : "") + ((sequence.max > 0)? " and position() <= " + sequence.max : "");
													}
													pseudoSelection += "]";
												}
											}
											xPathExpression += pseudoSelection;
											break;	
										case "not":
											pseudoValue = pseudoValue.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/, "[id=$1]");
											var notSelector = pseudoValue.replace(/^(\w+)/, "self::$1");
											notSelector = notSelector.replace(/^\.([\w\u00C0-\uFFFF\-_]+)/g, "contains(concat(' ', @class, ' '), ' $1 ')");
											notSelector = notSelector.replace(/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/g, attrToXPath);
											xPathExpression += "[not(" + notSelector + ")]";
											break;
										default:
											xPathExpression += "[@" + pseudoClass + "='" + pseudoValue + "']";
											break;
									}
								}
							}
						}
						var xPathNodes = document.evaluate(xPathExpression, this, null, 0, null), node;
						while ((node = xPathNodes.iterateNext())) {
							elm.push(node);
						}
					}
					return elm;
				};
			}
			else {
				DOMAssistant.cssSelection = function (cssRule) {
					var cssRules = cssRule.replace(/\s*(,)\s*/g, "$1").split(",");
					var elm = new HTMLArray();
					var prevElm = [];
					var matchingElms = [];
					var prevParents, currentRule, identical, cssSelectors, childOrSiblingRef, nextTag, nextSelector, nextRegExp, nextSib, regExpClassNames, matchingClassElms, regExpAttributes, matchingAttributeElms, attributeMatchRegExp, current, previous, prevParent, addElm, firstChild, lastChild, parentTagsByType, childrenNodes, childNodes;
					var childOrSiblingRefRegExp = /^(>|\+|~)$/;
					var cssSelectorRegExp = /^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?/;
					var selectorSplitRegExp;
					try {
						selectorSplitRegExp = new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]", "g");
					}
					catch (e) {
						selectorSplitRegExp = /[^\s]+/g;
					}
					function clearAdded(elm) {
						elm = elm? elm : prevElm;
						for (var n=0, nl=elm.length; n<nl; n++) {
							elm[n].added = false;
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
					function attrToRegExp(attrVal, substrOperator) {
						var regexpReturn = attrVal? "^" + attrVal + "$" : null;
						if (typeof substrOperator === "string") {
							switch (substrOperator) {
								case "^":
									regexpReturn = "^" + attrVal;
									break;
								case "$":
									regexpReturn = attrVal + "$";
									break;
								case "*":
									regexpReturn = attrVal;
									break;	
								case "|":
									regexpReturn = "(^" + attrVal + "(\\-\\w+)*$)";
									break;	
								case "~":
									regexpReturn = "\\b" + attrVal + "\\b";
									break;	
							}
						}
						return new RegExp(regexpReturn);
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
						prevElm = [this];
						for (var i=0, rule; (rule=cssSelectors[i]); i++) {
							var isChildOrSibling = false;
							matchingElms = [];
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
											for (var j=0, prevRef, children; (prevRef=prevElm[j]); j++) {
												children = prevRef.getElementsByTagName(nextTag || "*");
												for (var k=0, child; (child=children[k]); k++) {
													if (child.parentNode === prevRef) {
														matchingElms[matchingElms.length] = child;
													}
												}
											}
											break;
										case "+":
											for (var l=0; (nextSib=prevElm[l]); l++) {
												while ((nextSib = nextSib.nextSibling) && nextSib.nodeType !== 1) {}
												if (nextSib) {
													if (!nextTag || nextRegExp.test(nextSib.nodeName)) {
														matchingElms[matchingElms.length] = nextSib;
													}
												}
											}
											break;
										case "~":
											for (var m=0; (nextSib=prevElm[m]); m++) {
												while ((nextSib = nextSib.nextSibling) && !nextSib.added) {
													if (!nextTag || nextRegExp.test(nextSib.nodeName)) {
														nextSib.added = true;
														matchingElms[matchingElms.length] = nextSib;
													}
												}
											}
											break;
									}
									prevElm = matchingElms;
									clearAdded();
									rule = cssSelectors[++i];
									if (/^\w+$/.test(rule)) {
										continue;
									}
									prevElm.skipTag = true;
								}
							}
							var cssSelector = cssSelectorRegExp.exec(rule);
							var splitRule = {
								tag : (!cssSelector[1] || cssSelector[3] === "*")? "*" : cssSelector[1],
								id : (cssSelector[3] !== "*")? cssSelector[2] : null,
								allClasses : cssSelector[4],
								allAttr : cssSelector[6],
								allPseudos : cssSelector[10]
							};
							if (splitRule.id) {
								var DOMElm = document.getElementById(splitRule.id.replace(/#/, ""));
								if (DOMElm) {
									if (isChildOrSibling) {
										for (var mn=0, mnl=matchingElms.length; mn<mnl; mn++) {
											if (matchingElms[mn] === DOMElm) {
												matchingElms = [DOMElm];
												break;
											}
										}
									}
									else {
										matchingElms = [DOMElm];
									}
								}
								prevElm = matchingElms;
							}
							else if (splitRule.tag && !prevElm.skipTag) {
								if (!matchingElms.length && prevElm.length === 1) {
									if (!cachedElms[splitRule.tag]) {
										cachedElms[splitRule.tag] = (isIE && prevElm[0] === document)? ((splitRule.tag === "*")? document.all : document.all.tags(splitRule.tag)) : prevElm[0].getElementsByTagName(splitRule.tag);
									}
									prevElm = matchingElms = pushAll([], cachedElms[splitRule.tag]);
								}
								else {
									for (var n=0, nl=prevElm.length, tagCollectionMatches, tagMatch; n<nl; n++) {
										tagCollectionMatches = prevElm[n].getElementsByTagName(splitRule.tag);
										for (var o=0; (tagMatch=tagCollectionMatches[o]); o++) {
											if (!tagMatch.added) {
												tagMatch.added = true;
												matchingElms[matchingElms.length] = tagMatch;
											}
										}
									}
									prevElm = matchingElms;
									clearAdded();
								}
							}
							if (!matchingElms.length) {
								break;
							}
							prevElm.skipTag = false;
							if (splitRule.allClasses) {
								splitRule.allClasses = splitRule.allClasses.replace(/^\./, "").split(".");
								regExpClassNames = [];
								for (var qp=0, qpl=splitRule.allClasses.length; qp<qpl; qp++) {
									regExpClassNames[regExpClassNames.length] = new RegExp("(^|\\s)" + splitRule.allClasses[qp] + "(\\s|$)");
								}
								matchingClassElms = [];
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
											matchingClassElms[matchingClassElms.length] = current;
										}
									}
								}
								clearAdded();
								prevElm = matchingElms = matchingClassElms;
							}
							if (splitRule.allAttr) {
								splitRule.allAttr = splitRule.allAttr.match(/\[[^\]]+\]/g);
								regExpAttributes = [];
								attributeMatchRegExp = /(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/;
								for (var sp=0, spl=splitRule.allAttr.length, attributeMatch, attributeValue, attrVal; sp<spl; sp++) {
									attributeMatch = attributeMatchRegExp.exec(splitRule.allAttr[sp]);
									attributeValue = attributeMatch[3]? attributeMatch[3].replace(/\./g, "\\.") : null;
									attrVal = (attributeValue)? attrToRegExp(attributeValue, (attributeMatch[2] || null)) : null;
									regExpAttributes[regExpAttributes.length] = [attrVal, attributeMatch[1]];
								}
								matchingAttributeElms = [];
								for (var r=0, currentAttr; (current=matchingElms[r]); r++) {
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
										matchingAttributeElms[matchingAttributeElms.length] = current;
									}
								}
								prevElm = matchingElms = matchingAttributeElms;
							}
							if (splitRule.allPseudos) {
								var pseudoSplitRegExp = /:(\w[\w\-]*)(\(([^\)]+)\))?/;
								splitRule.allPseudos = splitRule.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);
								for (var y=0, yL=splitRule.allPseudos.length; y<yL; y++) {
									var pseudo = splitRule.allPseudos[y].match(pseudoSplitRegExp);
									var pseudoClass = pseudo[1]? pseudo[1].toLowerCase() : null;
									var pseudoValue = pseudo[3]? pseudo[3] : null;
									var previousMatch = matchingElms;
									matchingElms = [];
									prevParents = [];
									if (pseudoClass === "not") {
										pseudoValue = pseudoValue.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/, "[id=$1]");
										var notTag = /^(\w+)/.exec(pseudoValue);
										var notClass = /^\.([\w\u00C0-\uFFFF\-_]+)/.exec(pseudoValue);
										var notAttr = /\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/.exec(pseudoValue);
										var notRegExp = new RegExp("(^|\\s)" + (notTag? notTag[1] : notClass? notClass[1] : "") + "(\\s|$)", "i");
										if (notAttr) {
											var notAttribute = notAttr[3]? notAttr[3].replace(/\./g, "\\.") : null;
											var notMatchingAttrVal = attrToRegExp(notAttribute, notAttr[2]);
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
												matchingElms[matchingElms.length] = addElm;
											}
										}
									}
									else {
										switch (pseudoClass) {
											case "first-child":
												for (var u=0, prevSibling; (prevSibling=previous=previousMatch[u]); u++) {
													while ((prevSibling = prevSibling.previousSibling) && prevSibling.nodeType !== 1) {}
													if (!prevSibling) {
														matchingElms[matchingElms.length] = previous;
													}
												}
												break;
											case "last-child":
												for (var v=0, nextSibling; (nextSibling=previous=previousMatch[v]); v++) {
													while ((nextSibling = nextSibling.nextSibling) && nextSibling.nodeType !== 1) {}
													if (!nextSibling) {
														matchingElms[matchingElms.length] = previous;
													}
												}
												break;
											case "only-child":
												for (var w=0, oldParent; (previous=previousMatch[w]); w++) {
													prevParent = previous.parentNode;
													if (prevParent !== oldParent) {
														firstChild = prevParent.firstChild;
														lastChild = prevParent.lastChild;
														while (firstChild.nodeType !== 1 && (firstChild = firstChild.nextSibling)) {}
														while (lastChild.nodeType !== 1 && (lastChild = lastChild.previousSibling)) {}
														if (firstChild === previous && lastChild === previous) {
															matchingElms[matchingElms.length] = previous;
														}
														oldParent = prevParent;
													}
												}
												break;
											case "nth-child":
												if (/^n$/.test(pseudoValue)) {
													matchingElms = pushAll(matchingElms, previousMatch);
												}
												else {
													var sequence = DOMAssistant.getSequence(pseudoValue);
													if (sequence) {
														for (var z=0; (previous=previousMatch[z]); z++) {
															prevParent = previous.parentNode;
															if (!prevParent.childElms) {
																var iteratorNext = sequence.start, childCount = 0;
																var childElm = prevParent.firstChild;
																while (childElm && (sequence.max < 0 || iteratorNext <= sequence.max)) {
																	if (childElm.nodeType === 1) {
																		if (++childCount === iteratorNext) {
																			if (childElm.nodeName === previous.nodeName) {
																				matchingElms[matchingElms.length] = childElm;
																			}
																			iteratorNext += sequence.add;
																		}
																	}
																	childElm = childElm.nextSibling;
																}
																prevParent.childElms = true;
																prevParents[prevParents.length] = prevParent;
															}
														}
														clearChildElms();
													}
												}
												break;
											case "first-of-type":
												for (var zFirst=0; (previous=previousMatch[zFirst]); zFirst++) {
													firstChild = previous.parentNode.getElementsByTagName(previous.nodeName)[0];
													if (firstChild === previous) {
														matchingElms[matchingElms.length] = previous;
													}
												}
												break;
											case "last-of-type":
												for (var zLast=0; (previous=previousMatch[zLast]); zLast++) {
													lastChild = previous.parentNode.lastChild;
													while (lastChild.nodeName !== previous.nodeName) {
														lastChild = lastChild.previousSibling;
													}
													if (lastChild === previous) {
														matchingElms[matchingElms.length] = previous;
													}
												}
												break;
											case "only-of-type":
												for (var zOnly=0; (previous=previousMatch[zOnly]); zOnly++) {
													parentTagsByType = previous.parentNode.getElementsByTagName(previous.nodeName);
													if (parentTagsByType.length === 1) {
														matchingElms[matchingElms.length] = previous;
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
																childNodes[childNodes.length] = childNode;
															}
														}
														current = childNodes[childNodes.length - 1];
														if (current && current === previous) {
															matchingElms[matchingElms.length] = previous;
														}
													}
												}
												break;
											case "empty":
												for (var zEmpty=0; (previous=previousMatch[zEmpty]); zEmpty++) {
													childrenNodes = previous.parentNode.childNodes;
													if (!childrenNodes.length) {
														matchingElms[matchingElms.length] = previous;
													}
												}
												break;
											case "enabled":
												for (var zEnabled=0; (previous=previousMatch[zEnabled]); zEnabled++) {
													if (!previous.disabled) {
														matchingElms[matchingElms.length] = previous;
													}
												}
												break;
											case "disabled":
												for (var zDisabled=0; (previous=previousMatch[zDisabled]); zDisabled++) {
													if (previous.disabled) {
														matchingElms[matchingElms.length] = previous;
													}
												}
												break;
											case "checked":
												for (var zChecked=0; (previous=previousMatch[zChecked]); zChecked++) {
													if (previous.checked) {
														matchingElms[matchingElms.length] = previous;
													}
												}
												break;
											case "contains":
												for (var zContains=0; (previous=previousMatch[zContains]); zContains++) {
													if (!previous.added) {
														if (previous.innerText.indexOf(pseudoValue) !== -1) {
															previous.added = true;
															matchingElms[matchingElms.length] = previous;
														}
													}
												}
												break;
											default:
												for (var zDefault=0; (previous=previousMatch[zDefault]); zDefault++) {
													if (previous.getAttribute(pseudoClass, 2) === pseudoValue) {
														matchingElms[matchingElms.length] = previous;
													}
												}
												break;
										}
									}
									clearAdded(matchingElms);
								}
								prevElm = matchingElms;
							}
						}
						elm = pushAll(elm, prevElm);
					}
					return elm;	
				};
			}
			if (document.querySelectorAll) {
				var cssSelectionBackup = DOMAssistant.cssSelection;
				DOMAssistant.cssSelection = function (cssRule) {
					try {
						var elm = new HTMLArray();
						return pushAll(elm, this.querySelectorAll(cssRule));
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
			var cssRule = (tag? tag : "") + "." + className;
			return DOMAssistant.cssSelection.call(this, cssRule);
		},
	
		elmsByAttribute : function (attr, attrVal, tag, substrMatchSelector) {
			var cssRule = (tag? tag : "") + "[" + attr + ((attrVal && attrVal !== "*")? ((substrMatchSelector? substrMatchSelector : "") + "=" + attrVal + "]") : "]");
			return DOMAssistant.cssSelection.call(this, cssRule);
		},
	
		elmsByTag : function (tag) {
			return DOMAssistant.cssSelection.call(this, tag);
		}
	};	
}();
DOMAssistant.initCore();