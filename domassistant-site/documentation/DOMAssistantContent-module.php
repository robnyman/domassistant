<?php include "../header-start.php" ?>
	<title>DOMAssistantContent module - Documentation - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
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
							<h1>DOMAssistantContent Module</h1>
							<p>The DOMAssistantContent module offers various methods for adding and removing content and elements to the page.</p>

							<h2 id="prev"><code>prev()</code></h2>
							<p>Gets a reference to the previous HTML element, automatically bypassing any text nodes that might in between.</p>
							<h3>Parameters</h3>
							<p>None.</p>
							
							<h3>Return value</h3>
							<p>Element's previous sibling element.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").prev();
								</code>
							</p>

							<h2 id="next"><code>next()</code></h2>
							<p>Gets a reference to the next HTML element, automatically bypassing any text nodes that might in between.</p>
							<h3>Parameters</h3>
							<p>None.</p>
							
							<h3>Return value</h3>
							<p>Element's next sibling element.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").next();
								</code>
							</p>

							<h2 id="create"><code>create(name, attr, append, content)</code></h2>
							<p>Creates an element, and optionally sets attributes on it, appends it to the current element and adds content to it.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>name</dt>
								<dd>Tag name for the new element. Required.</dd>
								<dt>attr</dt>
								<dd>An object containing attributes and their values. Optional.</dd>
								<dt>append</dt>
								<dd>Boolean if the new element should be appended right away. Optional.</dd>
								<dt>content</dt>
								<dd>A string or HTML object that will become the content of the newly created element. Optional.</dd>
							</dl>
							
							<h3>Return value</h3>
							<p>Element created by the method.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").create("div");
								</code>
							</p>
							<p class="code">
								<code>
									$("container").create("div", {<br>
										id : "my-div",<br>
										className : "my-class"<br>
									});
								</code>
							</p>		
							<p class="code">
								<code>
									$("container").create("div", null, false, "Hello!");
								</code>
							</p>
							<p class="code">
								<code>
									$("container").create("div", {<br>
										id : "my-div",<br>
										className : "my-class"<br>
									}, true, "Hi there!");
								</code>
							</p>

							<h2 id="setAttributes"><code>setAttributes(attr)</code></h2>
							<p>Sets attributes on the current element.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>attr</dt>
								<dd>An object containing attributes and their values. Required.</dd>
							</dl>
							
							<h3>Return value</h3>
							<p>Element which called the method.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").setAttributes({<br>
										id : "my-div",<br>
										className : "my-class"<br>
									});
								</code>
							</p>

							<h2 id="addContent"><code>addContent(content)</code></h2>
							<p>Adds content to the current element.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>content</dt>
								<dd>Can either be a string, which will then be applied using <code>innerHTML</code>, or an HTML object that will be applied using <code>appendChild</code>.</dd>
							</dl>
							
							<h3>Return value</h3>
							<p>Element which called the method.</p>
							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").addContent("&lt;p&gt;A new paragraph&lt;/p&gt;");
								</code>
							</p>
							<p class="code">
								<code>
									$("container").addContent(document.createElement("p"));
								</code>
							</p>

							<h2 id="replaceContent"><code>replaceContent(newContent)</code></h2>
							<p>Replaces the content of the current element with new content.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>newContent</dt>
								<dd>Can either be a string, which will then be applied using <code>innerHTML</code>, or a HTML object that will be applied using <code>appendChild</code>.</dd>
							</dl>

							<h3>Return value</h3>
							<p>Element which called the method.</p>
							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").replaceContent("&lt;p&gt;A new paragraph&lt;/p&gt;");
								</code>
							</p>
							<p class="code">
								<code>		
									$("container").replaceContent(document.createElement("p"));
								</code>
							</p>

							<h2 id="replace"><code>replace(content, returnNew)</code></h2>
							<p>Replaces the current element with a new one.</p>
							<h3>Parameters</h3>
							<dl>
								<dt>content</dt>
								<dd>New content that can be specified either through an element, string or number reference.</dd>
								<dt>returnNew</dt>
								<dd>If set to true, the new element is returned; otherwise the replaced element is returned. Optional.</dd>
							</dl>

							<h3>Return value</h3>
							<p>Either the replaced element or the new element.</p>
							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").replace("&lt;div&gt;&lt;em&gt;Way&lt;/em&gt; cooler content!&lt;/div&gt;");
								</code>
							</p>
							<p class="code">
								<code>		
									var newElem = $$("placeholder").replace(elementRef, true);
								</code>
							</p>

							<h2 id="remove"><code>remove()</code></h2>
							<p>Removes the current element.</p>
							<h3>Parameters</h3>
							<p>None.</p>

							<h3>Return value</h3>
							<p>Null.</p>
							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("container").remove();
								</code>
							</p>
						</div>
						
						<div id="sidebar">
							<h3>DOMAssistantContent methods</h3>
							<ul>
								<li><a href="#prev">prev</a></li>
								<li><a href="#next">next</a></li>
								<li><a href="#create">create</a></li>
								<li><a href="#setAttributes">setAttributes</a></li>
								<li><a href="#addContent">addContent</a></li>
								<li><a href="#replaceContent">replaceContent</a></li>
								<li><a href="#replace">replace</a></li>
								<li><a href="#remove">remove</a></li>
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