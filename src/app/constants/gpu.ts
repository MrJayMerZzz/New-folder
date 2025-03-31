export type GPU = {
    name: string;
    brand: 'NVIDIA' | 'AMD' | 'Intel'; // Added Intel for potential Arc GPUs
    chipset: string; // The specific GPU model, e.g., "GeForce RTX 4070"
    memory: number; // VRAM in GB
    coreClock: number; // Base clock in MHz
    boostClock: number; // Boost clock in MHz
    color: string; // Dominant color of the card shroud/cooler
    length: number; // Length of the card in mm
    tdp: number; // Thermal Design Power in Watts
    price: number; // Price in your currency or USD
  };
  
  export const gpus: GPU[] = [
    {
      name: "ASUS DUAL OC GeForce RTX 4070", // Example including partner name
      brand: 'NVIDIA',
      chipset: "GeForce RTX 4070",
      memory: 12,
      coreClock: 1920,
      boostClock: 2550, // OC version boost clock
      color: "Black",
      length: 267, // Specific model length
      tdp: 200,
      price: 610
    },
    {
      name: "Sapphire PULSE Radeon RX 7800 XT",
      brand: 'AMD',
      chipset: "Radeon RX 7800 XT",
      memory: 16,
      coreClock: 1800, // Base clock varies by model, approximate
      boostClock: 2430,
      color: "Black",
      length: 313,
      tdp: 263,
      price: 500
    },
    {
      name: "Gigabyte GAMING OC GeForce RTX 4090",
      brand: 'NVIDIA',
      chipset: "GeForce RTX 4090",
      memory: 24,
      coreClock: 2235,
      boostClock: 2535,
      color: "Black",
      length: 340,
      tdp: 450,
      price: 1700
    },
    {
      name: "PowerColor Hellhound Spectral Radeon RX 7900 XTX",
      brand: 'AMD',
      chipset: "Radeon RX 7900 XTX",
      memory: 24,
      coreClock: 1900, // Approximate base
      boostClock: 2525, // Hellhound boost
      color: "White", // Spectral White edition
      length: 320,
      tdp: 355,
      price: 1000
    },
    {
      name: "Zotac GAMING Twin Edge OC GeForce RTX 3060",
      brand: 'NVIDIA',
      chipset: "GeForce RTX 3060",
      memory: 12,
      coreClock: 1320,
      boostClock: 1807,
      color: "Black",
      length: 224,
      tdp: 170,
      price: 330
    },
    { // Added Intel Arc example
      name: "Intel Arc A770 Limited Edition",
      brand: 'Intel',
      chipset: "Arc A770",
      memory: 16, // LE model usually has 16GB
      coreClock: 2100, // Base Graphics Clock
      boostClock: 2400, // Can boost higher, typical boost
      color: "Black",
      length: 280, // Approximate length
      tdp: 225,
      price: 350 // Price varies, example
    }
  ];