import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShieldAlt, FaUser, FaStar } from "react-icons/fa";

// Hunter data array
const hunters = [
  {
    id: 1,
    name: "Sung Jin-Woo",
    rank: "S",
    nickname: "Shadow Monarch",
    nationality: "South Korean",
    association: "Hunters Guild",
    power: "Shadow Extraction",
    bio: "Initially the world's weakest hunter, Sung Jin-Woo underwent a mysterious transformation and gained the unique ability to level up and extract shadows from deceased monsters and hunters.",
    img: "https://cdn.myanimelist.net/images/characters/2/540692.jpg",
  },
  {
    id: 2,
    name: "Cha Hae-In",
    rank: "S",
    nickname: "White Tiger",
    nationality: "South Korean",
    association: "Hunters Guild",
    power: "Enhanced Senses",
    bio: "An S-Rank hunter known for her exceptional combat skills and unique ability to sense the 'smell' of other hunters. She is one of the few who can detect Jin-Woo's true power.",
    img: "https://cdn.myanimelist.net/images/characters/9/536361.jpg",
  },
  {
    id: 3,
    name: "Choi Jong-In",
    rank: "S",
    nickname: "Flame King",
    nationality: "South Korean",
    association: "Hunters Guild",
    power: "Pyrokinesis",
    bio: "A veteran S-Rank hunter with powerful flame manipulation abilities. He leads the Korean Hunters Guild and mentors many younger hunters.",
    img: "https://cdn.myanimelist.net/images/characters/7/531272.jpg",
  },
  {
    id: 4,
    name: "Baek Yoon-Ho",
    rank: "S",
    nickname: "Berserker",
    nationality: "South Korean",
    association: "White Tiger Guild",
    power: "Beast Transformation",
    bio: "The guild master of the White Tiger Guild who possesses the ability to transform into a powerful beast form, enhancing his physical abilities significantly.",
    img: "https://cdn.myanimelist.net/images/characters/4/531273.jpg",
  },
  {
    id: 5,
    name: "Thomas Andre",
    rank: "S+",
    nickname: "Goliath",
    nationality: "American",
    association: "Scavenger Guild",
    power: "Immense Strength",
    bio: "One of the five National Level Hunters globally, Thomas Andre possesses incredible physical strength and durability, making him nearly invulnerable to most attacks.",
    img: "data:image/jpeg;base64,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",
  },
  {
    id: 6,
    name: "Liu Zhigang",
    rank: "S+",
    nickname: "Emperor",
    nationality: "Chinese",
    association: "Chinese Hunter Association",
    power: "Gravity Manipulation",
    bio: "A National Level Hunter representing China, Liu Zhigang can manipulate gravity around him, allowing him to crush his enemies with immense pressure.",
    img: "https://cdn.myanimelist.net/images/characters/5/458521.jpg",
  },
  {
    id: 7,
    name: "Goto Ryuji",
    rank: "S",
    nickname: "Demon Slayer",
    nationality: "Japanese",
    association: "Japanese Hunter Association",
    power: "Enhanced Speed",
    bio: "Japan's strongest hunter, known for his incredible speed and precision in combat. He leads many of Japan's high-rank gate clearings.",
    img: "https://cdn.myanimelist.net/images/characters/2/443549.jpg",
  },
  {
    id: 8,
    name: "Christopher Reed",
    rank: "S+",
    nickname: "Phoenix",
    nationality: "British",
    association: "European Hunter Alliance",
    power: "Regeneration",
    bio: "A National Level Hunter with remarkable healing abilities that allow him to recover from nearly any injury. He coordinates Europe's defense against high-level threats.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_AI6gyQurcJ6e2Pt202u7HKEVRcBlQxfDT6Ay0d2TF5UX0IozYGM9S5c&s",
  },
];

const HuntersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHunter, setSelectedHunter] = useState(null);

  // Filter the hunters based on search term
  const filteredHunters = hunters.filter(
    (hunter) =>
      hunter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hunter.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hunter.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Select a hunter to display details
  const handleHunterSelect = (hunter) => {
    setSelectedHunter(hunter);
  };

  // Get color based on rank
  const getRankColor = (rank) => {
    switch (rank) {
      case "S+":
        return "bg-red-900 text-red-200 border-red-700";
      case "S":
        return "bg-orange-900 text-orange-200 border-orange-700";
      case "A":
        return "bg-yellow-900 text-yellow-200 border-yellow-700";
      case "B":
        return "bg-green-900 text-green-200 border-green-700";
      case "C":
        return "bg-blue-900 text-blue-200 border-blue-700";
      case "D":
        return "bg-indigo-900 text-indigo-200 border-indigo-700";
      case "E":
        return "bg-purple-900 text-purple-200 border-purple-700";
      default:
        return "bg-gray-800 text-gray-200 border-gray-700";
    }
  };

  // Animation variants for the details panel
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
    <div id="hunters" className="py-8 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          Hunters Database
        </h2>
        <div className="relative w-full md:w-96 mb-6">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search hunters by name, nickname or nationality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hunters List */}
          <div className="lg:col-span-1 bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 bg-gray-900">
              <h3 className="font-bold text-lg text-gray-100">
                Registered Hunters
              </h3>
              <p className="text-sm text-gray-400">
                Select a hunter to view details
              </p>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "480px" }}>
              {filteredHunters.length > 0 ? (
                <ul className="divide-y divide-gray-700">
                  {filteredHunters.map((hunter) => (
                    <motion.li
                      key={hunter.id}
                      className={`p-3 cursor-pointer transition-colors hover:bg-gray-700 ${
                        selectedHunter?.id === hunter.id ? "bg-gray-700" : ""
                      }`}
                      onClick={() => handleHunterSelect(hunter)}
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                          {hunter.img ? (
                            <img
                              src={hunter.img}
                              alt={hunter.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 font-bold text-sm">
                              {hunter.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-100">
                            {hunter.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {hunter.nickname} • {hunter.nationality}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <span
                            className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${getRankColor(
                              hunter.rank
                            )}`}
                          >
                            {hunter.rank}
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
                    No hunters found matching your search
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Hunter Details with Animation */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedHunter ? (
                <motion.div
                  key={selectedHunter.id}
                  className="flex flex-col h-full"
                  variants={detailsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="p-4 border-b border-gray-700 bg-gray-900 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-100">
                      Hunter Profile
                    </h3>
                    <span
                      className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${getRankColor(
                        selectedHunter.rank
                      )}`}
                    >
                      {selectedHunter.rank} Rank
                    </span>
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      <div className="w-full md:w-1/3 flex justify-center">
                        <div className="w-48 h-48 rounded-lg bg-gray-700 overflow-hidden shadow-md border border-gray-700">
                          {selectedHunter.img ? (
                            <img
                              src={selectedHunter.img}
                              alt={selectedHunter.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-500 font-bold text-4xl">
                                {selectedHunter.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full md:w-2/3">
                        <h2 className="text-2xl font-bold text-gray-100 mb-1">
                          {selectedHunter.name}
                        </h2>
                        <p className="text-gray-400 text-lg mb-4">
                          "{selectedHunter.nickname}"
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <FaUser className="text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm text-gray-400">
                                Nationality
                              </p>
                              <p className="text-gray-200">
                                {selectedHunter.nationality}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaShieldAlt className="text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm text-gray-400">
                                Association
                              </p>
                              <p className="text-gray-200">
                                {selectedHunter.association}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaStar className="text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm text-gray-400">Power</p>
                              <p className="text-gray-200">
                                {selectedHunter.power}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-100 mb-2">
                        Biography
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedHunter.bio}
                      </p>
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
                  <FaUser className="text-gray-700 text-6xl mb-4" />
                  <h3 className="text-xl font-medium text-gray-400 mb-2">
                    No Hunter Selected
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Select a hunter from the list to view their detailed profile
                    and stats
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

export default HuntersList;
