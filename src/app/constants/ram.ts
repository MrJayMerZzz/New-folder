// constants/ram.ts

export type RAM = {
  name: string;
  brand: string; // Added brand for easier filtering/identification
  ddrType: 'DDR3' | 'DDR4' | 'DDR5'; // Explicitly state DDR generation
  speed: number; // Speed in MHz
  modules: number; // Number of sticks in the kit
  sizeGB: number; // Total size of the kit in GB
  pricePerGB: number; // Calculated Price per Gigabyte
  color: string; // Color of the heat spreader
  firstWordLatency: number; // Calculated latency in nanoseconds
  casLatency: number; // CAS Latency (CL) rating
  ecc: boolean; // ECC Status (usually false for consumer RAM)
  rgb: boolean; // Does it have RGB lighting?
  price: number; // Total price for the kit
  // Add optional XMP/EXPO support if needed for RAM itself
  supportsXMP?: boolean;
  supportsEXPO?: boolean;
};

// Define the input type for the helper function, excluding calculated fields and brand
type RamInput = Omit<RAM, 'pricePerGB' | 'firstWordLatency' | 'brand'>;

// Helper function to calculate Price/GB, First Word Latency, and infer Brand
const createRamEntry = (kitInput: RamInput): RAM => {
  const pricePerGB = kitInput.price / kitInput.sizeGB;
  // Formula: First Word Latency (ns) = (CAS Latency / (Transfer Rate / 2)) * 1000
  const firstWordLatency = (kitInput.casLatency / (kitInput.speed / 2)) * 1000;
  // Simple brand inference from the first word of the name
  const brand = kitInput.name.split(' ')[0];

  // Basic XMP/EXPO inference (can be overridden in input)
  let supportsXMP = kitInput.supportsXMP ?? (kitInput.ddrType !== 'DDR3'); // Assume DDR4/5 likely support XMP
  let supportsEXPO = kitInput.supportsEXPO ?? (kitInput.ddrType === 'DDR5'); // Assume DDR5 might support EXPO

  // Refine EXPO/XMP based on common knowledge (optional, better to specify in input)
  if (brand === 'G.Skill' && kitInput.name.includes('Flare X5') || kitInput.name.includes('Trident Z5 Neo')) {
      supportsEXPO = true; // These lines are often EXPO optimized
  }
   if (brand === 'Corsair' || brand === 'G.Skill' || brand === 'Kingston' || brand === 'Crucial') {
       supportsXMP = true; // Major brands usually support XMP on DDR4/5
   }


  return {
    ...kitInput,
    brand: brand, // Add the inferred brand
    pricePerGB: parseFloat(pricePerGB.toFixed(2)),
    firstWordLatency: parseFloat(firstWordLatency.toFixed(2)),
    supportsXMP: supportsXMP, // Add inferred/passed value
    supportsEXPO: supportsEXPO, // Add inferred/passed value
  };
};

// Array to hold all RAM entries, populated using the helper function
// Add supportsXMP/supportsEXPO flags where known, otherwise let helper infer
const ramDataInput: RamInput[] = [
  // --- DDR3 Desktop Examples ---
  { name: "Kingston ValueRAM 4GB DDR3-1600 CL11", ddrType: 'DDR3', speed: 1600, modules: 1, sizeGB: 4, color: "Green", casLatency: 11, ecc: false, rgb: false, price: 15 },
  { name: "Crucial Ballistix Sport 8GB (2x4GB) DDR3-1600 CL9", ddrType: 'DDR3', speed: 1600, modules: 2, sizeGB: 8, color: "Blue", casLatency: 9, ecc: false, rgb: false, price: 30 },
  { name: "G.Skill Ripjaws X 8GB (2x4GB) DDR3-1600 CL9", ddrType: 'DDR3', speed: 1600, modules: 2, sizeGB: 8, color: "Red", casLatency: 9, ecc: false, rgb: false, price: 32 },
  { name: "Corsair Vengeance 8GB (1x8GB) DDR3-1600 CL10", ddrType: 'DDR3', speed: 1600, modules: 1, sizeGB: 8, color: "Black", casLatency: 10, ecc: false, rgb: false, price: 28 },
  { name: "Kingston HyperX Fury 8GB (1x8GB) DDR3-1866 CL10", ddrType: 'DDR3', speed: 1866, modules: 1, sizeGB: 8, color: "White", casLatency: 10, ecc: false, rgb: false, price: 35 },
  { name: "G.Skill Ares 16GB (2x8GB) DDR3-1600 CL9", ddrType: 'DDR3', speed: 1600, modules: 2, sizeGB: 16, color: "Orange", casLatency: 9, ecc: false, rgb: false, price: 55 },
  { name: "Corsair Vengeance Pro 16GB (2x8GB) DDR3-2400 CL11", ddrType: 'DDR3', speed: 2400, modules: 2, sizeGB: 16, color: "Silver", casLatency: 11, ecc: false, rgb: false, price: 70 },
  { name: "TeamGroup Vulcan 16GB (2x8GB) DDR3-1600 CL9", ddrType: 'DDR3', speed: 1600, modules: 2, sizeGB: 16, color: "Gold", casLatency: 9, ecc: false, rgb: false, price: 50 },
  { name: "Patriot Viper 3 16GB (2x8GB) DDR3-1866 CL10", ddrType: 'DDR3', speed: 1866, modules: 2, sizeGB: 16, color: "Black", casLatency: 10, ecc: false, rgb: false, price: 60 },

  // --- DDR4 Desktop Examples ---
  // 8GB Kits
  { name: "Kingston FURY Beast 8GB DDR4-2666 CL16", ddrType: 'DDR4', speed: 2666, modules: 1, sizeGB: 8, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 22 },
  { name: "Crucial Ballistix 8GB DDR4-3000 CL15", ddrType: 'DDR4', speed: 3000, modules: 1, sizeGB: 8, color: "Red", casLatency: 15, ecc: false, rgb: false, price: 28 },
  { name: "G.Skill Aegis 8GB DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 1, sizeGB: 8, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 25 },
  { name: "TeamGroup T-Force Vulcan Z 8GB DDR4-3000 CL16", ddrType: 'DDR4', speed: 3000, modules: 1, sizeGB: 8, color: "Grey", casLatency: 16, ecc: false, rgb: false, price: 24 },
  { name: "Corsair Vengeance LPX 8GB DDR4-2400 CL14", ddrType: 'DDR4', speed: 2400, modules: 1, sizeGB: 8, color: "Black", casLatency: 14, ecc: false, rgb: false, price: 30 },

  // 16GB Kits (2x8GB)
  { name: "Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 45 },
  { name: "G.Skill Ripjaws V 16GB (2x8GB) DDR4-3600 CL18", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 16, color: "Red", casLatency: 18, ecc: false, rgb: false, price: 50 },
  { name: "Crucial Ballistix 16GB (2x8GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "White", casLatency: 16, ecc: false, rgb: false, price: 55 },
  { name: "TeamGroup T-Force Vulcan Z 16GB (2x8GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "Grey", casLatency: 16, ecc: false, rgb: false, price: 42 },
  { name: "Kingston FURY Beast 16GB (2x8GB) DDR4-3600 CL17", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 16, color: "Black", casLatency: 17, ecc: false, rgb: false, price: 58 },
  { name: "Patriot Viper Steel 16GB (2x8GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "Grey", casLatency: 16, ecc: false, rgb: false, price: 44 },
  { name: "ADATA XPG GAMMIX D30 16GB (2x8GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "Red", casLatency: 16, ecc: false, rgb: false, price: 48 },
  { name: "Corsair Vengeance RGB Pro 16GB (2x8GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "Black", casLatency: 16, ecc: false, rgb: true, price: 65 },
  { name: "G.Skill Trident Z RGB 16GB (2x8GB) DDR4-3600 CL18", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 16, color: "Black/Silver", casLatency: 18, ecc: false, rgb: true, price: 75 },
  { name: "TeamGroup T-Force Delta RGB 16GB (2x8GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "White", casLatency: 16, ecc: false, rgb: true, price: 60 },

  // 32GB Kits (2x16GB)
  { name: "Corsair Vengeance LPX 32GB (2x16GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 32, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 70 },
  { name: "G.Skill Ripjaws V 32GB (2x16GB) DDR4-3600 CL16", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 80 },
  { name: "Crucial Ballistix 32GB (2x16GB) DDR4-3600 CL16", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 95 },
  { name: "TeamGroup T-Force Vulcan Z 32GB (2x16GB) DDR4-3600 CL18", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "Grey", casLatency: 18, ecc: false, rgb: false, price: 75 },
  { name: "Kingston FURY Renegade 32GB (2x16GB) DDR4-3600 CL16", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 100 },
  { name: "Patriot Viper 4 Blackout 32GB (2x16GB) DDR4-3600 CL18", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "Black", casLatency: 18, ecc: false, rgb: false, price: 78 },
  { name: "ADATA XPG SPECTRIX D60G 32GB (2x16GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 32, color: "Tungsten Grey", casLatency: 16, ecc: false, rgb: true, price: 90 },
  { name: "Corsair Vengeance RGB Pro SL 32GB (2x16GB) DDR4-3600 CL18", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "White", casLatency: 18, ecc: false, rgb: true, price: 95 },
  { name: "G.Skill Trident Z Neo 32GB (2x16GB) DDR4-3600 CL16", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "Black/White", casLatency: 16, ecc: false, rgb: true, price: 110 },
  { name: "TeamGroup T-Force Xtreem ARGB 32GB (2x16GB) DDR4-4000 CL18", ddrType: 'DDR4', speed: 4000, modules: 2, sizeGB: 32, color: "Mirror Black", casLatency: 18, ecc: false, rgb: true, price: 130 },

  // 64GB Kits (2x32GB or 4x16GB)
  { name: "Corsair Vengeance LPX 64GB (2x32GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 64, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 140 },
  { name: "G.Skill Ripjaws V 64GB (2x32GB) DDR4-3600 CL18", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 64, color: "Black", casLatency: 18, ecc: false, rgb: false, price: 150 },
  { name: "Crucial Ballistix MAX 64GB (4x16GB) DDR4-4000 CL18", ddrType: 'DDR4', speed: 4000, modules: 4, sizeGB: 64, color: "Black", casLatency: 18, ecc: false, rgb: true, price: 280 },
  { name: "TeamGroup T-Create Expert 64GB (2x32GB) DDR4-3600 CL18", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 64, color: "Grey", casLatency: 18, ecc: false, rgb: false, price: 145 },
  { name: "Kingston FURY Beast 64GB (2x32GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 64, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 155 },

  // --- DDR5 Desktop Examples ---
  // 16GB Kits (2x8GB or 1x16GB)
  { name: "Crucial 16GB (1x16GB) DDR5-4800 CL40", ddrType: 'DDR5', speed: 4800, modules: 1, sizeGB: 16, color: "Black", casLatency: 40, ecc: false, rgb: false, price: 45 },
  { name: "Kingston FURY Beast 16GB (1x16GB) DDR5-5200 CL40", ddrType: 'DDR5', speed: 5200, modules: 1, sizeGB: 16, color: "Black", casLatency: 40, ecc: false, rgb: false, price: 55 },
  { name: "Corsair Vengeance 16GB (2x8GB) DDR5-5200 CL40", ddrType: 'DDR5', speed: 5200, modules: 2, sizeGB: 16, color: "Black", casLatency: 40, ecc: false, rgb: false, price: 65 },
  { name: "G.Skill Flare X5 16GB (2x8GB) DDR5-5600 CL36", ddrType: 'DDR5', speed: 5600, modules: 2, sizeGB: 16, color: "Black", casLatency: 36, ecc: false, rgb: false, price: 70, supportsEXPO: true }, // EXPO specific

  // 32GB Kits (2x16GB)
  { name: "G.Skill Ripjaws S5 32GB (2x16GB) DDR5-5600 CL28", ddrType: 'DDR5', speed: 5600, modules: 2, sizeGB: 32, color: "Black", casLatency: 28, ecc: false, rgb: false, price: 105, supportsXMP: true }, // Low CL XMP
  { name: "Corsair Vengeance 32GB (2x16GB) DDR5-6000 CL36", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 32, color: "Black", casLatency: 36, ecc: false, rgb: false, price: 100, supportsXMP: true, supportsEXPO: true }, // Supports both
  { name: "TeamGroup T-Force Delta RGB 32GB (2x16GB) DDR5-6000 CL30", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 32, color: "Black", casLatency: 30, ecc: false, rgb: true, price: 115, supportsXMP: true, supportsEXPO: true },
  { name: "Kingston FURY Beast RGB 32GB (2x16GB) DDR5-6000 CL36", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 32, color: "Black", casLatency: 36, ecc: false, rgb: true, price: 120, supportsXMP: true, supportsEXPO: true },
  { name: "G.Skill Flare X5 32GB (2x16GB) DDR5-6000 CL30", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 32, color: "Black", casLatency: 30, ecc: false, rgb: false, price: 105, supportsEXPO: true }, // AMD EXPO Optimized
  { name: "Crucial Pro 32GB (2x16GB) DDR5-5600 CL46", ddrType: 'DDR5', speed: 5600, modules: 2, sizeGB: 32, color: "Black", casLatency: 46, ecc: false, rgb: false, price: 85 }, // Higher CL
  { name: "ADATA XPG Lancer RGB 32GB (2x16GB) DDR5-6000 CL30", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 32, color: "Black", casLatency: 30, ecc: false, rgb: true, price: 110, supportsXMP: true, supportsEXPO: true },
  { name: "Patriot Viper Venom 32GB (2x16GB) DDR5-6400 CL32", ddrType: 'DDR5', speed: 6400, modules: 2, sizeGB: 32, color: "Black", casLatency: 32, ecc: false, rgb: false, price: 120, supportsXMP: true },
  { name: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6400 CL32", ddrType: 'DDR5', speed: 6400, modules: 2, sizeGB: 32, color: "Silver", casLatency: 32, ecc: false, rgb: true, price: 130, supportsXMP: true },
  { name: "Corsair Dominator Platinum RGB 32GB (2x16GB) DDR5-6200 CL36", ddrType: 'DDR5', speed: 6200, modules: 2, sizeGB: 32, color: "White", casLatency: 36, ecc: false, rgb: true, price: 160, supportsXMP: true },
  { name: "TeamGroup T-Create Expert 32GB (2x16GB) DDR5-6000 CL38", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 32, color: "Silver", casLatency: 38, ecc: false, rgb: false, price: 95, supportsXMP: true, supportsEXPO: true }, // Content creator focused

  // 48GB Kits (2x24GB)
  { name: "Corsair Vengeance 48GB (2x24GB) DDR5-6400 CL36", ddrType: 'DDR5', speed: 6400, modules: 2, sizeGB: 48, color: "Black", casLatency: 36, ecc: false, rgb: false, price: 160, supportsXMP: true, supportsEXPO: true },
  { name: "G.Skill Trident Z5 RGB 48GB (2x24GB) DDR5-7200 CL36", ddrType: 'DDR5', speed: 7200, modules: 2, sizeGB: 48, color: "Black", casLatency: 36, ecc: false, rgb: true, price: 200, supportsXMP: true },
  { name: "TeamGroup T-Force Delta RGB 48GB (2x24GB) DDR5-6800 CL34", ddrType: 'DDR5', speed: 6800, modules: 2, sizeGB: 48, color: "White", casLatency: 34, ecc: false, rgb: true, price: 190, supportsXMP: true },
  { name: "Kingston FURY Renegade 48GB (2x24GB) DDR5-7200 CL38", ddrType: 'DDR5', speed: 7200, modules: 2, sizeGB: 48, color: "Silver", casLatency: 38, ecc: false, rgb: false, price: 185, supportsXMP: true },

  // 64GB Kits (2x32GB or 4x16GB)
  { name: "Corsair Vengeance 64GB (2x32GB) DDR5-5600 CL40", ddrType: 'DDR5', speed: 5600, modules: 2, sizeGB: 64, color: "Black", casLatency: 40, ecc: false, rgb: false, price: 170, supportsXMP: true, supportsEXPO: true },
  { name: "G.Skill Ripjaws S5 64GB (2x32GB) DDR5-6000 CL30", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 64, color: "Black", casLatency: 30, ecc: false, rgb: false, price: 195, supportsXMP: true },
  { name: "TeamGroup T-Force Vulcan 64GB (2x32GB) DDR5-5600 CL36", ddrType: 'DDR5', speed: 5600, modules: 2, sizeGB: 64, color: "Black", casLatency: 36, ecc: false, rgb: false, price: 180, supportsXMP: true, supportsEXPO: true },
  { name: "Kingston FURY Beast 64GB (2x32GB) DDR5-6000 CL36", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 64, color: "Black", casLatency: 36, ecc: false, rgb: false, price: 190, supportsXMP: true, supportsEXPO: true },
  { name: "Crucial Pro 64GB (2x32GB) DDR5-5600 CL46", ddrType: 'DDR5', speed: 5600, modules: 2, sizeGB: 64, color: "Black", casLatency: 46, ecc: false, rgb: false, price: 165 },
  { name: "Corsair Dominator Platinum RGB 64GB (2x32GB) DDR5-6600 CL32", ddrType: 'DDR5', speed: 6600, modules: 2, sizeGB: 64, color: "Black", casLatency: 32, ecc: false, rgb: true, price: 300, supportsXMP: true },
  { name: "G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6400 CL32", ddrType: 'DDR5', speed: 6400, modules: 2, sizeGB: 64, color: "Black", casLatency: 32, ecc: false, rgb: true, price: 220, supportsXMP: true },
  { name: "ADATA XPG Lancer 64GB (2x32GB) DDR5-6000 CL30", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 64, color: "Black", casLatency: 30, ecc: false, rgb: false, price: 200, supportsXMP: true, supportsEXPO: true },

   // 96GB Kits (2x48GB)
  { name: "Corsair Vengeance RGB 96GB (2x48GB) DDR5-6400 CL36", ddrType: 'DDR5', speed: 6400, modules: 2, sizeGB: 96, color: "Black", casLatency: 36, ecc: false, rgb: true, price: 330, supportsXMP: true, supportsEXPO: true },
  { name: "G.Skill Trident Z5 RGB 96GB (2x48GB) DDR5-6800 CL34", ddrType: 'DDR5', speed: 6800, modules: 2, sizeGB: 96, color: "Silver", casLatency: 34, ecc: false, rgb: true, price: 380, supportsXMP: true },
  { name: "TeamGroup T-Create Expert 96GB (2x48GB) DDR5-6000 CL34", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 96, color: "Silver", casLatency: 34, ecc: false, rgb: false, price: 300, supportsXMP: true, supportsEXPO: true },

  // 128GB Kits (4x32GB) - High Capacity
  { name: "Corsair Vengeance 128GB (4x32GB) DDR5-5200 CL40", ddrType: 'DDR5', speed: 5200, modules: 4, sizeGB: 128, color: "Black", casLatency: 40, ecc: false, rgb: false, price: 350, supportsXMP: true, supportsEXPO: true },
  { name: "G.Skill Ripjaws S5 128GB (4x32GB) DDR5-5600 CL36", ddrType: 'DDR5', speed: 5600, modules: 4, sizeGB: 128, color: "Black", casLatency: 36, ecc: false, rgb: false, price: 380, supportsXMP: true },
  { name: "Kingston FURY Beast 128GB (4x32GB) DDR5-6000 CL36", ddrType: 'DDR5', speed: 6000, modules: 4, sizeGB: 128, color: "Black", casLatency: 36, ecc: false, rgb: false, price: 420, supportsXMP: true, supportsEXPO: true },

  // Add more entries to reach ~100 total, varying specs...
  // More DDR4
  { name: "HyperX Predator 16GB (2x8GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "Black", casLatency: 16, ecc: false, rgb: true, price: 70 },
  { name: "Crucial Ballistix RGB 16GB (2x8GB) DDR4-3600 CL16", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 16, color: "White", casLatency: 16, ecc: false, rgb: true, price: 85 },
  { name: "G.Skill Ripjaws V 16GB (2x8GB) DDR4-3200 CL14", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "Black", casLatency: 14, ecc: false, rgb: false, price: 75 }, // Low Latency DDR4
  { name: "TeamGroup T-Force Night Hawk RGB 16GB (2x8GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 16, color: "Black", casLatency: 16, ecc: false, rgb: true, price: 68 },
  { name: "Corsair Vengeance LPX 32GB (2x16GB) DDR4-3600 CL18", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "Black", casLatency: 18, ecc: false, rgb: false, price: 85 },
  { name: "G.Skill Trident Z Royal 32GB (2x16GB) DDR4-3600 CL16", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "Gold", casLatency: 16, ecc: false, rgb: true, price: 150 }, // Premium look
  { name: "Kingston FURY Beast 32GB (2x16GB) DDR4-3200 CL16", ddrType: 'DDR4', speed: 3200, modules: 2, sizeGB: 32, color: "Black", casLatency: 16, ecc: false, rgb: false, price: 72 },
  { name: "Patriot Viper Elite II 32GB (2x16GB) DDR4-3600 CL20", ddrType: 'DDR4', speed: 3600, modules: 2, sizeGB: 32, color: "Red", casLatency: 20, ecc: false, rgb: false, price: 70 }, // Higher CL

  // More DDR5
  { name: "Corsair Vengeance 32GB (2x16GB) DDR5-5200 CL40", ddrType: 'DDR5', speed: 5200, modules: 2, sizeGB: 32, color: "Black", casLatency: 40, ecc: false, rgb: false, price: 90, supportsXMP: true, supportsEXPO: true },
  { name: "G.Skill Flare X5 32GB (2x16GB) DDR5-5200 CL36", ddrType: 'DDR5', speed: 5200, modules: 2, sizeGB: 32, color: "Black", casLatency: 36, ecc: false, rgb: false, price: 98, supportsEXPO: true },
  { name: "Kingston FURY Beast 32GB (2x16GB) DDR5-5600 CL40", ddrType: 'DDR5', speed: 5600, modules: 2, sizeGB: 32, color: "Black", casLatency: 40, ecc: false, rgb: false, price: 95, supportsXMP: true, supportsEXPO: true },
  { name: "TeamGroup T-Force Vulcan 32GB (2x16GB) DDR5-6000 CL38", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 32, color: "Black", casLatency: 38, ecc: false, rgb: false, price: 98, supportsXMP: true, supportsEXPO: true },
  { name: "Crucial 32GB (2x16GB) DDR5-5200 CL42", ddrType: 'DDR5', speed: 5200, modules: 2, sizeGB: 32, color: "Black", casLatency: 42, ecc: false, rgb: false, price: 88 },
  { name: "ADATA XPG Lancer 32GB (2x16GB) DDR5-5200 CL38", ddrType: 'DDR5', speed: 5200, modules: 2, sizeGB: 32, color: "Black", casLatency: 38, ecc: false, rgb: false, price: 92, supportsXMP: true, supportsEXPO: true },
  { name: "Patriot Viper Venom RGB 32GB (2x16GB) DDR5-6200 CL40", ddrType: 'DDR5', speed: 6200, modules: 2, sizeGB: 32, color: "Black", casLatency: 40, ecc: false, rgb: true, price: 125, supportsXMP: true },
  { name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5-6400 CL32", ddrType: 'DDR5', speed: 6400, modules: 2, sizeGB: 32, color: "White", casLatency: 32, ecc: false, rgb: true, price: 140, supportsXMP: true },
  { name: "G.Skill Trident Z5 32GB (2x16GB) DDR5-7200 CL34", ddrType: 'DDR5', speed: 7200, modules: 2, sizeGB: 32, color: "Black", casLatency: 34, ecc: false, rgb: false, price: 150, supportsXMP: true }, // High speed
  { name: "TeamGroup T-Force Xtreem 32GB (2x16GB) DDR5-8000 CL38", ddrType: 'DDR5', speed: 8000, modules: 2, sizeGB: 32, color: "Silver", casLatency: 38, ecc: false, rgb: false, price: 250, supportsXMP: true }, // Very high speed

  // More 64GB Kits
  { name: "Corsair Vengeance 64GB (2x32GB) DDR5-6000 CL30", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 64, color: "Black", casLatency: 30, ecc: false, rgb: false, price: 200, supportsXMP: true, supportsEXPO: true },
  { name: "G.Skill Ripjaws S5 64GB (2x32GB) DDR5-5600 CL36", ddrType: 'DDR5', speed: 5600, modules: 2, sizeGB: 64, color: "White", casLatency: 36, ecc: false, rgb: false, price: 185, supportsXMP: true },
  { name: "TeamGroup T-Create Expert 64GB (2x32GB) DDR5-6400 CL34", ddrType: 'DDR5', speed: 6400, modules: 2, sizeGB: 64, color: "Silver", casLatency: 34, ecc: false, rgb: false, price: 210, supportsXMP: true, supportsEXPO: true },
  { name: "Kingston FURY Renegade RGB 64GB (2x32GB) DDR5-6400 CL32", ddrType: 'DDR5', speed: 6400, modules: 2, sizeGB: 64, color: "Silver", casLatency: 32, ecc: false, rgb: true, price: 240, supportsXMP: true },
  { name: "Crucial Pro 64GB (2x32GB) DDR5-5200 CL42", ddrType: 'DDR5', speed: 5200, modules: 2, sizeGB: 64, color: "Black", casLatency: 42, ecc: false, rgb: false, price: 160 },
  { name: "ADATA XPG Caster RGB 64GB (2x32GB) DDR5-6400 CL32", ddrType: 'DDR5', speed: 6400, modules: 2, sizeGB: 64, color: "Gray", casLatency: 32, ecc: false, rgb: true, price: 230, supportsXMP: true },
  { name: "Patriot Viper Elite 5 RGB 64GB (2x32GB) DDR5-6000 CL42", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 64, color: "Black", casLatency: 42, ecc: false, rgb: true, price: 190, supportsXMP: true, supportsEXPO: true },
  { name: "G.Skill Trident Z5 Neo RGB 64GB (2x32GB) DDR5-6000 CL30", ddrType: 'DDR5', speed: 6000, modules: 2, sizeGB: 64, color: "Black", casLatency: 30, ecc: false, rgb: true, price: 215, supportsEXPO: true }, // AMD EXPO Optimized
];

// Calculate metrics for all input data and export the final array
// Use createRamEntry which calculates metrics AND infers brand/profiles
export const ram: RAM[] = ramDataInput.map(createRamEntry);

