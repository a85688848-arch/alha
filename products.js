/**
 * ==========================================================================
 * ALHA - Luxury Fragrances (Abbottabad, Pakistan)
 * Store Data & Configuration File
 * ==========================================================================
 * 
 * OWNER EDIT INSTRUCTIONS:
 * 1. To change your WhatsApp ordering number, update WHATSAPP_NUMBER below.
 *    (Format without '+' or spaces, e.g., '923001234567')
 * 2. To change prices or add/remove sizes, edit the `sizes` array for any product.
 * 3. To update product images, save your real photos in the `assets/images/` 
 *    folder and update the `image` property with the filename.
 */

// Store WhatsApp number
const WHATSAPP_NUMBER = "923265676991";

// Store Configuration & Delivery Policies
const STORE_CONFIG = {
  brandName: "ALHA",
  tagline: "The Essence of Elegance",
  city: "Abbottabad",
  region: "Hazara, Khyber Pakhtunkhwa, Pakistan",
  currencySymbol: "Rs.",
  freeDeliveryThreshold: 4000, // PKR
  shippingAbbottabad: {
    fee: 150,
    time: "24 – 48 Hours",
    note: "Priority local dispatch within Abbottabad city & surroundings"
  },
  shippingNationwide: {
    fee: 250,
    time: "2 – 4 Working Days",
    note: "Tracked express courier (TCS / Leopards / Trax) across Pakistan"
  },
  paymentMethods: [
    "Cash on Delivery (COD)",
    "Direct Bank Transfer",
    "JazzCash / EasyPaisa"
  ],
  contact: {
    phone: "03265676991",
    whatsapp: "03265676991",
    email: "a85688848@gmail.com",
    instagram: "@alha.fragrances",
    facebook: "facebook.com/alhafragrances"
  }
};

// 12 Handcrafted Luxury Perfumes with Realistic Notes, Sizes, & PKR Pricing
const PRODUCTS = [
  {
    id: 1,
    name: "Alha Royal Oud",
    tagline: "Imperial Cambodian Oud infused with Kashmiri saffron & dark amber",
    category: "Oud",
    gender: "Unisex",
    badge: "Bestseller",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 38,
    image: "royal-oud.jpg",
    description: "An opulent, aristocratic composition designed for royalty. Alha Royal Oud opens with rare Kashmiri saffron and cinnamon bark, descending into a heart of centifolia rose and aged agarwood, anchored by smokey amber and white musk. Exceptional 12+ hour longevity crafted for chilly Hazara evenings and prestigious occasions.",
    notes: {
      top: "Kashmiri Saffron, Cinnamon Bark, Bergamot",
      heart: "Centifolia Rose, Cambodian Oud, Nutmeg",
      base: "Rich Amber, Smoked Cedarwood, Leather, White Musk"
    },
    sizes: [
      { ml: 30, price: 3200 },
      { ml: 50, price: 4900 },
      { ml: 100, price: 8200 }
    ]
  },
  {
    id: 2,
    name: "Velvet Amber",
    tagline: "Warm golden resin enveloped in bourbon vanilla and toasted tonka",
    category: "Amber",
    gender: "Unisex",
    badge: "Signature",
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 29,
    image: "velvet-amber.jpg",
    description: "Velvet Amber is liquid warmth. It opens with luscious Italian mandarin and spiced cardamom before revealing a mesmerizing core of benzoin and French tonka bean. The dry down is creamy Madagascar vanilla kissed with ambergris, leaving a regal, captivating sillage that lingers on winter coats for days.",
    notes: {
      top: "Italian Mandarin, Pink Pepper, Cardamom",
      heart: "Golden Amber, French Tonka, Benzoin Resin",
      base: "Bourbon Vanilla, Sandalwood, Patchouli"
    },
    sizes: [
      { ml: 30, price: 2900 },
      { ml: 50, price: 4400 },
      { ml: 100, price: 7400 }
    ]
  },
  {
    id: 3,
    name: "Hazara Breeze",
    tagline: "Crisp mountain pine needles, aquatic bergamot & chilled juniper",
    category: "Fresh",
    gender: "Unisex",
    badge: "Local Special",
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 44,
    image: "hazara-breeze.jpg",
    description: "Inspired by the brisk morning mist of the Abbottabad hills and pine forests of Shimla Hill. Hazara Breeze is ultra-refreshing yet sophisticated: invigorating citrus mist, dewy pine needle accords, aromatic lavender, and a crisp vetiver base that keeps you feeling sharp and cool through humid summer afternoons.",
    notes: {
      top: "Bergamot Zest, Frosted Mint, Chilled Green Apple",
      heart: "Abbottabad Pine Accord, Alpine Juniper, French Lavender",
      base: "Crisp Vetiver, Ambroxan, Oakmoss, Clean Musk"
    },
    sizes: [
      { ml: 30, price: 2600 },
      { ml: 50, price: 3800 },
      { ml: 100, price: 6200 }
    ]
  },
  {
    id: 4,
    name: "Noir Intense",
    tagline: "Midnight leather, dark roast coffee, and smoky Haitian vetiver",
    category: "Woody",
    gender: "Men",
    badge: "Bestseller",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 52,
    image: "noir-intense.jpg",
    description: "Commanding, magnetic, and undeniably masculine. Noir Intense was blended for the man who leaves an indelible impression. A crisp burst of black pepper and grapefruit gives way to dark roasted espresso beans and guaiac wood, settled over Tuscan leather and dense Haitian vetiver.",
    notes: {
      top: "Black Pepper, Grapefruit, Cardamom",
      heart: "Dark Roast Coffee, Guaiac Wood, Nutmeg",
      base: "Tuscan Leather, Vetiver, Smoky Incense"
    },
    sizes: [
      { ml: 30, price: 3000 },
      { ml: 50, price: 4600 },
      { ml: 100, price: 7900 }
    ]
  },
  {
    id: 5,
    name: "Rose Damascena",
    tagline: "Velvety petals of Turkish Damask rose kissed with lychee & spun sugar",
    category: "Floral",
    gender: "Women",
    badge: "Signature",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 31,
    image: "rose-damascena.jpg",
    description: "The epitome of feminine grace. Rose Damascena captures the fresh dew on hand-picked Isparta roses at dawn. Blended with mouthwatering lychee, peony, and creamy white musk, this scent radiates high-society charm without feeling heavy or dated.",
    notes: {
      top: "Sweet Lychee, Pink Peony, Bergamot",
      heart: "Turkish Damask Rose, Lily of the Valley, Raspberry",
      base: "White Musk, Cedar, Soft Amber, Cashmeran"
    },
    sizes: [
      { ml: 30, price: 2800 },
      { ml: 50, price: 4200 },
      { ml: 100, price: 6900 }
    ]
  },
  {
    id: 6,
    name: "Santal Sultani",
    tagline: "Creamy Mysore sandalwood, white cardamom and milky cedarwood",
    category: "Woody",
    gender: "Unisex",
    badge: "Premium",
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 26,
    image: "santal-sultani.jpg",
    description: "A calming masterpiece of rare sandalwood. Warm, creamy, and deeply grounding. Santal Sultani begins with gentle spices and iris, flowing into decadent Australian and Indian sandalwood oils, ending with silky amber and suede leather. Highly sophisticated and comforting.",
    notes: {
      top: "Cardamom, Violet Leaves, Papyrus",
      heart: "Florentine Iris, White Cedar, Incense",
      base: "Mysore Sandalwood, Cashmere Wood, Warm Amber"
    },
    sizes: [
      { ml: 30, price: 3400 },
      { ml: 50, price: 5200 },
      { ml: 100, price: 8900 }
    ]
  },
  {
    id: 7,
    name: "Imperial Musk",
    tagline: "Clean powdery crystal musk with linen accord and delicate white lily",
    category: "Fresh",
    gender: "Unisex",
    badge: "New Release",
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 19,
    image: "imperial-musk.jpg",
    description: "Pure, pristine, and luminous. Imperial Musk evokes the feeling of crisp Egyptian cotton linens washed in sunlight and chilled mountain water. A modern clean musk beloved by brides and professionals who prefer an intimate, magnetic skin scent.",
    notes: {
      top: "Aldehydes, White Lily, Lemon Blossom",
      heart: "Jasmine Sambac, Orris Butter, Cotton Flower",
      base: "White Crystal Musk, Light Amber, Iso E Super"
    },
    sizes: [
      { ml: 30, price: 2700 },
      { ml: 50, price: 3900 },
      { ml: 100, price: 6500 }
    ]
  },
  {
    id: 8,
    name: "Vanilla Sucrée",
    tagline: "Decadent Tahitian vanilla pod, salted caramel and almond praline",
    category: "Gourmand",
    gender: "Women",
    badge: "Bestseller",
    isFeatured: false,
    rating: 5.0,
    reviewsCount: 47,
    image: "vanilla-sucree.jpg",
    description: "An addictive gourmand indulgence. Vanilla Sucrée opens with toasted almonds and caramelized sugar before unveiling the rich nectar of cured Tahitian vanilla beans. Complemented by tonka bean and benzoin, this perfume is warm, seductive, and delicious.",
    notes: {
      top: "Toasted Almond, Spun Brown Sugar, Sweet Cream",
      heart: "Tahitian Vanilla Orchid, Salted Caramel, Tonka",
      base: "Bourbon Vanilla Pod, Golden Honey, Sandalwood"
    },
    sizes: [
      { ml: 30, price: 2900 },
      { ml: 50, price: 4400 },
      { ml: 100, price: 7200 }
    ]
  },
  {
    id: 9,
    name: "Cedar Crest",
    tagline: "Smoky Atlas cedarwood, aromatic sage, and peppery elemi resin",
    category: "Woody",
    gender: "Men",
    badge: "Signature",
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 22,
    image: "cedar-crest.jpg",
    description: "Epitomizing the rugged elegance of mountainous Pakistan. Cedar Crest blends dry cedarwood shavings with herbal clary sage, pink pepper, and a touch of smoky frankincense. A dignified, structured fragrance for formal wear and boardroom dominance.",
    notes: {
      top: "Pink Pepper, Elemi, Italian Bergamot",
      heart: "Clary Sage, Nutmeg, Virginia Cedarwood",
      base: "Atlas Cedar, Smoky Frankincense, Earthy Vetiver"
    },
    sizes: [
      { ml: 30, price: 2800 },
      { ml: 50, price: 4100 },
      { ml: 100, price: 6800 }
    ]
  },
  {
    id: 10,
    name: "Jasmine Nocturne",
    tagline: "Intoxicating night-blooming Pakistani Motia & Sambac jasmine",
    category: "Floral",
    gender: "Women",
    badge: "Traditional",
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 35,
    image: "jasmine-nocturne.jpg",
    description: "A tribute to the nostalgic scent of fresh Motia blossoms picked at twilight. Jasmine Nocturne fuses opulent jasmine sambac with tuberose and neroli blossoms, anchored in warm amber and musk. Sensual, luminous, and authentically traditional.",
    notes: {
      top: "Bitter Orange Blossom, Neroli, Green Leaves",
      heart: "Night-Blooming Jasmine Sambac (Motia), Indian Tuberose",
      base: "Soft Benzoin, Sheer Amber, Golden Musk"
    },
    sizes: [
      { ml: 30, price: 2700 },
      { ml: 50, price: 3900 },
      { ml: 100, price: 6600 }
    ]
  },
  {
    id: 11,
    name: "Cuir De Hazara",
    tagline: "Aged Russian leather, sweet tobacco leaf, and smoked plum",
    category: "Oud",
    gender: "Men",
    badge: "Exclusive",
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 28,
    image: "leather-cuir.jpg",
    description: "Dark, assertive, and undeniably luxurious. Cuir De Hazara pairs rich saddle leather with cured Cuban tobacco leaf and macerated dark plum. Infused with a dash of black oud and birch tar, it has a formidable presence and commanding sillage.",
    notes: {
      top: "Dark Plum, Thyme, Saffron Infusion",
      heart: "Cured Tobacco Leaf, Tuscan Leather, Cacao Pod",
      base: "Black Agarwood (Oud), Birch Tar, Ambergris"
    },
    sizes: [
      { ml: 30, price: 3500 },
      { ml: 50, price: 5400 },
      { ml: 100, price: 9200 }
    ]
  },
  {
    id: 12,
    name: "Bloom & Blossom",
    tagline: "Sparkling magnolia petals, juicy white peach & dewy spring blossoms",
    category: "Floral",
    gender: "Women",
    badge: "New Release",
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 17,
    image: "bloom-blossom.jpg",
    description: "Youthful, sparkling, and romantic. Bloom & Blossom delivers an uplifting symphony of white peaches, dewy magnolia petals, and sweet honeysuckle. Designed for everyday radiance and bright spring mornings.",
    notes: {
      top: "White Peach, Sicilian Mandarin, Dewdrop Accord",
      heart: "Magnolia Petals, Sweet Honeysuckle, Gardenia",
      base: "Blonde Woods, Sheer Vanilla, Silky Musk"
    },
    sizes: [
      { ml: 30, price: 2500 },
      { ml: 50, price: 3700 },
      { ml: 100, price: 5900 }
    ]
  }
];

// Curated Customer Reviews from Abbottabad and across Pakistan
const REVIEWS = [
  {
    name: "Daniyal Qureshi",
    city: "Abbottabad (Supply Area)",
    perfume: "Alha Royal Oud",
    rating: 5,
    verified: true,
    date: "14 Sept 2026",
    comment: "Ordered in Abbottabad in the morning and received it by the next afternoon via Cash on Delivery! The presentation is stunning. Royal Oud projects for a solid 9+ hours. It easily rivals imported niche ouds costing Rs. 35,000+."
  },
  {
    name: "Syeda Zainab Bukhari",
    city: "Islamabad (F-7)",
    perfume: "Rose Damascena",
    rating: 5,
    verified: true,
    date: "28 August 2026",
    comment: "The rose and lychee notes in Rose Damascena are so delicately balanced. I wore it to a wedding at Serena and got compliments all night. Proud to see such world-class perfumery originating from Abbottabad."
  },
  {
    name: "Maj. (R) Tariq Khan",
    city: "Abbottabad (Kakul Road)",
    perfume: "Hazara Breeze & Noir Intense",
    rating: 5,
    verified: true,
    date: "05 August 2026",
    comment: "Hazara Breeze truly captures the crisp pine freshness of our hills. Noir Intense has that serious, distinguished dark leather profile. Both bottles arrived securely wrapped. Very impressed with ALHA."
  },
  {
    name: "Hamza Shafique",
    city: "Lahore (DHA Phase 5)",
    perfume: "Santal Sultani",
    rating: 5,
    verified: true,
    date: "19 July 2026",
    comment: "Delivery took 3 days to Lahore. Smooth COD process. The Mysore sandalwood is silky and rich. Ordered via WhatsApp and their representative answered my sizing questions in 2 minutes."
  }
];
