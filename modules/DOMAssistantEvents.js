// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
/*extern DOMAssistant, $ */
DOMAssistant.Events = function () {
	var uniqueHandlerId = 1;
	return {
		publicMethods : [
			"addEvent",
			"removeEvent",
			"preventDefault",
			"cancelBubble"
		],
		
		init : function () {
			window.addEvent = this.addEvent;
			window.removeEvent = this.removeEvent;
			DOMAssistant.preventDefault = this.preventDefault;
			DOMAssistant.cancelBubble = this.cancelBubble;
		},

		addEvent : function (evt, func) {
			var XULEvent = (/^DOM/.test(evt));
			if (XULEvent) {
				if (this.addEventListener) {
					this.addEventListener(evt, func, false);
				}
			}
			else {
				if (!this.uniqueHandlerId) {
					this.uniqueHandlerId = uniqueHandlerId++;
				}
				var alreadyExists = false;
				if (func.attachedElements && func.attachedElements[this.uniqueHandlerId]) {
					alreadyExists = true;
				}
				if (!alreadyExists) {
					if (!this.events) {
						this.events = {};
					}
					if (!this.events[evt]) {
						this.events[evt] = [];
						var existingEvent = this["on" + evt];
						if (existingEvent) {
							this.events[evt].push(existingEvent);
					    }
					}							
					this.events[evt].push(func);
					this["on" + evt] = DOMAssistant.Events.handleEvent;
					if (typeof this.window === "object") {
						this.window["on" + evt] = DOMAssistant.Events.handleEvent;
					}
					func.attachedElements = {};
					func.attachedElements[this.uniqueHandlerId] = true;
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
			var eventType = currentEvt.type;
			var eventColl = this.events[eventType];
			var eventCollLength = eventColl.length;
			var eventReturn;
			for (var i=0; i<eventCollLength; i++) {
				eventReturn = eventColl[i].call(this, currentEvt);
				if (i === (eventCollLength - 1)) {
					return eventReturn;
				}
			}
		},

		removeEvent : function (evt, func) {
			var eventColl = this.events[evt];
			for (var i=0; i<eventColl.length; i++) {
				if (eventColl[i] === func) {
					delete eventColl[i];
					eventColl.splice(i, 1);
				}
			}
			func.attachedElements[this.uniqueHandlerId] = null;
			return this;
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
DOMAssistant.attach(DOMAssistant.Events);