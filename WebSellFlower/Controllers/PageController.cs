using Microsoft.AspNetCore.Mvc;
using WebSellFlower.Models;
using Microsoft.EntityFrameworkCore;


namespace WebSellFlower.Controllers
{
	public class PageController : Controller
	{
		private readonly WebsiteBanHoaContext _context;
		public PageController(WebsiteBanHoaContext context)
		{
			_context = context;
		}
		[Route("/fag-page/")]
		public async Task<IActionResult> PageDetails()
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

			ViewBag.blogcomment = _context.TblBlogComments.
				ToList();
			


			return View(blog);
		}

	}
}

