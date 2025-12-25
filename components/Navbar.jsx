"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* -------------------------------- utilities -------------------------------- */

const cn = (...classes) => classes.filter(Boolean).join(" ");

/* -------------------------------- drawer -------------------------------- */

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
      "relative w-full max-w-sm rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-lg",
      className
    )}
  >
    {children}
  </motion.div>
);

/* -------------------------------- navbar -------------------------------- */

export function Navbar({ items }) {
  // 🔥 IMPORTANT: make items safe for prerender
  const safeItems = Array.isArray(items) ? items : [];

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(
    safeItems.length > 0 ? safeItems[0].name : "Home"
  );
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ---------------------------- NAVBAR BAR ---------------------------- */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <div
          className={cn(
            "flex items-center gap-3 rounded-full bg-black/60 px-4 py-3 backdrop-blur-xl shadow-lg",
            isMobile ? "w-[92%] justify-between" : "w-auto"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <motion.div
              className="h-7 w-7 rounded-full bg-indigo-500"
              animate={{ y: [0, -6, 0], rotate: [0, 6, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="font-mono font-bold text-white">LUNAR</span>
          </div>

          {/* Desktop links */}
          {!isMobile && (
            <div className="ml-6 flex items-center gap-2">
              {safeItems.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(item.name);
                  }}
                  className={cn(
                    "rounded-full px-6 py-3 text-sm font-semibold transition",
                    active === item.name
                      ? "bg-white text-black"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}

          {/* Mobile button */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-white"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* ---------------------------- MOBILE MENU ---------------------------- */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 left-4 right-4 z-40 rounded-2xl bg-black/90 p-4 backdrop-blur-xl"
          >
            {safeItems.map((item) => (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(item.name);
                  setMobileOpen(false);
                }}
                className="block rounded-lg px-4 py-3 text-white/80 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------- DRAWER ---------------------------- */}
      <Drawer open={providerOpen} onOpenChange={setProviderOpen}>
        <DrawerContent>
          <h2 className="mb-3 text-lg font-bold text-white">
            Select Provider
          </h2>

          <button
            onClick={() => setProviderOpen(false)}
            className="mb-2 w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Provider 1
          </button>

          <button
            onClick={() => setProviderOpen(false)}
            className="w-full rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white/10"
          >
            Provider 2
          </button>
        </DrawerContent>
      </Drawer>
    </>
  );
}
