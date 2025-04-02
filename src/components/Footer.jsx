import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              Solo Leveling Fan Project
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              This is a fan-made project inspired by the Solo Leveling manhwa
              and anime. All characters, locations, and storylines belong to
              their respective owners.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Disclaimer</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              This website is not affiliated with the official Solo Leveling
              franchise. Created for educational and entertainment purposes
              only.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Connect</h3>
            <div className="flex space-x-6 text-2xl">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaDiscord />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Solo Leveling Fan Project. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
