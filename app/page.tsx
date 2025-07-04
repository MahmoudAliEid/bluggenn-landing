"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/locale";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Meteors } from "@/components/ui/meteors";
import {
  MessageCircle,
  Instagram,
  Mail,
  Phone,
  Zap,
  Shield,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Star,
  ArrowRight,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Magnetic Wireless Power Bank",
    nameAr: "بنك طاقة مغناطيسي لاسلكي",
    description:
      "Ultra-compact magnetic power bank with 15W wireless charging. Small enough, lightweight enough, easy to take out.",
    descriptionAr:
      "بنك طاقة مغناطيسي فائق الصغر مع شحن لاسلكي 15 واط. صغير بما فيه الكفاية، خفيف بما فيه الكفاية، سهل الحمل.",
    features: [
      "15W Wireless Charging",
      "PD20W Fast Charge",
      "Magnetic Attachment",
      "Ultra Compact",
    ],
    featuresAr: [
      "شحن لاسلكي 15 واط",
      "شحن سريع PD20W",
      "تثبيت مغناطيسي",
      "فائق الصغر",
    ],
    images: [
      "/products/lifestyle-1.jpeg",
      "/products/product1-2.jpeg",
      "/products/product1-3.jpeg",
      "/products/product1-4.jpeg",
    ],
    category: "Lifestyle",
    categoryAr: "أسلوب حياة",
  },
  {
    id: 2,
    name: "Wireless Charging Station",
    nameAr: "محطة شحن لاسلكية",
    description:
      "Premium wireless charging pad with digital display and fast charging capabilities for all your devices.",
    descriptionAr:
      "لوحة شحن لاسلكية فاخرة مع شاشة رقمية وقدرات شحن سريعة لجميع أجهزتك.",
    features: [
      "Digital Display",
      "15W Fast Charging",
      "Universal Compatibility",
      "Sleek Design",
    ],
    featuresAr: ["شاشة رقمية", "شحن سريع 15 واط", "توافق عام", "تصميم أنيق"],
    images: [
      "/products/wireless-pad-1.jpeg",
      "/products/wireless-pad-2.jpeg",
      "/products/wireless-pad-3.jpeg",
      "/products/wireless-pad-4.jpeg",
    ],
    category: "Charging Station",
    categoryAr: "محطة شحن",
  },
  {
    id: 3,
    name: "Premium Power Bank Collection",
    nameAr: "مجموعة بنوك طاقة متميزة",
    description:
      "Aluminum alloy construction with PD20W/15W charging capabilities in multiple elegant colors.",
    descriptionAr:
      "تصميم من سبائك الألمنيوم مع قدرات شحن PD20W/15W بألوان أنيقة متعددة.",
    features: [
      "Aluminum Alloy",
      "PD20W/15W",
      "Multiple Colors",
      "Premium Build",
    ],
    featuresAr: ["سبائك الألمنيوم", "PD20W/15W", "ألوان متعددة", "تصميم متميز"],
    images: [
      "/products/product2-1.jpeg",
      "/products/product2-2.jpeg",
      "/products/product1-2.jpeg",
      "/products/product1-3.jpeg",
    ],
    category: "Power Bank",
    categoryAr: "بنك طاقة",
  },
];

export default function BluggennLanding() {
  const { locale, setLocale, t } = useLocale();
  const isArabic = locale === "ar";

  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Language switcher
  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    setLocale(newLocale);

    // Update HTML attributes for RTL support
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
  };

  // Update HTML attributes on locale change
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const movingCardItems = [
    {
      image: "/products/lifestyle-1.jpeg",
      title: isArabic ? "محمول وصغير" : "Compact & Portable",
      description: isArabic
        ? "صغير بما فيه الكفاية، خفيف بما فيه الكفاية، سهل الحمل"
        : "Small enough, lightweight enough, easy to take out",
    },
    {
      image: "/products/wireless-pad-1.jpeg",
      title: isArabic ? "شاشة ذكية" : "Smart Display",
      description: isArabic
        ? "شاشة رقمية تظهر حالة الشحن"
        : "Digital display shows charging status",
    },
    {
      image: "/products/product2-1.jpeg",
      title: isArabic ? "مواد متميزة" : "Premium Materials",
      description: isArabic
        ? "تصميم من سبائك الألمنيوم للمتانة"
        : "Aluminum alloy construction for durability",
    },
  ];

  useEffect(() => {
    const intervals: { [key: number]: NodeJS.Timeout } = {};

    products.forEach((product) => {
      intervals[product.id] = setInterval(() => {
        setCurrentImageIndex((prev) => ({
          ...prev,
          [product.id]: ((prev[product.id] || 0) + 1) % product.images.length,
        }));
      }, 4000);
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, []);

  const nextImage = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [productId]: ((prev[productId] || 0) + 1) % product.images.length,
      }));
    }
  };

  const prevImage = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [productId]:
          ((prev[productId] || 0) - 1 + product.images.length) %
          product.images.length,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50 header-height"
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div
            className={`flex items-center ${
              isArabic ? "space-x-reverse space-x-1" : "space-x-1"
            }`}
          >
            <Image
              src="/logo-new.png"
              alt="Bluggenn"
              width={130}
              height={130}
            />
          </div>

          <nav
            className={`hidden md:flex items-center ${
              isArabic ? "space-x-reverse space-x-8" : "space-x-8"
            }`}
          >
            <Link
              href="#home"
              className="text-gray-300 hover:text-[#22c55e] transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-[#22c55e] transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="#products"
              className="text-gray-300 hover:text-[#22c55e] transition-colors"
            >
              {t("nav.products")}
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-[#22c55e] transition-colors"
            >
              {t("nav.contact")}
            </Link>
          </nav>

          <div
            className={`flex items-center ${
              isArabic ? "space-x-reverse space-x-4" : "space-x-4"
            }`}
          >
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={switchLanguage}
              className="text-gray-300 hover:text-[#22c55e] transition-colors border border-gray-700 hover:border-[#22c55e]/50"
            >
              <Globe className={`h-4 w-4 ${isArabic ? "ml-2" : "mr-2"}`} />
              <span className="hidden sm:inline font-medium">
                {isArabic ? "English" : "العربية"}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-t border-gray-800"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <Link
                  href="#home"
                  className="text-gray-300 hover:text-[#22c55e] transition-colors rtl-text-right"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.home")}
                </Link>
                <Link
                  href="#about"
                  className="text-gray-300 hover:text-[#22c55e] transition-colors rtl-text-right"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.about")}
                </Link>
                <Link
                  href="#products"
                  className="text-gray-300 hover:text-[#22c55e] transition-colors rtl-text-right"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.products")}
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-300 hover:text-[#22c55e] transition-colors rtl-text-right"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.contact")}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section
        id="home"
        className={`${
          mobileMenuOpen ? "mobile-menu-spacing" : "hero-spacing"
        } min-h-screen space-y-10 flex items-center pb-6 relative overflow-hidden`}
      >
        <Spotlight
          className={`-top-40 ${
            isArabic ? "right-0 md:right-60" : "left-0 md:left-60"
          } md:-top-20`}
          fill="#22c55e"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22c55e]/5 to-transparent" />

        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              isArabic ? "rtl-space-reverse" : ""
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="space-y-8">
                <motion.h1
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent pb-4 block">
                    {t("hero.title")}
                  </span>
                  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 text-white">
                    {t("hero.subtitle")}
                  </span>
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mt-2 text-gray-300">
                    {t("hero.subtitleEnd")}
                  </span>
                </motion.h1>

                <motion.p
                  className={`text-xl text-gray-400 leading-relaxed max-w-lg ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {t("hero.description")}
                </motion.p>
              </div>

              <motion.div
                className={`flex flex-col sm:flex-row gap-4 ${
                  isArabic ? "sm:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  size="lg"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold group"
                >
                  <Zap
                    className={`${
                      isArabic ? "ml-2" : "mr-2"
                    } h-5 w-5 group-hover:rotate-12 transition-transform`}
                  />
                  <Link href={"#products"}>{t("hero.exploreProducts")}</Link>
                  <ArrowRight
                    className={`${
                      isArabic ? "mr-2 rtl-flip" : "ml-2"
                    } h-4 w-4 group-hover:translate-x-1 transition-transform`}
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#22c55e]/50 text-[#22c55e] hover:bg-[#22c55e]/10 hover:text-[#22c55e]/50 bg-transparent"
                >
                  <Link href={"#about"}>{t("hero.learnMore")}</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative pb-4"
            >
              <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#22c55e]/20 to-transparent z-10" />
                <Image
                  src="/products/lifestyle-1.jpeg"
                  alt="Bluggenn Products"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className={`absolute -top-4 ${
                  isArabic ? "-left-4" : "-right-4"
                } bg-[#22c55e] p-3 rounded-full shadow-lg`}
              >
                <Zap className="h-6 w-6 text-black" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className={`absolute -bottom-4 ${
                  isArabic ? "-right-4" : "-left-4"
                } bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20`}
              >
                <Shield className="h-6 w-6 text-[#22c55e]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Moving Cards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("experience.title")}{" "}
              <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">
                {t("experience.titleHighlight")}
              </span>
            </h2>
          </motion.div>
        </div>

        <InfiniteMovingCards
          items={movingCardItems}
          direction={isArabic ? "right" : "left"}
          speed="slow"
        />
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Meteors number={30} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22c55e]/5 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("about.title")}
            </h2>
            <TextGenerateEffect
              words={t("about.description")}
              className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto"
            />
          </motion.div>

          {/* Mission & Vision Grid */}
          <div
            className={`grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20 ${
              isArabic ? "rtl-space-reverse" : ""
            }`}
          >
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e]/10 to-[#16a34a]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 lg:p-12 hover:border-[#22c55e]/50 transition-all duration-300">
                <div
                  className={`flex items-center mb-6 ${
                    isArabic ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`bg-gradient-to-r from-[#22c55e] to-[#16a34a] p-4 rounded-2xl ${
                      isArabic ? "ml-4" : "mr-4"
                    }`}
                  >
                    <Zap className="h-8 w-8 text-black" />
                  </div>
                  <h3
                    className={`text-2xl lg:text-3xl font-bold text-white ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t("about.mission.title")}
                  </h3>
                </div>
                <p
                  className={`text-gray-300 text-lg leading-relaxed ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {t("about.mission.description")}
                </p>
                <div
                  className={`mt-6 flex flex-wrap gap-2 ${
                    isArabic ? "justify-end" : "justify-start"
                  }`}
                >
                  {["Smart Design", "Safety First", "Style Matters"].map(
                    (tag, index) => (
                      <Badge
                        key={tag}
                        className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30"
                      >
                        {isArabic
                          ? ["تصميم ذكي", "الأمان أولاً", "الأناقة مهمة"][index]
                          : tag}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 lg:p-12 hover:border-blue-500/50 transition-all duration-300">
                <div
                  className={`flex items-center mb-6 ${
                    isArabic ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl ${
                      isArabic ? "ml-4" : "mr-4"
                    }`}
                  >
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3
                    className={`text-2xl lg:text-3xl font-bold text-white ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t("about.vision.title")}
                  </h3>
                </div>
                <p
                  className={`text-gray-300 text-lg leading-relaxed ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {t("about.vision.description")}
                </p>
                <div
                  className={`mt-6 flex flex-wrap gap-2 ${
                    isArabic ? "justify-end" : "justify-start"
                  }`}
                >
                  {["Global Reach", "Local Innovation", "Trust & Quality"].map(
                    (tag, index) => (
                      <Badge
                        key={tag}
                        className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                      >
                        {isArabic
                          ? ["وصول عالمي", "ابتكار محلي", "الثقة والجودة"][
                              index
                            ]
                          : tag}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl lg:text-4xl font-bold mb-8">
              {isArabic ? "⚡ لماذا تختار" : "⚡ Why Choose"}{" "}
              <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">
                {isArabic ? "بلوجن؟" : "Bluggenn?"}
              </span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
            {[
              {
                icon: "🎨",
                title: isArabic ? "تصميم مدروس" : "Thoughtful Design",
                description: isArabic
                  ? "مصمم لراحة الحياة اليومية مع الاهتمام بكل التفاصيل"
                  : "Designed for real-life convenience with attention to every detail",
              },
              {
                icon: "🛡️",
                title: isArabic ? "الأمان والأداء" : "Safety & Performance",
                description: isArabic
                  ? "معايير أمان استثنائية مع أداء لا يقبل المساومة"
                  : "Exceptional safety standards with uncompromising performance",
              },
              {
                icon: "✨",
                title: isArabic ? "جماليات أنيقة" : "Elegant Aesthetics",
                description: isArabic
                  ? "جماليات أنيقة مع ملمس صلب يكمل أسلوبك"
                  : "Sleek aesthetics with a solid feel that complements your style",
              },
              {
                icon: "🏗️",
                title: isArabic ? "مصنوع ليدوم" : "Built to Last",
                description: isArabic
                  ? "مواد وتصنيع عالي الجودة لمتانة طويلة الأمد"
                  : "Premium materials and construction for long-lasting durability",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-[#22c55e]/50 transition-all duration-300 h-full">
                  <div
                    className={`bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform ${
                      isArabic ? "mr-0 ml-auto" : ""
                    }`}
                  >
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h4
                    className={`text-lg font-semibold text-white mb-3 ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className={`text-gray-400 text-sm leading-relaxed ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Made in Saudi Arabia */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-white/10 to-green-600/20 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 lg:p-16 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-full">
                  <span className="text-4xl lg:text-5xl">🇸🇦</span>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                {isArabic ? "صنع في" : "Proudly"}{" "}
                <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
                  {isArabic
                    ? "المملكة العربية السعودية"
                    : "Made in Saudi Arabia"}
                </span>
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {isArabic
                  ? "وُلد من الابتكار السعودي وصُنع بمعايير عالمية. نحن نجمع بين الخبرة المحلية والجودة العالمية لإنشاء منتجات تمثل أفضل ما في العالمين."
                  : "Born from Saudi innovation and engineered with global standards. We combine local expertise with international quality to create products that represent the best of both worlds."}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {[
                  isArabic ? "الابتكار السعودي" : "Saudi Innovation",
                  isArabic ? "معايير عالمية" : "Global Standards",
                  isArabic ? "خبرة محلية" : "Local Expertise",
                  isArabic ? "جودة عالمية" : "International Quality",
                ].map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isArabic ? "منتجاتنا" : "Our"}{" "}
              <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">
                {isArabic ? "" : "Products"}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {isArabic
                ? "اكتشف مجموعتنا من إكسسوارات الهواتف المحمولة المتميزة المصممة لأسلوب الحياة العصري."
                : "Discover our range of premium mobile accessories designed for the modern lifestyle."}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden bg-gray-900/50 border-gray-800 hover:border-[#22c55e]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#22c55e]/10">
                  <div className="relative h-80 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex[product.id] || 0}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={
                            product.images[currentImageIndex[product.id] || 0]
                          }
                          alt={isArabic ? product.nameAr : product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-4 ${
                        isArabic ? "right-4" : "left-4"
                      }`}
                    >
                      <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30">
                        {isArabic ? product.categoryAr : product.category}
                      </Badge>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-black/50 hover:bg-black/70 text-white border-gray-600"
                        onClick={() => prevImage(product.id)}
                      >
                        <ChevronLeft
                          className={`h-4 w-4 ${isArabic ? "rtl-flip" : ""}`}
                        />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-black/50 hover:bg-black/70 text-white border-gray-600"
                        onClick={() => nextImage(product.id)}
                      >
                        <ChevronRight
                          className={`h-4 w-4 ${isArabic ? "rtl-flip" : ""}`}
                        />
                      </Button>
                    </div>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {product.images.map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            imgIndex === (currentImageIndex[product.id] || 0)
                              ? "bg-[#22c55e] w-6"
                              : "bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3
                        className={`text-xl font-semibold text-white mb-2 ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      >
                        {isArabic ? product.nameAr : product.name}
                      </h3>
                      <p
                        className={`text-gray-400 text-sm leading-relaxed ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      >
                        {isArabic ? product.descriptionAr : product.description}
                      </p>
                    </div>

                    <div
                      className={`flex flex-wrap gap-2 ${
                        isArabic ? "justify-end" : "justify-start"
                      }`}
                    >
                      {(isArabic ? product.featuresAr : product.features).map(
                        (feature, featureIndex) => (
                          <Badge
                            key={featureIndex}
                            variant="secondary"
                            className="bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20 border-[#22c55e]/20"
                          >
                            {feature}
                          </Badge>
                        )
                      )}
                    </div>

                    <Button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold group">
                      <MessageCircle
                        className={`${
                          isArabic ? "ml-2" : "mr-2"
                        } h-4 w-4 group-hover:scale-110 transition-transform`}
                      />
                      {isArabic
                        ? "اتصل للحصول على التفاصيل"
                        : "Contact for Details"}
                      <ArrowRight
                        className={`${
                          isArabic ? "mr-2 rtl-flip" : "ml-2"
                        } h-4 w-4 group-hover:translate-x-1 transition-transform`}
                      />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22c55e]/5 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isArabic ? "تواصل معنا" : "Get in Touch"}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {isArabic
                ? "هل أنت مستعد لشحن أجهزتك؟ اتصل بنا اليوم لتعرف المزيد عن منتجاتنا."
                : "Ready to power up your devices? Contact us today to learn more about our products."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Phone,
                title: "WhatsApp",
                content: "+966546517318",
                link: "https://wa.me/966546517318",
                delay: 0,
              },
              {
                icon: Instagram,
                title: "Instagram",
                content: "@bluggenn.store",
                link: "https://www.instagram.com/bluggenn.store?igsh=YzU4YTJzZmY1cGpr&utm_source=qr",
                delay: 0.1,
              },
              {
                icon: Mail,
                title: "Email",
                content: isArabic ? "قريباً" : "Coming Soon",
                link: "#",
                delay: 0.2,
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: contact.delay }}
                viewport={{ once: true }}
                className="group"
              >
                {contact.link !== "#" ? (
                  <Link
                    href={contact.link}
                    className="text-[#22c55e] hover:text-[#16a34a] transition-colors inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="text-center p-6 bg-gray-900/50 border-gray-800 hover:border-[#22c55e]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#22c55e]/10">
                      <CardContent className="space-y-4">
                        <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                          <contact.icon className="h-8 w-8 text-black" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {contact.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="text-center p-6 bg-gray-900/50 border-gray-800 hover:border-[#22c55e]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#22c55e]/10">
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                        <contact.icon className="h-8 w-8 text-black" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {contact.title}
                      </h3>
                      <p className="text-muted font-normal">
                        {contact.content}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div
            className={`grid md:grid-cols-4 gap-8 mb-12 ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <div className="space-y-4">
              <Image
                src="/logo-new.png"
                alt="Bluggenn"
                width={120}
                height={120}
                className="h-24 w-auto"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                {isArabic
                  ? "طاقة أذكى. حياة أفضل. مصنوع بفخر في المملكة العربية السعودية بشغف للابتكار والجودة."
                  : "Power Smarter. Live Better. Proudly made in Saudi Arabia with passion for innovation and quality."}
              </p>
              <div
                className={`flex space-x-4 ${
                  isArabic ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Link
                  href="https://www.instagram.com/bluggenn.store?igsh=YzU4YTJzZmY1cGpr&utm_source=qr"
                  className="text-gray-400 hover:text-[#22c55e] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://wa.me/966546517318"
                  className="text-gray-400 hover:text-[#22c55e] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {isArabic ? "روابط سريعة" : "Quick Links"}
              </h4>
              <div className="space-y-2">
                {[
                  { key: "home", label: isArabic ? "الرئيسية" : "Home" },
                  { key: "about", label: isArabic ? "من نحن" : "About" },
                  {
                    key: "products",
                    label: isArabic ? "المنتجات" : "Products",
                  },
                  { key: "contact", label: isArabic ? "اتصل بنا" : "Contact" },
                ].map((link) => (
                  <Link
                    key={link.key}
                    href={`#${link.key}`}
                    className="text-gray-400 hover:text-[#22c55e] transition-colors block text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {isArabic ? "المنتجات" : "Products"}
              </h4>
              <div className="space-y-2">
                {[
                  isArabic ? "بنوك الطاقة" : "Power Banks",
                  isArabic ? "الشواحن اللاسلكية" : "Wireless Chargers",
                  isArabic ? "الكابلات" : "Cables",
                  isArabic ? "الإكسسوارات" : "Accessories",
                ].map((product) => (
                  <p key={product} className="text-gray-400 text-sm">
                    {product}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center ${
              isArabic ? "md:flex-row-reverse" : ""
            }`}
          >
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Bluggenn.{" "}
              {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <div
              className={`flex items-center flex-col space-x-6 mt-4 md:mt-0 ${
                isArabic ? "space-x-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center space-x-2 ${
                  isArabic ? "space-x-reverse" : ""
                }`}
              >
                <Star className="h-4 w-4 text-[#22c55e]" />
                <span className="text-gray-400 text-sm">
                  {isArabic
                    ? "صنع بـ ❤️ في المملكة العربية السعودية"
                    : "Made with ❤️ in Saudi Arabia"}
                </span>
              </div>
              <div className="text-gray-500 text-sm">
                {isArabic ? "صنع بواسطة" : "Made by"}{" "}
                <Link
                  href="https://shimaamohamed.bio.link/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#22c55e] hover:text-[#16a34a] transition-colors font-medium"
                >
                  SM
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced WhatsApp & Instagram Floating Buttons */}
      <div
        className={`fixed bottom-6 ${
          isArabic ? "left-6" : "right-6"
        } z-50 flex flex-col space-y-3`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Link
            href="https://www.instagram.com/bluggenn.store?igsh=YzU4YTJzZmY1cGpr&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Link
            href="https://wa.me/966546517318"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
