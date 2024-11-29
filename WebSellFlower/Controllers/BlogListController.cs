using Microsoft.AspNetCore.Mvc;
using WebSellFlower.Models;
using Microsoft.EntityFrameworkCore;


namespace WebSellFlower.Controllers
{
	public class BlogListController : Controller
	{
		private readonly WebsiteBanHoaContext _context;
		public BlogListController(WebsiteBanHoaContext context)
		{
			_context = context;
		}
		[Route("/blog-list/")]
		public async Task<IActionResult>Listblog()
		{
			if ( _context.TblPosts == null)
			{
				return NotFound();
			}

			var blog = await _context.TblPosts
				.FirstOrDefaultAsync();

			
			
			if (blog == null)
			{
				return NotFound();
			}

			ViewBag.bloglist = _context.TblPosts.
				Where(i => i.IsActive ).OrderBy(i=>i.PostDate).ToList();
			

			return View(blog);
		}

	}
}
