$(document).on('click', '.add_to_cart_button', function (e) {
    e.preventDefault();

   
    const $button = $(this);
    const productId = $button.data('product_id');
    const quantity = $button.data('quantity');

    $.ajax({
        url: '/api/cart/add',
        type: 'POST',
        data: JSON.stringify({
            ProductId: productId,
            Quantity: quantity,
        }),
        contentType: 'application/json',
        success: function (response) {
            // Cập nhật UI sau khi thêm thành công
            alert('Product added to cart successfully!');
        },
        error: function (xhr) {
            // Hiển thị lỗi nếu có
            alert('Failed to add product to cart.');
        },
    });
});
