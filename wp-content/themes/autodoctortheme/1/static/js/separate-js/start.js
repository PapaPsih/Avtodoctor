function setEqualHeight(columns) {
    var tallestcolumn = 0;
    columns.each(
        function () {
            currentHeight = $(this).outerHeight();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        }
    );
    columns.height(tallestcolumn);
}

$(document).ready(function () {

    var body = $('body');
    var columns = $(".col-height");
    if ($(window).width() >= 748) {
        columns.css("height", "auto");
        setEqualHeight(columns);
    }


    $('.close-banner a').on('touch click', function (e) {
        e.preventDefault();
        $('.inf-banner').addClass('hide');
        $('.brand-banner').addClass('hide');
        setTimeout(function () {
            $('.inf-banner').hide();
            $('.brand-banner').hide();
        }, 1000)
    });


    $('.nav-b .reg, .header-top__info .reg').on('touch click', function (e) {
        e.preventDefault();
        var regB = $('body');
        if (regB.hasClass('open-reg')) {
            regB.removeClass('open-reg');
        } else {
            regB.addClass('open-reg');
            $('html, body').removeClass('open-menu');
        }
    });
    $('.mob-nav .reg2').on('touch click', function (e) {
        e.preventDefault();
        if (body.hasClass('open-reg2')) {
            body.removeClass('open-reg2');
        } else {
            body.addClass('open-reg2');
            $('html, body').removeClass('open-menu');
        }
    });

    $('.feedback-error .close').on('touch click', function(e) {
        e.preventDefault();
        $('.feedback-error').fadeOut();
    });

    $('.media .name a').on('touch click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.feedback').offset().top
        });
    });

    $('.sub-reg3 .pass').on('touch click', function (e) {
        e.preventDefault();
        body.addClass('open-pass');
        body.removeClass('open-reg')
    });

    $('.pass-reg .pass').on('touch click', function (e) {
        e.preventDefault();
        body.removeClass('open-pass');
        setTimeout(function () {
            body.addClass('open-reg');
        }, 200);
    });

    var picker = new Pikaday({ field: $('.datepicker')[0],
        i18n: {
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        }});

    $('.sub-reg .cancel').on('touch click', function (e) {
        e.preventDefault();
        $('body').removeClass('open-reg');
        setTimeout
    });

    $('.wrap-bag.bag-none').on('touch click', function (e) {
        e.preventDefault();
        $('body').addClass('open-bag');
    });
    $('.wrap-bag.bag-active').on('touch click', function (e) {
        e.preventDefault();
        $('body').addClass('open-bag-active');
    });

    $('.burger').on('touch click', function () {
        $('body, html').toggleClass('open-menu');
    });

    $('.nav-a > li a').on('touch click', function (e) {
        e.preventDefault();
        var el = $(this),
            table = el.closest('li').find('ul'),
            list = el.closest('li');

        if (list.hasClass('active')) {
            list.removeClass('active');
            table.slideUp();
        } else {
            $('.nav-a > li').removeClass('active');
            list.addClass('active');
            $('.nav-a > li ul').slideUp();
            table.slideDown();
        }
    });

    $('.btn_light-g').on('touch click', function (e) {
        e.preventDefault();
        body.removeClass('open-reg');
        body.addClass('open-social');
    });


    $(".select-inp").select2({
        dropdownCssClass: "bigdrop",
        allowClear: true,
        minimumResultsForSearch: -1
    });

    var proSlider = $('.one-brand-slider-wrap');
    if (proSlider.children().length > 1) {
        proSlider.on('initialized.owl.carousel', function () {
            proSlider.css("opacity", 1);
        });

        proSlider.owlCarousel({
            margin: 0,
            loop: true,
            smartSpeed: 700,
            items: 1
        });

    } else {
        proSlider.css("opacity", 1);
    }


    var proSlider2 = $('.similar-goods-slider__i .brand-directory');
    if (proSlider2.children().length > 1) {
        proSlider2.on('initialized.owl.carousel', function () {
            proSlider2.css("opacity", 1);
        });

        proSlider2.owlCarousel({
            margin: 18,
            loop: true,
            nav: true,
            smartSpeed: 700,
            //autoWidth:true,

            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                768: {
                    items: 4,
                    nav: true,
                }
            }
        });

    } else {
        proSlider2.css("opacity", 1);
    }
    var proSlider3 = $('.serives__work .row');
    if (proSlider3.children().length > 1) {
        proSlider3.on('initialized.owl.carousel', function () {
            proSlider3.css("opacity", 1);
        });

        proSlider3.owlCarousel({
            loop: true,
            nav: true,
            smartSpeed: 700,
            //autoWidth:true,
            items: 1
        });

    } else {
        proSlider3.css("opacity", 1);
    }
    var proSlider4 = $('.reviews-slider .slide');
    if (proSlider4.children().length > 1) {
        proSlider4.on('initialized.owl.carousel', function () {
            proSlider4.css("opacity", 1);
        });

        proSlider4.owlCarousel({
            margin: 0,
            loop: true,
            nav: true,
            smartSpeed: 700,
            items: 1
        });

    } else {
        proSlider4.css("opacity", 1);
    }

    $('.row-close').on('touch click', function () {
        $(this).closest('.row').slideUp();
    });

    $('.btn-reviews').on('touch click', function (e) {
        e.preventDefault();
        $('body').addClass('open-revices');
    });



    $('.revices-popup__close').on('touch click', function (e) {
        e.preventDefault();
        $('body').removeClass('open-revices');
        $('body').removeClass('open-thank');
    });

    $('.revices-popup .btn').on('touch click', function (e) {
        e.preventDefault();
        $('body').removeClass('open-revices');
        setTimeout(function() {
            $('body').addClass('open-thank');
        }, 500)
    });

    $('.tabs__control li').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var index = $this.index();
        $(".tabs__control li").removeClass("active");
        $this.addClass("active");
        $(".tabs-body section").removeClass("active").eq(index).addClass("active");
    });


    $('.subscription_email__i .sub input').on('touch click', function (e) {
        e.preventDefault();
        if ($('#form-validate').valid()) {
            $('.subscription_email__i input').val('');
            $('.subscription_email__i').closest('.col').addClass('active');
        }
    });


    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $('.anchor').addClass('active');
        } else {
            $('.anchor').removeClass('active');
        }
    });
    $('.scroll').on('touch click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $('body').offset().top}, 500);
    });

    $('.prev-m').on('touch click', function () {
        $('body').removeClass('open-reg2 open-reg open-pass')
    });

    $("#form-validate").validate({
        //onkeyup: true,
        rules: {
            email: {
                email: true
            }
        },
        messages: {
            email: {
                email: "Это не e-mail ;("
            }
        }
    });

    function init() {
        var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 10
            }, {
                searchControlProvider: 'yandex#search'
            }),

        // Создаем геообъект с типом геометрии "Точка".
            myGeoObject = new ymaps.GeoObject({
                // Описание геометрии.
                geometry: {
                    type: "Point",
                    coordinates: [55.8, 37.8]
                }
            }, {
                // Опции.
                // Иконка метки будет растягиваться под размер ее содержимого.
                preset: 'islands#blackStretchyIcon',
                // Метку можно перемещать.
                draggable: true
            });

        myMap.geoObjects
            .add(myGeoObject)
    }

    if ($('#map').length) {
        ymaps.ready(init);
    }

    $('.counter a').on('touch click', function (e) {
        e.preventDefault();
        var el = $(this),
            val = el.closest('.counter').find('input').val();

        if (el.text() == '+') {
            var newVal = parseFloat(val) + 1;
        } else {
            if (val > 0) {
                var newVal = parseFloat(val) - 1;
            } else {
                newVal = 0;
            }
        }
        el.closest('.counter').find('input').val(newVal);
    });


    $('.my-orders .delete').on('touch click', function (e) {
        e.preventDefault();
        $(this).closest('.row').remove();
    });

    $('.shipping li a').on('touch click', function (e) {
        e.preventDefault();
        var el = $(this);
        $('.shipping li').removeClass('dynamic');
        el.closest('li').addClass('dynamic');
    });
    $('.payment li a').on('touch click', function (e) {
        e.preventDefault();
        var el = $(this);
        $('.payment li').removeClass('dynamic');
        el.closest('li').addClass('dynamic');
    });

    $('.calc').on('touch click', function () {
        $('body').toggleClass('open-calc');
        $('.popup-calc .close').removeClass('open-calc');
    });
    $('.popup-calc .close').on('touch click', function () {
        $('body').removeClass('open-calc');
    });

    $('.services__form .btn').on('touch click', function (e) {
        e.preventDefault();
        body.addClass('open-record');
    });

    $('.record-popup .close').on('touch click', function () {
        body.removeClass('open-record');
    });

    $('.search-mob').on('touch click', function (e) {
        e.preventDefault();
        setTimeout(function () {
            body.addClass('open-search');
        }, 300);
        $('body, html').removeClass('open-menu');
    });
    $('.search-popup .close').on('touch click', function () {
        body.removeClass('open-search');
    });

    body.on("touch click", function (e) {
        if (!$(e.target).closest(".sub-reg").length
            && !$(e.target).closest(".header-top__info .reg").length
            && !$(e.target).closest(".bag-active").length
            && !$(e.target).closest(".bag-none").length
            && !$(e.target).closest(".sub-bag").length
            && !$(e.target).closest(".sub-bag-active").length
            && !$(e.target).closest(".sub-social").length
            && !$(e.target).closest(".nav-b .reg").length
            && !$(e.target).closest('.calc').length
            && !$(e.target).closest('.sub-reg3').length
            && !$(e.target).closest('.revices-popup').length
            && !$(e.target).closest('.btn-reviews').length
            && !$(e.target).closest('.popup-calc').length) {
            body.removeClass('open-bag');
            body.removeClass('open-calc');
            body.removeClass('open-reg');
            body.removeClass('open-thank');
            body.removeClass('open-revices');
            body.removeClass('open-bag-active');
            body.removeClass('open-social');
        }
    });

    if ($('#map2').length) {
        ymaps.ready(init2);
    }


    function init2() {

        // Создание экземпляра карты.
        var myMap = new ymaps.Map('map2', {
                center: [50.443705, 30.530946],
                zoom: 14
            }, {
                searchControlProvider: 'yandex#search'
            }),
        // Контейнер для меню.
            menu = $('<ul class="menu"/>');

        for (var i = 0, l = groups.length; i < l; i++) {
            createMenuGroup(groups[i]);
        }

        function createMenuGroup(group) {
            // Пункт меню.
            var menuItem = $('<li><a href="#">' + group.name + '</a></li>'),
            // Коллекция для геообъектов группы.
                collection = new ymaps.GeoObjectCollection(null, {preset: group.style});

            // Добавляем коллекцию на карту.
            myMap.geoObjects.add(collection);

            // Добавляем подменю.
            menuItem
                // Добавляем пункт в меню.
                .appendTo(menu)
                // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
                .find('a')
                .click(function () {
                    //myMap.geoObjects.remove(collection);
                    myMap.setBounds(collection.getBounds());
                });
            for (var j = 0, m = group.items.length; j < m; j++) {
                collection.add(new ymaps.Placemark(group.items[j].center));
            }
        }

        // Добавляем меню в тэг BODY.
        menu.appendTo($('.chart'));
        // Выставляем масштаб карты чтобы были видны все группы.
        myMap.setBounds(myMap.geoObjects.getBounds());
    }


    $('.form-post').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        $.ajax({
            url: form.attr('action').replace('/post', '/post-json') + '&c=?',
            data: form.serialize(),
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.result == 'error') {
                    alert('Error');
                } else {
                    alert('Ok')
                }
            }
        });
        return false;
    });
    $('.form-post a.btn').on('click', function (e) {
        e.preventDefault();
        $(this).closest('form').submit();
    });

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

});

function onYouTubeIframeAPIReady() {
    $(function () {

        var playersList = {};

        $('.content-video').each(function () {
            var player;
            var el = $(this);


            player = new YT.Player($(this).find('div').get(0), {
                width: '100%',
                height: '404px',
                playerVars: {
                    showinfo: 0,
                    hd: 1,
                    rel: 0,
                    egm: 0,
                    showsearch: 0,
                    wmode: 'opaque'
                },
                videoId: YouTubeGetID(el.attr('data-video-id')),
                events: {
                    'onReady': function (e) {
                        e.target.addEventListener('onStateChange', function (event) {
                            if (event.data == 0 || event.data == 2) {
                                $('.video-gal_i').fadeIn();
                            }
                        });
                    }
                }
            });
            el.data('ytPlayer', player);
            el.find('.popup-close').on('touch click', function (e) {
                player.stopVideo();
            });
        });
    });


}

function YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}

