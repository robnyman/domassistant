// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation
/*global DOMAssistant */
DOMAssistant.CSS = function () {
	var def = DOMAssistant.def;
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
				return newClass? (p1 + newClass + p2) : " ";
			}).replace(/^\s+|\s+$/g, "");
			return this;
		},

		hasClass : function (className) {
			return (" " + this.className + " ").indexOf(className) > -1;
		},

		setStyle : function (style, value) {
			var css = this.style;
			if ("filters" in this && (typeof style === "string"? /opacity/i.test(style) : def(style.opacity))) {
				css.zoom = 1;
				css.filter = (css.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + (def(style.opacity)? style.opacity : value) * 100 + ")";
			}
			if (def(css.cssText)) {
				var styleToSet = css.cssText;
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
				css.cssText = styleToSet;
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
				if ("filters" in this && /^opacity$/.test(cssRule)) {
					var f = this.style.filter;
					val = f && f.indexOf("opacity=") >= 0? parseFloat(f.match(/opacity=([^)]*)/)[1]) / 100 : 1;
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