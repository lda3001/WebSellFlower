using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Plugins;
using WebSellFlower.Models;
using WebSellFlower.Utilities;

namespace WebSellFlower.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class TblCategoriesController : Controller
    {
        private readonly WebsiteBanHoaContext _context;

        public TblCategoriesController(WebsiteBanHoaContext context)
        {
            _context = context;

        }
        [Route("admin/Menu-list.html")]
        // GET: Admin/TblCategories
        public async Task<IActionResult> Index()

        {
            ViewBag.listparentmenu = _context.TblCategories.Where(i => i.Levels == 1).ToList();
            return View(await _context.TblCategories.ToListAsync());
        }

        // GET: Admin/TblCategories/Details/5
        [Route("admin/add-menu.html")]
        // GET: Admin/TblCategories/Create

        public IActionResult Create()
        {   
           
            return View();
        }
		[Route("admin/add-menu")]
		// POST: Admin/TblCategories/Create
		// To protect from overposting attacks, enable the specific properties you want to bind to.
		// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
		[HttpPost]
        
        public async Task<IActionResult> Create([Bind("Categoryid,Title,Alias,Levels,Position,IsActive,ParentId")] TblCategory tblCategory)
        {       
                TblCategory menu = new TblCategory();
                 menu.Levels = tblCategory.Levels;
                 menu.Title= tblCategory.Title;
                 menu.IsActive= tblCategory.IsActive;
                 menu.Position=tblCategory.Position;
                 menu.ParentId=tblCategory.ParentId;
               
           
                _context.Add(menu);
                await _context.SaveChangesAsync();


            return StatusCode(200, new { msg = "Tạo Menu Thành Công", success = 200 });
        }
        [Route("admin/exit-menu.html")]
        // GET: Admin/TblCategories/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblCategory = await _context.TblCategories.FindAsync(id);
            if (tblCategory == null)
            {
                return NotFound();
            }
            return View(tblCategory);
        }

        // POST: Admin/TblCategories/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Categoryid,Title,Alias,Levels,Position,IsActive,ParentId")] TblCategory tblCategory)
        {
            if (id != tblCategory.Categoryid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tblCategory);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TblCategoryExists(tblCategory.Categoryid))
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
            return View(tblCategory);
        }

        // GET: Admin/TblCategories/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblCategory = await _context.TblCategories
                .FirstOrDefaultAsync(m => m.Categoryid == id);
            if (tblCategory == null)
            {
                return NotFound();
            }

            return View(tblCategory);
        }

        // POST: Admin/TblCategories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var tblCategory = await _context.TblCategories.FindAsync(id);
            if (tblCategory != null)
            {
                _context.TblCategories.Remove(tblCategory);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TblCategoryExists(int id)
        {
            return _context.TblCategories.Any(e => e.Categoryid == id);
        }
    }
}
