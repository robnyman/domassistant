<?php
// Transforming XHTML into HTML
function xml2html($buffer)
{
	$XML = array(' />');
	$HTML = array('>');
	return str_replace($XML, $HTML, $buffer);
}
ob_start('xml2html');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/DTD/strict.dtd">
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
	<title><?php bloginfo('name'); ?> <?php if ( is_single() ) { ?> &raquo; Blog Archive <?php } ?> <?php wp_title(); ?></title>
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen">
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>">
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
	<?php wp_head(); ?>
	<link rel="Shortcut icon" href="/favicon.png">
</head>
<body id="blog">
	
	<div id="container">
			<div id="header">
				<div id="header-content">
					<h1><a href="/"><span></span>DOMAssistant</a></h1>
					<div id="navigation">
						<ul>
							<li><a href="/">Home</a>/</li>
							<li><a href="/download">Download</a>/</li>
							<li><a href="/documentation">Documentation</a>/</li>							
							<li><a href="/discussion-support">Discussion &amp; Support</a>/</li>
							<li><a href="/about">About</a>/</li>
							<li class="last"><a href="/blog" class="selected">Blog</a></li>
						</ul>
					</div>
				</div>
			</div>
			
			<div id="main-content">				
				<div id="content">
					<div id="content-areas">