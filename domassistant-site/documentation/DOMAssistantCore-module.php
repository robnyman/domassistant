<?php include "../header-start.php" ?>
	<title>DOMAssistant Core module - Documentation - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
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
							<h1>DOMAssistant Core Module</h1>
							<p>The DOMAssistant Core module is required and it lays the groundwork for all DOMAssistant functionality. It consists of core functionality and a few important methods to work with.</p>

							<h2 id="dollar"><code>$(cssSelector/elementRef)</code></h2>
							<p>The $ method is used to get a reference to one or several elements. It supports a <a href="../documentation/css-selectors.php">CSS selector</a> as a string, or an already established element reference. It will return the matching element(s) with all the extra DOMAssistant methods applied. A call of any of those methods will fail silently, if the <code>$</code> method returned an empty array.</p>
							
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
							
							<h2 id="cssSelect"><code>cssSelect(cssSelector)</code></h2>
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
							</p>

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
							
							<h2 id="hasChild"><code>hasChild(elementRef)</code></h2>
							<p>Returns true if elementRef is a descendant of the current element.</p>
							<h3>Return value</h3>
							<p>True if elementRef is a child (direct or non-direct), false otherwise.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>elementRef</dt>
								<dd>An element reference of the item to test for.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									if (outerElm.hasChild(innerElm))<br> 
										alert("innerElm is a child of outerElm!");
								</code>
							</p>
							
							<h2 id="prev"><code>prev()</code></h2>
							<p>Gets a reference to the previous HTML element, automatically bypassing any text nodes that might be in between.</p>
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
							<p>Gets a reference to the next HTML element, automatically bypassing any text nodes that might be in between.</p>
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

							<h2 id="each"><code>each(functionRef)</code></h2>
							<p>For running a function on each of the items in a returned array element reference collection.</p>
							<h3>Return value</h3>
							<p>All calls return either a single element reference or an array of element references.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>functionRef</dt>
								<dd>Function which will be called for each item in the array of elements it's called on. Can be an anonymous function or a function reference. Traversal can be terminated by returning false in the function. This function is invoked with three arguments: the current item, the index of the item, and the element collection being traversed.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("#navigation a").each( function(elm, idx, set) {<br>
										alert("This is item " + idx);<br>
										if (idx === 5) return false; //Stop counting after 5<br>
									});
								</code>
							</p>
							
							<h2 id="indexOf"><code>indexOf(elementRef)</code></h2>
							<p>Returns the index of the first occurrence of the item within the collection of elements.</p>
							<h3>Return value</h3>
							<p>Zero-based index of the element if found, and -1 otherwise.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>elementRef</dt>
								<dd>An element reference of the item to search for.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									var elm = $$("content");<br>
									var idx = $("div").indexOf(elm);
								</code>
							</p>
							
							<h2 id="map"><code>map(functionRef)</code></h2>
							<p>Runs a function on each item, and returns the results in an array.</p>
							<h3>Return value</h3>
							<p>An array of the mapped results.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>functionRef</dt>
								<dd>Mapping function to be applied to each item. This function is invoked with three arguments: the current item, the index of the item, and the element collection being traversed.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									// Creates an array of element ID
									var arrayID = $("div").map( function(elm, idx, set) {<br>
										return this.id;<br>
									});
								</code>
							</p>
							
							<h2 id="filter"><code>filter(functionRef)</code></h2>
							<p>Runs a function to filter the element collection, and returns all items where the function returned true.</p>
							<h3>Return value</h3>
							<p>The filtered element collection.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>functionRef</dt>
								<dd>Filtering function to be applied to each item. This function is invoked with three arguments: the current item, the index of the item, and the element collection being traversed.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									var oddItems = $("div").filter( function(elm, idx, set) {<br>
										return (idx % 2 === 1);<br>
									});
								</code>
							</p>
							
							<h2 id="every"><code>every(functionRef)</code></h2>
							<p>Runs a function on each item in the element collection, while it returns true.</p>
							<h3>Return value</h3>
							<p>Boolean value, true if <i>all</i> items return true on the function, false otherwise.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>functionRef</dt>
								<dd>Function to be applied to each item. Returns either true or false. This function is invoked with three arguments: the current item, the index of the item, and the element collection being traversed.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									var allHaveChildren = $("div").every( function(elm, idx, set) {<br>
										return (this.childNodes.length > 0);<br>
									});
								</code>
							</p>
							
							<h2 id="some"><code>some(functionRef)</code></h2>
							<p>Runs a function on each item in the element collection, while it returns false.</p>
							<h3>Return value</h3>
							<p>Boolean value, true if <i>some</i> items return true on the function, false otherwise.</p>

							<h3>Parameters</h3>
						 	<dl>
								<dt>functionRef</dt>
								<dd>Function to be applied to each item. Returns either true or false. This function is invoked with three arguments: the current item, the index of the item, and the element collection being traversed.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									var someHaveChildren = $("div").some( function(elm, idx, set) {<br>
										return (this.childNodes.length > 0);<br>
									});
								</code>
							</p>
							
							<h2 id="first"><code>first()</code></h2>
							<p>To get a reference to the ﬁrst match in a collection.</p>
							<h3>Return value</h3>
							<p>Returns a reference to the first element match in a collection, with the DOMAssistant methods applied.</p>

							<h3>Parameters</h3>
						 	<p>None.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$("#navigation a").first();
								</code>
							</p>
							
							<h2 id="end"><code>end()</code></h2>
							<p>To step one step up in the currect chaining context.</p>
							<h3>Return value</h3>
							<p>Returns a value to the previous element set in the chain.</p>

							<h3>Parameters</h3>
						 	<p>None.</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									// Returns a reference to the a elements<br>
									$("#navigation a").create("span", null, true).end();
								</code>
							</p>
							
							<h2 id="store"><code>store(key, value)</code></h2>
							<p>To store arbitrary data to the current element.</p>
							<h3>Return value</h3>
							<p>Element which called the method.</p>

							<h3>Parameters</h3>
							<dl>
								<dt>key</dt>
								<dd>Name of the data being stored. Can be a string, and is then used in conjunction with the value, or as an object with several key-value pairs. Required.</dd>
								<dt>value</dt>
								<dd>The value of the data being stored, if the key parameter is a string. Optional.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$$("elem").store("foo", "bar");<br>
									$$("child").store( { "name": "Tom", "age": 6, "sex": "M" } );
								</code>
							</p>
							
							<h2 id="retrieve"><code>retrieve(key)</code></h2>
							<p>To retrieve data that has previously been stored to the current element.</p>
							<h3>Return value</h3>
							<p>Value of the key if it is specified, otherwise the unique ID of the element.</p>

							<h3>Parameters</h3>
							<dl>
								<dt>key</dt>
								<dd>Name of the data to be retrieved. Optional. If unspecified, the unique ID of the current element is returned.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									var foo = $$("elem").retrieve("foo");   //bar<br>
									var age = $$("child").retrieve("age");  //6<br>
									alert("Unique ID is " + $$("child").retrieve());
								</code>
							</p>

							<h2 id="unstore"><code>unstore(key)</code></h2>
							<p>To remove data that has previously been stored to the current element.</p>
							<h3>Return value</h3>
							<p>Element which called the method.</p>

							<h3>Parameters</h3>
							<dl>
								<dt>key</dt>
								<dd>Name of the data to be removed. Optional. If unspecified, all data associated with the current element is removed.</dd>
							</dl>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									$$("elem").unstore("foo");<br>
									$$("child").unstore();   //Removes all data<br>
								</code>
							</p>
							
							<h2 id="harmonize"><code>harmonize()</code></h2>
							<p>Allows DOMAssistant to co-exist in harmony with other Javascript libraries, by avoiding global namespace collision of $ and $$. The dollar methods are still accessible via DOMAssistant.$ and DOMAssistant.$$</p>
							<h3>Return value</h3>
							<p>None</p>

							<h3>Parameters</h3>
							<p>None</p>

							<h3>Example calls</h3>
							<p class="code">
								<code>
									&lt;script type="text/javascript" src="OtherLib.js"&gt; &lt;/script&gt;<br>
									&lt;script type="text/javascript" src="DOMAssistantCompressed.js"&gt; &lt;/script&gt;<br>
									&lt;script type="text/javascript"&gt;<br>
									&nbsp;&nbsp;&nbsp;&nbsp;DOMAssistant.DOMReady( function() {<br>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Your DOMAssistant code<br>
									&nbsp;&nbsp;&nbsp;&nbsp;} );<br>
									&nbsp;&nbsp;&nbsp;&nbsp;DOMAssistant.harmonize();<br>
									<br>
									&nbsp;&nbsp;&nbsp;&nbsp;// Other library's code here<br>
									<br>
									&lt;/script&gt;<br>
								</code>
							</p>
							
						</div>
						
						<div id="sidebar">
							<h3>DOMAssistant Core methods</h3>
							<ul>
								<li><a href="#dollar">$</a></li>
								<li><a href="#double-dollar">$$</a></li>
								<li><a href="#cssSelect">cssSelect</a></li>
								<li><a href="#elmsByClass">elmsByClass</a></li>
								<li><a href="#elmsByAttribute">elmsByAttribute</a></li>
								<li><a href="#elmsByTag">elmsByTag</a></li>
								<li><a href="#hasChild">hasChild</a> <sup>New</sup></li>
								<li><a href="#prev">prev</a></li>
								<li><a href="#next">next</a></li>
								<li><a href="#each">each</a></li>
								<li><a href="#indexOf">indexOf</a> <sup>New</sup></li>
								<li><a href="#map">map</a> <sup>New</sup></li>
								<li><a href="#filter">filter</a> <sup>New</sup></li>
								<li><a href="#every">every</a> <sup>New</sup></li>
								<li><a href="#some">some</a> <sup>New</sup></li>
								<li><a href="#first">first</a></li>
								<li><a href="#end">end</a></li>
								<li><a href="#store">store</a> <sup>New</sup></li>
								<li><a href="#retrieve">retrieve</a> <sup>New</sup></li>
								<li><a href="#unstore">unstore</a> <sup>New</sup></li>
								<li><a href="#harmonize">harmonize</a> <sup>New</sup></li>
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