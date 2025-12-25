"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* utils                                                                      */
/* -------------------------------------------------------------------------- */

const cn = (...c) => c.filter(Boolean).join(" ");

const Cookies = {
  get(name) {
    if (typeof document === "undefined") return null;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  },
  set(name, value, days = 365) {
    const d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
  },
};

/* -------------------------------------------------------------------------- */
/* logo (YOUR SVG)                                                             */
/* -------------------------------------------------------------------------- */

function LunarLogo({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
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

export default function Navbar({ items }) {
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [iconColor, setIconColor] = useState("text-indigo-500");

  /* easter egg */
  const [egg, setEgg] = useState(false);
  const [eggStep, setEggStep] = useState(0);
  const [eggButtons, setEggButtons] = useState(false);

  useEffect(() => {
    setMounted(true);

    const provider = Cookies.get("provider");
    if (provider === "dark") setIconColor("text-purple-500");

    const resize = () => setMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (!mounted) return null;

  const handleLogoClick = () => {
    const unlocked = localStorage.getItem("lunar_unlocked");
    if (unlocked) {
      Cookies.set("provider", "dark");
      setIconColor("text-purple-500");
      setTimeout(() => location.reload(), 300);
      return;
    }

    setEgg(true);
    setEggStep(1);
    setTimeout(() => setEggStep(2), 4000);
    setTimeout(() => setEggButtons(true), 8000);
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <motion.div
          className={cn(
            "flex items-center gap-3",
            "bg-black/60 backdrop-blur-xl",
            "border border-white/10 shadow-2xl",
            mobile
              ? "w-[92%] px-4 py-3 rounded-3xl justify-between"
              : "px-4 py-3 rounded-full font-mono"
          )}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* LOGO */}
          <motion.button
            onClick={handleLogoClick}
            animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex items-center gap-2"
          >
            <LunarLogo className={cn("h-7 w-7", iconColor)} />
            <span className="font-mono font-bold text-white text-lg">
              LUNAR
            </span>
          </motion.button>

          {/* DESKTOP NAV */}
          {!mobile && (
            <div className="flex items-center gap-2 ml-4">
              {items.map((item) => {
                const isActive = active === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActive(item.name);
                      window.location.href = item.url;
                    }}
                    className={cn(
                      "relative px-7 py-3 rounded-full font-mono text-base transition",
                      isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/15 blur-lg -z-10"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
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
        </motion.div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobile && open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 z-40"
          >
            {items.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActive(item.name);
                  setOpen(false);
                  window.location.href = item.url;
                }}
                className="block w-full text-left px-4 py-3 rounded-lg text-white/80 hover:bg-white/10"
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* EASTER EGG */}
      <AnimatePresence>
        {egg && (
          <motion.div
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center font-mono text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {eggStep === 1 && (
              <motion.div> A cold silence lingers beneath the moonlight… </motion.div>
            )}

            {eggStep === 2 && (
              <div className="text-center">
                <div className="mb-8">
                  You seek to trespass into the dark side of the lunar realm…
                </div>

                {eggButtons && (
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setEgg(false)}
                      className="px-6 py-3 border border-white/30 rounded-lg"
                    >
                      NO
                    </button>
                    <button
                      onClick={() => {
                        localStorage.setItem("lunar_unlocked", "true");
                        Cookies.set("provider", "dark");
                        location.reload();
                      }}
                      className="px-6 py-3 bg-indigo-600 rounded-lg"
                    >
                      YES
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
