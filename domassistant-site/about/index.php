<?php include "../header-start.php" ?>
	<title>About - DOMAssistant, the modular lightweight JavaScript library, with CSS selectors, event handling, AJAX and complete Unicode support</title>
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
							<p>DOMAssistant was originally developed by <a href="http://www.robertnyman.com/">Robert Nyman</a> to meet a need of a small yet very powerful JavaScript library, focusing on performance and modularity. Robert still plays a part in the DOMAssistant world, but now the technical lead is Lim Cheng Hong and the invaluable DOMAssistant Team.</p>
							
							<h2 id="domassistant-team">The DOMAssistant Team</h2>
							<p>The DOMAssistant team consists of:</p>
							<dl>
								<dt>Lim Cheng Hong</dt>
								<dd>Cheng Hong currently resides and works in Singapore as a Senior	Consultant for a software firm. User interface is his passion, and he swears by accessible, usable and standards-based designs.</dd>
								<dt><a href="http://kodfabrik.se/blog/">Pelle Wessman</a></dt>
								<dd>Pelle is a freelancing Web Developer from Esl&ouml;v in Sk&aring;ne, southern Sweden. He's working with Javascript, PHP, MySQL, HTML, CSS etc depending on the current assignment. He is a strong follower of standards and semantics and really likes initiatives like Microformats.</dd>
								<dt>Gustaf Lindqvist</dt>
								<dd>Gustaf is living and working in Sundsvall, in northern Sweden, as a consultant System/Web Developer for a world leading end-to-end IT services provider.</dd>
							</dl>
							
							<h2 id="mailing-list">Mailing list and discussion</h2>
							<p>Send an e-mail to mailing-list [at] domassistant [dot] com with your question, or to verify your e-mail address and that you want to receive information about updates.</p>
							<p>If you're interested in discussing features or getting support, please visit the <a href="http://groups.google.com/group/domassistant">DOMAssistant Discussion Group</a>.</p>
							
							<h2 id="compatibility">DOMAssistant Compatibility</h2>
							<p>DOMAssistant has been tested and verified to work in these web browsers, but for most web browsers, it is fair to assume a long backwards compatibility:</p>
							<ul>
								<li>Internet Explorer 5.5+</li>
								<li>Firefox 1.5+</li>
								<li>Safari 2</li>
								<li>Opera 9</li>
							</ul>
							
							<h2 id="adaptions">DOMAssistant Adaptions</h2>
							<p>DOMAssistant utilizes XPath, querySelectorAll and native getElementsByClassName in web browsers that support it, for best performance. It is also optimized to avoid causing memory leaks in Internet Explorer.</p>
						</div>

						<div id="sidebar">
							<h2>About DOMAssistant</h2>
							<ul>
								<li><a href="#domassistant-team">The DOMAssistant Team</a></li>
								<li><a href="#mailing-list">Mailing list and discussion</a></li>
								<li><a href="#compatibility">Compatibility</a></li>
								<li><a href="#adaptions">Adaptions</a></li>
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