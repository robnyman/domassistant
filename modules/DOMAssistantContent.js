// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation
/*global DOMAssistant */
DOMAssistant.Content = function () {
	var $ = DOMAssistant.$;
	return {
		prev : function () {
			var prevSib = this;
			while ((prevSib = prevSib.previousSibling) && prevSib.nodeType !== 1) {}
			return $(prevSib);
		},

		next : function () {
			var nextSib = this;
			while ((nextSib = nextSib.nextSibling) && nextSib.nodeType !== 1) {}
			return $(nextSib);
		},

		create : function (name, attr, append, content) {
			var elm = $(document.createElement(name));
			if (attr) {
				elm = elm.setAttributes(attr);
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
			if (DOMAssistant.isIE) {
				var setAttr = function (elm, att, val) {
					var attLower = att.toLowerCase();
					switch (attLower) {
						case "name":
						case "type":
							return document.createElement(elm.outerHTML.replace(new RegExp(attLower + "=[a-zA-Z]+"), " ").replace(">", " " + attLower + "=" + val + ">"));
						case "style":
							elm.style.cssText = val;
							return elm;
						default:
							elm[DOMAssistant.camel[attLower] || att] = val;
							return elm;
					}
				};
				DOMAssistant.Content.setAttributes = function (attr) {
					var elem = this;
					var parent = this.parentNode;
					for (var i in attr) {
						if (typeof attr[i] === "string" || typeof attr[i] === "number") {
							var newElem = setAttr(elem, i, attr[i]);
							if (parent && /(name|type)/i.test(i)) {
								if (elem.innerHTML) {
									newElem.innerHTML = elem.innerHTML;
								}
								parent.replaceChild(newElem, elem);
							}
							elem = newElem;
						}
					}
					return $(elem);
				};
			}
			else {
				DOMAssistant.Content.setAttributes = function (attr) {
					for (var i in attr) {
						if (/class/i.test(i)) {
							this.className = attr[i];
						}
						else {
							this.setAttribute(i, attr[i]);
						}
					}
					return this;
				};
			}
			return DOMAssistant.Content.setAttributes.call(this, attr); 
		},

		addContent : function (content) {
			var type = typeof content;
			if (type === "string" || type === "number") {
				this.innerHTML += content;
			}
			else if (type === "object" || (type === "function" && !!content.nodeName)) {
				this.appendChild(content);
			}
			return this;
		},

		replaceContent : function (content) {
			var children = this.all || this.getElementsByTagName("*");
			for (var i=0, child, attr; (child=children[i]); i++) {
				attr = child.attributes;
				if (attr) {
					for (var j=0, jl=attr.length, att; j<jl; j++) {
						att = attr[j].nodeName.toLowerCase();
						if (typeof child[att] === "function") {
							child[att] = null;
						}
					}
				}
			}
			while (this.hasChildNodes()) {
				this.removeChild(this.firstChild);
			}
			return $(this).addContent(content);
		},

		replace : function (content, returnNew) {
			var type = typeof content;
			if (type === "string" || type === "number") {
				var parent = this.parentNode;
				var tmp = $(parent).create("div", null, false, content);
				for (var i=tmp.childNodes.length-1; i>=0; i--) {
					parent.insertBefore(tmp.childNodes[i], this.nextSibling);
				}
				content = this.nextSibling;
				parent.removeChild(this);
			}
			else if (type === "object" || (type === "function" && !!content.nodeName)) {
				this.parentNode.replaceChild(content, this);
			}
			return returnNew? content : this;
		},

		remove : function () {
			this.parentNode.removeChild(this);
			return null;
		}
	};
}();
DOMAssistant.attach(DOMAssistant.Content);