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
							<h1>DOMAssistantLoad Module</h1>
							<p>The DOMAssistantLoad module offers a way to call a number of functions as soon as the DOM has loaded, as opposed to waiting for all images and other external files to completely load. It was inspired and influenced by Dean Edwards, Matthias Miller, and John Resig: <a href="http://dean.edwards.name/weblog/2006/06/again/">window.onload (again)</a>.</p>

							<h4 id="DOMReady"><code>DOMReady()</code></h4>
							<p>From any file, just call the DOMReady method with desired functions and they will be executed as soon as the DOM has loaded.</p>
							<h5>Parameters</h5>
							<p>Send in any number of function references, anonymous functions or strings with function names and parentheses.</p>
							<h5>Return value</h5>
							<p>None.</p>

							<h5>Example calls</h5>
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
						</div>
						
						<div id="sidebar">
							<h3>DOMAssistantLoad methods</h3>
							<ul>
								<li><a href="#DOMReady">DOMReady</a></li>
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
	
</body>
</html>