using Microsoft.AspNetCore.Mvc;

namespace WebSellFlower.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
