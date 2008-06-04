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
	
		getSequence : function (expression) {
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
			var cssRules = cssRule.replace(/\s*(,)\s*/g, "$1").split(",");
			var elm = new HTMLArray();
			var prevElm = [], matchingElms = [];
			var prevParents, currentRule, identical, cssSelectors, childOrSiblingRef, nextTag, nextRegExp, regExpClassNames, matchingClassElms, regExpAttributes, matchingAttributeElms, attributeMatchRegExp, current, previous, prevParent, addElm, iteratorNext, childCount, childElm, sequence;
			var childOrSiblingRefRegExp = /^(>|\+|~)$/;
			var cssSelectorRegExp = /^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+)|(:\w+[\w\-]*))\))?)*)?/;
			var selectorSplitRegExp;
			try {
				selectorSplitRegExp = new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]", "g");
			}
			catch (e) {
				selectorSplitRegExp = /[^\s]+/g;
			}
			function clearAdded (elm) {
				elm = elm || prevElm;
				for (var n=0, nl=elm.length; n<nl; n++) {
					elm[n].added = null;
				}
			}
			function clearChildElms () {
				for (var n=0, nl=prevParents.length; n<nl; n++) {
					prevParents[n].childElms = null;
				}
			}
			function subtractArray (arr1, arr2) {
				for (var i=0, src1; (src1=arr1[i]); i++) {
					var found = false;
					for (var j=0, src2; (src2=arr2[j]); j++) {
						if (src2 === src1) {
							found = true;
							break;
						}
					}
					if (found) {
						arr1.splice(i--, 1);
					}
				}
				return arr1;
			}
			function getAttr (elm, attr) {
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
			function attrToRegExp (attrVal, substrOperator) {
				switch (substrOperator) {
					case "^": return "^" + attrVal;
					case "$": return attrVal + "$";
					case "*": return attrVal;
					case "|": return "(^" + attrVal + "(\\-\\w+)*$)";
					case "~": return "\\b" + attrVal + "\\b";
					default: return attrVal? "^" + attrVal + "$" : null;
				}
			}
			function getElementsByTagName (tag, parent) {
				tag = tag || "*";
				parent = parent || document;
				if (parent === document || parent.lastModified) {
					if (!cachedElms[tag]) {
						cachedElms[tag] = isIE? ((tag === "*")? document.all : document.all.tags(tag)) : document.getElementsByTagName(tag);
					}
					return cachedElms[tag];
				}
				return isIE? ((tag === "*")? parent.all : parent.all.tags(tag)) : parent.getElementsByTagName(tag);
			}
			function getElementsByPseudo (previousMatch, pseudoClass, pseudoValue) {
				prevParents = [];
				var direction = (/^first/.test(pseudoClass))? "previousSibling" : "nextSibling";
				var matchingElms = [], prev, next;
				switch (pseudoClass) {
					case "first-child":
					case "last-child":
						for (var j=0; (next=previous=previousMatch[j]); j++) {
							while ((next = next[direction]) && next.nodeType !== 1) {}
							if (!next) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "only-child":
						for (var k=0, kParent; (prev=next=previous=previousMatch[k]); k++) {
							prevParent = previous.parentNode;
							if (prevParent !== kParent) {
								while ((prev = prev.previousSibling) && prev.nodeType !== 1) {}
								while ((next = next.nextSibling) && next.nodeType !== 1) {}
								if (!prev && !next) {
									matchingElms[matchingElms.length] = previous;
								}
								kParent = prevParent;
							}
						}
						break;
					case "nth-child":
						if (/^n$/.test(pseudoValue)) {
							matchingElms = previousMatch;
						}
						else {
							sequence = DOMAssistant.getSequence(pseudoValue);
							if (sequence) {
								for (var l=0; (previous=previousMatch[l]); l++) {
									prevParent = previous.parentNode;
									if (!prevParent.childElms) {
										iteratorNext = sequence.start;
										childCount = 0;
										childElm = prevParent.firstChild;
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
					case "last-of-type":
						for (var n=0; (next=previous=previousMatch[n]); n++) {
							while ((next = next[direction]) && next.nodeName !== previous.nodeName) {}
							if (!next) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "only-of-type":
						for (var o=0, oParent; (prev=next=previous=previousMatch[o]); o++) {
							prevParent = previous.parentNode;
							if (prevParent !== oParent) {
								while ((prev = prev.previousSibling) && prev.nodeName !== previous.nodeName) {}
								while ((next = next.nextSibling) && next.nodeName !== previous.nodeName) {}
								if (!prev && !next) {
									matchingElms[matchingElms.length] = previous;
								}
								oParent = prevParent;
							}
						}
						break;
					case "nth-of-type":
						if (/^n$/.test(pseudoValue)) {
							matchingElms = previousMatch;
						}
						else {
							sequence = DOMAssistant.getSequence(pseudoValue);
							if (sequence) {
								for (var p=0; (previous=previousMatch[p]); p++) {
									prevParent = previous.parentNode;
									if (!prevParent.childElms) {
										iteratorNext = sequence.start;
										childCount = 0;
										childElm = prevParent.firstChild;
										while (childElm && (sequence.max < 0 || iteratorNext <= sequence.max)) {
											if (childElm.nodeName === previous.nodeName) {
												if (++childCount === iteratorNext) {
													matchingElms[matchingElms.length] = childElm;
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
					case "empty":
						for (var q=0; (previous=previousMatch[q]); q++) {
							if (!previous.childNodes.length) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "enabled":
						for (var r=0; (previous=previousMatch[r]); r++) {
							if (!previous.disabled) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "disabled":
						for (var s=0; (previous=previousMatch[s]); s++) {
							if (previous.disabled) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "checked":
						for (var t=0; (previous=previousMatch[t]); t++) {
							if (previous.checked) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "contains":
						for (var u=0; (previous=previousMatch[u]); u++) {
							if (!previous.added) {
								if (previous.innerHTML.indexOf(pseudoValue) !== -1) {
									previous.added = true;
									matchingElms[matchingElms.length] = previous;
								}
							}
						}
						break;
					case "not":
						if (/^(:\w+[\w\-]*)$/.test(pseudoValue)) {
							matchingElms = subtractArray(previousMatch, getElementsByPseudo(previousMatch, pseudoValue.slice(1)));
						}
						else {
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
							for (var v=0, notElm; (notElm=previousMatch[v]); v++) {
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
						break;
					default:
						for (var w=0; (previous=previousMatch[w]); w++) {
							if (previous.getAttribute(pseudoClass, 2) === pseudoValue) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
				}
				return matchingElms;
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
					matchingElms = [];
					if (i > 0 && childOrSiblingRefRegExp.test(rule)) {
						childOrSiblingRef = childOrSiblingRefRegExp.exec(rule);
						if (childOrSiblingRef) {
							nextTag = /^\w+/.exec(cssSelectors[i+1]);
							if (nextTag) {
								nextTag = nextTag[0];
								nextRegExp = new RegExp("(^|\\s)" + nextTag + "(\\s|$)", "i");
							}
							for (var j=0, prevRef; (prevRef=prevElm[j]); j++) {
								switch (childOrSiblingRef[0]) {
									case ">":
										var children = getElementsByTagName(nextTag, prevRef);
										for (var k=0, child; (child=children[k]); k++) {
											if (child.parentNode === prevRef) {
												matchingElms[matchingElms.length] = child;
											}
										}
										break;
									case "+":
										while ((prevRef = prevRef.nextSibling) && prevRef.nodeType !== 1) {}
										if (prevRef) {
											if (!nextTag || nextRegExp.test(prevRef.nodeName)) {
												matchingElms[matchingElms.length] = prevRef;
											}
										}
										break;
									case "~":
										while ((prevRef = prevRef.nextSibling) && !prevRef.added) {
											if (!nextTag || nextRegExp.test(prevRef.nodeName)) {
												prevRef.added = true;
												matchingElms[matchingElms.length] = prevRef;
											}
										}
										break;
								}
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
							matchingElms = [DOMElm];
						}
						prevElm = matchingElms;
					}
					else if (splitRule.tag && !prevElm.skipTag) {
						if (i===0 && !matchingElms.length && prevElm.length === 1) {
							prevElm = matchingElms = pushAll([], getElementsByTagName(splitRule.tag, prevElm[0]));
						}
						else {
							for (var l=0, ll=prevElm.length, tagCollectionMatches, tagMatch; l<ll; l++) {
								tagCollectionMatches = getElementsByTagName(splitRule.tag, prevElm[l]);
								for (var m=0; (tagMatch=tagCollectionMatches[m]); m++) {
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
						for (var n=0, nl=splitRule.allClasses.length; n<nl; n++) {
							regExpClassNames[regExpClassNames.length] = new RegExp("(^|\\s)" + splitRule.allClasses[n] + "(\\s|$)");
						}
						matchingClassElms = [];
						for (var o=0, elmClass; (current=prevElm[o]); o++) {
							elmClass = current.className;
							if (elmClass && !current.added) {
								addElm = false;
								for (var p=0, pl=regExpClassNames.length; p<pl; p++) {
									addElm = regExpClassNames[p].test(elmClass);
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
						for (var q=0, ql=splitRule.allAttr.length, attributeMatch, attributeValue, attrVal; q<ql; q++) {
							attributeMatch = attributeMatchRegExp.exec(splitRule.allAttr[q]);
							attributeValue = attributeMatch[3]? attributeMatch[3].replace(/\./g, "\\.") : null;
							attrVal = attrToRegExp(attributeValue, (attributeMatch[2] || null));
							regExpAttributes[regExpAttributes.length] = [(attrVal? new RegExp(attrVal) : null), attributeMatch[1]];
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
						for (var t=0, tl=splitRule.allPseudos.length; t<tl; t++) {
							var pseudo = splitRule.allPseudos[t].match(pseudoSplitRegExp);
							var pseudoClass = pseudo[1]? pseudo[1].toLowerCase() : null;
							var pseudoValue = pseudo[3]? pseudo[3] : null;
							matchingElms = getElementsByPseudo(matchingElms, pseudoClass, pseudoValue);
							clearAdded(matchingElms);
						}
						prevElm = matchingElms;
					}
				}
				elm = pushAll(elm, prevElm);
			}
			return elm;
		},
		
		cssSelect : function (cssRule) {
			return DOMAssistant.cssSelection.call(this, cssRule);
		},
	
		elmsByClass : function (className, tag) {
			var cssRule = (tag || "") + "." + className;
			return DOMAssistant.cssSelection.call(this, cssRule);
		},
	
		elmsByAttribute : function (attr, attrVal, tag, substrMatchSelector) {
			var cssRule = (tag || "") + "[" + attr + ((attrVal && attrVal !== "*")? ((substrMatchSelector || "") + "=" + attrVal + "]") : "]");
			return DOMAssistant.cssSelection.call(this, cssRule);
		},
	
		elmsByTag : function (tag) {
			return DOMAssistant.cssSelection.call(this, tag);
		}
	};	
}();
DOMAssistant.initCore();