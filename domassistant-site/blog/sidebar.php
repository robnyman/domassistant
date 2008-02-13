	<div id="sidebar" class="blog-nav">
		
		<h3>Recent posts</h3>
		<ul>
			<?php get_archives('postbypost','5','custom','<li>','</li>'); ?>
		</ul>
		
		<h3>RSS feeds</h3>
		<ul class="rss-links">
			<li><a href="<?php bloginfo('rss2_url'); ?>">Posts</a></li>
			<li><a href="<?php bloginfo('comments_rss2_url'); ?>">Comments</a></li>
		</ul>
		
		<h3>Archives</h3>
		<ul>
			<li><a href="/blog/archives">Archive of all posts</a></li>
		</ul>
		
		<h3>Search</h3>
		<?php include (TEMPLATEPATH . '/searchform.php'); ?>
		
	</div>

