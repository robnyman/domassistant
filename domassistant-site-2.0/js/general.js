DOMAssistant.DOMReady(addDemoEvent);

function addDemoEvent(){
	$("start-demo").addEvent("click", startDemo);
}

function startDemo(evt){
	alert('DOMAssistant module:\n\nCall made:\n$("main-content").elmsByClass("paragraph");\n\nReturned value:\n' + $("main-content").elmsByClass("paragraph").join("\n"));
	alert('DOMAssistant module:\n\nCall made:\n$("container").elmsByAttribute("id");\n\nReturned value:\n' + $("container").elmsByAttribute("id").join("\n"));
	alert('DOMAssistantCSS module:\n\nCall made:\n$("domass-demo-title").addClass("red");\n\nResult:\n' + $("domass-demo-title").addClass("red"));
	alert('DOMAssistantCSS module:\n\nCall made:\n$("domass-demo-title").getStyle("background-color");\n\nResult:\n' + $("domass-demo-title").getStyle("background-color"));
	alert('DOMAssistantContent module:\n\nCall made:$("main-content").addContent("<p>New paragraph added with addContent, using innerHTML</p>");\n\nResult:\n' + $("main-content").addContent("<p>New paragraph added with addContent, using innerHML</p>"));
	alert('DOMAssistantContent module:\n\nCall made:$("main-content").create("p", {\n\tid : "dynamic",\n\tclassName : "outlined"\n}, true, "Dynamically created paragraph");\n\n\nResult:\n' + $("main-content").create("p", {
		id : "dynamic",
		className : "outlined"
	}, true, "Dynamically created paragraph"));
	alert('DOMAssistantEvents module:\n\nCall made:\n$("first-paragraph").addEvent("mouseover", mouseOverLink);\n\nResult:\n' + $("first-paragraph").addEvent("mouseover", mouseOverLink) + "\n\nWhen this demo is finished, mouse over the first paragraph in this page. It will change its background color the first time, but then that event will be removed.");
	DOMAssistant.preventDefault(evt);
}

function mouseOverLink(evt){
	$(this).addClass("red");
	this.addEvent("mouseout", mouseOutLink);
}

function mouseOutLink(evt){
	var relatedTarget = (typeof evt.relatedTarget != "undefined")? evt.relatedTarget : evt.toElement;
	if(relatedTarget != this && relatedTarget.parentNode != this){
		$(this).removeClass("red");
		this.removeEvent("mouseover", mouseOverLink);
		this.removeEvent("mouseout", mouseOutLink);
	}
}