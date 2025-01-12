using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using WebSellFlower.Models;
using WebSellFlower.Utilities;

namespace WebSellFlower.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class TblPostsController : Controller
    {
        private readonly WebsiteBanHoaContext _context;

        public TblPostsController(WebsiteBanHoaContext context)
        {
            _context = context;
        }
        [Route("admin/blog-list.html")]
		

		// GET: Admin/TblPosts
		public async Task<IActionResult> Index()
        {
            string paramValue = HttpContext.Request.Query["search"];

            var websiteBanHoaContext = _context.TblPosts.Include(t => t.CategoryPost).AsQueryable();

            if (!string.IsNullOrEmpty(paramValue))
            {
                websiteBanHoaContext = websiteBanHoaContext.Where(p => EF.Functions.Like(p.PostTitle, $"%{paramValue}%"));
            }
              var result = await websiteBanHoaContext.ToListAsync();
            ViewBag.posts = result;
            return View(result);

            return View(await websiteBanHoaContext.ToListAsync());
        }

        // GET: Admin/TblPosts/Details/5
        [Route("admin/detail-blog.html")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblPost = await _context.TblPosts
                .Include(t => t.CategoryPost)
                .FirstOrDefaultAsync(m => m.PostId == id);
            if (tblPost == null)
            {
                return NotFound();
            }

            return View(tblPost);
        }
        [Route("admin/add-blog.html")]
        // GET: Admin/TblPosts/Create
        public IActionResult Create()
        {
            ViewData["CategoryPostId"] = new SelectList(_context.TblCategoryPosts, "CategoryPostId", "CategoryPostId");
            return View();
        }

        // POST: Admin/TblPosts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
      
        public async Task<IActionResult> Create([Bind("PostId,CategoryPostId,PostTitle,PostContent,PostThumb,PostFeatured,IsActive,Alias,PostDetail,PostContenDetail")] TblPost tblPost)
        {   
            TblPost post = new TblPost();
            post.PostTitle = tblPost.PostTitle;
            post.PostDetail = tblPost.PostDetail;
            post.PostContent = tblPost.PostContent;
            post.PostContenDetail = tblPost.PostContenDetail;
            post.CategoryPostId = tblPost.CategoryPostId;
            post.PostDate = DateTime.Now;
            post.PostFeatured = tblPost.PostFeatured;
            post.IsActive = tblPost.IsActive;
            if (tblPost.PostThumb != null)
            {
                post.PostThumb = tblPost.PostThumb;
            }

            post.Alias = Function.TitleslugGenerationAlias(tblPost.PostTitle);
            _context.Add(post);
            await _context.SaveChangesAsync();
            ViewData["CategoryPostId"] = new SelectList(_context.TblCategoryPosts, "CategoryPostId", "CategoryPostId", tblPost.CategoryPostId);
            return StatusCode(200, new { msg = "Tạo Sản Phẩm Thành Công", success = 200 });
        }

        // GET: Admin/TblPosts/Edit/5
        [Route("admin/blog/edit/{id}")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblPost = await _context.TblPosts.FindAsync(id);
            if (tblPost == null)
            {
                return NotFound();
            }
            ViewData["CategoryPostId"] = new SelectList(_context.TblCategoryPosts, "CategoryPostId", "CategoryPostId", tblPost.CategoryPostId);
            return View(tblPost);
        }

        // POST: Admin/TblPosts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> Edit(int id, [Bind("PostId,CategoryPostId,PostTitle,PostContent,PostThumb,PostFeatured,PostDate,IsActive,Alias,PostDetail,PostContenDetail")] TblPost tblPost)
        {
            var post = await _context.TblPosts.Include(i => i.CategoryPost)
               .FirstOrDefaultAsync(m => m.PostId == id);
            if (post == null)
                return NotFound();
            try
            {
               post.PostTitle = tblPost.PostTitle;
               post.PostDetail = tblPost.PostDetail;
               post.PostContent = tblPost.PostContent;
               post.PostContenDetail = tblPost.PostContenDetail;
               post.CategoryPostId = tblPost.CategoryPostId;
                
                post.IsActive = tblPost.IsActive;
                if (tblPost.PostThumb != null)
                {
                   post.PostThumb = tblPost.PostThumb;
                }
                
               post.Alias = Function.TitleslugGenerationAlias(tblPost.PostTitle);
                _context.Update(post);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblPostExists(tblPost.PostId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            ViewData["CategoryPostId"] = new SelectList(_context.TblCategoryPosts, "CategoryPostId", "CategoryPostId", tblPost.CategoryPostId);
            return StatusCode(200, new { msg = "Cập Nhật Sản Phẩm Thành Công", success = 200 });
        }

        // GET: Admin/TblPosts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblPost = await _context.TblPosts
                .Include(t => t.CategoryPost)
                .FirstOrDefaultAsync(m => m.PostId == id);
            if (tblPost == null)
            {
                return NotFound();
            }

            return View(tblPost);
        }

        // POST: Admin/TblPosts/Delete/5
        [HttpPost, ActionName("Delete")]
        
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var tblPost = await _context.TblPosts.FindAsync(id);
            if (tblPost != null)
            {
                _context.TblPosts.Remove(tblPost);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TblPostExists(int id)
        {
            return _context.TblPosts.Any(e => e.PostId == id);
        }
    }
}
