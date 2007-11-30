/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	
	This module by Robert Nyman, http://www.robertnyman.com
*/
/*extern DOMAssistant, $, HTMLArray */
var HTMLArrayEventMethods = {
	addEvent : function (evt, func){
		for (var i=0; i<this.length; i++) {
			this.DOM.addEvent.call(this[i], evt, func);
		}
		return this;
	},
	removeEvent : function (evt, func){
		for (var i=0; i<this.length; i++) {
			this.DOM.removeEvent.call(this[i], evt, func);
		}
		return this;
	}
};

DOMAssistant.EventMethodsToAdd = [
	"addEvent",
	"removeEvent"
];

DOMAssistant.initEvents = function (){
	var current;
	for (var i=0; i<this.EventMethodsToAdd.length; i++) {
		current = this.EventMethodsToAdd[i];
		this.methodsToAdd.push([current, this[current]]);
		HTMLArray.prototype[current] = HTMLArrayEventMethods[current];
	}
};

DOMAssistant.addEvent = function (evt, func){
	if(this.addEventListener){
		DOMAssistant.addEvent = function (evt, func){
			this.addEventListener(evt, func, false);
			return this;
		};
	}
	else{
		DOMAssistant.addEvent = function (evt, func){
			if(!this.events){
				this.events = {};
			}
			if(!this.events[evt]){
				this.events[evt] = [];
			}							
			this.events[evt].push(func);
			this["on" + evt] = DOMAssistant.handleEvent;
			if(typeof this.window === "object"){
				this.window["on" + evt] = DOMAssistant.handleEvent;
			}
			return this;
		};
	}
	return DOMAssistant.addEvent.call(this, evt, func);
};

DOMAssistant.handleEvent = function (evt){
	var currentEvt = evt || event;
	var eventType = currentEvt.type;
	var eventColl = this.events[eventType];
	for (var i=0; i<eventColl.length; i++) {
		eventColl[i].call(this, currentEvt);
	}
};

DOMAssistant.removeEvent = function (evt, func){
	if(this.removeEventListener){
		DOMAssistant.removeEvent = function (evt, func){
			this.removeEventListener(evt, func, false);
			return this;
		};
	}
	else if(this.events){
		DOMAssistant.removeEvent = function (evt, func){
			var eventColl = this.events[evt];
			for (var i=0; i<eventColl.length; i++) {
				if(eventColl[i] === func){
					delete eventColl[i];
					eventColl.splice(i, 1);
				}
			}
			return this;
		};
	}
	return DOMAssistant.removeEvent.call(this, evt, func);
};

DOMAssistant.preventDefault = function (evt){
	if(evt && evt.preventDefault){
		DOMAssistant.preventDefault = function (evt){
			evt.preventDefault();
		};
	}
	else{
		DOMAssistant.preventDefault = function (evt){
			event.returnValue = false;
		};
	}
	DOMAssistant.preventDefault(evt);
};

DOMAssistant.cancelBubble = function (evt){
	if(evt && evt.stopPropagation){
		DOMAssistant.cancelBubble = function (evt){
			evt.stopPropagation();
		};
	}
	else{
		DOMAssistant.cancelBubble = function (evt){
			event.cancelBubble = true;
		};
	}
	DOMAssistant.cancelBubble(evt);
};
DOMAssistant.initEvents();