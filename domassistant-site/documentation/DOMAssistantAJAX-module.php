<?php include "../header-start.php" ?>
	<title>DOMAssistantAJAX module - Documentation - DOM Assistant, the modular lightweight JavaScript library</title>
<?php include "../header-end.php" ?>

<body>
	
	<div id="container">
			<div id="header">
				<div id="header-content">
					<h1><a href="/"><span></span>DOMAssistant</a></h1>
					<div id="navigation">
						<ul>
							<li><a href="/">Home</a>/</li>
							<li><a href="/documentation" class="selected">Documentation</a>/</li>
							<li><a href="/download">Download</a>/</li>
							<li><a href="/compatibility">Compatibility</a>/</li>
							<li><a href="/contact">Contact</a>/</li>
							<li class="last"><a href="/discussion-support">Discussion &amp; Support</a></li>
						</ul>
					</div>
				</div>
			</div>
			
			<div id="main-content">				
				<div id="content">					
					<div id="content-areas">
						<div id="main-content-area">
							<h1>DOMAssistantAJAX Module</h1>
							<p>The DOMAssistantAJAX module offers basic AJAX interaction for retrieving data from a URL and then passing on the returned content to any function, or load the content into an element.</p>

							<h4 id="get"><code>get(url, callBack)</code></h4>
							<p>Makes a GET request to the specified URL and calls the set callBack function. The first parameter of the then called callBack function will be the <code>responseText</code> of the AJAX call. If this method is called on an element, the callBack function context will be the element, i.e. the keyword <code>this</code> will refer to the element which called the <code>get</code> method in the first place.</p>
							<h5>Parameters</h5>
							<dl>
								<dt>url</dt>
								<dd>URL to make an AJAX call to. Required.</dd>
								<dt>callBack</dt>
								<dd>Function name or anonymous function to call when the AJAX request is complete. Optional.</dd>
							</dl>

							<h5>Return value</h5>
							<p>None.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>$("news").get("news.php", insertNews);</code>
							</p>
							<p class="code">
								<code>DOMAssistantAJAX.get("my-url.aspx", callbackFunctionName);</code>
							</p>
							
							<h4 id="post"><code>post(url, callBack)</code></h4>
							<p>Makes a POST request to the specified URL and calls the set callBack function. The first parameter of the then called callBack function will be the <code>responseText</code> of the AJAX call. If this method is called on an element, the callBack function context will be the element, i.e. the keyword <code>this</code> will refer to the element which called the <code>get</code> method in the first place.</p>
							<h5>Parameters</h5>
							<dl>
								<dt>url</dt>
								<dd>URL to make an AJAX call to. Required.</dd>
								<dt>callBack</dt>
								<dd>Function name or anonymous function to call when the AJAX request is complete. Optional.</dd>
							</dl>

							<h5>Return value</h5>
							<p>None.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>$("news").post("news.php?value=true", insertNews);</code>
							</p>
							<p class="code">
								<code>DOMAssistantAJAX.post("my-url.aspx?number=10", callbackFunctionName);</code>
							</p>
							
							<h4 id="load"><code>load(url, add)</code></h4>
							<p>Makes a request to the specified URL and loads the returned content into the element which the method is called on.</p>
							<h5>Parameters</h5>
							<dl>
								<dt>url</dt>
								<dd>URL to make an AJAX call to. Required.</dd>
								<dt>add</dt>
								<dd>A boolean, if the retrieved content shall be appended to the already existing content, as opposed to replacing it. Optional.</dd>
							</dl>

							<h5>Return value</h5>
							<p>None.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>$("directions").load("maps.php");</code>
							</p>
							<p class="code">
								<code>$("contacts", true).load("staff.aspx");</code>
							</p>
							
							<h4 id="getReadyState"><code>getReadyState()</code></h4>
							<p>Helper method to check the current <code>readyState</code> of the XMLHttpRequest.</p>
							<h5>Parameters</h5>
							<p>None</p>

							<h5>Return value</h5>
							<p>Integer.</p>
							<ul>
								<li>0 = uninitialized</li>
								<li>1 = loading</li>
								<li>2 = loaded</li>
								<li>3 = interactive</li>
								<li>4 = complete</li>
							</ul>

							<h5>Example calls</h5>
							<p class="code">
								<code>DOMAssistantAJAX.getReadyState();</code>
							</p>
							
							<h4 id="getStatus"><code>getStatus()</code></h4>
							<p>Helper method to check the current <code>status</code> of the XMLHttpRequest.</p>
							<h5>Parameters</h5>
							<p>None</p>

							<h5>Return value</h5>
							<p>Integer. Examples are 200 for Ok and 404 for not found.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>DOMAssistantAJAX.getStatus();</code>
							</p>
							
							<h4 id="getStatusText"><code>getStatusText()</code></h4>
							<p>Helper method to check the current <code>readyState</code> of the XMLHttpRequest.</p>
							<h5>Parameters</h5>
							<p>None</p>

							<h5>Return value</h5>
							<p>String. The text accompanying the status code.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>DOMAssistantAJAX.getStatusText();</code>
							</p>						
						</div>
						
						<div id="sidebar">
							<h3>DOMAssistantAJAX methods</h3>
							<ul>
								<li><a href="#get">get</a></li>
								<li><a href="#load">load</a></li>
								<li><a href="#getReadyState">getReadyState</a></li>
								<li><a href="#getStatus">getStatus</a></li>
								<li><a href="#getStatusText">getStatusText</a></li>
							</ul>
							<?php include "domassistant-module-nav.php" ?>
						</div>
					</div>
					<div id="get-your-copy">
						<a href="http://code.google.com/p/domassistant/"><img src="../images/get-your-copy.png" alt="Get your copy"></a>

					</div>
				</div>
			</div>
			
			<div id="footer">
				<div id="footer-content">
					<i>Created by Robert Nyman, <a href="http://www.robertnyman.com">http://www.robertnyman.com</a>. DOMAssistant is released under a <a href="http://www.opensource.org/licenses/mit-license.php">MIT License</a>.</i>

				</div>
			</div>
					
	</div>
	<?php include "../stats.php" ?>
	
</body>
</html>