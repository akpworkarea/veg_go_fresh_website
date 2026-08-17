import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Truck,
  Tag,
  RotateCcw,
  Sparkles,
  Bot,
  Instagram,
  Facebook,
  Twitter,
  Clock,
  Plus,
  Minus,
  Gift,
  Repeat,
  Percent,
  Star,
  ArrowRight,
  Scissors,
  Milk,
  Egg,
  Wheat,
  Cherry,
  Flower2,
  Grid3x3,
  Salad,
  Coffee,
  Check,
  Zap,
  ShoppingBag,
  Send,
  type LucideIcon,
} from "lucide-react";

// Generated high-resolution assets matching the exact design
import heroBasketImg from "./assets/images/hero_basket_1786973680514.jpg";
import deliveryBagImg from "./assets/images/delivery_bag_1786973692429.jpg";
import flashProduceImg from "./assets/images/flash_produce_1786973705257.jpg";
import prodTomatoImg from "./assets/images/prod_tomato_1786973722777.jpg";
import prodOnionImg from "./assets/images/prod_onion_1786973739658.jpg";
import prodPotatoImg from "./assets/images/prod_potato_1786973750758.jpg";
import prodBananaImg from "./assets/images/prod_banana_1786973760652.jpg";
import prodAppleImg from "./assets/images/prod_apple_1786973779694.jpg";
import spinWheelImg from "./assets/images/spin_wheel_1786973791103.jpg";

/* ---------------------------------------------------------------------- */
/*  Brand Design Tokens & Theme                                           */
/* ---------------------------------------------------------------------- */
const BRAND = {
  green900: "#133E19",
  green800: "#1A5223",
  green700: "#1E652B",
  green600: "#248337",
  green500: "#2E9E44",
  green100: "#EAF6EA",
  green50: "#F5FAF4",
  cream: "#FDF8EC",
  creamSale: "#FBF4EA",
  gold: "#E09C2C",
  goldLight: "#F5BD58",
  red: "#E23B3B",
  ink: "#1A241D",
  slate: "#59685E",
  borderLight: "#EEF3ED",
};

/* ---------------------------------------------------------------------- */
/*  Static Category Data                                                  */
/* ---------------------------------------------------------------------- */
interface CategoryItem {
  id: string;
  name: string;
  icon: LucideIcon;
  color?: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: "veg", name: "Vegetables", icon: Leaf, color: "#2E7D32" },
  { id: "fruits", name: "Fruits", icon: Cherry, color: "#E8622C" },
  { id: "greens", name: "Leafy Greens", icon: Salad, color: "#43A047" },
  { id: "herbs", name: "Herbs & Seasoning", icon: Scissors, color: "#2E7D32" },
  { id: "exotic", name: "Exotic Vegetables", icon: Sparkles, color: "#8E24AA" },
  { id: "dairy", name: "Dairy Products", icon: Milk, color: "#0288D1" },
  { id: "eggs", name: "Eggs", icon: Egg, color: "#F57C00" },
  { id: "grains", name: "Pulses & Grains", icon: Wheat, color: "#8D6E63" },
  { id: "rice", name: "Rice & Millets", icon: Grid3x3, color: "#795548" },
  { id: "beverages", name: "Beverages", icon: Coffee, color: "#00897B" },
  { id: "plants", name: "Plants & Pots", icon: Flower2, color: "#388E3C" },
];

/* ---------------------------------------------------------------------- */
/*  Feature Value Propositions                                            */
/* ---------------------------------------------------------------------- */
interface FeatureItem {
  icon: LucideIcon;
  title: string;
  sub: string;
}

const FEATURES: FeatureItem[] = [
  { icon: Leaf, title: "Farm Fresh", sub: "Handpicked Daily" },
  { icon: ShieldCheck, title: "No Chemicals", sub: "Pure & Healthy" },
  { icon: Truck, title: "30–45 mins Delivery", sub: "Fast & Reliable" },
  { icon: ShieldCheck, title: "Secure Payments", sub: "100% Safe" },
  { icon: Tag, title: "Best Prices", sub: "On All Products" },
  { icon: RotateCcw, title: "Easy Returns", sub: "Hassle Free" },
];

/* ---------------------------------------------------------------------- */
/*  Best Selling Products Data                                            */
/* ---------------------------------------------------------------------- */
interface ProductItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "tomato",
    name: "Tomato",
    weight: "1 kg",
    price: 25.0,
    mrp: 35.0,
    image: prodTomatoImg,
    category: "veg",
  },
  {
    id: "onion",
    name: "Onion",
    weight: "1 kg",
    price: 28.0,
    mrp: 40.0,
    image: prodOnionImg,
    category: "veg",
  },
  {
    id: "potato",
    name: "Potato",
    weight: "1 kg",
    price: 22.0,
    mrp: 30.0,
    image: prodPotatoImg,
    category: "veg",
  },
  {
    id: "banana",
    name: "Banana",
    weight: "1 dozen",
    price: 40.0,
    mrp: 60.0,
    image: prodBananaImg,
    category: "fruits",
  },
  {
    id: "apple",
    name: "Apple",
    weight: "4 pcs",
    price: 120.0,
    mrp: 160.0,
    image: prodAppleImg,
    category: "fruits",
  },
];

/* ---------------------------------------------------------------------- */
/*  Promotional Offer Cards                                               */
/* ---------------------------------------------------------------------- */
interface PromoCard {
  id: string;
  icon: LucideIcon;
  title: string;
  sub: string;
  cta: string;
  action: string;
}

const PROMOS: PromoCard[] = [
  {
    id: "spin",
    icon: Gift,
    title: "Spin & Win",
    sub: "Win exciting rewards everyday",
    cta: "Spin Now",
    action: "spin",
  },
  {
    id: "buyagain",
    icon: Repeat,
    title: "Buy Again",
    sub: "Reorder your favourite items",
    cta: "Buy Again",
    action: "reorder",
  },
  {
    id: "recommendations",
    icon: Star,
    title: "Smart Recommendations",
    sub: "Handpicked for you based on your choice",
    cta: "Explore",
    action: "recommendations",
  },
  {
    id: "offers",
    icon: Percent,
    title: "Today's Offers",
    sub: "Grab the best deals of the day!",
    cta: "View Offers",
    action: "offers",
  },
];

/* ---------------------------------------------------------------------- */
/*  Scroll Reveal Hook                                                    */
/* ---------------------------------------------------------------------- */
function useReveal(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Countdown Timer Hook                                                  */
/* ---------------------------------------------------------------------- */
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : initialSeconds));
    }, 1000);
    return () => clearInterval(id);
  }, [initialSeconds]);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return { h, m, s };
}

/* ---------------------------------------------------------------------- */
/*  Main Application Component                                            */
/* ---------------------------------------------------------------------- */
export default function App() {
  // Initial cart with items to reflect ₹276.00 as in the design
  const [cart, setCart] = useState<Record<string, number>>({
    tomato: 2, // 2 x 25 = 50
    onion: 1,  // 1 x 28 = 28
    apple: 1,  // 1 x 120 = 120
    banana: 1, // 1 x 40 = 40
    potato: 1, // 1 x 22 = 22 -> 50 + 28 + 120 + 40 + 22 = 260 + ~delivery
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [isSearchCategoryOpen, setIsSearchCategoryOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [mobileCats, setMobileCats] = useState(false);
  const [activeLocation, setActiveLocation] = useState("Kukatpally, Hyderabad");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinReward, setSpinReward] = useState<string | null>(null);
  const [spinAngle, setSpinAngle] = useState(0);
  const [aiChat, setAiChat] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Hello Shiva! 🌿 I am your VegGo Fresh AI Assistant. How can I help you eat fresh today? I can suggest meal recipes, seasonal fruits, or assemble a sambar vegetable pack for you!",
    },
  ]);
  const [aiInput, setAiInput] = useState("");

  const { h, m, s } = useCountdown(2 * 3600 + 45 * 60 + 30);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap";
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const addToCart = useCallback((id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => {
      const next = { ...c };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  }, []);

  const cartCount = Object.values(cart).reduce<number>((a, b) => a + Number(b), 0);
  const cartTotal = (Object.entries(cart) as [string, number][]).reduce<number>((sum, [id, qty]) => {
    const p = PRODUCTS.find((prod) => prod.id === id);
    return sum + (p ? p.price * Number(qty) : 0);
  }, 0);

  // Handle spin the wheel
  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinReward(null);
    const newAngle = spinAngle + 1440 + Math.floor(Math.random() * 360);
    setSpinAngle(newAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const rewards = [
        "🎉 20% OFF on Fresh Fruits",
        "🚚 Free Instant Delivery",
        "🍎 Free 500g Royal Gala Apples",
        "💰 ₹50 Cashback on next order",
        "🎁 Free Coriander & Mint Bunch",
      ];
      setSpinReward(rewards[Math.floor(Math.random() * rewards.length)]);
    }, 3500);
  };

  // Handle AI Chat
  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiChat((prev) => [...prev, { sender: "user", text: userMsg }]);
    setAiInput("");

    setTimeout(() => {
      let botResponse =
        "Great choice! I have checked our local Kukatpally warehouse and farm stocks. All items are farm-harvested this morning with 100% quality guarantee.";
      const lower = userMsg.toLowerCase();
      if (lower.includes("sambar") || lower.includes("curry") || lower.includes("recipe")) {
        botResponse =
          "For traditional Sambar, you need: 1. Tomatoes (2 pcs), 2. Drumstick (1 pc), 3. Small Onions / Shallots (250g), 4. Bottle Gourd / Pumpkin, 5. Fresh Curry Leaves. Would you like me to add this 1-click Sambar kit to your cart for ₹65?";
      } else if (lower.includes("diet") || lower.includes("weight") || lower.includes("salad")) {
        botResponse =
          "For a wholesome low-calorie salad bowl, I recommend: Fresh English Cucumbers, Red Cherry Tomatoes, Crisp Romaine Lettuce, and Lemon. Total Calories: ~95 kcal. Delivery in 30 mins!";
      } else if (lower.includes("offer") || lower.includes("discount") || lower.includes("code")) {
        botResponse =
          "Active coupons for you: 🏷️ 'VEGFRESH50' for ₹50 off on orders above ₹249, or join VegGo Plus for zero delivery charges forever!";
      }
      setAiChat((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 600);
  };

  const fontDisplay = { fontFamily: "'Outfit', sans-serif" };
  const fontBody = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  // Filter products based on search
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "all" ||
      p.category === selectedCategory ||
      (selectedCategory === "veg" && (p.id === "tomato" || p.id === "onion" || p.id === "potato")) ||
      (selectedCategory === "fruits" && (p.id === "banana" || p.id === "apple"));
    return matchesSearch && matchesCat;
  });

  return (
    <div id="veggo-root" className="min-h-screen bg-white text-[#1B2420]" style={fontBody}>
      {/* ================= GLOBAL FLOATING STYLES ================= */}
      <style>{`
        @keyframes floatSlow { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(1deg); } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(36,131,55, 0.4); } 100% { box-shadow: 0 0 0 16px rgba(36,131,55, 0); } }
        .anim-float-basket { animation: floatSlow 5s ease-in-out infinite; }
        .anim-pulse-ai { animation: pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>

      {/* ================= 1. TOP UTILITY BAR ================= */}
      <div
        id="top-utility-bar"
        className="hidden md:flex items-center justify-between px-6 lg:px-12 py-2 text-xs border-b border-[#E1EDE1]"
        style={{ backgroundColor: BRAND.green100, color: BRAND.green800 }}
      >
        {/* Left tagline */}
        <div className="flex items-center gap-1.5 font-medium">
          <Leaf className="w-3.5 h-3.5 text-[#248337]" />
          <span>Eat Fresh, Live Healthy</span>
        </div>

        {/* Center Delivery Address Selector */}
        <div
          id="location-picker-btn"
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-1.5 cursor-pointer hover:text-black transition-colors font-medium"
        >
          <MapPin className="w-3.5 h-3.5 text-[#248337]" />
          <span>Delivering to: <strong className="font-semibold">{activeLocation}</strong></span>
          <ChevronDown className="w-3 h-3 text-[#248337]" />
        </div>

        {/* Right Quick Links & Socials */}
        <div className="flex items-center gap-4 text-xs font-normal">
          <button onClick={() => alert("Vendor Registration opens in Kukatpally zone soon!")} className="hover:underline cursor-pointer">
            Become a Seller
          </button>
          <span className="text-[#C4D9C4]">|</span>
          <button onClick={() => setIsSpinModalOpen(true)} className="hover:underline cursor-pointer">
            Offers
          </button>
          <span className="text-[#C4D9C4]">|</span>
          <button onClick={() => setIsAiModalOpen(true)} className="hover:underline cursor-pointer">
            Help &amp; Support
          </button>
          <div className="flex items-center gap-3 pl-2 border-l border-[#CFE6CF] text-[#248337]">
            <a href="#instagram" className="hover:opacity-75 transition" aria-label="Instagram"><Instagram className="w-3.5 h-3.5" /></a>
            <a href="#facebook" className="hover:opacity-75 transition" aria-label="Facebook"><Facebook className="w-3.5 h-3.5" /></a>
            <a href="#twitter" className="hover:opacity-75 transition" aria-label="Twitter"><Twitter className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN HEADER & SEARCH ================= */}
      <header
        id="main-navigation-header"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EEF3ED] shadow-xs"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile hamburger menu */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileNav(true)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-[#1A5223]" />
          </button>

          {/* Authentic VegGo Brand Logo */}
          <div
            id="veggo-logo-container"
            onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none"
          >
            {/* Custom stylized Leaf & V emblem matching the brand logo */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                {/* Sprouting Green Leaves */}
                <path
                  d="M25,48 C20,25 38,10 58,12 C62,28 50,45 25,48 Z"
                  fill="url(#leafGrad1)"
                />
                <path
                  d="M48,32 C58,15 78,16 82,32 C75,44 58,45 48,32 Z"
                  fill="url(#leafGrad2)"
                />
                {/* Golden 'V' Character */}
                <path
                  d="M32,45 L50,88 L72,40 L60,40 L50,70 L39,45 Z"
                  fill="url(#goldGrad)"
                />
                <defs>
                  <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#43A047" />
                    <stop offset="100%" stopColor="#1B5E20" />
                  </linearGradient>
                  <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#81C784" />
                    <stop offset="100%" stopColor="#2E7D32" />
                  </linearGradient>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5BD58" />
                    <stop offset="100%" stopColor="#D48B1E" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline" style={fontDisplay}>
                <span className="text-2xl font-black tracking-tight text-[#1E652B]">Veg</span>
                <span className="text-2xl font-black tracking-tight text-[#D48B1E] flex items-center">
                  G<span className="relative">o<span className="absolute -top-1 right-0 text-[10px] text-[#2E7D32]">🍃</span></span>
                </span>
              </div>
              <div className="flex items-center tracking-[0.22em] text-[8.5px] font-bold text-[#6D7D72] mt-0.5">
                <span>— FRESH —</span>
              </div>
            </div>
          </div>

          {/* 'All Categories' button - Desktop */}
          <button
            id="all-categories-btn"
            onClick={() => setMobileCats((v) => !v)}
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold shrink-0 cursor-pointer shadow-xs hover:brightness-95 transition"
            style={{ backgroundColor: BRAND.green800 }}
          >
            <Menu className="w-4 h-4" />
            <span>All Categories</span>
          </button>

          {/* Central Search Bar */}
          <div
            id="global-search-bar"
            className="flex-1 hidden sm:flex items-center border border-[#DCE7DA] rounded-lg overflow-hidden bg-white focus-within:border-[#248337] focus-within:ring-1 focus-within:ring-[#248337]/20 transition-all"
          >
            <input
              id="search-input-field"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for vegetables, fruits and more..."
              className="flex-1 px-4 py-2.5 text-sm outline-hidden text-[#1A241D] placeholder-[#8F9E93] min-w-0"
            />

            {/* Category Filter dropdown in search */}
            <div className="relative">
              <button
                id="search-category-dropdown-btn"
                type="button"
                onClick={() => setIsSearchCategoryOpen((v) => !v)}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#59685E] border-l border-[#DCE7DA] hover:bg-gray-50 cursor-pointer"
              >
                <span>{searchCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {isSearchCategoryOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#DCE7DA] rounded-lg shadow-lg py-1.5 z-50">
                  {["All", "Vegetables", "Fruits", "Leafy Greens", "Dairy"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSearchCategory(cat);
                        setIsSearchCategoryOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#EAF6EA] hover:text-[#1E652B] transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Green search action button */}
            <button
              id="search-action-btn"
              className="px-4 py-2.5 text-white flex items-center justify-center cursor-pointer hover:brightness-95 transition"
              style={{ backgroundColor: BRAND.green800 }}
              aria-label="Submit search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* VegGo AI Assistant Button */}
          <div
            id="veggo-ai-top-widget"
            onClick={() => setIsAiModalOpen(true)}
            className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#D5EAD5] cursor-pointer hover:border-[#248337] transition-all bg-[#F5FAF4] hover:shadow-xs select-none"
          >
            <div className="w-7 h-7 rounded-full bg-[#133E19] flex items-center justify-center text-white shadow-xs">
              <Bot className="w-4 h-4 text-[#81C784]" />
            </div>
            <div className="leading-none text-left pr-1">
              <div className="text-xs font-bold text-[#133E19]">VegGo</div>
              <div className="text-[10px] text-[#59685E] font-medium">AI Assistant</div>
            </div>
          </div>

          {/* User Account / Profile */}
          <div
            id="user-account-menu"
            onClick={() => alert("Logged in as Shiva (Kukatpally Prime Member)")}
            className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-85 select-none"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#1A241D]">
              <User className="w-4 h-4" />
            </div>
            <div className="leading-tight text-left">
              <div className="text-[11px] text-[#59685E]">My Account</div>
              <div className="text-xs font-semibold text-[#1A241D] flex items-center gap-1">
                <span>Hello, Shiva</span>
                <ChevronDown className="w-3 h-3 text-[#59685E]" />
              </div>
            </div>
          </div>

          {/* Cart Widget Button */}
          <div
            id="header-cart-btn"
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2.5 cursor-pointer bg-[#F5FAF4] hover:bg-[#EAF6EA] border border-[#DCE7DA] px-3 py-1.5 rounded-xl transition-all select-none"
          >
            <div className="relative flex items-center">
              <ShoppingCart className="w-5 h-5 text-[#133E19]" />
              {cartCount > 0 && (
                <span
                  id="cart-items-counter-badge"
                  className="absolute -top-2.5 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-white font-bold shadow-xs"
                  style={{ backgroundColor: BRAND.green800 }}
                >
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block leading-tight text-left">
              <div className="text-[10px] text-[#59685E] font-medium">Cart</div>
              <div id="cart-header-amount" className="text-xs font-bold text-[#133E19]">
                ₹{cartTotal.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown Category Grid when 'All Categories' is clicked */}
        {mobileCats && (
          <div className="hidden lg:grid grid-cols-6 gap-2 max-w-[1440px] mx-auto px-12 py-4 border-t border-[#EEF3ED] bg-white animate-in fade-in slide-in-from-top-2 duration-200">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  setMobileCats(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors text-left ${
                  selectedCategory === c.id ? "bg-[#EAF6EA] text-[#1E652B] font-bold" : "hover:bg-gray-50 text-[#1A241D]"
                }`}
              >
                <c.icon className="w-4 h-4 text-[#248337]" />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div className="w-80 bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-[#1E652B]" style={fontDisplay}>VegGo</span>
                <span className="text-[9px] bg-[#EAF6EA] text-[#1E652B] font-bold px-2 py-0.5 rounded-full">FRESH</span>
              </div>
              <button
                onClick={() => setMobileNav(false)}
                className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="flex items-center border border-[#DCE7DA] rounded-lg overflow-hidden my-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search produce..."
                className="flex-1 px-3 py-2 text-xs outline-hidden min-w-0"
              />
              <button className="px-3 py-2 bg-[#1E652B] text-white">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Categories */}
            <div className="text-xs font-bold uppercase text-[#59685E] tracking-wider mb-2">Categories</div>
            <div className="space-y-1 flex-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategory(c.id);
                    setMobileNav(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                    selectedCategory === c.id ? "bg-[#EAF6EA] text-[#1E652B] font-bold" : "text-[#1A241D] hover:bg-gray-50"
                  }`}
                >
                  <c.icon className="w-4 h-4 text-[#248337]" />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile Account info */}
            <div className="pt-4 border-t border-gray-100 mt-4 text-xs text-[#59685E]">
              <div>Logged in as <strong>Shiva</strong></div>
              <div className="flex items-center gap-1 mt-1 text-[#248337]">
                <MapPin className="w-3 h-3" /> {activeLocation}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileNav(false)} />
        </div>
      )}

      {/* ================= 3. HERO & SIDEBAR SECTION ================= */}
      <section id="hero-layout-section" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-5 lg:py-6">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Category Sidebar (Desktop Only) */}
          <aside
            id="desktop-category-sidebar"
            className="hidden lg:block w-58 shrink-0 bg-white border border-[#EEF3ED] rounded-2xl p-3 h-fit shadow-xs select-none"
          >
            <div className="space-y-0.5">
              {CATEGORIES.map((c) => {
                const isActive = selectedCategory === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCategory(isActive ? "all" : c.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium cursor-pointer transition-all ${
                      isActive
                        ? "bg-[#EAF6EA] text-[#1E652B] font-bold shadow-2xs"
                        : "text-[#2A362E] hover:bg-[#F5FAF4] hover:text-[#1E652B]"
                    }`}
                  >
                    <c.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#1E652B]" : "text-[#3D8C47]"}`} />
                    <span className="truncate">{c.name}</span>
                  </div>
                );
              })}
            </div>

            {/* View All Categories Link */}
            <div
              onClick={() => setSelectedCategory("all")}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer text-xs font-bold mt-2 text-[#1E652B] bg-[#EAF6EA] hover:bg-[#DFEEDF] transition-colors"
            >
              <Grid3x3 className="w-4 h-4" />
              <span>View All Categories</span>
            </div>
          </aside>

          {/* Hero Banner Card */}
          <div
            id="hero-banner-card"
            className="flex-1 rounded-3xl overflow-hidden relative flex flex-col lg:flex-row items-center border border-[#E2EFE2] shadow-sm"
            style={{
              background: "linear-gradient(115deg, #EEF8ED 0%, #F5FAF4 45%, #FFFFFF 85%)",
            }}
          >
            {/* Left Content Area */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex-1 relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.2 rounded-full mb-4 bg-[#DCEFDC] text-[#1A5223]">
                  <Leaf className="w-3.5 h-3.5 text-[#248337]" />
                  <span>100% FARM FRESH</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.15] tracking-tight text-[#1A241D]"
                  style={fontDisplay}
                >
                  Fresh Vegetables &amp; Fruits<br />
                  <span className="text-[#248337]">Delivered To Your Home</span>
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-3.5 text-xs sm:text-sm font-medium text-[#59685E] flex flex-wrap items-center gap-2">
                  <span>Handpicked</span>
                  <span className="text-[#BAC7BC]">•</span>
                  <span>Hygienically Packed</span>
                  <span className="text-[#BAC7BC]">•</span>
                  <span>On-time Delivery</span>
                </p>
              </Reveal>

              <Reveal delay={260}>
                <div className="flex flex-wrap items-center gap-3.5 mt-6">
                  <button
                    id="hero-shop-now-btn"
                    onClick={() => {
                      document.getElementById("best-sellers-heading")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-md hover:brightness-95 transition-all cursor-pointer"
                    style={{ backgroundColor: BRAND.green800 }}
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id="hero-explore-offers-btn"
                    onClick={() => setIsSpinModalOpen(true)}
                    className="px-6 py-3 rounded-xl text-sm font-bold border border-[#C5DAC5] bg-white text-[#1A241D] hover:bg-[#F5FAF4] transition-all cursor-pointer shadow-2xs"
                  >
                    Explore Offers
                  </button>
                </div>
              </Reveal>

              <Reveal delay={340}>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#59685E] mt-5">
                  <Clock className="w-3.5 h-3.5 text-[#248337]" />
                  <span>Delivery in 30–45 mins</span>
                </div>
              </Reveal>

              {/* Carousel Pagination dots */}
              <div className="flex items-center gap-1.5 mt-8">
                <span className="w-6 h-1.5 rounded-full bg-[#248337]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7D9C7]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7D9C7]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7D9C7]" />
              </div>
            </div>

            {/* Right Rich Harvest Basket Photography Visual */}
            <div className="relative w-full lg:w-[460px] h-72 sm:h-80 md:h-96 lg:h-[400px] shrink-0 flex items-center justify-center p-4">
              {/* Soft circular aura background */}
              <div className="absolute inset-4 rounded-full bg-[#DCEFDC]/50 filter blur-xl -z-0" />

              {/* Real Harvest Basket Image */}
              <img
                src={heroBasketImg}
                alt="Fresh farm produce harvest basket"
                referrerPolicy="no-referrer"
                className="anim-float-basket relative z-10 w-full h-full object-contain max-h-[360px] drop-shadow-xl select-none pointer-events-none"
              />

              {/* Circular 'Freshness GUARANTEE' Seal */}
              <div
                id="freshness-guarantee-badge"
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 w-22 h-22 rounded-full bg-white border-2 border-[#248337] flex flex-col items-center justify-center text-center shadow-lg p-1.5 select-none"
              >
                <div className="w-6 h-6 rounded-full bg-[#EAF6EA] flex items-center justify-center mb-0.5">
                  <Leaf className="w-3.5 h-3.5 text-[#248337]" />
                </div>
                <span className="text-[9px] font-black leading-[1.1] text-[#1E652B] tracking-tighter">
                  Freshness<br />GUARANTEE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. VALUE PROPOSITION FEATURES STRIP ================= */}
      <section id="features-value-strip" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-3">
        <Reveal>
          <div className="bg-white border border-[#EEF3ED] rounded-2xl px-6 py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 shadow-2xs">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-[#EAF6EA]">
                  <f.icon className="w-5 h-5 text-[#248337]" />
                </div>
                <div className="leading-tight">
                  <div className="text-[13px] font-bold text-[#1A241D]">{f.title}</div>
                  <div className="text-[11px] text-[#59685E] mt-0.5">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================= 5. FLASH SALE + BEST SELLING PRODUCTS + MEMBERSHIP ================= */}
      <section id="products-sales-row" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="flex flex-col xl:flex-row gap-5 items-stretch">
          {/* Card 1: FLASH SALE ⚡ */}
          <Reveal className="w-full xl:w-72 shrink-0">
            <div
              id="flash-sale-banner-card"
              className="rounded-3xl p-6 h-full flex flex-col border border-[#F3E5D4] relative overflow-hidden shadow-xs"
              style={{ backgroundColor: BRAND.creamSale }}
            >
              {/* Flash badge & % seal */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#FCEAE3] text-[#E23B3B]">
                  FLASH SALE <Zap className="w-3 h-3 fill-current" />
                </span>
                <span className="w-7 h-7 rounded-full bg-[#F57C00] text-white flex items-center justify-center text-xs font-black">
                  %
                </span>
              </div>

              <h3 className="text-2xl font-black mt-3 text-[#1A241D]" style={fontDisplay}>
                Up to <span className="text-[#248337]">50% OFF</span>
              </h3>
              <p className="text-xs font-medium text-[#59685E] mt-0.5">On Selected Products</p>

              {/* Real Countdown Timer */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  ["Hours", h],
                  ["Mins", m],
                  ["Secs", s],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="text-center rounded-xl py-2 text-white shadow-xs"
                    style={{ backgroundColor: BRAND.green800 }}
                  >
                    <div className="text-base font-black leading-none">{val}</div>
                    <div className="text-[8px] uppercase tracking-wider mt-1 opacity-85 font-semibold">{label}</div>
                  </div>
                ))}
              </div>

              <button
                id="flash-sale-shop-now-btn"
                onClick={() => alert("Flash sale activated! 50% discount automatically applied in cart.")}
                className="mt-5 px-5 py-2.5 rounded-xl text-white text-xs font-bold w-fit shadow-xs hover:brightness-95 transition cursor-pointer"
                style={{ backgroundColor: BRAND.green800 }}
              >
                Shop Now
              </button>

              {/* Flash Produce Realistic Photo */}
              <div className="mt-auto pt-4 flex justify-center">
                <img
                  src={flashProduceImg}
                  alt="Fresh Flash Sale Vegetables"
                  referrerPolicy="no-referrer"
                  className="w-full max-h-36 object-contain rounded-xl drop-shadow-sm select-none"
                />
              </div>
            </div>
          </Reveal>

          {/* Center Column: BEST SELLING PRODUCTS (Horizontal Grid) */}
          <div className="flex-1 bg-white border border-[#EEF3ED] rounded-3xl p-5 lg:p-6 shadow-xs flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 id="best-sellers-heading" className="text-lg sm:text-xl font-bold text-[#1A241D]" style={fontDisplay}>
                Best Selling Products
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="flex items-center gap-1 text-xs font-bold text-[#248337] hover:underline cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Product Cards Row */}
            <div
              id="best-sellers-product-grid"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 flex-1"
            >
              {filteredProducts.map((p, i) => {
                const qty = cart[p.id] || 0;
                return (
                  <Reveal key={p.id} delay={i * 50}>
                    <div
                      id={`product-card-${p.id}`}
                      className="border border-[#EEF3ED] hover:border-[#C8E2C8] rounded-2xl p-3 flex flex-col bg-white hover:shadow-md transition-all h-full group"
                    >
                      {/* Product Image */}
                      <div className="h-28 sm:h-32 w-full flex items-center justify-center p-1 bg-[#F9FCF9] rounded-xl mb-2 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 select-none"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="text-[13px] font-bold text-[#1A241D] leading-tight">{p.name}</div>
                      <div className="text-[11px] text-[#78887D] mt-0.5">{p.weight}</div>

                      {/* Pricing & Add Button */}
                      <div className="flex items-center justify-between mt-auto pt-2.5">
                        <div className="leading-tight">
                          <span className="text-[13px] font-black text-[#1A241D]">₹{p.price.toFixed(2)}</span>
                          <span className="text-[10px] text-[#A6B5A9] line-through ml-1.5">
                            ₹{p.mrp.toFixed(2)}
                          </span>
                        </div>

                        {/* Cart Controls */}
                        {qty > 0 ? (
                          <div
                            className="flex items-center rounded-lg overflow-hidden text-white shadow-xs"
                            style={{ backgroundColor: BRAND.green800 }}
                          >
                            <button
                              onClick={() => removeFromCart(p.id)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-black/15 cursor-pointer"
                              aria-label={`Decrease ${p.name}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{qty}</span>
                            <button
                              onClick={() => addToCart(p.id)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-black/15 cursor-pointer"
                              aria-label={`Increase ${p.name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            id={`add-btn-${p.id}`}
                            onClick={() => addToCart(p.id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-xs hover:brightness-95 transition cursor-pointer"
                            style={{ backgroundColor: BRAND.green800 }}
                            aria-label={`Add ${p.name} to cart`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Card 3: VEGGO PLUS MEMBERSHIP */}
          <Reveal className="w-full xl:w-72 shrink-0">
            <div
              id="membership-promo-card"
              className="rounded-3xl p-6 h-full flex flex-col border border-[#D5EAD5] relative overflow-hidden shadow-xs"
              style={{ backgroundColor: BRAND.green100 }}
            >
              <h3 className="text-xl font-black text-[#133E19]" style={fontDisplay}>
                VegGo Plus<br />Membership
              </h3>

              <ul className="mt-4 space-y-2 text-xs font-semibold text-[#1E652B]">
                {["Free Delivery", "Exclusive Offers", "Extra Discounts", "Priority Support"].map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#248337] text-white flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <button
                id="join-membership-action-btn"
                onClick={() => alert("🎉 Welcome Shiva! 30-Day VegGo Plus Free Trial Activated!")}
                className="mt-5 px-5 py-2.5 rounded-xl text-white text-xs font-bold w-fit shadow-xs hover:brightness-95 transition cursor-pointer"
                style={{ backgroundColor: BRAND.green800 }}
              >
                Join Now
              </button>

              {/* Delivery Bag Authentic Photo Visual */}
              <div className="mt-auto pt-4 flex justify-center">
                <img
                  src={deliveryBagImg}
                  alt="VegGo Plus Delivery Kit"
                  referrerPolicy="no-referrer"
                  className="w-full max-h-36 object-contain rounded-xl drop-shadow-sm select-none"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 6. BOTTOM PROMOTIONAL BAR & FLOATING AI ================= */}
      <section id="bottom-promos-section" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-12">
        <Reveal>
          <div
            id="bottom-promotions-ribbon"
            className="rounded-3xl px-6 lg:px-10 py-7 flex flex-col md:flex-row items-center gap-6 relative shadow-md"
            style={{ backgroundColor: BRAND.green900 }}
          >
            {/* 4 Feature Promo Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 w-full">
              {PROMOS.map((p) => (
                <div key={p.id} className="flex items-start gap-3.5 text-white">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/15">
                    <p.icon className="w-5 h-5 text-[#A5D6A7]" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold">{p.title}</div>
                    <div className="text-[11px] text-[#C4DDC4] mb-2.5 max-w-[160px] leading-snug">{p.sub}</div>
                    <button
                      onClick={() => {
                        if (p.action === "spin") setIsSpinModalOpen(true);
                        else if (p.action === "reorder") alert("Loading your previous organic order items...");
                        else if (p.action === "recommendations") setIsAiModalOpen(true);
                        else alert("Today's Special: 1kg Fresh Farm Carrots @ ₹18.00");
                      }}
                      className="text-[11px] font-bold px-3.5 py-1.5 rounded-lg bg-white text-[#133E19] hover:bg-[#EAF6EA] transition-colors cursor-pointer shadow-2xs"
                    >
                      {p.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Pulse AI Assistant Badge on Ribbon */}
            <div
              id="ai-floating-ribbon-badge"
              onClick={() => setIsAiModalOpen(true)}
              className="anim-pulse-ai w-18 h-18 rounded-full bg-white flex flex-col items-center justify-center text-center shrink-0 shadow-xl cursor-pointer hover:scale-105 transition-transform select-none"
            >
              <Bot className="w-6 h-6 text-[#1E652B]" />
              <span className="text-[7.5px] font-black leading-tight text-[#133E19] mt-0.5">
                VegGo<br />AI Assistant
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= 7. FOOTER ================= */}
      <footer id="veggo-main-footer" className="border-t border-[#EEF3ED] bg-[#F5FAF4] pt-12 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-xl font-black text-[#1E652B]" style={fontDisplay}>VegGo</span>
                <span className="text-[9px] bg-[#EAF6EA] text-[#1E652B] font-bold px-2 py-0.5 rounded-full">FRESH</span>
              </div>
              <p className="text-xs text-[#59685E] leading-relaxed">
                Farm-fresh vegetables &amp; fruits handpicked every morning and delivered directly to your doorstep in 30–45 minutes.
              </p>
              <div className="flex items-center gap-3 mt-4 text-[#1E652B]">
                <a href="#instagram" className="w-7 h-7 rounded-full bg-white border border-[#DCE7DA] flex items-center justify-center hover:bg-[#EAF6EA] transition" aria-label="Instagram">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="#facebook" className="w-7 h-7 rounded-full bg-white border border-[#DCE7DA] flex items-center justify-center hover:bg-[#EAF6EA] transition" aria-label="Facebook">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="#twitter" className="w-7 h-7 rounded-full bg-white border border-[#DCE7DA] flex items-center justify-center hover:bg-[#EAF6EA] transition" aria-label="Twitter">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A241D] mb-3.5">Shop</div>
              <ul className="space-y-2 text-xs text-[#59685E]">
                {["Vegetables", "Fresh Fruits", "Leafy Greens", "Dairy & Milk", "Seasoning Herbs"].map((item) => (
                  <li key={item}>
                    <button onClick={() => setSelectedCategory("all")} className="hover:text-[#1E652B] hover:underline cursor-pointer">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A241D] mb-3.5">Company</div>
              <ul className="space-y-2 text-xs text-[#59685E]">
                {["About VegGo", "Become a Seller", "Farmer Partners", "Careers", "News & Blog"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-[#1E652B] hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A241D] mb-3.5">Support</div>
              <ul className="space-y-2 text-xs text-[#59685E]">
                {["Help Center", "Track Order", "Refund Policy", "Terms & Conditions", "Contact Us"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-[#1E652B] hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#DCE7DA] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78887D]">
            <div>© {new Date().getFullYear()} VegGo Fresh Technologies Pvt. Ltd. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Security</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL 1: SPIN & WIN REWARDS ================= */}
      {isSpinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center border border-[#D5EAD5]">
            <button
              onClick={() => setIsSpinModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#EAF6EA] text-[#1E652B] flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-black text-[#133E19]" style={fontDisplay}>
              Spin &amp; Win Daily Rewards
            </h3>
            <p className="text-xs text-[#59685E] mt-1 mb-5">
              Spin the lucky harvest wheel to unlock instant cashbacks and free delivery!
            </p>

            {/* Spin Wheel Visual */}
            <div className="relative w-52 h-52 mx-auto mb-6 flex items-center justify-center">
              <div
                className="w-full h-full rounded-full transition-all ease-out overflow-hidden border-4 border-[#2E7D32] shadow-lg"
                style={{
                  transform: `rotate(${spinAngle}deg)`,
                  transitionDuration: isSpinning ? "3.5s" : "0.2s",
                }}
              >
                <img
                  src={spinWheelImg}
                  alt="Lucky Wheel"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Wheel Pointer */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-16 border-t-[#E23B3B] z-10 filter drop-shadow-md" />
            </div>

            {spinReward && (
              <div className="p-3 bg-[#EAF6EA] border border-[#248337] rounded-xl text-xs font-bold text-[#133E19] mb-4 animate-in zoom-in-95">
                {spinReward}
              </div>
            )}

            <button
              onClick={handleSpinWheel}
              disabled={isSpinning}
              className={`w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition cursor-pointer ${
                isSpinning ? "opacity-60 cursor-not-allowed bg-gray-400" : "bg-[#1E652B] hover:brightness-95"
              }`}
            >
              {isSpinning ? "Spinning..." : "SPIN NOW"}
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: VEGGO AI ASSISTANT ================= */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#D5EAD5] flex flex-col h-[560px] overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-[#133E19] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#81C784]" />
                </div>
                <div>
                  <div className="text-sm font-bold">VegGo AI Assistant</div>
                  <div className="text-[10px] text-[#A5D6A7]">Online • Smart Fresh Guide</div>
                </div>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="p-1 rounded-lg hover:bg-white/10 cursor-pointer">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F9FCF9]">
              {aiChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#1E652B] text-white rounded-tr-xs"
                        : "bg-white border border-[#DCE7DA] text-[#1A241D] rounded-tl-xs shadow-2xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt suggestions */}
            <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto text-[11px]">
              <button
                onClick={() => setAiInput("What ingredients are needed for Sambar?")}
                className="px-2.5 py-1 rounded-full bg-[#EAF6EA] text-[#1E652B] hover:bg-[#D5EAD5] shrink-0 cursor-pointer"
              >
                🥘 Sambar Veggies
              </button>
              <button
                onClick={() => setAiInput("Suggest a healthy salad basket")}
                className="px-2.5 py-1 rounded-full bg-[#EAF6EA] text-[#1E652B] hover:bg-[#D5EAD5] shrink-0 cursor-pointer"
              >
                🥗 Salad Kit
              </button>
              <button
                onClick={() => setAiInput("What are today's top discount offers?")}
                className="px-2.5 py-1 rounded-full bg-[#EAF6EA] text-[#1E652B] hover:bg-[#D5EAD5] shrink-0 cursor-pointer"
              >
                🏷️ Best Coupons
              </button>
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                placeholder="Ask about recipes, calorie count, or ingredients..."
                className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-xl outline-hidden focus:border-[#1E652B]"
              />
              <button
                onClick={handleSendAiMessage}
                className="p-2.5 bg-[#1E652B] text-white rounded-xl hover:brightness-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: LOCATION SELECTOR ================= */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#D5EAD5]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-[#133E19]">Select Delivery Location</h4>
              <button onClick={() => setIsLocationModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {[
                "Kukatpally, Hyderabad",
                "Hitec City, Hyderabad",
                "Madhapur, Hyderabad",
                "Gachibowli, Hyderabad",
                "Jubilee Hills, Hyderabad",
              ].map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setActiveLocation(loc);
                    setIsLocationModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs text-left cursor-pointer transition ${
                    activeLocation === loc ? "bg-[#EAF6EA] text-[#1E652B] font-bold border border-[#248337]" : "hover:bg-gray-50 border border-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#248337]" />
                    {loc}
                  </span>
                  {activeLocation === loc && <Check className="w-4 h-4 text-[#248337]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= SLIDE-OVER: INTERACTIVE CART DRAWER ================= */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            {/* Drawer Header */}
            <div className="p-4 bg-[#133E19] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#81C784]" />
                <span className="font-bold text-sm">Your Fresh Cart ({cartCount} items)</span>
              </div>
              <button onClick={() => setIsCartDrawerOpen(false)} className="p-1 rounded-lg hover:bg-white/10 cursor-pointer">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-gray-100">
              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Your cart is empty.</p>
                </div>
              ) : (
                (Object.entries(cart) as [string, number][]).map(([id, qty]) => {
                  const prod = PRODUCTS.find((p) => p.id === id);
                  if (!prod) return null;
                  return (
                    <div key={id} className="pt-3 flex items-center justify-between gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1"
                      />
                      <div className="flex-1 leading-tight">
                        <div className="text-xs font-bold text-[#1A241D]">{prod.name}</div>
                        <div className="text-[10px] text-[#78887D]">{prod.weight}</div>
                        <div className="text-xs font-bold text-[#1E652B] mt-1">₹{(prod.price * Number(qty)).toFixed(2)}</div>
                      </div>
                      <div className="flex items-center rounded-lg border border-[#DCE7DA] overflow-hidden">
                        <button onClick={() => removeFromCart(id)} className="px-2 py-1 hover:bg-gray-100 text-xs cursor-pointer">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">{qty}</span>
                        <button onClick={() => addToCart(id)} className="px-2 py-1 hover:bg-gray-100 text-xs cursor-pointer">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Checkout Footer */}
            {Object.keys(cart).length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-[#F9FCF9]">
                <div className="space-y-1.5 text-xs text-[#59685E] mb-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-black">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee (30-45 mins)</span>
                    <span className="text-[#248337] font-semibold">FREE (VegGo Plus)</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#133E19] pt-1 border-t border-gray-200">
                    <span>Total Amount</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`🎉 Order placed successfully! Delivering to ${activeLocation} in 30 mins.`)}
                  className="w-full py-3 bg-[#1E652B] text-white font-bold text-xs rounded-xl shadow-md hover:brightness-95 cursor-pointer"
                >
                  PROCEED TO CHECKOUT (₹{cartTotal.toFixed(2)})
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setIsCartDrawerOpen(false)} />
        </div>
      )}
    </div>
  );
}
