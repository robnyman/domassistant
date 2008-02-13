<?php include "../header-start.php" ?>
	<title>DOMAssistant Core module - Documentation - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors and AJAX</title>
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
							<h1>DOMAssistant Core Module</h1>
							<p>The DOMAssistant Core module is required and it lays the groundwork for all DOMAssistant functionality. It consists of core functionality and a few important methods to work with.</p>

							<h4 id="dollar"><code>$(cssSelector/elementReference)</code></h4>
							<p>The $ method is used to get a reference to one or several elements. It supports one or more strings containing the id of the element(s) you want a reference to, or getting an already established element reference. If it gets an element reference, it will return that same reference, but with the difference that it has applied all extra methods to it.</p>
							<p>You can also send in a CSS selector where there's support for CSS 1, CS 2 and CSS 3 for getting element references. Read more about the <a href="css-selectors.html">supported CSS selectors</a>.</p>
							
							<h5>Parameters</h5>
							<p>Send in one or several strings with the <code>id</code> of the element(s) you're looking, a single element reference or a CSS selector.</p>
							<h5>Return value</h5>
							<p>Returns an element reference when one single argument is sent to the method, being the id or direct reference to an already existing element. Returns an array of element references if multiple ids, element references or a CSS selector is sent in.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>$("#container input[type=text]");</code>
							</p>
							<p class="code">
								<code>$("#navigation a");</code>
							</p>
							<p class="code">
								<code>$("#news-list");</code>
							</p>
							<p class="code">
								<code>		
									$("#container", "#navigation", "#content");
								</code>
							</p>
							<p class="code">
								<code>		
									$(document.body);
								</code>
							</p>

							<h4 id="elmsByClass"><code>elmsByClass(className, tag)</code></h4>
							<p>For getting elements based on their <code>className</code>. The method has a required parameter which is the desired <code>className</code>, and one optional if you want to limit the search to a certain tag.</p>

							<h5>Parameters</h5>
						 	<dl>
								<dt>className</dt>
								<dd>Class name to search for. Required.</dd>
								<dt>tag</dt>
								<dd>Only search elements that have this tag name. Optional.</dd>
							</dl>
							<h5>Return value</h5>
							<p>All calls return an array of element references.</p>

							 <h5>Example calls</h5>
							<p class="code">
								<code>
									$("container").elmsByClass("mandatory");
								</code>
							</p>
							<p class="code">
								<code>
									$("container").elmsByClass("external-link", "a");
								</code>
							</p>
							
							<h4 id="elmsByAttribute"><code>elmsByAttribute(attr, attrVal, tag)</code></h4>
							<p>For getting elements based on if they have a certain attribute. You can also specify if that attribute should have a speific value and if you want to limit the search to a certain tag. Only the first parameter specifying the attribute is required.</p>

							<h5>Parameters</h5>
						 	<dl>
								<dt>attr</dt>
								<dd>Attribute name to look for. Required.</dd>
								<dt>attrVal</dt>
								<dd>Value that the desired attribute has to have. Optional. Use wildcard character ("*") if you want any attribute value but still want to specify <code>tag</code>.</dd>
								<dt>tag</dt>
								<dd>Only search elements that have this tag name. Optional.</dd>
							</dl>
							<h5>Return value</h5>
							<p>All calls return an array of element references.</p>

							<h5>Example calls</h5>
							<p class="code">
								<code>
									$("container").elmsByAttribute("href");
								</code>
							</p>		
							<p class="code">
								<code>
									$("container").elmsByAttribute("name", "subscription");
								</code>
							</p>		
							<p class="code">
								<code>
									$("container").elmsByAttribute("type", "text", "input");
								</code>
							</p>
							
							<h4 id="elmsByTag"><code>elmsByTag(tag)</code></h4>
							<p>For getting elements based on their <code>tag</code>, i.e. what element it is. The method has one required parameter which is the name of the desired <code>tag</code>.</p>
							<h5>Return value</h5>
							<p>All calls return an array of element references.</p>

							<h5>Parameters</h5>
						 	<dl>
								<dt>tag</dt>
								<dd>Tag name to search for. Required.</dd>
							</dl>

							<h5>Example calls</h5>
							<p class="code">
								<code>
									$("container").elmsByTag("input");
								</code>
							</p>
							
							<h4 id="each"><code>each(functionRef)</code></h4>
							<p>For running a function on each of the items in a returned array element reference collection.</p>
							<h5>Return value</h5>
							<p>All calls return either a single element reference or an array of element references.</p>

							<h5>Parameters</h5>
						 	<dl>
								<dt>functionRef</dt>
								<dd>Function which will be called for each item in the array of elements it's called on. Can be an anonymous function or a function reference.</dd>
							</dl>

							<h5>Example calls</h5>
							<p class="code">
								<code>
									$("#navigation a").each(function () {<br>
										// Do some JavaScript magic<br>
									});
								</code>
							</p>						
						</div>
						
						<div id="sidebar">
							<h3>DOMAssistant Core methods</h3>
							<ul>
								<li><a href="#dollar">$</a></li>
								<li><a href="#elmsByClass">elmsByClass</a></li>
								<li><a href="#elmsByAttribute">elmsByAttribute</a></li>
								<li><a href="#elmsByTag">elmsByTag</a></li>
								<li><a href="#each">each</a></li>
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