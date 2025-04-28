export type Case = {
  name: string;
  brand: string;
  type: string; // Original descriptive type (e.g., 'ATX Mid Tower')
  color: string;
  psuIncluded: boolean;
  sidePanel: string; // e.g., 'Tempered Glass', 'Solid', 'Mesh'
  externalVolume: number | null; // Approx volume in Liters
  internal35Bays: number;
  // --- Added Fields ---
  supportedFormFactors: string[]; // Array like: ["ATX", "Micro-ATX", "Mini-ITX"]
  maxGpuLength: number | null; // Max GPU length in mm, null if not applicable/unknown
  // --- End Added Fields ---
  price: number; // Example price in USD
};

export const cases: Case[] =
  [
    // --- Original Cases ---
    {
      name: "MasterBox Q300L",
      brand: "Cooler Master",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Acrylic",
      externalVolume: 39.2, // Approx volume from original data
      internal35Bays: 1,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"], // Based on specs
      maxGpuLength: 360, // From specs
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
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"], // Supports E-ATX (305mm x 277mm)
      maxGpuLength: 360, // From specs
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
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"], // B&H specs list Mini-ATX, assuming Mini-ITX
      maxGpuLength: 341, // With front fans installed (up to 360mm without)
      price: 110
    },
    {
      name: "Chopin Pro", // Removed sample 10
      brand: "In Win",
      type: "Mini ITX Slim",
      color: "Titanium Grey",
      psuIncluded: true, // Comes with a 200W PSU
      sidePanel: "Solid/Mesh",
      externalVolume: 4.4,
      internal35Bays: 0,
      supportedFormFactors: ["Mini-ITX"], // Specific to ITX
      maxGpuLength: null, // Generally no dedicated GPU space in such slim cases, use null
      price: 130
    },
    {
      name: "Lancool II Mesh C Performance", // RGB variant info used for specs
      brand: "Lian Li",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 59.0, // Approx volume from original data
      internal35Bays: 3, // Drive cage holds 3x 3.5" or 3x 2.5"
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"], // Supports E-ATX (up to 280mm wide)
      maxGpuLength: 384, // From specs
      price: 105
    },
    {
      name: "H5 Flow", // 2024 version specs used
      brand: "NZXT",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 46.4, // Approx volume from original data
      internal35Bays: 1, // 1x 3.5" bay mentioned
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"], // Supports E-ATX (Up to 277mm wide)
      maxGpuLength: 410, // From KitGuru review (2024 version)
      price: 85
    },
    // --- End Original Cases ---

    // --- 50 New Cases Start Here ---
    {
      name: "Define 7",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 51.6,
      internal35Bays: 6, // Highly configurable
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 467, // Open layout
      price: 170
    },
    {
      name: "O11 Dynamic EVO",
      brand: "Lian Li",
      type: "ATX Mid Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 52.0, // Approx.
      internal35Bays: 2, // Can add more cages
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 426,
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
      maxGpuLength: 400, // Can be 420mm depending on config
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
      price: 80
    },
    {
      name: "NR200P MAX",
      brand: "Cooler Master",
      type: "Mini ITX Tower",
      color: "Grey",
      psuIncluded: true, // 850W SFX PSU included
      sidePanel: "Tempered Glass / Vented Steel", // Both included
      externalVolume: 18.3,
      internal35Bays: 1, // Or 2x 2.5"
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 336, // Depending on config
      price: 350 // Includes PSU and AIO
    },
    {
      name: "P360A",
      brand: "Phanteks",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 40.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 400,
      price: 70
    },
    {
      name: "Eclipse G360A",
      brand: "Phanteks",
      type: "ATX Mid Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 44.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 400,
      price: 90
    },
    {
      name: "CK560",
      brand: "Deepcool",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 47.1, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 380,
      price: 80
    },
     {
      name: "Lancool 216",
      brand: "Lian Li",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 55.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 392,
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
      price: 110
    },
    {
      name: "Versa H18",
      brand: "Thermaltake",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 29.5, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 350,
      price: 55
    },
    {
      name: "Focus 2",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 44.7, // Similar to Pop Air
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 405,
      price: 70
    },
    {
      name: "HAF 700 EVO",
      brand: "Cooler Master",
      type: "ATX Full Tower",
      color: "Titanium Grey",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 115.0, // Approx.
      internal35Bays: 9, // Highly flexible
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX", "SSI-EEB", "SSI-CEB"],
      maxGpuLength: 490,
      price: 500
    },
    {
      name: "Enthoo Pro 2",
      brand: "Phanteks",
      type: "ATX Full Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 84.0, // Approx.
      internal35Bays: 4, // Can add many more
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX", "SSI-EEB"],
      maxGpuLength: 503,
      price: 170
    },
    {
      name: "Core P3 TG Pro",
      brand: "Thermaltake",
      type: "ATX Mid Tower", // Open Frame type
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass", // Open Frame
      externalVolume: null, // Hard to define for open frame
      internal35Bays: 2, // Behind motherboard tray
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 450, // With reservoir
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
      internal35Bays: 1, // Combo bay
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 338,
      price: 80
    },
    {
      name: "SAMA IM01",
      brand: "SAMA",
      type: "MicroATX Mini Tower", // Similar to NR200 layout but mATX
      color: "Black",
      psuIncluded: false,
      sidePanel: "Vented Steel",
      externalVolume: 22.0, // Approx.
      internal35Bays: 2, // Flexible mounting
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 335,
      price: 65
    },
    {
      name: "Hyte Y60",
      brand: "Hyte",
      type: "ATX Mid Tower", // Panoramic style
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 58.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 375, // Vertical mount only, riser included
      price: 200
    },
     {
      name: "TD500 Mesh V2",
      brand: "Cooler Master",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 51.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX", "SSI-CEB"],
      maxGpuLength: 410,
      price: 100
    },
    {
      name: "Montech AIR 903 MAX",
      brand: "Montech",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 52.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 400,
      price: 75
    },
    {
      name: "Define R6",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "Gunmetal",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 51.6, // Similar to Define 7
      internal35Bays: 6,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 440, // Open layout
      price: 160
    },
    {
      name: "View 71 TG RGB",
      brand: "Thermaltake",
      type: "ATX Full Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 83.0, // Approx.
      internal35Bays: 4, // Flexible cages
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 410,
      price: 190
    },
    {
      name: "O11 Air Mini",
      brand: "Lian Li",
      type: "MicroATX Mid Tower", // Compact ATX/mATX
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 43.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"], // Supports standard ATX PSU
      maxGpuLength: 362,
      price: 110
    },
    {
      name: "Silent Base 802",
      brand: "be quiet!",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass / Sound Dampened Steel", // Interchangeable
      externalVolume: 62.0, // Approx.
      internal35Bays: 3, // Can add more
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 432, // HDD cage removed
      price: 180
    },
    {
      name: "MasterCase H500 ARGB",
      brand: "Cooler Master",
      type: "ATX Mid Tower",
      color: "Iron Grey",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 56.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 410,
      price: 120
    },
    {
      name: "Meshroom S",
      brand: "SSUPD",
      type: "Mini ITX Tower", // Vertical SFF
      color: "Black",
      psuIncluded: false,
      sidePanel: "Mesh",
      externalVolume: 14.9,
      internal35Bays: 0, // Primarily 2.5" or specific configs
      supportedFormFactors: ["Mini-ITX"], // Can fit ATX PSU with bracket
      maxGpuLength: 336, // Depending on config
      price: 160 // Base price, riser extra
    },
    {
      name: "Cylon",
      brand: "Aerocool",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Acrylic",
      externalVolume: 38.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 371,
      price: 50
    },
    {
      name: "P200A",
      brand: "Phanteks",
      type: "Mini ITX Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 30.0, // Approx.
      internal35Bays: 0, // Optional HDD bracket needed
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 355,
      price: 60
    },
    {
      name: "Node 202",
      brand: "Fractal Design",
      type: "Mini ITX HTPC", // Console style
      color: "Black",
      psuIncluded: false, // Variant with PSU exists
      sidePanel: "Solid/Mesh",
      externalVolume: 10.2,
      internal35Bays: 0,
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 310, // Specific height/width limits too
      price: 80 // Without PSU
    },
    {
      name: "iCUE 220T RGB Airflow",
      brand: "Corsair",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 39.8, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 300,
      price: 100
    },
    {
      name: "A1 Plus",
      brand: "In Win",
      type: "Mini ITX Tower",
      color: "Black",
      psuIncluded: true, // 650W Gold PSU included
      sidePanel: "Tempered Glass",
      externalVolume: 20.0, // Approx.
      internal35Bays: 0,
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 320,
      price: 200 // Includes PSU and Qi charger
    },
    {
      name: "Matrexx 40 3FS",
      brand: "Deepcool",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 30.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 320,
      price: 55
    },
    {
      name: "Q500L",
      brand: "Cooler Master",
      type: "ATX Mid Tower", // Can be oriented differently
      color: "Black",
      psuIncluded: false,
      sidePanel: "Acrylic",
      externalVolume: 39.2, // Same as Q300L
      internal35Bays: 0, // Combo bays for 2.5" or 1x 3.5"
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 360,
      price: 60
    },
    {
      name: "Core V21",
      brand: "Thermaltake",
      type: "MicroATX Mini Tower", // Cube style
      color: "Black",
      psuIncluded: false,
      sidePanel: "Windowed", // Interchangeable panels
      externalVolume: 42.6, // Approx.
      internal35Bays: 3,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 350,
      price: 70
    },
    {
      name: "H210",
      brand: "NZXT",
      type: "Mini ITX Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 27.0, // Approx.
      internal35Bays: 1,
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 325,
      price: 80
    },
    {
      name: "DG-76",
      brand: "EVGA",
      type: "ATX Mid Tower",
      color: "Alpine White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 50.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 390,
      price: 120 // Price when available
    },
    {
      name: "Crystal 280X RGB",
      brand: "Corsair",
      type: "MicroATX Mid Tower", // Dual chamber cube
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 40.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 300,
      price: 160
    },
    {
      name: "TU150",
      brand: "Lian Li",
      type: "Mini ITX Tower", // With handle
      color: "Silver",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 24.0, // Approx.
      internal35Bays: 1, // Or 2x 2.5"
      supportedFormFactors: ["Mini-ITX", "Mini-DTX"],
      maxGpuLength: 320,
      price: 110
    },
    {
      name: "Fara R1 Pro",
      brand: "Silverstone",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 40.0, // Approx.
      internal35Bays: 1,
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 322, // With front fan
      price: 75
    },
    {
      name: "Revolt 3",
      brand: "Hyte",
      type: "Mini ITX Tower", // Vertical SFF with handle
      color: "White",
      psuIncluded: false, // Variant with PSU exists
      sidePanel: "Mesh",
      externalVolume: 18.4,
      internal35Bays: 1,
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 335,
      price: 130 // Without PSU
    },
    {
      name: "Shadow Base 800 FX",
      brand: "be quiet!",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 62.0, // Approx. similar to Silent Base 802
      internal35Bays: 3,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 430,
      price: 170
    },
    {
      name: "CH370",
      brand: "Deepcool",
      type: "MicroATX Mini Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 35.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 320,
      price: 60
    },
    {
      name: "Pop Mini Air",
      brand: "Fractal Design",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 35.0, // Approx.
      internal35Bays: 2, // Combo bays
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 365,
      price: 90
    },
    {
      name: "COSMOS C700P Black Edition",
      brand: "Cooler Master",
      type: "ATX Full Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass", // Curved
      externalVolume: 100.0, // Approx.
      internal35Bays: 4, // Highly modular
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 490, // Without HDD cage
      price: 350
    },
    {
      name: "Gungnir 110R",
      brand: "MSI",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 48.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 340,
      price: 100
    },
    {
      name: "Level 20 VT",
      brand: "Thermaltake",
      type: "MicroATX Mini Tower", // Cube style
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 45.0, // Approx.
      internal35Bays: 3,
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLength: 350,
      price: 100
    },
    {
      name: "Era ITX",
      brand: "Fractal Design",
      type: "Mini ITX Tower",
      color: "Carbon",
      psuIncluded: false,
      sidePanel: "Solid", // Top panel options vary (wood/glass/mesh)
      externalVolume: 16.0,
      internal35Bays: 1, // Or 2x 2.5"
      supportedFormFactors: ["Mini-ITX"],
      maxGpuLength: 295, // Height/width limits apply
      price: 160
    },
    {
      name: "Eclipse P400A Digital",
      brand: "Phanteks",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 43.0, // Approx.
      internal35Bays: 2,
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLength: 420,
      price: 90
    }
    // --- 50 New Cases End Here ---
  ];

