<?php include "../header-start.php" ?>
	<title>Plugins - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
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
							<li><a href="../documentation">Documentation</a>/</li>
							<li><a href="../plugins" class="selected">Plugins</a>/</li>
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
							<h1>Plugins</h1>
							<p>DOMAssistant supports a very simple and easy-to-use syntax to build upon the existing DOMAssistant core functionality with any certain needs you might have. Your methods and properties will then be available on the <a href="../documentation/DOMAssistantCore-module.php#dollar"><code>$</code></a> and <a href="../documentation/DOMAssistantCore-module.php#double-dollar"><code>$$</code></a> methods, like this:</p>
							<p class="code">
								<code>$("#container").myPluginMethod();</code><br>
								<code>$$("navigation").myPluginMethod();</code>
							</p>
							<h2>Plugin categories</h2>
							<ul>
								<li><a href="./categories/ajax">AJAX (1)</a></li>
								<li><a href="./categories/example">Example (1)</a></li>
								<li><a href="./categories/pictures">Pictures (1)</a></li>
								<li><a href="./categories/ui">User Interface (2)</a></li>
							</ul>
						</div>

						<div id="sidebar">
							<h3>Plugins options</h3>
							<ul>
								<li><a href="./">All plugin categories</a></li>
								<li><a href="./how-to.php">How to create a plugin</a></li>
								<li><a href="./categories/example">Download plugin example</a></li>
								<li><a href="./submit-plugin.php">Submit a plugin</a></li>
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