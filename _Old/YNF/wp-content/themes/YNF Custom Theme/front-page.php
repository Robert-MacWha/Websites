<?php get_header();?>

    <section class="page-wrap front-page">

        <div class="showcase">

            <div class="dither"></div>
            <div class="background-image" id="bg-img"></div>
        
            <div class="page-info">

                <h1 class="title"><?php the_field("page_title");?></h1>
                <div class="underline"></div>

            </div>

            <button class="prev" id="prev" onclick="plusSlides(-1)">&#10094;</button>
            <button class="next" id="next" onclick="plusSlides(1)">&#10095;</button>

            <div class="featured">
                
                <a class="preview" id="article1">
                    <div class="full overlay" id="overlay"></div>
                    <div class="full background" id="background"></div>
                    <!--<h3 id="label">Text fetch error</h3>-->
                </a>
                <a class="preview" id="article2">
                    <div class="full background" id="background"></div>
                    <div class="full overlay" id="overlay"></div>
                    <!--<h3 id="label">Text fetch error</h3>-->
                </a>
                <a class="preview" id="article3">
                    <div class="full background" id="background"></div>
                    <div class="full overlay" id="overlay"></div>
                    <!--<h3 id="label">Text fetch error</h3>-->
                </a>
                <a class="preview" id="article4">
                    <div class="full background" id="background"></div>
                    <div class="full overlay" id="overlay"></div>
                   <!--<h3 id="label">Text fetch error</h3>-->
                </a>
                
            </div>

        </div>

        <div class="articles">

            <div class="container">

                <div class="title-container">

                    <a href="">
                        
                        <h5 class="title" href="">Current Affairs</h5>
                        <h5 class="arrow">&#8594;</h5>
                        
                    </a>

                </div>

                <?php 
                
                set_query_var("id", 18); // Use category ID (found by hovering over category name in article labels) to change what articles appear where
                get_template_part("includes/section", "category-left");
                
                ?>

                <div class="title-container">

                <a href="">
                    
                    <h5 class="title" href="">Article Category #2</h5>
                    <h5 class="arrow">&#8594;</h5>
                    
                </a>

                </div>

                <?php 

                set_query_var("id", 19); // Use category ID (found by hovering over category name in article labels) to change what articles appear where
                get_template_part("includes/section", "category-right");

                ?>
                
            </div>

        </div>

    </section>

<?php get_footer();?>