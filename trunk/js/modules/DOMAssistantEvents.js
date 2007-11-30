/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	This module by Robert Nyman, http://www.robertnyman.com
*/
/*extern DOMAssistant */
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