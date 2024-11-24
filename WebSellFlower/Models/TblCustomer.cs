using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblCustomer
{
    public string? CustFullname { get; set; }

    public string? CustEmail { get; set; }

    public string? CustPhone { get; set; }

    public string? CustSex { get; set; }

    public DateOnly? CustDatetime { get; set; }

    public string? CustAddress { get; set; }

    public string? CustPassword { get; set; }

    public string? CustStatus { get; set; }

    public int CustId { get; set; }

    public virtual ICollection<TblOrder> TblOrders { get; set; } = new List<TblOrder>();
}
