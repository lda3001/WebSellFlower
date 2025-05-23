﻿using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblPost
{
    public int PostId { get; set; }

    public int? CategoryPostId { get; set; }

    public string? PostTitle { get; set; }

    public string? PostContent { get; set; }

    public string? PostThumb { get; set; }

    public int? PostFeatured { get; set; }

    public DateTime? PostDate { get; set; }

    public bool IsActive { get; set; }

    public string? Alias { get; set; }

    public string? PostDetail { get; set; }

    public string? PostContenDetail { get; set; }

    public virtual TblCategoryPost? CategoryPost { get; set; }

    public virtual ICollection<TblBlogComment> TblBlogComments { get; set; } = new List<TblBlogComment>();
}
