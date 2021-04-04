<!--Load in content from wp editor into page-->
<!--To add this to a file insert < (remove this) ?php get_template_part("includes/section", "content");?>-->
<?php if ( have_posts() ): while ( have_posts() ): the_post();?>

    <?php the_content();?>

<?php endwhile; else: endif;?>