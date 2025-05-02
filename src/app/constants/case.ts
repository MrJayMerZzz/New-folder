export type Case = {
  name: string;
  brand: string;
  type: string; // Original descriptive type (e.g., 'ATX Mid Tower')
  color: string;
  psuIncluded: boolean;
  sidePanel: string; // e.g., 'Tempered Glass', 'Solid', 'Mesh'
  externalVolume: number | null; // Approx volume in Liters
  internal35Bays: number;
  supportedFormFactors: string[]; // Array like: ["ATX", "Micro-ATX", "Mini-ITX"]
  maxGpuLength: number | null; // Max GPU length in mm, null if not applicable/unknown

  // --- Added Fields for Cooler Compatibility ---
  maxCoolerHeight: number | null; // Max CPU Air Cooler height in mm
  supportedRadiatorLocations?: { // Details on radiator fitment
      top?: number[];     // Sizes supported in top mount (e.g., [120, 240, 360])
      front?: number[];   // Sizes supported in front mount
      rear?: number[];    // Sizes supported in rear mount
      side?: number[];    // Sizes supported in side mount
      bottom?: number[];  // Sizes supported in bottom mount
  };
  // --- End Added Fields ---

  price: number; // Example price in USD
};

export const cases: Case[] =
  [
    // --- Original Cases Updated ---
    {
      name: "MasterBox Q300L",
      brand: "Cooler Master",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Acrylic",
      externalVolume: 39.2,
      internal35Bays: 1,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 360,
      maxCoolerHeight: 159,
      supportedRadiatorLocations: { front: [120, 240], rear: [120] },
      price: 50
    },
    {
      name: "4000D Airflow",
      brand: "Corsair",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 45.3,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 360,
      maxCoolerHeight: 170,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280], rear: [120] },
      price: 95
    },
    {
      name: "Meshify 2 Compact",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 39.7,
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 341, // With front fans
      maxCoolerHeight: 169,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 240], rear: [120], bottom: [120] },
      price: 110
    },
    {
      name: "Chopin Pro",
      brand: "In Win",
      type: "Mini ITX Slim",
      color: "Titanium Grey",
      psuIncluded: true, // 200W PSU
      sidePanel: "Solid/Mesh",
      externalVolume: 4.4,
      internal35Bays: 0,
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: null, // No dedicated GPU slot
      maxCoolerHeight: 43, // Very low profile needed
      supportedRadiatorLocations: { }, // No radiator support
      price: 130
    },
    {
      name: "Lancool II Mesh C Performance",
      brand: "Lian Li",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 59.0,
      internal35Bays: 3,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 384,
      maxCoolerHeight: 176,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 240] },
      price: 105
    },
    {
      name: "H5 Flow",
      brand: "NZXT",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 46.4,
      internal35Bays: 1,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 410, // KitGuru review / NZXT site differs slightly (365mm) - using NZXT spec for safety
      maxCoolerHeight: 165,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 240], rear: [120] },
      price: 85
    },
    // --- 50 New Cases Updated ---
    {
      name: "Define 7",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 51.6,
      internal35Bays: 6,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 467, // Open layout
      maxCoolerHeight: 185,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280, 360, 420], rear: [120], bottom: [120, 140, 240, 280] },
      price: 170
    },
    {
      name: "O11 Dynamic EVO",
      brand: "Lian Li",
      type: "ATX Mid Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 52.0,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 426,
      maxCoolerHeight: 167,
      supportedRadiatorLocations: { top: [120, 140, 240, 280, 360], side: [120, 140, 240, 280, 360], bottom: [120, 140, 240, 280, 360], rear: [120] },
      price: 160
    },
    {
      name: "H7 Flow",
      brand: "NZXT",
      type: "ATX Mid Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 50.4,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 400,
      maxCoolerHeight: 185,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280, 360], rear: [120, 140] },
      price: 130
    },
    {
      name: "5000D Airflow",
      brand: "Corsair",
      type: "ATX Mid Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 59.3,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 400, // Spec sheet says 420mm
      maxCoolerHeight: 170,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280, 360], side: [120, 240, 360], rear: [120] },
      price: 155
    },
    {
      name: "Torrent",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 52.5,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX", "SSI-EEB", "SSI-CEB"],
      maxGpuLength: 423, // With front fans
      maxCoolerHeight: 188,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360, 420], bottom: [120, 140, 240, 280, 360, 420], rear: [120, 140] },
      price: 200
    },
    {
      name: "Pop Air",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 44.7,
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 405,
      maxCoolerHeight: 170,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 240], rear: [120] },
      price: 80
    },
    {
      name: "NR200P MAX",
      brand: "Cooler Master",
      type: "Mini ITX Tower",
      color: "Grey",
      psuIncluded: true, // 850W SFX PSU + 280mm AIO
      sidePanel: "Tempered Glass / Vented Steel",
      externalVolume: 18.3,
      internal35Bays: 1,
      supportedFormFactors: ["Mini-ITX", "Mini-DTX"], // Spec added Mini-DTX
      maxGpuLength: 336,
      maxCoolerHeight: 67, // If replacing included AIO
      supportedRadiatorLocations: { top: [240, 280] }, // Comes with 280mm AIO installed
      price: 350
    },
    {
      name: "P360A",
      brand: "Phanteks",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 40.0,
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX", "E-ATX"], // E-ATX up to 280mm wide
      maxGpuLength: 400,
      maxCoolerHeight: 160,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 240], rear: [120] },
      price: 70
    },
    {
      name: "Eclipse G360A",
      brand: "Phanteks",
      type: "ATX Mid Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 44.0,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"], // E-ATX up to 280mm wide
      maxGpuLength: 400,
      maxCoolerHeight: 162,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280, 360], rear: [120] },
      price: 90
    },
    {
      name: "CK560",
      brand: "Deepcool",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 47.1,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 380,
      maxCoolerHeight: 175,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280], rear: [120, 140] },
      price: 80
    },
      {
      name: "Lancool 216",
      brand: "Lian Li",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 55.0,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 392,
      maxCoolerHeight: 180,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280, 360], rear: [120], bottom: [120, 240] },
      price: 100
    },
    {
      name: "Pure Base 500DX",
      brand: "be quiet!",
      type: "ATX Mid Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 44.7,
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 369,
      maxCoolerHeight: 190,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 240], rear: [120, 140] },
      price: 110
    },
    {
      name: "Versa H18",
      brand: "Thermaltake",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 29.5,
      internal35Bays: 2,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 350,
      maxCoolerHeight: 155,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120], rear: [120] },
      price: 55
    },
    {
      name: "Focus 2",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 44.7,
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 405,
      maxCoolerHeight: 170,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 240], rear: [120] },
      price: 70
    },
    {
      name: "HAF 700 EVO",
      brand: "Cooler Master",
      type: "ATX Full Tower",
      color: "Titanium Grey",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 115.0,
      internal35Bays: 9,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX", "SSI-EEB", "SSI-CEB"],
      maxGpuLength: 490,
      maxCoolerHeight: 166,
      supportedRadiatorLocations: { top: [120, 140, 240, 280, 360, 420], front: [120, 140, 240, 280, 360, 420, 480], bottom: [120, 140, 240, 280, 360, 420, 480], rear: [120, 140], side: [120, 140, 240, 280, 360, 420, 480] },
      price: 500
    },
    {
      name: "Enthoo Pro 2",
      brand: "Phanteks",
      type: "ATX Full Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 84.0,
      internal35Bays: 4,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX", "SSI-EEB"],
      maxGpuLength: 503,
      maxCoolerHeight: 195,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360, 420, 480], top: [120, 140, 240, 280, 360], rear: [120, 140], bottom: [120, 140, 240, 280, 360], side: [120, 140, 240, 280, 360, 420, 480] },
      price: 170
    },
    {
      name: "Core P3 TG Pro",
      brand: "Thermaltake",
      type: "ATX Mid Tower", // Open Frame
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass", // Open Frame
      externalVolume: null,
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 450, // With reservoir
      maxCoolerHeight: 180,
      supportedRadiatorLocations: { side: [120, 140, 240, 280, 360, 420] }, // Motherboard tray side mount
      price: 140
    },
    {
      name: "AP201",
      brand: "Asus",
      type: "MicroATX Mini Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Mesh",
      externalVolume: 33.0,
      internal35Bays: 1,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 338,
      maxCoolerHeight: 170,
      supportedRadiatorLocations: { top: [120, 140, 240, 280, 360], rear: [120] },
      price: 80
    },
    {
      name: "SAMA IM01",
      brand: "SAMA",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Vented Steel",
      externalVolume: 22.0,
      internal35Bays: 2,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 335,
      maxCoolerHeight: 155, // With ATX PSU, 88mm lower if SFX PSU in high position
      supportedRadiatorLocations: { bottom: [120, 240], side: [120, 240] }, // Side mount requires SFX PSU
      price: 65
    },
    {
      name: "Hyte Y60",
      brand: "Hyte",
      type: "ATX Mid Tower", // Panoramic
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 58.0,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 375, // Vertical only
      maxCoolerHeight: 160,
      supportedRadiatorLocations: { top: [120, 140, 240, 280, 360], side: [120, 140, 240, 280], rear: [120] },
      price: 200
    },
      {
      name: "TD500 Mesh V2",
      brand: "Cooler Master",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 51.0,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX", "SSI-CEB"],
      maxGpuLength: 410,
      maxCoolerHeight: 165,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280, 360], rear: [120] },
      price: 100
    },
    {
      name: "Montech AIR 903 MAX",
      brand: "Montech",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 52.0,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 400,
      maxCoolerHeight: 180,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280, 360], rear: [120, 140] },
      price: 75
    },
    {
      name: "Define R6",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "Gunmetal",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 51.6,
      internal35Bays: 6,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 440, // Open layout
      maxCoolerHeight: 185,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 140, 240, 280, 360, 420], rear: [120, 140], bottom: [120, 140, 240, 280] },
      price: 160
    },
    {
      name: "View 71 TG RGB",
      brand: "Thermaltake",
      type: "ATX Full Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 83.0,
      internal35Bays: 4,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 410,
      maxCoolerHeight: 190,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360, 420], top: [120, 140, 240, 280, 360, 420], rear: [120, 140], bottom: [120, 240], side: [120, 140, 240, 280, 360, 420] }, // Right side mount
      price: 190
    },
    {
      name: "O11 Air Mini",
      brand: "Lian Li",
      type: "MicroATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 43.0,
      internal35Bays: 2, // plus 2x 2.5" or use space for drives
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 362,
      maxCoolerHeight: 170,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 140, 240, 280], bottom: [120, 140, 240, 280], side: [120, 240], rear: [120] },
      price: 110
    },
    {
      name: "Silent Base 802",
      brand: "be quiet!",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass / Sound Dampened Steel",
      externalVolume: 62.0,
      internal35Bays: 3,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 432, // HDD cage removed
      maxCoolerHeight: 185,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360, 420], top: [120, 140, 240, 280, 360], rear: [120, 140] },
      price: 180
    },
    {
      name: "MasterCase H500 ARGB",
      brand: "Cooler Master",
      type: "ATX Mid Tower",
      color: "Iron Grey",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 56.0,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX", "SSI-CEB"], // E-ATX up to 12"x10.7"
      maxGpuLength: 410,
      maxCoolerHeight: 167,
      supportedRadiatorLocations: { front: [120, 140, 200, 240, 280, 360], top: [120, 140, 240], rear: [120] },
      price: 120
    },
    {
      name: "Meshroom S",
      brand: "SSUPD",
      type: "Mini ITX Tower", // SFF
      color: "Black",
      psuIncluded: false,
      sidePanel: "Mesh",
      externalVolume: 14.9,
      internal35Bays: 0, // Needs brackets/specific layout
      supportedFormFactors: ["Mini-ITX"], // Can fit ATX/mATX with trade-offs
      maxGpuLength: 336, // Varies with layout
      maxCoolerHeight: 148, // Varies with layout
      supportedRadiatorLocations: { side: [120, 140, 240, 280] }, // Often called front/side depending on layout
      price: 160
    },
    {
      name: "Cylon",
      brand: "Aerocool",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Acrylic",
      externalVolume: 38.0,
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 371,
      maxCoolerHeight: 155,
      supportedRadiatorLocations: { front: [120], rear: [120] }, // Limited AIO support
      price: 50
    },
    {
      name: "P200A",
      brand: "Phanteks",
      type: "Mini ITX Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 30.0,
      internal35Bays: 0, // Needs optional bracket
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 355,
      maxCoolerHeight: 165, // Or 72mm with vertical GPU
      supportedRadiatorLocations: { front: [120, 140, 240, 280], side: [120, 240], rear: [120] },
      price: 60
    },
    {
      name: "Node 202",
      brand: "Fractal Design",
      type: "Mini ITX HTPC",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Solid/Mesh",
      externalVolume: 10.2,
      internal35Bays: 0,
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 310,
      maxCoolerHeight: 56,
      supportedRadiatorLocations: { }, // No official radiator support
      price: 80
    },
    {
      name: "iCUE 220T RGB Airflow",
      brand: "Corsair",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 39.8,
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 300,
      maxCoolerHeight: 160,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 240], rear: [120] },
      price: 100
    },
    {
      name: "A1 Plus",
      brand: "In Win",
      type: "Mini ITX Tower",
      color: "Black",
      psuIncluded: true, // 650W Gold PSU
      sidePanel: "Tempered Glass",
      externalVolume: 20.0,
      internal35Bays: 0,
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 320,
      maxCoolerHeight: 160,
      supportedRadiatorLocations: { rear: [120] }, // Bottom is fans only
      price: 200
    },
    {
      name: "Matrexx 40 3FS",
      brand: "Deepcool",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 30.0,
      internal35Bays: 2,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 320,
      maxCoolerHeight: 165,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 140, 240, 280], rear: [120] },
      price: 55
    },
    {
      name: "Q500L",
      brand: "Cooler Master",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Acrylic",
      externalVolume: 39.2,
      internal35Bays: 0, // Combo bays
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 360,
      maxCoolerHeight: 160,
      supportedRadiatorLocations: { top: [120, 240], rear: [120] },
      price: 60
    },
    {
      name: "Core V21",
      brand: "Thermaltake",
      type: "MicroATX Mini Tower", // Cube
      color: "Black",
      psuIncluded: false,
      sidePanel: "Windowed",
      externalVolume: 42.6,
      internal35Bays: 3,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 350,
      maxCoolerHeight: 185,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 140, 240, 280], rear: [120, 140], bottom: [120, 140], side: [120, 140] }, // Stackable, supports many configs
      price: 70
    },
    {
      name: "H210",
      brand: "NZXT",
      type: "Mini ITX Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 27.0,
      internal35Bays: 1,
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 325,
      maxCoolerHeight: 165,
      supportedRadiatorLocations: { front: [120, 240], rear: [120] },
      price: 80
    },
    {
      name: "DG-76",
      brand: "EVGA",
      type: "ATX Mid Tower",
      color: "Alpine White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 50.0,
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 390,
      maxCoolerHeight: 150,
      supportedRadiatorLocations: { top: [120, 140, 240, 280, 360], front: [120, 140, 240, 280, 360], rear: [120] },
      price: 120 // Note: EVGA cases are less common now
    },
    {
      name: "Crystal 280X RGB",
      brand: "Corsair",
      type: "MicroATX Mid Tower", // Dual chamber cube
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 40.0,
      internal35Bays: 2,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 300,
      maxCoolerHeight: 150,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 140, 240, 280], bottom: [120, 140, 240, 280] },
      price: 160
    },
    {
      name: "TU150",
      brand: "Lian Li",
      type: "Mini ITX Tower",
      color: "Silver",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 24.0,
      internal35Bays: 1,
      supportedFormFactors: ["Mini-ITX", "Mini-DTX"],
      maxGpuLength: 320,
      maxCoolerHeight: 165,
      supportedRadiatorLocations: { front: [120], rear: [120], bottom: [120, 240] },
      price: 110
    },
    {
      name: "Fara R1 Pro",
      brand: "Silverstone",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 40.0,
      internal35Bays: 1,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 322, // With front fan
      maxCoolerHeight: 161,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 240], rear: [120] },
      price: 75
    },
    {
      name: "Revolt 3",
      brand: "Hyte",
      type: "Mini ITX Tower", // SFF
      color: "White",
      psuIncluded: false,
      sidePanel: "Mesh",
      externalVolume: 18.4,
      internal35Bays: 1,
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 335,
      maxCoolerHeight: 140, // Limited by GPU thickness
      supportedRadiatorLocations: { side: [120, 140, 240, 280] },
      price: 130
    },
    {
      name: "Shadow Base 800 FX",
      brand: "be quiet!",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 62.0,
      internal35Bays: 3, // Up to 7 with cages
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 430,
      maxCoolerHeight: 180,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360, 420], top: [120, 140, 240, 280, 360, 420], rear: [120] },
      price: 170
    },
    {
      name: "CH370",
      brand: "Deepcool",
      type: "MicroATX Mini Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 35.0,
      internal35Bays: 2,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 320,
      maxCoolerHeight: 165,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 240], rear: [120] },
      price: 60
    },
    {
      name: "Pop Mini Air",
      brand: "Fractal Design",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 35.0,
      internal35Bays: 2, // Combo bays
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 365,
      maxCoolerHeight: 170,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 240], rear: [120] },
      price: 90
    },
    {
      name: "COSMOS C700P Black Edition",
      brand: "Cooler Master",
      type: "ATX Full Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass", // Curved
      externalVolume: 100.0,
      internal35Bays: 4, // Highly modular
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX", "XL-ATX", "SSI-CEB", "SSI-EEB"], // Added more from spec
      maxGpuLength: 490, // Without HDD cage
      maxCoolerHeight: 198,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360, 420], top: [120, 140, 240, 280, 360, 420], rear: [120, 140], bottom: [120, 240] },
      price: 350
    },
    {
      name: "Gungnir 110R",
      brand: "MSI",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 48.0,
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 340,
      maxCoolerHeight: 170,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 240], rear: [120] },
      price: 100
    },
    {
      name: "Level 20 VT",
      brand: "Thermaltake",
      type: "MicroATX Mini Tower", // Cube
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 45.0,
      internal35Bays: 3,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 350,
      maxCoolerHeight: 185,
      supportedRadiatorLocations: { front: [120, 140, 240, 280], top: [120, 140, 240, 280], rear: [120, 140], bottom: [120, 240] },
      price: 100
    },
    {
      name: "Era ITX",
      brand: "Fractal Design",
      type: "Mini ITX Tower",
      color: "Carbon",
      psuIncluded: false,
      sidePanel: "Solid", // Swappable top panels affect airflow
      externalVolume: 16.0,
      internal35Bays: 1, // Max 1x 3.5" or 2x 2.5" depending on PSU/Cooling
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 295, // Length/Height/Width constraints
      maxCoolerHeight: 120, // Or 70mm with 3.5" HDD
      supportedRadiatorLocations: { top: [120, 240] }, // Thickness constraints apply
      price: 160
    },
    {
      name: "Eclipse P400A Digital",
      brand: "Phanteks",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 43.0,
      internal35Bays: 2, // Need optional brackets for more
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"], // E-ATX up to 272mm wide
      maxGpuLength: 420,
      maxCoolerHeight: 160,
      supportedRadiatorLocations: { front: [120, 140, 240, 280, 360], top: [120, 240], rear: [120] }, // Top clearance limited
      price: 90
    }
  ];