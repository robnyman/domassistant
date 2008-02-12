<?php include "header-start.php" ?>
	<title>DOMAssistant, the modular lightweight JavaScript library, with CSS selectors and AJAX</title>
<?php include "header-end.php" ?>

<body id="start-page">
	
	<div id="container">
			<div id="header">
				<div id="header-content">
					<h1><a href="/"><span></span>DOMAssistant</a></h1>
					<div id="navigation">
						<ul>
							<li><a href="/" class="selected">Home</a>/</li>
							<li><a href="/documentation">Documentation</a>/</li>
							<li><a href="/download">Download</a>/</li>
							<li><a href="/compatibility">Compatibility</a>/</li>
							<li><a href="/contact">Contact</a>/</li>
							<li class="last"><a href="/discussion-support">Discussion &amp; Support</a></li>
						</ul>
					</div>
				</div>
			</div>
			
			<div id="main-content">				
				<div id="content">					
					<div id="content-areas">
							
						<div id="main-content-area">
							<h1>What is DOMAssistant?</h1>
							<p>The idea of DOMAssistant is to provide a simpler and more consistent way to script against the Document Object Model (DOM) in web browsers. The idea is that everything starts with the element(s) in question, selected through <code>id</code> or CSS selectors, and then perform various methods on it, such as adding or removing classes, events etc.</p>
							<p>Example code:</p>
							<p>
								<code>$("#container input[type=text]");</code>
							</p>
							<p>
								<code>$("#navigation a").addEvent("click", myFunc);</code>
							</p>
							<p>
								<code>$("#news-list").load("updated-news.php");</code>
							</p>
							
							<h2>DOMAssistant is Modular</h2>
							<p>DOMAssistant is completely modular, in the sense that it is only dependent on one single core JavaScript file, <code>DOMAssistant.js</code>. All other modules are optional, and you can choose to only use the ones you find necessary in your application. The reasoning behind this is to make the file size as small as possible, while at the same time addressing any potential bandwidth issues.</p>							
						</div>
						
						<div id="sidebar">
							<h2>Download DOMAssistant</h2>
							<dl>
								<dt>
									<a href="http://code.google.com/p/domassistant/downloads/detail?name=DOMAssistantCompressed.2.5.7.js">DOMAssistant 2.5.7, compressed</a><br>
									(22kb, 7kb <a href="http://en.wikipedia.org/wiki/Gzip" class="small">Gzipped</a>)
								</dt>
								<dd>Intended for production usage.</dd>

								<dt>
									<a href="http://code.google.com/p/domassistant/downloads/detail?name=DOMAssistantComplete.2.5.7.js">DOMAssistant 2.5.7, complete</a><br>
									(43kb)
								</dt>
								<dd>Intended for learning and development usage.</dd>
							</dl>	
						</div>
					</div>
					<?php include "get-your-copy.php" ?>
				</div>
			</div>
			
			<?php include "footer.php" ?>
					
	</div>
	
	<?php include "stats.php" ?>
	
</body>
</html>