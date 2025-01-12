using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebSellFlower.Models;

namespace WebSellFlower.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class TblContactsController : Controller
    {
        private readonly WebsiteBanHoaContext _context;

        public TblContactsController(WebsiteBanHoaContext context)
        {
            _context = context;
        }

        // GET: Admin/TblContacts
        public async Task<IActionResult> Index()
        {
            return View(await _context.TblContacts.ToListAsync());
        }

        // GET: Admin/TblContacts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblContact = await _context.TblContacts
                .FirstOrDefaultAsync(m => m.ContactId == id);
            if (tblContact == null)
            {
                return NotFound();
            }

            return View(tblContact);
        }

        // GET: Admin/TblContacts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Admin/TblContacts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ContactId,Name,Phone,Email,Message,CreatedDate")] TblContact tblContact)
        {
            if (ModelState.IsValid)
            {
                _context.Add(tblContact);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(tblContact);
        }

        // GET: Admin/TblContacts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblContact = await _context.TblContacts.FindAsync(id);
            if (tblContact == null)
            {
                return NotFound();
            }
            return View(tblContact);
        }

        // POST: Admin/TblContacts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ContactId,Name,Phone,Email,Message,CreatedDate")] TblContact tblContact)
        {
            if (id != tblContact.ContactId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tblContact);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TblContactExists(tblContact.ContactId))
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
            return View(tblContact);
        }

        // GET: Admin/TblContacts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblContact = await _context.TblContacts
                .FirstOrDefaultAsync(m => m.ContactId == id);
            if (tblContact == null)
            {
                return NotFound();
            }

            return View(tblContact);
        }

        // POST: Admin/TblContacts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var tblContact = await _context.TblContacts.FindAsync(id);
            if (tblContact != null)
            {
                _context.TblContacts.Remove(tblContact);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TblContactExists(int id)
        {
            return _context.TblContacts.Any(e => e.ContactId == id);
        }
    }
}
