<?php include "../header-start.php" ?>
	<title>DOMAssistantLoad module - Documentation - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors and AJAX, with CSS selectors and AJAX</title>
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
							<li><a href="/documentation" class="selected">Documentation</a>/</li>
							<li><a href="/plugins">Plugins</a>/</li>
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
							<h1>DOMAssistantLoad Module</h1>
							<p>The DOMAssistantLoad module offers a way to call a number of functions as soon as the DOM has loaded, as opposed to waiting for all images and other external files to completely load. It was inspired and influenced by Dean Edwards, Matthias Miller, and John Resig: <a href="http://dean.edwards.name/weblog/2006/06/again/">window.onload (again)</a>.</p>

							<h2 id="DOMReady"><code>DOMReady()</code></h2>
							<p>From any file, just call the DOMReady method with desired functions and they will be executed as soon as the DOM has loaded.</p>
							<h3>Parameters</h3>
							<p>Send in any number of function references, anonymous functions or strings with function names and parentheses.</p>
							<h3>Return value</h3>
							<p>None.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									DOMAssistant.DOMReady(myFunc);
								</code>
							</p>
							<p class="code">
								<code>
									DOMAssistant.DOMReady("myFunc('Some text')");
								</code>
							</p>
							<p class="code">
								<code>
									DOMAssistant.DOMReady(myFunc, "anotherFunction()");
								</code>
							</p>
							<p class="code">
								<code>
									DOMAssistant.DOMReady(myFunc, function(){<br>
										// Perform some magic<br>
									});
								</code>
							</p>
							
							<h2 id="setErrorHandling"><code>setErrorHandling()</code></h2>
							<p>Offers a possibility to handle errors when the <code>DOMReady</code> method is being called.</p>
							<h3>Parameters</h3>
							<p>Send in a function reference.</p>
							<h3>Return value</h3>
							<p>None.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>DOMAssistant.DOMLoad.setErrorHandling(function (e) {<br>
										// e is the error object passed<br>
									});
								</code>
							</p>
						</div>
						
						<div id="sidebar">
							<h3>DOMAssistantLoad methods</h3>
							<ul>
								<li><a href="#DOMReady">DOMReady</a></li>
								<li><a href="#setErrorHandling">setErrorHandling</a></li>
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