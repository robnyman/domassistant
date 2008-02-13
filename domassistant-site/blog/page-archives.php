<?php
/*
	Template Name: Page archives
*/
?>

<?php get_header(); ?>

	<div id="main-content-area">
		<h1><?php the_title(); ?></h1>
		<?php srg_clean_archives(); ?>
	</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>