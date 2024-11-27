using Microsoft.AspNetCore.Mvc;
using WebSellFlower.Models;
using Microsoft.EntityFrameworkCore;


namespace WebSellFlower.Controllers
{
	public class ProductCategoryController : Controller
	{
		private readonly WebsiteBanHoaContext _context;
		public ProductCategoryController(WebsiteBanHoaContext context)
		{
			_context = context;
		}
		[Route("/product-category/{alias}")]
		public async Task<IActionResult> Details(string? alias)
		{
			if (alias == null || _context.TblCategoryProducts == null)
			{
				return NotFound();
			}

			var productcategory = await _context.TblCategoryProducts
				.FirstOrDefaultAsync(m => m.Alias == alias);

			if (productcategory == null)
			{
				return NotFound();
			}

			ViewBag.productcate = _context.TblProducts.
				Where(i => i.Alias == alias &&(bool) i.IsActive ).ToList();

			/*ViewBag.productRelated = _context.TblProducts.
				Where(i => i.ProdId != id && i.CategoryProdId == product.CategoryProdId).Take(4)
				.OrderByDescending(i => i.ProdId).ToList();*/

			return View(productcategory);
		}
	}
}
