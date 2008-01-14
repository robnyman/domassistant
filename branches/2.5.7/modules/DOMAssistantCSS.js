// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
/*extern DOMAssistant */
DOMAssistant.CSS = function () {
	var baseMethodsToAdd = [
		"addClass",
		"removeClass",
		"replaceClass",
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
		replaceClass : function (className, newClass) {
			for (var i=0, il=this.length; i<il; i++) {
				this.CSS.replaceClass.call(this[i], className, newClass);
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
	return {
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
DOMAssistant.CSS.init();