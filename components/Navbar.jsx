"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ---------------- utils ---------------- */

const cn = (...c) => c.filter(Boolean).join(" ");

/* ---------------- navbar ---------------- */

export default function Navbar({ items = [] }) {
  const safeItems = Array.isArray(items) ? items : [];

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(safeItems[0]?.name ?? "Home");
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <div
          className={cn(
            "relative flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl shadow-2xl",
            isMobile ? "w-[92%] justify-between" : "w-auto"
          )}
        >
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <motion.div
              className="h-7 w-7 rounded-full bg-indigo-500"
              animate={{ y: [0, -6, 0], rotate: [0, 6, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="font-mono font-bold tracking-wide text-white">
              LUNAR
            </span>
          </div>

          {/* DESKTOP NAV */}
          {!isMobile && (
            <div className="ml-6 flex items-center gap-2">
              {safeItems.map((item) => {
                const isActive = active === item.name;
                const isHover = hovered === item.name;

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
                      "relative rounded-full px-7 py-3 text-sm font-semibold transition-colors",
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {/* ACTIVE GLOW */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-glow"
                        className="absolute inset-0 -z-10 rounded-full"
                        initial={false}
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-lg" />
                        <div className="absolute inset-[-6px] rounded-full bg-indigo-500/10 blur-xl" />
                      </motion.div>
                    )}

                    {/* HOVER BG */}
                    <AnimatePresence>
                      {isHover && !isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute inset-0 -z-10 rounded-full bg-white/10"
                        />
                      )}
                    </AnimatePresence>

                    {item.name}
                  </a>
                );
              })}
            </div>
          )}

          {/* MOBILE BUTTON */}
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 left-4 right-4 z-40 rounded-2xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl shadow-xl"
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
                className="block rounded-lg px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
