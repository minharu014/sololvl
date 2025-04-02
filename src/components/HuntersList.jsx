import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

const HuntersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("rank");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedHunter, setSelectedHunter] = useState(null);

  // Sample hunters data
  const hunters = [
    {
      id: 1,
      name: "Sung Jin-Woo",
      rank: "S",
      association: "Ahjin Guild",
      specialization: "Shadow Monarch",
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Cha Hae-In",
      rank: "S",
      association: "Hunter's Guild",
      specialization: "Swordsmanship",
      image: "https://via.placeholder.com/60",
    },
    {
      id: 3,
      name: "Choi Jong-In",
      rank: "S",
      association: "Hunter's Guild",
      specialization: "Mage",
      image: "https://via.placeholder.com/60",
    },
    {
      id: 4,
      name: "Baek Yoon-Ho",
      rank: "S",
      association: "White Tiger Guild",
      specialization: "Beast Transformation",
      image: "https://via.placeholder.com/60",
    },
    {
      id: 5,
      name: "Hwang Dong-Su",
      rank: "S",
      association: "Scavenger Guild",
      specialization: "Strength Enhancement",
      image: "https://via.placeholder.com/60",
    },
    {
      id: 6,
      name: "Go Gun-Hee",
      rank: "S",
      association: "Hunter Association",
      specialization: "Chairman",
      image: "https://via.placeholder.com/60",
    },
    {
      id: 7,
      name: "Min Byung-Gu",
      rank: "A",
      association: "Hunters Guild",
      specialization: "Healing",
      image: "https://via.placeholder.com/60",
    },
    {
      id: 8,
      name: "Kang Tae-Shik",
      rank: "B",
      association: "Hunters Guild",
      specialization: "Scouting",
      image: "https://via.placeholder.com/60",
    },
  ];

  // Sort handlers
  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Rank order mapping for proper sorting
  const rankOrder = { S: 0, A: 1, B: 2, C: 3, D: 4, E: 5 };

  // Filter and sort hunters
  const filteredAndSortedHunters = [...hunters]
    .filter(
      (hunter) =>
        hunter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hunter.association.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hunter.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "rank") {
        return sortOrder === "asc"
          ? rankOrder[a.rank] - rankOrder[b.rank]
          : rankOrder[b.rank] - rankOrder[a.rank];
      } else {
        const aValue = a[sortKey].toLowerCase();
        const bValue = b[sortKey].toLowerCase();
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });

  // Get hunter details
  const handleHunterSelect = (hunter) => {
    if (selectedHunter && selectedHunter.id === hunter.id) {
      setSelectedHunter(null);
    } else {
      setSelectedHunter(hunter);
    }
  };

  // Render rank with star
  const renderRank = (rank) => {
    const rankColors = {
      S: "text-yellow-500",
      A: "text-blue-500",
      B: "text-green-500",
      C: "text-purple-500",
      D: "text-orange-500",
      E: "text-gray-500",
    };

    return (
      <div className="flex items-center">
        <FaStar className={`mr-1 ${rankColors[rank]}`} />
        <span className="font-bold">{rank}</span>
      </div>
    );
  };

  return (
    <section id="hunters" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Hunter Database
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Browse through the most powerful hunters in the Solo Leveling
            universe. From the weakest E-rank to the legendary S-rank hunters.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 max-w-md mx-auto"
        >
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search hunters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </motion.div>

        {/* Hunters Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hunter
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("rank")}
                  >
                    <div className="flex items-center">
                      Rank
                      {sortKey === "rank" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                    onClick={() => toggleSort("association")}
                  >
                    <div className="flex items-center">
                      Association
                      {sortKey === "association" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden lg:table-cell"
                    onClick={() => toggleSort("specialization")}
                  >
                    <div className="flex items-center">
                      Specialization
                      {sortKey === "specialization" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedHunters.map((hunter) => (
                  <motion.tr
                    key={hunter.id}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedHunter?.id === hunter.id ? "bg-primary-50" : ""
                    }`}
                    onClick={() => handleHunterSelect(hunter)}
                    whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={hunter.image}
                            alt={hunter.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {hunter.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderRank(hunter.rank)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-700">
                        {hunter.association}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-700">
                        {hunter.specialization}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No results message */}
          {filteredAndSortedHunters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No hunters found matching your search criteria.
              </p>
            </div>
          )}
        </motion.div>

        {/* Hunter Details Panel */}
        {selectedHunter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedHunter.name}
              </h3>
              <button
                onClick={() => setSelectedHunter(null)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close details"
              >
                <FaChevronUp />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <span className="font-medium text-gray-500 mr-2">Rank:</span>
                {renderRank(selectedHunter.rank)}
              </div>
              <div>
                <span className="font-medium text-gray-500">Association:</span>
                <p className="text-gray-700">{selectedHunter.association}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">
                  Specialization:
                </span>
                <p className="text-gray-700">{selectedHunter.specialization}</p>
              </div>
            </div>

            <div className="mt-6">
              <span className="font-medium text-gray-500">Biography:</span>
              <p className="mt-2 text-gray-700">
                {selectedHunter.id === 1
                  ? "Sung Jin-Woo started as the world's weakest E-rank hunter, known as 'the weakest hunter of all mankind'. After a near-death experience in a double dungeon, he gained the mysterious 'System', allowing him to level up and gain strength beyond other hunters."
                  : "A renowned hunter known for their exceptional abilities and contributions to protecting humanity from the threats of the gates and dungeons."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HuntersList;
