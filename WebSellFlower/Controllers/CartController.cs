using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebSellFlower.Models;

namespace WebSellFlower.Controllers
{
	
	public class CartController : Controller
	{
		private readonly WebsiteBanHoaContext _context;
		public CartController(WebsiteBanHoaContext context)
		{
			_context = context;
		}
        [Route("/cart")]
        public async Task<IActionResult> CartDetail()
		{
			if (_context.TblProducts == null)
			{
				return NotFound();
			}

			

			return View();
		}

		[Route("admin/product-list.html")]
		public async Task<IActionResult> List()
		{
			if (_context.TblProducts == null)
			{
				return NotFound();
			}

			var product = await _context.TblProducts
			.Include(p => p.CategoryProd)
			.Select(p => new ProductDto 
			{ 
				ProdId = p.ProdId, 
				ProdName = p.ProdName, 
				CategoryName = p.CategoryProd.CategoryProdName 
			})
			.ToListAsync();


			if (product == null)
			{
				return NotFound();
			}

			ViewBag.products = product;


			return View();
		}
		[Route("admin/product/edit/{id}")]
		public async Task<IActionResult> Edit(int id)
		{
			var product = await _context.TblProducts.Include(i => i.CategoryProd)
				.FirstOrDefaultAsync(m => m.ProdId == id);

			if (product == null)
				return NotFound();

			return View(product);
		}

	}
	public class ProductDto 
	{
		public int ProdId { get; set; }
    	public string ProdName { get; set; }
		public string CategoryName { get; set; }
	}
}
