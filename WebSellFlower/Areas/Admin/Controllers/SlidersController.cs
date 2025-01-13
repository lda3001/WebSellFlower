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
    public class SlidersController : Controller
    {
        

        private readonly WebsiteBanHoaContext _context;

        public SlidersController(WebsiteBanHoaContext context)
        {
            _context = context;
        }
        [Route("admin/slide.html")]
        // GET: Admin/Sliders
        public async Task<IActionResult> Index()
        {
            var websiteBanHoaContext = _context.TblSliders.Include(t => t.Page);
            return View(await websiteBanHoaContext.ToListAsync());
        }

        // GET: Admin/Sliders/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblSlider = await _context.TblSliders
                .Include(t => t.Page)
                .FirstOrDefaultAsync(m => m.SliderId == id);
            if (tblSlider == null)
            {
                return NotFound();
            }

            return View(tblSlider);
        }
        [Route("admin/add-slide.html")]
        // GET: Admin/Sliders/Create
        public IActionResult Create()
        {
            ViewBag.listSlider = _context.TblSliders.ToList();
            ViewData["PageId"] = new SelectList(_context.TblPageSliders, "PageId", "PageId");
            return View();
        }

        // POST: Admin/Sliders/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("SliderId,SliderImg,SliderOnPage,SliderDate,PageId")] TblSlider tblSlider)
        {
            TblSlider slider  = new TblSlider();
            slider.SliderId = tblSlider.SliderId; 
            slider.SliderOnPage = tblSlider.SliderOnPage;
            slider.SliderDate = tblSlider.SliderDate;
            slider.PageId = tblSlider.PageId;
            if (tblSlider.SliderImg != null)
            {
                slider.SliderImg = tblSlider.SliderImg; 
            }
            ViewData["PageId"] = new SelectList(_context.TblPageSliders, "PageId", "PageId", tblSlider.PageId);
            return StatusCode(200, new { msg = "Tạo Sản Phẩm Thành Công", success = 200 });
        }

        // GET: Admin/Sliders/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblSlider = await _context.TblSliders.FindAsync(id);
            if (tblSlider == null)
            {
                return NotFound();
            }
            ViewData["PageId"] = new SelectList(_context.TblPageSliders, "PageId", "PageId", tblSlider.PageId);
            return View(tblSlider);
        }

        // POST: Admin/Sliders/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("SliderId,SliderImg,SliderOnPage,SliderDate,PageId")] TblSlider tblSlider)
        {
            if (id != tblSlider.SliderId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tblSlider);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TblSliderExists(tblSlider.SliderId))
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
            ViewData["PageId"] = new SelectList(_context.TblPageSliders, "PageId", "PageId", tblSlider.PageId);
            return View(tblSlider);
        }

        // GET: Admin/Sliders/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblSlider = await _context.TblSliders
                .Include(t => t.Page)
                .FirstOrDefaultAsync(m => m.SliderId == id);
            if (tblSlider == null)
            {
                return NotFound();
            }

            return View(tblSlider);
        }

        // POST: Admin/Sliders/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var tblSlider = await _context.TblSliders.FindAsync(id);
            if (tblSlider != null)
            {
                _context.TblSliders.Remove(tblSlider);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TblSliderExists(int id)
        {
            return _context.TblSliders.Any(e => e.SliderId == id);
        }
    }
}
