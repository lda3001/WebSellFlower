using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using System.Security.Claims;
using WebSellFlower.Models;

namespace WebSellFlower.Controllers
{
    [Authorize(Roles = "User")]
    public class CheckoutController : Controller
    {
        private readonly WebsiteBanHoaContext _context;

        public CheckoutController(WebsiteBanHoaContext context)
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

        [Route("/Checkout")]
        public IActionResult Index()
        {
            var cart = GetCart();
            if (cart == null || cart.Count == 0)
            {
                return RedirectToAction("Index","Home");
            }
            return View(cart);
        }
        [HttpPost]
        [Route("/Checkout")]
        public async Task<IActionResult> Create(
                string billing_first_name,
                string billing_last_name,
                string billing_company,
                string billing_address_1,
                string billing_address_2,
                string billing_city,
                string billing_state,
                string billing_phone,
                string billing_email,
                string payment_method,
                double total)
        {
            try
            {
               
                var cart = GetCart();

                if (cart == null )
                {
                    return Json(new { status = false, message = "No products in the cart." });
                }
                var name = billing_first_name + billing_last_name;
                var address = billing_address_1 + " , "+ billing_state ;

                var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.UserData)?.Value;

                TblOrder order = new TblOrder
                {
                    OrderName = name,
                    OrderAddress = address,
                    OrderEmail = billing_email,
                    OrderPhone = billing_phone,   
                    OrderCustId  = Int32.Parse(userId),
                    OrderDate = DateTime.Now,
                    OrderTotal = total
                };

               
                _context.Add(order);
                await _context.SaveChangesAsync();

                foreach (var product in cart)
                {
                    TblOrderDetail orderDetail = new TblOrderDetail
                    {
                        OrderId = order.OrderId,
                        ProdId = product.ProdId,
                        Quantity = product.Quantity,
                        Price = (product.ProdDiscount> 0 ? product.ProdDiscount : product.ProdPrice),
                        PaymentName = payment_method,
                        PaymentStatus = "PENDING"
                    };
                    _context.Add(orderDetail);
                }

                await _context.SaveChangesAsync();

               
                HttpContext.Session.Remove("Cart");

				TempData["NotifyMessage"] = "Bạn Vừa Đặt Hàng Thành Công";
				TempData["NotifyType"] = "error";


				return RedirectToAction("Index", "Home"); 
			}
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return Json(new { status = false, message = ex.Message });
            }
        }

    }
}
