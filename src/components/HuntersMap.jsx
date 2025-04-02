import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locations from "../data/locations";
import { FaLocationArrow, FaTimesCircle, FaInfoCircle } from "react-icons/fa";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons based on dungeon rank
const createRankIcon = (rank) => {
  let color;
  let size;
  switch (rank) {
    case "S-Rank":
      color = "#ef4444"; // Red
      size = 32;
      break;
    case "A-Rank":
      color = "#f97316"; // Orange
      size = 28;
      break;
    case "B-Rank":
      color = "#eab308"; // Yellow
      size = 24;
      break;
    case "C-Rank":
      color = "#22c55e"; // Green
      size = 22;
      break;
    case "D-Rank":
      color = "#3b82f6"; // Blue
      size = 20;
      break;
    case "E-Rank":
      color = "#a855f7"; // Purple
      size = 18;
      break;
    default:
      color = "#3b82f6"; // Default blue
      size = 20;
  }

  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: ${
      size / 2.5
    }px;">${rank[0]}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
};

// Map view controller
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Custom dark map style
const darkMapStyle =
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";

const HuntersMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([36.5, 127.5]); // Center of South Korea
  const [mapZoom, setMapZoom] = useState(7);
  const mapRef = useRef(null);

  // Handle marker click
  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setMapCenter(location.coords);
    setMapZoom(12);
  };

  // Close details panel
  const closeDetails = () => {
    setSelectedLocation(null);
    setMapZoom(7);
    setMapCenter([36.5, 127.5]);
  };

  // Reset view to show all markers
  const resetView = () => {
    setMapZoom(7);
    setMapCenter([36.5, 127.5]);
  };

  return (
    <section id="map" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Hunters Association Map
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Explore the dangerous gates and dungeons across South Korea that have
          appeared in Solo Leveling. Click on a marker to learn more about each
          location.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2 h-[600px] rounded-xl overflow-hidden shadow-sm border border-gray-200 relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
              ref={mapRef}
              attributionControl={false}
            >
              <TileLayer url={darkMapStyle} attribution="" />
              <ZoomControl position="topright" />
              <ChangeView center={mapCenter} zoom={mapZoom} />

              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coords}
                  icon={createRankIcon(location.rank)}
                  eventHandlers={{
                    click: () => handleMarkerClick(location),
                  }}
                >
                  <Popup className="marker-popup">
                    <div className="font-bold">{location.name}</div>
                    <div className="text-sm">{location.rank}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-[999]">
              <button
                onClick={resetView}
                className="bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-sm border border-gray-200 transition-all duration-300"
                title="Reset View"
              >
                <FaLocationArrow />
              </button>
            </div>
          </div>

          {/* Location Details Panel */}
          <div className="lg:col-span-1">
            {selectedLocation ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full map-card"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedLocation.name}
                  </h3>
                  <button
                    onClick={closeDetails}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close details"
                  >
                    <FaTimesCircle className="text-xl" />
                  </button>
                </div>

                <div
                  className="mb-4 inline-block px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor:
                      selectedLocation.rank === "S-Rank"
                        ? "rgba(239, 68, 68, 0.1)"
                        : selectedLocation.rank === "A-Rank"
                        ? "rgba(249, 115, 22, 0.1)"
                        : selectedLocation.rank === "B-Rank"
                        ? "rgba(234, 179, 8, 0.1)"
                        : selectedLocation.rank === "C-Rank"
                        ? "rgba(34, 197, 94, 0.1)"
                        : selectedLocation.rank === "D-Rank"
                        ? "rgba(59, 130, 246, 0.1)"
                        : "rgba(168, 85, 247, 0.1)",
                    color:
                      selectedLocation.rank === "S-Rank"
                        ? "#ef4444"
                        : selectedLocation.rank === "A-Rank"
                        ? "#f97316"
                        : selectedLocation.rank === "B-Rank"
                        ? "#eab308"
                        : selectedLocation.rank === "C-Rank"
                        ? "#22c55e"
                        : selectedLocation.rank === "D-Rank"
                        ? "#3b82f6"
                        : "#a855f7",
                  }}
                >
                  {selectedLocation.rank}
                </div>

                <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-700/5"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-primary-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-400 relative z-10">
                    Location Image
                  </span>
                </div>

                <p className="text-gray-600 mb-6">
                  {selectedLocation.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      {selectedLocation.coords[0].toFixed(4)},{" "}
                      {selectedLocation.coords[1].toFixed(4)}
                    </p>
                  </div>
                  {selectedLocation.source && (
                    <div className="text-xs text-gray-400 italic">
                      Source: {selectedLocation.source}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col justify-center items-center text-center map-card"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <FaInfoCircle className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Select a Location
                </h3>
                <p className="text-gray-500 mb-6 max-w-xs">
                  Click on any marker on the map to view detailed information
                  about that dungeon.
                </p>
                <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                  {["S-Rank", "A-Rank", "B-Rank", "D-Rank", "E-Rank"].map(
                    (rank) => (
                      <div
                        key={rank}
                        className="flex items-center justify-center p-2 rounded-lg bg-gray-50"
                      >
                        <div
                          style={{
                            backgroundColor:
                              rank === "S-Rank"
                                ? "#ef4444"
                                : rank === "A-Rank"
                                ? "#f97316"
                                : rank === "B-Rank"
                                ? "#eab308"
                                : rank === "C-Rank"
                                ? "#22c55e"
                                : rank === "D-Rank"
                                ? "#3b82f6"
                                : "#a855f7",
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "6px",
                          }}
                        ></div>
                        <span className="text-xs text-gray-700">{rank}</span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HuntersMap;
