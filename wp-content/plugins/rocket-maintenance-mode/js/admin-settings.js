jQuery(function ($) {

$(document).ready(function() {

	$('#reset').click(function(e) {

		e.preventDefault();

		if ( confirm( wpmmpjs.confirm_reset ) ) {

			var url = wpmmpjs.ajax_url + '?action=wpmmp_reset_settings&nonce='+ wpmmpjs.reset_nonce;
			
			$.post( url, function(data) {

				alert(wpmmpjs.successfull_reset);

				window.location = window.location.href;
				
			});

		}

	});

});

//end
});