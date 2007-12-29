// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
/*extern DOMAssistant */
DOMAssistant.Events = function () {
	var baseMethodsToAdd = [
		"addEvent",
		"removeEvent",
		"preventDefault",
		"cancelBubble"
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
		},
		preventDefault : function (evt) {
			for (var i=0, il=this.length; i<il; i++) {
				this.Events.preventDefault.call(this[i], evt);
			}
			return this;
		},
		cancelBubble : function (evt) {
			for (var i=0, il=this.length; i<il; i++) {
				this.Events.cancelBubble.call(this[i], evt);
			}
			return this;
		}
	};
	return {
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
DOMAssistant.Events.init();