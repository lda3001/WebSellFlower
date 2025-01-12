using Microsoft.CodeAnalysis.Scripting;
using WebSellFlower.Models;

namespace WebSellFlower.Utilities
{
	public class Function
	{
        public static TblCustomer account;
       
        public static string TitleslugGenerationAlias(string title)
		{
			return SlugGenerator.SlugGenerator.GenerateSlug(title);
		}
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
        
    }
    
}
