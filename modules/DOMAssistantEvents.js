// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation
/*global DOMAssistant */
DOMAssistant.Events = function () {
	var handler,
		uniqueHandlerId = 1,
		w3cMode = !!document.addEventListener,
		useCapture = { focus: true, blur: true },
		fix = function(evt) { return DOMAssistant.isIE? { focus: "focusin", blur: "focusout" }[evt] || evt : evt; };
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
					if (this.events[evt][i].call(this, event) === false) { event.bubbles = false; }
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
			var currentEvt = evt || event,
				type = fix(currentEvt.type),
				currentTarget = currentEvt.target || currentEvt.srcElement || document;
			while (currentTarget.nodeType !== 1 && currentTarget.parentNode) { currentTarget = currentTarget.parentNode; }
			currentEvt.eventTarget = currentTarget;
			var eventColl = this.events[type].slice(0), eventCollLength, eventReturn;
			if ((eventCollLength = eventColl.length)) {
				for (var i=0; i<eventCollLength; i++) {
					if (typeof eventColl[i] === "function") {
						eventReturn = eventColl[i].call(this, currentEvt);
					}
				}
				if (eventReturn === false) { DOMAssistant.cancelBubble(currentEvt); }
				return eventReturn;
			}
		},

		removeEvent : function (evt, func, relay) {
			evt = fix(evt);
			if (this.events && this.events[evt]) {
				var eventColl = this.events[evt];
				for (var fn, i=eventColl.length-1; i>=0; i--) {
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
			return DOMAssistant.Events.addEvent.call(this, evt, function(e) {
				e = e || event;
				var target = e.target || e.srcElement, args = arguments, i = 0, elm, elms = this.cssSelect(selector);
				while ((elm = elms[i++])) {
					if (elm.contains? elm.contains(target) : !!((elm.compareDocumentPosition(target) || 16) & 16)) {
						return fn.apply(elm, args);
					}
				}
			}, true);
		},

		unrelayEvent: function (evt) {
			return DOMAssistant.Events.removeEvent.call(this, evt, null, true);
		},

		preventDefault : function (evt) {
			return (DOMAssistant.Events.preventDefault = (evt && evt.preventDefault) ? function (evt) { evt.preventDefault(); } : function (evt) { event.returnValue = false; })(evt);
		},

		cancelBubble : function (evt) {
			return (DOMAssistant.Events.cancelBubble = (evt && evt.stopPropagation) ? function (evt) { evt.stopPropagation(); } : function (evt) { event.cancelBubble = true; })(evt);
		}
	};
}();
DOMAssistant.attach(DOMAssistant.Events);