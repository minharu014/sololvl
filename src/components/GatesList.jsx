import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaChevronRight,
} from "react-icons/fa";

const GatesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Sample gates data with locations in Japan
  const gates = [
    {
      id: 1,
      name: "Shinjuku Gate",
      rank: "S",
      location: "Shinjuku, Tokyo",
      status: "Active",
      threatLevel: "Extreme",
      country: "Japan",
    },
    {
      id: 2,
      name: "Osaka Dungeon",
      rank: "A",
      location: "Osaka",
      status: "Active",
      threatLevel: "High",
      country: "Japan",
    },
    {
      id: 3,
      name: "Kyoto Ancient Gate",
      rank: "B",
      location: "Kyoto",
      status: "Dormant",
      threatLevel: "Medium",
      country: "Japan",
    },
    {
      id: 4,
      name: "Hokkaido Ice Cavern",
      rank: "A",
      location: "Hokkaido",
      status: "Active",
      threatLevel: "High",
      country: "Japan",
    },
    {
      id: 5,
      name: "Mt. Fuji Gate",
      rank: "S",
      location: "Mt. Fuji",
      status: "Active",
      threatLevel: "Extreme",
      country: "Japan",
    },
    {
      id: 6,
      name: "Nagoya Abyss",
      rank: "C",
      location: "Nagoya",
      status: "Cleared",
      threatLevel: "Low",
      country: "Japan",
    },
    {
      id: 7,
      name: "Yokohama Harbor Gate",
      rank: "B",
      location: "Yokohama",
      status: "Active",
      threatLevel: "Medium",
      country: "Japan",
    },
    {
      id: 8,
      name: "Okinawa Underwater Cave",
      rank: "A",
      location: "Okinawa",
      status: "Active",
      threatLevel: "High",
      country: "Japan",
    },
    {
      id: 9,
      name: "Sapporo Winter Gate",
      rank: "D",
      location: "Sapporo",
      status: "Dormant",
      threatLevel: "Very Low",
      country: "Japan",
    },
    {
      id: 10,
      name: "Fukuoka Ancient Temple",
      rank: "E",
      location: "Fukuoka",
      status: "Cleared",
      threatLevel: "Minimal",
      country: "Japan",
    },
    {
      id: 11,
      name: "Hiroshima Memorial Gate",
      rank: "B",
      location: "Hiroshima",
      status: "Active",
      threatLevel: "Medium",
      country: "Japan",
    },
    {
      id: 12,
      name: "Tokyo Bay Underwater Gate",
      rank: "S",
      location: "Tokyo Bay",
      status: "Active",
      threatLevel: "Extreme",
      country: "Japan",
    },
  ];

  // Filter gates based on search term and filter
  const filteredGates = gates.filter((gate) => {
    const matchesSearch =
      gate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gate.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && gate.status === "Active") ||
      (filter === "dormant" && gate.status === "Dormant") ||
      (filter === "cleared" && gate.status === "Cleared") ||
      (filter === "high-threat" && (gate.rank === "S" || gate.rank === "A"));

    return matchesSearch && matchesFilter;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-500";
      case "Dormant":
        return "text-yellow-500";
      case "Cleared":
        return "text-gray-500";
      default:
        return "text-gray-400";
    }
  };

  // Get rank color
  const getRankColor = (rank) => {
    switch (rank) {
      case "S":
        return "bg-red-900 text-red-200";
      case "A":
        return "bg-orange-900 text-orange-200";
      case "B":
        return "bg-yellow-900 text-yellow-200";
      case "C":
        return "bg-green-900 text-green-200";
      case "D":
        return "bg-blue-900 text-blue-200";
      case "E":
        return "bg-purple-900 text-purple-200";
      default:
        return "bg-gray-800 text-gray-200";
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-md dark-card overflow-hidden h-full flex flex-col">
      <div className="p-3 border-b border-gray-700 bg-gray-900">
        <h3 className="text-lg font-bold text-gray-100 mb-2">Gates Database</h3>

        <div className="flex gap-2">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Search gates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-1 pl-7 pr-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 dark-input text-sm"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-1 px-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 dark-input text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="dormant">Dormant</option>
            <option value="cleared">Cleared</option>
            <option value="high-threat">S/A Rank</option>
          </select>
        </div>
      </div>

      <div className="overflow-y-auto flex-grow max-h-[320px]">
        {filteredGates.length > 0 ? (
          <ul className="divide-y divide-gray-700">
            {filteredGates.map((gate) => (
              <motion.li
                key={gate.id}
                className="p-2 hover:bg-gray-700 transition-colors cursor-pointer"
                whileHover={{ x: 3 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${getRankColor(
                          gate.rank
                        )} font-bold text-xs mr-2`}
                      >
                        {gate.rank}
                      </span>
                      <h4 className="text-gray-100 font-medium text-sm">
                        {gate.name}
                      </h4>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {gate.location}, {gate.country}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`text-xs ${getStatusColor(gate.status)} mr-2`}
                    >
                      {gate.status}
                    </span>
                    <FaChevronRight className="text-gray-500 text-xs" />
                  </div>
                </div>

                <div className="mt-1 flex items-center">
                  <FaExclamationTriangle
                    className={
                      gate.threatLevel === "Extreme"
                        ? "text-red-500 text-xs"
                        : gate.threatLevel === "High"
                        ? "text-orange-500 text-xs"
                        : gate.threatLevel === "Medium"
                        ? "text-yellow-500 text-xs"
                        : "text-gray-500 text-xs"
                    }
                  />
                  <span className="text-xs text-gray-400 ml-1">
                    Threat: {gate.threatLevel}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-400 text-sm">
              No gates match your search criteria.
            </p>
          </div>
        )}
      </div>

      <div className="p-2 border-t border-gray-700 bg-gray-900">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Total gates: {gates.length}</span>
          <span className="text-gray-400">Showing: {filteredGates.length}</span>
        </div>
      </div>
    </div>
  );
};

export default GatesList;
