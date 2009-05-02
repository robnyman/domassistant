// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation
/*global DOMAssistant, $ */
DOMAssistant.Events = function () {
	var uniqueHandlerId = 1,
	contains = function (a, b) {
		return a.contains? a.contains(b) : !!((a.compareDocumentPosition(b) || 16) & 16);
	};
	return {
		publicMethods : [
			"triggerEvent",
			"addEvent",
			"removeEvent",
			"relayEvent",
			"unrelayEvent",
			"preventDefault",
			"cancelBubble"
		],

		init : function () {
			window.addEvent = this.addEvent;
			window.removeEvent = this.removeEvent;
			DOMAssistant.preventDefault = this.preventDefault;
			DOMAssistant.cancelBubble = this.cancelBubble;
		},

		triggerEvent : function (evt, target, e) {
			// Create synthetic event
			var event = e || {
				type: evt,
				target: target || this,
				currentTarget: this,
				bubbles: true,
				cancelable: false,
				preventDefault: function(){},
				stopPropagation: function(){ this.bubbles = false; },
				timeStamp: +new Date()
			};
			if (this.events && this.events[evt]) {
				for (var i=0, iL=this.events[evt].length; i<iL; i++) {
					this.events[evt][i].call(this, event);
				}
			}
			else if (typeof this["on" + evt] === "function") {
				this["on" + evt].call(this, event);
			}
			var p = this.parentNode;
			if (event.bubbles && p && p.nodeType === 1) {
				DOMAssistant.Events.triggerEvent.call(p, evt, target, event);
			}
			return this;
		},

		addEvent : function (evt, func, relay) {
			if (/^DOM/.test(evt)) {
				if (this.addEventListener) {
					this.addEventListener(evt, func, false);
				}
			}
			else {
				this.uniqueHandlerId = this.uniqueHandlerId || uniqueHandlerId++;
				if (!(func.attachedElements && func.attachedElements[evt + this.uniqueHandlerId])) {
					this.events = this.events || {};
					if (!this.events[evt]) {
						this.events[evt] = [];
						var existingEvent = this["on" + evt];
						if (existingEvent) {
							this.events[evt].push(existingEvent);
						}
					}
					func.relay = relay;
					this.events[evt].push(func);
					this["on" + evt] = DOMAssistant.Events.handleEvent;
					if (typeof this.window === "object") {
						this.window["on" + evt] = DOMAssistant.Events.handleEvent;
					}
					func.attachedElements = func.attachedElements || {};
					func.attachedElements[evt + this.uniqueHandlerId] = true;
				}
			}
			return this;
		},

		handleEvent : function (evt) {
			var currentEvt = evt || event;
			var currentTarget = currentEvt.target || currentEvt.srcElement || document;
			while (currentTarget.nodeType !== 1 && currentTarget.parentNode) {
				currentTarget = currentTarget.parentNode;
			}
			currentEvt.eventTarget = currentTarget;
			var eventColl = this.events[currentEvt.type].slice(0), eventCollLength, eventReturn;
			if ((eventCollLength = eventColl.length)) {
				for (var i=0; i<eventCollLength; i++) {
					if (typeof eventColl[i] === "function") {
						eventReturn = eventColl[i].call(this, currentEvt);
					}
				}
				return eventReturn;
			}
		},

		removeEvent : function (evt, func, relay) {
			if (this.events && this.events[evt]) {
				var eventColl = this.events[evt];
				for (var fn, i=eventColl.length-1; i>=0; i--) {
					fn = func || eventColl[i];
					if (eventColl[i] === fn && (!relay && !fn.relay || relay && fn.relay)) {
						delete eventColl[i];
						eventColl.splice(i, 1);
						if (fn.attachedElements) {
							fn.attachedElements[evt + this.uniqueHandlerId] = null;
						}
					}
				}
			}
			else if (this["on" + evt] && !func && !relay) {
				this["on" + evt] = null;
			}
			return this;
		},

		relayEvent: function (evt, selector, fn) {
			return DOMAssistant.Events.addEvent.call(this, evt, function(e) {
				e = e || event;
				var target = e.target || e.srcElement, args = arguments;
				this.cssSelect(selector).each( function() {
					if (contains(this, target)) {
						return fn.apply(this, args);;
					}
				});
			}, true);
		},

		unrelayEvent: function (evt) {
			return DOMAssistant.Events.removeEvent.call(this, evt, null, true);
		},

		preventDefault : function (evt) {
			if (evt && evt.preventDefault) {
				DOMAssistant.Events.preventDefault = function (evt) {
					evt.preventDefault();
				};
			}
			else {
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
			else {
				DOMAssistant.Events.cancelBubble = function (evt) {
					event.cancelBubble = true;
				};
			}
			return DOMAssistant.Events.cancelBubble(evt);
		}
	};
}();
DOMAssistant.attach(DOMAssistant.Events);