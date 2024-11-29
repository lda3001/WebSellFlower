using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblOrder
{
    public int OrderId { get; set; }

    public int? OrderCustId { get; set; }

    public string? OrderName { get; set; }

    public string? OrderPhone { get; set; }

    public string? OrderEmail { get; set; }

    public string? OrderAddress { get; set; }

    public string? OrderNote { get; set; }

    public DateTime? OrderDate { get; set; }

    public double? OrderTotal { get; set; }

    public virtual TblCustomer? OrderCust { get; set; }

    public virtual ICollection<TblOrderDetail> TblOrderDetails { get; set; } = new List<TblOrderDetail>();
}
