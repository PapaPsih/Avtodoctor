<?php
/**
* @package WordPress
* @subpackage clean
* Template name: О нас
*/
?>
	<?php include "header.php"; ?>
        <div class="content-main">
            <div class="wrap-center">
                <ul class="breadcrumb">
                    <li>
                        <a href="<?php echo get_option('home'); ?>">Интернет-магазин Autodoctor &rarr;
                        </a>
                    </li>
                    <li class="active"><?php the_title(); ?></li>
                </ul>
                <div class="about">
                    <div class="main-title">
                        <span><?php the_title(); ?></span>
                    </div>
                    <div class="wrap-info">
                        <ul class="about-social">
                            <li class="facebook">
                                <a href="#"></a>
                            </li>
                            <li class="googleplus">
                                <a href="#"></a>
                            </li>
                            <li class="twitter">
                                <a href="#"></a>
                            </li>
                        </ul>
                        <div class="text">
                        <?php 
                        	if (have_posts()): 
	                        	while (have_posts()): the_post();
									the_content(); echo '<br />';
							  	endwhile; 
						  	endif;  
						?>                               
                        </div>
                    </div>

                </div>
            </div>
            <!-- wrap-center end-->
        </div>
        <?php include "footer.php"; ?>
    </div>
</div>


</body>
