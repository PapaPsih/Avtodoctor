function newFeedback() {

    $('.media-list').spin();
    if ($('[name=user_name]').val() == '' || $('[name=user_email]').val() == '' || $('[name=feedback_text]').val() == '')
    {
        var data = {
          action: 'feedback_error',
          error: 'error'
        };
        result_block = '#feedback-error';
    }

    else if ($('[name=feedback_location]').val() == 'product')
    {
	    var data = {
		    action: 'add_new_feedback',
		    feedback_text: $('[name=feedback_text]').val(),
		    user_name: $('[name=user_name]').val(),
		    user_email: $('[name=user_email]').val(),
            feedback_location: $('[name=feedback_location]').val(),
            id_product: $('[name=id_product]').val(),
            answer_id: $('[name=answer_id]').val()

	};
        result_block = '#feedback_list';
    }
    else if ($('[name=feedback_location]').val() == 'home' || $('[name=feedback_location]').val() == 'services')
    {
        var data = {
            action: 'add_new_feedback',
            feedback_text: $('[name=feedback_text]').val(),
            user_name: $('[name=user_name]').val(),
            user_email: $('[name=user_email]').val(),
            feedback_location: $('[name=feedback_location]').val(),
            auto_brand: $('#auto_brand option:selected').text(),
            model: $('#model option:selected').text()
        };
    }
	jQuery.post( myajax.url, data, function (prin) {
            $(result_block).html(prin);
        }
    );

    $(':input','#feedback_form')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');

}

function add_answer (user_name, id)
{
       document.getElementById("feedback_text").innerHTML = user_name;
    document.getElementById("answer_id").value = id;
}

function delete_feedback (id)
{
    $('.media-list').spin();
    var data = {
        action: 'delete_feedback',
        id: id,
        id_product: $('[name=id_product]').val()
    };
jQuery.post( myajax.url, data, function (prin) {
        $('#feedback_list').html(prin);
        $('.media-list').spin(false);
    }
);
}