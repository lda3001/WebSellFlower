using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblAdmin
{
    public int AdId { get; set; }

    public string? AdEmail { get; set; }

    public string? AdPhone { get; set; }

    public string? AdPassword { get; set; }

    public int? AdRole { get; set; }

    public string? AdStatus { get; set; }
}
