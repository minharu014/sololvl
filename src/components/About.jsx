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
      </div>
    </section>
  );
};

export default About;
