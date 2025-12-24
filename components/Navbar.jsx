import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { IconMark } from './IconMark'; // Your mascot/icon component

// ---------- Utility ----------
const cn = (...classes) => classes.filter(Boolean).join('');

// ---------- Dialog / Drawer Mock ----------
const Dialog = ({ open, onOpenChange, children }) => (
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

const DialogContent = ({ className, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 10 }}
    className={cn("relative w-full overflow-hidden rounded-lg border bg-zinc-950 p-6 shadow-lg", className)}
  >
    {children}
  </motion.div>
);

const DialogHeader = ({ className, children }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>
    {children}
  </div>
);

const DialogTitle = ({ className, children }) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}>
    {children}
  </h2>
);

const DialogDescription = ({ className, children }) => (
  <p className={cn("text-sm text-zinc-400", className)}>
    {children}
  </p>
);

// Aliases for Drawer
const Drawer = Dialog;
const DrawerContent = DialogContent;
const DrawerHeader = DialogHeader;
const DrawerTitle = DialogTitle;
const DrawerDescription = DialogDescription;

// ---------- Text Reveal ----------
const TextReveal = ({ text, by = "word", className = "" }) => {
  const split = by === "word" ? text.split(" ") : text.split("");
  return (
    <motion.div className={className}>
      {split.map((item, index) => (
        <motion.span
          key={`${index}-${item}`}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3, delay: index * (by === "word" ? 0.1 : 0.05) }}
          className={`inline-block ${by === "word" ? "mr-2" : "mr-1"}`}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ---------- Navbar Component ----------
export function Navbar({ items, defaultActive = "Home", onProviderChange }) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(defaultActive);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Easter Egg
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [eggStep, setEggStep] = useState(0);
  const [showEggButtons, setShowEggButtons] = useState(false);

  // Provider
  const [providerOpen, setProviderOpen] = useState(false);
  const [iconColor, setIconColor] = useState("text-indigo-500");

  useEffect(() => {
    setMounted(true);
    const provider = localStorage.getItem("selectedProvider");
    if (provider === "hentai") setIconColor("text-purple-500");
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleOutsideClick = (e) => {
      if (mobileMenuOpen && e.target instanceof Element) {
        const menu = document.querySelector("[data-mobile-menu]");
        const btn = document.querySelector("[data-menu-button]");
        if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
          setMobileMenuOpen(false);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  const handleLogoClick = () => {
    const interaction = localStorage.getItem("lunar_moon_interaction");
    if (interaction === "true") {
      localStorage.setItem("selectedProvider", "hentai");
      setIconColor("text-purple-500");
      if (onProviderChange) onProviderChange("hentai");
      setTimeout(() => window.location.reload(), 300);
      return;
    }

    // Trigger Easter Egg
    setShowEasterEgg(true);
    setEggStep(1);
    setTimeout(() => setEggStep(2), 4000);
    setTimeout(() => setShowEggButtons(true), 8000);
  };

  const handleProviderSelect = (provider) => {
    localStorage.setItem("selectedProvider", provider);
    setIconColor(provider === "hentai" ? "text-purple-500" : "text-indigo-500");
    if (onProviderChange) onProviderChange(provider);
    setProviderOpen(false);
    setTimeout(() => window.location.reload(), 300);
  };

  const confirmEasterEgg = async () => {
    setShowEggButtons(false);
    setEggStep(3);
    await new Promise(resolve => setTimeout(resolve, 3000));
    localStorage.setItem("lunar_moon_interaction", "true");
    localStorage.setItem("selectedProvider", "hentai");
    setIconColor("text-purple-500");
    if (onProviderChange) onProviderChange("hentai");
    await new Promise(resolve => setTimeout(resolve, 2000));
    window.location.reload();
  };

  const handleNavClick = (url, name) => {
    setActive(name);
    window.location.href = url;
  };

  if (!mounted) return null;

  return (
    <>
      {/* ---------- Navbar ---------- */}
      <div className={cn("fixed left-0 right-0 z-[9999]", isMobile ? "top-2" : "top-6")}>
        <div className={cn("flex justify-center", isMobile ? "pt-1" : "pt-6")}>
          <motion.div
            className={cn(
              "flex items-center gap-3 bg-black/50 border border-white/10 backdrop-blur-lg shadow-lg relative",
              isMobile ? "w-[92%] justify-between py-3 px-4 rounded-3xl" : "w-auto py-3 px-4 rounded-full font-mono"
            )}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="flex items-center gap-2 px-2">
              <motion.button
                type="button"
                animate={{ y: [0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                onClick={handleLogoClick}
                className="cursor-pointer bg-transparent border-0 p-0"
              >
                <IconMark className={`h-7 w-7 ${iconColor}`} />
              </motion.button>
              <span className="font-bold text-lg text-white font-mono">LUNAR</span>
            </div>

            {/* ---------- Desktop Links ---------- */}
            {!isMobile && (
              <div className="flex items-center space-x-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.name;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.url, item.name);
                      }}
                      className={cn(
                        "relative cursor-pointer text-base font-semibold px-7 py-3.5 rounded-full transition-all duration-300 font-mono",
                        "text-white/70 hover:text-white",
                        isActive && "text-white"
                      )}
                    >
                      <motion.span className="relative z-10">{item.name}</motion.span>
                    </a>
                  );
                })}
              </div>
            )}

            {/* ---------- Mobile Menu ---------- */}
            {isMobile && (
              <>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white p-1.5"
                  data-menu-button
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <AnimatePresence>
                  {mobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-x-0 top-20 z-50 flex w-full flex-col items-start justify-start gap-2 rounded-2xl bg-black/95 backdrop-blur-xl px-4 py-4 border border-white/20 shadow-2xl font-mono"
                      data-mobile-menu
                    >
                      {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = active === item.name;
                        return (
                          <a
                            key={item.name}
                            href={item.url}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item.url, item.name);
                              setMobileMenuOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10",
                              isActive && "text-white bg-white/15 shadow-lg"
                            )}
                          >
                            <Icon size={20} strokeWidth={2.5} />
                            <span className="font-medium text-base">{item.name}</span>
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* ---------- Easter Egg ---------- */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
          >
            <div className="max-w-3xl mx-auto px-8 text-center font-mono">
              <AnimatePresence mode="wait">
                {eggStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <TextReveal text="A cold silence lingers beneath the moonlight." by="word" className="text-2xl md:text-4xl text-white/90" />
                  </motion.div>
                )}
                {eggStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center px-8 mb-8">
                      <TextReveal text="You seek to trespass into the dark side of the lunar realm…" by="word" className="text-2xl md:text-4xl text-white/90" />
                    </div>
                    <AnimatePresence>
                      {showEggButtons && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="flex gap-4 absolute mt-40">
                          <Button onClick={() => { setShowEasterEgg(false); setEggStep(0); setShowEggButtons(false); }} variant="outline" size="sm">NO</Button>
                          <Button onClick={confirmEasterEgg} size="sm" className="bg-indigo-600 hover:bg-indigo-700">YES</Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {eggStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
                    <TextReveal text="Ok..." by="character" className="text-4xl md:text-6xl text-white/90" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Provider Drawer ---------- */}
      <Drawer open={providerOpen} onOpenChange={setProviderOpen}>
        <DrawerContent className={cn(isMobile ? "w-[90%]" : "sm:max-w-md", "p-4 rounded-xl border-white/10 font-mono")}>
          <DrawerHeader>
            <DrawerTitle>Select Provider</DrawerTitle>
            <DrawerDescription>Choose which provider you want to use</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-2 py-4">
            <Button onClick={() => handleProviderSelect("2nd")} className="w-full">2nd Provider</Button>
            <Button onClick={() => handleProviderSelect("1st")} className="w-full">1st Provider</Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
