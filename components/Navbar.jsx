import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

// Simplified TextReveal
const TextReveal = ({ text, by = "word", className = "" }) => {
  const split = by === "word" ? text.split(" ") : text.split("")
  return (
    <motion.div className={className}>
      {split.map((item, index) => (
        <motion.span
          key={`${index}-${item}`}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.3,
            delay: index * (by === "word" ? 0.1 : 0.05)
          }}
          className={`inline-block ${by === "word" ? "mr-2" : "mr-1"}`}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function Navbar({
  items,
  className,
  defaultActive = "Home",
  onProviderChange
}) {
  // Mocks and State
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState(defaultActive)
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Easter Egg States
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [eggStep, setEggStep] = useState(0)
  const [showEggButtons, setShowEggButtons] = useState(false)

  // Provider States
  const [providerOpen, setProviderOpen] = useState(false)
  const [iconColor, setIconColor] = useState("text-indigo-500")

  useEffect(() => {
    setMounted(true)
    const provider = CookieMock.get("selectedProvider")
    if (provider === "hentai") {
      setIconColor("text-purple-500")
    } else {
      setIconColor("text-indigo-500")
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Handle scroll for navbar styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleOutsideClick = e => {
      if (mobileMenuOpen && e.target instanceof Element) {
        const menu = document.querySelector("[data-mobile-menu]")
        const btn = document.querySelector("[data-menu-button]")
        if (
          menu &&
          btn &&
          !menu.contains(e.target) &&
          !btn.contains(e.target)
        ) {
          setMobileMenuOpen(false)
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [mobileMenuOpen])

  const handleLogoClick = () => {
    const provider = CookieMock.get("selectedProvider")
    const interaction = localStorage.getItem("lunar_moon_interaction")

    if (provider === "hentai") {
      setProviderOpen(true)
      return
    }

    if (interaction === "true") {
      CookieMock.set("selectedProvider", "hentai", { expires: 365 })
      setIconColor("text-purple-500")
      if (onProviderChange) onProviderChange("hentai")
      setTimeout(() => {
        window.location.reload()
      }, 300)
      return
    }

    // Trigger Easter Egg
    setShowEasterEgg(true)
    setEggStep(1)
    setTimeout(() => {
      setEggStep(2)
    }, 4000)
    setTimeout(() => {
      setShowEggButtons(true)
    }, 8000)
  }

  const handleProviderSelect = provider => {
    CookieMock.set("selectedProvider", provider, { expires: 365 })
    if (provider === "hentai") {
      setIconColor("text-purple-500")
    } else {
      setIconColor("text-indigo-500")
    }
    if (onProviderChange) onProviderChange(provider)
    setProviderOpen(false)
    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  const confirmEasterEgg = async () => {
    setShowEggButtons(false)
    setEggStep(3)
    await new Promise(resolve => setTimeout(resolve, 3000))
    localStorage.setItem("lunar_moon_interaction", "true")
    CookieMock.set("selectedProvider", "hentai", { expires: 365 })
    setIconColor("text-purple-500")
    if (onProviderChange) onProviderChange("hentai")
    await new Promise(resolve => setTimeout(resolve, 2000))
    window.location.reload()
  }

  const handleNavClick = async (url, name) => {
    if (isScrolled) {
      setActive(name)
      if (url.startsWith("#") || url === pathname) {
        window.location.href = url
        return
      }
      setIsScrolled(true) // Keeping state
      await new Promise(r => setTimeout(r, 800))
      // Simulate navigation
      setIsScrolled(false)
      window.location.href = url
    } else {
      setActive(name)
      window.location.href = url
    }
  }

  if (!mounted) return null

  return (
    <>
      <div
        className={cn(
          "fixed left-0 right-0 z-[9999]",
          isMobile ? "top-2" : "top-6"
        )}
      >
        <div className={cn("flex justify-center", isMobile ? "pt-1" : "pt-6")}>
          <motion.div
            className={cn(
              "flex items-center gap-3 bg-black/50 border border-white/10 backdrop-blur-lg shadow-lg relative",
              isMobile
                ? "w-[92%] justify-between py-3 px-4 rounded-3xl"
                : "w-auto py-3 px-4 rounded-full font-mono"
            )}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {isMobile ? (
              <div className="flex items-center justify-between w-full">
                <motion.button
                  type="button"
                  animate={{ y: [0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  onClick={handleLogoClick}
                  className="cursor-pointer bg-transparent border-0 p-0"
                >
                  <IconMark className={`h-7 w-7 ${iconColor}`} />
                </motion.button>
                <span className="font-bold text-lg text-white absolute left-1/2 transform -translate-x-1/2 font-mono">
                  LUNAR
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-2">
                <motion.button
                  type="button"
                  animate={{ y: [0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  onClick={handleLogoClick}
                  className="cursor-pointer bg-transparent border-0 p-0"
                >
                  <IconMark className={`h-7 w-7 ${iconColor}`} />
                </motion.button>
                <span className="font-bold text-lg text-white font-mono">
                  LUNAR
                </span>
              </div>
            )}

            {isMobile ? (
              <>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white p-1.5"
                  data-menu-button
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
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
                      {items.map(item => {
                        const Icon = item.icon
                        const isActive = active === item.name
                        return (
                          <a
                            key={item.name}
                            href={item.url}
                            onClick={e => {
                              e.preventDefault()
                              handleNavClick(item.url, item.name)
                              setMobileMenuOpen(false)
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300",
                              "text-white/80 hover:text-white hover:bg-white/10",
                              isActive && "text-white bg-white/15 shadow-lg"
                            )}
                          >
                            <Icon size={20} strokeWidth={2.5} />
                            <span className="font-medium text-base">
                              {item.name}
                            </span>
                          </a>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {items.map(item => {
                  const Icon = item.icon
                  const isActive = active === item.name
                  const isHovered = hovered === item.name

                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      onClick={e => {
                        e.preventDefault()
                        handleNavClick(item.url, item.name)
                      }}
                      onMouseEnter={() => setHovered(item.name)}
                      onMouseLeave={() => setHovered(null)}
                      className={cn(
                        "relative cursor-pointer text-base font-semibold px-7 py-3.5 rounded-full transition-all duration-300 font-mono",
                        "text-white/70 hover:text-white",
                        isActive && "text-white",
                        isScrolled &&
                          !item.url.startsWith("#") &&
                          "pointer-events-none"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0.3, 0.5, 0.3],
                            scale: [1, 1.03, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                          <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                          {/* Shine Effect */}
                        </motion.div>
                      )}

                      <motion.span
                        className="hidden md:inline relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                      </motion.span>
                      <motion.span
                        className="md:hidden relative z-10"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon size={20} strokeWidth={2.5} />
                      </motion.span>

                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 bg-white/10 rounded-full -z-10"
                          />
                        )}
                      </AnimatePresence>

                      {/* Mascot Animation when Active */}
                      {isActive && (
                        <motion.div
                          layoutId="anime-mascot"
                          className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                          }}
                        >
                          <div className="relative w-12 h-12">
                            <motion.div
                              className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2"
                              animate={
                                hovered
                                  ? {
                                      scale: [1, 1.1, 1],
                                      rotate: [0, -5, 5, 0],
                                      transition: {
                                        duration: 0.5,
                                        ease: "easeInOut"
                                      }
                                    }
                                  : {
                                      y: [0, -3, 0],
                                      transition: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }
                                    }
                              }
                            >
                              {/* Eyes */}
                              <motion.div
                                className="absolute w-2 h-2 bg-black rounded-full"
                                animate={
                                  hovered
                                    ? {
                                        scaleY: [1, 0.2, 1],
                                        transition: {
                                          duration: 0.2,
                                          times: [0, 0.5, 1]
                                        }
                                      }
                                    : {}
                                }
                                style={{ left: "25%", top: "40%" }}
                              />
                              <motion.div
                                className="absolute w-2 h-2 bg-black rounded-full"
                                animate={
                                  hovered
                                    ? {
                                        scaleY: [1, 0.2, 1],
                                        transition: {
                                          duration: 0.2,
                                          times: [0, 0.5, 1]
                                        }
                                      }
                                    : {}
                                }
                                style={{ right: "25%", top: "40%" }}
                              />
                              {/* Blush */}
                              <motion.div
                                className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                                animate={{ opacity: hovered ? 0.8 : 0.6 }}
                                style={{ left: "15%", top: "55%" }}
                              />
                              <motion.div
                                className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                                animate={{ opacity: hovered ? 0.8 : 0.6 }}
                                style={{ right: "15%", top: "55%" }}
                              />
                              {/* Mouth */}
                              <motion.div
                                className="absolute w-4 h-2 border-b-2 border-black rounded-full"
                                animate={
                                  hovered
                                    ? { scaleY: 1.5, y: -1 }
                                    : { scaleY: 1, y: 0 }
                                }
                                style={{ left: "30%", top: "60%" }}
                              />

                              <AnimatePresence>
                                {hovered && (
                                  <>
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0 }}
                                      className="absolute -top-1 -right-1 w-2 h-2 text-yellow-300"
                                    >
                                      ✨
                                    </motion.div>
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0 }}
                                      transition={{ delay: 0.1 }}
                                      className="absolute -top-2 left-0 w-2 h-2 text-yellow-300"
                                    >
                                      ✨
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>
                            </motion.div>
                            {/* Body */}
                            <motion.div
                              className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                              animate={
                                hovered
                                  ? {
                                      y: [0, -4, 0],
                                      transition: {
                                        duration: 0.3,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                      }
                                    }
                                  : {
                                      y: [0, 2, 0],
                                      transition: {
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                      }
                                    }
                              }
                            >
                              <div className="w-full h-full bg-white rotate-45 transform origin-center" />
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </a>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Easter Egg Sequence */}
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
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <TextReveal
                      text="A cold silence lingers beneath the moonlight."
                      by="word"
                      className="text-2xl md:text-4xl text-white/90"
                    />
                  </motion.div>
                )}
                {eggStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center justify-center min-h-screen"
                  >
                    <div className="text-center px-8 mb-8">
                      <TextReveal
                        text="You seek to trespass into the dark side of the lunar realm…"
                        by="word"
                        className="text-2xl md:text-4xl text-white/90"
                      />
                    </div>
                    <AnimatePresence>
                      {showEggButtons && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="flex gap-4 absolute mt-40"
                        >
                          <Button
                            onClick={() => {
                              setShowEasterEgg(false)
                              setEggStep(0)
                              setShowEggButtons(false)
                            }}
                            variant="outline"
                            size="sm"
                            className="px-8 py-4 text-base border-white/30 hover:bg-white/10"
                          >
                            NO
                          </Button>
                          <Button
                            onClick={confirmEasterEgg}
                            size="sm"
                            className="px-8 py-4 text-base bg-indigo-600 hover:bg-indigo-700"
                          >
                            YES
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {eggStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                  >
                    <TextReveal
                      text="Ok..."
                      by="character"
                      className="text-4xl md:text-6xl text-white/90"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Provider Selection Drawer */}
      <Drawer open={providerOpen} onOpenChange={setProviderOpen}>
        <DrawerContent
          className={cn(
            isMobile ? "w-[90%] max-w-[90%]" : "sm:max-w-md",
            isMobile ? "p-3" : "p-4",
            "rounded-xl border-white/10 font-mono"
          )}
        >
          <DrawerHeader className={cn(isMobile ? "pb-1 space-y-1" : "pb-2")}>
            <DrawerTitle className={isMobile ? "text-lg" : ""}>
              Select Provider
            </DrawerTitle>
            <DrawerDescription
              className={isMobile ? "text-xs leading-tight" : ""}
            >
              Choose which provider you want to use
            </DrawerDescription>
          </DrawerHeader>
          <div className={cn(isMobile ? "py-2" : "py-4", "space-y-2")}>
            <Button
              onClick={() => handleProviderSelect("2nd")}
              className={cn("w-full", isMobile ? "text-xs h-8" : "text-sm h-9")}
              variant="outline"
            >
              2nd Provider
            </Button>
            <Button
              onClick={() => handleProviderSelect("1st")}
              className={cn("w-full", isMobile ? "text-xs h-8" : "text-sm h-9")}
              variant="outline"
            >
              1st Provider
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
