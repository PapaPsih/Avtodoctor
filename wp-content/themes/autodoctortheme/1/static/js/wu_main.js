window.onload = function(){
	resetLiqpayButton();
	getNewlettersList();
};

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
	var data = {
		action: 'send_sms',
		client_phone: $('[name=client_phone_service]').val(),
		client_text: $('[name=client_text_service]').html(),
		admin_phone: $('[name=admin_phone_service]').val(),
		admin_text: $('[name=admin_text_service]').html()
	};
	jQuery.post( myajax.url, data, function(response) {
		console.log(response);
		alert('СМС были успешно отправлены!');
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
		id_newsletter: $('#newsletters').val(),
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