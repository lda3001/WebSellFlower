using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblOrderDetail
{
    public int OrderDetailId { get; set; }

    public int? OrderId { get; set; }

    public int? ProdId { get; set; }

    public int? Quantity { get; set; }

    public double? Price { get; set; }

    public string? PaymentName { get; set; }

    public string? PaymentStatus { get; set; }

    public virtual TblOrder? Order { get; set; }

    public virtual TblProduct? Prod { get; set; }
}
