using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblCategoryPost
{
    public int CategoryPostId { get; set; }

    public string? CategoryPostName { get; set; }

    public string? CategoryPostDesc { get; set; }

    public virtual ICollection<TblPost> TblPosts { get; set; } = new List<TblPost>();
}
