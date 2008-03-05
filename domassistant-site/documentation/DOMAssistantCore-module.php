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

							<h2 id="dollar"><code>$(cssSelector/elementReference)</code></h2>
							<p>The $ method is used to get a reference to one or several elements. It supports a <a href="/documentation/css-selectors.php">CSS selector</a> as a string, an already established element reference. It will return the matching element(s) with all the extra DOMAssistant methods applied. A call of any of those methods will fail silently, if the <code>$</code> method returned an empty array.</p>
							
							<h3>Parameters</h3>
							<p>Send in a CSS selector or an object reference.</p>
							<h3>Return value</h3>
							<p>Always return an array of matching elements for a CSS selector. If one single object is sent in, it return that same reference, and if several object references are sent in, it will return an array of those.</p>

							<h3>Example calls</h3>
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
									$("#container", "#navigation .important-item", "#content");
								</code>
							</p>
							<p class="code">
								<code>		
									$(document.body);
								</code>
							</p>
							
							<h2 id="double-dollar"><code>$$(elementId)</code></h2>
							<p>The $$ method is used to get a quick reference to one element, just like <code>document.getElementById</code>. It will return a direct reference to the found DOM element, with all the DOMAssistant methods applied to it.</p>
							<p>Contrary to the <code>$</code> method, if the <code>$$</code> method didn't return any match, it will throw an error if you try to call any method on it.</p>
							
							<h3>Parameters</h3>
							<p>Send in the id of the element you're looking for.</p>
							<h3>Return value</h3>
							<p>Returns a DOM reference.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>$$("container");</code>
							</p>
							<p class="code">
								<code>$$("navigation");</code>
							</p>
							
							<!--<h2 id="cssSelect"><code>cssSelect(cssSelector)</code></h2>
							<p>Intended to be used on existing object references, to use a CSS selector to find children element(s) of the current object.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>cssSelector</dt>
								<dd>Used to select elements. Required.</dd>
							</dl>
							<h3>Return value</h3>
							<p>All calls return an array of element references.</p>

							 <h3>Example calls</h3>
							<p class="code">
								<code>
									$(document).cssSelect(".mandatory");
								</code>
							</p>
							<p class="code">
								<code>
									$$(DOMElementReference).cssSelect(".important[type=test]");
								</code>
							</p>-->

							<h2 id="elmsByClass"><code>elmsByClass(className, tag)</code></h2>
							<p>For getting elements based on their <code>className</code>. The method has a required parameter which is the desired <code>className</code>, and one optional if you want to limit the search to a certain tag.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>className</dt>
								<dd>Class name to search for. Required.</dd>
								<dt>tag</dt>
								<dd>Only search elements that have this tag name. Optional.</dd>
							</dl>
							<h3>Return value</h3>
							<p>All calls return an array of element references.</p>

							 <h3>Example calls</h3>
							<p class="code">
								<code>
									$("#container").elmsByClass("mandatory");
								</code>
							</p>
							<p class="code">
								<code>
									$$("container").elmsByClass("external-link", "a");
								</code>
							</p>
							
							<h2 id="elmsByAttribute"><code>elmsByAttribute(attr, attrVal, tag)</code></h2>
							<p>For getting elements based on if they have a certain attribute. You can also specify if that attribute should have a speific value and if you want to limit the search to a certain tag. Only the first parameter specifying the attribute is required.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>attr</dt>
								<dd>Attribute name to look for. Required.</dd>
								<dt>attrVal</dt>
								<dd>Value that the desired attribute has to have. Optional. Use wildcard character ("*") if you want any attribute value but still want to specify <code>tag</code>.</dd>
								<dt>tag</dt>
								<dd>Only search elements that have this tag name. Optional.</dd>
							</dl>
							<h3>Return value</h3>
							<p>All calls return an array of element references.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("#container").elmsByAttribute("href");
								</code>
							</p>		
							<p class="code">
								<code>
									$$("container").elmsByAttribute("name", "subscription");
								</code>
							</p>		
							<p class="code">
								<code>
									$$("container").elmsByAttribute("type", "text", "input");
								</code>
							</p>
							
							<h2 id="elmsByTag"><code>elmsByTag(tag)</code></h2>
							<p>For getting elements based on their <code>tag</code>, i.e. what element it is. The method has one required parameter which is the name of the desired <code>tag</code>.</p>
							<h3>Return value</h3>
							<p>All calls return an array of element references.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>tag</dt>
								<dd>Tag name to search for. Required.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$$("container").elmsByTag("input");
								</code>
							</p>
							
							<h2 id="each"><code>each(functionRef)</code></h2>
							<p>For running a function on each of the items in a returned array element reference collection.</p>
							<h3>Return value</h3>
							<p>All calls return either a single element reference or an array of element references.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>functionRef</dt>
								<dd>Function which will be called for each item in the array of elements it's called on. Can be an anonymous function or a function reference.</dd>
							</dl>

							<h3>Example calls</h3>
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
								<li><a href="#double-dollar">$$</a></li>
								<!--<li><a href="#cssSelect">cssSelect</a></li>-->
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