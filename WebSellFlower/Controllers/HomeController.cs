using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using WebSellFlower.Models;

namespace WebSellFlower.Controllers
{
    public class HomeController : Controller
    {
        private readonly WebsiteBanHoaContext _context;
        private readonly ILogger<HomeController> _logger;

        public HomeController(WebsiteBanHoaContext context, ILogger<HomeController> logger)
        {
			_context = context;
			_logger = logger;
        }

        public IActionResult Index()
        {
			ViewBag.productCategories = _context.TblCategoryProducts.ToList();
			ViewBag.productNew = _context.TblProducts.Where(m => (bool)m.IsNew).ToList();
			ViewBag.Slider = _context.TblSliders.ToList();
			return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
