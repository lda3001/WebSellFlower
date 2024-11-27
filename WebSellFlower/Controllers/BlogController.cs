using Microsoft.AspNetCore.Mvc;
using WebSellFlower.Models;
using Microsoft.EntityFrameworkCore;


namespace WebSellFlower.Controllers
{
	public class BlogController : Controller
	{
		private readonly WebsiteBanHoaContext _context;
		public BlogController(WebsiteBanHoaContext context)
		{
			_context = context;
		}
		[Route("/blog/{alias}-{id}.html")]
		public async Task<IActionResult> Details(int? id)
		{
			if (id == null || _context.TblPosts == null)
			{
				return NotFound();
			}

			var blog = await _context.TblPosts
				.FirstOrDefaultAsync(m => m.PostId == id);

			var previousPost = _context.TblPosts.Where(post => post.PostId < id)
			.OrderByDescending(post => post.PostId)
			.FirstOrDefault();
			var nextPost = _context.TblPosts.Where(post => post.PostId > id)
			.OrderBy(post => post.PostId)
			.FirstOrDefault();
			var currentPost = _context.TblPosts.FirstOrDefault(post => post.PostId == id);
			if (blog == null)
			{
				return NotFound();
			}

			ViewBag.blogcomment = _context.TblBlogComments.
				Where(i => i.PostId == id ).ToList();
			ViewBag.PreviousPost = previousPost;
			ViewBag.NextPost = nextPost;


			return View(blog);
		}

	}
}
