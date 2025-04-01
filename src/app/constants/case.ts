export type Case = {
  name: string;
  brand: string;
  type: string; // Original descriptive type (e.g., 'ATX Mid Tower')
  color: string;
  psuIncluded: boolean;
  sidePanel: string; // e.g., 'Tempered Glass', 'Solid', 'Mesh'
  externalVolume: number | null;
  internal35Bays: number;
  // --- Added Fields ---
  supportedFormFactors: string[]; // Array like: ["ATX", "Micro-ATX", "Mini-ITX"]
  maxGpuLength: number | null; // Max GPU length in mm, null if not applicable/unknown
  // --- End Added Fields ---
  price: number;
};
  
  export const cases: Case[] = 
    [
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
        name: "Chopin Pro sample 10 ",
        brand: "In Win",
        type: "Mini ITX Slim",
        color: "Titanium Grey",
        psuIncluded: true, // Comes with a 200W PSU
        sidePanel: "Solid/Mesh",
        externalVolume: 4.4,
        internal35Bays: 0,
        supportedFormFactors: ["Mini-ITX"], // Specific to ITX
        maxGpuLength: 10 , // Generally no dedicated GPU space in such slim cases
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
      }
    ]