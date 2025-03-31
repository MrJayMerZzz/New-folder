export type CPUCooler = {
    name: string;
    brand: string; // e.g., 'Noctua', 'Cooler Master', 'Corsair', 'be quiet!'
    type: 'Air' | 'Liquid'; // Type of cooler
    fanRPM: string | null; // Fan speed range (e.g., "600 - 1800 RPM") or null
    noiseLevel: string | null; // Noise level range (e.g., "19 - 25 dBA") or null
    color: string; // Primary color
    radiatorSize: number | null; // Radiator size in mm for Liquid AIOs (e.g., 120, 240, 280, 360), null for Air coolers
    price: number; // Price in your currency or USD
  };
  
  export const coolers: CPUCooler[] = [
    {
      name: "Noctua NH-D15 chromax.black",
      brand: "Noctua",
      type: 'Air',
      fanRPM: "300 - 1500 RPM",
      noiseLevel: "19.2 - 24.6 dBA",
      color: "Black",
      radiatorSize: null, // Air cooler
      price: 110
    },
    {
      name: "Cooler Master Hyper 212 Black Edition",
      brand: "Cooler Master",
      type: 'Air',
      fanRPM: "650 - 2000 RPM",
      noiseLevel: "8 - 30 dBA",
      color: "Black",
      radiatorSize: null,
      price: 45
    },
    {
      name: "Corsair iCUE H150i ELITE CAPELLIX XT", // 360mm AIO example
      brand: "Corsair",
      type: 'Liquid',
      fanRPM: "550 - 2100 RPM", // Example RPM for included fans
      noiseLevel: "10 - 34.1 dBA", // Example noise for included fans
      color: "Black", // Also comes in White
      radiatorSize: 360, // 360mm radiator
      price: 200
    },
    {
      name: "Deepcool AK620",
      brand: "Deepcool",
      type: 'Air',
      fanRPM: "500 - 1850 RPM",
      noiseLevel: "<=28 dBA", // Max noise level reported
      color: "Black", // Also comes in White
      radiatorSize: null,
      price: 65
    },
    {
      name: "ARCTIC Liquid Freezer II 280", // 280mm AIO example
      brand: "ARCTIC",
      type: 'Liquid',
      fanRPM: "200 - 1700 RPM",
      noiseLevel: "8 - 24 dBA", // Arctic fans are generally quiet
      color: "Black",
      radiatorSize: 280, // 280mm radiator
      price: 125
    },
    {
      name: "Thermalright Phantom Spirit 120 SE ARGB", // Budget high-performance air cooler
      brand: "Thermalright",
      type: 'Air',
      fanRPM: "<=1500 RPM", // Max RPM
      noiseLevel: "<=25.6 dBA", // Max Noise
      color: "Black",
      radiatorSize: null,
      price: 40
    }
  ];