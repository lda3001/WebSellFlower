using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebSellFlower.Models;

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

        // GET: Admin/TblPosts
        public async Task<IActionResult> Index()
        {
            var websiteBanHoaContext = _context.TblPosts.Include(t => t.CategoryPost);
            return View(await websiteBanHoaContext.ToListAsync());
        }

        // GET: Admin/TblPosts/Details/5
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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("PostId,CategoryPostId,PostTitle,PostContent,PostThumb,PostFeatured,PostDate,IsActive,Alias,PostDetail,PostContenDetail")] TblPost tblPost)
        {
            if (ModelState.IsValid)
            {   
                _context.Add(tblPost);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CategoryPostId"] = new SelectList(_context.TblCategoryPosts, "CategoryPostId", "CategoryPostId", tblPost.CategoryPostId);
            return View(tblPost);
        }

        // GET: Admin/TblPosts/Edit/5
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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("PostId,CategoryPostId,PostTitle,PostContent,PostThumb,PostFeatured,PostDate,IsActive,Alias,PostDetail,PostContenDetail")] TblPost tblPost)
        {
            if (id != tblPost.PostId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tblPost);
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
                return RedirectToAction(nameof(Index));
            }
            ViewData["CategoryPostId"] = new SelectList(_context.TblCategoryPosts, "CategoryPostId", "CategoryPostId", tblPost.CategoryPostId);
            return View(tblPost);
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
        [ValidateAntiForgeryToken]
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
