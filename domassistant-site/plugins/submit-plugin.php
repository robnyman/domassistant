<?php include "../header-start.php" ?>
	<title>Submit a plugin - Plugins - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
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
							<li><a href="/documentation" class="selected">Plugins</a>/</li>
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
							<h1>Submit a plugin</h1>
							<p>If you want to submit a plugin you have created to become an official plugin at DOMAssistant, there are some things to consider:</p>
							<ul>
								<li>It needs to be released under some sort of open source license (e.g. <a href="http://www.opensource.org/licenses/mit-license.php">MIT License</a>, <a href="http://www.gnu.org/licenses/lgpl.html">LGPL</a>).</li>
								<li>To reach maximum compatibility, it should pass a <a href="http://www.jslint.com/">JSLint</a> validation.</li>
								<li>You need to test that it work in the most common web browsers (IE 6+, Firefox 1.5+, Safari 2+, Opera 9+).</li>
								<li>Create documentation explaining the different methods, what they do and which parameters they accept.</li>
							</ul>
							
							<h2>Plugin hosting</h2>
							<p>You can either choose to host your plugin JavaScript file here, or at another location of your liking. Recommended places are <a href="http://code.google.com/">Google Code</a> or <a href="http://sourceforge.net/">SourceForge</a>, and there you can offer your plugin together with documentation, issue reports etc.</p>
						</div>

						<div id="sidebar">
							<h3>Plugins options</h3>
							<ul>
								<li><a href="/plugins">All plugin categories</a></li>
								<li><a href="/plugins/how-to.php">How to create a plugin</a></li>
								<li><a href="/plugins/categories/example">Download plugin example</a></li>
								<li><a href="/plugins/submit-plugin.php">Submit a plugin</a></li>
							</ul>
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