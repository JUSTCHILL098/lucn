"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* utils                                                                      */
/* -------------------------------------------------------------------------- */

const cn = (...c) => c.filter(Boolean).join(" ");

const defaultItems = [
  { name: "Home", url: "/" },
  { name: "Docs", url: "/docs" },
  { name: "Embed", url: "/embed" },
  { name: "Status", url: "/status" },
];

const Cookies = {
  get(name) {
    if (typeof document === "undefined") return null;
    return document.cookie
      .split("; ")
      .find((r) => r.startsWith(name + "="))
      ?.split("=")[1];
  },
  set(name, value, days = 365) {
    const d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
  },
};

/* -------------------------------------------------------------------------- */
/* logo                                                                       */
/* -------------------------------------------------------------------------- */

function LunarLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0174 2.80157C6.37072 3.29221 2.75 7.22328 2.75 12C2.75 13.1448 2.95764 14.2397 3.33685 15.25H12.8489C10.1562 14.1916 8.25 11.5684 8.25 8.5C8.25 6.18738 9.33315 4.1283 11.0174 2.80157ZM22.75 16C22.75 16.4142 22.4142 16.75 22 16.75H2C1.58579 16.75 1.25 16.4142 1.25 16C1.25 15.6688 1.46468 15.3877 1.76248 15.2884C1.4296 14.2513 1.25 13.1461 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.7166 1.25 13.0754 1.82126 13.1368 2.27627C13.196 2.71398 13.0342 3.27065 12.531 3.57467C10.8627 4.5828 9.75 6.41182 9.75 8.5C9.75 11.6756 12.3244 14.25 15.5 14.25C17.5882 14.25 19.4172 13.1373 20.4253 11.469C20.7293 10.9658 21.286 10.804 21.7237 10.8632C22.1787 10.9246 22.75 11.2834 22.75 12C22.75 13.1461 22.5704 14.2513 22.2375 15.2884C22.5353 15.3877 22.75 15.6688 22.75 16Z"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* navbar                                                                     */
/* -------------------------------------------------------------------------- */

export default function Navbar({ items = defaultItems }) {
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(items[0]?.name);
  const [purple, setPurple] = useState(false);

  useEffect(() => {
    setMounted(true);

    const resize = () => setMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);

    if (Cookies.get("provider") === "dark") setPurple(true);

    return () => window.removeEventListener("resize", resize);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <div
          className={cn(
            "relative flex items-center gap-3 px-5 py-3 rounded-full",
            "backdrop-blur-xl border border-white/10 shadow-2xl",
            purple
              ? "bg-purple-950/60 shadow-purple-600/40"
              : "bg-black/60"
          )}
        >
          {/* LOGO */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              Cookies.set("provider", "dark");
              setPurple(true);
            }}
            className="flex items-center gap-2"
          >
            <LunarLogo
              className={cn(
                "h-7 w-7",
                purple ? "text-purple-400" : "text-indigo-400"
              )}
            />
            <span className="font-mono font-bold text-white text-lg">
              {"LUNAR".split("").map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {l}
                </motion.span>
              ))}
            </span>
          </motion.button>

          {/* LINKS */}
          {!mobile && (
            <div className="flex items-center ml-6">
              {items.map((item) => {
                const activeTab = active === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActive(item.name);
                      window.location.href = item.url;
                    }}
                    className={cn(
                      "relative px-6 py-3 font-mono text-sm",
                      activeTab
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {/* mascot */}
                    {activeTab && (
                      <>
                        <motion.div
                          layoutId="glow"
                          className={cn(
                            "absolute inset-0 rounded-full blur-xl -z-10",
                            purple
                              ? "bg-purple-600/60"
                              : "bg-indigo-600/60"
                          )}
                        />
                        <motion.div
                          className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 1.8 }}
                        >
                          🐱‍🌙
                        </motion.div>
                      </>
                    )}
                    {item.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* MOBILE */}
          {mobile && (
            <button onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 left-4 right-4 z-40 bg-black/90 border border-white/10 rounded-2xl p-4 backdrop-blur-xl"
          >
            {items.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActive(item.name);
                  setOpen(false);
                  window.location.href = item.url;
                }}
                className="block w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg"
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
