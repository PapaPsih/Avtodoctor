

window.onload = function(){
	//resetLiqpayButton();
	//getNewlettersList();
	if(location.href.indexOf('/services') > -1 ){
		PricesCalculator.getCategories();
	}
};

function $_GET(param) {
	var vars = {};
	window.location.href.replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

var News = {
	getNews: function (page, offset, append){
		var self = this;
		var data = {
			action: 'get_news',
			page: page > 0  ? page : 1,
			offset: offset > 0  ? offset : 0
		};
		jQuery.post( myajax.url, data, function(response) {
			console.log(response);
			console.log(JSON.parse(response));
			self.setNews(append || false, JSON.parse(response));
			console.log('data.page: ' + data.page);
		});
	},
	setNews: function(append, array){
		var self = this;
		var ui_string = '';
		jQuery.each( array.data, function( i, element ) {
			switch(element.category){
				case 'big':
					ui_string += element.new;
					break;
				case 'little':
					ui_string += element.new;
					break;
			}

		});
		if(append){
	  		$('#news-content').append();
	  	}else{
	  		$('#news-content').html(ui_string);
	  	}
	  	self.setPagination(array.all_count, $('[data-type=news]').length);

	}, 
	setPagination: function(all_count, elements_on_page){
		var self = this;
		var count_pages = (all_count - elements_on_page) / 20;
		if(count_pages >  parseInt(count_pages)){
			var total_pages = 2 + parseInt(count_pages);
		}else{
			var total_pages = 1 + parseInt(count_pages);
		}
		
		var current_page = $_GET('news_page') > 0  ? $_GET('news_page') : 1;
		var pagination_parameters = self.smartPagination(current_page, total_pages);

		var pagination_ui = '';
		/*for (var i = 0; i < total_pages; i++) {
			var class_active = current_page == (i+1)  ? 'class="active"' : '';
			if( pagination_parameters.minimum_after_ellipsis > -1 && ( (i+1) > 1) ){

			}
			pagination_ui += '<li ' + class_active + '>\
                                    <a href="' + location.pathname + '?news_page=' + (i+1) +  '">' + (i+1) + '</a>\
                                </li>';
		};*/
		$('#pagination').html(pagination_ui);
	},
	smartPagination: function(current_page, total_pages){
		var pagination_parameters = { minimum_after_ellipsis: -1,
									  maximum_before_ellipsis: -1, 
									  first_ellipsis_start: -1,
									  first_ellipsis_end: -1,
									  second_ellipsis_start: -1,
									  second_ellipsis_end: -1};
		if( (current_page - 5 ) > 0){
			pagination_parameters.minimum_after_ellipsis = current_page-1;
			pagination_parameters.first_ellipsis_end = current_page-2;
		}
		if( (total_pages - current_page ) > 3){
			pagination_parameters.maximum_before_ellipsis = total_pages;
			pagination_parameters.second_ellipsis_end = total_pages-1;
		}
		return pagination_parameters;
	}
}

var PricesCalculator = {
	categories: [],
	services: [],
	getCategories: function(){
		var self = this;
		$.ajax({
		  method: "POST",
		  url: location.origin + "/wp-content/themes/autodoctortheme/included_scripts/prices_calculator.php",
		  data: { name_query: "get_categories" }
		}).done(function( msg ) {
			console.log(msg);
			var data = JSON.parse(msg);
		    console.log(data);
		    var categories_ui = '';
		    jQuery.each( data, function( i, element ) {
				categories_ui += '<option value = "' + element.id + '">' + element.category + '</option>';
			});
			$('#categories').html(categories_ui);
			$('#categories').attr('data-placeholder', data[0].category);
			$('#categories').off();
			$('#categories').on('change', function(){
				self.getServices();
			});
			$('#select2-chosen-1').html(data[0].category);
			self.getServices();
		});
	},
	getServices: function(){
		var self = this;
		$.ajax({
		  method: "POST",
		  url: location.origin + "/wp-content/themes/autodoctortheme/included_scripts/prices_calculator.php",
		  data: { name_query: "get_services", id_category: $('#categories').val() }
		}).done(function( msg ) {
			console.log(msg);
			var data = JSON.parse(msg);
		    console.log(data);
		    var services_ui = '';
		    jQuery.each( data, function( i, element ) {
				services_ui += '<option data-price = "' + element.price + '" value = "' + element.id + '">' + element.service + '</option>';
			});
			$('#services').html(services_ui);
			$('#services').attr('data-placeholder', data[0].service);
			$('#services').off();
			$('#services').on('change', function(){
				self.changeService();
			});
			$('#select2-chosen-2').html(data[0].service);
			$('#price_service').html($('#services option[value="' + $('#services').val() + '"]').data('price'));
			if(!$('[data-status="new"]').length){
				self.appendService();
			}
			self.changeService();
		});
	},
	appendService: function(){
		var self = this;
		$('[data-status="new"]').attr('data-status', 'old');
		var id_service = $('[data-row="service"]').length ? parseInt($('[data-row="service"]').last().attr('data-service-id') )+1 : 1;
		var category = $('#categories option[value="' + $('#categories').val() + '"]').html();
		var service = $('#services option[value="' + $('#services').val() + '"]').html();
		var price = $('#services option[value="' + $('#services').val() + '"]').data('price');
		var services_ui = '<div data-status = "new" data-row = "service" data-service-id = "' + id_service + '" class="row">\
                                <div class="row_i">\
                                    <div class="col">\
                                        <span data-type = "category">' + category + '</span>\
                                    </div>\
                                    <div class="col">\
                                        <span data-type = "service">' + service + '</span>\
                                    </div>\
                                    <div class="col">\
                                        <span><price data-type = "service_price">' + price + '</price> грн.</span>\
                                        <div onclick = "PricesCalculator.deleteService(' + id_service + ')" class="row-close"></div>\
                                    </div>\
                                </div>\
                            </div>';
        $('#services-table').append(services_ui);
        self.changeService();
	},
	changeService: function(){
		$('[data-status="new"] [data-type="category"]').html($('#categories option[value="' + $('#categories').val() + '"]').html());
		$('[data-status="new"] [data-type="service"]').html($('#services option[value="' + $('#services').val() + '"]').html());
		$('[data-status="new"] [data-type="service_price"]').html($('#services option[value="' + $('#services').val() + '"]').data('price'));
		$('#price_service').html($('#services option[value="' + $('#services').val() + '"]').data('price'));
		var prices_array = $('[data-type=service_price]');
		var all_summ = 0;
		jQuery.each( prices_array, function( i, element ) {
			all_summ += parseInt($(element).html());
		});
		$('#all_summ').html(all_summ);
	},
	deleteService: function(id){
		var self = this;
		$('[data-service-id=' + id + ']').css('display', 'none');;
		$('[data-service-id=' + id + '] [data-type=\'service_price\']').remove();
		self.changeService();
	}
}

function smsNotificationAboutBuying(){
	var data = {
		action: 'send_sms',
		client_phone: $('[name=client_phone]').val(),
		client_text: $('[name=client_text]').html(),
		admin_phone: $('[name=admin_phone]').val(),
		admin_text: $('[name=admin_text]').html()
	};
	jQuery.post( myajax.url, data, function(response) {
		console.log(response);
		alert('СМС были успешно отправлены!');
	});
}

function smsNotificationAboutService(){
	var client_message = 'Спасибо, ' + $('[name=client_name_service]').val() + '.Ваша заявка принята.Ожидайте звонка для уточнения информации.';
	var admin_message = 'Новая запись на СТО: ' + $('[name=client_name_service]').val() + 
									  ', тел. ' + $('[name=client_phone_service]').val() + 
									  ', дата '  + $('[name=client_date_service]').val() +
									  ', время '  + $('[name=client_time_service]').val();
	var data = {
		action: 'send_sms',
		client_phone: $('[name=client_phone_service]').val(),
		client_text: client_message,
		admin_phone: '+380934857180',//$('[name=admin_phone_service]').val(),
		admin_text: admin_message
	};
	jQuery.post( myajax.url, data, function(response) {
		console.log(response);
	});
}

function resetLiqpayButton(){
	$('#liqpay_button').html('Подождите...');
	var data = {
		action: 'get_liqpay_button',
		total_amount: parseInt($('[name=price]').val() ) * parseInt($('[name=amount]').val() )
	};
	jQuery.post( myajax.url, data, function(response) {
		$('#liqpay_button').html(response);
	});
}

function emailNotificationAboutRegistration(){
	var data = {
		action: 'send_one_email',
		client_email_registration: $('[name=client_email_registration]').val(),
		client_message_registration: $('[name=client_message_registration]').html(),
		client_subject_registration: $('[name=client_subject_registration]').val()
	};
	jQuery.post( myajax.url, data, function(response) {
		console.log(response);
		alert('Успешная регистрация!');
	});
}

function newSubscribe(){
	var data = {
		action: 'subscribe',
		id_newsletter: $('[name=id_newsletters]').val(),
		email_subscribe: $('[name=email_subscribe]').val()
	};
	jQuery.post( myajax.url, data, function(response) {
		console.log(response);
	});
}

function getNewlettersList(){
	var data = {
		action: 'get_newletters_list'
	};
	jQuery.post( myajax.url, data, function(response) {
		console.log(response);
		var needle = JSON.parse(response);
		var ui_string = '';
		for(var i = 0; i < needle.length; i++){
			ui_string += '<option value = "' + needle[i].id_newsletter + '">' + needle[i].name + '</option>'
		}
		$('#newsletters').html(ui_string);
		$('#newsletters_send').html(ui_string);
	});
}

function sendAllSubscribers(){
	var data = {
		action: 'send_all_subscribers',
		subscribe_subject: $('[name=subscribe_subject]').val(),
		subscribe_text: $('[name=subscribe_text]').html(),
		id_newsletter: $('#newsletters_send').val()
	};
	jQuery.post( myajax.url, data, function(response) {
		console.log(response);
	});
}


if(location.href.indexOf('all-news') > -1 && location.href.indexOf('all-news/new') == -1){
	//News.getNews($_GET('news_page'), $_GET('offset'));
}

function myOrders (url)
{
    document.location.href = url;
}

function delete_one_product_in_bag (id, key)
{
    var data = {
        action: 'delete_one_product_in_bag',
        id: id,
        key: key
    };
    jQuery.post( myajax.url, data, function(response) {
        var needle = JSON.parse(response);
        $('.cart_count').html(needle.simple_cart_count);
        $('.cart_count2').html(needle.text_cart_count);
        $('.total_price').html(needle.total_price);
        $('.total').html(needle.total);
    });
}


function delete_product_in_bag (id, count)
{
    var data = {
        action: 'delete_product_in_bag',
        id: id,
        count: count
    };
    jQuery.post( myajax.url, data, function(response) {
        var needle = JSON.parse(response);
        $('.cart_count').html(needle.simple_cart_count);
        $('.cart_count2').html(needle.text_cart_count);
        $('.total_price').html(needle.total_price);
        $('.total').html(needle.total);
    });
}

function add_one_product_in_bag (id)
{
    var data = {
        action: 'add_one_product_in_bag',
        id: id
    };
    jQuery.post( myajax.url, data, function(response) {
        var needle = JSON.parse(response);
        $('.cart_count').html(needle.simple_cart_count);
        $('.cart_count2').html(needle.text_cart_count);
        $('.total_price').html(needle.total_price);
        $('.total').html(needle.total);
    });
}

function applyChange (id)
{
    $('.shopping-cart__content').spin();
    var data = {
        action: 'change_user_data',
        first_name: $('[name=new_first_name]').val(),
        last_name: $('[name=new_last_name]').val(),
        email: $('[name=new_email]').val(),
        phone: $('[name=new_phone]').val(),
        address: $('[name=new_address]').val(),
        number_delivery: $('[name=new_delivery_number]').val(),
        pass: $('[name=pass]').val(),
        new_pass: $('[name=new_pass]').val(),
        new_pass2: $('[name=new_pass2]').val(),
        city: $('[name=city]').val(),
        ID: id
    };
    jQuery.post( myajax.url, data, function(data){
        $('.shopping-cart__content').spin(false);
        alert(data);
    });
}
num = 0;
function show_more_products(count, url)
{
    if (count!=0)
    num=count;

    num+=20;

    if (num == 20)
    num = 40;

    $('.more').spin();

    $('.brand-directory').load(url+'?show_more='+ num +' #brand-directory');
    $('.pagination-wrap').load(url+'?show_more='+ num +' #pagination-wrap');
    $('.more').load(url+' #more');

}

function search (url, loc)
{
    if (loc == 'full')
    {
    var value = document.getElementById('s').value;
        if(value == '')
            return;
        document.getElementById('result-s').className='search-focus';
        $('#result-s').spin();
    }
    if (loc == 'mob')
    {
    var value = document.getElementById('s-mob').value;
     $('#result').spin();
    }

    var data =
    {
        action: 'search',
        s: value
    }
    jQuery.post( myajax.url, data, function(data){

        if (loc == 'full')
        {
            document.getElementById('result-text-s').innerHTML = data;
            $('#result-s').spin(false);
        }
        if (loc == 'mob')
        {
            document.getElementById('result').className='search-focus';
            document.getElementById('result-text').innerHTML = data;
            $('#result').spin(false);
        }
    });
}

function search_focus ()
{
    document.getElementById('result-s').className='search-focus';
}

function close_ad (loc)
{
    var data =
    {
        close: loc
    }
    jQuery.post( location.href, data, function(data){
        console.log(data);
    });
}

function create_new_order (user_id)
{
    $('#sending').spin();
    var data =
    {
        action: 'create_new_order',
        user_id: user_id
    }
    jQuery.post( myajax.url, data, function(response){
        console.log(response);
        var needle = JSON.parse(response);
        $('#sending').spin(false);
        location.href='https://www.liqpay.com/api/3/checkout?data=' + needle.dat + '&signature=' + needle.sign;
    });
}

function select_filter (filter, cat_id)
{
   // $('.sorting').spin();

    var data =
    {
        action: 'select_filter',
        filter: filter,
        brand: $('#brand option:selected').text(),
        model: $('#model option:selected').text(),
        year: $('#year option:selected').text(),
        modify: $('#modify option:selected').text(),
        cat_id: cat_id
    }
    jQuery.post( myajax.url, data, function(response){
       // console.log(data);
       // console.log(response);
        $('#'+filter).html(response);
       // $('.sorting').spin(false);
    });
}

function select_filter_feedback ()
{
     $('#filter').spin();
    var data =
    {
        action: 'select_filters_feedback',
        brand_id: $('#auto_brand option:selected').val()
    }
    jQuery.post( myajax.url, data, function(response){
      //  console.log(data);
       // console.log(response);
        $('#model').html(response);
        $('#filter').spin(false);
    });
}



