export type RAM = {
    name: string;
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
  
  export const ram: RAM[] = 
[
  // 2GB Kits
  {
    name: "Generic Laptop 2GB DDR3-1333 CL9", // Based on Alibaba/eBay results
    ddrType: 'DDR3',
    speed: 1333,
    modules: 1, // Assuming single 2GB module
    sizeGB: 2,
    pricePerGB: 2.55, // price / sizeGB
    color: "Green", // Generic PCB color
    firstWordLatency: 13.50, // (9 / (1333 / 2)) * 1000
    casLatency: 9, // Common CL for DDR3 1333 SODIMM
    ecc: false,
    rgb: false,
    price: 5.10 // Estimated avg price
  },
  {
    name: "Generic Laptop 2GB DDR3-1600 CL11", // Based on Alibaba/eBay results
    ddrType: 'DDR3',
    speed: 1600,
    modules: 1, // Assuming single 2GB module
    sizeGB: 2,
    pricePerGB: 2.65, // price / sizeGB
    color: "Green", // Generic PCB color
    firstWordLatency: 13.75, // (11 / (1600 / 2)) * 1000
    casLatency: 11, // Common CL for DDR3 1600 SODIMM/UDIMM
    ecc: false,
    rgb: false,
    price: 5.30 // Estimated avg price
  },
  // 4GB Kits
  {
    name: "Generic Desktop 4GB (1x4GB) DDR3-1600 CL11", // Based on Made-in-China result
    ddrType: 'DDR3',
    speed: 1600,
    modules: 1, // Explicit 1x4GB
    sizeGB: 4,
    pricePerGB: 2.50, // price / sizeGB
    color: "Blue", // Specified in result
    firstWordLatency: 13.75, // (11 / (1600 / 2)) * 1000
    casLatency: 11,
    ecc: false,
    rgb: false,
    price: 10.00 // Ulike price from result
  },
   {
    name: "Generic Laptop 4GB DDR3-1333 CL9", // Based on Alibaba/eBay results
    ddrType: 'DDR3',
    speed: 1333,
    modules: 1, // Assuming single 4GB module
    sizeGB: 4,
    pricePerGB: 2.60, // price / sizeGB
    color: "Green", // Generic PCB color
    firstWordLatency: 13.50, // (9 / (1333 / 2)) * 1000
    casLatency: 9,
    ecc: false,
    rgb: false,
    price: 10.40 // Estimated avg price
  },
  {
    name: "Generic Laptop 4GB DDR3-1600 CL11", // Based on Alibaba results
    ddrType: 'DDR3',
    speed: 1600,
    modules: 1, // Assuming single 4GB module
    sizeGB: 4,
    pricePerGB: 2.75, // price / sizeGB
    color: "Green", // Generic PCB color
    firstWordLatency: 13.75, // (11 / (1600 / 2)) * 1000
    casLatency: 11,
    ecc: false,
    rgb: false,
    price: 11.00 // Estimated avg price
  },
   {
    name: "Kingston HyperX FURY 4GB DDR4-2400 CL15", // Based on Shopee results
    ddrType: 'DDR4',
    speed: 2400,
    modules: 1, // Assuming single 4GB module
    sizeGB: 4,
    pricePerGB: 4.25, // price / sizeGB
    color: "Black", // Common Fury color
    firstWordLatency: 12.50, // (15 / (2400 / 2)) * 1000
    casLatency: 15, // Common CL for 2400
    ecc: false,
    rgb: false, // Non-RGB Fury
    price: 17.00 // Estimated price based on 8GB/16GB
  },
  {
    name: "Kingston ValueRAM 4GB DDR4-2666 CL19", // Based on Shopee Kingston results
    ddrType: 'DDR4',
    speed: 2666,
    modules: 1, // Assuming single 4GB module
    sizeGB: 4,
    pricePerGB: 4.50, // price / sizeGB
    color: "Green", // ValueRAM typical color
    firstWordLatency: 14.25, // (19 / (2666 / 2)) * 1000
    casLatency: 19, // Common CL for 2666
    ecc: false,
    rgb: false,
    price: 18.00 // Estimated based on 8GB price
  },
  // 8GB Kits
  {
    name: "Generic Desktop 8GB (1x8GB) DDR3-1600 CL11", // Based on Made-in-China result
    ddrType: 'DDR3',
    speed: 1600,
    modules: 1, // Explicit 1x8GB
    sizeGB: 8,
    pricePerGB: 1.88, // price / sizeGB
    color: "Blue", // Specified in result
    firstWordLatency: 13.75, // (11 / (1600 / 2)) * 1000
    casLatency: 11,
    ecc: false,
    rgb: false,
    price: 15.00 // Estimated price
  },
  {
    name: "Kingston HyperX FURY 8GB DDR4-2666 CL16", // Based on Shopee results
    ddrType: 'DDR4',
    speed: 2666,
    modules: 1, // Assuming single 8GB module
    sizeGB: 8,
    pricePerGB: 2.75, // price / sizeGB
    color: "Black", // Common Fury color
    firstWordLatency: 12.00, // (16 / (2666 / 2)) * 1000
    casLatency: 16, // Common CL for 2666
    ecc: false,
    rgb: false,
    price: 22.00 // Approx IDR 170k + shipping estimate
  },
  {
    name: "Hynix 8GB DDR4-2666 CL19", // Based on Shopee results
    ddrType: 'DDR4',
    speed: 2666,
    modules: 1, // Assuming single 8GB module
    sizeGB: 8,
    pricePerGB: 2.25, // price / sizeGB
    color: "Green", // Typical OEM color
    firstWordLatency: 14.25, // (19 / (2666 / 2)) * 1000
    casLatency: 19, // Higher CL is common for OEM
    ecc: false,
    rgb: false,
    price: 18.00 // Approx IDR 135k + shipping estimate
  },
  {
    name: "Kingston HyperX FURY 8GB DDR4-3200 CL16", // Based on Shopee results
    ddrType: 'DDR4',
    speed: 3200,
    modules: 1, // Assuming single 8GB module
    sizeGB: 8,
    pricePerGB: 3.13, // price / sizeGB
    color: "Black", // Common Fury color
    firstWordLatency: 10.00, // (16 / (3200 / 2)) * 1000
    casLatency: 16, // Common CL for 3200
    ecc: false,
    rgb: false,
    price: 25.00 // Estimated price
  },
  {
    name: "Crucial 8GB (1x8GB) DDR5-4800 CL40", // Based on smaller kits mentioned
    ddrType: 'DDR5',
    speed: 4800,
    modules: 1,
    sizeGB: 8,
    pricePerGB: 4.75, // price / sizeGB
    color: "Black", // Crucial standard color
    firstWordLatency: 16.67, // (40 / (4800 / 2)) * 1000
    casLatency: 40, // JEDEC standard
    ecc: false,
    rgb: false,
    price: 38.00 // Estimated from Tokopedia 8GB price (~IDR 380k)
  },
  // 16GB Kits
   { // DDR3 16GB (2x8GB) - Less common, price estimated high
    name: "Generic Desktop 16GB (2x8GB) DDR3-1600 CL11",
    ddrType: 'DDR3',
    speed: 1600,
    modules: 2,
    sizeGB: 16,
    pricePerGB: 2.50, // price / sizeGB
    color: "Blue", // Generic
    firstWordLatency: 13.75, // (11 / (1600 / 2)) * 1000
    casLatency: 11,
    ecc: false,
    rgb: false,
    price: 40.00 // Estimated price
  },
  {
    name: "Kingston HyperX FURY 16GB (1x16GB) DDR4-2666 CL16", // Based on Shopee listings
    ddrType: 'DDR4',
    speed: 2666,
    modules: 1,
    sizeGB: 16,
    pricePerGB: 2.50, // price / sizeGB
    color: "Black",
    firstWordLatency: 12.00, // (16 / (2666 / 2)) * 1000
    casLatency: 16,
    ecc: false,
    rgb: false,
    price: 40.00 // Estimated
  },
   {
    name: "Kingston FURY Beast 16GB (2x8GB) DDR4-3200 CL16", // Based on Shopee 8x2GB kit
    ddrType: 'DDR4',
    speed: 3200,
    modules: 2,
    sizeGB: 16,
    pricePerGB: 4.12, // price / sizeGB
    color: "Black",
    firstWordLatency: 10.00, // (16 / (3200 / 2)) * 1000
    casLatency: 16,
    ecc: false,
    rgb: false, // Non-RGB Beast model
    price: 66.00 // Approx IDR 508k + shipping estimate * 2
  },
  {
    name: "Kingston FURY Beast 16GB (1x16GB) DDR5-5200 CL40", // Provided example data
    ddrType: 'DDR5',
    speed: 5200,
    modules: 1,
    sizeGB: 16,
    pricePerGB: 3.44, // price / sizeGB
    color: "Black",
    firstWordLatency: 15.38, // (40 / (5200 / 2)) * 1000
    casLatency: 40,
    ecc: false,
    rgb: false,
    price: 55.00
  },
  {
    name: "Crucial 16GB Kit (2x8GB) DDR5 5200MHz CL42", // Based on Amazon result
    ddrType: 'DDR5',
    speed: 5200,
    modules: 2,
    sizeGB: 16,
    pricePerGB: 5.50, // price / sizeGB
    color: "Black", // Default Crucial color
    firstWordLatency: 16.15, // (42 / (5200 / 2)) * 1000
    casLatency: 42, // From Amazon specs
    ecc: false,
    rgb: false,
    price: 87.99 // Amazon price
  },
  // 32GB Kits
  {
    name: "Corsair Vengeance LPX 32GB (2x16GB) DDR4-3200 CL16", // Provided example
    ddrType: 'DDR4',
    speed: 3200,
    modules: 2,
    sizeGB: 32,
    pricePerGB: 2.19, // price / sizeGB
    color: "Black",
    firstWordLatency: 10.00, // (16 / (3200 / 2)) * 1000
    casLatency: 16,
    ecc: false,
    rgb: false,
    price: 70.00
  },
  {
    name: "Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4-3600 CL18", // Provided example
    ddrType: 'DDR4',
    speed: 3600,
    modules: 2,
    sizeGB: 32,
    pricePerGB: 2.81, // price / sizeGB
    color: "Black",
    firstWordLatency: 10.00, // (18 / (3600 / 2)) * 1000
    casLatency: 18,
    ecc: false,
    rgb: true,
    price: 90.00
  },
   {
    name: "G.Skill Ripjaws V 32GB (2x16GB) DDR4-3600 CL16", // Common high performance kit
    ddrType: 'DDR4',
    speed: 3600,
    modules: 2,
    sizeGB: 32,
    pricePerGB: 2.50, // price / sizeGB
    color: "Black", // Or Red
    firstWordLatency: 8.89, // (16 / (3600 / 2)) * 1000
    casLatency: 16, // Low latency for DDR4-3600
    ecc: false,
    rgb: false,
    price: 80.00 // Estimated price
  },
  {
    name: "G.Skill Ripjaws S5 32GB (2x16GB) DDR5-5600 CL28", // Provided example
    ddrType: 'DDR5',
    speed: 5600,
    modules: 2,
    sizeGB: 32,
    pricePerGB: 3.28, // price / sizeGB
    color: "Black",
    firstWordLatency: 10.00, // (28 / (5600 / 2)) * 1000
    casLatency: 28,
    ecc: false,
    rgb: false,
    price: 105.00
  },
   {
    name: "Crucial Pro 32GB Kit (2x16GB) DDR5-5600 CL46", // Different CL from example
    ddrType: 'DDR5',
    speed: 5600,
    modules: 2,
    sizeGB: 32,
    pricePerGB: 2.44, // price / sizeGB
    color: "Black", // Crucial Pro color
    firstWordLatency: 16.43, // (46 / (5600 / 2)) * 1000
    casLatency: 46, // From Amazon listing info
    ecc: false,
    rgb: false,
    price: 77.99 // Price from Amazon listing
  },
  {
    name: "Corsair Vengeance 32GB (2x16GB) DDR5-6000 CL36", // Provided example
    ddrType: 'DDR5',
    speed: 6000,
    modules: 2,
    sizeGB: 32,
    pricePerGB: 3.44, // price / sizeGB
    color: "Black",
    firstWordLatency: 12.00, // (36 / (6000 / 2)) * 1000
    casLatency: 36,
    ecc: false,
    rgb: false,
    price: 110.00
  },
  {
    name: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6400 CL32", // Provided example
    ddrType: 'DDR5',
    speed: 6400,
    modules: 2,
    sizeGB: 32,
    pricePerGB: 4.06, // price / sizeGB
    color: "Silver",
    firstWordLatency: 10.00, // (32 / (6400 / 2)) * 1000
    casLatency: 32,
    ecc: false,
    rgb: true,
    price: 130.00
  }
]