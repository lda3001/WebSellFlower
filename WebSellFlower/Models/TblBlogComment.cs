using System;
using System.Collections.Generic;

namespace WebSellFlower.Models;

public partial class TblBlogComment
{
    public int CommentId { get; set; }

    public string? Name { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? ContentComment { get; set; }

    public int? PostId { get; set; }

    public bool? IsActive { get; set; }

    public int? ParentId { get; set; }

    public string? Description { get; set; }

    public virtual TblPost? Post { get; set; }
}
