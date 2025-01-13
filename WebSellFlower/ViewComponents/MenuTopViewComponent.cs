/*namespace WebSellFlower.ViewComponents
{
    public class MenuTopViewComponent
    {
    }
}
*/

using WebSellFlower.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebSellFlower.ViewComponents
{
    public class MenuTopViewComponent : ViewComponent
    {
        private readonly WebsiteBanHoaContext _context;


        public MenuTopViewComponent(WebsiteBanHoaContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var items = _context.TblCategories.Where(m => (bool)m.IsActive).
            OrderBy(m => m.Position).ToList();
            ViewBag.cateproduct = _context.TblCategoryProducts.ToList();
            return await Task.FromResult<IViewComponentResult>(View(items));
        }
    }
}