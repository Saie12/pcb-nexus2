import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      setIsCollapsed(scrollPosition > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Full Navbar that morphs into ball */}
      <motion.nav
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isCollapsed ? 0 : 1,
          scale: isCollapsed ? 0.15 : 1,
          y: isCollapsed ? -20 : 0,
          x: isCollapsed ? window.innerWidth / 2 - 100 : 0,
          borderRadius: isCollapsed ? "9999px" : "0px",
          pointerEvents: isCollapsed ? "none" : "auto"
        }}
        transition={{ 
          duration: 0.7,
          ease: [0.32, 0.72, 0, 1],
          scale: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
          borderRadius: { duration: 0.5 },
          x: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
          y: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "navbar-glass border-b border-[#00ff88]/20" : "bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-[#00ff88]/20"
        }`}
        style={{
          transformOrigin: "top right",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              animate={{
                scale: isCollapsed ? 0 : 1,
                opacity: isCollapsed ? 0 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <Link to="/" className="flex items-center space-x-2 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#0088ff] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.3)] group-hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all relative overflow-hidden"
                >
                  <span className="text-[#0a0a0a] font-bold text-xl relative z-10">S</span>
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 40 40">
                      <path d="M5,20 L15,20 M25,20 L35,20 M20,5 L20,15 M20,25 L20,35" stroke="#0a0a0a" strokeWidth="1" />
                    </svg>
                  </motion.div>
                </motion.div>
                <span className="text-xl font-bold text-white">Saiesh</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  animate={{
                    scale: isCollapsed ? 0 : 1,
                    opacity: isCollapsed ? 0 : 1,
                    x: isCollapsed ? 100 + (index * 20) : 0,
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: isCollapsed ? 0 : index * 0.03,
                    ease: [0.68, -0.55, 0.265, 1.55]
                  }}
                >
                  <Link to={link.path}>
                    <Button
                      variant="ghost"
                      className={`relative interactive-lift ${
                        isActive(link.path)
                          ? "text-[#00BFFF]"
                          : "text-gray-300 hover:text-[#00BFFF]"
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.5)]"
                        />
                      )}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2"
              animate={{
                scale: isCollapsed ? 0 : 1,
                opacity: isCollapsed ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && !isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#111111] border-t border-[#00ff88]/20"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        isActive(link.path)
                          ? "text-[#00BFFF] bg-[#00BFFF]/10"
                          : "text-gray-300"
                      }`}
                    >
                      {link.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Assistive Ball (appears from the collapsed navbar) */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={{
              top: 0,
              left: 0,
              right: window.innerWidth - 56,
              bottom: window.innerHeight - 56,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              delay: 0.3
            }}
            className="fixed top-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#00ff88] via-[#00BFFF] to-[#0088ff] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,191,255,0.2)",
                  "0 0 30px rgba(0,191,255,0.6), 0 0 60px rgba(0,255,136,0.3)",
                  "0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,191,255,0.2)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              {/* Circuit Pattern Background */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="20" stroke="#0a0a0a" strokeWidth="0.5" fill="none" />
                  <circle cx="28" cy="28" r="15" stroke="#0a0a0a" strokeWidth="0.5" fill="none" />
                  <circle cx="28" cy="28" r="10" stroke="#0a0a0a" strokeWidth="0.5" fill="none" />
                  <line x1="28" y1="8" x2="28" y2="18" stroke="#0a0a0a" strokeWidth="0.5" />
                  <line x1="28" y1="38" x2="28" y2="48" stroke="#0a0a0a" strokeWidth="0.5" />
                  <line x1="8" y1="28" x2="18" y2="28" stroke="#0a0a0a" strokeWidth="0.5" />
                  <line x1="38" y1="28" x2="48" y2="28" stroke="#0a0a0a" strokeWidth="0.5" />
                </svg>
              </motion.div>

              {/* Electric Pulse Effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#00BFFF]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              {/* Icon */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X size={24} className="text-[#0a0a0a] relative z-10" />
                ) : (
                  <Zap size={24} className="text-[#0a0a0a] relative z-10" />
                )}
              </motion.div>
            </motion.button>

            {/* Expanded Menu from Ball */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute top-16 right-0 w-56 bg-[#111111] border border-[#00ff88]/30 rounded-2xl shadow-[0_0_40px_rgba(0,255,136,0.2)] overflow-hidden backdrop-blur-xl"
                >
                  <div className="p-3 space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link to={link.path} onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${
                              isActive(link.path)
                                ? "text-[#00BFFF] bg-[#00BFFF]/10"
                                : "text-gray-300 hover:text-[#00BFFF] hover:bg-[#00BFFF]/5"
                            }`}
                          >
                            {link.name}
                          </Button>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}