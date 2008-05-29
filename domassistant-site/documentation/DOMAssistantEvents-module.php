<?php include "../header-start.php" ?>
	<title>DOMAssistantEvents module - Documentation - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
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
							<h1>DOMAssistantEvents Module</h1>
							<p>The DOMAssistantEvents module offers various methods for adding and removing handlers for one or several events on an element. It also contains functionality for stopping default actions and bubbling of events.</p>

							<h2 id="addEvent"><code>addEvent(evt, func)</code></h2>
							<p>Adds an event handler to the current element. Multiple event handlers are supported, and the receiving funtion will have an event object reference and a <code>this</code> reference to the element it occurred on, no matter what web browser. For accessibility reasons, please make sure to only apply click events to elements that can handle them without JavaScript enabled.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>evt</dt>
								<dd>Event to apply, specified as a string, without the "on" prefix.</dd>
								<dt>func</dt>
								<dd>Function to handle the event, specified as a function reference (without parentheses) or an anonymous function.</dd>
							</dl>
							<h3>Return value</h3>
							<p>Element which called the method.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").addEvent("click", getListing);
								</code>
							</p>
							<p class="code">
								<code>
									$("container").addEvent("click", function (){<br>
										alert("Hello darling!");<br>
									});
								</code>
							</p>

							<h2 id="removeEvent"><code>removeEvent(evt, func)</code></h2>
							<p>Removes an event handler from the current element. Works only for function references, and not anonymous functions.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>evt</dt>
								<dd>Event to remove, specified as a string, without the "on" prefix.</dd>
								<dt>func</dt>
								<dd>Function to stop from handling the event, specified as a function reference (without parentheses).</dd>
							</dl>
							<h3>Return value</h3>
							<p>Element which called the method.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").removeEvent("click", getListing);
								</code>	
							</p>

							<h2 id="preventDefault"><code>preventDefault(evt)</code></h2>
							<p>Prevents the default action of an event. Can be called from any function, and is not a method of any element.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>evt</dt>
								<dd>Event to prevent the default action of.</dd>
							</dl>
							<h3>Return value</h3>
							<p>None.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									DOMAssistant.preventDefault(eventReference);
								</code>	
							</p>

							<h2 id="cancelBubble"><code>cancelBubble(evt)</code></h2>
							<p>Cancels the bubbling of an event. Can be called from any function, and is not a method of any element.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>evt</dt>
								<dd>Event to cancel the bubbling of.</dd>
							</dl>
							<h3>Return value</h3>
							<p>None.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									DOMAssistant.cancelBubble(eventReference);
								</code>
							</p>
						</div>
						
						<div id="sidebar">
							<h3>DOMAssistantEvents methods</h3>
							<ul>
								<li><a href="#addEvent">addEvent</a></li>
								<li><a href="#removeEvent">removeEvent</a></li>
								<li><a href="#preventDefault">preventDefault</a></li>
								<li><a href="#cancelBubble">cancelBubble</a></li>
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