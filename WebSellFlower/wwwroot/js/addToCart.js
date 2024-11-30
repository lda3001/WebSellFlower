jQueryNew(document).on('click', '.add_to_cart_button', function (e) {
    e.preventDefault();

   
    const $button = jQueryNew(this);
    const productId = $button.data('product_id');
    const quantity = $button.data('quantity');

    jQueryNew.ajax({
        url: '/api/cart/add',
        type: 'POST',
        data: JSON.stringify({
            ProductId: productId,
            Quantity: quantity,
        }),
        contentType: 'application/json',
        success: function (response) {
           
            jQueryNew.ajax({
                url: '/Cart/Refresh', 
                type: 'GET',
                success: function (partialHtml) {
                    
                    jQueryNew('#cart-container').html(partialHtml);
                },
                error: function () {
                    alert('Failed to refresh the cart.');
                },
            });
            alert('Product added to cart successfully!');
        },
        error: function (xhr) {
            alert('Failed to add product to cart.');
        },
    });
});
