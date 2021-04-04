<div class="row">

  <div class="column col-md-4 secondary b">

    <?php

      $args = array(
          'post_type'=> 'articles',
          "post_status" => "publish",
          'orderby'   => 'date', 
          'order'     => 'DESC',
          "posts_per_page" => 2,
          'offset' => 3,
          'tax_query' =>
                array(
                  array(
                    'taxonomy' => 'sections',
                    'field'    => 'id',
                    'terms'    => get_query_var("id")
                  ),
                ), 
        );

      ?>
      <?php set_query_var('args', $args);?>
      <?php get_template_part("includes/section", "single_article");?>
    
  </div>

  <div class='column col-md-8 primary b'>

    <?php
    $args = array(
        'post_type'=> 'articles',
        "post_status" => "publish",
        'orderby'   => 'date', 
        'order'     => 'DESC',
        "posts_per_page" => 1,
        'offset' => 0,
        'tax_query' =>
                  array(
                    array(
                      'taxonomy' => 'sections',
                      'field'    => 'id',
                      'terms'    => get_query_var("id")
                    ),
                  ), 
    );?>
    <?php set_query_var('args', $args);?>
    <?php get_template_part("includes/section", "single_article");?>

    <div class="row">

      <div class='column col-md-6 tertiary b'>

        <?php

          $args = array(
              'post_type'=> 'articles',
              "post_status" => "publish",
              'orderby'   => 'date', 
              'order'     => 'DESC',
              "posts_per_page" => 1,
              'offset' => 1,
              'tax_query' =>
                        array(
                          array(
                            'taxonomy' => 'sections',
                            'field'    => 'id',
                            'terms'    => get_query_var("id")
                          ),
                        ), 
          );

        ?>
        <?php set_query_var('args', $args);?>
        <?php get_template_part("includes/section", "single_article");?>

      </div>

      <div class='column col-md-6 tertiary b'>

        <?php

          $args = array(
              'post_type'=> 'articles',
              "post_status" => "publish",
              'orderby'   => 'date', 
              'order'     => 'DESC',
              "posts_per_page" => 1,
              'offset' => 2,
              'tax_query' =>
                        array(
                          array(
                            'taxonomy' => 'sections',
                            'field'    => 'id',
                            'terms'    => get_query_var("id")
                          ),
                        ), 
          );
        
        ?>
        <?php set_query_var('args', $args);?>
        <?php get_template_part("includes/section", "single_article");?>

      </div>

    </div>

  </div>

</div>
