import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaSkull, FaShieldAlt, FaBolt } from "react-icons/fa";
import { GiSwordman } from "react-icons/gi";

// Shadow soldiers data from the anime
const shadows = [
  {
    id: 1,
    name: "Igris",
    rank: "Marshal",
    origin: "Cartenon Temple Knight",
    abilities: "Swordsmanship, Loyalty, Leadership",
    description:
      "A knight-type shadow and Jin-Woo's first high-ranking shadow. Originally the guardian of Cartenon Temple, Igris serves as Jin-Woo's most loyal soldier and the marshal of his shadow army. His exceptional swordsmanship makes him one of Jin-Woo's most valuable assets in battle.",
    img: "https://static.beebom.com/wp-content/uploads/2025/01/Igris.jpg?w=1024",
  },
  {
    id: 2,
    name: "Tank",
    rank: "Elite",
    origin: "Greater Orc from Hunters Guild Gate",
    abilities: "Durability, Shield Defense, Taunt",
    description:
      "A heavy-set orc that specializes in defense. Tank was extracted during the incident at the Hunters Guild Gate and serves as a frontline defender for Jin-Woo's shadow army. His incredible durability makes him perfect for absorbing damage while other shadows attack.",
    img: "https://www.anitrendz.com/_next/image?url=https%3A%2F%2Fi0.wp.com%2Fanitrendz.net%2Fnews%2Fwp-content%2Fuploads%2F2025%2F01%2Fsolo-leveling-season-2-tank-visual-e1737264518681.jpg%3Ffit%3D1458%252C822%26ssl%3D1&w=1920&q=75",
  },
  {
    id: 3,
    name: "Tusk",
    rank: "Elite",
    origin: "High Orc Chieftain",
    abilities: "Berserker Rage, Brute Strength, War Cry",
    description:
      "Formerly a High Orc Chieftain, Tusk is a powerful offensive shadow with immense physical strength. Extracted during the High Orc dungeon raid, this shadow serves as one of Jin-Woo's primary damage dealers. In life, he led the High Orcs that caused significant casualties among hunters.",
    img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2025/02/9965d76c-1775-4c8d-8daa-57f3f7e5c699.jpeg",
  },
  {
    id: 4,
    name: "Beru",
    rank: "General",
    origin: "Ant King from Jeju Island",
    abilities: "Regeneration, Flight, Energy Projection, Telepathy",
    description:
      "The Ant King from the Jeju Island S-Rank Gate, Beru is arguably Jin-Woo's most powerful shadow. With incredible combat abilities, regeneration, and flight, Beru can single-handedly defeat entire armies. His personality carries over after extraction, making him verbose and eager to please his master.",
    img: "https://makerworld.bblmw.com/makerworld/model/US25cf512d28d7ec/design/2024-09-07_e4919434496da.jpg?x-oss-process=image/resize,w_1000/format,webp",
  },
];

const ShadowsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShadow, setSelectedShadow] = useState(null);

  // Filter shadows based on search term
  const filteredShadows = shadows.filter(
    (shadow) =>
      shadow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shadow.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shadow.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Select a shadow to display details
  const handleShadowSelect = (shadow) => {
    setSelectedShadow(shadow);
  };

  // Get rank color
  const getRankColor = (rank) => {
    switch (rank) {
      case "General":
        return "bg-purple-900 text-purple-200 border-purple-700";
      case "Marshal":
        return "bg-indigo-900 text-indigo-200 border-indigo-700";
      case "Elite":
        return "bg-blue-900 text-blue-200 border-blue-700";
      default:
        return "bg-gray-800 text-gray-200 border-gray-700";
    }
  };

  // Simple animation variants for the details panel
  const detailsVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div id="shadows" className="py-8 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Shadow Army</h2>
        <div className="relative w-full md:w-96 mb-6">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search shadows by name, rank or origin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shadows List */}
          <div className="lg:col-span-1 bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 bg-gray-900">
              <h3 className="font-bold text-lg text-gray-100">
                Extracted Shadows
              </h3>
              <p className="text-sm text-gray-400">
                Select a shadow to view details
              </p>
            </div>
            <div
              className="overflow-y-auto overflow-x-hidden"
              style={{ maxHeight: "480px" }}
            >
              {filteredShadows.length > 0 ? (
                <ul className="divide-y divide-gray-700">
                  {filteredShadows.map((shadow) => (
                    <motion.li
                      key={shadow.id}
                      className={`p-3 cursor-pointer transition-colors hover:bg-gray-700 ${
                        selectedShadow?.id === shadow.id ? "bg-gray-700" : ""
                      }`}
                      onClick={() => handleShadowSelect(shadow)}
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                          {shadow.img ? (
                            <img
                              src={shadow.img}
                              alt={shadow.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FaSkull className="text-gray-400" />
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-100">
                            {shadow.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {shadow.origin}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <span
                            className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${getRankColor(
                              shadow.rank
                            )}`}
                          >
                            {shadow.rank}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center p-8">
                  <FaSearch className="text-gray-600 text-4xl mb-2" />
                  <p className="text-gray-400">
                    No shadows found matching your search
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Shadow Details with Animation */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedShadow ? (
                <motion.div
                  key={selectedShadow.id}
                  className="flex flex-col h-full"
                  variants={detailsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="p-4 border-b border-gray-700 bg-gray-900 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-100">
                      Shadow Profile
                    </h3>
                    <span
                      className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${getRankColor(
                        selectedShadow.rank
                      )}`}
                    >
                      {selectedShadow.rank}
                    </span>
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      <div className="w-full md:w-1/3 flex justify-center">
                        <div className="w-48 h-48 rounded-lg bg-gray-700 overflow-hidden shadow-md border border-gray-700">
                          {selectedShadow.img ? (
                            <img
                              src={selectedShadow.img}
                              alt={selectedShadow.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaSkull className="text-gray-500 text-6xl" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full md:w-2/3">
                        <h2 className="text-2xl font-bold text-gray-100 mb-1">
                          {selectedShadow.name}
                        </h2>
                        <p className="text-gray-400 text-sm mb-4">
                          Originally: {selectedShadow.origin}
                        </p>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-start">
                            <FaBolt className="text-gray-500 mr-2 mt-1" />
                            <div>
                              <p className="text-sm text-gray-400">Abilities</p>
                              <p className="text-gray-200">
                                {selectedShadow.abilities}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-100 mb-2">
                        Description
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedShadow.description}
                      </p>

                      <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-gray-700">
                        <p className="text-xs text-gray-400 italic">
                          "Arise." — Sung Jin-Woo, Shadow Monarch
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="flex flex-col items-center justify-center h-full p-12 text-center"
                  variants={detailsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <FaSkull className="text-gray-700 text-6xl mb-4" />
                  <h3 className="text-xl font-medium text-gray-400 mb-2">
                    No Shadow Selected
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Select a shadow from the list to view its detailed profile
                    and abilities
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadowsList;
