using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblSlider
{
    public int SliderId { get; set; }

    public byte[]? SliderImg { get; set; }

    public byte[]? SliderOnPage { get; set; }

    public DateTime? SliderDate { get; set; }

    public int? PageId { get; set; }

    public virtual TblPageSlider? Page { get; set; }
}
