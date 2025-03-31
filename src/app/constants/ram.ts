export type RAM = {
    name: string;
    ddrType: 'DDR4' | 'DDR5'; // Explicitly state DDR generation
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
  };
  
  // Define the input type for the helper function, excluding calculated fields
  type RamInput = Omit<RAM, 'pricePerGB' | 'firstWordLatency'>;
  
  // Helper function to calculate Price/GB and First Word Latency
  const calculateRamMetrics = (kit: RamInput): RAM => {
    const pricePerGB = kit.price / kit.sizeGB;
    // Formula: First Word Latency (ns) = (CAS Latency / (Transfer Rate / 2)) * 1000
    const firstWordLatency = (kit.casLatency / (kit.speed / 2)) * 1000;
    return {
      ...kit,
      pricePerGB: parseFloat(pricePerGB.toFixed(2)),
      firstWordLatency: parseFloat(firstWordLatency.toFixed(2)),
    };
  };
  
  export const ram: RAM[] = [
    calculateRamMetrics({
      name: "Corsair Vengeance 32GB (2x16GB) DDR5-6000 CL36",
      ddrType: 'DDR5',
      speed: 6000,
      modules: 2,
      sizeGB: 32,
      color: "Black",
      casLatency: 36,
      ecc: false,
      rgb: false, // Standard Vengeance is non-RGB
      price: 110,
    }),
    calculateRamMetrics({
      name: "G.Skill Ripjaws S5 32GB (2x16GB) DDR5-5600 CL28",
      ddrType: 'DDR5',
      speed: 5600,
      modules: 2,
      sizeGB: 32,
      color: "Black",
      casLatency: 28,
      ecc: false,
      rgb: false,
      price: 105,
    }),
    calculateRamMetrics({
      name: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6400 CL32", // RGB Example
      ddrType: 'DDR5',
      speed: 6400,
      modules: 2,
      sizeGB: 32,
      color: "Silver",
      casLatency: 32,
      ecc: false,
      rgb: true, // This one has RGB
      price: 130,
    }),
     calculateRamMetrics({
      name: "Kingston FURY Beast 16GB (1x16GB) DDR5-5200 CL40",
      ddrType: 'DDR5',
      speed: 5200,
      modules: 1,
      sizeGB: 16,
      color: "Black",
      casLatency: 40,
      ecc: false,
      rgb: false,
      price: 55,
    }),
    calculateRamMetrics({
      name: "Crucial Pro 64GB (2x32GB) DDR5-5600 CL46",
      ddrType: 'DDR5',
      speed: 5600,
      modules: 2,
      sizeGB: 64,
      color: "Gray",
      casLatency: 46,
      ecc: false, // Assuming consumer Pro version, not ECC server memory
      rgb: false,
      price: 180,
    }),
    // Example DDR4 RAM
    calculateRamMetrics({
      name: "Corsair Vengeance LPX 32GB (2x16GB) DDR4-3200 CL16",
      ddrType: 'DDR4',
      speed: 3200,
      modules: 2,
      sizeGB: 32,
      color: "Black",
      casLatency: 16,
      ecc: false,
      rgb: false,
      price: 70,
    }),
     // Example DDR4 RGB RAM
    calculateRamMetrics({
      name: "Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4-3600 CL18",
      ddrType: 'DDR4',
      speed: 3600,
      modules: 2,
      sizeGB: 32,
      color: "Black",
      casLatency: 18,
      ecc: false,
      rgb: true,
      price: 90,
    }),
  ];