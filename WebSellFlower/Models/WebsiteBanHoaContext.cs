using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebSellFlower.Models;

public partial class WebsiteBanHoaContext : DbContext
{
    public WebsiteBanHoaContext()
    {
    }

    public WebsiteBanHoaContext(DbContextOptions<WebsiteBanHoaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblAdmin> TblAdmins { get; set; }

    public virtual DbSet<TblBlogComment> TblBlogComments { get; set; }

    public virtual DbSet<TblCategory> TblCategories { get; set; }

    public virtual DbSet<TblCategoryPost> TblCategoryPosts { get; set; }

    public virtual DbSet<TblCategoryProduct> TblCategoryProducts { get; set; }

    public virtual DbSet<TblCustomer> TblCustomers { get; set; }

    public virtual DbSet<TblOrder> TblOrders { get; set; }

    public virtual DbSet<TblOrderDetail> TblOrderDetails { get; set; }

    public virtual DbSet<TblPageSlider> TblPageSliders { get; set; }

    public virtual DbSet<TblPayment> TblPayments { get; set; }

    public virtual DbSet<TblPost> TblPosts { get; set; }

    public virtual DbSet<TblProduct> TblProducts { get; set; }

    public virtual DbSet<TblProductReview> TblProductReviews { get; set; }

    public virtual DbSet<TblSlider> TblSliders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseSqlServer("Data Source=LAPTOP-SB14QIQ5\\MSSQLSERVER01;Initial Catalog=WebsiteBanHoa;Integrated Security=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblAdmin>(entity =>
        {
            entity.HasKey(e => e.AdId);

            entity.ToTable("tbl_Admin");

            entity.Property(e => e.AdId).HasColumnName("ad_id");
            entity.Property(e => e.AdEmail)
                .HasMaxLength(50)
                .HasColumnName("ad_email");
            entity.Property(e => e.AdPassword)
                .HasMaxLength(50)
                .HasColumnName("ad_password");
            entity.Property(e => e.AdPhone)
                .HasMaxLength(50)
                .HasColumnName("ad_phone");
            entity.Property(e => e.AdRole).HasColumnName("ad_role");
            entity.Property(e => e.AdStatus)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("ad_status");
        });

        modelBuilder.Entity<TblBlogComment>(entity =>
        {
            entity.HasKey(e => e.CommentId);

            entity.ToTable("tbl_BlogComment");

            entity.Property(e => e.ContentComment)
                .HasMaxLength(250)
                .HasColumnName("Content_comment");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(250);
            entity.Property(e => e.ParentId).HasColumnName("ParentID");
            entity.Property(e => e.Phone).HasMaxLength(50);
            entity.Property(e => e.PostId).HasColumnName("post_id");

            entity.HasOne(d => d.Post).WithMany(p => p.TblBlogComments)
                .HasForeignKey(d => d.PostId)
                .HasConstraintName("FK_tbl_BlogComment_tbl_Post");
        });

        modelBuilder.Entity<TblCategory>(entity =>
        {
            entity.HasKey(e => e.Categoryid);

            entity.ToTable("tbl_category");

            entity.Property(e => e.Categoryid).HasColumnName("categoryid");
            entity.Property(e => e.Alias)
                .HasMaxLength(150)
                .IsFixedLength();
            entity.Property(e => e.Title).HasMaxLength(150);
        });

        modelBuilder.Entity<TblCategoryPost>(entity =>
        {
            entity.HasKey(e => e.CategoryPostId);

            entity.ToTable("tbl_category_post");

            entity.Property(e => e.CategoryPostId).HasColumnName("category_post_id");
            entity.Property(e => e.CategoryPostDesc)
                .HasMaxLength(50)
                .HasColumnName("category_post_desc");
            entity.Property(e => e.CategoryPostName)
                .HasMaxLength(50)
                .HasColumnName("category_post_name");
        });

        modelBuilder.Entity<TblCategoryProduct>(entity =>
        {
            entity.HasKey(e => e.CategoryProdId);

            entity.ToTable("tbl_Category_product");

            entity.Property(e => e.CategoryProdId).HasColumnName("category_prod_id");
            entity.Property(e => e.Alias).HasMaxLength(250);
            entity.Property(e => e.CategoryProdDesc)
                .HasMaxLength(50)
                .HasColumnName("category_prod_desc");
            entity.Property(e => e.CategoryProdName)
                .HasMaxLength(50)
                .HasColumnName("category_prod_name");
        });

        modelBuilder.Entity<TblCustomer>(entity =>
        {
            entity.HasKey(e => e.CustId);

            entity.ToTable("tbl_Customer");

            entity.Property(e => e.CustId).HasColumnName("cust_Id");
            entity.Property(e => e.CustAddress)
                .HasMaxLength(50)
                .HasColumnName("cust_address");
            entity.Property(e => e.CustDatetime).HasColumnName("cust_datetime");
            entity.Property(e => e.CustEmail)
                .HasMaxLength(50)
                .HasColumnName("cust_email");
            entity.Property(e => e.CustFullname)
                .HasMaxLength(50)
                .HasColumnName("cust_fullname");
            entity.Property(e => e.CustPassword)
                .HasMaxLength(50)
                .HasColumnName("cust_password");
            entity.Property(e => e.CustPhone)
                .HasMaxLength(50)
                .HasColumnName("cust_phone");
            entity.Property(e => e.CustSex)
                .HasMaxLength(50)
                .HasColumnName("cust_sex");
            entity.Property(e => e.CustStatus)
                .HasMaxLength(50)
                .HasColumnName("cust_status");
        });

        modelBuilder.Entity<TblOrder>(entity =>
        {
            entity.HasKey(e => e.OrderId);

            entity.ToTable("tbl_Order");

            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.OrderAddress)
                .HasMaxLength(50)
                .HasColumnName("order_address");
            entity.Property(e => e.OrderCustId).HasColumnName("order_cust_id");
            entity.Property(e => e.OrderDate)
                .HasColumnType("datetime")
                .HasColumnName("order_date");
            entity.Property(e => e.OrderEmail)
                .HasMaxLength(50)
                .HasColumnName("order_email");
            entity.Property(e => e.OrderName)
                .HasMaxLength(50)
                .HasColumnName("order_name");
            entity.Property(e => e.OrderNote)
                .HasMaxLength(50)
                .HasColumnName("order_note");
            entity.Property(e => e.OrderPhone)
                .HasMaxLength(50)
                .HasColumnName("order_phone");

            entity.HasOne(d => d.OrderCust).WithMany(p => p.TblOrders)
                .HasForeignKey(d => d.OrderCustId)
                .HasConstraintName("FK_tbl_Order_tbl_Customer");
        });

        modelBuilder.Entity<TblOrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId);

            entity.ToTable("tbl_order_detail");

            entity.Property(e => e.OrderDetailId).HasColumnName("order_detail_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.PaymentName)
                .HasMaxLength(50)
                .HasColumnName("payment_name");
            entity.Property(e => e.PaymentStatus)
                .HasMaxLength(50)
                .HasColumnName("payment_status");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.ProdId).HasColumnName("prod_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Order).WithMany(p => p.TblOrderDetails)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK_tbl_order_detail_tbl_Order");

            entity.HasOne(d => d.Prod).WithMany(p => p.TblOrderDetails)
                .HasForeignKey(d => d.ProdId)
                .HasConstraintName("FK_tbl_order_detail_tbl_Product");
        });

        modelBuilder.Entity<TblPageSlider>(entity =>
        {
            entity.HasKey(e => e.PageId);

            entity.ToTable("tbl_Page_slider");

            entity.Property(e => e.PageId).HasColumnName("page_id");
            entity.Property(e => e.PageName)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("page_name");
        });

        modelBuilder.Entity<TblPayment>(entity =>
        {
            entity.HasKey(e => e.PaymentId);

            entity.ToTable("tbl_Payment");

            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.BankDetail)
                .HasMaxLength(50)
                .HasColumnName("bank_detail");
            entity.Property(e => e.BankName)
                .HasMaxLength(50)
                .HasColumnName("bank_name");
            entity.Property(e => e.PaymentDate)
                .HasColumnType("datetime")
                .HasColumnName("payment_date");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .HasColumnName("user_name");
        });

        modelBuilder.Entity<TblPost>(entity =>
        {
            entity.HasKey(e => e.PostId);

            entity.ToTable("tbl_Post");

            entity.Property(e => e.PostId).HasColumnName("post_id");
            entity.Property(e => e.Alias).HasMaxLength(250);
            entity.Property(e => e.CategoryPostId).HasColumnName("category_post_id");
            entity.Property(e => e.PostContenDetail).HasColumnName("post_conten_detail");
            entity.Property(e => e.PostContent).HasColumnName("post_content");
            entity.Property(e => e.PostDate)
                .HasColumnType("datetime")
                .HasColumnName("post_date");
            entity.Property(e => e.PostDetail).HasColumnName("post_detail");
            entity.Property(e => e.PostFeatured).HasColumnName("post_featured");
            entity.Property(e => e.PostThumb).HasColumnName("post_thumb");
            entity.Property(e => e.PostTitle)
                .HasMaxLength(50)
                .HasColumnName("post_title");

            entity.HasOne(d => d.CategoryPost).WithMany(p => p.TblPosts)
                .HasForeignKey(d => d.CategoryPostId)
                .HasConstraintName("FK_tbl_Post_tbl_category_post");
        });

        modelBuilder.Entity<TblProduct>(entity =>
        {
            entity.HasKey(e => e.ProdId);

            entity.ToTable("tbl_Product");

            entity.Property(e => e.ProdId).HasColumnName("prod_id");
            entity.Property(e => e.Alias).HasMaxLength(250);
            entity.Property(e => e.CategoryProdId).HasColumnName("category_prod_id");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.ProdDiscount).HasColumnName("prod_discount");
            entity.Property(e => e.ProdImg)
                .HasMaxLength(250)
                .HasColumnName("prod_img");
            entity.Property(e => e.ProdImg1)
                .HasMaxLength(250)
                .HasColumnName("prod_img1");
            entity.Property(e => e.ProdImg2)
                .HasMaxLength(250)
                .HasColumnName("prod_img2");
            entity.Property(e => e.ProdImg3).HasColumnName("prod_img3");
            entity.Property(e => e.ProdName)
                .HasMaxLength(50)
                .HasColumnName("prod_name");
            entity.Property(e => e.ProdPrice).HasColumnName("prod_price");
            entity.Property(e => e.ProdThumb)
                .HasMaxLength(250)
                .HasColumnName("prod_thumb");

            entity.HasOne(d => d.CategoryProd).WithMany(p => p.TblProducts)
                .HasForeignKey(d => d.CategoryProdId)
                .HasConstraintName("FK_tbl_Product_tbl_Category_product");
        });

        modelBuilder.Entity<TblProductReview>(entity =>
        {
            entity.HasKey(e => e.ProductReviewId);

            entity.ToTable("tbl_ProductReviews");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Detail).HasMaxLength(200);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.Phone).HasMaxLength(50);
            entity.Property(e => e.ProdId).HasColumnName("prod_id");

            entity.HasOne(d => d.Prod).WithMany(p => p.TblProductReviews)
                .HasForeignKey(d => d.ProdId)
                .HasConstraintName("FK_tbl_ProductReviews_tbl_Product");
        });

        modelBuilder.Entity<TblSlider>(entity =>
        {
            entity.HasKey(e => e.SliderId);

            entity.ToTable("tbl_Slider");

            entity.Property(e => e.SliderId).HasColumnName("slider_id");
            entity.Property(e => e.PageId).HasColumnName("page_id");
            entity.Property(e => e.SliderDate)
                .HasColumnType("datetime")
                .HasColumnName("slider_date");
            entity.Property(e => e.SliderImg).HasColumnName("slider_img");
            entity.Property(e => e.SliderOnPage)
                .HasColumnType("image")
                .HasColumnName("slider_on_page");

            entity.HasOne(d => d.Page).WithMany(p => p.TblSliders)
                .HasForeignKey(d => d.PageId)
                .HasConstraintName("FK_tbl_Slider_tbl_Page_slider");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
