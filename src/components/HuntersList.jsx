import { useState } from "react";
import { motion } from "framer-motion";
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
    img: "https://i.imgur.com/LdOXwD3.png",
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
    img: "https://i.imgur.com/lMS3CnK.png",
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
    img: "https://i.imgur.com/yH9qTpV.png",
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
    img: "https://i.imgur.com/NRYrwRp.png",
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
    img: "https://i.imgur.com/nH3q3SX.png",
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
    img: "https://i.imgur.com/Prc4vZu.png",
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
    img: "https://i.imgur.com/3fABPOb.png",
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
    img: "https://i.imgur.com/cY9PEiV.png",
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

          {/* Hunter Details */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            {selectedHunter ? (
              <div className="flex flex-col h-full">
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
                            <p className="text-sm text-gray-400">Nationality</p>
                            <p className="text-gray-200">
                              {selectedHunter.nationality}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FaShieldAlt className="text-gray-500 mr-2" />
                          <div>
                            <p className="text-sm text-gray-400">Association</p>
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
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                <FaUser className="text-gray-700 text-6xl mb-4" />
                <h3 className="text-xl font-medium text-gray-400 mb-2">
                  No Hunter Selected
                </h3>
                <p className="text-gray-500 max-w-md">
                  Select a hunter from the list to view their detailed profile
                  and stats
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuntersList;
