using WebSellFlower.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebSellFlower.ViewComponents
{
	public class BlogViewComponent : ViewComponent
	{
		private readonly WebsiteBanHoaContext _context;

		public BlogViewComponent(WebsiteBanHoaContext context)
		{
			_context = context;
		}

		public async Task<IViewComponentResult> InvokeAsync()
		{
			var items = _context.TblPosts.Include(m => m.CategoryPost)
				.Where(m => (bool)m.IsActive);

			return await Task.FromResult<IViewComponentResult>(
				View(items.OrderByDescending(m => m.PostId).ToList()));
		}
	}
}