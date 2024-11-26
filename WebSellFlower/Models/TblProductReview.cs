using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblProductReview
{
    public int ProductReviewId { get; set; }

    public string? Name { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? Detail { get; set; }

    public int? ProdId { get; set; }

    public bool IsActive { get; set; }

    public virtual TblProduct? Prod { get; set; }
}
