using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebSellFlower.Models;
using WebSellFlower.Requests;


namespace WebSellFlower.Controllers
{
    public class ProductCategoryController : Controller
    {
        private readonly WebsiteBanHoaContext _context;
        public ProductCategoryController(WebsiteBanHoaContext context)
        {
            _context = context;
        }
        [Route("/product-category/{alias}")]
        public async Task<IActionResult> Details(string? alias)
        {
            if (alias == null || _context.TblCategoryProducts == null)
            {
                return NotFound();
            }

            var productcategory = await _context.TblCategoryProducts
                .FirstOrDefaultAsync(m => m.Alias == alias);

            if (productcategory == null)
            {
                return NotFound();
            }

            ViewBag.productcate = _context.TblProducts.
                Where(i => i.CategoryProdId == productcategory.CategoryProdId && (bool)i.IsActive).ToList();
            ViewBag.productcategory = _context.TblCategoryProducts.ToList();

            /*ViewBag.productRelated = _context.TblProducts.
				Where(i => i.ProdId != id && i.CategoryProdId == product.CategoryProdId).Take(4)
				.OrderByDescending(i => i.ProdId).ToList();*/

            return View(productcategory);
        }

        [HttpPost]
        [Route("admin/admin-ajax.php")]
        public async Task<IActionResult> AdminAjax(ProductCategoryRequest request)
        {
            IActionResult result = BadRequest("Invalid action");

            switch (request.Action)
            {
                case "fiorello_mikado_product_ajax_load_category":
                    if (!request.Category.IsNullOrEmpty())
                    {
                        double minPrice = string.IsNullOrEmpty(request.MinPrice) ? 0 : double.Parse(request.MinPrice);
                        double maxPrice = string.IsNullOrEmpty(request.MaxPrice) ? 999 : double.Parse(request.MaxPrice);
                     var items = await _context.TblProducts
                        .Where(m => m.IsActive == true
                                    && m.CategoryProd.Alias == request.Category
                                    && m.ProdPrice >= minPrice
                                    && m.ProdPrice <= maxPrice)
                        .OrderBy(m => request.Order == "asc" ? m.ProdPrice : 0)
                        .OrderByDescending(m => request.Order == "desc" ? m.ProdPrice : 0) 
                        .ThenBy(m => m.ProdName) 
                        .ToListAsync();
                        return result = ViewComponent("Product", new { products = items });
                    }
                    return result = ViewComponent("Product");




                default:

                    break;
            }

            return result;
        }



    }
}
