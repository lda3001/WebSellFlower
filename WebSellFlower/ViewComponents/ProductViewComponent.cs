using WebSellFlower.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebSellFlower.ViewComponents
{
	public class ProductViewComponent : ViewComponent
	{
		private readonly WebsiteBanHoaContext _context;

		public ProductViewComponent(WebsiteBanHoaContext context)
		{
			_context = context;
		}

		public async Task<IViewComponentResult> InvokeAsync()
		{
			var items = _context.TblProducts.Include(m => m.CategoryProd)
				.Where(m => (bool)m.IsActive).Where(m => (bool)m.IsNew);

			return await Task.FromResult<IViewComponentResult>(
				View(items.OrderByDescending(m => m.ProdId).ToList()));
		}
	}
}