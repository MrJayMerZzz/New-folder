export type CPUCooler = {
    name: string;
    brand: string; // e.g., 'Noctua', 'Cooler Master', 'Corsair', 'be quiet!'
    type: 'Air' | 'Liquid' | 'Passive'; // Type of cooler
    fanRPM: string | null; // Fan speed range (e.g., "600 - 1800 RPM") or null
    noiseLevel: string | null; // Noise level range (e.g., "19 - 25 dBA") or null
    color: string; // Primary color
    radiatorSize: number | null; // Radiator size in mm for Liquid AIOs (e.g., 120, 240, 280, 360), null for Air coolers
    price: number; // Price in your currency or USD
    supportedSockets?: string[]; // Array of supported socket names (e.g., ['LGA1700', 'AM5'])
    height: number | null; // Height in mm, null if not applicable or unknown
  };

  export const coolers: CPUCooler[] = 
  [
    {
      name: "Liquid Freezer II 280",
      brand: "ARCTIC",
      type: 'Liquid',
      fanRPM: "200 - 1700 RPM",
      noiseLevel: "8 - 24 dBA",
      color: "Black",
      radiatorSize: 280,
      supportedSockets: ["AM5", "AM4", "LGA1851", "LGA1700", "LGA1200", "LGA115X"], // Added LGA1851 based on product page
      height: null, // AIO block height not specified, typically low clearance
      price: 125
    },
    {
      name: "Low-Profile CPU Cooler LGA 1700", // Generic name from Arvutitark
      brand: "Akasa",
      type: 'Passive',
      fanRPM: null, // Not specified
      noiseLevel: null, // Not specified
      color: "Black", // Assumed
      radiatorSize: null,
      supportedSockets: ["LGA1700"],
      height: 64.5, // From product page
      price: 17 // Approx 16.90 EUR converted
    },
    {
      name: "iCUE H150i ELITE CAPELLIX XT",
      brand: "Corsair",
      type: 'Liquid',
      fanRPM: "550 - 2100 RPM",
      noiseLevel: "10 - 34.1 dBA",
      color: "Black",
      radiatorSize: 360,
      supportedSockets: ["LGA1700", "LGA1200", "LGA115x", "LGA2066", "AM5", "AM4", "sTRX4", "sTR4"], // Common Corsair AIO support
      height: null, // AIO block height typically low
      price: 200
    },
    {
      name: "Hyper 212 Black Edition",
      brand: "Cooler Master",
      type: 'Air',
      fanRPM: "650 - 2000 RPM",
      noiseLevel: "8 - 30 dBA",
      color: "Black",
      radiatorSize: null,
      supportedSockets: ["LGA1851", "LGA1700", "LGA1200", "LGA115x", "AM5", "AM4"], // Updated socket support for newer Hyper 212 versions
      height: 152, // From recent Hyper 212 specs (~159mm old, ~152mm Halo)
      price: 45
    },
    {
      name: "AK620",
      brand: "Deepcool",
      type: 'Air',
      fanRPM: "500 - 1850 RPM",
      noiseLevel: "<=28 dBA",
      color: "Black",
      radiatorSize: null,
      supportedSockets: ["LGA1700", "LGA1200", "LGA115x", "LGA2066", "AM5", "AM4"], // Common Deepcool support
      height: 160, // Standard AK620 height
      price: 65
    },
    {
      name: "A41 1U Cooler", // For Threadripper/Epyc/Xeon? Check socket
      brand: "Dynatron",
      type: 'Air', // Side Blower
      fanRPM: "2000 - 8600 RPM", // From specs
      noiseLevel: "23 - 62.2 dBA", // From specs
      color: "Silver/Copper", // Implied
      radiatorSize: null,
      supportedSockets: ["sWRX8", "sTRX4", "TR4", "SP3"], // From specs
      height: 28.6, // 1U height
      price: 45 // Estimated based on similar 1U coolers
    },
    {
      name: "CPU cooler for LGA 115x/1200", // Generic name from Bicker.de
      brand: "EKL",
      type: 'Air',
      fanRPM: "900-1800U/min",
      noiseLevel: "17.8-24.8 dBA",
      color: "Silver", // Aluminum
      radiatorSize: null,
      supportedSockets: ["LGA1200", "LGA115x"], // From specs
      height: 60, // From specs
      price: 20 // Estimated
    },
    {
      name: "IS-55 Black Low Profile",
      brand: "ID-COOLING",
      type: 'Air',
      fanRPM: "500-2000RPM", // From Amazon description
      noiseLevel: "13.8-31.2dB(A)", // From Amazon description
      color: "Black",
      radiatorSize: null,
      supportedSockets: ["LGA1851", "LGA1700", "LGA1200", "LGA115x", "AM5", "AM4"], // From Amazon description
      height: 55, // From name and description
      price: 40 // Amazon price
    },
    {
      name: "NH-D15 chromax.black",
      brand: "Noctua",
      type: 'Air',
      fanRPM: "300 - 1500 RPM",
      noiseLevel: "19.2 - 24.6 dBA",
      color: "Black",
      radiatorSize: null,
      supportedSockets: ["LGA1851", "LGA1700", "LGA1200", "LGA115x", "AM5", "AM4"], // Requires specific mounting kit for some, generally compatible
      height: 165, // Standard NH-D15 height
      price: 110
    },
    {
      name: "NH-U14S DX-4189", // Xeon Cooler
      brand: "Noctua",
      type: 'Air',
      fanRPM: "300 - 1500 RPM", // Assuming uses NF-A15 like standard U14S
      noiseLevel: "19.2 - 24.6 dBA", // Assuming uses NF-A15
      color: "Brown/Beige", // Standard Noctua DX color
      radiatorSize: null,
      supportedSockets: ["LGA4189"], // Specific DX-4189 socket
      height: 165, // From specs
      price: 120 // Estimated based on DX series pricing
    },
     { // Adding another Xeon cooler example if available, e.g., for LGA3647
      name: "NH-U12S DX-3647", // Example Xeon Cooler
      brand: "Noctua",
      type: 'Air',
      fanRPM: "450 - 2000 RPM", // NF-F12 fan
      noiseLevel: "~22.4 dBA", // NF-F12 spec
      color: "Brown/Beige",
      radiatorSize: null,
      supportedSockets: ["LGA3647"], // Specific DX-3647 socket
      height: 158, // Standard NH-U12S height
      price: 110 // Estimated
    },
    {
      name: "Phantom Spirit 120 SE ARGB",
      brand: "Thermalright",
      type: 'Air',
      fanRPM: "<=1500 RPM",
      noiseLevel: "<=25.6 dBA",
      color: "Black",
      radiatorSize: null,
      supportedSockets: ["LGA1700", "LGA1200", "LGA115x", "AM5", "AM4"], // Common Thermalright support
      height: 154, // Common height for 120mm tower coolers
      price: 40
    },
    {
      name: "V5 CPU Air Cooler",
      brand: "Vetroo",
      type: 'Air',
      fanRPM: "800-1700 RPM", // From specs
      noiseLevel: "30.8 dB", // Max noise from specs
      color: "Black", // Also comes in White/Pink
      radiatorSize: null,
      supportedSockets: ["LGA1851", "LGA1700", "LGA1200", "LGA115X", "AM5", "AM4"], // From specs
      height: 148, // From overall dimensions (148mm height)
      price: 28 // Amazon price
    }
  ]