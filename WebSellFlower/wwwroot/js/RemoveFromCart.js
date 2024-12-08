
jQueryNew(document).on('click', '.remove_item_ajax', function (e) {
    e.preventDefault();

   
    const $button = jQueryNew(this);
    const productId = $button.data('product_id');
   

    jQueryNew.ajax({
        url: '/api/cart/remove',
        type: 'POST',
        data: JSON.stringify({
            productId
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
        },
        error: function (xhr) {
            alert('Failed to removed product to cart.');
        },
    });
});