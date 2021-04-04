<!--Load in post archive (all posts) from wp editor into page-->
<!--To add this to a file insert < (remove this) ?php get_template_part("includes/section", "archive");?>-->
<?php if ( have_posts() ): while ( have_posts() ): the_post();?>

    <div class="article">

        <a href="<?php the_permalink();?>">

            <?php if (has_post_thumbnail()):?>

                <img src="<?php the_post_thumbnail_url("blog-small");?>" alt="<?php the_title();?> - Cover Image">

            <?php endif;?>

            <div>
        
                <h3 class="text_heading"><?php the_title();?></h3>

                <!--Change text depending on if relation is stated-->
                <?php if ( get_field( 'relation' ) ): ?>
                    <h5>By <b><?php echo get_field("author");?></b> - <?php echo get_field("relation");?></h5>
                <?php else: ?>
                    <h5>By <b><?php echo get_field("author");?></b></h5>
                <?php endif;?>

                <?php the_excerpt ();?>

            </div>

        </a>

    </div>

<?php endwhile; else: endif;?>