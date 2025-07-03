"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Meteors } from "@/components/ui/meteors";

const products = [
  {
    id: 1,
    name: "Magnetic Wireless Power Bank",
    description:
      "Ultra-compact magnetic power bank with 15W wireless charging. Small enough, lightweight enough, easy to take out.",
    features: [
      "15W Wireless Charging",
      "PD20W Fast Charge",
      "Magnetic Attachment",
      "Ultra Compact",
    ],
    images: [
      "/products/lifestyle-1.jpeg",
      "/products/product1-2.jpeg",
      "/products/product1-3.jpeg",
      "/products/product1-4.jpeg",
    ],
    category: "Lifestyle",
  },
  {
    id: 2,
    name: "Wireless Charging Station",
    description:
      "Premium wireless charging pad with digital display and fast charging capabilities for all your devices.",
    features: [
      "Digital Display",
      "15W Fast Charging",
      "Universal Compatibility",
      "Sleek Design",
    ],
    images: [
      "/products/wireless-pad-1.jpeg",
      "/products/wireless-pad-2.jpeg",
      "/products/wireless-pad-3.jpeg",
      "/products/wireless-pad-4.jpeg",
    ],
    category: "Charging Station",
  },
  {
    id: 3,
    name: "Premium Power Bank Collection",
    description:
      "Aluminum alloy construction with PD20W/15W charging capabilities in multiple elegant colors.",
    features: [
      "Aluminum Alloy",
      "PD20W/15W",
      "Multiple Colors",
      "Premium Build",
    ],
    images: [
      "/products/product2-1.jpeg",
      "/products/product2-2.jpeg",
      "/products/product1-2.jpeg",
      "/products/product1-3.jpeg",
    ],
    category: "Power Bank",
  },
];

const movingCardItems = [
  {
    image: "/products/lifestyle-1.jpeg",
    title: "Compact & Portable",
    description: "Small enough, lightweight enough, easy to take out",
  },
  {
    image: "/products/wireless-pad-1.jpeg",
    title: "Smart Display",
    description: "Digital display shows charging status",
  },
  {
    image: "/products/product2-1.jpeg",
    title: "Premium Materials",
    description: "Aluminum alloy construction for durability",
  },
];

export default function BluggennLanding() {
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
        className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo-new.png"
              alt="Bluggenn"
              width={120}
              height={120}
              className="h-12 w-auto"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#home"
              className="text-gray-300 hover:text-[#22c55e] transition-colors"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-[#22c55e] transition-colors"
            >
              About
            </Link>
            <Link
              href="#products"
              className="text-gray-300 hover:text-[#22c55e] transition-colors"
            >
              Products
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-[#22c55e] transition-colors"
            >
              Contact
            </Link>
          </nav>

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
                  className="text-gray-300 hover:text-[#22c55e] transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#about"
                  className="text-gray-300 hover:text-[#22c55e] transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#products"
                  className="text-gray-300 hover:text-[#22c55e] transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-300 hover:text-[#22c55e] transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 min-h-screen flex items-center relative overflow-hidden"
      >
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#22c55e"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22c55e]/5 to-transparent" />

        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 hover:bg-[#22c55e]/30">
                    🇸🇦 Proudly Made in Saudi Arabia
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Power{" "}
                  <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">
                    Smarter
                  </span>
                  <br />
                  Live Better
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-400 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Bluggenn creates smart, simple, and reliable mobile
                  accessories with uncompromising quality and elegant design.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  size="lg"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold group"
                >
                  <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#22c55e]/50 text-[#22c55e] hover:bg-[#22c55e]/10 bg-transparent"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
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
                className="absolute -top-4 -right-4 bg-[#22c55e] p-3 rounded-full shadow-lg"
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
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20"
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
              Experience the{" "}
              <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">
                Difference
              </span>
            </h2>
          </motion.div>
        </div>

        <InfiniteMovingCards
          items={movingCardItems}
          direction="right"
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
              About Bluggenn
            </h2>
            <TextGenerateEffect
              words="Founded by passionate engineers with a love for smart, simple, and reliable designs. We specialize in mobile accessories crafted with attention to detail, style, and uncompromising quality."
              className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto"
            />
          </motion.div>

          {/* Mission & Vision Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e]/10 to-[#16a34a]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 lg:p-12 hover:border-[#22c55e]/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] p-4 rounded-2xl mr-4">
                    <Zap className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    🎯 Our Mission
                  </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To create smarter, safer, and more stylish products—without
                  the unnecessary complexity. We believe technology should
                  enhance your life, not complicate it.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Smart Design", "Safety First", "Style Matters"].map(
                    (tag) => (
                      <Badge
                        key={tag}
                        className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30"
                      >
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 lg:p-12 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl mr-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    🌍 Our Vision
                  </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Transform from a local innovation to a global name in tech
                  accessories, with simplicity and trust at the heart of
                  everything we do.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Global Reach", "Local Innovation", "Trust & Quality"].map(
                    (tag) => (
                      <Badge
                        key={tag}
                        className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                      >
                        {tag}
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
              ⚡ Why Choose{" "}
              <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">
                Bluggenn?
              </span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
            {[
              {
                icon: "🎨",
                title: "Thoughtful Design",
                description:
                  "Designed for real-life convenience with attention to every detail",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: "🛡️",
                title: "Safety & Performance",
                description:
                  "Exceptional safety standards with uncompromising performance",
                color: "from-green-500 to-[#22c55e]",
              },
              {
                icon: "✨",
                title: "Elegant Aesthetics",
                description:
                  "Sleek aesthetics with a solid feel that complements your style",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: "🏗️",
                title: "Built to Last",
                description:
                  "Premium materials and construction for long-lasting durability",
                color: "from-blue-500 to-cyan-500",
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
                    className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
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
                Proudly{" "}
                <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
                  Made in Saudi Arabia
                </span>
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Born from Saudi innovation and engineered with global standards.
                We combine local expertise with international quality to create
                products that represent the best of both worlds.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {[
                  "Saudi Innovation",
                  "Global Standards",
                  "Local Expertise",
                  "International Quality",
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
              Our{" "}
              <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover our range of premium mobile accessories designed for the
              modern lifestyle.
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
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30">
                        {product.category}
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
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-black/50 hover:bg-black/70 text-white border-gray-600"
                        onClick={() => nextImage(product.id)}
                      >
                        <ChevronRight className="h-4 w-4" />
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
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="secondary"
                          className="bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20 border-[#22c55e]/20"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold group">
                      <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      Contact for Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
              Get in Touch
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to power up your devices? Contact us today to learn more
              about our products.
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
                content: "Coming Soon",
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
                <Card className="text-center p-6 bg-gray-900/50 border-gray-800 hover:border-[#22c55e]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#22c55e]/10">
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                      <contact.icon className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {contact.title}
                    </h3>
                    {contact.link !== "#" ? (
                      <Link
                        href={contact.link}
                        className="text-[#22c55e] hover:text-[#16a34a] transition-colors inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contact.content}
                      </Link>
                    ) : (
                      <p className="text-gray-400">{contact.content}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <Image
                src="/logo-new.png"
                alt="Bluggenn"
                width={120}
                height={120}
                className="h-12 w-auto"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Power Smarter. Live Better.
                <br />
                Proudly made in Saudi Arabia with passion for innovation and
                quality.
              </p>
              <div className="flex space-x-4">
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
                Quick Links
              </h4>
              <div className="space-y-2">
                {["Home", "About", "Products", "Contact"].map((link) => (
                  <Link
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#22c55e] transition-colors block text-sm"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Products
              </h4>
              <div className="space-y-2">
                {[
                  "Power Banks",
                  "Wireless Chargers",
                  "Cables",
                  "Accessories",
                ].map((product) => (
                  <p key={product} className="text-gray-400 text-sm">
                    {product}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Contact Info
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#22c55e]" />
                  <span className="text-gray-400 text-sm">+966546517318</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Instagram className="h-4 w-4 text-[#22c55e]" />
                  <span className="text-gray-400 text-sm">@bluggenn.store</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Bluggenn. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-[#22c55e]" />
                <span className="text-gray-400 text-sm">
                  Made with ❤️ in Saudi Arabia
                </span>
              </div>
              <div className="text-gray-500 text-sm">
                Made by{" "}
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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
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
