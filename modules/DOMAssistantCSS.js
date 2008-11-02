// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation
/*global DOMAssistant */
DOMAssistant.CSS = function () {
	return {
		addClass : function (className) {
			if (!DOMAssistant.CSS.hasClass.call(this, className)) {
				var currentClass = this.className;
				this.className = currentClass + (currentClass.length? " " : "") + className;
			}
			return this;
		},

		removeClass : function (className) {
			return DOMAssistant.CSS.replaceClass.call(this, className);
		},

		replaceClass : function (className, newClass) {
			var classToRemove = new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i");
			this.className = this.className.replace(classToRemove, function (match, p1, p2) {
				var retVal = newClass? (p1 + newClass + p2) : "";
				if (/^\s+.*\s+$/.test(match)) {
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
			if (this.filters && (typeof style === "string"? /opacity/i.test(style) : style.opacity)) {
				this.style.filter = "alpha(opacity=" + (value || style.opacity || 1) * 100 + ")";
			}
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
			var val = "";
			cssRule = cssRule.toLowerCase();
			if (document.defaultView && document.defaultView.getComputedStyle) {
				val = document.defaultView.getComputedStyle(this, "").getPropertyValue(cssRule);
			}
			else if (this.currentStyle) {
				if (this.filters && /^opacity$/.test(cssRule)) {
					var alpha = this.filters["DXImageTransform.Microsoft.Alpha"] || this.filters.alpha || {};
					val = (alpha.opacity || 100) / 100;
				}
				else {
					cssRule = cssRule.replace(/^float$/, "styleFloat").replace(/\-(\w)/g, function (match, p1) {
						return p1.toUpperCase();
					});
					val = this.currentStyle[cssRule];
				}
				if (val === "auto" && /^(width|height)$/.test(cssRule) && this.currentStyle.display !== "none") {
					val = this["offset" + cssRule.charAt(0).toUpperCase() + cssRule.substr(1)] + "px";
				}
			}
			return val;
		}
	};
}();
DOMAssistant.attach(DOMAssistant.CSS);