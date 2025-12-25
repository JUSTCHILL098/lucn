"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* utils */
/* -------------------------------------------------------------------------- */

const cn = (...c) => c.filter(Boolean).join(" ");

/* -------------------------------------------------------------------------- */
/* Navbar */
/* -------------------------------------------------------------------------- */

export default function Navbar({ items }) {
  /* ---------------------------- SAFETY FIRST ---------------------------- */
  const safeItems = Array.isArray(items) ? items : [];

  /* ------------------------------ STATE -------------------------------- */
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(
    safeItems[0]?.name ?? "Home"
  );
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ------------------------------ EFFECTS ------------------------------ */
  useEffect(() => {
    setMounted(true);

    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!mounted) return null;

  /* -------------------------------------------------------------------------- */
  /* JSX */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      {/* =============================== NAVBAR =============================== */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <div
          className={cn(
            "relative flex items-center gap-3 rounded-full bg-black/60 backdrop-blur-xl shadow-xl",
            "px-4 py-3 font-mono",
            isMobile ? "w-[92%] justify-between" : "w-auto"
          )}
        >
          {/* ----------------------------- LOGO ----------------------------- */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-7 h-7 rounded-full bg-indigo-500"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="font-bold text-white tracking-wide">
              LUNAR
            </span>
          </div>

          {/* ------------------------- DESKTOP NAV ------------------------- */}
          {!isMobile && (
            <div className="relative ml-6 flex items-center gap-2">
              {safeItems.map((item) => {
                const isActive = active === item.name;

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Mascot Animation when Active */}
                    {isActive && (
                      <motion.div
                        layoutId="anime-mascot"
                        className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="relative w-12 h-12">
                          <motion.div
                            className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2"
                            animate={
                              hovered === item.name
                                ? {
                                    scale: [1, 1.1, 1],
                                    rotate: [0, -5, 5, 0],
                                    transition: {
                                      duration: 0.5,
                                      ease: "easeInOut",
                                    },
                                  }
                                : {
                                    y: [0, -3, 0],
                                    transition: {
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    },
                                  }
                            }
                          >
                            {/* Eyes */}
                            <motion.div
                              className="absolute w-2 h-2 bg-black rounded-full"
                              animate={
                                hovered === item.name
                                  ? {
                                      scaleY: [1, 0.2, 1],
                                      transition: { duration: 0.2 },
                                    }
                                  : {}
                              }
                              style={{ left: "25%", top: "40%" }}
                            />
                            <motion.div
                              className="absolute w-2 h-2 bg-black rounded-full"
                              animate={
                                hovered === item.name
                                  ? {
                                      scaleY: [1, 0.2, 1],
                                      transition: { duration: 0.2 },
                                    }
                                  : {}
                              }
                              style={{ right: "25%", top: "40%" }}
                            />

                            {/* Blush */}
                            <div
                              className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                              style={{ left: "15%", top: "55%" }}
                            />
                            <div
                              className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                              style={{ right: "15%", top: "55%" }}
                            />

                            {/* Mouth */}
                            <motion.div
                              className="absolute w-4 h-2 border-b-2 border-black rounded-full"
                              animate={
                                hovered === item.name
                                  ? { scaleY: 1.4, y: -1 }
                                  : { scaleY: 1, y: 0 }
                              }
                              style={{ left: "30%", top: "60%" }}
                            />

                            {/* Sparkles */}
                            <AnimatePresence>
                              {hovered === item.name && (
                                <>
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="absolute -top-1 -right-1 text-yellow-300"
                                  >
                                    ✨
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="absolute -top-2 left-0 text-yellow-300"
                                  >
                                    ✨
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Nav Button */}
                    <a
                      href={item.url}
                      onClick={(e) => {
                        e.preventDefault();
                        setActive(item.name);
                      }}
                      className={cn(
                        "relative z-10 rounded-full px-6 py-3 text-sm font-semibold transition",
                        isActive
                          ? "bg-white text-black"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {/* ------------------------- MOBILE BUTTON ------------------------- */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-white"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          )}
        </div>
      </div>

      {/* ============================= MOBILE MENU ============================= */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
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
    </>
  );
}
