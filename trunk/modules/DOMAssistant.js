// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7.3
var DOMAssistant = function () {
	var HTMLArray = function () {
		// Constructor
	};
	var isIE = /*@cc_on!@*/false;
	var cachedElms = [];
	var camel = {
		"accesskey": "accessKey",
		"class": "className",
		"colspan": "colSpan",
		"for": "htmlFor",
		"maxlength": "maxLength",
		"readonly": "readOnly",
		"rowspan": "rowSpan",
		"tabindex": "tabIndex",
		"valign": "vAlign",
		"cellspacing": "cellSpacing",
		"cellpadding": "cellPadding"
	};
	var regex = {
		rules: /\s*(,)\s*/g,
		selector: /^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+)|(:\w+[\w\-]*))\))?)*)?(>|\+|~)?/,
		id: /^#([\w\u00C0-\uFFFF\-\_]+)$/,
		tag: /^(\w+)/,
		relation: /(>|\+|~)/,
		pseudo: /^(:\w+[\w\-]*)$/,
		pseudos: /:(\w[\w\-]*)(\(([^\)]+)\))?/g,
		attribs: /\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+|"[^"]*"|'[^']*')?\]/g,
		classes: /\.([\w\u00C0-\uFFFF\-_]+)/g,
		quoted: /^["'](.*)["']$/,
		nth: /^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/
	};
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
		isIE : isIE,
		camel : camel,
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
		
		$ : function () {
			var obj = arguments[0];
			if (arguments.length === 1 && (typeof obj === "object" || (typeof obj === "function" && typeof obj.nodeName !== "undefined"))) {
				return DOMAssistant.$$(obj);
			}
			var elm = new HTMLArray();
			for (var i=0, arg, idMatch; (arg=arguments[i]); i++) {
				if (typeof arg === "string") {
					arg = arg.replace(/^[^#]*(#)/, "$1");
					if (regex.id.test(arg) && (idMatch = DOMAssistant.$$(arg.substr(1), false))) {
						elm.push(idMatch);
					}
					else {
						elm = pushAll(elm, DOMAssistant.cssSelection.call(document, arg));
					}
				}
			}
			return elm;
		},
		
		$$ : function (id, addMethods) {
			var elm = (typeof id === "object" || (typeof id === "function" && typeof id.nodeName !== "undefined"))? id : document.getElementById(id);
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
		
		getSequence : function (expression) {
			var start, add = 2, max = -1, modVal = -1;
			var pseudoValue = regex.nth.exec(expression);
			if (!pseudoValue) {
				return null;
			}
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
				start = pseudoValue[7]? parseInt(pseudoValue[7], 10) : 0;
				while (start < 1) {
					start += add;
				}
				modVal = (start > add)? (start - add) % add : ((start === add)? 0 : start);
			}
			else if (pseudoValue[8]) {	// -an+b
				add = pseudoValue[10]? parseInt(pseudoValue[10], 10) : 1;
				start = max = parseInt(pseudoValue[11], 10);
				while (start > add) {
					start -= add;
				}
				modVal = (max > add)? (max - add) % add : ((max === add)? 0 : max);
			}
			return { start: start, add: add, max: max, modVal: modVal };
		},
		
		cssByDOM : function (cssRule) {
			var cssRules = cssRule.replace(regex.rules, "$1").split(",");
			var elm = new HTMLArray();
			var prevElm = [], matchingElms = [];
			var prevParents, currentRule, identical, cssSelectors, childOrSiblingRef, nextTag, nextRegExp, regExpClassNames, matchingClassElms, regExpAttributes, matchingAttributeElms, current, previous, prevParent, notElm, addElm, iteratorNext, childCount, childElm, sequence;
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
				return isIE? elm[camel[attr.toLowerCase()] || attr] : elm.getAttribute(attr, 2);
			}
			function attrToRegExp (attrVal, substrOperator) {
				attrVal = attrVal? attrVal.replace(regex.quoted, "$1").replace(/\./g, "\\.") : null;
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
				var ie5 = isIE && parseFloat(navigator.appVersion) < 6;
				if (parent === document || parent.lastModified) {
					return cachedElms[tag] || (cachedElms[tag] = ie5? ((tag === "*")? document.all : document.all.tags(tag)) : document.getElementsByTagName(tag));
				}
				return ie5? ((tag === "*")? parent.all : parent.all.tags(tag)) : parent.getElementsByTagName(tag);
			}
			function getElementsByPseudo (previousMatch, pseudoClass, pseudoValue) {
				prevParents = [];
				var pseudo = pseudoClass.split("-"), matchingElms = [], idx = 0, checkNodeName;
				var prop = (checkNodeName = /\-of\-type$/.test(pseudoClass))? "nodeName" : "nodeType";
				function getPrevElm(elm) {
					var val = checkNodeName? elm.nodeName : 1;
					while ((elm = elm.previousSibling) && elm[prop] !== val) {}
					return elm;
				}
				function getNextElm(elm) {
					var val = checkNodeName? elm.nodeName : 1;
					while ((elm = elm.nextSibling) && elm[prop] !== val) {}
					return elm;
				}
				switch (pseudo[0]) {
					case "first":
						while ((previous=previousMatch[idx++])) {
							if (!getPrevElm(previous)) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "last":
						while ((previous=previousMatch[idx++])) {
							if (!getNextElm(previous)) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "only":
						var kParent;
						while ((previous=previousMatch[idx++])) {
							prevParent = previous.parentNode;
							if (prevParent !== kParent) {
								if (!getPrevElm(previous) && !getNextElm(previous)) {
									matchingElms[matchingElms.length] = previous;
								}
								kParent = prevParent;
							}
						}
						break;
					case "nth":
						if (/^n$/.test(pseudoValue)) {
							matchingElms = previousMatch;
						}
						else {
							var direction = (pseudo[1] === "last")? ["lastChild", "previousSibling"] : ["firstChild", "nextSibling"];
							sequence = DOMAssistant.getSequence.call(this, pseudoValue);
							if (sequence) {
								while ((previous=previousMatch[idx++])) {
									prevParent = previous.parentNode;
									if (!prevParent.childElms) {
										iteratorNext = sequence.start;
										childCount = 0;
										childElm = prevParent[direction[0]];
										while (childElm && (sequence.max < 0 || iteratorNext <= sequence.max)) {
											if (checkNodeName) {
												if (childElm.nodeName === previous.nodeName) {
													if (++childCount === iteratorNext) {
														matchingElms[matchingElms.length] = childElm;
														iteratorNext += sequence.add;
													}
												}
											}
											else {
												if (childElm.nodeType === 1) {
													if (++childCount === iteratorNext) {
														if (childElm.nodeName === previous.nodeName) {
															matchingElms[matchingElms.length] = childElm;
														}
														iteratorNext += sequence.add;
													}
												}
											}
											childElm = childElm[direction[1]];
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
						while ((previous=previousMatch[idx++])) {
							if (!previous.childNodes.length) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "enabled":
						while ((previous=previousMatch[idx++])) {
							if (!previous.disabled) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "disabled":
						while ((previous=previousMatch[idx++])) {
							if (previous.disabled) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "checked":
						while ((previous=previousMatch[idx++])) {
							if (previous.checked) {
								matchingElms[matchingElms.length] = previous;
							}
						}
						break;
					case "contains":
						pseudoValue = pseudoValue.replace(regex.quoted, "$1");
						while ((previous=previousMatch[idx++])) {
							if (!previous.added) {
								if (previous.innerText.indexOf(pseudoValue) !== -1) {
									previous.added = true;
									matchingElms[matchingElms.length] = previous;
								}
							}
						}
						break;
					case "target":
						var hash = document.location.hash.slice(1);
						if (hash) {
							while ((previous=previousMatch[idx++])) {
								if (getAttr(previous, "name") === hash || getAttr(previous, "id") === hash) {
									matchingElms[matchingElms.length] = previous;
									break;
								}
							}
						}
						break;
					case "not":
						if (regex.pseudo.test(pseudoValue)) {
							matchingElms = subtractArray(previousMatch, getElementsByPseudo(previousMatch, pseudoValue.slice(1)));
						}
						else {
							for (var re in regex) {
								if (regex[re].lastIndex) {
									regex[re].lastIndex = 0;
								}
							}
							pseudoValue = pseudoValue.replace(regex.id, "[id=$1]");
							var notTag = regex.tag.exec(pseudoValue);
							var notClass = regex.classes.exec(pseudoValue);
							var notAttr = regex.attribs.exec(pseudoValue);
							var notRegExp = new RegExp(notAttr? attrToRegExp(notAttr[3], notAttr[2]) : "(^|\\s)" + (notTag? notTag[1] : notClass? notClass[1] : "") + "(\\s|$)", "i");
							while ((notElm=previousMatch[idx++])) {
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
						while ((previous=previousMatch[idx++])) {
							if (getAttr(previous, pseudoClass) === pseudoValue) {
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
					if (i > 0 && regex.relation.test(rule)) {
						if ((childOrSiblingRef = regex.relation.exec(rule))) {
							if ((nextTag = regex.tag.exec(cssSelectors[i+1]))) {
								nextTag = nextTag[1];
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
					var cssSelector = regex.selector.exec(rule);
					var splitRule = {
						tag : (!cssSelector[1] || cssSelector[3] === "*")? "*" : cssSelector[1],
						id : (cssSelector[3] !== "*")? cssSelector[2] : null,
						allClasses : cssSelector[4],
						allAttr : cssSelector[6],
						allPseudos : cssSelector[11]
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
						var allClasses = splitRule.allClasses.replace(/^\./, "").split(".");
						regExpClassNames = [];
						for (var n=0, nl=allClasses.length; n<nl; n++) {
							regExpClassNames[n] = new RegExp("(^|\\s)" + allClasses[n] + "(\\s|$)");
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
						var allAttr = splitRule.allAttr.match(/\[[^\]]+\]/g);
						regExpAttributes = [];
						for (var q=0, ql=allAttr.length, attributeMatch, attrVal; q<ql; q++) {
							regex.attribs.lastIndex = 0;
							attributeMatch = regex.attribs.exec(allAttr[q]);
							attrVal = attrToRegExp(attributeMatch[3], attributeMatch[2] || null);
							regExpAttributes[q] = [(attrVal? new RegExp(attrVal) : null), attributeMatch[1]];
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
						var allPseudos = splitRule.allPseudos.match(regex.pseudos);
						for (var t=0, tl=allPseudos.length; t<tl; t++) {
							regex.pseudos.lastIndex = 0;
							var pseudo = regex.pseudos.exec(allPseudos[t]);
							var pseudoClass = pseudo[1]? pseudo[1].toLowerCase() : null;
							var pseudoValue = pseudo[3] || null;
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
		
		cssByXpath : function (cssRule) {
			var ns = { xhtml: "http://www.w3.org/1999/xhtml" };
			var prefix = (document.documentElement.namespaceURI === ns.xhtml)? "xhtml:" : "";
			var nsResolver = function lookupNamespaceURI (prefix) {
				return ns[prefix] || null;
			};
			DOMAssistant.cssByXpath = function (cssRule) {
				if (/:checked/.test(cssRule)) {
					return DOMAssistant.cssByDOM.call(this, cssRule);
				}
				var cssRules = cssRule.replace(regex.rules, "$1").split(",");
				var elm = new HTMLArray();
				var currentRule, identical, cssSelectors, xPathExpression, cssSelector, splitRule, sequence;
				var selectorSplitRegExp = new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]", "g");
				function attrToXPath (match, p1, p2, p3) {
					p3 = p3? p3.replace(regex.quoted, "$1") : p3;
					switch (p2) {
						case "^": return "starts-with(@" + p1 + ", \"" + p3 + "\")";
						case "$": return "substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), " + p3.length + ") = \"" + p3 + "\"";
						case "*": return "contains(concat(\" \", @" + p1 + ", \" \"), \"" + p3 + "\")";
						case "|": return "(@" + p1 + "=\"" + p3 + "\" or starts-with(@" + p1 + ", \"" + p3 + "-\"))";
						case "~": return "contains(concat(\" \", @" + p1 + ", \" \"), \" " + p3 + " \")";
						default: return "@" + p1 + (p3? "=\"" + p3 + "\"" : "");
					}
				}
				function attrToXPathB (match, p1, p2, p3) {
					return "[" + attrToXPath(match, p1, p2, p3) + "]";
				}
				function pseudoToXPath (tag, pseudoClass, pseudoValue) {
					tag = /\-child$/.test(pseudoClass)? "*" : tag;
					var xpath = "", pseudo = pseudoClass.split("-");
					switch (pseudo[0]) {
						case "first":
							xpath = "not(preceding-sibling::" + tag + ")";
							break;
						case "last":
							xpath = "not(following-sibling::" + tag + ")";
							break;
						case "only":
							xpath = "not(preceding-sibling::" + tag + " or following-sibling::" + tag + ")";
							break;
						case "nth":
							if (!/^n$/.test(pseudoValue)) {
								var position = ((pseudo[1] === "last")? "(count(following-sibling::" : "(count(preceding-sibling::") + tag + ") + 1)";
								if ((sequence = DOMAssistant.getSequence.call(this, pseudoValue))) {
									xpath = (sequence.start === sequence.max)?
										position + " = " + sequence.start :
										position + " mod " + sequence.add + " = " + sequence.modVal + ((sequence.start > 1)? " and " + position + " >= " + sequence.start : "") + ((sequence.max > 0)? " and " + position + " <= " + sequence.max: "");
								}
							}
							break;
						case "empty":
							xpath = "count(child::*) = 0 and string-length(text()) = 0";
							break;
						case "contains":
							xpath = "contains(., \"" + pseudoValue.replace(regex.quoted, "$1") + "\")";
							break;
						case "enabled":
							xpath = "not(@disabled)";
							break;
						case "disabled":
							xpath = "@disabled";
							break;
						case "target":
							var hash = document.location.hash.slice(1);
							xpath = "@name=\"" + hash + "\" or @id=\"" + hash + "\"";
							break;
						case "not":
							var notSelector = regex.pseudo.test(pseudoValue)?
								pseudoToXPath(tag, pseudoValue.slice(1)) :
								pseudoValue.replace(regex.id, "[id=$1]")
									.replace(regex.tag, "self::$1")
									.replace(regex.classes, "contains(concat(\" \", @class, \" \"), \" $1 \")")
									.replace(regex.attribs, attrToXPath);
							xpath = "not(" + notSelector + ")";
							break;
						default:
							xpath = "@" + pseudoClass + "=\"" + pseudoValue + "\"";
							break;
					}
					return xpath;
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
						cssSelector = regex.selector.exec(cssSelectors[j]);
						splitRule = {
							tag : prefix + ((!cssSelector[1] || cssSelector[3] === "*")? "*" : cssSelector[1]),
							id : (cssSelector[3] !== "*")? cssSelector[2] : null,
							allClasses : cssSelector[4],
							allAttr : cssSelector[6],
							allPseudos : cssSelector[11],
							tagRelation : cssSelector[23]
						};
						if (splitRule.tagRelation) {
							var mapping = { ">": "/child::", "+": "/following-sibling::*[1]/self::", "~": "/following-sibling::" };
							xPathExpression += mapping[splitRule.tagRelation] || "";
						}
						else {
							xPathExpression += (j > 0 && regex.relation.test(cssSelectors[j-1]))? splitRule.tag : ("/descendant::" + splitRule.tag);
						}
						if (splitRule.id) {
							xPathExpression += "[@id = \"" + splitRule.id.replace(/^#/, "") + "\"]";
						}
						if (splitRule.allClasses) {
							xPathExpression += splitRule.allClasses.replace(regex.classes, "[contains(concat(\" \", @class, \" \"), \" $1 \")]");
						}
						if (splitRule.allAttr) {
							xPathExpression += splitRule.allAttr.replace(regex.attribs, attrToXPathB);
						}
						if (splitRule.allPseudos) {
							var allPseudos = splitRule.allPseudos.match(regex.pseudos);
							for (var k=0, kl=allPseudos.length; k<kl; k++) {
								regex.pseudos.lastIndex = 0;
								var pseudo = regex.pseudos.exec(allPseudos[k]);
								var pseudoClass = pseudo[1]? pseudo[1].toLowerCase() : null;
								var pseudoValue = pseudo[3] || null;
								var xpath = pseudoToXPath(splitRule.tag, pseudoClass, pseudoValue);
								if (xpath.length) {
									xPathExpression += "[" + xpath + "]";
								}
							}
						}
					}
					var xPathNodes = document.evaluate(xPathExpression, this, nsResolver, 0, null), node;
					while ((node = xPathNodes.iterateNext())) {
						elm.push(node);
					}
				}
				return elm;
			};
			return DOMAssistant.cssByXpath.call(this, cssRule);
		},
		
		cssSelection : function (cssRule) {
			DOMAssistant.cssSelection = document.evaluate? DOMAssistant.cssByXpath : DOMAssistant.cssByDOM;
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