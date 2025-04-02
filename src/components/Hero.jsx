import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="pt-20 pb-24 overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-100 mb-6">
              <span className="block mb-2">Welcome to the</span>
              <span className="logo-text glow-text">Solo Leveling</span>
              <span className="block mt-2">Universe</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Explore the dangerous world of gates and dungeons from the popular
              manhwa and anime. Track the journey of Sung Jin-Woo as he rises
              from the Weakest Hunter to the Shadow Monarch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="#map"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium shadow-md hover:bg-primary-700 transition-colors"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 8px rgba(99, 102, 241, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Map
              </motion.a>
              <motion.a
                href="#hunters"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-800 text-primary-400 font-medium shadow-md border border-primary-500 hover:bg-gray-700 transition-colors"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 8px rgba(99, 102, 241, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Hunters
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="w-full h-[500px] relative">
              {/* Decorative elements */}
              <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-900 blur-3xl opacity-20"></div>
              <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-secondary-900 blur-3xl opacity-20"></div>

              {/* Placeholder for hero image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80 rounded-lg bg-gray-800 shadow-lg overflow-hidden flex items-center justify-center border border-gray-700 glow-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 to-secondary-900/20"></div>
                  <span className="text-lg text-gray-400 relative z-10">
                    Hero Image
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
