export type CPU = {
    name: string;
    brand: 'Intel' | 'AMD'; // Use literal types for better control
    coreCount: number;
    performanceCoreClock: number; // Base clock speed in GHz
    performanceCoreBoostClock: number; // Max boost clock speed in GHz
    microarchitecture: string; // Socket name like 'LGA1700', 'AM5'
    tdp: number; // Thermal Design Power in Watts
    integratedGraphics: boolean; // Does it have integrated graphics?
    price: number; // Price in your currency or USD
  };
  
  export const cpus: CPU[] = [
    {
      name: "Intel Core i5-13600K",
      brand: 'Intel', // Added brand
      coreCount: 14, // 6 P-cores + 8 E-cores
      performanceCoreClock: 3.5,
      performanceCoreBoostClock: 5.1,
      microarchitecture: "LGA1700",
      tdp: 125,
      integratedGraphics: true, // Intel UHD Graphics 770
      price: 300
    },
    {
      name: "AMD Ryzen 7 7700X",
      brand: 'AMD', // Added brand
      coreCount: 8,
      performanceCoreClock: 4.5,
      performanceCoreBoostClock: 5.4,
      microarchitecture: "AM5",
      tdp: 105,
      integratedGraphics: true, // AMD Radeon Graphics (RDNA 2)
      price: 350
    },
    {
      name: "Intel Core i9-13900K",
      brand: 'Intel', // Added brand
      coreCount: 24, // 8 P-cores + 16 E-cores
      performanceCoreClock: 3.0,
      performanceCoreBoostClock: 5.8,
      microarchitecture: "LGA1700",
      tdp: 125,
      integratedGraphics: true, // Intel UHD Graphics 770
      price: 550
    },
    {
      name: "AMD Ryzen 5 7600",
      brand: 'AMD', // Added brand
      coreCount: 6,
      performanceCoreClock: 3.8,
      performanceCoreBoostClock: 5.1,
      microarchitecture: "AM5",
      tdp: 65,
      integratedGraphics: true, // AMD Radeon Graphics (RDNA 2)
      price: 230
    },
     {
      name: "Intel Core i5-13400F",
      brand: 'Intel', // Added brand
      coreCount: 10, // 6 P-cores + 4 E-cores
      performanceCoreClock: 2.5, // P-core base clock
      performanceCoreBoostClock: 4.6,
      microarchitecture: "LGA1700",
      tdp: 65,
      integratedGraphics: false, // 'F' series typically lacks integrated graphics
      price: 195
    }
  ];