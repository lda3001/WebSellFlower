using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebSellFlower.Models;
using WebSellFlower.Utilities;

namespace WebSellFlower.Areas.Admin.Controllers
{
	[Area("Admin")]
	public class AccountController : Controller
	{
		private readonly WebsiteBanHoaContext _context;

		public AccountController(WebsiteBanHoaContext context)
		{
			_context = context;
		}

		Function function = new Function();

		public IActionResult Index()
		{
			return View();
		}
		[Route("/Auth/Login")]
		public IActionResult Login(string returnUrl = null)
		{
			if (User.Identity.IsAuthenticated)
			{

				var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

				if (userRole == "Admin")
				{
					return RedirectToAction("Index", "Home", new { area = "Admin"});
				}
				return RedirectToAction("Index", "Home", new { area = "" });

			}
			ViewBag.ReturnUrl = returnUrl;
			return View();
		}

		[Route("/Auth/Register")]
		public IActionResult Register()
		{
			return View();
		}
		[HttpPost, ActionName("Login")]
		[Route("/Auth/Login")]

		public async Task<IActionResult> Login(TblCustomer account, string returnUrl = null)
		{
			IActionResult response = Unauthorized();

			if (account == null)
			{
				return BadRequest();
			}

			var user = _context.TblCustomers.Where(u => u.CustEmail == account.CustEmail).FirstOrDefault();


			if (user != null && function.VerifyPassword(account.CustPassword, user.CustPassword))
			{
				Function.account = user;

				var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.CustFullname), new Claim(ClaimTypes.Role, user.Role == 1 ? "Admin" : "User"), new Claim(ClaimTypes.UserData, user.CustId.ToString()) };
				var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
				var authProperties = new AuthenticationProperties { IsPersistent = true, ExpiresUtc = DateTime.UtcNow.AddMinutes(60) };
				await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);


				if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
				{
					return Redirect(returnUrl);
				}
				else
				{
					if (user.Role == 1)
					{
						return RedirectToAction("Index", "Home");
					}
					return RedirectToAction("Index", "Home", new { area = "" });


				}



			}

			TempData["NotifyMessage"] = "Tài khoản hoặc mật khẩu không chính xác.";
			TempData["NotifyType"] = "error";


			return RedirectToAction("Login", "Account"); ;
		}
		[HttpPost]
		[Route("/Auth/Register")]
		public IActionResult Register(TblCustomer account)
		{
			if (account == null)
			{
				return BadRequest();
			}

			var acc = _context.TblCustomers.Where(m => m.CustEmail == account.CustEmail).FirstOrDefault();
			if (acc != null)
			{
				TempData["NotifyMessage"] = "Tài Khoản Đã Tồn Tại";
				TempData["NotifyType"] = "error";
				return RedirectToAction("Index", "Register");
			}
			account.CustDatetime = DateOnly.FromDateTime(DateTime.Now);
			account.Role = 0;
			account.CustPassword = function.HashPassword(account.CustPassword);
			_context.TblCustomers.Add(account);
			_context.SaveChanges();
			return RedirectToAction("Login", "Account");
		}

		[HttpPost]
		[Route("/Auth/Logout")]
		public async Task<IActionResult> Logout()
		{
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
			return RedirectToAction("Login", "Account");
		}
	}
}
