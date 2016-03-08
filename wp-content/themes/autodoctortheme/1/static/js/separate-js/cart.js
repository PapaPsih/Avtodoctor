$(document).ready(function () {
    // Fill sample products array
    var sampleProducts = [];
    for (var i = 0; i<10; i++) {
	var item = {
	    id: i,
	    name: 'Рулевая рейка BMW E-39 95-04г.',
	    image: 'img/content/654x398.jpg',
	    description: ''
	};
	sampleProducts.push(item);
    }
    // Cart object
    window.cart = {
	html: {
	    smallContainer: null, // container in header, near search
	    fullContainer: null	  // container on cart page(if needed)
	},
	products: null,
	addProduct: function(product){},
	removeProduct: function(product){},

	render: function(){},	// renders changes in html when cart object updated
	save: function(){
	    localStorage.setItem('cart', this.products);
	},
	init: function(){
	    this.products = localStorage.getItem('cart') || sampleProducts;
	    this.html.smallContainer = null;
	    this.html.fullContainer = null;
	}
    };
});
