<?php 

    $args = get_query_var('args');

    $the_query = new WP_Query( $args );
    if($the_query->have_posts() ) : 
        while ( $the_query->have_posts() ) : 
        $the_query->the_post(); 
            ?>
            
                <div class="wrapper"> 

                    <a href="<?php the_permalink();?>">

                        <?php if (has_post_thumbnail()):?>
                            <img src="<?php the_post_thumbnail_url("blog-large");?>" alt="<?php the_title();?>">
                        <?php endif;?>

                        <div>
                        
                            <h5 class="text_heading"><?php the_title();?></h5>
                            
                            <!--Change text depending on if relation is stated-->
                            <?php if ( get_field( 'relation' ) ): ?>
                                <p>By <b><?php echo get_field("author");?></b> - <?php echo get_field("relation");?></p>
                            <?php else: ?>
                                <p>By <b><?php echo get_field("author");?></b></p>
                            <?php endif;?>

                        </div>

                    </a>

                </div>

            <?php
        endwhile; 
        wp_reset_postdata(); 
    else: 
    endif;

?>