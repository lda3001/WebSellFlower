using Microsoft.AspNetCore.Mvc;
using WebSellFlower.Models;

namespace WebSellFlower.Controllers
{
    public class ContactController : Controller
    {
        private readonly WebsiteBanHoaContext _context;

        public ContactController(WebsiteBanHoaContext context)
        {
            _context = context;
        }
		[Route("/Contacts/")]
		public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("Contacts/Create")]
        public async Task<IActionResult> Create(string name, string phone, string email, string message)
        {
            try
            {
               TblContact contact = new TblContact();
                contact.Name = name;
                contact.Phone = phone;
                contact.Email = email;
                contact.Message = message;
                contact.CreatedDate = DateTime.Now;
                _context.Add(contact);
                await _context.SaveChangesAsync();
                return Json(new { status = true });
            }
            catch (Exception ex)
            {
                // Log lỗi ra console hoặc lưu log
                Console.WriteLine($"Error: {ex.Message}");
                return Json(new { status = false, message = ex.Message });
            }

        }

    }
}
