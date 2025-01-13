using Azure.Core;
using Microsoft.AspNetCore.Components.QuickGrid;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using WebSellFlower.Models;
using WebSellFlower.Request;
using WebSellFlower.Requests;

namespace WebSellFlower.Controllers
{

	public class CartController : BaseController
	{
		private readonly WebsiteBanHoaContext _context;
		private const string CartSessionKey = "Cart";


		public CartController(WebsiteBanHoaContext context)
		{
			_context = context;
		}

        private List<CartItem> GetCart()
        {
            var cartJson = HttpContext.Session.GetString(CartSessionKey);
            if (string.IsNullOrEmpty(cartJson))
            {
                return new List<CartItem>();

            }
            return JsonConvert.DeserializeObject<List<CartItem>>(cartJson);
        }

        private void SaveCart(List<CartItem> cart)
        {
            var cartJson = JsonConvert.SerializeObject(cart);
            HttpContext.Session.SetString(CartSessionKey, cartJson);
        }


        [Route("/cart")]
		public async Task<IActionResult> CartDetail()
		{
            var proId = HttpContext.Request.Query["remove_item"];
            

			var cart = GetCart();
			if (!string.IsNullOrEmpty(proId))
			{
				var item = cart.FirstOrDefault(c => c.ProdId == Int32.Parse(proId));
				if (item != null)
				{
					cart.Remove(item);
                    SaveCart(cart);

                }
            }

			// Nếu cần thêm thông tin sản phẩm từ database
			var productIds = cart.Select(c => c.ProdId).ToList();
            var products = await _context.TblProducts
                .Where(p => productIds.Contains(p.ProdId))
                .ToListAsync();

           
            // foreach (var item in cart)
            // {
            //     var product = products.FirstOrDefault(p => p.ProdId == item.ProductId);
            //     if (product != null)
            //     {
            //         item.ProductName = product.ProdName;
            //         item.Price = product.ProdPrice;
            //     }
            // }
            ViewBag.Cart = cart;



            return View(cart);
		}
        [HttpGet]
        public IActionResult Refresh()
        {
            return ViewComponent("Cart");
        }

        [HttpPost, ActionName("cartUpdate")]
        public async Task<IActionResult> UpdateCart([FromForm] IFormCollection formData)
        {
			var cart = GetCart();

			
			foreach (var key in formData.Keys)
			{
			
				if (key.StartsWith("cart") && key.Contains("[qty]"))
				{
					
					var match = Regex.Match(key, @"cart\[(\d+)\]\[qty\]");
					if (!match.Success) continue;

					int productId = int.Parse(match.Groups[1].Value);
					int quantity = int.TryParse(formData[key], out var qty) ? qty : 0;

				
					var existingItem = cart.FirstOrDefault(c => c.ProdId == productId);
					if (existingItem != null)
					{
						if (quantity == 0)
						{
							cart.Remove(existingItem);
						}
						else
						{
							
							existingItem.Quantity = quantity;
						}
					}
					else if (quantity > 0)
					{
						
						var product = _context.TblProducts.FirstOrDefault(p => p.ProdId == productId);
						if (product == null) continue;

						cart.Add(new CartItem
						{
							ProdId = product.ProdId,
							ProdName = product.ProdName,
							ProdThumb = product.ProdThumb,
							Quantity = quantity,
							ProdPrice = product.ProdPrice,
							Alias = product.Alias,
						});
					}
				}
			}

			
			SaveCart(cart);

            return RedirectToAction("CartDetail", "Cart");

		}

        [HttpPost]
        [Route("api/cart/add")]
        public IActionResult AddToCart([FromBody] AddToCartRequest request)
        {
            var cart = GetCart();

            var item = cart.FirstOrDefault(c => c.ProdId == request.ProductId);
            if (item == null)
            {
                
                var product = _context.TblProducts.FirstOrDefault(p => p.ProdId == request.ProductId);
                if (product == null) return NotFound();

                cart.Add(new CartItem
                {
                    ProdId = product.ProdId,
                    ProdName = product.ProdName,
                    ProdThumb = product.ProdThumb,
                    Quantity = request.Quantity,
                    ProdPrice = product.ProdPrice,
                    ProdDiscount = product.ProdDiscount,
                    Alias = product.Alias,

                });
            }
            else
            {
                item.Quantity += request.Quantity;
            }

            SaveCart(cart);
             return Ok(new { message = "Product added to cart."});
        }
        

        [HttpPost]
        [Route("api/cart/remove")]
        public IActionResult RemoveFromCart([FromBody] RemoveProductRequest request)
        {
            var cart = GetCart();
            var item = cart.FirstOrDefault(c => c.ProdId == request.productId);
            if (item != null)
            {
                cart.Remove(item);
            }
            SaveCart(cart);

            return Ok(new { message = "Product remove to cart." });
        }





    }
	public class ProductDto : TblProduct
	{
		public string CategoryName { get; set; }
	}

	public class CartItem : TblProduct
	{		
		public double? TotalPrice => Quantity * (ProdDiscount> 0 ? ProdDiscount : ProdPrice);
	}
}
