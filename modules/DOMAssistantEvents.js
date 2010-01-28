// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation
/*global DOMAssistant */
DOMAssistant.Events = function () {
	var handler,
		key = "_events",
		w3cMode = !!document.addEventListener,
		useCapture = { focus: true, blur: true },
		fix = function (e) {
			return DOMAssistant.isIE? { focus: "activate", blur: "deactivate" }[e] || e : e;
		},
		createEvent = function (e, type, target) {
			e = e || window.event || {};
			var event = {
				event: e,
				type: type || e.type,
				bubbles: e.bubbles || true,
				cancelable: e.cancelable || false,
				target: target || e.target || e.srcElement,
				relatedTarget: e.relatedTarget || (e.fromElement === e.target? e.toElement : e.fromElement) || null,
				altKey: e.altKey || false,
				ctrlKey: e.ctrlKey || false,
				shiftKey: e.shiftKey || false,
				button: e.button || null,
				timeStamp: +new Date(),
				preventDefault: function() {
					if (e.preventDefault) { e.preventDefault(); }
					this.returnValue = e.returnValue = false;
				},
				stopPropagation: function() {
					if (e.stopPropagation) { e.stopPropagation(); }
					this.cancelBubble = e.cancelBubble = true;
				}
			};
			event.currentTarget = event.target;
			if (event.target && 3 === event.target.nodeType) { // Safari textnode bug
				event.target = event.target.parentNode;	
			}
			if ("number" === typeof e.pageX) {
				event.clientX = event.pageX = e.pageX;
				event.clientY = event.pageY = e.pageY;
			}
			else {
				var de = document.documentElement, b = document.body;
				event.clientX = e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
				event.clientY = e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
			}
			if ("number" === typeof e.which) {
				event.keyCode = e.keyCode;
				event.charCode = event.which = e.which;
			}
			else if (e.keyCode) {
				event.keyCode = event.charCode = e.keyCode;
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
			DOMAssistant.preventDefault = this.preventDefault;
			DOMAssistant.cancelBubble = this.cancelBubble;
			handler = this.handleEvent;
		},

		triggerEvent : function (evt, target, e) {
			evt = fix(evt);
			var events = this.retrieve(key),
				event = e || createEvent(e, evt, target || this);
			event.currentTarget = this;
			if (events && events[evt]) {
				for (var i=0, iL=events[evt].length; i<iL; i++) {
					if (events[evt][i].call(this, event) === false) { event.stopPropagation(); }
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
			var uid = (evt = fix(evt)) + this.retrieve();
			if (!(func.attachedElements && func.attachedElements[uid])) {
				var events = this.retrieve(key) || {};
				if (!events[evt]) {
					events[evt] = [];
					var existingEvent = this["on" + evt];
					if (existingEvent) {
						events[evt].push(existingEvent);
						this["on" + evt] = null;
					}
				}
				if (!events[evt].length) {
					if (w3cMode) { this.addEventListener(evt, handler, useCapture[evt]); }
					else { this["on" + evt] = handler; }
				}
				func.relay = relay;
				events[evt].push(func);
				if (typeof this.window === "object") { this.window["on" + evt] = handler; }
				func.attachedElements = func.attachedElements || {};
				func.attachedElements[uid] = true;
				this.store(key, events);
			}
			return this;
		},

		handleEvent : function (evt) {
			var currentEvt = (evt && /^DOM/.test(evt.type) && w3cMode)? evt : createEvent(evt),
				type = fix(currentEvt.type),
				eventColl = this.retrieve(key)[type].slice(0), eventCollLength, eventReturn;
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
			var uid = (evt = fix(evt)) + this.retrieve(),
				events = this.retrieve(key);
			if (events && events[evt]) {
				var eventColl = events[evt];
				for (var fn, i=eventColl.length; i--;) {
					fn = func || eventColl[i];
					if (eventColl[i] === fn && (!relay && !fn.relay || relay && fn.relay)) {
						eventColl.splice(i, 1);
						if (fn.attachedElements) {
							fn.attachedElements[uid] = null;
						}
					}
				}
				if (!events[evt].length) {
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