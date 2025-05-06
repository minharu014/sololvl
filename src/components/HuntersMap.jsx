import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayerGroup,
  CircleMarker,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locations from "../data/locations";
import { motion } from "framer-motion";

// Fix for default marker icons in Leaflet with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Create custom icons for different gate ranks
const createRankIcon = (rank) => {
  const getRankColor = (rank) => {
    switch (rank) {
      case "S":
        return "#ef4444"; // red-500
      case "A":
        return "#f97316"; // orange-500
      case "B":
        return "#eab308"; // yellow-500
      case "C":
        return "#22c55e"; // green-500
      case "D":
        return "#3b82f6"; // blue-500
      case "E":
        return "#a855f7"; // purple-500
      default:
        return "#6b7280"; // gray-500
    }
  };

  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${getRankColor(
      rank
    )}; color: white; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 50%; font-weight: bold; box-shadow: 0 0 10px rgba(0,0,0,0.5);">${rank}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

// Map Center component
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Add component that listens for gate selection
const GateSelectionListener = ({ setMapCenter, setMapZoom }) => {
  const map = useMap();

  useEffect(() => {
    // listen for gate selection event
    const handleGateSelected = (event) => {
      const { lat, lng, id } = event.detail;
      map.setView([lat, lng], 10); // zoom to selected gate

      // find the marker for this gate and open its popup
      const selectedGate = locations.find((location) => location.id === id);
      if (selectedGate) {
        // update the parent component state to reflect new center
        setMapCenter([lat, lng]);
        setMapZoom(10);

        // find the gate marker and open its popup
        setTimeout(() => {
          const markers = document.querySelectorAll(".leaflet-marker-icon");
          markers.forEach((marker) => {
            const markerPosition = marker._leaflet_pos;
            if (markerPosition) {
              const point = L.point(markerPosition.x, markerPosition.y);
              const latLng = map.containerPointToLatLng(point);
              if (
                Math.abs(latLng.lat - lat) < 0.001 &&
                Math.abs(latLng.lng - lng) < 0.001
              ) {
                marker.click();
              }
            }
          });
        }, 100);
      }
    };

    window.addEventListener("gateSelected", handleGateSelected);

    return () => {
      window.removeEventListener("gateSelected", handleGateSelected);
    };
  }, [map, setMapCenter, setMapZoom]);

  return null;
};

const HuntersMap = () => {
  const [mapCenter, setMapCenter] = useState([38.0, 129.0]); // Between Korea and Japan
  const [mapZoom, setMapZoom] = useState(4);
  const [countryFilter, setCountryFilter] = useState("all");
  const [rankFilter, setRankFilter] = useState("all");
  const mapRef = useRef(null);

  // Filter locations based on selected country and rank
  const filteredLocations = locations.filter((location) => {
    const matchesCountry =
      countryFilter === "all" || location.country === countryFilter;
    const matchesRank = rankFilter === "all" || location.rank === rankFilter;
    return matchesCountry && matchesRank;
  });

  // Center map on a specific country
  const centerMapOnCountry = useCallback((country) => {
    switch (country) {
      case "South Korea":
        setMapCenter([37.5665, 126.978]); // Seoul
        setMapZoom(6);
        break;
      case "Japan":
        setMapCenter([35.6762, 139.6503]); // Tokyo
        setMapZoom(5);
        break;
      default:
        setMapCenter([38.0, 129.0]); // Between Korea and Japan
        setMapZoom(4);
        break;
    }
  }, []);

  // Handle country filter change
  const handleCountryFilterChange = (e) => {
    const country = e.target.value;
    setCountryFilter(country);
    if (country !== "all") {
      centerMapOnCountry(country);
    } else {
      // Show both countries if "all" is selected
      setMapCenter([38.0, 129.0]); // Between Korea and Japan
      setMapZoom(4);
    }
  };

  // Handle rank filter change
  const handleRankFilterChange = (e) => {
    setRankFilter(e.target.value);
  };

  // Generate popup content for a location
  const getPopupContent = (location) => {
    return `
      <div class="location-popup">
        <h3 style="color: #f3f4f6; margin-bottom: 5px; font-weight: bold;">${
          location.name
        }</h3>
        <p style="color: #d1d5db; margin-bottom: 5px; font-size: 0.9rem;">${
          location.description
        }</p>
        <div style="display: flex; align-items: center; margin-top: 8px;">
          <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; 
          background: ${
            location.rank === "S"
              ? "#7f1d1d"
              : location.rank === "A"
              ? "#9a3412"
              : location.rank === "B"
              ? "#854d0e"
              : location.rank === "C"
              ? "#166534"
              : location.rank === "D"
              ? "#1e40af"
              : location.rank === "E"
              ? "#581c87"
              : "#374151"
          }; 
          color: ${
            location.rank === "S"
              ? "#fecaca"
              : location.rank === "A"
              ? "#fed7aa"
              : location.rank === "B"
              ? "#fef08a"
              : location.rank === "C"
              ? "#bbf7d0"
              : location.rank === "D"
              ? "#bfdbfe"
              : location.rank === "E"
              ? "#e9d5ff"
              : "#f3f4f6"
          }; 
          font-weight: bold; font-size: 0.75rem; margin-right: 8px;">
            ${location.rank} Rank
          </span>
          <span style="color: #9ca3af; font-size: 0.75rem;">${
            location.country
          }</span>
        </div>
      </div>
    `;
  };

  return (
    <>
      <div className="absolute z-10 bg-gray-900/60 bg-opacity-90 p-1 rounded-xl border border-gray-700">
        <div className="flex flex-wrap items-center gap-2">
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gray-300 text-sm font-medium"></span>
          </motion.div>

          <motion.select
            value={countryFilter}
            onChange={handleCountryFilterChange}
            className="text-sm bg-gray-800/80 border border-gray-700 rounded-lg px-2 py-1 text-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <option value="all">All Countries</option>
            <option value="South Korea">South Korea</option>
            <option value="Japan">Japan</option>
          </motion.select>

          <motion.select
            value={rankFilter}
            onChange={handleRankFilterChange}
            className="text-sm bg-gray-800/80 border border-gray-700 rounded-lg px-2 py-1 text-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <option value="all">All Ranks</option>
            <option value="S">S Rank</option>
            <option value="A">A Rank</option>
            <option value="B">B Rank</option>
            <option value="C">C Rank</option>
            <option value="D">D Rank</option>
            <option value="E">E Rank</option>
          </motion.select>

          <motion.div
            className="ml-auto text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {filteredLocations.length} gates found
          </motion.div>
        </div>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles-dark" // Apply custom CSS for dark map
        />

        <ZoomControl position="bottomright" />
        <ChangeMapView center={mapCenter} zoom={mapZoom} />
        <GateSelectionListener
          setMapCenter={setMapCenter}
          setMapZoom={setMapZoom}
        />

        <LayerGroup>
          {filteredLocations.map((location) => (
            <React.Fragment key={location.id}>
              <Marker
                position={[location.lat, location.lng]}
                icon={createRankIcon(location.rank)}
              >
                <Popup className="dark-popup" minWidth={250} maxWidth={350}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getPopupContent(location),
                    }}
                  />
                </Popup>
              </Marker>
              <CircleMarker
                center={[location.lat, location.lng]}
                radius={
                  location.rank === "S"
                    ? 35
                    : location.rank === "A"
                    ? 30
                    : location.rank === "B"
                    ? 25
                    : location.rank === "C"
                    ? 20
                    : location.rank === "D"
                    ? 15
                    : 10
                }
                pathOptions={{
                  color:
                    location.rank === "S"
                      ? "#ef4444"
                      : location.rank === "A"
                      ? "#f97316"
                      : location.rank === "B"
                      ? "#eab308"
                      : location.rank === "C"
                      ? "#22c55e"
                      : location.rank === "D"
                      ? "#3b82f6"
                      : "#a855f7",
                  fillColor:
                    location.rank === "S"
                      ? "#ef4444"
                      : location.rank === "A"
                      ? "#f97316"
                      : location.rank === "B"
                      ? "#eab308"
                      : location.rank === "C"
                      ? "#22c55e"
                      : location.rank === "D"
                      ? "#3b82f6"
                      : "#a855f7",
                  fillOpacity: 0.2,
                  weight: 1,
                }}
              />
            </React.Fragment>
          ))}
        </LayerGroup>
      </MapContainer>

      <div className="absolute bottom-6 right-6 bg-gray-900 bg-opacity-80 p-2 rounded-lg border border-gray-700 z-10">
        <div className="flex flex-col gap-1">
          {["S", "A", "B", "C", "D", "E"].map((rank) => (
            <div key={rank} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    rank === "S"
                      ? "#ef4444"
                      : rank === "A"
                      ? "#f97316"
                      : rank === "B"
                      ? "#eab308"
                      : rank === "C"
                      ? "#22c55e"
                      : rank === "D"
                      ? "#3b82f6"
                      : "#a855f7",
                }}
              ></div>
              <span className="text-xs text-gray-200">{rank} Rank</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HuntersMap;
