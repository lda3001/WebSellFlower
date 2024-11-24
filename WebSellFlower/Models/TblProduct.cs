using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblProduct
{
    public int ProdId { get; set; }

    public int? CategoryProdId { get; set; }

    public string? ProdName { get; set; }

    public int? ProdPrice { get; set; }

    public int? ProdDiscount { get; set; }

    public string? Detail { get; set; }

    public string? Alias { get; set; }

    public bool? IsBestSeller { get; set; }

    public bool? IsActive { get; set; }

    public string? ProdThumb { get; set; }

    public string? ProdImg { get; set; }

    public string? ProdImg1 { get; set; }

    public string? ProdImg2 { get; set; }

    public bool? IsNew { get; set; }

    public virtual TblCategoryProduct? CategoryProd { get; set; }

    public virtual ICollection<TblOrderDetail> TblOrderDetails { get; set; } = new List<TblOrderDetail>();
}
