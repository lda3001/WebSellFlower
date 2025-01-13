using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebSellFlower.Models;
using WebSellFlower.Utilities;

namespace WebSellFlower.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class TblCategoryProductsController : Controller
    {
        private readonly WebsiteBanHoaContext _context;

        public TblCategoryProductsController(WebsiteBanHoaContext context)
        {
            _context = context;
        }

        [Route("admin/cateproduct-list.html")]
        // GET: Admin/TblCategoryProducts
        public async Task<IActionResult> Index()
        {
            return View(await _context.TblCategoryProducts.ToListAsync());
        }

        // GET: Admin/TblCategoryProducts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblCategoryProduct = await _context.TblCategoryProducts
                .FirstOrDefaultAsync(m => m.CategoryProdId == id);
            if (tblCategoryProduct == null)
            {
                return NotFound();
            }

            return View(tblCategoryProduct);
        }

        // GET: Admin/TblCategoryProducts/Create
        [Route("/admin/add-cateproduct.html")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Admin/TblCategoryProducts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("/admin/add-cateproduct")]
        [HttpPost]
       
        public async Task<IActionResult> Create([Bind("CategoryProdId,CategoryProdName,CategoryProdDesc,IsActive,Alias")] TblCategoryProduct tblCategoryProduct)
        {
           TblCategoryProduct categoryProduct =new TblCategoryProduct();
           
            categoryProduct.CategoryProdName = tblCategoryProduct.CategoryProdName;
            categoryProduct.IsActive = tblCategoryProduct.IsActive;
           categoryProduct.Alias = Function.TitleslugGenerationAlias(tblCategoryProduct.CategoryProdName);


           

           
            _context.Add(categoryProduct);
            await _context.SaveChangesAsync();
            
            return StatusCode(200, new { msg = "Tạo Menu Thành Công", success = 200 });

        }

        // GET: Admin/TblCategoryProducts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblCategoryProduct = await _context.TblCategoryProducts.FindAsync(id);
            if (tblCategoryProduct == null)
            {
                return NotFound();
            }
            return View(tblCategoryProduct);
        }

        // POST: Admin/TblCategoryProducts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("CategoryProdId,CategoryProdName,CategoryProdDesc,IsActive,Alias")] TblCategoryProduct tblCategoryProduct)
        {
            if (id != tblCategoryProduct.CategoryProdId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tblCategoryProduct);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TblCategoryProductExists(tblCategoryProduct.CategoryProdId))
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
            return View(tblCategoryProduct);
        }

        // GET: Admin/TblCategoryProducts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblCategoryProduct = await _context.TblCategoryProducts
                .FirstOrDefaultAsync(m => m.CategoryProdId == id);
            if (tblCategoryProduct == null)
            {
                return NotFound();
            }

            return View(tblCategoryProduct);
        }

        // POST: Admin/TblCategoryProducts/Delete/5
        [HttpPost, ActionName("Delete")]
        
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var tblCategoryProduct = await _context.TblCategoryProducts.FindAsync(id);
            if (tblCategoryProduct != null)
            {
                _context.TblCategoryProducts.Remove(tblCategoryProduct);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TblCategoryProductExists(int id)
        {
            return _context.TblCategoryProducts.Any(e => e.CategoryProdId == id);
        }
    }
}
