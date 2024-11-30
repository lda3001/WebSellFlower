using WebSellFlower.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebSellFlower.Controllers;

namespace WebSellFlower.ViewComponents
{
	public class CartViewComponent : ViewComponent
	{
		private readonly WebsiteBanHoaContext _context;

		public CartViewComponent(WebsiteBanHoaContext context)
		{
			_context = context;
		}
         private List<WebSellFlower.Controllers.CartItem> GetCart()
        {
            var cartJson = HttpContext.Session.GetString("Cart");
            if (string.IsNullOrEmpty(cartJson))
            {
                return new List<WebSellFlower.Controllers.CartItem>();
            }
            return JsonConvert.DeserializeObject<List<CartItem>>(cartJson);
        }
		 
		public async Task<IViewComponentResult> InvokeAsync()
		{
			var cart = GetCart();

			return await Task.FromResult<IViewComponentResult>(
				View(cart));
		}
	}
}