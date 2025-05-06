import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaChevronRight,
  FaMapMarkerAlt,
} from "react-icons/fa";
import locations from "../data/locations"; // import locations data

const GatesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // handle gate click to center map on location
  const handleGateClick = (gate) => {
    // dispatch custom event with gate data that map component can listen for
    const event = new CustomEvent("gateSelected", {
      detail: {
        lat: gate.lat,
        lng: gate.lng,
        id: gate.id,
      },
    });
    window.dispatchEvent(event);
  };

  // Filter gates based on search term and filter
  const filteredGates = locations.filter((gate) => {
    const matchesSearch =
      gate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gate.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && gate.status === "Active") ||
      (filter === "dormant" && gate.status === "Dormant") ||
      (filter === "cleared" && gate.status === "Cleared") ||
      (filter === "high-threat" && (gate.rank === "S" || gate.rank === "A"));

    return matchesSearch && matchesFilter;
  });

  // Get status color - determine status based on threat level
  const getStatusColor = (gate) => {
    if (!gate.status) {
      // derive status from threat level if not explicitly provided
      const threatLevel = gate.description?.includes("cleared")
        ? "Cleared"
        : gate.description?.includes("dormant")
        ? "Dormant"
        : "Active";

      switch (threatLevel) {
        case "Active":
          return "text-green-500";
        case "Dormant":
          return "text-yellow-500";
        case "Cleared":
          return "text-gray-500";
        default:
          return "text-gray-400";
      }
    }

    switch (gate.status) {
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

  // Get threat level from description or fall back to rank-based estimation
  const getThreatLevel = (gate) => {
    // if threat level is explicit, use it
    if (gate.threatLevel) return gate.threatLevel;

    // derive threat level from rank if not explicitly provided
    switch (gate.rank) {
      case "S":
        return "Extreme";
      case "A":
        return "High";
      case "B":
        return "Medium";
      case "C":
        return "Low";
      case "D":
        return "Very Low";
      case "E":
        return "Minimal";
      default:
        return "Unknown";
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

  // Get threat icon color
  const getThreatIconColor = (threatLevel) => {
    switch (threatLevel) {
      case "Extreme":
        return "text-red-500 text-xs";
      case "High":
        return "text-orange-500 text-xs";
      case "Medium":
        return "text-yellow-500 text-xs";
      case "Low":
        return "text-green-500 text-xs";
      case "Very Low":
        return "text-blue-500 text-xs";
      case "Minimal":
        return "text-purple-500 text-xs";
      default:
        return "text-gray-500 text-xs";
    }
  };

  // Get status text
  const getStatusText = (gate) => {
    if (gate.status) return gate.status;

    // derive status from description
    if (gate.description?.includes("cleared")) return "Cleared";
    if (gate.description?.includes("dormant")) return "Dormant";
    return "Active";
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden h-full flex flex-col overflow-x-hidden">
      <div className="p-3 border-b border-gray-700 bg-gray-900">
        <h3 className="text-lg font-bold text-gray-100 mb-2">Gates Database</h3>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow min-w-0">
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Search gates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-1 pl-7 pr-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-1 px-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="dormant">Dormant</option>
            <option value="cleared">Cleared</option>
            <option value="high-threat">S/A Rank</option>
          </select>
        </div>
      </div>

      <div className="overflow-y-auto flex-grow max-h-[500px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 overflow-x-hidden">
        {filteredGates.length > 0 ? (
          <ul className="divide-y divide-gray-700">
            {filteredGates.map((gate) => (
              <motion.li
                key={gate.id}
                className="p-3 hover:bg-gray-700/50 transition-colors cursor-pointer overflow-hidden"
                whileHover={{ x: 3, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                onClick={() => handleGateClick(gate)}
              >
                <div className="flex items-start justify-between overflow-hidden">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <span
                        className={`inline-flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full ${getRankColor(
                          gate.rank
                        )} font-bold text-xs mr-2 shadow-md`}
                      >
                        {gate.rank}
                      </span>
                      <h4 className="text-gray-100 font-medium text-sm truncate">
                        {gate.name}
                      </h4>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 ml-8 truncate">
                      {gate.location || gate.country}
                    </p>
                  </div>
                  <div className="flex items-center flex-shrink-0 ml-2">
                    <span
                      className={`text-xs ${getStatusColor(
                        gate
                      )} mr-2 font-medium px-1.5 py-0.5 rounded-full bg-gray-800/50 border border-gray-700/50 whitespace-nowrap`}
                    >
                      {getStatusText(gate)}
                    </span>
                    <FaMapMarkerAlt className="text-gray-500 text-xs mr-1" />
                    <FaChevronRight className="text-gray-500 text-xs" />
                  </div>
                </div>

                <div className="mt-2 flex items-center ml-8 overflow-hidden">
                  <FaExclamationTriangle
                    className={getThreatIconColor(getThreatLevel(gate))}
                  />
                  <span className="text-xs text-gray-400 ml-1.5 font-medium truncate">
                    {getThreatLevel(gate)} Threat
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
          <span className="text-gray-400">Total gates: {locations.length}</span>
          <span className="text-gray-400">Showing: {filteredGates.length}</span>
        </div>
      </div>
    </div>
  );
};

export default GatesList;
