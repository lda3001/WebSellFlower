using Microsoft.AspNetCore.Mvc;
using WebSellFlower.Models;
using Microsoft.EntityFrameworkCore;


namespace WebSellFlower.Controllers
{
	public class ProductController : Controller
	{
		private readonly WebsiteBanHoaContext _context;
		public ProductController(WebsiteBanHoaContext context)
		{
			_context = context;
		}
		[Route("/product/{alias}-{id}.html")]
		public async Task<IActionResult> Details(int? id)
		{
			if (id == null || _context.TblProducts == null)
			{
				return NotFound();
			}

			var product = await _context.TblProducts.Include(i => i.CategoryProd)
				.FirstOrDefaultAsync(m => m.ProdId == id);

			if (product == null)
			{
				return NotFound();
			}

			ViewBag.productReview = _context.TblProductReviews.
				Where(i => i.ProdId == id && i.IsActive).ToList();

			ViewBag.productRelated = _context.TblProducts.
				Where(i => i.ProdId != id && i.CategoryProdId == product.CategoryProdId).Take(4)
				.OrderByDescending(i => i.ProdId).ToList();

			return View(product);
		}
	}
}
