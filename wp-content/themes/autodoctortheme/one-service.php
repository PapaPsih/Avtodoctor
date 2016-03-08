<?php
/**
 * @package WordPress
 * @subpackage clean
 * Template name: Услуга
 */
?>
<?php include "header.php";

$post = get_post( $_GET['service'] );
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
        $image = '<img src="' . $image_source[0] . '" alt="thumbnail"  width="800px"/>';
    }
    else {
        $image = '<img src="' . get_bloginfo('template_directory') . '/static/img/content/243x189.jpg' . '" alt="thumbnail" />';
    }
}else{
    $title = 'Новость не найдена';
    $content = 'К сожалению, новость не найдена :(';
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
                <a href="<?php echo get_option('home'); ?>/all-news">Новости &rarr;
                </a>
            </li>
            <li class="active"><?php echo $title; ?></li>
        </ul>
        <div class="about">
            <div class="main-title">
                <span><?php echo $title; ?></span>
            </div>
            <?php
            require "woocommerce/auth/Auth_Fb.php";
            $fb = new Auth_Fb();
            $share_fb = $fb->get_link_share();
            ?>
            <div class="wrap-info">
                <ul class="about-social">
                    <li class="facebook">
                        <a href="<?php echo $share_fb; ?>"></a>
                    </li>
                    <li class="googleplus">
                        <a  href="https://plus.google.com/share?url=http://avtodoctor.com.ua/all-news/new/?new=<?php echo $post->ID ?>" onclick="javascript:window.open(this.href,
  '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"></a>
                    </li>
                    <li class="twitter">
                        <a target="_blank" href="https://twitter.com/intent/tweet?text=<?php echo $title; ?>,&url=<?php echo get_permalink(); ?>"></a>
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
                    <div class="col col_25">
                        <div class="img">
                            <img src="static/img/content/243x189.jpg" alt="logo" />
                        </div>
                        <div class="wrap-text">
                            <a href="#">
                                <div class="text">
                                    <p>Каталог ТО пополнился моделями Subaru, BMW, Nissan ...</p>
                                </div>
                                <div class="data">
                                    <div class="item">
                                        <span>Новости</span>
                                    </div>
                                    <div class="item">
                                        <span>03.03.15</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <!-- wrap-text end-->
                    </div>
                    <div class="col col_25">
                        <div class="img">
                            <img src="static/img/content/news-image-sample.png" alt="logo" />
                        </div>
                        <div class="wrap-text">
                            <a href="#">
                                <div class="text">
                                    <p>Каталог ТО пополнился моделями Subaru, BMW, Nissan ...</p>
                                </div>
                                <div class="data">
                                    <div class="item">
                                        <span>Новости</span>
                                    </div>
                                    <div class="item">
                                        <span>03.03.15</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <!-- wrap-text end-->
                    </div>
                    <div class="col col_25">
                        <div class="img">
                            <img src="static/img/content/243x189.jpg" alt="logo" />
                        </div>
                        <div class="wrap-text">
                            <a href="#">
                                <div class="text">
                                    <p>Каталог ТО пополнился моделями Subaru, BMW, Nissan ...</p>
                                </div>
                                <div class="data">
                                    <div class="item">
                                        <span>Новости</span>
                                    </div>
                                    <div class="item">
                                        <span>03.03.15</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <!-- wrap-text end-->
                    </div>
                    <div class="col col_25 subscription">
                        <div class="title">
                            <span>Подпишитесь на наши новости</span>
                            <b>Спасибо, теперь вы будете получать только самые интересные новости и полезные статьи</b>
                        </div>
                        <div class="wrap-img">
                            <div class="img">
                                <img src="static/img/content/email.png" class="now" alt="#" />
                                <img src="static/img/content/dev.png" class="end" alt="#" />
                            </div>
                        </div>
                        <div class="subscription__email">
                            <div class="subscription_email__i">
                                <form action="#" id="form-validate">
                                    <input type="text" placeholder="E-mail" name="email" />
                                    <div class="sub">
                                        <input type="submit" value="submit" />
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
