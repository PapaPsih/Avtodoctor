<?php
/**
* @package WordPress
* @subpackage clean
* Template name: Статья
*/
?>
	<?php include "header.php";

          $post = get_post( $_GET['article'] );
          if($post){
            $ID = $post->ID;
            $title = $post->post_title;
            $content = $post->post_content;            
            $tags = (array)wp_get_post_tags( $ID );
            $tags_query = '';
            foreach ($tags as $tag) {
                 $tags_query .= $tag['slug'] . '+';
            }
            if (wp_get_attachment_image_src( get_post_thumbnail_id(), full )) {
                $image_source = wp_get_attachment_image_src( get_post_thumbnail_id(), full );
                $image = '<img src="' . $image_source[0] . '" alt="thumbnail" />';
            }
            else {
                $image = '<img src="' . get_bloginfo('template_directory') . '/static/img/content/243x189.jpg' . '" alt="thumbnail" />';
            }
          }else{
            $title = 'Статья не найдена';
            $content = 'К сожалению, Статья не найдена :(';
            $tags = '';
          }
    ?>
        <div class="content-main">
                <div class="wrap-center">
                    <ul class="breadcrumb">
                        <li>
                            <a href="<?php echo get_option('home'); ?>">Интернет-магазин Autodoctor &rarr;
                            </a>
                        </li>
                        <li>
                            <a href="<?php echo get_option('home'); ?>/all-articles">Статьи &rarr;
                            </a>
                        </li>
                        <li class="active"><?php echo $title; ?></li>
                    </ul>
                    <div class="about">
                        <div class="main-title">
                            <span><?php echo $title; ?></span>
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
                                <p>
                                <?php 
                                    echo $image . '<br>';
                                ?>                                
                                <?php echo $content; ?>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="new-brand">
                        <div class="new-brand__row">
                            <div class="new-brand__title">
                                <h3>Читать на эту тему:</h3>
                            </div>
                            <div class="col-wrap">
                                <?php
                                $args = array(
                                    'posts_per_page' => -1,
                                    'category' => '15,16'
                                );
                                $posts_array = get_posts( $args );
                                $current_post_tags = get_the_tags();

                                function create_new_analog ($post)
                                {
                                    if (wp_get_attachment_image_src( get_post_thumbnail_id(), full )) {
                                        $image_source = wp_get_attachment_image_src( get_post_thumbnail_id(), full );
                                        $image = $image_source[0];
                                    }
                                    else {
                                        $image = get_bloginfo('template_directory') . '/static/img/content/243x189.jpg';
                                    }

                                    $new ='<div class="col col_25">
                                    <div class="img">
                                        <img src="'.$image.'" alt="logo" />
                                    </div>
                                    <div class="wrap-text">
                                        <a href="#">
                                            <div class="text">
                                                <p>'.$post->post_title.'</p>
                                            </div>
                                            <div class="data">
                                                <div class="item">
                                                    <span>Новости</span>
                                                </div>
                                                <div class="item">
                                                    <span>'.get_the_date( 'd.m.y', $post->ID ).'</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <!-- wrap-text end-->
                                </div>';

                                    return $new;
                                }

                                $cnt = 0;
                                $views_posts = array();
                                foreach ( $posts_array as $post ){
                                    if ($post->ID == $ID)
                                        continue;

                                    $posttags = get_the_tags($post->ID);
                                    if ($posttags) {
                                        foreach($posttags as $tag) {
                                            foreach ($current_post_tags as $current_post_tag)
                                                if ($tag->name == $current_post_tag->name)
                                                {
                                                    $new .= create_new_analog($post);
                                                    $cnt++;
                                                    $views_posts[] = $post->ID;

                                                    break 2;
                                                }
                                        }
                                    }
                                    if ($cnt >= 3)
                                        break;
                                } //end foreach

                                if ($cnt<3)
                                {
                                    $args = array(
                                        'posts_per_page' => 3,
                                        'category' => '15,16',
                                        'orderby' => 'date'
                                    );
                                    $posts_array = get_posts( $args );
                                    foreach ( $posts_array as $post )
                                    {
                                        if (!in_array($post->ID, $views_posts))
                                        {
                                        $new .= create_new_analog($post);
                                        $cnt++;
                                        if ($cnt >= 3)
                                            break;
                                        }
                                    }
                                }

                                echo $new; ?>
                                <div class="col col_25 subscription">
                                    <div class="title">
                                        <span>Подпишитесь на наши новости</span>
                                        <b>Спасибо, теперь вы будете получать только самые интересные новости и полезные статьи</b>
                                    </div>
                                    <div class="wrap-img">
                                        <div class="img">
                                            <img src="<?php echo get_template_directory_uri(); ?>/static/img/content/email.png" class="now" alt="#" />
                                            <img src="<?php echo get_template_directory_uri(); ?>/static/img/content/dev.png" class="end" alt="#" />
                                        </div>
                                    </div>
                                    <div class="subscription__email">
                                        <div class="subscription_email__i">
                                            <form action="#" id="form-validate">
                                                <input type="text" placeholder="E-mail" name="email_subscribe" />
                                                <input type="hidden" name="id_newsletters" value="2">
                                                <div class="sub">
                                                    <input type="submit" value="submit" onclick="newSubscribe()"/>
                                                </div>
                                            </form>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
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
