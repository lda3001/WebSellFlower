using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebSellFlower.Models;
using WebSellFlower.Request;

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

            var cart = GetCart(); 

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
                    ProdPrice = product.ProdPrice
                });
            }
            else
            {
                item.Quantity += request.Quantity;
            }

            SaveCart(cart);
             return Ok(new { message = "Product added to cart.",data = cart });
        }




    }
	public class ProductDto : TblProduct
	{
		public string CategoryName { get; set; }
	}

	public class CartItem : TblProduct
	{		
		public int? TotalPrice => Quantity * ProdPrice;
	}
}
