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
		elmsByAttribute : function (attr, attrVal, tag) {
			var elmsWithAttr = new HTMLArray();
			var elms;
			for (var i=0, il=this.length; i<il; i++) {
				elms = this.DOM.elmsByAttribute.call(this[i], attr, attrVal, tag);
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
	
	return{
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
					div:first-child
					div:last-child
					div:only-child
					div:empty
					div:nth-child(3)
					div:nth-child(odd)
					div:nth-child(even)
					div:nth-child(n3+3)
				
					Not implemented:
					[id~=container] Space-separated list
					[id|=] Hyphen-separated list
				*/
				var arg = arguments[0];
				if (typeof arg === "string" && /[\*>\+#\.\[\s\:]/.test(arg)) {
					var cssSelectors = arg.split(" ");
					var prevElm = new HTMLArray();
					prevElm.push(DOMAssistant.$(document));
					var idMatch;
					var matchingElms, childOrSiblingRef, nextTag, nextRegExp, refSeparator, refPrevElm, nextSib, refPrevElmFound;
					for (var i=0, il=cssSelectors.length; i<il; i++) {
						matchingElms = new HTMLArray();
						var rule = cssSelectors[i];
						//alert("Rule: " + rule);
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
									else{
										if (/>/.test(refSeparator)) {
											children = refPrevElm.childNodes;
											refPrevElmFound = true;
										}
										else{
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
						else{
							if (/^(\w+|\*)/.test(rule)) {
								/^(\w+|\*)/.exec(rule);
								matchingElms = prevElm.elmsByTag(RegExp.$1);
							}
							if (/#\w+/.test(rule)) {
								var id = /\w*#(\w+[\w\-]+)/.exec(rule);
								rule = rule.replace(/\w*#(\w+[\w\-\_]+)/, "");
								idMatch = document.getElementById(RegExp.$1);
								matchingElms.push(idMatch);
							}
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
									else{
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
													else{
														break;
													}
												}
											}
											matchingElms = followingMatchingElms;
										}
									}
								}
							}
							var attributeMatch = /(\w+)?\[(\w+)=?([\w\-\_]+)?\]/.exec(rule);
							if (attributeMatch) {
								var attributeSelectors = rule.replace(/(\])(\[)/, "$1 $2").split(" ");
								var obj = (matchingElms.length > 0)? matchingElms : prevElm;
								for (var p=0, pl=attributeSelectors.length; p<pl; p++) {
									attributeMatch = /(\w+)?\[(\w+)=?(\w+)?\]/.exec(attributeSelectors[p]);
									var attribute = RegExp.$2;
									var tag = RegExp.$1;
									var attrVal = RegExp.$3;
									var currentAttr;
									if (idMatch && matchingElms.length > 0) {
										matchingElms = new HTMLArray();
										currentAttr = idMatch.getAttribute(attribute);
										if (typeof currentAttr === "string" && currentAttr.length > 0) {
								            if (attrVal.length > 0 && new RegExp("(^|\\s)" + attrVal + "(\\s|$)").test(currentAttr)) {
												matchingElms.push(idMatch);
								            }
								        }
									}
									else{
										matchingElms = obj.elmsByAttribute(attribute, ((attrVal.length > 0)? attrVal : "*"), ((tag.length > 0)? tag : "*"));
										if (!matchingElms.length > 0) {
											break;
										}
									}
								}
							}
							var pseudoMatch = /:(\w+[\w\-]*)(\(((odd|even)|\d+n?((\+|\-)\d+)?)\))?/.exec(rule);
							if (pseudoMatch && matchingElms.length > 0) {
								var pseudoClass = RegExp.$1;
								var nthSelector = RegExp.$3;
								var previousMatch = matchingElms;
								matchingElms = new HTMLArray();
								//alert(pseudoClass + "\nnumber: " + nthSelector);
								if (/(\bchild\b)|empty/.test(pseudoClass)) {
									for (var q=0, ql=previousMatch.length, previous, childrenNodes, childNodes, firstChild, lastChild; q<ql; q++) {
										previous = previousMatch[q];
										childrenNodes = (/(first|last|only)-child/.test(pseudoClass))? previous.parentNode.childNodes : previous.childNodes;
										if (childrenNodes.length === 0 && /empty/.test(pseudoClass)) {
											matchingElms.push(previous);
										}
										childNodes = [];
										for (var r=0, rl=childrenNodes.length, currentChild; r<rl; r++) {
											currentChild = childrenNodes[r];
											if (currentChild.nodeType === 1) {
												childNodes.push(currentChild);
											}
										}
										if (childNodes.length > 0) {
											if (/first-child/.test(pseudoClass) && previous === childNodes[0]) {
												matchingElms.push(previous);
											}
											else if (/last-child/.test(pseudoClass) && previous === childNodes[childNodes.length - 1]) {
												 matchingElms.push(previous);
											}
											if (/only-child/.test(pseudoClass) && childNodes.length === 1) {
												matchingElms.push(previous);
											}
											else if (/nth-child/.test(pseudoClass)) {
												if (/^\d+$/.test(nthSelector)) {
													matchingElms.push(childNodes[nthSelector-1]);
												}
												else if (/^(odd|even)|(\d+)n((\+|\-)(\d+))?$/.exec(nthSelector)) {
													//alert(RegExp.$1 + "\n" + RegExp.$2 + "\n" + RegExp.$3 + "\n" + RegExp.$4 + "\n" + RegExp.$5 + "\n" + RegExp.$6);
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
													for (var s=iteratorStart, sl=childNodes.length; s<sl; s=s+iteratorAdd) {
														if (s < 0) {
															continue;
														}
														matchingElms.push(childNodes[s]);
													}
												}
											}
										}
									}
								}
								prevElm = matchingElms;
							}
							idMatch = null;
							prevElm = matchingElms;
						}
					}
					elm = prevElm;
				}
				else{
					elm = (arguments.length > 1)? new HTMLArray() : null;
					var current;
					for (var t=0, tl=arguments.length; t<tl; t++) {
						current = arguments[t];
						if (typeof current !== "object") {
							current = document.getElementById(current);
						}
						if (arguments.length > 1) {
							elm.push(current);
						}
						else{
							elm = current;
						}
					}
				}
				DOMAssistant.addMethods(elm);
			}
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
			else{
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
	
		elmsByAttribute : function (attr, attrVal, tag) {
			if (!document.evaluate) {
				DOMAssistant.elmsByAttribute = function (attr, attrVal, tag) {
					var returnElms = new HTMLArray();
					var attributeVal = (typeof attrVal === "undefined" || attrVal === "*")? "" : " = '" + attrVal + "'";
					var xPathNodes = document.evaluate(".//" + (tag || "*") + "[@" + attr + attributeVal + "]", this, null, 0, null);
					var node = xPathNodes.iterateNext();
					while(node) {
						returnElms.push(node);
						node = xPathNodes.iterateNext();
					}
					return returnElms;
				};
			}
			else{
				DOMAssistant.elmsByAttribute = function (attr, attrVal, tag) {
					var returnElms = new HTMLArray();
					var attributeVal = (typeof attrVal === "undefined" || attrVal === "*")? null : new RegExp("(^|\\s)" + attrVal + "(\\s|$)");
					var elms = ((!tag || tag === "*") && this.all)? this.all : this.getElementsByTagName(tag || "*");
					alert(attr + "\n" + attributeVal + "\n" + tag);
				    for (var i=0,il=elms.length,current,currentAttr; i<il; i++) {
				        current = elms[i];
				        currentAttr = current.getAttribute(attr, 2);
				        if (typeof currentAttr === "string" && currentAttr.length > 0) {
				            if (!attributeVal || typeof attributeVal === "undefined" || (attributeVal && attributeVal.test(currentAttr))) {
								returnElms.push(current);
				            }
				        }
				    }
					return returnElms;
				};
			}
		    return DOMAssistant.elmsByAttribute.call(this, attr, attrVal, tag);
		},
	
		elmsByTag : function (tag) {
			var returnElms = new HTMLArray();
			var elmsWithTag = this.getElementsByTagName(tag);
			for (var i=0, il=elmsWithTag.length; i<il; i++) {
				returnElms.push(elmsWithTag[i]);
			}
			return returnElms;
		}
	};	
}();
DOMAssistant.init();
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
		        if (this.readyState == "complete") {
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
	
	return{
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
	return{
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
	return{
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
	return{
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
			for (var i=(this.childNodes.length - 1); i>=0; i--) {
		    	this.childNodes[i].parentNode.removeChild(this.childNodes[i]);
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
DOMAssistant.AJAX = function () {
	var XMLHttp = null;
	var callbackFunction = null;
	return{
		init: function () {
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
			if (this.init()) {
				callbackFunction = callBack;
				// This line needed to properly control the onreadystatechange event for Firefox
				XMLHttp.onreadystatechange = function () {};
				XMLHttp.abort();
				XMLHttp.open("GET", url, true);
				XMLHttp.setRequestHeader("AJAX", "true");
				XMLHttp.onreadystatechange = this.contentReady;
				XMLHttp.send(null);
			}
		},
		
		getReadyState : function () {
			return (XMLHttp && typeof XMLHttp.readyState !== "undefined")? XMLHttp.readyState : null;
		},
		
		callFunction : function () {
			if (callbackFunction && typeof callbackFunction === "function") {
				callbackFunction(XMLHttp.responseText);
			}
		},
	
		contentReady : function () {
			var AJAXObj = DOMAssistant.AJAX;
			if (AJAXObj.getReadyState() === 4) {
				AJAXObj.callFunction();
			}
		}
	};
}();