/*
	DOMAssistant is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/domassistant
	
	This module by Robert Nyman, http://www.robertnyman.com
*/
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
	};
};

DOMAssistant.addEvent = function (evt, func){
	if(this.addEventListener){
		this.addEventListener(evt, func, false);
	}
	else{
		if(!this.events){
			this.events = {};
		}
		if(!this.events[evt]){
			this.events[evt] = [];
		}							
		this.events[evt].push(func);
		this["on" + evt] = DOMAssistant.handleEvent;
		if(typeof this.window == "object"){
			this.window["on" + evt] = DOMAssistant.handleEvent;
		}
	}
	return this;
};

DOMAssistant.handleEvent = function (evt){
	var evt = evt || event;
	var eventType = evt.type;
	var eventColl = this.events[eventType];
	for (var i=0; i<eventColl.length; i++) {
		eventColl[i].call(this, evt);
	}
};

DOMAssistant.removeEvent = function (evt, func){
	if(this.removeEventListener){
		this.removeEventListener(evt, func, false);
	}
	else if(this.events){
		var eventColl = this.events[evt];
		for (var i=0; i<eventColl.length; i++) {
			if(eventColl[i] == func){
				delete eventColl[i]
				eventColl.splice(i, 1);
			}
		}
	}
	return this;
};

DOMAssistant.preventDefault = function (evt){
	if(evt && evt.preventDefault){
		evt.preventDefault();
	}
	else{
		event.returnValue = false;
	}
};

DOMAssistant.cancelBubble = function (evt){
	if(evt && evt.stopPropagation){
		evt.stopPropagation();
	}
	else{
		event.cancelBubble = true;
	}
};

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

DOMAssistant.initEvents();