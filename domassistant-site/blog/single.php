<?php get_header(); ?>

	<div id="main-content-area" class="page">

	<?php if (have_posts()) : ?>

		<?php while (have_posts()) : the_post(); ?>

			<div class="post" id="post-<?php the_ID(); ?>">
				<h1><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>
				<small><?php the_time('F jS, Y') ?> <!-- by <?php the_author() ?> --></small>

				<div class="entry">
					<?php the_content('Read the rest of this entry &raquo;'); ?>
				</div>

				<?php edit_post_link('Edit', '', ' | '); ?>
			</div>

		<?php endwhile; ?>

	<?php else : ?>

		<h2 class="center">Not Found</h2>
		<p class="center">Sorry, but you are looking for something that isn't here.</p>
		<?php include (TEMPLATEPATH . "/searchform.php"); ?>

	<?php endif; ?>
	
	<?php if (!('open' == $post-> comment_status) && ('open' == $post->ping_status)) {
		// Only Pings are Open ?>
		Responses are currently closed, but you can <a href="<?php trackback_url(); ?> " rel="trackback">trackback</a> from your own site.

	<?php } elseif (!('open' == $post-> comment_status) && !('open' == $post->ping_status)) {
		// Neither Comments, nor Pings are open ?>
		Both comments and pings are currently closed.

	<?php } edit_post_link('Edit this entry.','',''); ?>
	<?php comments_template(); ?>

	</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>