namespace WebSellFlower.Requests
{
    public class ProductCategoryRequest
    {
        public string Action { get; set; }
        public string LayoutClasses { get; set; }
        public string ClassName { get; set; }
        public string ButtonSkin { get; set; }
        public string DisplayButton { get; set; }
        public string DisplayPrice { get; set; }
        public string DisplayRating { get; set; }
        public string DisplayCategory { get; set; }
        public string TitleTag { get; set; }
        public string DisplayTitle { get; set; }
        public string TaxonomyToDisplay { get; set; }
        public string ShowAllItemInFilter { get; set; }
        public string ShowCategoryFilter { get; set; }
        public string Order { get; set; }
        public string Orderby { get; set; }
        public string ShowOrderingFilter { get; set; }
        public string SpaceBetweenItems { get; set; }
        public int? NumberOfColumns { get; set; }
        public int? NumberOfPosts { get; set; }
        public string InfoPosition { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public string MetaKey { get; set; }
        public string MinPrice { get; set; }
        public string MaxPrice { get; set; }
    }
}
