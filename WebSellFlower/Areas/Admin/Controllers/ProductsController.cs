using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebSellFlower.Models;
using WebSellFlower.Utilities;

namespace WebSellFlower.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class ProductsController : Controller
    {
        private readonly WebsiteBanHoaContext _context;

        public ProductsController(WebsiteBanHoaContext context)
        {
            _context = context;
        }

        // GET: Admin/Products
        [Route("admin/product-list.html")]
        public async Task<IActionResult> Index()
        {
            string paramValue = HttpContext.Request.Query["search"];


            var websiteBanHoaContext = _context.TblProducts
                .Include(t => t.CategoryProd)
                .Select(p => new ProductDto
                {
                    ProdId = p.ProdId,
                    ProdName = p.ProdName,
                    ProdThumb = p.ProdThumb,
                    Quantity = p.Quantity,
                    IsActive = p.IsActive,
                    ProdPrice = p.ProdPrice,
                    CategoryName = p.CategoryProd.CategoryProdName
                })
                .AsQueryable(); // Giữ lại IQueryable để có thể áp dụng bộ lọc

            if (!string.IsNullOrEmpty(paramValue))
            {
                websiteBanHoaContext = websiteBanHoaContext.Where(p => EF.Functions.Like(p.ProdName, $"%{paramValue}%"));
            }

            // Chuyển thành List sau khi đã áp dụng bộ lọc
            var result = await websiteBanHoaContext.ToListAsync();
            ViewBag.products = result;
            return View(result);
        }

		// GET: Admin/Products/Details/5
		[Route("admin/product/details/{id}")]
		public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblProduct = await _context.TblProducts
                .Include(t => t.CategoryProd)
                .FirstOrDefaultAsync(m => m.ProdId == id);
            if (tblProduct == null)
            {
                return NotFound();
            }

            return View(tblProduct);
        }

        // GET: Admin/Products/Create
        [Route("admin/add-product.html")]
        public IActionResult Create()
        {
            ViewBag.listCategory = _context.TblCategoryProducts.ToList();
            ViewData["CategoryProdId"] = new SelectList(_context.TblCategoryProducts, "CategoryProdId", "CategoryProdId");
            return View();
        }

        // POST: Admin/Products/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> Create([Bind("CategoryProdId,ProdName,ProdPrice,ProdDiscount,Detail,IsActive,ProdThumb,ProdImg,ProdImg1,ProdImg2,Description,ProdImg3")] TblProduct tblProduct)
        {
            try
            {
                TblProduct product = new TblProduct();
                product.ProdName = tblProduct.ProdName;
                product.ProdPrice = tblProduct.ProdPrice;
                product.CategoryProdId = tblProduct.CategoryProdId;
                product.IsActive = tblProduct.IsActive;
                product.Quantity = tblProduct.Quantity;
                product.Description = tblProduct.Description;
                product.Detail = tblProduct.Detail;
                if (tblProduct.ProdThumb != null)
                {
                    product.ProdThumb = tblProduct.ProdThumb;
                }
                if (tblProduct.ProdImg != null)
                {
                    product.ProdImg = tblProduct.ProdImg;
                }
                if (tblProduct.ProdImg1 != null)
                {
                    product.ProdImg1 = tblProduct.ProdImg1;
                }
                if (tblProduct.ProdImg2 != null)
                {
                    product.ProdImg2 = tblProduct.ProdImg2;
                }
                if (tblProduct.ProdImg3 != null)
                {
                    product.ProdImg3 = tblProduct.ProdImg3;

                }
                product.Alias = Function.TitleslugGenerationAlias(tblProduct.ProdName);
                _context.Add(product);
                await _context.SaveChangesAsync();


                ViewData["CategoryProdId"] = new SelectList(_context.TblCategoryProducts, "CategoryProdId", "CategoryProdId", tblProduct.CategoryProdId);
            }
            catch 
            {
                Console.WriteLine("looi Tạo Sản Phẩm");
                return StatusCode(400, new { msg = "Tạo Sản Phẩm Thất Bại", success = 400 });
            }
            
            return StatusCode(200, new { msg = "Tạo Sản Phẩm Thành Công", success = 200 });
        }

        // GET: Admin/Products/Edit/5
        [Route("admin/product/edit/{id}")]
        public async Task<IActionResult> Edit(int id)
        {
            var product = await _context.TblProducts.Include(i => i.CategoryProd)
                .FirstOrDefaultAsync(m => m.ProdId == id);

            if (product == null)
                return NotFound();

            ViewBag.listCategory = _context.TblCategoryProducts.ToList();
            ViewBag.listComment = _context.TblProductReviews.Where(i => i.ProdId == id).ToList();

            return View(product);
        }

        // POST: Admin/Products/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> Edit(int id, [Bind("CategoryProdId,ProdName,ProdPrice,ProdDiscount,Detail,IsActive,ProdThumb,ProdImg,ProdImg1,ProdImg2,Description,ProdImg3")] TblProduct tblProduct)
        {
            var product = await _context.TblProducts.Include(i => i.CategoryProd)
               .FirstOrDefaultAsync(m => m.ProdId == id);

            if (product == null)
                return NotFound();


            try
            {
                product.ProdName = tblProduct.ProdName;
                product.ProdPrice = tblProduct.ProdPrice;
                product.Detail = tblProduct.Detail;
                product.Description = tblProduct.Description;
                product.CategoryProdId = tblProduct.CategoryProdId;
                product.ProdDiscount = tblProduct.ProdDiscount;
                product.IsActive = tblProduct.IsActive;
                if (tblProduct.ProdThumb != null)
                {
                    product.ProdThumb = tblProduct.ProdThumb;
                }
                if (tblProduct.ProdImg != null)
                {
                    product.ProdImg = tblProduct.ProdImg;
                }
                if (tblProduct.ProdImg1 != null)
                {
                    product.ProdImg1 = tblProduct.ProdImg1;
                }
                if (tblProduct.ProdImg2 != null)
                {
                    product.ProdImg2 = tblProduct.ProdImg2;
                }
                if (tblProduct.ProdImg3 != null)
                {
                    product.ProdImg3 = tblProduct.ProdImg3;
                }
                product.Alias = Function.TitleslugGenerationAlias(tblProduct.ProdName);
                _context.Update(product);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblProductExists(tblProduct.ProdId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


            ViewData["CategoryProdId"] = new SelectList(_context.TblCategoryProducts, "CategoryProdId", "CategoryProdId", tblProduct.CategoryProdId);

            return StatusCode(200, new { msg = "Cập Nhật Sản Phẩm Thành Công", success = 200 });
        }

        // GET: Admin/Products/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblProduct = await _context.TblProducts
                .Include(t => t.CategoryProd)
                .FirstOrDefaultAsync(m => m.ProdId == id);
            if (tblProduct == null)
            {
                return NotFound();
            }

            return View(tblProduct);
        }

        // POST: Admin/Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var tblProduct = await _context.TblProducts.FindAsync(id);
            if (tblProduct != null)
            {
                _context.TblProducts.Remove(tblProduct);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TblProductExists(int id)
        {
            return _context.TblProducts.Any(e => e.ProdId == id);
        }
        //timkiem
        public IActionResult Search(string search)
        {
            var products = _context.TblProducts.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                products = products.Where(p => EF.Functions.Like(p.ProdName, $"%{search}%"));
            }

            ViewBag.SearchTerm = search; // Truyền giá trị tìm kiếm về View
            ViewBag.products = products.ToList();

            return View();
        }

    }
    public class ProductDto : TblProduct
    {
        public string CategoryName { get; set; }
    }
}
