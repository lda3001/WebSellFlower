using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

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
            
            base.OnActionExecuting(filterContext);
        }
    }
}
