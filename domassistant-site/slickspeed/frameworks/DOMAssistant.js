// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation, version 2.8
var DOMAssistant = function () {
	var HTMLArray = function () {
		// Constructor
	},
	isIE = /*@cc_on!@*/false,
	ie5 = isIE && parseFloat(navigator.appVersion) < 6,
	tagCache = {}, lastCache = {}, useCache = true,
	camel = {
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
	},
	regex = {
		rules: /\s*(,)\s*/g,
		selector: /^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+\s*(\^|\$|\*|\||~)?(=\s*([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.\'\"]+\]+)|(:\w+[\w\-]*))\))?)*)?(>|\+|~)?/,
		id: /^#([\w\u00C0-\uFFFF\-\_]+)$/,
		tag: /^(\w+)/,
		relation: /^(>|\+|~)$/,
		pseudo: /^:(\w[\w\-]*)(\((.+)\))?$/,
		pseudos: /:(\w[\w\-]*)(\(([^\)]+)\))?/g,
		attribs: /\[(\w+)\s*(\^|\$|\*|\||~)?=?\s*([\w\u00C0-\uFFFF\s\-_\.]+|"[^"]*"|'[^']*')?\]/g,
		classes: /\.([\w\u00C0-\uFFFF\-_]+)/g,
		quoted: /^["'](.*)["']$/,
		nth: /^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/
	},
	contains = function (array, value) {
		if (array.indexOf) { return array.indexOf(value) >= 0; }
		for (var i=0, iL=array.length; i<iL; i++) {
			if (array[i] === value) { return true; }
		}
		return false;
	},
	isDescendant = function (node, ancestor) {
		var parent = node.parentNode;
		return ancestor === document || parent === ancestor || (parent !== document && isDescendant(parent, ancestor));
	},
	navigate = function (node, direction, checkTagName) {
		var oldName = node.tagName;
		while ((node = node[direction + "Sibling"]) && (node.nodeType !== 1 || (checkTagName? node.tagName !== oldName : node.tagName === "!"))) {}
		return node;
	},
	def = function (obj) {
		return typeof obj !== "undefined";
	};
	var pushAll = function (set1, set2) {
		set1.push.apply(set1, [].slice.apply(set2));
		return set1;
	};
	if (isIE) {
		pushAll = function (set1, set2) {
			if (set2.slice) {
				return set1.concat(set2);
			}
			var i=0, item;
			while ((item = set2[i++])) {
				set1[set1.length] = item;
			}
			return set1;
		};
	}
	return {
		isIE : isIE,
		camel : camel,
		def : def,
		allMethods : [],
		publicMethods : [
			"prev",
			"next",
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
			HTMLArray.prototype.each = function (fn) {
				for (var i=0, il=this.length; i<il; i++) {
					fn.call(this[i], i);
				}
				return this;
			};
			HTMLArray.prototype.first = function () {
				return def(this[0])? DOMAssistant.addMethodsToElm(this[0]) : null;
			};
			HTMLArray.prototype.end = function () {
				return this.previousSet;
			};
			HTMLArray.prototype.indexOf = HTMLArray.prototype.indexOf || function (elm) {
				for (var i=0, il=this.length; i<il; i++) {
					if (i in this && this[i] === elm) {
						return i;
					}
				}
				return -1;
			};
			HTMLArray.prototype.map = function (fn) {
				var res = [];
				for (var i=0, il=this.length; i<il; i++) {
					if (i in this) {
						res[i] = fn.call(this[i], i);
					}
				}
				return res;
			};
			HTMLArray.prototype.filter = function (fn) {
				var res = new HTMLArray();
				res.previousSet = this;
				for (var i=0, il=this.length; i<il; i++) {
					if (i in this && fn.call(this[i], i)) {
						res.push(this[i]);
					}
				}
				return res;
			};
			HTMLArray.prototype.every = function (fn) {
				for (var i=0, il=this.length; i<il; i++) {
					if (i in this && !fn.call(this[i], i)) {
						return false;
					}
				}
				return true;
			};
			HTMLArray.prototype.some = function (fn) {
				for (var i=0, il=this.length; i<il; i++) {
					if (i in this && fn.call(this[i], i)) {
						return true;
					}
				}
				return false;
			};
			this.attach(this);
		},
		
		addMethods : function (name, method) {
			if (!def(this.allMethods[name])) {
				this.allMethods[name] = method;
				this.addHTMLArrayPrototype(name, method);
			}
		},
		
		addMethodsToElm : function (elm) {
			for (var method in this.allMethods) {
				if (def(this.allMethods[method])) {
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
			if (!def(publicMethods)) {
				for (var method in plugin) {
					if (method !== "init" && def(plugin[method])) {
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
					if (!!elms && elms.constructor === Array) {
						elmsToReturn = pushAll(elmsToReturn, elms);
					}
					else {
						elmsToReturn.push(elms);
					}
				}
				return elmsToReturn;
			};
		},
		
		clearHandlers : function () {
			var children = this.all || this.getElementsByTagName("*");
			for (var i=0, child, attr; (child=children[i++]);) {
				if (child.uniqueHandlerId && (attr = child.attributes)) {
					for (var j=0, jl=attr.length, att; j<jl; j++) {
						att = attr[j].nodeName.toLowerCase();
						if (typeof child[att] === "function") {
							child[att] = null;
						}
					}
				}
			}
		},
		
		setCache : function (cache) {
			useCache = cache;
		},
		
		$ : function () {
			var obj = arguments[0];
			if (arguments.length === 1 && (typeof obj === "object" || (typeof obj === "function" && !!obj.nodeName))) {
				return DOMAssistant.$$(obj);
			}
			var elm = new HTMLArray();
			for (var i=0, arg, idMatch; (arg=arguments[i]); i++) {
				if (typeof arg === "string") {
					arg = arg.replace(/^[^#]*(#)/, "$1");
					if (regex.id.test(arg)) {
						if ((idMatch = DOMAssistant.$$(arg.substr(1), false))) {
							elm.push(idMatch);
						}
					}
					else {
						var doc = (document.all || document.getElementsByTagName("*")).length;
						elm = (!document.querySelectorAll && useCache && lastCache.rule && lastCache.rule === arg && lastCache.doc === doc)? lastCache.elms : pushAll(elm, DOMAssistant.cssSelection.call(document, arg));
						lastCache = { rule: arg, elms: elm, doc: doc };
					}
				}
			}
			return elm;
		},
		
		$$ : function (id, addMethods) {
			var elm = (typeof id === "object" || (typeof id === "function" && !!id.nodeName))? id : document.getElementById(id);
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
		
		prev : function () {
			return DOMAssistant.$$(navigate(this, "previous"));
		},

		next : function () {
			return DOMAssistant.$$(navigate(this, "next"));
		},

		getSequence : function (expression) {
			var start, add = 2, max = -1, modVal = -1,
				pseudoVal = regex.nth.exec(expression.replace(/^0n\+/, "").replace(/^2n$/, "even").replace(/^2n+1$/, "odd"));
			if (!pseudoVal) {
				return null;
			}
			if (pseudoVal[2]) {	// odd or even
				start = (pseudoVal[2] === "odd")? 1 : 2;
				modVal = (start === 1)? 1 : 0;
			}
			else if (pseudoVal[3]) {	// single digit
				start = max = parseInt(pseudoVal[3], 10);
				add = 0;
			}
			else if (pseudoVal[4]) {	// an+b
				add = pseudoVal[6]? parseInt(pseudoVal[6], 10) : 1;
				start = pseudoVal[7]? parseInt(pseudoVal[7], 10) : 0;
				while (start < 1) {
					start += add;
				}
				modVal = (start >= add)? (start - add) % add : start;
			}
			else if (pseudoVal[8]) {	// -an+b
				add = pseudoVal[10]? parseInt(pseudoVal[10], 10) : 1;
				start = max = parseInt(pseudoVal[11], 10);
				while (start > add) {
					start -= add;
				}
				modVal = (max >= add)? (max - add) % add : max;
			}
			return { start: start, add: add, max: max, modVal: modVal };
		},
		
		cssByDOM : function (cssRule) {
			var cssRules = cssRule.replace(regex.rules, "$1").split(",");
			var elm = new HTMLArray(), prevElm = [], matchingElms = [];
			var selectorSplitRegExp, prevParents, currentRule, cssSelectors, childOrSiblingRef, nextTag, nextRegExp, current, previous, prevParent, notElm, addElm, iteratorNext, childElm, sequence;
			try {
				selectorSplitRegExp = new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]", "g");
			}
			catch (e) {
				selectorSplitRegExp = /[^\s]+/g;
			}
			function clearAdded (elm) {
				elm = elm || prevElm;
				for (var n=0, nl=elm.length; n<nl; n++) {
					elm[n].removeAttribute("added");
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
							arr2.splice(j, 1);
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
					case "|": return "^" + attrVal + "(\\-\\w+)*$";
					case "~": return "\\b" + attrVal + "\\b";
					default: return attrVal? "^" + attrVal + "$" : null;
				}
			}
			function getTags (tag, context) {
				return ie5? ((tag === "*")? context.all : context.all.tags(tag)) : context.getElementsByTagName(tag);
			}
			function getElementsByTagName (tag, parent) {
				tag = tag || "*";
				parent = parent || document;
				return (parent === document || parent.lastModified)? tagCache[tag] || (tagCache[tag] = getTags(tag, document)) : getTags(tag, parent);
			}
			function getElementsByPseudo (previousMatch, pseudoClass, pseudoValue) {
				prevParents = [];
				var pseudo = pseudoClass.split("-"), matchingElms = [], idx = 0, checkNodeName = /\-of\-type$/.test(pseudoClass), recur,
				match = {
					first: function(el) { return !navigate(el, "previous", checkNodeName); },
					last: function(el) { return !navigate(el, "next", checkNodeName); },
					empty: function(el) { return !el.firstChild; },
					enabled: function(el) { return !el.disabled && el.type !== "hidden"; },
					disabled: function(el) { return el.disabled; },
					checked: function(el) { return el.checked; },
					contains: function(el) { return (el.innerText || el.textContent || "").indexOf(pseudoValue.replace(regex.quoted, "$1")) > -1; },
					other: function(el) { return getAttr(el, pseudoClass) === pseudoValue; }
				};
				function basicMatch(key) {
					while ((previous=previousMatch[idx++])) {
						if (match[key](previous)) {
							matchingElms[matchingElms.length] = previous;
						}
					}
					return matchingElms;
				}
				var word = pseudo[0] || null;
				if (word && match[word]) {
					return basicMatch(word);
				}
				switch (word) {
					case "only":
						var kParent;
						while ((previous=previousMatch[idx++])) {
							prevParent = previous.parentNode;
							if (prevParent !== kParent) {
								if (match.first(previous) && match.last(previous)) {
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
							sequence = DOMAssistant.getSequence(pseudoValue);
							if (sequence) {
								while ((previous=previousMatch[idx++])) {
									prevParent = previous.parentNode;
									if (!prevParent.childElms) {
										var childCount = 0, p = previous.nodeName;
										iteratorNext = sequence.start;
										childElm = prevParent[direction[0]];
										while (childElm && (sequence.max < 0 || iteratorNext <= sequence.max)) {
											var c = childElm.nodeName;
											if ((checkNodeName && c === p) || (!checkNodeName && childElm.nodeType === 1 && c !== "!")) {
												if (++childCount === iteratorNext) {
													if (c === p) { matchingElms[matchingElms.length] = childElm; }
													iteratorNext += sequence.add;
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
						if ((recur = regex.pseudo.exec(pseudoValue))) {
							matchingElms = subtractArray(previousMatch, getElementsByPseudo(previousMatch, recur[1]? recur[1].toLowerCase() : null, recur[3] || null));
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
								if (notTag && !notRegExp.test(notElm.nodeName) || notClass && !notRegExp.test(notElm.className)) {
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
					default: return basicMatch("other");
				}
				return matchingElms;
			}
			for (var a=0; (currentRule=cssRules[a]); a++) {
				if (a && contains(cssRules.slice(0, a), currentRule)) { continue; }
				prevElm = [this];
				cssSelectors = currentRule.match(selectorSplitRegExp);
				for (var i=0, rule; (rule=cssSelectors[i]); i++) {
					matchingElms = [];
					if (i > 0 && regex.relation.test(rule)) {
						if ((childOrSiblingRef = regex.relation.exec(rule))) {
							var idElm = null, nextWord = cssSelectors[i+1];
							if ((nextTag = regex.tag.exec(nextWord))) {
								nextTag = nextTag[1];
								nextRegExp = new RegExp("(^|\\s)" + nextTag + "(\\s|$)", "i");
							}
							else if (regex.id.test(nextWord)) {
								idElm = DOMAssistant.$(nextWord) || null;
							}
							for (var j=0, prevRef; (prevRef=prevElm[j]); j++) {
								switch (childOrSiblingRef[0]) {
									case ">":
										var children = idElm || getElementsByTagName(nextTag, prevRef);
										for (var k=0, child; (child=children[k]); k++) {
											if (child.parentNode === prevRef) {
												matchingElms[matchingElms.length] = child;
											}
										}
										break;
									case "+":
										if ((prevRef = navigate(prevRef, "next"))) {
											if ((idElm && idElm[0] === prevRef) || (!idElm && (!nextTag || nextRegExp.test(prevRef.nodeName)))) {
												matchingElms[matchingElms.length] = prevRef;
											}
										}
										break;
									case "~":
										while ((prevRef = prevRef.nextSibling) && !prevRef.added) {
											if ((idElm && idElm[0] === prevRef) || (!idElm && (!nextTag || nextRegExp.test(prevRef.nodeName)))) {
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
							if (/^\w+$/.test(rule) || regex.id.test(rule)) {
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
						var u = 0, DOMElm = document.getElementById(splitRule.id.replace(/#/, ""));
						if (DOMElm) {
							while (prevElm[u] && !isDescendant(DOMElm, prevElm[u])) { u++; }
							matchingElms = (u < prevElm.length)? [DOMElm] : [];
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
						var n = 0, matchingClassElms = [], allClasses = splitRule.allClasses.split(".").slice(1);
						while ((current = prevElm[n++])) {
							var matchCls = true, elmClass = current.className;
							if (elmClass && elmClass.length) {
								elmClass = elmClass.split(" ");
								for (var o=0, ol=allClasses.length; o<ol; o++) {
									if (!contains(elmClass, allClasses[o])) {
										matchCls = false;
										break;
									}
								}
								if (matchCls) {
									matchingClassElms[matchingClassElms.length] = current;
								}
							}
						}
						prevElm = matchingElms = matchingClassElms;
					}
					if (splitRule.allAttr) {
						var r = 0, regExpAttributes = [], matchingAttributeElms = [], allAttr = splitRule.allAttr.match(/\[[^\]]+\]/g);
						for (var q=0, ql=allAttr.length, attributeMatch, attrVal; q<ql; q++) {
							regex.attribs.lastIndex = 0;
							attributeMatch = regex.attribs.exec(allAttr[q]);
							attrVal = attrToRegExp(attributeMatch[3], attributeMatch[2] || null);
							regExpAttributes[q] = [(attrVal? new RegExp(attrVal) : null), attributeMatch[1]];
						}
						while ((current = matchingElms[r++])) {
							for (var s=0, sl=regExpAttributes.length; s<sl; s++) {
								var matchAttr = true, attributeRegExp = regExpAttributes[s][0], currentAttr = getAttr(current, regExpAttributes[s][1]);
								if (!attributeRegExp && currentAttr === true) { continue; }
								if ((!attributeRegExp && (!currentAttr || typeof currentAttr !== "string" || !currentAttr.length)) || (!!attributeRegExp && !attributeRegExp.test(currentAttr))) {
									matchAttr = false;
									break;
								}
							}
							if (matchAttr) {
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
				var currentRule, cssSelectors, xPathExpression, cssSelector, splitRule, sequence;
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
					var xpath = "", pseudo = pseudoClass.split("-"), recur;
					switch (pseudo[0]) {
						case "nth":
							if (!/^n$/.test(pseudoValue)) {
								var position = ((pseudo[1] === "last")? "(count(following-sibling::" : "(count(preceding-sibling::") + tag + ") + 1)";
								if ((sequence = DOMAssistant.getSequence(pseudoValue))) {
									xpath = (sequence.start === sequence.max)?
										position + " = " + sequence.start :
										position + " mod " + sequence.add + " = " + sequence.modVal + ((sequence.start > 1)? " and " + position + " >= " + sequence.start : "") + ((sequence.max > 0)? " and " + position + " <= " + sequence.max: "");
								}
							}
							break;
						case "not":
							var notSelector = (recur = regex.pseudo.exec(pseudoValue))?
								pseudoToXPath(tag, recur[1]? recur[1].toLowerCase() : null, recur[3] || null) :
								pseudoValue.replace(regex.id, "[id=$1]")
									.replace(regex.tag, "self::$1")
									.replace(regex.classes, "contains(concat(\" \", @class, \" \"), \" $1 \")")
									.replace(regex.attribs, attrToXPath);
							xpath = "not(" + notSelector + ")";
							break;
						case "first": return "not(preceding-sibling::" + tag + ")";
						case "last": return "not(following-sibling::" + tag + ")";
						case "only": return "not(preceding-sibling::" + tag + " or following-sibling::" + tag + ")";
						case "empty": return "count(child::*) = 0 and string-length(text()) = 0";
						case "contains": return "contains(., \"" + pseudoValue.replace(regex.quoted, "$1") + "\")";
						case "enabled": return "not(@disabled) and not(@type=\"hidden\")";
						case "disabled": return "@disabled";
						case "target": var hash = document.location.hash.slice(1); return "@name=\"" + hash + "\" or @id=\"" + hash + "\"";
						default: return "@" + pseudoClass + "=\"" + pseudoValue + "\"";
					}
					return xpath;
				}
				for (var i=0; (currentRule=cssRules[i]); i++) {
					if (i && contains(cssRules.slice(0, i), currentRule)) { continue; }
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
							xPathExpression += { ">": "/child::", "+": "/following-sibling::*[1]/self::", "~": "/following-sibling::" }[splitRule.tagRelation] || "";
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
						return pushAll(new HTMLArray(), this.querySelectorAll(cssRule));
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