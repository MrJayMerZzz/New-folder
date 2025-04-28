export type GPU = {
  name: string;
  brand: 'NVIDIA' | 'AMD' | 'Intel'; // Added Intel for potential Arc GPUs
  chipset: string; // The specific GPU model, e.g., "GeForce RTX 4070"
  memory: number; // VRAM in GB
  coreClock: number; // Base or Game clock in MHz
  boostClock: number; // Boost clock in MHz
  color: string; // Dominant color of the card shroud/cooler
  length: number; // Length of the card in mm
  tdp: number; // Thermal Design Power in Watts
  price: number; // Price in your currency or USD (using MSRP/SEP as a base)
};

// Array containing all GPUs (will be sorted below)
const allGpus: GPU[] = [
   {
    name: "ASUS DUAL OC GeForce RTX 4070",
    brand: 'NVIDIA',
    chipset: "GeForce RTX 4070",
    memory: 12, coreClock: 1920, boostClock: 2550, color: "Black", length: 267, tdp: 200, price: 610
  },
  {
    name: "Sapphire PULSE Radeon RX 7800 XT",
    brand: 'AMD',
    chipset: "Radeon RX 7800 XT",
    memory: 16, coreClock: 1800, boostClock: 2430, color: "Black", length: 313, tdp: 263, price: 500
  },
  {
    name: "Gigabyte GAMING OC GeForce RTX 4090",
    brand: 'NVIDIA',
    chipset: "GeForce RTX 4090",
    memory: 24, coreClock: 2235, boostClock: 2535, color: "Black", length: 340, tdp: 450, price: 1700
  },
  {
    name: "NVIDIA GeForce RTX 5090 Founders Edition",
    brand: 'NVIDIA',
    chipset: "GeForce RTX 5090",
    memory: 32, coreClock: 2017, boostClock: 2407, color: "Silver/Black", length: 304, tdp: 575, price: 1999
  },
  {
    name: "PowerColor Hellhound Spectral Radeon RX 7900 XTX",
    brand: 'AMD',
    chipset: "Radeon RX 7900 XTX",
    memory: 24, coreClock: 1900, boostClock: 2525, color: "White", length: 320, tdp: 355, price: 1000
  },
  {
    name: "Zotac GAMING Twin Edge OC GeForce RTX 3060",
    brand: 'NVIDIA',
    chipset: "GeForce RTX 3060",
    memory: 12, coreClock: 1320, boostClock: 1807, color: "Black", length: 224, tdp: 170, price: 330
  },
  {
    name: "Intel Arc A770 Limited Edition",
    brand: 'Intel',
    chipset: "Arc A770",
    memory: 16, coreClock: 2100, boostClock: 2400, color: "Black", length: 280, tdp: 225, price: 350
  },
  {
      name: "MSI GAMING X TRIO GeForce RTX 4080 SUPER",
      brand: 'NVIDIA',
      chipset: "GeForce RTX 4080 SUPER",
      memory: 16, coreClock: 2295, boostClock: 2640, color: "Black/Grey", length: 337, tdp: 320, price: 1150
    },
    {
      name: "XFX Speedster MERC 310 Radeon RX 7900 XT",
      brand: 'AMD',
      chipset: "Radeon RX 7900 XT",
      memory: 20, coreClock: 1500, boostClock: 2560, color: "Black", length: 344, tdp: 315, price: 750
    },
    {
      name: "ASUS TUF GAMING OC GeForce RTX 4070 Ti SUPER",
      brand: 'NVIDIA',
      chipset: "GeForce RTX 4070 Ti SUPER",
      memory: 16, coreClock: 2340, boostClock: 2670, color: "Grey", length: 305, tdp: 285, price: 850
    },
    {
        name: "ASRock Challenger OC Radeon RX 7700 XT",
        brand: 'AMD',
        chipset: "Radeon RX 7700 XT",
        memory: 12, coreClock: 1785, boostClock: 2584, color: "Black", length: 267, tdp: 245, price: 440
    },
    {
      name: "Gigabyte EAGLE OC GeForce RTX 4060 Ti 8GB",
      brand: 'NVIDIA',
      chipset: "GeForce RTX 4060 Ti",
      memory: 8, coreClock: 2310, boostClock: 2550, color: "Grey/Black", length: 272, tdp: 160, price: 400
    },
    {
      name: "Sapphire PULSE Radeon RX 7600",
      brand: 'AMD',
      chipset: "Radeon RX 7600",
      memory: 8, coreClock: 1720, boostClock: 2755, color: "Black/Red", length: 240, tdp: 165, price: 270
    },
    {
      name: "Intel Arc A750 Limited Edition",
      brand: 'Intel',
      chipset: "Arc A750",
      memory: 8, coreClock: 2050, boostClock: 2400, color: "Black", length: 280, tdp: 225, price: 230
    },
    {
      name: "AMD Radeon RX 9070 XT",
      brand: 'AMD',
      chipset: "Radeon RX 9070 XT",
      memory: 16, coreClock: 2400, boostClock: 2970, color: "Black", length: 300, tdp: 304, price: 599
    },
    {
      name: "AMD Radeon RX 9070",
      brand: 'AMD',
      chipset: "Radeon RX 9070",
      memory: 16, coreClock: 2070, boostClock: 2520, color: "Black", length: 290, tdp: 220, price: 549
    },
    {
      name: "Sapphire NITRO+ Radeon RX 6900 XT SE",
      brand: 'AMD',
      chipset: "Radeon RX 6900 XT",
      memory: 16, coreClock: 2135, boostClock: 2365, color: "Silver/Black", length: 310, tdp: 363, price: 650
    },
    {
      name: "ASUS TUF Gaming Radeon RX 6800 XT OC",
      brand: 'AMD',
      chipset: "Radeon RX 6800 XT",
      memory: 16, coreClock: 2065, boostClock: 2310, color: "Black/Grey", length: 320, tdp: 300, price: 550
    },
    {
      name: "PowerColor Red Devil Radeon RX 6700 XT",
      brand: 'AMD',
      chipset: "Radeon RX 6700 XT",
      memory: 12, coreClock: 2514, boostClock: 2622, color: "Black/Red", length: 320, tdp: 250, price: 400
    },
    {
      name: "MSI Gaming X Radeon RX 6600 XT",
      brand: 'AMD',
      chipset: "Radeon RX 6600 XT",
      memory: 8, coreClock: 2428, boostClock: 2607, color: "Black/Grey", length: 277, tdp: 160, price: 300
    }
];

/**
 * Helper function to extract sorting keys from GPU name/chipset.
 * Assigns numerical priorities for brand, generation, tier, and suffix.
 * Higher values for generation, tier, and suffix mean higher performance priority for descending sort.
 * Brand priority: NVIDIA=1, AMD=2, Intel=3.
 */
function getSortKeys(gpu: GPU): { brandPriority: number; generation: number; tier: number; suffixPriority: number } {
  let brandPriority = 3; // Default/Other
  if (gpu.brand === 'NVIDIA') brandPriority = 1;
  else if (gpu.brand === 'AMD') brandPriority = 2;
  else if (gpu.brand === 'Intel') brandPriority = 3;

  let generation = 0;
  let tier = 0;
  let suffixPriority = 0; // Higher is better (e.g., SUPER/XTX > Ti/XT > base)

  const chipset = gpu.chipset.toLowerCase();

  try {
      if (gpu.brand === 'NVIDIA') {
          const match = chipset.match(/(?:rtx|gtx) (\d{1,2})(\d{2})/);
          if (match) {
              generation = parseInt(match[1], 10);
              tier = parseInt(match[2], 10);
          }
          if (chipset.includes('super')) suffixPriority = 2;
          else if (chipset.includes('ti')) suffixPriority = 1;

      } else if (gpu.brand === 'AMD') {
          const match = chipset.match(/rx (\d{1})(\d{1})(\d{2})/);
          if (match) {
              generation = parseInt(match[1], 10); // 9, 7, 6, etc.
              const modelNum = parseInt(match[2] + match[3], 10); // 900, 800, 700, 600 etc.
              // Assign tier based on model number
              if (modelNum >= 900) tier = 90;
              else if (modelNum >= 800) tier = 80;
              else if (modelNum >= 700) tier = 70;
              else if (modelNum >= 600) tier = 60;
              else if (modelNum >= 500) tier = 50;
              else tier = 0; // Handle lower tiers if needed
          }
          // Assign suffix priority
          if (chipset.includes('xtx')) suffixPriority = 3;
          else if (chipset.includes('xt')) suffixPriority = 2;
          else if (chipset.includes('gre')) suffixPriority = 1;

      } else if (gpu.brand === 'Intel') {
          const match = chipset.match(/arc a(\d{1})(\d{2})/);
          if (match) {
              generation = parseInt(match[1], 10);
              tier = parseInt(match[2], 10);
          }
          // No common suffixes for Intel yet
      }
  } catch (e) {
      console.error("Error parsing GPU chipset for sorting:", gpu.name, e);
      // Assign default low priorities on error for descending sort
      return { brandPriority: 9, generation: 0, tier: 0, suffixPriority: 0 };
  }

  return { brandPriority, generation, tier, suffixPriority };
}

let sortedGpus = [...allGpus];

sortedGpus.sort((a, b) => {
  const keysA = getSortKeys(a);
  const keysB = getSortKeys(b);

  if (keysA.brandPriority !== keysB.brandPriority) {
    return keysA.brandPriority - keysB.brandPriority;
  }

  if (keysA.generation !== keysB.generation) {
    return keysB.generation - keysA.generation; // Corrected: Higher generation first
  }

  if (keysA.tier !== keysB.tier) {
    return keysB.tier - keysA.tier; 
  }

  if (keysA.suffixPriority !== keysB.suffixPriority) {
    return keysB.suffixPriority - keysA.suffixPriority; 
  }


  if (a.price !== b.price) {
      return b.price - a.price; 
  }

  return a.name.localeCompare(b.name);
});

export const gpus: GPU[] = sortedGpus;

