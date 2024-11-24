using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblPageSlider
{
    public int PageId { get; set; }

    public string? PageName { get; set; }

    public virtual ICollection<TblSlider> TblSliders { get; set; } = new List<TblSlider>();
}
