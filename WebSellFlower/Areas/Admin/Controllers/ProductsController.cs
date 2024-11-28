using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebSellFlower.Models;

namespace WebSellFlower.Areas.Admin.Controllers
{
	[Area("Admin")]
	public class ProductsController : Controller
	{
		private readonly WebsiteBanHoaContext _context;
		public ProductsController(WebsiteBanHoaContext context)
		{
			_context = context;
		}
		[Route("admin/product/{alias}-{id}.html")]
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
				ProdThumb = p.ProdThumb,
				Quantity = p.Quantity,
				IsActive = p.IsActive,
				ProdPrice = p.ProdPrice,
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

			ViewBag.listCategory = _context.TblCategoryProducts.ToList();
			ViewBag.listComment = _context.TblProductReviews.Where(i=> i.ProdId == id).ToList();

			return View(product);
		}

	}
	public class ProductDto : TblProduct
	{
		public string CategoryName { get; set; }
	}
}
