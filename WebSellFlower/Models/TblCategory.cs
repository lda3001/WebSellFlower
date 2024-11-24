using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblCategory
{
    public int Categoryid { get; set; }

    public string? Title { get; set; }

    public string? Alias { get; set; }

    public int? Levels { get; set; }

    public int? Position { get; set; }

    public bool? IsActive { get; set; }

    public int? ParentId { get; set; }
}
