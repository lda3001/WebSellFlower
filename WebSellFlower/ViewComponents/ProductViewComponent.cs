using WebSellFlower.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebSellFlower.ViewComponents
{
	public class ProductViewComponent : ViewComponent
	{
		private readonly WebsiteBanHoaContext _context;

		public ProductViewComponent(WebsiteBanHoaContext context)
		{
			_context = context;
		}

       /* public IViewComponentResult Invoke(IEnumerable<TblProduct> products)
        {
            return View(products); 
        }*/
        public async Task<IViewComponentResult> InvokeAsync(IEnumerable<TblProduct> products)
		{
			if(products == null)
			{
                 products = _context.TblProducts.Include(m => m.CategoryProd)
                .Where(m => (bool)m.IsActive).Where(m => (bool)m.IsNew).OrderBy(m => m.ProdName).ToList();
            }
			

			return await Task.FromResult<IViewComponentResult>(
				View(products));
		}
	}
}