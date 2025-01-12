using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using WebSellFlower.Models;

var builder = WebApplication.CreateBuilder(args);
var sessionConfig = builder.Configuration.GetSection("SessionConfig");


builder.Services.AddDistributedMemoryCache(); 

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(sessionConfig.GetValue<int>("IdleTimeoutMinutes"));
    options.Cookie.HttpOnly = sessionConfig.GetValue<bool>("CookieHttpOnly");
    options.Cookie.IsEssential = sessionConfig.GetValue<bool>("CookieIsEssential");
});


// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
builder.Services.AddDbContext<WebsiteBanHoaContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options => { options.LoginPath = "/Auth/Login"; options.LogoutPath = "/Auth/Logout"; options.AccessDeniedPath = "/Auth/AccessDenied"; options.ExpireTimeSpan = TimeSpan.FromMinutes(60); }); builder.Services.AddAuthorization();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSession();
app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
	name: "areas",
	pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
