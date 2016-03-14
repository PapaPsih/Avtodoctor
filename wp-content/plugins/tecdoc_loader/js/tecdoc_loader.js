//multiselect in checkboxes
function selectAllCheckboxes(){
	$('[name=all_checked_products]').click(function() {
	  if($('[name=all_checked_products]').prop('checked')){
	  	$('.checked_product').prop('checked', true);
	  }else{
	  	$('.checked_product').prop('checked', false);
	  }
	});
}

function setMultiSelectCategory(){
	var id = $('#multi_select_categories').val();
	var products = $('.product_row');
	for (var i = 0; i < products.length; i++) {
		var checked = $(products[i]).find('.checked_product');
		if(checked.prop('checked')){
			$(products[i]).find('.product_category').val(id);
		}
	}
}

function getModels(parent_element_data_id){
	$.ajax({
		url: location.origin + '/wp-content/plugins/tecdoc_loader/tecdoc_base/tecdoc.php',
		type:"POST",
		data: {	quick_post: 'get_models',
				brand_id: $('[data-id="' + parent_element_data_id + '"] .brands').val()},
		crossDomain: false,
		xhrFields: {
			withCredentials: true
		},
		complete: function(response){
		var data = response.responseText;
		console.log(data);					
	}});
}