<?php include "../header-start.php" ?>
	<title>How to create a plugin - Plugins - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
<?php include "../header-end.php" ?>

<body>
	
	<div id="container">
			<div id="header">
				<div id="header-content">
					<h1><a href="/"><span></span>DOMAssistant</a></h1>
					<div id="navigation">
						<ul>
							<li><a href="/">Home</a>/</li>
							<li><a href="/download">Download</a>/</li>
							<li><a href="/documentation">Documentation</a>/</li>
							<li><a href="/plugins" class="selected">Plugins</a>/</li>
							<li><a href="/discussion-support">Discussion &amp; Support</a>/</li>
							<li><a href="/about">About</a>/</li>
							<li class="last"><a href="/blog">Blog</a></li>
						</ul>
					</div>
				</div>
			</div>
			
			<div id="main-content">				
				<div id="content">					
					<div id="content-areas">

						<div id="main-content-area">
							<h1>How to create a plugin</h1>
							<p>If you want to extend the functionality of DOMAssistant to suit your needs, you can create a plugin. Plugins work on top of the DOMAssistant core functionality, and are easily added.</p>
							
							<h2>Public and private methods</h2>
							<p>DOMAssistant offers you the approach of making a method either public or private. Public in this sense means that any public method will be publicly available through the <code>$</code> and <code>$$</code> methods on any element or object. Otherwise, it will only be available for your own internal use.</p>
							<p>Specify your public methods, as strings representing the name of the actual method, in an array property of your plugin object named <code>publicMethods</code>. If no such property exists, all methods in your object will be considered public. If you don't want any of your methods to be public, set <code>publicMethods</code> to null or false.</p>
							
							<h2>Using an init method</h2>
							<p>If you have a method in your plugin named <code>init</code>, it will automatically be called once your public methods have been applied to the <code>$</code> method. Please note that this doesn't necessarily mean that the document has finished loading, but just that your methods have been incorporated in the DOMAssistant functionality.</p>
							<p>If you want to ensure that the document has finished loading before you do anything, use the <a href="/documentation/DOMAssistantLoad-module.php#DOMReady"><code>DOMReady</code></a> to accomplish that.</p>
							
							<h2>Eventual collision of method names</h2>
							<p>Say for example that you have named a method something which already exists in the core DOMAssistant or any other plugin included in the page before your plugin. What happens then?</p>
							<p>The way DOMAssistant works is that it doesn't apply any method which already exists, meaning that if that's the case your method won't be applied. Please read the documentation of DOMAssistant and any other plugin you're using to prevent this from happening.</p>
							<p>If you want to programmatically check if the method applied is the same method as your, you can check the <code>allMethods</code> property of the DOMAssistant object:</p>
<pre class="code"><code>// Keyword this is here a reference to your plugin object 
if (DOMAssistant.allMethods["myMethodName"] === this["myMethodName"]) {
	// Now you know that your method was applied
}</code></pre>
							
							<h2>An example plugin</h2>
							<p>Here is a simple plugin example:</p>
<pre class="code"><code>DOMAssistant.MyPlugIn = function () {
	return {
		publicMethods : [
			"myMethod1",
			"myMethod2"
		],
		
		myMethod1 : function () {
			// Do something
		},
		
		myMethod2 : function () {
			// Do something else
		}
	};	
}();
DOMAssistant.attach(DOMAssistant.MyPlugIn);</code></pre>
							<h2>An example plugin with comments in the code</h2>
							<p>Let's break a plugin down to see what each part does.</p>
<pre class="code"><code>// Change the MyPlugIn part to the name of your plugin
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
DOMAssistant.attach(DOMAssistant.MyPlugIn);</code></pre>
							<h2>Download an example</h2>
							<p>Just <a href="/plugins/categories/example/DOMAssistantMyPlugIn.js">download an example plugin</a> and you're ready to get going creating fantastic DOMAssistant plugins!</p>
						</div>
						
						<div id="sidebar">
							<h3>Plugins options</h3>
							<ul>
								<li><a href="/plugins">All plugin categories</a></li>
								<li><a href="/plugins/how-to.php">How to create a plugin</a></li>
								<li><a href="/plugins/categories/example">Download plugin example</a></li>
								<li><a href="/plugins/submit-plugin.php">Submit a plugin</a></li>
							</ul>
						</div>
					</div>
					<?php include "../get-your-copy.php" ?>
				</div>
			</div>

			<?php include "../footer.php" ?>
	</div>
	<?php include "../stats.php" ?>
	
</body>
</html>