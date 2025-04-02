import { motion } from "framer-motion";
import { FaFire, FaShieldAlt, FaUserNinja } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaFire className="text-red-500 text-3xl" />,
      title: "Gates",
      description:
        "Mysterious portals that connect our world to dangerous dungeons full of monsters. They first appeared 10 years ago, completely changing the world order.",
    },
    {
      icon: <FaShieldAlt className="text-primary-500 text-3xl" />,
      title: "Hunters",
      description:
        "Individuals with special abilities who can enter gates and fight monsters. Ranked from E to S, they are the only ones who can protect humanity.",
    },
    {
      icon: <FaUserNinja className="text-secondary-500 text-3xl" />,
      title: "System",
      description:
        "A mysterious power that grants Sung Jin-Woo unique abilities, allowing him to level up and become stronger with each battle, unlike other hunters.",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 px-4 bg-gray-900 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold mb-4 text-gray-100"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            About Solo Leveling
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Solo Leveling (나 혼자만 레벨업) is a South Korean web novel written
            by Chugong. It tells the story of Sung Jin-Woo, an E-rank hunter who
            gains a mysterious power that allows him to level up in strength,
            unlike any other hunter in the world.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-gray-600 transition-all dark-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.2)",
              }}
              viewport={{ once: true }}
            >
              <div className="mb-4 p-2 inline-block bg-gray-900 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 md:p-12 rounded-2xl shadow-md border border-gray-700 dark-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-4 text-gray-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                "I'll clear this game-like world."
              </motion.h3>
              <motion.p
                className="mb-6 text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                After an incident in a particularly dangerous dungeon, Sung
                Jin-Woo, known as the "World's Weakest Hunter," gains a
                mysterious power and begins an incredible journey of growth. As
                he becomes stronger, he uncovers secrets about the system, the
                origin of dungeons, and his own destiny.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-gray-400 italic">
                  "I don't want to be someone who just survives within this
                  world anymore. I want to rule over it."
                  <span className="block mt-2 font-semibold text-gray-300">
                    — Sung Jin-Woo
                  </span>
                </p>
              </motion.div>
            </div>

            <motion.div
              className="bg-gray-800 bg-opacity-80 h-64 rounded-xl shadow-md border border-gray-700 flex items-center justify-center overflow-hidden glow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 to-secondary-900/20"></div>
                <span className="text-gray-400 relative z-10">
                  Jin-Woo Image
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
