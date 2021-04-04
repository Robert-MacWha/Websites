<!--Load in blog content from wp editor into page-->
<!--To add this to a file insert < (remove this) ?php get_template_part("includes/section", "blog_content");?>-->
<?php if ( have_posts() ): while ( have_posts() ): the_post();?>

    <p><?php echo get_the_date("l F jS, Y");?></p>

    <?php the_content();?>

    <?php
    $fname = get_the_author_meta("first_name");
    $lname = get_the_author_meta("last_name");
    ?>

    <p>Posted by <?php echo $fname;?> <?php echo $lname;?></p>

    <?php comments_template();?>

<?php endwhile; else: endif;?>