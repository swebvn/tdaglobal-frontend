"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";

export default function IntlHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Handle mobile menu state changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/our-work", label: t("ourWork") },
    { href: "/join-us", label: t("joinUs") },
    { href: "/news", label: t("news") },
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-[100] shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-15 md:h-16 lg:h-18 xl:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/tda-global-logo.png"
              alt="TDA Global Logo"
              width={100}
              height={32}
              className="h-8 w-auto sm:h-9 md:h-10 lg:h-12 xl:h-13"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors relative group ${
                  item.href === "/join-us" 
                    ? "text-red-600 font-medium hover:text-red-700"
                    : pathname === item.href
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform origin-left ${
                    pathname === item.href
                      ? (item.href === "/join-us" ? "bg-red-600 scale-x-100" : "bg-blue-600 scale-x-100")
                      : (item.href === "/join-us" ? "bg-red-600 scale-x-0 group-hover:scale-x-100" : "bg-blue-600 scale-x-0 group-hover:scale-x-100")
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleLanguageChange(locale === "en" ? "vi" : "en")
                }
                className="flex items-center space-x-2 hover:bg-blue-50"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {locale === "en" ? "VI" : "EN"}
                </span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full hover:bg-blue-50 text-gray-700 hover:text-blue-600"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative block px-3 py-2 rounded-md transition-all duration-200 ${
                    item.href === "/join-us"
                      ? pathname === item.href
                        ? "text-red-600 font-medium bg-red-50 shadow-sm border border-red-100"
                        : "text-red-600 font-medium hover:text-red-700 hover:bg-red-50"
                      : pathname === item.href
                        ? "text-blue-600 font-medium bg-blue-50 shadow-sm border border-blue-100"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  {/* Active indicator */}
                  {pathname === item.href && (
                    <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${
                      item.href === "/join-us" ? "bg-red-600" : "bg-blue-600"
                    }`}></div>
                  )}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="px-3 py-2 border-t mt-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleLanguageChange(locale === "en" ? "vi" : "en");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <Globe className="h-4 w-4" />
                  <span>{locale === "en" ? "Tiếng Việt" : "English"}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
