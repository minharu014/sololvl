// Solo Leveling dungeon locations data
const locations = [
  // South Korea locations
  {
    id: 1,
    name: "Double Dungeon (Cartenon Temple)",
    description:
      "Initially appearing as a D-Rank Gate, this dungeon concealed a deadly inner sanctum known as the Cartenon Temple. Inside, Sung Jin-Woo's party encountered formidable stone statues, leading to significant casualties. This event was pivotal in Jin-Woo's transformation.",
    rank: "S",
    lat: 37.5519,
    lng: 126.9918, // Seoul City Center
    source: "Pinkvilla",
    country: "South Korea",
  },
  {
    id: 2,
    name: "Instant Dungeon at Hapjeong Subway Station",
    description:
      "Unique to Jin-Woo, this E-Rank Dungeon was part of the System's quests. It served as a personalized challenge, offering substantial rewards upon completion.",
    rank: "E",
    lat: 37.5495,
    lng: 126.9136, // Hapjeong Station, Seoul
    source: "Solo Leveling Wiki",
    country: "South Korea",
  },
  {
    id: 3,
    name: "Red Gate (Ice Elf Dungeon)",
    description:
      "A high-risk dungeon where Jin-Woo and other Hunters were trapped in a freezing environment. They faced powerful Ice Elves, and time inside passed differently than in the outside world.",
    rank: "A",
    lat: 37.5665,
    lng: 127.0077, // Eastern Seoul
    source: "Solo Leveling Wiki",
    country: "South Korea",
  },
  {
    id: 4,
    name: "Demon Castle",
    description:
      "An S-Rank Dungeon accessible through a key obtained by Jin-Woo. This multi-floor dungeon housed various demons and was crucial for Jin-Woo's quest to acquire the Elixir of Life to heal his mother.",
    rank: "S",
    lat: 37.4563,
    lng: 126.7052, // Incheon area
    source: "Diario AS",
    country: "South Korea",
  },
  {
    id: 5,
    name: "High Orc Dungeon",
    description:
      "A seemingly B-Rank Gate that turned out to house High Orcs, creatures much stronger than anticipated. This misjudgment led to severe challenges for the raiding party.",
    rank: "B",
    lat: 37.5844,
    lng: 127.0555, // Northeastern Seoul
    source: "Solo Leveling Wiki",
    country: "South Korea",
  },
  {
    id: 6,
    name: "Jeju Island S-Rank Gate",
    description:
      "An S-Rank Gate that led to the infamous Jeju Island Raid. The island was overrun by powerful ants, causing multiple failed raids and significant losses among Hunters.",
    rank: "S",
    lat: 33.4996,
    lng: 126.5312, // Jeju Island
    source: "Solo Leveling Wiki",
    country: "South Korea",
  },
  {
    id: 7,
    name: "Hunters Guild Gate",
    description:
      "An A-Rank Gate managed by the Hunters Guild. Jin-Woo participated as a miner but ended up showcasing his combat abilities when the situation escalated.",
    rank: "A",
    lat: 37.5139,
    lng: 127.0598, // Gangnam area, Seoul
    source: "Wikipedia",
    country: "South Korea",
  },
  {
    id: 8,
    name: "Busan A-Rank Gate",
    description:
      "Another high-level gate that posed significant challenges, requiring the intervention of top Hunters from the Busan region.",
    rank: "A",
    lat: 35.1796,
    lng: 129.0756, // Busan
    source: "Solo Leveling Wiki",
    country: "South Korea",
  },
  {
    id: 9,
    name: "Job Change Dungeon",
    description:
      "A hidden dungeon only Jin-Woo could access, where he faced the Architect and officially became a Shadow Monarch after passing the trial.",
    rank: "S",
    lat: 37.5113,
    lng: 127.098, // Eastern Seoul
    source: "Solo Leveling Wiki",
    country: "South Korea",
  },
  {
    id: 10,
    name: "Double Dungeon in Hospital",
    description:
      "A dungeon that appeared within a hospital, causing panic as patients and medical staff were trapped. Jin-Woo cleared this dungeon while visiting his mother.",
    rank: "D",
    lat: 37.4946,
    lng: 126.9254, // Southwestern Seoul
    source: "Solo Leveling Wiki",
    country: "South Korea",
  },

  // Japan locations
  {
    id: 11,
    name: "Shinjuku Gate",
    description:
      "A dangerous S-Rank gate that appeared in the heart of Tokyo's busiest district. The bustling area had to be evacuated as Japanese hunters attempted to contain the threat.",
    rank: "S",
    lat: 35.6938,
    lng: 139.7035, // Shinjuku, Tokyo
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 12,
    name: "Osaka Dungeon",
    description:
      "An A-Rank gate that manifested in Osaka's downtown area. Known for spawning fire-based monsters that threatened to burn down the city.",
    rank: "A",
    lat: 34.6937,
    lng: 135.5023, // Osaka
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 13,
    name: "Kyoto Ancient Gate",
    description:
      "A B-Rank gate that appeared near historic temples in Kyoto. The gate releases spirits connected to Japan's ancient history.",
    rank: "B",
    lat: 35.0116,
    lng: 135.7681, // Kyoto
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 14,
    name: "Hokkaido Ice Cavern",
    description:
      "An A-Rank gate in northern Japan that spawns ice elementals and frost giants. The surrounding area is perpetually frozen, even in summer.",
    rank: "A",
    lat: 43.0618,
    lng: 141.3545, // Hokkaido
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 15,
    name: "Mt. Fuji Gate",
    description:
      "An S-Rank gate that appeared near Japan's most iconic mountain. Seismic activity suggests the gate connects to a volcanic dungeon realm.",
    rank: "S",
    lat: 35.3606,
    lng: 138.7274, // Mt. Fuji
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 16,
    name: "Nagoya Abyss",
    description:
      "A C-Rank gate that has been cleared but occasionally reopens. Located in an industrial area of Nagoya.",
    rank: "C",
    lat: 35.1815,
    lng: 136.9066, // Nagoya
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 17,
    name: "Yokohama Harbor Gate",
    description:
      "A B-Rank gate that emerged from the harbor waters. Sea monsters regularly attempt to breach the perimeter established by hunters.",
    rank: "B",
    lat: 35.4437,
    lng: 139.638, // Yokohama
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 18,
    name: "Okinawa Underwater Cave",
    description:
      "An A-Rank gate discovered in an underwater cave system near Okinawa. Special dive teams of hunters are required to monitor this gate.",
    rank: "A",
    lat: 26.3344,
    lng: 127.8056, // Okinawa
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 19,
    name: "Sapporo Winter Gate",
    description:
      "A D-Rank gate that only activates during winter months. Currently dormant but expected to reawaken when temperatures drop.",
    rank: "D",
    lat: 43.0618,
    lng: 141.3545, // Sapporo
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 20,
    name: "Fukuoka Ancient Temple",
    description:
      "An E-Rank gate located beneath an ancient temple. Recently cleared by local hunters after a minor outbreak of spirits.",
    rank: "E",
    lat: 33.5902,
    lng: 130.4017, // Fukuoka
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 21,
    name: "Hiroshima Memorial Gate",
    description:
      "A B-Rank gate with unusual temporal properties. Monsters from this gate appear to be from different historical periods.",
    rank: "B",
    lat: 34.3853,
    lng: 132.4553, // Hiroshima
    source: "Fan fiction",
    country: "Japan",
  },
  {
    id: 22,
    name: "Tokyo Bay Underwater Gate",
    description:
      "An S-Rank gate discovered deep in Tokyo Bay. Maritime traffic has been rerouted as hunter teams establish a permanent monitoring station.",
    rank: "S",
    lat: 35.6295,
    lng: 139.8895, // Tokyo Bay
    source: "Fan fiction",
    country: "Japan",
  },
];

export default locations;
