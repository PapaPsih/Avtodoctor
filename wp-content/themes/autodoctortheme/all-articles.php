<?php
/**
* @package WordPress
* @subpackage clean
* Template name: Статьи
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

                    <div class="new-brand">
                        <div class="new-brand__row">
                            <div class="col-wrap">
                                <div class="title">
                                    <h3><?php the_title(); ?></h3>
                                </div>
                                <div id = "news-content">
                                    <?php
                                        $args = array(
                                                    'posts_per_page' => 20,
                                                    'category' => '15,16',
                                                    'offset' => $offset
                                                );
                                        $posts_array = get_posts( $args );
                                        $news_array = array('data' => array(),
                                                            'all_count' => count($posts_count));
                                        foreach ( $posts_array as $post ){
                                            $post_categories = wp_get_post_categories( $post->ID );
                                                
                                            $cat = get_category( $post_categories[0] );
                                                
                                            if($cat->cat_ID == 15){
                                                $one_new_ui = create_article_ui($post, 50);
                                            }else{
                                                $one_new_ui = create_article_ui($post, 25);
                                            }           
                                            echo $one_new_ui;                                 
                                        } //end foreach 
                                    ?>  
                                </div>                             
                            </div>
                        </div>
                        <!-- new-brand__row end-->
                    </div>
                    <!-- new-brand end-->
                    <?php if(count($posts_array) == 20){ ?>
                        <div class="more-preloader">
                            <a href="#">
                                <span class="more"></span>

                                <p>Загрузить еще статьи</p>
                            </a>
                        </div>
                    <?php } ?>
                    <div class="pagination-wrap">
                        <nav>
                            <ul id = "pagination" class="pagination">
                                <?php if(count($posts_array) == 20){ ?>
                                
                                <?php }else{ ?>
                                    <li class="active">
                                        <a href="#">1</a>
                                    </li>
                                <?php } ?>
                            </ul>
                        </nav>
                    </div>
                    <!-- pagination-wrap end-->
                </div>
                <!-- wrap-center end-->
            </div>
            <?php include "footer.php"; ?>
        </div>
    </div>


</body>