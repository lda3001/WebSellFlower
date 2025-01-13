using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebSellFlower.Models;

namespace WebSellFlower.Areas.Admin.Controllers
{
    
    public class HomeController : Controller
    {
        [Area("Admin")]
        [Authorize(Roles = "Admin")]
        public IActionResult Index()
        {
			
			return View();
        }
    }
}
