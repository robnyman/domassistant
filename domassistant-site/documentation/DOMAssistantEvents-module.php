<?php include "../header-start.php" ?>
	<title>DOMAssistantEvents module - Documentation - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
<?php include "../header-end.php" ?>

<body>
	
	<div id="container">
			<div id="header">
				<div id="header-content">
					<h1><a href="../"><span></span>DOMAssistant</a></h1>
					<div id="navigation">
						<ul>
							<li><a href="../">Home</a>/</li>
							<li><a href="../download">Download</a>/</li>
							<li><a href="../documentation" class="selected">Documentation</a>/</li>
							<li><a href="../plugins">Plugins</a>/</li>
							<li><a href="../discussion-support">Discussion &amp; Support</a>/</li>
							<li><a href="../about">About</a>/</li>
							<li class="last"><a href="../blog">Blog</a></li>
						</ul>
					</div>
				</div>
			</div>
			
			<div id="main-content">				
				<div id="content">					
					<div id="content-areas">
						<div id="main-content-area">
							<h1>DOMAssistantEvents Module</h1>
							<p>The DOMAssistantEvents module offers various methods for adding and removing handlers for one or several events on an element, using either traditional event handling or <a href="http://robertnyman.com/2008/05/04/event-delegation-with-javascript/">event delegation</a>. It also contains functionality for stopping default actions and bubbling of events.</p>

							<h2 id="addEvent"><code>addEvent(evt, func)</code></h2>
							<p>Adds an event handler to the current element. Multiple event handlers are supported, and the receiving funtion will have an event object reference and a <code>this</code> reference to the element it occurred on, no matter what web browser. For accessibility reasons, please make sure to only apply click events to elements that can handle them without JavaScript enabled.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>evt</dt>
								<dd>Event to apply, specified as a string, without the "on" prefix. Custom events are acceptable.</dd>
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
									$("container").addEvent("dblclick", function () {<br>
										alert("Hello darling!");<br>
									});
								</code>
							</p>

							<h2 id="removeEvent"><code>removeEvent(evt, func)</code></h2>
							<p>Removes either a specific event handler or all of them from the current element.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>evt</dt>
								<dd>Event to remove, specified as a string, without the "on" prefix. Optional. If unspecified, handlers for all events (including inline events) will be removed.</dd>
								<dt>func</dt>
								<dd>Function to stop from handling the event, specified as a function reference (without parentheses). Optional. If unspecified, all handlers (including inline event handlers) for the event will be removed.</dd>
							</dl>
							<h3>Return value</h3>
							<p>Element which called the method.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").removeEvent("click", getListing);
								</code>	
							</p>
							<p class="code">
								<code>
									// To remove all events bound to the odd row, either do this<br>
									$("tr:nth-child(odd)").removeEvent("mouseover").removeEvent("mouseout");<br>
									<br>
									// Or do this<br>
									$("tr:nth-child(odd)").removeEvent();
								</code>	
							</p>

							<h2 id="relayEvent"><code>relayEvent(evt, selector, func)</code></h2>
							<p>Adds a centralized event handler to the current element. Events that occur on elements matching the selector bubble up and get handled in the current element. Most bubbling events are supported, including focus and blur.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>evt</dt>
								<dd>Event to apply, specified as a string, without the "on" prefix. Custom events are acceptable.</dd>
								<dt>selector</dt>
								<dd>Actual targets that the event should occur on, specified as a CSS selectors.</dd>
								<dt>func</dt>
								<dd>Function to handle the event, specified as a function reference (without parentheses) or an anonymous function.</dd>
							</dl>
							<h3>Return value</h3>
							<p>Element which called the method.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("ul").relayEvent("click", "li", jumpToPage);
								</code>
							</p>
							<p class="code">
								<code>
									$("form").relayEvent("focus", "input[type=text]", function() {<br>
										this.addClass("yellow");<br>
									});
								</code>
							</p>

							<h2 id="unrelayEvent"><code>unrelayEvent(evt)</code></h2>
							<p>Removes all relayed events of the specific type from the current element.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>evt</dt>
								<dd>Event to remove, specified as a string, without the "on" prefix.</dd>
							</dl>
							<h3>Return value</h3>
							<p>Element which called the method.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("ul").unrelayEvent("click");
								</code>	
							</p>

							<h2 id="triggerEvent"><code>triggerEvent(evt, target)</code></h2>
							<p>Triggers an event on the current element, and optionally sets the <i>target</i> to which the event is dispatched to. Note that the actual event does not happen - this method merely triggers the event handlers.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>evt</dt>
								<dd>Event to trigger, specified as a string, without the "on" prefix. Custom events are acceptable.</dd>
								<dt>target</dt>
								<dd>The target element to which the event is dispatched. Optional.</dd>
							</dl>
							<h3>Return value</h3>
							<p>Element which called the method.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("news").triggerEvent("click");
								</code>	
							</p>
							<p class="code">
								<code>
									$("home-link").triggerEvent("customevent", elementRef);
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
								<li><a href="#relayEvent">relayEvent</a> <sup>New</sup></li>
								<li><a href="#unrelayEvent">unrelayEvent</a> <sup>New</sup></li>
								<li><a href="#triggerEvent">triggerEvent</a></li>
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