<?php

function load_css  () {
    wp_register_style("bootstrap", get_template_directory_uri() . "/css/bootstrap.min.css", array(), false, "all");
    wp_enqueue_style("bootstrap");

    wp_register_style("header", get_template_directory_uri() . "/css/header.css", array(), false, "all");
    wp_enqueue_style("header");

    wp_register_style("archive", get_template_directory_uri() . "/css/archive.css", array(), false, "all");
    wp_enqueue_style("archive");

    wp_register_style("single", get_template_directory_uri() . "/css/single.css", array(), false, "all");
    wp_enqueue_style("single");

    wp_register_style("front", get_template_directory_uri() . "/css/front-page.css", array(), false, "all");
    wp_enqueue_style("front");

    wp_register_style("main", get_template_directory_uri() . "/css/main.css", array(), false, "all");
    wp_enqueue_style("main");

    wp_register_style("mediaQueries", get_template_directory_uri() . "/css/mediaQueries.css", array(), false, "all");
    wp_enqueue_style("mediaQueries");
}

function load_js () {
    wp_enqueue_script("jquery");

    wp_register_script("bootstrap", get_template_directory_uri() . "/js/bootstrap.min.js", "jquery", false, true);
    wp_enqueue_script("bootstrap");

    wp_register_script("preloader", get_template_directory_uri() . "/js/preloader.js", "jquery", false, true);
    wp_enqueue_script("preloader");

    wp_register_script("header", get_template_directory_uri() . "/js/header.js", "jquery", false, true);
    wp_enqueue_script("header");

    // Get required info from each post and pass it into the js file (if the current page is the home page)
    if (get_the_title() == "Home") { 
        
        // Register the js file
        wp_register_script("front", get_template_directory_uri() . "/js/front-page.js", "jquery", false, true);
        wp_enqueue_script("front");

        // Gather post info
        $article1 = get_field('article_1');
        $article2 = get_field('article_2');
        $article3 = get_field('article_3');
        $article4 = get_field('article_4');

        $title1 = $article1->post_title;
        $title2 = $article2->post_title;
        $title3 = $article3->post_title;
        $title4 = $article4->post_title;

        $permalink1 = get_permalink($article1);
        $permalink2 = get_permalink($article2);
        $permalink3 = get_permalink($article3);
        $permalink4 = get_permalink($article4);

        $background1 = wp_get_attachment_image_src(get_field("article_background", $article1->ID)["ID"], "background", false)[0];
        $background2 = wp_get_attachment_image_src(get_field("article_background", $article2->ID)["ID"], "background", false)[0];
        $background3 = wp_get_attachment_image_src(get_field("article_background", $article3->ID)["ID"], "background", false)[0];
        $background4 = wp_get_attachment_image_src(get_field("article_background", $article4->ID)["ID"], "background", false)[0];

        $icon1 = wp_get_attachment_image_src(get_post_thumbnail_id($article1), "blog-large", false)[0];
        $icon2 = wp_get_attachment_image_src(get_post_thumbnail_id($article2), "blog-large", false)[0];
        $icon3 = wp_get_attachment_image_src(get_post_thumbnail_id($article3), "blog-large", false)[0];
        $icon4 = wp_get_attachment_image_src(get_post_thumbnail_id($article4), "blog-large", false)[0];

        $articles = array($title1, $title2, $title3, $title4, $permalink1, $permalink2, $permalink3, $permalink4, $background1, $background2, $background3, $background4, $icon1, $icon2, $icon3, $icon4);
        
        // Pass the info to the js file
        wp_localize_script("front", 'script_vars', $articles);

    }
}

add_action("wp_enqueue_scripts", "load_css");
add_action("wp_enqueue_scripts", "load_js");

// Changing the_excerpt length 
function my_excerpt_length($length){
    return 20;
}
add_filter("excerpt_length", "my_excerpt_length");

// Menus
register_nav_menus(
    array(
        "top-menu" => "Top Menu", 
        "search-menu" => "Search Menu",
    )
);

// Theme options
add_theme_support("menus");
add_theme_support( 'post-thumbnails' );

// Custom image sizes
add_image_size("background", 1920, 1080, true);
add_image_size("blog-large", 800, 500, true);
add_image_size("blog-small", 300, 200, true);

/**
 * Register Custom Navigation Walker
 */
function register_navwalker(){
	require_once get_template_directory() . '/class-wp-bootstrap-navwalker.php';
}
add_action( 'after_setup_theme', 'register_navwalker' );

// Article post type
function article_post() {

    $args = array(
        "labels" => array(
            "name" => "Articles",
            "singular_name" => "Article",
        ),
        "hierarchical" => true,
        "public" => true,
        "has_archive" => true,
        "menu_icon" => "dashicons-schedule",
        "supports" => array("title", "editor", "thumbnail", "custom-fields", 'comments'),
        "rewrite" => array("slug" => "articles"), 
    );

    register_post_type("articles", $args);

}

add_action("init", "article_post");

function article_sections () {

    $args = array(
        "labels" => array(
            "name" => "Article Labels",
            "singular_name" => "Label"
        ),
        "public" => true,
        "hierarchical" => true
    );

    register_taxonomy("sections", array("articles"), $args);
}

add_action("init", "article_sections");