<?php include "../../../header-start.php" ?>
	<title>Example category - Plugins - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors and AJAX</title>
<?php include "../../../header-end.php" ?>

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
							<li><a href="/plugins" class="selected">Plugins</a>/</li>
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
							<h1>Example category - Plugins</h1>
							<p>Here you can find all the plugins in the example category. Each plugin tells you of the author, and what prerequisite DOMAssistant file(s) you need to ensure that it will work as expected.</p>
							<h2>Plugins</h2>
							<div class="plugin">
								<h3>DOMAssistantMyPlugIn</h3>
								<table cellspacing="0" class="plugin-presentation">
									<tr>
										<th>File:</th>
										<td><a href="DOMAssistantMyPlugIn.js">DOMAssistantMyPlugIn.js</a></td>
									</tr>
									<tr>
										<th>Author:</th>
										<td><a href="http://www.robertnyman.com/">Robert Nyman</a></td>
									</tr>
									<tr>
										<th>Description:</th>
										<td>This is plugin is an example of how to create a DOMAssistant plugin, complete with comments in the code explaining each part.</td>
									</tr>
									<tr>
										<th>Prerequisites:</th>
										<td>Complete DOMAssistant (DOMAssistantComplete.js/DOMAssistantComressed.js) or the <a href="/documentation/DOMAssistantCore-module.php">DOMAssistant Core module</a>.</td>
									</tr>
								</table>
							</div>
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
					<?php include "../../../get-your-copy.php" ?>
				</div>
			</div>

			<?php include "../../../footer.php" ?>
	</div>
	<?php include "../../../stats.php" ?>
	
</body>
</html>