// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
/*extern DOMAssistant */
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
			previousElms.setPrevious(this);
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
			nextElms.setPrevious(this);
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
			newElms.setPrevious(this);
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
			$(this).addContent(newContent);
			return this;
		},

		remove : function () {
			this.parentNode.removeChild(this);
			return null;
		}
	};
}();
DOMAssistant.Content.init();