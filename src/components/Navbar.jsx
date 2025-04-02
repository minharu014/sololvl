import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaArrowUp } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll events for navbar transparency and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      setShowScrollTop(position > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Map", href: "#map" },
    { name: "Hunters", href: "#hunters" },
    { name: "About", href: "#about" },
  ];

  return (
    <>
      <nav
        className={`bg-gray-900 border-b border-gray-800 py-3 px-4 sticky top-0 z-50 transition-all duration-300 ${
          scrollPosition > 50 ? "shadow-lg bg-opacity-95" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="text-xl sm:text-2xl font-bold text-gray-100">
              <span className="text-primary-500">Solo</span>
              <span className="border-b-2 border-primary-500">Lvl</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800 mt-3 py-2 px-4 rounded-lg shadow-md border border-gray-700"
          >
            <div className="flex flex-col">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-primary-400 transition-colors py-2 border-b border-gray-700 last:border-0"
                  onClick={toggleMenu}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-800 text-primary-500 p-3 rounded-full shadow-lg border border-gray-700 z-40 hover:bg-gray-700 transition-colors"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </>
  );
};

export default Navbar;
