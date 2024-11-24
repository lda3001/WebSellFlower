using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblCategoryProduct
{
    public int CategoryProdId { get; set; }

    public string? CategoryProdName { get; set; }

    public string? CategoryProdDesc { get; set; }

    public virtual ICollection<TblProduct> TblProducts { get; set; } = new List<TblProduct>();
}
