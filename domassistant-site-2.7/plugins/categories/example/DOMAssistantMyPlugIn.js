// Change the MyPlugIn part to the name of your plugin
DOMAssistant.MyPlugIn = function () {
	return {
		/* 
			These methods will be available through
			the $ and the $$ methods.
			If this property doesn't exist, all the object's 
			methods will be considered public.
			Set this to null or false to make all methods private.
			
			Like this:
			publicMethods : null,
		*/
		publicMethods : [
			"myMethod1",
			"myMethod2"
		],
		
		init : function () {
			/*
				This method is optional, and is automatically called 
				by DOMAssistant if it exists. The call takes place 
				after all the publicMethods have been applied.
			*/
		},
		
		myMethod1 : function () {
			/* 
				The keyword this in this context is 
				the element or object in question.

				return this is optional, if you want chaining 
				to work after this method has been called
				
				Like this: 
				$("#container").myMethod1().addClass("active");
			*/	
			return this; 
		},

		myMethod2 : function () {
			// Another public method
		}
	};	
}();
/*
	This line adds all the publicMethods of this plugin to the 
	DOMAssistant functionality, making them available through 
	the $ and the $$ methods.
	Remember to change the MyPlugIn part to the name of your plugin
*/
DOMAssistant.attach(DOMAssistant.MyPlugIn);