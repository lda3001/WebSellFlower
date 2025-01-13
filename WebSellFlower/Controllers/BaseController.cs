using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System.Security.Claims;
using WebSellFlower.Models;

namespace WebSellFlower.Controllers
{
    public class BaseController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var cart = HttpContext.Session.GetString("Cart");
            if (string.IsNullOrEmpty(cart))
            {
                ViewBag.CartItem = new List<CartItem>();
            }
            else
            {
                ViewBag.CartItem = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            }
            
			var userName = User.Identity.Name;
			var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
			if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(userRole)) {
				ViewBag.User = new TblCustomer
				{
					CustFullname = userName,
					Role = userRole == "Admin" ? 1 : 0
				};
			}
			

			base.OnActionExecuting(filterContext);
        }
    }
}
