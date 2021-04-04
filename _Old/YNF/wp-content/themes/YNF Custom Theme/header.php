<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>

    <!--Mark file as header for functions script-->
    <?php wp_head();?>
</head>
<body class="preload">

<header>

    <nav class="navbar navbar-expand-lg navbar-dark">
    
        <!-- Brand and toggle button -->
        <a class="navbar-brand" href="http://ynf.test/">   <img src="http://ynf.test/wp-content/uploads/2020/07/Logo-V2.5.png">   </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

            <span class="navbar-toggler-icon"></span>

        </button>

        <!-- Website Links -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <?php
                wp_nav_menu( array(
                'menu'              => 'top-menu',
                'theme_location'    => 'top-menu',
                'depth'             => 2,
                'container'         => 'div',
                'container_class'   => '',
                'container_id'      => '',
                'menu_class'        => 'navbar-nav mr-auto',
                'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
                'walker'            => new wp_bootstrap_navwalker())
                );
            ?>

        </div>

    </nav>

</header>