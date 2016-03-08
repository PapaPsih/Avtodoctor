<?php
/**
* @package WordPress
* @subpackage clean
* Template name: Доставка и оплата
*/
?>
	<?php include "header.php"; ?>
        <div class="content-main">
                <div class="wrap-center">
                    <ul class="breadcrumb">
                        <li>
                            <a href="<?php echo get_option('home'); ?>">Интернет-магазин Autodoctor &rarr;</a>
                        </li>
                        <li class="active"><?php the_title(); ?></li>
                    </ul>
                    <div class="main-title">
                        <a href="#">
                            <span><?php the_title(); ?></span>
                        </a>
                    </div>
                    <div class="new-brand">
                        <?php 
                            if (have_posts()): 
                                while (have_posts()): the_post();
                                    the_content();
                                endwhile; 
                            endif;  
                        ?>                        
                        <!-- new-brand__row end-->
                    </div>
                    <!-- new-brand end-->
                </div>
                <!-- wrap-center end-->
            </div>
        <?php include "footer.php"; ?>
    </div>
</div>


</body>
