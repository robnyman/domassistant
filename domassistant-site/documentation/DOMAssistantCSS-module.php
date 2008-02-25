<?php include "../header-start.php" ?>
	<title>DOMAssistantCSS module - Documentation - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors and AJAX</title>
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
							<h1>DOMAssistantCSS Module</h1>
							<p>The DOMAssistantCSS module offers various methods for adding and removing CSS classes, checking if an element has a certain class and getting the rendered style for a specific property on an element.</p>

							<h4 id="addclass"><code>addClass(className)</code></h4>
							<p>Adds a class name to the current element, unless it already exists.</p>
							<h5>Parameters</h5>
							<dl>
								<dt>className</dt>
								<dd>Desired class name to be added. Required.</dd>
							</dl>
							<h5>Return value</h5>
							<p>Element which called the method.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>
									$("container").addClass("selected");
								</code>
							</p>

							<h4 id="removeclass"><code>removeClass(className)</code></h4>
							<p>Removes a class name from the current element.</p>
							<h5>Parameters</h5>
							<dl>
								<dt>className</dt>
								<dd>Desired class name to remove. Required.</dd>
							</dl>
							<h5>Return value</h5>
							<p>Element which called the method.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>
									$("container").removeClass("selected");
								</code>
							</p>

							<h4 id="hasclass"><code>hasClass(className)</code></h4>
							<p>Checks whether the current element has a certain class name.</p>
							<h5>Parameters</h5>
							<dl>
								<dt>className</dt>
								<dd>Class name to check if it exists on the current element. Required.</dd>
							</dl>
							<h5>Return value</h5>
							<p>Boolean. Whether the element has the requested class or not.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>
									$("container").hasClass("selected");
								</code>
							</p>

							<h4 id="getstyle"><code>getStyle(cssRule)</code></h4>
							<p>Gets the rendered style for a certain CSS property on the current element, no matter if it was applied inline or from an external stylesheet. Note: make sure to look for the specific property instead of general ones. I.e. <code>background-color</code> instead of <code>background</code> etc.</p>
							<h5>Parameters</h5>
							<dl>
								<dt>cssRule</dt>
								<dd>CSS property to check value of. Use CSS syntax for the property, i.e. <code>background-color</code> instead of <code>backgroundColor</code>. Required.</dd>
							</dl>
							<h5>Return value</h5>
							<p>String. The value of the requested style.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>
									$("container").getStyle("background-color");
								</code>
							</p>							
						</div>
						
						<div id="sidebar">
							<h3>DOMAssistantCSS methods</h3>
							<ul>
								<li><a href="#addclass">addClass</a></li>
								<li><a href="#removeclass">removeClass</a></li>
								<li><a href="#hasclass">hasClass</a></li>
								<li><a href="#getstyle">getStyle</a></li>
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