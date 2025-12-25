"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  Home,
  BookOpen,
  Settings,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* utils                                                                      */
/* -------------------------------------------------------------------------- */

const cn = (...c) => c.filter(Boolean).join(" ");

/* -------------------------------------------------------------------------- */
/* navbar                                                                     */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const items = [
    { name: "Home", href: "/", icon: Home },
    { name: "Docs", href: "/docs", icon: BookOpen },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    setMounted(true);

    const onResize = () => {
      setMobile(window.innerWidth < 768);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ============================== NAV WRAPPER ============================== */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "relative flex items-center gap-4 rounded-full",
            "bg-black/60 backdrop-blur-xl",
            "border border-white/10 shadow-2xl",
            mobile ? "w-[92%] px-4 py-3" : "px-6 py-3"
          )}
        >
          {/* ============================== LOGO ============================== */}
          <div className="flex items-center gap-3">
            <motion.div
              className="relative h-9 w-9 rounded-full bg-indigo-500"
              animate={{
                rotate: [0, 6, -6, 0],
                y: [0, -4, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="absolute inset-0 rounded-full bg-indigo-500 blur-lg opacity-60" />
            </motion.div>

            <div className="leading-none">
              <div className="flex items-center gap-1">
                <span className="font-mono text-lg font-bold tracking-wide text-white">
                  LUNAR
                </span>
                <Sparkles size={14} className="text-indigo-400" />
              </div>
              <span className="text-[10px] tracking-widest text-white/50">
                EMBED PLATFORM
              </span>
            </div>
          </div>

          {/* ============================== DESKTOP LINKS ============================== */}
          {!mobile && (
            <div className="ml-8 flex items-center gap-2">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => setActive(item.name)}
                    className="relative"
                  >
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium",
                        isActive
                          ? "text-black"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-2">
                        <Icon size={14} />
                        {item.name}
                      </span>
                    </motion.div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ============================== MOBILE TOGGLE ============================== */}
          {mobile && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="ml-auto rounded-full p-2 text-white"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </motion.nav>
      </div>

      {/* ============================== MOBILE MENU ============================== */}
      <AnimatePresence>
        {mobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-28 left-4 right-4 z-40 rounded-2xl
                       border border-white/10 bg-black/80 backdrop-blur-xl p-4"
          >
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActive(item.name);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3
                             text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={16} />
                  {item.name}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
