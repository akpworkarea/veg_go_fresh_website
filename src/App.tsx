import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Leaf,
  ShieldCheck,
  Truck,
  Tag,
  RotateCcw,
  Sparkles,
  Bot,
  Share2,
  Globe,
  Send,
  Clock,
  Plus,
  Minus,
  Gift,
  Repeat,
  Percent,
  Star,
  ArrowRight,
  ChevronRight,
  Scissors,
  Milk,
  Egg,
  Wheat,
  Cherry,
  Flower2,
  Grid3x3,
  Salad,
  Check,
  Coffee,
  CreditCard,
  Heart,
  Phone,
  Mail,
  Smartphone,
  Shield,
  Award,
} from "lucide-react";

// Real uploaded brand assets
import logoImg from "./assets/images/logo.png";
import heroBasket from "./assets/images/hero-basket-removebg-preview.png";
import flashSaleBanner from "./assets/images/flash_sale_fresh_1787042855288.jpg";
import coolerBag from "./assets/images/veggo_cooler_bag_1787042808407.jpg";

/* ---------------------------------------------------------------------- */
/*  Figma Brand Color Palette                                             */
/* ---------------------------------------------------------------------- */
const BRAND = {
  forestGreen: "#135029", // Primary CTA button & dark green
  leafGreen: "#228B22",   // Fresh accent green
  lightMintBg: "#EAF5E9", // Hero & membership container background
  sidebarBg: "#F4FAF4",   // Category sidebar background
  bannerDark: "#0E4823",  // Bottom promo bar background
  creamSale: "#FAF5EA",   // Flash sale container background
  textDark: "#111827",    // Main headings
  textMuted: "#5F6D63",   // Body/descriptions
  borderLight: "#E2EFE0", // Subtle card borders
  badgeRed: "#E03838",
  badgeGold: "#EAA023",
};

/* ---------------------------------------------------------------------- */
/*  Category items from Figma                                             */
/* ---------------------------------------------------------------------- */
const CATEGORIES = [
  { name: "Vegetables", icon: Salad, active: true },
  { name: "Fruits", icon: Cherry },
  { name: "Leafy Greens", icon: Leaf },
  { name: "Herbs & Seasoning", icon: Scissors },
  { name: "Exotic Vegetables", icon: Sparkles },
  { name: "Dairy Products", icon: Milk },
  { name: "Eggs", icon: Egg },
  { name: "Pulses & Grains", icon: Wheat },
  { name: "Rice & Millets", icon: Grid3x3 },
  { name: "Beverages", icon: Coffee },
  { name: "Plants & Pots", icon: Flower2 },
];

/* ---------------------------------------------------------------------- */
/*  6 Trust / Value propositions from Figma                               */
/* ---------------------------------------------------------------------- */
const FEATURES = [
  { icon: Leaf, title: "Farm Fresh", sub: "Handpicked Daily" },
  { icon: ShieldCheck, title: "No Chemicals", sub: "Pure & Healthy" },
  { icon: Truck, title: "30–45 mins Delivery", sub: "Fast & Reliable" },
  { icon: CreditCard, title: "Secure Payments", sub: "100% Safe" },
  { icon: Tag, title: "Best Prices", sub: "On All Products" },
  { icon: RotateCcw, title: "Easy Returns", sub: "Hassle Free" },
];

/* ---------------------------------------------------------------------- */
/*  Best Selling Products (Rich Style in 1 Single Line of 5 Items)        */
/* ---------------------------------------------------------------------- */
interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  mrp: number;
  discount: string;
  rating: number;
  reviews: number;
  tag?: string;
  img: string;
}

const PRODUCTS: Product[] = [
  {
    id: "tomato",
    name: "Farm Fresh Tomato",
    weight: "1 kg",
    price: 25,
    mrp: 35,
    discount: "28% OFF",
    rating: 4.8,
    reviews: 142,
    tag: "Fresh Pick",
    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "onion",
    name: "Red Nashik Onion",
    weight: "1 kg",
    price: 28,
    mrp: 40,
    discount: "30% OFF",
    rating: 4.9,
    reviews: 210,
    tag: "Daily Essential",
    img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "potato",
    name: "Golden Baby Potato",
    weight: "1 kg",
    price: 22,
    mrp: 30,
    discount: "26% OFF",
    rating: 4.7,
    reviews: 98,
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "banana",
    name: "Robusta Banana",
    weight: "1 dozen",
    price: 40,
    mrp: 60,
    discount: "33% OFF",
    rating: 4.9,
    reviews: 312,
    tag: "Organic",
    img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "apple",
    name: "Shimla Royal Apple",
    weight: "4 pcs (~600g)",
    price: 120,
    mrp: 160,
    discount: "25% OFF",
    rating: 4.9,
    reviews: 184,
    tag: "Premium",
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80",
  },
];

/* ---------------------------------------------------------------------- */
/*  Countdown Hook for Flash Sale                                         */
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
  const [cart, setCart] = useState<Record<string, number>>({
    tomato: 1,
    banana: 1,
    apple: 1,
  });
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    tomato: true,
    apple: true,
  });
  const [mobileNav, setMobileNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Vegetables");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const { h, m, s } = useCountdown(2 * 3600 + 45 * 60 + 30);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const addToCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      const item = PRODUCTS.find((p) => p.id === id);
      showToast(`Added ${item?.name || "item"} to cart`);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? "Saved to wishlist" : "Removed from wishlist");
      return next;
    });
  };

  const cartCount = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);
  const cartTotal = (Object.entries(cart) as [string, number][]).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((prod) => prod.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const fontHead = { fontFamily: "'Poppins', sans-serif" };
  const fontBody = { fontFamily: "'Inter', sans-serif" };

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800 flex flex-col" style={fontBody}>
      {/* ================= TOAST ================= */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#135029] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-emerald-400/30">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ================= TOP UTILITY BAR ================= */}
      <div className="bg-[#EAF6EA] text-[#1E5F26] border-b border-[#D8EBD7] px-4 lg:px-10 py-1.5 text-xs hidden md:flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-1.5 font-medium">
          <Leaf className="w-3.5 h-3.5 text-[#228B22]" />
          <span>Eat Fresh, Live Healthy</span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-1 cursor-pointer hover:opacity-90 transition">
          <MapPin className="w-3.5 h-3.5 text-[#228B22]" />
          <span>Delivering to: <strong className="font-semibold text-[#113B1E]">Kukatpally, Hyderabad</strong></span>
          <ChevronDown className="w-3 h-3 text-slate-500 ml-0.5" />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-[11px] font-medium text-[#1E5F26]">
          <button onClick={() => showToast("Seller portal opening soon")} className="hover:underline">
            Become a Seller
          </button>
          <span className="text-[#C2DEC1]">|</span>
          <button onClick={() => showToast("Special 50% discount code active: FRESH50")} className="hover:underline">
            Offers
          </button>
          <span className="text-[#C2DEC1]">|</span>
          <button onClick={() => showToast("Support: support@veggofresh.com")} className="hover:underline">
            Help &amp; Support
          </button>
          <div className="flex items-center gap-2.5 ml-2 pl-3 border-l border-[#C2DEC1]">
            <Share2 className="w-3.5 h-3.5 cursor-pointer hover:text-black transition" />
            <Globe className="w-3.5 h-3.5 cursor-pointer hover:text-black transition" />
            <Send className="w-3.5 h-3.5 cursor-pointer hover:text-black transition" />
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER NAVBAR ================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EEF4ED] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileNav(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-emerald-50 text-slate-700"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo Image from User Asset */}
          <div className="flex items-center cursor-pointer shrink-0">
            <img src={logoImg} alt="VegGo FRESH" className="h-10 md:h-11 w-auto object-contain" />
          </div>

          {/* "All Categories" Button */}
          <button
            id="header-all-categories"
            onClick={() => showToast("All categories menu clicked")}
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-xs font-bold tracking-wide shrink-0 transition hover:brightness-105 active:scale-98 shadow-2xs"
            style={{ backgroundColor: BRAND.forestGreen }}
          >
            <Menu className="w-4 h-4" />
            <span>All Categories</span>
          </button>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-xl hidden sm:flex items-center border border-[#DCE8DA] rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#228B22]/30 transition">
            <input
              id="header-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for vegetables, fruits and more..."
              className="flex-1 px-4 py-2 text-xs md:text-sm outline-none text-slate-700 placeholder:text-slate-400 min-w-0"
            />
            <div className="flex items-center gap-1 px-3 border-l border-[#DCE8DA] text-xs text-slate-500 bg-slate-50/50 cursor-pointer">
              <span>All</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <button
              onClick={() => showToast(`Searching for "${searchQuery || "fresh produce"}"`)}
              className="px-3.5 py-2.5 text-white transition hover:brightness-105"
              style={{ backgroundColor: BRAND.forestGreen }}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* VegGo AI Assistant Button Widget */}
            <div
              id="header-ai-assistant"
              onClick={() => setAiModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F0F8EE] border border-[#D5EAD3] cursor-pointer hover:bg-[#E5F3E3] transition shadow-2xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#135029] flex items-center justify-center text-emerald-200">
                <Bot className="w-4 h-4" />
              </div>
              <div className="leading-tight text-left hidden sm:block">
                <div className="text-[11px] font-bold text-[#113B1E]">VegGo</div>
                <div className="text-[9px] text-[#4A7C54] font-medium">AI Assistant</div>
              </div>
            </div>

            {/* My Account */}
            <div
              id="header-my-account"
              onClick={() => showToast("Account: Hello Shiva")}
              className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            >
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 bg-slate-50">
                <User className="w-4 h-4" />
              </div>
              <div className="leading-tight text-left">
                <div className="text-[10px] text-slate-500 font-medium">My Account</div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-0.5">
                  <span>Hello, Shiva</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Cart Trigger */}
            <div
              id="header-cart-btn"
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition select-none"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-[#111827]" />
                <span
                  className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-white font-extrabold shadow-2xs"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  {cartCount}
                </span>
              </div>
              <div className="leading-tight text-left hidden sm:block">
                <div className="text-[10px] text-slate-500 font-medium">Cart</div>
                <div className="text-xs font-bold text-[#111827]">₹{cartTotal.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT BODY ================= */}
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 space-y-6 flex-1 w-full">
        {/* ================= HERO SECTION & CATEGORY SIDEBAR (Single Row) ================= */}
        <section className="flex flex-col lg:flex-row gap-5 items-stretch">
          {/* LEFT: Category Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 rounded-2xl p-2.5 border border-[#E2EFE0] bg-[#F4FAF4] shadow-xs self-stretch flex flex-col justify-between">
            <div className="space-y-0.5">
              {CATEGORIES.map((c) => {
                const isSelected = selectedCategory === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedCategory(c.name);
                      showToast(`Filtered by ${c.name}`);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                      isSelected
                        ? "bg-[#E2F0E0] text-[#135029] shadow-2xs"
                        : "text-slate-700 hover:bg-white hover:text-[#135029]"
                    }`}
                  >
                    <c.icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? "text-[#135029]" : "text-[#2E7D32]"
                      }`}
                    />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>

            {/* View All Categories Link */}
            <button
              onClick={() => showToast("Viewing full catalog")}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#135029] hover:bg-white transition mt-2 pt-2 border-t border-[#E2EFE0]"
            >
              <Grid3x3 className="w-4 h-4 text-[#2E7D32]" />
              <span>View All Categories</span>
            </button>
          </aside>

          {/* RIGHT: Hero Banner (Clean, solid, perfectly unified mint canvas) */}
          <div
            className="flex-1 rounded-2xl overflow-hidden relative border border-[#DCEAD9] p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between shadow-xs bg-[#EAF5E9]"
          >
            {/* Left text column */}
            <div className="relative z-10 flex-1 max-w-xl text-left">
              {/* 100% FARM FRESH Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#CDE5CC] text-[11px] font-bold text-[#1E5F26] mb-4 shadow-2xs">
                <Leaf className="w-3.5 h-3.5 text-[#228B22]" />
                <span>100% FARM FRESH</span>
              </div>

              {/* Main Heading matching Figma */}
              <h1
                className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] text-[#111827]"
                style={fontHead}
              >
                Fresh Vegetables &amp; Fruits
                <br />
                <span className="text-[#228B22]">Delivered To Your Home</span>
              </h1>

              {/* Subtext */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Handpicked &nbsp;•&nbsp; Hygienically Packed &nbsp;•&nbsp; On-time Delivery
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  id="hero-shop-now-btn"
                  onClick={() => {
                    const el = document.getElementById("best-sellers-heading");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-white text-xs sm:text-sm font-bold tracking-wide transition hover:brightness-110 active:scale-95 shadow-xs"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-explore-offers-btn"
                  onClick={() => showToast("50% OFF Flash Sale active below!")}
                  className="px-5 py-3 rounded-lg text-xs sm:text-sm font-bold text-slate-800 bg-white border border-[#D2E4D0] hover:bg-[#F4FAF4] transition active:scale-95 shadow-2xs"
                >
                  Explore Offers
                </button>
              </div>

              {/* Delivery time note */}
              <div className="flex items-center gap-2 mt-5 text-xs text-slate-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#228B22]" />
                <span>Delivery in 30–45 mins</span>
              </div>

              {/* Carousel Indicators from Figma (5 dots) */}
              <div className="flex items-center gap-1.5 mt-6">
                <span className="w-5 h-1.5 rounded-full bg-[#135029]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C2DEC1]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C2DEC1]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C2DEC1]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C2DEC1]" />
              </div>
            </div>

            {/* Right basket image with Freshness Guarantee Seal */}
            <div className="relative z-10 w-full lg:w-[460px] h-64 sm:h-72 lg:h-84 shrink-0 flex items-center justify-center mt-6 lg:mt-0">
              {/* Basket Image (transparent background seamlessly reveals the #EAF5E9 container) */}
              <img
                src={heroBasket}
                alt="Fresh Vegetables Basket"
                className="w-full h-full object-contain select-none"
                referrerPolicy="no-referrer"
              />

              {/* Freshness GUARANTEE circular seal badge from Figma */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white border-2 border-[#135029] p-1 shadow-lg flex flex-col items-center justify-center text-center select-none animate-pulse-slow">
                <div className="flex items-center justify-center text-[#228B22]">
                  <Leaf className="w-4 h-4 fill-[#228B22]" />
                </div>
                <div className="text-[8px] sm:text-[9px] font-bold leading-tight text-[#135029] uppercase mt-0.5">
                  Freshness
                  <br />
                  <strong className="font-extrabold text-[9px] sm:text-[10px]">GUARANTEE</strong>
                </div>
                {/* Scalloped decorative ribbon bottom */}
                <div className="absolute -bottom-1.5 w-6 h-2 bg-[#E03838] rounded-sm flex items-center justify-center">
                  <span className="text-[6px] text-white font-bold">100%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6 FEATURE VALUE PROPOSITIONS (Figma Row) ================= */}
        <section className="bg-white rounded-2xl border border-[#EEF4ED] px-4 sm:px-8 py-5 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`flex items-center gap-3 ${i > 0 ? "lg:pl-5 pt-3 sm:pt-0" : ""}`}
              >
                <div className="w-9 h-9 rounded-full bg-[#EAF6EA] flex items-center justify-center shrink-0 text-[#135029]">
                  <f.icon className="w-4 h-4 text-[#228B22]" />
                </div>
                <div className="leading-tight text-left min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{f.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 3-COLUMN SECTION (Flash Sale, Best Sellers in 1 Line of 5, Membership) ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Column 1: FLASH SALE (3 cols) */}
          <div
            className="lg:col-span-3 rounded-2xl p-5 border border-[#F2E8D5] flex flex-col justify-between shadow-xs relative overflow-hidden"
            style={{ backgroundColor: BRAND.creamSale }}
          >
            {/* Header + Red Badge */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[#E03838] flex items-center gap-1">
                  FLASH SALE ⚡
                </span>
                <span className="w-6 h-6 rounded-full bg-[#E03838] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                  %
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900" style={fontHead}>
                Up to <span className="text-[#228B22]">50% OFF</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">On Selected Products</p>

              {/* Countdown Boxes */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-[#EAF6EA] border border-[#D5EAD3] rounded-lg py-1.5 text-[#135029]">
                  <div className="text-sm font-extrabold">{h}</div>
                  <div className="text-[9px] uppercase font-medium text-slate-500">Hours</div>
                </div>
                <div className="bg-[#EAF6EA] border border-[#D5EAD3] rounded-lg py-1.5 text-[#135029]">
                  <div className="text-sm font-extrabold">{m}</div>
                  <div className="text-[9px] uppercase font-medium text-slate-500">Mins</div>
                </div>
                <div className="bg-[#EAF6EA] border border-[#D5EAD3] rounded-lg py-1.5 text-[#135029]">
                  <div className="text-sm font-extrabold">{s}</div>
                  <div className="text-[9px] uppercase font-medium text-slate-500">Secs</div>
                </div>
              </div>
            </div>

            {/* Veggies Graphic */}
            <div className="my-3 flex justify-center">
              <img
                src={flashSaleBanner}
                alt="Flash Sale items"
                className="h-24 w-auto object-contain mix-blend-multiply rounded-lg"
              />
            </div>

            {/* Shop Now button */}
            <button
              onClick={() => showToast("Loading Flash Sale deals...")}
              className="w-full py-2.5 rounded-lg text-white text-xs font-bold transition hover:brightness-110 shadow-xs"
              style={{ backgroundColor: BRAND.forestGreen }}
            >
              Shop Now
            </button>
          </div>

          {/* Column 2: Best Selling Products (6 cols - EXACT previous rich card style in ONE single row of 5 products) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EEF4ED] p-4 sm:p-5 flex flex-col justify-between shadow-xs">
            {/* Heading row */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 id="best-sellers-heading" className="text-base sm:text-lg font-bold text-slate-900" style={fontHead}>
                  Best Selling Products
                </h3>
                <p className="text-[11px] text-slate-400">Most popular organic arrivals today</p>
              </div>
              <button
                onClick={() => showToast("Showing all best-sellers")}
                className="text-xs font-bold text-[#228B22] flex items-center gap-1 hover:underline shrink-0"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 1 Single Line of 5 Products with rich interactive card styling */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {PRODUCTS.map((p) => {
                const inCartQty = cart[p.id] || 0;
                const isFav = favorites[p.id] || false;
                return (
                  <div
                    key={p.id}
                    className="rounded-xl border border-slate-100 p-2 sm:p-2.5 flex flex-col justify-between bg-white hover:border-[#C8E4C5] hover:shadow-md transition-all duration-200 group relative"
                  >
                    {/* Top Badges Row: Discount & Heart */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#EAF6EA] text-[#1E5F26]">
                        {p.discount}
                      </span>
                      <button
                        onClick={() => toggleFavorite(p.id)}
                        className="text-slate-300 hover:text-red-500 transition p-0.5"
                        aria-label="Favorite"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                      </button>
                    </div>

                    {/* Product Image Container */}
                    <div className="h-20 sm:h-22 w-full flex items-center justify-center overflow-hidden rounded-lg bg-[#F8FAF8] mb-1.5 relative group-hover:bg-[#F2F8F1] transition">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-full w-full object-cover group-hover:scale-108 transition duration-300 rounded-md"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 mb-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-700">{p.rating}</span>
                      <span className="text-slate-400 text-[9px]">({p.reviews})</span>
                    </div>

                    {/* Product Name & Weight */}
                    <div className="text-left mb-2">
                      <div className="text-xs font-bold text-slate-900 truncate group-hover:text-[#135029] transition">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{p.weight}</div>
                    </div>

                    {/* Price & Interactive Cart Button */}
                    <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between">
                      <div className="leading-tight text-left">
                        <div className="text-xs font-extrabold text-slate-900">₹{p.price}</div>
                        <div className="text-[9px] text-slate-400 line-through">₹{p.mrp}</div>
                      </div>

                      {inCartQty > 0 ? (
                        <div className="flex items-center gap-1 bg-[#135029] text-white rounded-lg px-1 py-0.5 shadow-2xs">
                          <button
                            onClick={() => removeFromCart(p.id)}
                            className="w-4 h-4 flex items-center justify-center hover:opacity-80 active:scale-90"
                            aria-label="Decrease"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-[11px] font-bold w-3 text-center">{inCartQty}</span>
                          <button
                            onClick={() => addToCart(p.id)}
                            className="w-4 h-4 flex items-center justify-center hover:opacity-80 active:scale-90"
                            aria-label="Increase"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(p.id)}
                          className="px-2 py-1 rounded-md bg-[#135029] text-white text-[10px] font-bold hover:bg-[#1E7D32] transition active:scale-95 flex items-center gap-0.5 shadow-2xs"
                          aria-label={`Add ${p.name}`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: VegGo Plus Membership (3 cols) */}
          <div
            className="lg:col-span-3 rounded-2xl p-5 border border-[#D8EBD7] flex flex-col justify-between shadow-xs"
            style={{ backgroundColor: BRAND.lightMintBg }}
          >
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#113B1E]" style={fontHead}>
                VegGo Plus
                <br />
                Membership
              </h3>

              <ul className="mt-3 space-y-1.5 text-xs text-[#1E5F26] font-medium text-left">
                {["Free Delivery", "Exclusive Offers", "Extra Discounts", "Priority Support"].map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#135029] text-white text-[8px] font-bold flex items-center justify-center">
                      ✓
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cooler bag image with fresh produce */}
            <div className="my-2 flex justify-center">
              <img
                src={coolerBag}
                alt="VegGo Cooler Bag"
                className="h-24 w-auto object-contain mix-blend-multiply"
              />
            </div>

            {/* Join Now Button */}
            <button
              onClick={() => showToast("🎉 VegGo Plus 30-day Free Trial Activated!")}
              className="w-full py-2.5 rounded-lg text-white text-xs font-bold transition hover:brightness-110 shadow-xs"
              style={{ backgroundColor: BRAND.forestGreen }}
            >
              Join Now
            </button>
          </div>
        </section>

        {/* ================= BOTTOM PROMO STRIP (Dark Forest Green Banner from Figma) ================= */}
        <section
          className="rounded-2xl p-5 sm:p-6 text-white relative shadow-md overflow-hidden"
          style={{ backgroundColor: BRAND.bannerDark }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {/* Promo 1: Spin & Win */}
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Gift className="w-5 h-5 text-amber-300" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold">Spin &amp; Win</div>
                <div className="text-[10px] text-white/70">Win exciting rewards everyday</div>
                <button
                  onClick={() => showToast("Spinning wheel... You won ₹50 VegGo cashback!")}
                  className="px-3 py-1 rounded-md bg-white text-[#135029] text-[10px] font-bold hover:bg-slate-100 transition mt-1"
                >
                  Spin Now
                </button>
              </div>
            </div>

            {/* Promo 2: Buy Again */}
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Repeat className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold">Buy Again</div>
                <div className="text-[10px] text-white/70">Reorder your favourite items</div>
                <button
                  onClick={() => showToast("Reordering last basket (Tomatoes & Apples)")}
                  className="px-3 py-1 rounded-md bg-white text-[#135029] text-[10px] font-bold hover:bg-slate-100 transition mt-1"
                >
                  Buy Again
                </button>
              </div>
            </div>

            {/* Promo 3: Smart Recommendations */}
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold">Smart Recommendations</div>
                <div className="text-[10px] text-white/70">Handpicked for you based on your choice</div>
                <button
                  onClick={() => showToast("Loaded AI recommendations")}
                  className="px-3 py-1 rounded-md bg-white text-[#135029] text-[10px] font-bold hover:bg-slate-100 transition mt-1"
                >
                  Explore
                </button>
              </div>
            </div>

            {/* Promo 4: Today's Offers */}
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Percent className="w-5 h-5 text-emerald-200" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold">Today's Offers</div>
                <div className="text-[10px] text-white/70">Grab the best deals of the day!</div>
                <button
                  onClick={() => showToast("50% off deals highlighted")}
                  className="px-3 py-1 rounded-md bg-white text-[#135029] text-[10px] font-bold hover:bg-slate-100 transition mt-1"
                >
                  View Offers
                </button>
              </div>
            </div>
          </div>

          {/* Floating AI Assistant circular widget on bottom right from Figma */}
          <div
            onClick={() => setAiModalOpen(true)}
            className="hidden xl:flex absolute bottom-3 right-4 bg-white text-[#135029] rounded-full px-3 py-2 items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition border-2 border-emerald-400 select-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#135029] flex items-center justify-center text-emerald-200">
              <Bot className="w-4 h-4" />
            </div>
            <div className="leading-tight text-left pr-1">
              <div className="text-[11px] font-bold text-[#113B1E]">VegGo</div>
              <div className="text-[9px] text-[#4A7C54] font-medium">AI Assistant</div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= COMPREHENSIVE RICH FOOTER ================= */}
      <footer className="mt-16 bg-white border-t border-[#E8F2E6]">
        {/* Top Feature Highlights Bar */}
        <div className="border-b border-slate-100 bg-[#F9FCF9] py-8 px-4 lg:px-8">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <Truck className="w-5 h-5 text-[#228B22]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Express Delivery</h4>
                <p className="text-[11px] text-slate-500">Fresh at your door in 30-45 mins</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <ShieldCheck className="w-5 h-5 text-[#228B22]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">100% Organic &amp; Pure</h4>
                <p className="text-[11px] text-slate-500">Zero chemical fertilizers used</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <RotateCcw className="w-5 h-5 text-[#228B22]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Instant Hassle-Free Returns</h4>
                <p className="text-[11px] text-slate-500">No questions asked refund</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <Award className="w-5 h-5 text-[#228B22]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Direct From Local Farmers</h4>
                <p className="text-[11px] text-slate-500">Fair trade pricing guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="max-w-[1400px] mx-auto py-12 px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-left">
            {/* Col 1: Brand & Contact Info */}
            <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
              <img src={logoImg} alt="VegGo FRESH" className="h-10 w-auto object-contain" />
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                VegGo Fresh brings you farm-harvested vegetables, seasonal fruits, organic greens, and daily dairy essentials harvested at dawn and delivered right to your kitchen.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#228B22]" />
                  <span>Helpline: <strong>+91 1800-425-8344</strong> (Toll Free)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#228B22]" />
                  <span>Email: <strong>support@veggofresh.com</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#228B22]" />
                  <span>Hub: Road No. 12, Kukatpally, Hyderabad, TS 500072</span>
                </div>
              </div>
            </div>

            {/* Col 2: Popular Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900" style={fontHead}>
                Popular Categories
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {["Fresh Vegetables", "Exotic & Organic Fruits", "Hydroponic Greens", "Dairy & Farm Eggs", "Millet Grains & Pulses", "Aromatic Herbs & Spices"].map((item) => (
                  <li key={item}>
                    <button onClick={() => showToast(`Filtering ${item}`)} className="hover:text-[#135029] transition">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Company & Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900" style={fontHead}>
                Company
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {["About VegGo", "Partner With Us (Farmers)", "Become a Delivery Partner", "VegGo Plus Membership", "Quality Assurance Lab", "Careers & Culture"].map((item) => (
                  <li key={item}>
                    <button onClick={() => showToast(item)} className="hover:text-[#135029] transition">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: App Download & Payment Partners */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900" style={fontHead}>
                Download Our App
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Enjoy exclusive app-only coupons and live GPS order tracking.
              </p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => showToast("Opening App Store link")}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs hover:bg-slate-800 transition"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <div className="text-left">
                    <div className="text-[8px] text-slate-400 leading-tight">GET IT ON</div>
                    <div className="text-[11px] font-bold leading-tight">Google Play &amp; iOS</div>
                  </div>
                </button>
              </div>

              <div className="pt-3">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  100% Secure Payments
                </h5>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <CreditCard className="w-4 h-4 text-slate-600" />
                  <span className="text-[10px] text-slate-500 font-medium">UPI • Cards • NetBanking • COD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="border-t border-slate-100 py-6 px-4 lg:px-8 bg-slate-50 text-[11px] text-slate-500">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} <strong>VegGo Fresh Technologies Pvt. Ltd.</strong> All rights reserved.
            </div>
            <div className="flex items-center gap-5">
              <button onClick={() => showToast("Privacy Policy")} className="hover:underline">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => showToast("Terms of Use")} className="hover:underline">
                Terms of Use
              </button>
              <span>•</span>
              <button onClick={() => showToast("Security & FSSAI Lic. #10020042000189")} className="hover:underline">
                FSSAI Certified
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= SLIDE-OVER CART DRAWER ================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F4FAF4]">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#135029]" />
                <h3 className="font-bold text-base text-slate-900" style={fontHead}>
                  My Cart ({cartCount} items)
                </h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cartCount === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                  <ShoppingCart className="w-12 h-12 mb-3 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-700">Your basket is empty</p>
                  <p className="text-xs text-slate-400 mt-1">Add fresh items from our catalog</p>
                </div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const p = PRODUCTS.find((prod) => prod.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <img src={p.img} alt={p.name} className="w-14 h-14 rounded-lg object-cover bg-white" />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                        <div className="text-[10px] text-slate-500">{p.weight}</div>
                        <div className="text-xs font-bold text-[#135029] mt-0.5">₹{p.price.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#135029] rounded-lg p-1 text-white">
                        <button
                          onClick={() => removeFromCart(id)}
                          className="w-5 h-5 flex items-center justify-center hover:opacity-80"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-3 text-center">{qty}</span>
                        <button
                          onClick={() => addToCart(id)}
                          className="w-5 h-5 flex items-center justify-center hover:opacity-80"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cartCount > 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#135029] font-medium">
                    <span>Delivery (30-45 mins)</span>
                    <span className="uppercase font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-[#135029]">₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    showToast("🎉 Order placed! Fast delivery dispatched.");
                    setCart({});
                    setCartOpen(false);
                  }}
                  className="w-full py-3 rounded-lg text-white font-bold text-xs tracking-wide shadow-md transition hover:brightness-110 flex items-center justify-center gap-2"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  <span>Proceed to Checkout (₹{cartTotal.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xs" onClick={() => setCartOpen(false)} />
        </div>
      )}

      {/* ================= AI RECIPE MODAL ================= */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#D5EAD3] overflow-hidden flex flex-col animate-fade-in">
            <div className="p-4 bg-[#135029] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-300" />
                <h3 className="text-sm font-bold">VegGo Smart Assistant</h3>
              </div>
              <button onClick={() => setAiModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-left text-xs bg-[#F4FAF4]">
              <div className="p-3 bg-white rounded-xl border border-[#D5EAD3] text-slate-700 shadow-2xs">
                👋 Hello Shiva! What would you like to cook today with our fresh farm arrivals?
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Fresh Tomato Soup Recipe", "How to keep Greens fresh", "Healthy 15-min Salads"].map((q) => (
                  <button
                    key={q}
                    onClick={() => showToast(`AI Tip loaded for: ${q}`)}
                    className="px-2.5 py-1 rounded-full bg-white border border-[#C2DEC1] text-[#135029] font-medium hover:bg-[#EAF6EA] transition text-[11px]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black/40 -z-10" onClick={() => setAiModalOpen(false)} />
        </div>
      )}

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col text-left">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <img src={logoImg} alt="VegGo FRESH" className="h-9 w-auto object-contain" />
              <button onClick={() => setMobileNav(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 flex-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedCategory(c.name);
                    setMobileNav(false);
                    showToast(`Selected ${c.name}`);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    selectedCategory === c.name ? "bg-[#EAF6EA] text-[#135029]" : "text-slate-700"
                  }`}
                >
                  <c.icon className="w-4 h-4 text-[#2E7D32]" />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileNav(false)} />
        </div>
      )}
    </div>
  );
}
