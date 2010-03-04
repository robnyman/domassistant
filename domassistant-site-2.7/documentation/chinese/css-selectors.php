<?php include "../../header-start.php" ?>
	<title>CSS selectors - Documentation - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
<?php include "../../header-end.php" ?>

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
							<h1>支援的 CSS 选择符<br>(CSS 1, CSS 2, CSS 3)</h1>
							<p>DOMAssistant 核心模块的 $ 方法支援使用 CSS 选择符来取得一个或多个元素的引用。CSS 1、CSS 2 和 CSS 3 规范里主要的选择符都可使用，并拥有与 CSS 文件同样的语法。</p>
							<p>想深入了解 CSS 选择符和它们的使用法，可参考 <a href="http://www.456bereastreet.com/archive/200509/css_21_selectors_part_1/">CSS 2.1  选择符</a> 和 <a href="http://www.456bereastreet.com/archive/200601/css_3_selectors_explained/">CSS 3  选择符阐述</a>.</p>
						
							<h3 id="implemented-css-selectors">Implemented CSS selectors</h3>								
							<dl>
								<dt><code>#container</code></dt>
								<dd>获取 id 为 "container" 的元素</dd>
								<dt><code>.item</code></dt>
								<dd>获取所有类为 "item" 的元素</dd>
								<dt><code>#container.item</code></dt>
								<dd>获取 id 为 "container"，与此同时类为 "item" 的元素</dd>
								<dt><code>p.info.error</code></dt>
								<dd>获取所有具备 "info" 类和 "item" 类的 P 元素</dd>
								<dt><code>div p</code></dt>
								<dd>获取所有是 DIV 元素后代的 P 元素</dd>
								<dt><code>div > p</code></dt>
								<dd>获取所有是 DIV 元素直属后代的 P 元素</dd>
								<dt><code>div + p</code></dt>
								<dd>获取所有直属前驱兄弟是 DIV 元素的 P 元素</dd>
								<dt><code>div ~ p</code></dt>
								<dd>获取所有是 DIV 元素后继兄弟的 P 元素。（不一定直属</dd>
								<dt><code>div[id]</code></dt>
								<dd>获取所有拥有 id 属性的 DIV 元素</dd>
								<dt><code>div[id=container]</code></dt>
								<dd>获取所有 id 属性值为 "container" 的 DIV 元素</dd>
								<dt><code>input[type=text][value=Yes]</code></dt>
								<dd>获取所有 type 属性值为 "text" 和 value 属性值为 "Yes" 的 INPUT 元素</dd>
								<dt><code>div[id^=empt]</code></dt>
								<dd>获取所有 id 属性值开头为 "empt" 的 DIV 元素</dd>
								<dt><code>div[id$=parent]</code></dt>
								<dd>获取所有 id 属性值结尾为 "parent" 的 DIV 元素</dd>
								<dt><code>div[id*=mpt]</code></dt>
								<dd>获取所有 id 属性值包含 "mpt" 字串的 DIV 元素</dd>
								<dt><code>div[foo~=bar]</code></dt>
								<dd>获取所有 foo 属性值是一个以空格分割的列表，且其中之一为 "bar" 的 DIV 元素</dd>
								<dt><code>div[lang|=zh]</code></dt>
								<dd>获取所有 lang 属性值是一个以连字号分割的列表，并且以 "zh" 开头的 DIV 元素</dd>
								<dt><code>div:first-child</code></dt>
								<dd>获取所有身为第一个子元素的 DIV。</dd>
								<dt><code>div:last-child</code></dt>
								<dd>获取所有身为最后一个子元素的 DIV。</dd>
								<dt><code>div:only-child</code></dt>
								<dd>获取所有身为唯一子元素的 DIV。</dd>
								<dt><code>div#container p:first-of-type</code></dt>
								<dd>获取 id 值为 "container" 的 DIV 元素的后代， 而其必须是第一个 P 类型子元素。</dd>
								<dt><code>p:last-of-type</code></dt>
								<dd>获取所有身为最后一个 P 类型的子元素。</dd>
								<dt><code>p:only-of-type</code></dt>
								<dd>获取所有身为唯一 P 类型子元素的元素。</dd>
								<dt><code>p:nth-of-type(7)</code></dt>
								<dd>获取为第七个 P 类型子元素的元素。</dd>
								<dt><code>div:empty</code></dt>
								<dd>获取完全空的 DIV 元素 （包括文字节点）。</dd>
								<dt><code>div:not([id=container])</code></dt>
								<dd>获取所有 id 属性值不是 "container" 的 DIV 元素.</dd>
								<dt><code>div:nth-child(3)</code></dt>
								<dd>获取为第三个子元素的 DIV 元素。</dd>
								<dt><code>div:nth-child(odd)</code></dt>
								<dd>获取所有 DIV 元素集中序数为奇数的元素。</dd>
								<dt><code>div:nth-child(even)</code></dt>
								<dd>获取所有 DIV 元素集中序数为偶数的元素。</dd>
								<dt><code>div:nth-child(n5+3)</code></dt>
								<dd>从第三个 DIV 子元素开始，获取所有 DIV 元素集中序数为 (n5+3) 的元素（3, 8, 13, 18 等等）。</dd>
								<dt><code>input:enabled</code></dt>
								<dd>获取所有可用的 INPUT 元素。</dd>
								<dt><code>input:disabled</code></dt>
								<dd>获取所有禁用的 INPUT 元素。</dd>
								<dt><code>input:checked</code></dt>
								<dd>获取所有选中的 INPUT 元素。</dd>
								<dt><code>p, a</code></dt>
								<dd>获取所有 P 元素与 A 元素。</dd>
							</dl>					
						</div>
						
						<div id="sidebar">
							<h3>CSS 选择符</h3>
							<ul>
								<li><a href="#implemented-css-selectors">支援的 CSS 选择符</a></li>
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