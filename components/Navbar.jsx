"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, BookOpen, Settings } from "lucide-react";

// Utility functions
const cn = (...classes) => classes.filter(Boolean).join(" ");

const CookieMock = {
  get: (key) => {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
  },
  set: (key, value, { expires } = {}) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },
};

// Simple Drawer mock
const Drawer = ({ open, onOpenChange, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
        />
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
          {children}
        </div>
      </>
    )}
  </AnimatePresence>
);

const DrawerContent = ({ className, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 10 }}
    className={cn(
      "relative w-full max-w-sm overflow-hidden rounded-lg border bg-zinc-900 p-6 shadow-lg",
      className
    )}
  >
    {children}
  </motion.div>
);

// IconMark placeholder
const IconMark = ({ className }) => (
  <div className={cn("w-7 h-7 bg-white rounded-full", className)} />
);

export function Navbar({ items }) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(items[0]?.name || "Home");
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [iconColor, setIconColor] = useState("bg-indigo-500");

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Navbar */}
      <div className="fixed left-0 right-0 top-6 z-50 flex justify-center">
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-full font-mono bg-black/50 backdrop-blur-lg shadow-lg",
            isMobile ? "w-[92%] justify-between" : "w-auto"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <motion.div
              className={cn("w-7 h-7 rounded-full", iconColor)}
              animate={{ y: [0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <span className="font-bold text-white font-mono">LUNAR</span>
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <div className="flex items-center space-x-2 ml-6">
              {items.map((item) => {
                const isActive = active === item.name;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(item.name);
                    }}
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "relative cursor-pointer px-7 py-3.5 rounded-full font-mono text-base font-semibold transition-all duration-300",
                      "text-white/70 hover:text-white",
                      isActive && "text-white"
                    )}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          )}

          {/* Mobile menu */}
          {isMobile && (
            <div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-1.5"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-20 left-0 w-full bg-black/90 p-4 flex flex-col gap-2 rounded-2xl"
                  >
                    {items.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        onClick={(e) => {
                          e.preventDefault();
                          setActive(item.name);
                          setMobileMenuOpen(false);
                        }}
                        className="text-white/80 hover:text-white px-3 py-2 rounded-lg"
                      >
                        {item.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Provider Drawer (mock) */}
      <Drawer open={providerOpen} onOpenChange={setProviderOpen}>
        <DrawerContent>
          <h2 className="text-white font-bold mb-2">Select Provider</h2>
          <button
            className="w-full mb-2 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => setProviderOpen(false)}
          >
            1st Provider
          </button>
          <button
            className="w-full px-4 py-2 rounded border border-white text-white hover:bg-white/10"
            onClick={() => setProviderOpen(false)}
          >
            2nd Provider
          </button>
        </DrawerContent>
      </Drawer>
    </>
  );
}
