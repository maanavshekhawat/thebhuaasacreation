package com.clothing.ecommerce.config;

import com.clothing.ecommerce.model.Product;
import com.clothing.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Clear existing products and initialize with 150 products
        long existingCount = productRepository.count();
        System.out.println("Current product count in database: " + existingCount);
        
        if (existingCount < 150) {
            System.out.println("Deleting existing products and initializing 150 new products...");
            // Delete all existing products
            productRepository.deleteAll();
            
            List<Product> products = new ArrayList<>();
            
            // 50 Men's Products
            products.addAll(createMensProducts());
            System.out.println("Created " + products.size() + " Men's products");
            
            // 50 Women's Products
            products.addAll(createWomensProducts());
            System.out.println("Created " + (products.size() - 50) + " Women's products");
            
            // 50 Kids' Products
            products.addAll(createKidsProducts());
            System.out.println("Created " + (products.size() - 100) + " Kids' products");
            
            // Save all products
            productRepository.saveAll(products);
            System.out.println("✓ Successfully initialized " + products.size() + " products (replaced " + existingCount + " existing products)");
        } else {
            System.out.println("Database already has " + existingCount + " products. Skipping initialization.");
        }
    }
    
    private List<Product> createMensProducts() {
        List<Product> products = new ArrayList<>();
        
        String[] mensNames = {
            "Classic White T-Shirt", "Blue Denim Jeans", "Black Leather Jacket", "Navy Blue Blazer",
            "Grey Cotton Hoodie", "Khaki Chinos", "White Dress Shirt", "Black Formal Trousers",
            "Brown Leather Belt", "Red Polo Shirt", "Black Sneakers", "Grey Wool Sweater",
            "Navy Blue Shorts", "White Casual Shirt", "Black Bomber Jacket", "Beige Cargo Pants",
            "Green Hooded Sweatshirt", "Blue Striped Shirt", "Black Leather Boots", "Grey Track Pants",
            "White V-Neck T-Shirt", "Navy Blue Jeans", "Brown Suede Jacket", "Black Turtleneck",
            "Grey Blazer", "White Chinos", "Blue Denim Jacket", "Black Hoodie",
            "Navy Blue Polo", "Brown Leather Shoes", "Grey Cardigan", "White Linen Shirt",
            "Black Jeans", "Navy Blue Sweater", "Beige Trousers", "Green Flannel Shirt",
            "Black Dress Shoes", "Grey Shorts", "White Tank Top", "Navy Blue Blazer",
            "Brown Leather Jacket", "Black T-Shirt", "Grey Jeans", "White Sneakers",
            "Navy Blue Hoodie", "Black Cargo Shorts", "Grey Polo Shirt", "White Dress Pants",
            "Brown Chinos", "Black Leather Gloves"
        };
        
        String[] mensDescriptions = {
            "Comfortable cotton t-shirt perfect for everyday wear",
            "Classic fit denim jeans with a modern look",
            "Stylish leather jacket for a bold look",
            "Elegant blazer perfect for formal occasions",
            "Warm and cozy hoodie for casual wear",
            "Versatile chinos suitable for any occasion",
            "Crisp white shirt for professional settings",
            "Sleek formal trousers for business attire",
            "Genuine leather belt with classic buckle",
            "Classic polo shirt in vibrant red",
            "Comfortable sneakers for daily activities",
            "Soft wool sweater for winter months",
            "Casual shorts perfect for summer",
            "Relaxed fit casual shirt",
            "Modern bomber jacket with zip closure",
            "Functional cargo pants with multiple pockets",
            "Comfortable hooded sweatshirt",
            "Professional striped shirt",
            "Durable leather boots for all seasons",
            "Comfortable track pants for active wear",
            "Simple and elegant V-neck t-shirt",
            "Classic denim jeans in navy blue",
            "Stylish suede jacket for autumn",
            "Warm turtleneck for cold weather",
            "Professional blazer in grey",
            "Crisp white chinos for summer",
            "Classic denim jacket",
            "Comfortable black hoodie",
            "Sporty polo shirt in navy",
            "Classic leather dress shoes",
            "Cozy cardigan for layering",
            "Breathable linen shirt",
            "Slim fit black jeans",
            "Warm wool sweater",
            "Comfortable beige trousers",
            "Casual flannel shirt",
            "Elegant black dress shoes",
            "Summer shorts in grey",
            "Comfortable tank top",
            "Professional navy blazer",
            "Classic brown leather jacket",
            "Essential black t-shirt",
            "Versatile grey jeans",
            "Clean white sneakers",
            "Warm navy hoodie",
            "Functional cargo shorts",
            "Classic grey polo",
            "Elegant white dress pants",
            "Comfortable brown chinos",
            "Warm leather gloves"
        };
        
        String[] mensImages = {
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594938291221-94f18cbbd9a8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1624378515195-6bbdb73f2194?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1624378515195-6bbdb73f2194?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594938291221-94f18cbbd9a8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594938291221-94f18cbbd9a8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1624378515195-6bbdb73f2194?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop"
        };
        
        double[] mensPrices = {19.99, 49.99, 129.99, 89.99, 39.99, 59.99, 34.99, 69.99, 29.99, 24.99, 79.99, 54.99, 29.99, 32.99, 119.99, 49.99, 44.99, 37.99, 99.99, 39.99, 18.99, 52.99, 109.99, 49.99, 94.99, 42.99, 64.99, 41.99, 26.99, 89.99, 59.99, 35.99, 55.99, 62.99, 47.99, 33.99, 104.99, 27.99, 16.99, 97.99, 114.99, 21.99, 58.99, 84.99, 46.99, 31.99, 36.99, 67.99, 51.99, 34.99};
        
        for (int i = 0; i < 50; i++) {
            products.add(new Product(
                null,
                mensNames[i],
                mensDescriptions[i],
                new BigDecimal(mensPrices[i]),
                "Men",
                mensImages[i],
                30 + (i % 20) // Stock between 30-49
            ));
        }
        
        return products;
    }
    
    private List<Product> createWomensProducts() {
        List<Product> products = new ArrayList<>();
        
        String[] womensNames = {
            "Floral Summer Dress", "Elegant Blouse", "Black Midi Skirt", "White Linen Pants",
            "Red Wrap Dress", "Navy Blue Blazer", "Pink Casual Top", "Denim Jacket",
            "Black Leather Jacket", "Floral Maxi Dress", "White Button Shirt", "Grey Sweater",
            "Blue Jeans", "Black Pencil Skirt", "Green Midi Dress", "Beige Trench Coat",
            "White Summer Dress", "Navy Blue Cardigan", "Black Trousers", "Red Blouse",
            "Floral Blouse", "Black Maxi Dress", "Grey Blazer", "White Skirt",
            "Pink Sweater", "Blue Denim Shorts", "Black Leather Boots", "White Sneakers",
            "Navy Blue Dress", "Brown Leather Bag", "Green Blouse", "Black Turtleneck",
            "White Linen Dress", "Grey Pants", "Red Cardigan", "Blue Striped Shirt",
            "Black Heels", "White Sandals", "Navy Blue Skirt", "Pink Midi Dress",
            "Black Blazer", "Grey Dress", "White Top", "Blue Jeans Jacket",
            "Black Leather Handbag", "Brown Ankle Boots", "White Floral Dress", "Navy Blue Trousers",
            "Green Cardigan", "Black Midi Skirt", "Red Summer Dress", "White Blouse"
        };
        
        String[] womensDescriptions = {
            "Beautiful floral print dress perfect for summer",
            "Professional blouse suitable for office wear",
            "Classic midi skirt for elegant occasions",
            "Comfortable linen pants for warm weather",
            "Stylish wrap dress in vibrant red",
            "Professional blazer for business attire",
            "Casual top in soft pink",
            "Classic denim jacket for casual wear",
            "Stylish leather jacket for a bold look",
            "Elegant maxi dress with floral pattern",
            "Crisp white button-down shirt",
            "Cozy grey sweater for winter",
            "Classic blue denim jeans",
            "Professional pencil skirt",
            "Chic midi dress in green",
            "Classic trench coat in beige",
            "Fresh white summer dress",
            "Warm navy cardigan",
            "Sleek black trousers",
            "Elegant red blouse",
            "Beautiful floral blouse",
            "Elegant black maxi dress",
            "Professional grey blazer",
            "Crisp white skirt",
            "Soft pink sweater",
            "Casual denim shorts",
            "Stylish leather boots",
            "Comfortable white sneakers",
            "Elegant navy blue dress",
            "Classic brown leather bag",
            "Fresh green blouse",
            "Warm black turtleneck",
            "Breathable white linen dress",
            "Comfortable grey pants",
            "Cozy red cardigan",
            "Professional blue striped shirt",
            "Elegant black heels",
            "Comfortable white sandals",
            "Classic navy blue skirt",
            "Chic pink midi dress",
            "Professional black blazer",
            "Elegant grey dress",
            "Simple white top",
            "Classic blue denim jacket",
            "Stylish black leather handbag",
            "Comfortable brown ankle boots",
            "Beautiful white floral dress",
            "Professional navy blue trousers",
            "Cozy green cardigan",
            "Classic black midi skirt",
            "Vibrant red summer dress"
        };
        
        String[] womensImages = {
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594938291221-94f18cbbd9a8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1624378515195-6bbdb73f2194?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594938291221-94f18cbbd9a8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1624378515195-6bbdb73f2194?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594938291221-94f18cbbd9a8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1624378515195-6bbdb73f2194?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop"
        };
        
        double[] womensPrices = {39.99, 34.99, 44.99, 49.99, 54.99, 79.99, 24.99, 59.99, 119.99, 64.99, 32.99, 54.99, 52.99, 42.99, 49.99, 89.99, 44.99, 59.99, 47.99, 36.99, 38.99, 69.99, 74.99, 34.99, 49.99, 29.99, 89.99, 64.99, 59.99, 79.99, 33.99, 52.99, 47.99, 44.99, 57.99, 35.99, 94.99, 54.99, 41.99, 62.99, 84.99, 67.99, 27.99, 64.99, 89.99, 99.99, 56.99, 48.99, 55.99, 43.99};
        
        for (int i = 0; i < 50; i++) {
            products.add(new Product(
                null,
                womensNames[i],
                womensDescriptions[i],
                new BigDecimal(womensPrices[i]),
                "Women",
                womensImages[i],
                25 + (i % 25) // Stock between 25-49
            ));
        }
        
        return products;
    }
    
    private List<Product> createKidsProducts() {
        List<Product> products = new ArrayList<>();
        
        String[] kidsNames = {
            "Kids' Superhero T-Shirt", "Children's Denim Shorts", "Colorful Summer Dress", "Blue Jeans",
            "Pink Tutu Skirt", "Superhero Costume", "White School Shirt", "Red Hoodie",
            "Blue Denim Jacket", "Floral Summer Dress", "Cartoon T-Shirt", "Black School Pants",
            "Rainbow Sweater", "White Sneakers", "Blue Jeans Shorts", "Princess Dress",
            "Sports T-Shirt", "Grey Track Pants", "Colorful Leggings", "Yellow Raincoat",
            "Pink Ballet Shoes", "Blue Backpack", "Striped T-Shirt", "Denim Overalls",
            "Animal Print Dress", "Red Winter Jacket", "White Socks", "Blue Cap",
            "Pink Hair Bow", "Green T-Shirt", "Blue Jeans", "White School Dress",
            "Cartoon Pajamas", "Red Sneakers", "Blue School Bag", "Pink Tutu",
            "Superhero Mask", "Yellow T-Shirt", "Blue Shorts", "White Polo Shirt",
            "Pink Dress", "Black School Shoes", "Colorful Scarf", "Blue Jeans",
            "Animal Hoodie", "White Socks Set", "Red T-Shirt", "Blue School Uniform",
            "Pink Backpack", "Green Shorts", "White Dress", "Blue Cap"
        };
        
        String[] kidsDescriptions = {
            "Fun superhero themed t-shirt for kids",
            "Comfortable denim shorts for active kids",
            "Bright and colorful summer dress",
            "Classic blue jeans for children",
            "Adorable pink tutu skirt",
            "Complete superhero costume set",
            "Crisp white shirt for school",
            "Warm red hoodie for winter",
            "Classic blue denim jacket",
            "Beautiful floral summer dress",
            "Fun cartoon character t-shirt",
            "Comfortable black school pants",
            "Colorful rainbow sweater",
            "Comfortable white sneakers",
            "Casual blue denim shorts",
            "Elegant princess dress",
            "Active wear sports t-shirt",
            "Comfortable grey track pants",
            "Colorful stretchy leggings",
            "Bright yellow raincoat",
            "Classic pink ballet shoes",
            "Functional blue backpack",
            "Casual striped t-shirt",
            "Adorable denim overalls",
            "Cute animal print dress",
            "Warm red winter jacket",
            "Comfortable white socks",
            "Stylish blue cap",
            "Adorable pink hair bow",
            "Fresh green t-shirt",
            "Classic blue jeans",
            "Crisp white school dress",
            "Cozy cartoon pajamas",
            "Comfortable red sneakers",
            "Functional blue school bag",
            "Adorable pink tutu",
            "Fun superhero mask",
            "Bright yellow t-shirt",
            "Casual blue shorts",
            "Crisp white polo shirt",
            "Adorable pink dress",
            "Comfortable black school shoes",
            "Colorful warm scarf",
            "Classic blue jeans",
            "Cute animal hoodie",
            "Comfortable white socks set",
            "Vibrant red t-shirt",
            "Professional blue school uniform",
            "Adorable pink backpack",
            "Casual green shorts"
        };
        
        String[] kidsImages = {
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1000&fit=crop"
        };
        
        double[] kidsPrices = {14.99, 24.99, 29.99, 27.99, 19.99, 34.99, 16.99, 32.99, 39.99, 31.99, 12.99, 22.99, 28.99, 35.99, 21.99, 36.99, 15.99, 26.99, 18.99, 33.99, 17.99, 29.99, 13.99, 37.99, 30.99, 41.99, 8.99, 11.99, 6.99, 14.99, 25.99, 20.99, 23.99, 38.99, 27.99, 10.99, 9.99, 16.99, 24.99, 19.99, 42.99, 7.99, 35.99, 12.99, 15.99, 28.99, 31.99, 22.99, 26.99, 18.99};
        
        for (int i = 0; i < 50; i++) {
            products.add(new Product(
                null,
                kidsNames[i],
                kidsDescriptions[i],
                new BigDecimal(kidsPrices[i]),
                "Kids",
                kidsImages[i],
                40 + (i % 20) // Stock between 40-59
            ));
        }
        
        return products;
    }
}
