<?php include "../header-start.php" ?>
	<title>CSS selectors - Documentation - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
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
							<h1>Supported CSS Selectors <br>(CSS 1, CSS 2, CSS 3)</h1>
							<p>With the DOMAssistant Core module and its <code>$</code> method comes support for using CSS selectors to get a reference to one or multiple elements. There is support for any major CSS element selector in CSS 1, CSS 2 and CSS 3, with the exact same syntax as you would use in a CSS file.</p>
							<p>For an in-depth explanation of the CSS selectors and examples of how us them, please read <a href="http://www.456bereastreet.com/archive/200509/css_21_selectors_part_1/">CSS 2.1 selectors</a> and <a href="http://www.456bereastreet.com/archive/200601/css_3_selectors_explained/">CSS 3 selectors explained</a>.</p>
						
							<h3 id="implemented-css-selectors">Implemented CSS selectors</h3>								
							<dl>
								<dt><code>#container</code></dt>
								<dd>Get an element with the id "container".</dd>
								<dt><code>.item</code></dt>
								<dd>Get all elements with the class name "item".</dd>
								<dt><code>#container.item</code></dt>
								<dd>Get an element with the id "container", if it also has the class name "item".</dd>
								<dt><code>p.info.error</code></dt>
								<dd>Get all <code>P</code> elements with both a class name consisting of both "info" and "item".</dd>
								<dt><code>div p</code></dt>
								<dd>Get all <code>P</code> elements which are descendants of any <code>DIV</code> element.</dd>
								<dt><code>div > p</code></dt>
								<dd>Get all <code>P</code> elements which are direct descendants of any <code>DIV</code> element.</dd>
								<dt><code>div + p</code></dt>
								<dd>Get all <code>P</code> elements where their immediate previous sibling element is a <code>DIV</code> element.</dd>
								<dt><code>div ~ p</code></dt>
								<dd>Get all <code>P</code> elements which are following siblings to a <code>DIV</code> element (not necessarily immediate siblings).</dd>
								<dt><code>div[id]</code></dt>
								<dd>Get any <code>DIV</code> element which has an <code>ID</code> attribute.</dd>
								<dt><code>div[id=container]</code></dt>
								<dd>Get any <code>DIV</code> element which has an <code>ID</code> attribute with the value of "container".</dd>
								<dt><code>input[type=text][value=Yes]</code></dt>
								<dd>Get any <code>INPUT</code> element which has a <code>TYPE</code> attribute with the value of "text" and a <code>VALUE</code> attribute which is ="Yes".</dd>
								<dt><code>div[id^=empt]</code></dt>
								<dd>Get any <code>DIV</code> element where the <code>ID</code> attribute value begins with "empt".</dd>
								<dt><code>div[id$=parent]</code></dt>
								<dd>Get any <code>DIV</code> element where the <code>ID</code> attribute value ends with "parent".</dd>
								<dt><code>div[id*=mpt]</code></dt>
								<dd>Get any <code>DIV</code> element where the <code>ID</code> attribute value contains the text "mpt".</dd>
								<dt><code>div[foo~=bar]</code></dt>
								<dd>Get any <code>DIV</code> element where the <code>foo</code> attribute is a list of space-separated values, one of which is exactly equal to "bar".</dd>
								<dt><code>div[lang|=en]</code></dt>
								<dd>Get any <code>DIV</code> element where the <code>lang</code> attribute has a hyphen-separated list of values beginning (from the left) with "en".</dd>
								<dt><code>div:first-child</code></dt>
								<dd>Get any <code>DIV</code> element which is the first child of its parent element.</dd>
								<dt><code>div:last-child</code></dt>
								<dd>Get any <code>DIV</code> element which is the last child of its parent.</dd>
								<dt><code>div:only-child</code></dt>
								<dd>Get any <code>DIV</code> element which is the only child of its parent.</dd>
								<dt><code>div#container p:first-of-type</code></dt>
								<dd>Get the <code>P</code> element which is the first <code>P</code> element child of a <code>DIV</code> element with an <code>ID</code> attribute with the value "container".</dd>
								<dt><code>p:last-of-type</code></dt>
								<dd>Get the <code>P</code> element which is the last <code>P</code> element child of its parent element.</dd>
								<dt><code>p:only-of-type</code></dt>
								<dd>Get any <code>P</code> element which is the only <code>P</code> element child of its parent element.</dd>
								<dt><code>p:nth-of-type(7)</code></dt>
								<dd>Get the <code>P</code> element which is the 7th <code>P</code> element child of its parent element.</dd>
								<dt><code>div:empty</code></dt>
								<dd>Get any <code>DIV</code> element which is completely empty (including text nodes).</dd>
								<dt><code>div:not([id=container])</code></dt>
								<dd>Get any <code>DIV</code> element where its <code>ID</code> attribute is <em>not</em> "container".</dd>
								<dt><code>div:nth-child(3)</code></dt>
								<dd>Get any <code>DIV</code> element which is the third child element of its parent element.</dd>
								<dt><code>div:nth-child(odd)</code></dt>
								<dd>Get every odd <code>DIV</code> child element of its parent element.</dd>
								<dt><code>div:nth-child(even)</code></dt>
								<dd>Get every even <code>DIV</code> child element of its parent element.</dd>
								<dt><code>div:nth-child(5n+3)</code></dt>
								<dd>Get every 5th <code>DIV</code> child element of its parent element, starting at 3, then 8, 13, 18 etc.</dd>
								<dt><code>tr:nth-last-of-type(-n+3)</code></dt>
								<dd>Get the last three rows of any tables.</dd>
								<dt><code>td:nth-last-child(n+1)</code></dt>
								<dd>Get all but the last column of any tables.</dd>
								<dt><code>input:enabled</code></dt>
								<dd>Get any <code>INPUT</code> element which is enabled.</dd>
								<dt><code>input:disabled</code></dt>
								<dd>Get any <code>INPUT</code> element which is disabled.</dd>
								<dt><code>input:checked</code></dt>
								<dd>Get any <code>INPUT</code> element which is checked.</dd>
								<dt><code>div:lang(zh)</code></dt>
								<dd>Get any <code>DIV</code> element which is in Chinese.</dd>
								<dt><code>p:target</code></dt>
								<dd>Get the <code>P</code> element which is the target of the referring URL.</dd>
								<dt><code>p, a</code></dt>
								<dd>Get all <code>P</code> elements and all <code>A</code> elements.</dd>
							</dl>					
						</div>
						
						<div id="sidebar">
							<h3>CSS selectors</h3>
							<ul>
								<li><a href="#implemented-css-selectors">Implemented CSS selectors</a></li>
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