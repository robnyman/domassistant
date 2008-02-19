<?php include "../header-start.php" ?>
	<title>About - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors and AJAX</title>
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
							<li><a href="/documentation">Documentation</a>/</li>
							<li><a href="/plugins">Plugins</a>/</li>
							<li><a href="/discussion-support">Discussion &amp; Support</a>/</li>
							<li><a href="/about" class="selected">About</a>/</li>
							<li class="last"><a href="/blog">Blog</a></li>
						</ul>
					</div>
				</div>
			</div>
			
			<div id="main-content">				
				<div id="content">					
					<div id="content-areas">

						<div id="main-content-area">
							<h1>About</h1>
							<p>DOMAssistant was originally developed by <a href="http://www.robertnyman.com/">Robert Nyman</a> to meet a need of a small yet very powerful JavaScript library, focusing on performance and modularity. Robert still develops the library, but now through the help of the invaluable DOMAssistant Team</p>
							
							<!--
							<h2>The DOMAssistant Team</h2>
							<p>The DOMAssistant team consists of:</p>
							<ul>
								<li>Developer 1</li>
							</ul>
							-->
							
							<h2>Mailing list and discussion</h2>
							<p>Send an e-mail to mailing-list [at] domassistant [dot] com with your question, or to verify your e-mail address and that you want to receive information about updates.</p>
							<p>If you're interested in discussing features or getting support, please visit the <a href="http://groups.google.com/group/domassistant">DOMAssistant Discussion Group</a>.</p>
							
							<h2>DOMAssistant Compatability</h2>
							<p>DOMAssistant has been tested and verified to work in these web browsers, but for most web browsers, it is fair to assume a long backwards compatibility:</p>
							<ul>
								<li>Internet Explorer 5.5+</li>
								<li>Firefox 1.5+</li>
								<li>Safari 2</li>
								<li>Opera 9</li>
							</ul>
							
							<h2>DOMAssistant Adaptions</h2>
							<p>DOMAssistant utilizes XPath, querySelectorAll and native getElementsByClassName in web browsers that support it, for best performance. It is also optimized to avoid causing memory leaks in Internet Explorer.</p>
						</div>

						<div id="sidebar">
							<h2>Download DOMAssistant</h2>
							<dl>
								<dt>
									<a href="http://code.google.com/p/domassistant/downloads/detail?name=DOMAssistantCompressed-2.6.js">DOMAssistant 2.6, compressed</a><br>
									(22kb, 7kb <a href="http://en.wikipedia.org/wiki/Gzip" class="small">Gzipped</a>)
								</dt>
								<dd>Intended for production usage.</dd>

								<dt>
									<a href="http://code.google.com/p/domassistant/downloads/detail?name=DOMAssistantComplete.2.6.js">DOMAssistant 2.6, complete</a><br>
									(43kb)
								</dt>
								<dd>Intended for learning and development usage.</dd>
							</dl>	
						</div>
					</div>
					<?php include "../get-your-copy.php" ?>
				</div>
			</div>

			<?php include "../footer.php" ?>
	</div>
	<?php include "../stats.php" ?>
	
</body>
</html>