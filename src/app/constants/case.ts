export type Case = {
    name: string;
    brand: string; // e.g., 'Corsair', 'Lian Li', 'NZXT', 'Fractal Design'
    type: string; // Form Factor compatibility (e.g., 'ATX Mid Tower', 'MicroATX Mini Tower')
    color: string;
    psuIncluded: boolean; // Does it come with a Power Supply? (Usually false)
    sidePanel: string; // Type of side panel (e.g., 'Tempered Glass', 'Solid', 'Mesh')
    externalVolume: number | null; // Case volume in Liters (can be null if data unavailable)
    internal35Bays: number; // Number of internal 3.5" drive bays
    price: number; // Price in your currency or USD
  };
  
  export const cases: Case[] = [
    {
      name: "Corsair 4000D Airflow",
      brand: "Corsair",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 45.3, // Approx volume
      internal35Bays: 2,
      price: 95
    },
    {
      name: "Lian Li Lancool II Mesh C Performance",
      brand: "Lian Li",
      type: "ATX Mid Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Tempered Glass", // Both sides often are TG on this
      externalVolume: 59.0, // Approx volume
      internal35Bays: 3,
      price: 105
    },
    {
      name: "Fractal Design Meshify 2 Compact",
      brand: "Fractal Design",
      type: "ATX Mid Tower",
      color: "White",
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 39.7, // Approx volume
      internal35Bays: 2,
      price: 110
    },
    {
      name: "NZXT H5 Flow",
      brand: "NZXT",
      type: "ATX Mid Tower",
      color: "Black", // Also comes in White
      psuIncluded: false,
      sidePanel: "Tempered Glass",
      externalVolume: 46.4, // Approx volume
      internal35Bays: 1,
      price: 85
    },
     { // MicroATX Example
      name: "Cooler Master MasterBox Q300L",
      brand: "Cooler Master",
      type: "MicroATX Mini Tower",
      color: "Black",
      psuIncluded: false,
      sidePanel: "Acrylic", // Often Acrylic on cheaper cases
      externalVolume: 39.2, // Approx volume
      internal35Bays: 1,
      price: 50
    },
    { // Case with PSU Included Example
      name: "In Win Chopin Pro",
      brand: "In Win",
      type: "Mini ITX Slim", // Very small form factor
      color: "Titanium Grey",
      psuIncluded: true, // Comes with a 200W PSU
      sidePanel: "Solid/Mesh", // Vented side panels
      externalVolume: 4.4, // Very small volume
      internal35Bays: 0, // Usually only fits 2.5" drives
      price: 130 // Price includes PSU
    }
  ];