<?php get_header();

/* Load the specified editor for this category into the $image var */
$term = get_queried_object();

$heading = get_field('heading', $term);
$overlay = get_field('overlay', $term);
$opacity = get_field('opacity', $term);

/* Converts hex to sudo-rgb */
function hexToRgb($hex, $alpha = false) {
    $hex      = str_replace('#', '', $hex);
    $length   = strlen($hex);
    $rgb['r'] = hexdec($length == 6 ? substr($hex, 0, 2) : ($length == 3 ? str_repeat(substr($hex, 0, 1), 2) : 0));
    $rgb['g'] = hexdec($length == 6 ? substr($hex, 2, 2) : ($length == 3 ? str_repeat(substr($hex, 1, 1), 2) : 0));
    $rgb['b'] = hexdec($length == 6 ? substr($hex, 4, 2) : ($length == 3 ? str_repeat(substr($hex, 2, 1), 2) : 0));
    
    if ( $alpha ) {
       $rgb['a'] = $alpha;
    }

    return implode(', ', $rgb);
}

$overlay = hexToRgb($overlay)
?>

    <section class="heading">

        <div class="background">

            <div class="container">
                <h3 class="title"><?php echo single_cat_title();?></h3>  
            </div>

        </div>

    </section>

    <section class="archive page-wrap">

        <div class="container grid">

            <?php get_template_part("includes/section", "archive");?>
            
        </div>

    </section>

    <!--Set the headings background image to the $heading var-->
    <style type="text/css">
        .heading .background {
            background-image: url(<?php echo $heading['url']; ?>);
            box-shadow: inset 0 0 0 1000px rgba(<?php echo $overlay;?>,<?php echo $opacity;?>);
        }
    </style>

<?php get_footer();?>