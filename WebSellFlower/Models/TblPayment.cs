using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblPayment
{
    public int PaymentId { get; set; }

    public string? BankName { get; set; }

    public string? BankDetail { get; set; }

    public string? UserName { get; set; }

    public DateTime? PaymentDate { get; set; }
}
