// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation
/*global DOMAssistant */
DOMAssistant.Events = function () {
	var handler,
		uniqueHandlerId = 1,
		w3cMode = !!document.addEventListener,
		useCapture = { focus: true, blur: true },
		fix = function (e) {
			return DOMAssistant.isIE? { focus: "focusin", blur: "focusout" }[e] || e : e;
		},
		createEvent = function (e, type, target) {
			e = e || window.event || {};
			var event = {
				event: e,
				type: type || e.type,
				bubbles: e.bubbles || true,
				cancelable: e.cancelable || false,
				target: target || e.target || e.srcElement,
				altKey: e.altKey || false,
				ctrlKey: e.ctrlKey || false,
				shiftKey: e.shiftKey || false,
				clientX: e.clientX || null,
				clientY: e.clientY || null,
				button: e.button || null,
				timeStamp: +new Date(),
				preventDefault: function() {
					if (e.preventDefault) { e.preventDefault(); }
					this.returnValue = false;
				},
				stopPropagation: function() {
					if (e.stopPropagation) { e.stopPropagation(); }
					this.cancelBubble = true;
				}
			};
			event.currentTarget = event.target;
			if (event.target.nodeType === 3) { // Safari textnode bug
				event.target = event.target.parentNode;	
			}
			if ("number" === typeof e.which) {
				event.keyCode = e.keyCode;
				event.charCode = e.which;
			}
			else if (e.keyCode) {
				event.keyCode = 0;
				event.charCode = e.keyCode;
			}
			return event;
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
			handler = this.handleEvent;
		},

		triggerEvent : function (evt, target, e) {
			evt = fix(evt);
			var event = e || createEvent(e, evt, target || this);
			event.currentTarget = this;
			if (this.events && this.events[evt]) {
				for (var i=0, iL=this.events[evt].length; i<iL; i++) {
					if (this.events[evt][i].call(this, event) === false) { event.stopPropagation(); }
				}
			}
			else if (typeof this["on" + evt] === "function") {
				this["on" + evt].call(this, event);
			}
			var p = DOMAssistant.$$(this.parentNode);
			if (!event.cancelBubble && p && p.nodeType === 1) {
				p.triggerEvent(evt, target, event);
			}
			return this;
		},

		addEvent : function (evt, func, relay) {
			if (/^DOM/.test(evt) && w3cMode) {
				this.addEventListener(evt, func, false);
			}
			else {
				evt = fix(evt);
				this.uniqueHandlerId = this.uniqueHandlerId || uniqueHandlerId++;
				if (!(func.attachedElements && func.attachedElements[evt + this.uniqueHandlerId])) {
					this.events = this.events || {};
					if (!this.events[evt]) {
						this.events[evt] = [];
						var existingEvent = this["on" + evt];
						if (existingEvent) {
							this.events[evt].push(existingEvent);
							this["on" + evt] = null;
						}
						if (w3cMode) { this.addEventListener(evt, handler, useCapture[evt]); }
						else { this["on" + evt] = handler; }
					}
					func.relay = relay;
					this.events[evt].push(func);
					func.attachedElements = func.attachedElements || {};
					func.attachedElements[evt + this.uniqueHandlerId] = true;
				}
			}
			return this;
		},

		handleEvent : function (evt) {
			var currentEvt = createEvent(evt),
				type = fix(currentEvt.type),
				eventColl = this.events[type].slice(0), eventCollLength, eventReturn;
			if ((eventCollLength = eventColl.length)) {
				for (var i=0; i<eventCollLength; i++) {
					if (typeof eventColl[i] === "function") {
						eventReturn = eventColl[i].call(this, currentEvt);
					}
				}
				if (eventReturn === false) { currentEvt.stopPropagation(); }
				return eventReturn;
			}
		},

		removeEvent : function (evt, func, relay) {
			evt = fix(evt);
			if (this.events && this.events[evt]) {
				var eventColl = this.events[evt];
				for (var fn, i=eventColl.length; i--;) {
					fn = func || eventColl[i];
					if (eventColl[i] === fn && (!relay && !fn.relay || relay && fn.relay)) {
						eventColl.splice(i, 1);
						if (fn.attachedElements) {
							fn.attachedElements[evt + this.uniqueHandlerId] = null;
						}
					}
				}
				if (!this.events[evt].length) {
					if (w3cMode) { this.removeEventListener(evt, handler, useCapture[evt]); }
					else { this["on" + evt] = null; }
				}
			}
			else if (this["on" + evt] && !func && !relay) {
				this["on" + evt] = null;
			}
			return this;
		},

		relayEvent: function (evt, selector, fn) {
			return this.addEvent(evt, function(e) {
				e = createEvent(e);
				var target = e.target, args = arguments, i = 0, elm, elms = this.cssSelect(selector);
				while ((elm = elms[i++])) {
					if ((elm === target || DOMAssistant.hasChild.call(elm, target)) && !elm.disabled) {
						e.currentTarget = elm;
						return fn.apply(elm, args);
					}
				}
			}, true);
		},

		unrelayEvent: function (evt) {
			return this.removeEvent(evt, null, true);
		},

		preventDefault : function (evt) {
			if (evt.preventDefault) { evt.preventDefault(); }
			evt.returnValue = false;
		},

		cancelBubble : function (evt) {
			if (evt.stopPropagation) { evt.stopPropagation(); }
			evt.cancelBubble = true;
		}
	};
}();
DOMAssistant.attach(DOMAssistant.Events);