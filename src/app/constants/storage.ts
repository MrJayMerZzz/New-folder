export type StorageDevice = {
  name: string;
  brand: string; // Added: Manufacturer (e.g., Samsung, WD)
  capacity: number; // Capacity in GB
  pricePerGB: number; // Calculated Price per GB
  type: 'SSD' | 'HDD' | 'NVMe SSD'; // Type of storage
  cache: string; // Cache size (e.g., "1GB DRAM", "N/A", "128MB")
  formFactor: string; // e.g., '2.5"', 'M.2-2280', '3.5"'
  interface: string; // e.g., 'SATA III', 'PCIe 4.0 x4', 'PCIe 3.0 x4'
  rpm: number | null; // Added: RPM for HDDs, null for SSDs
  sequentialReadSpeed: number | null; // Added: Speed in MB/s, null if N/A
  sequentialWriteSpeed: number | null; // Added: Speed in MB/s, null if N/A
  price: number; // Price in your currency or USD
};

// Define the input type for the helper, excluding calculated field
type StorageInput = Omit<StorageDevice, 'pricePerGB'>;

// Helper function to calculate Price/GB
const calculateStorageMetrics = (drive: StorageInput): StorageDevice => {
  // Handle potential division by zero or invalid capacity
  const pricePerGB = (drive.capacity > 0 && drive.price > 0)
      ? drive.price / drive.capacity
      : 0; // Assign 0 or handle as appropriate if capacity/price is invalid
  return {
      ...drive,
      pricePerGB: parseFloat(pricePerGB.toFixed(3)), // Round to 3 decimal places
  };
};

export const storages: StorageDevice[] = [
  // --- Your Original Entries ---
  calculateStorageMetrics({
      name: "Samsung 980 Pro 1TB",
      brand: "Samsung",
      capacity: 1000,
      type: 'NVMe SSD',
      cache: "1GB LPDDR4",
      formFactor: 'M.2-2280',
      interface: 'PCIe 4.0 x4',
      rpm: null,
      sequentialReadSpeed: 7000,
      sequentialWriteSpeed: 5000,
      price: 90 // Example price
  }),
  calculateStorageMetrics({
      name: "Crucial MX500 1TB",
      brand: "Crucial",
      capacity: 1000,
      type: 'SSD',
      cache: "1GB DDR3",
      formFactor: '2.5"',
      interface: 'SATA III',
      rpm: null,
      sequentialReadSpeed: 560,
      sequentialWriteSpeed: 510,
      price: 65 // Example price
  }),
  calculateStorageMetrics({
      name: "Western Digital Blue 4TB",
      brand: "Western Digital",
      capacity: 4000,
      type: 'HDD',
      cache: "256MB",
      formFactor: '3.5"',
      interface: 'SATA III',
      rpm: 5400,
      sequentialReadSpeed: 180,
      sequentialWriteSpeed: 180,
      price: 75 // Example price
  }),
  calculateStorageMetrics({
      name: "Kingston NV2 2TB",
      brand: "Kingston",
      capacity: 2000,
      type: 'NVMe SSD',
      cache: "N/A", // DRAM-less often marked N/A or HMB
      formFactor: 'M.2-2280',
      interface: 'PCIe 4.0 x4',
      rpm: null,
      sequentialReadSpeed: 3500,
      sequentialWriteSpeed: 2800,
      price: 100 // Example price
  }),
   calculateStorageMetrics({
      name: "Seagate Barracuda Compute 2TB",
      brand: "Seagate",
      capacity: 2000,
      type: 'HDD',
      cache: "256MB",
      formFactor: '3.5"',
      interface: 'SATA III',
      rpm: 7200,
      sequentialReadSpeed: 220,
      sequentialWriteSpeed: 220,
      price: 55 // Example price
  }),
   calculateStorageMetrics({
      name: "Crucial T700 2TB",
      brand: "Crucial",
      capacity: 2000,
      type: 'NVMe SSD',
      cache: "2GB LPDDR4",
      formFactor: 'M.2-2280',
      interface: 'PCIe 5.0 x4',
      rpm: null,
      sequentialReadSpeed: 12400,
      sequentialWriteSpeed: 11800,
      price: 260 // Example price
  }),

  // --- 100 Additional Realistic Entries ---
  calculateStorageMetrics({ name: "Samsung 990 Pro 2TB", brand: "Samsung", capacity: 2000, type: 'NVMe SSD', cache: "2GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7450, sequentialWriteSpeed: 6900, price: 160 }),
  calculateStorageMetrics({ name: "WD Black SN850X 1TB", brand: "Western Digital", capacity: 1000, type: 'NVMe SSD', cache: "1GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7300, sequentialWriteSpeed: 6300, price: 95 }),
  calculateStorageMetrics({ name: "Seagate FireCuda 530 1TB", brand: "Seagate", capacity: 1000, type: 'NVMe SSD', cache: "1GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7300, sequentialWriteSpeed: 6000, price: 105 }),
  calculateStorageMetrics({ name: "Crucial P5 Plus 1TB", brand: "Crucial", capacity: 1000, type: 'NVMe SSD', cache: "1GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 6600, sequentialWriteSpeed: 5000, price: 70 }),
  calculateStorageMetrics({ name: "SK Hynix Platinum P41 1TB", brand: "SK Hynix", capacity: 1000, type: 'NVMe SSD', cache: "1GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7000, sequentialWriteSpeed: 6500, price: 100 }),
  calculateStorageMetrics({ name: "Samsung 870 EVO 500GB", brand: "Samsung", capacity: 500, type: 'SSD', cache: "512MB LPDDR4", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 530, price: 45 }),
  calculateStorageMetrics({ name: "WD Blue SA510 1TB", brand: "Western Digital", capacity: 1000, type: 'SSD', cache: "1GB DDR3", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 510, price: 60 }),
  calculateStorageMetrics({ name: "Kingston KC3000 1TB", brand: "Kingston", capacity: 1024, type: 'NVMe SSD', cache: "1GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7000, sequentialWriteSpeed: 6000, price: 90 }),
  calculateStorageMetrics({ name: "Sabrent Rocket 4 Plus 2TB", brand: "Sabrent", capacity: 2000, type: 'NVMe SSD', cache: "2GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7100, sequentialWriteSpeed: 6600, price: 150 }),
  calculateStorageMetrics({ name: "Seagate IronWolf Pro 8TB", brand: "Seagate", capacity: 8000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 240, sequentialWriteSpeed: 240, price: 220 }),
  calculateStorageMetrics({ name: "WD Red Pro 10TB", brand: "Western Digital", capacity: 10000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 265, sequentialWriteSpeed: 265, price: 280 }),
  calculateStorageMetrics({ name: "Crucial P3 1TB", brand: "Crucial", capacity: 1000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3000, price: 50 }),
  calculateStorageMetrics({ name: "Samsung 970 EVO Plus 500GB", brand: "Samsung", capacity: 500, type: 'NVMe SSD', cache: "512MB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3200, price: 55 }),
  calculateStorageMetrics({ name: "TeamGroup MP33 1TB", brand: "TeamGroup", capacity: 1000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 1800, sequentialWriteSpeed: 1500, price: 48 }),
  calculateStorageMetrics({ name: "Adata XPG SX8200 Pro 1TB", brand: "Adata", capacity: 1000, type: 'NVMe SSD', cache: "1GB DDR3L", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3000, price: 75 }),
  calculateStorageMetrics({ name: "Toshiba X300 6TB", brand: "Toshiba", capacity: 6000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 210, sequentialWriteSpeed: 210, price: 130 }),
  calculateStorageMetrics({ name: "WD Black SN770 500GB", brand: "Western Digital", capacity: 500, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 5000, sequentialWriteSpeed: 4000, price: 50 }),
  calculateStorageMetrics({ name: "Crucial BX500 480GB", brand: "Crucial", capacity: 480, type: 'SSD', cache: "N/A", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 540, sequentialWriteSpeed: 500, price: 35 }),
  calculateStorageMetrics({ name: "Kingston A400 240GB", brand: "Kingston", capacity: 240, type: 'SSD', cache: "N/A", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 500, sequentialWriteSpeed: 350, price: 25 }),
  calculateStorageMetrics({ name: "Seagate BarraCuda 1TB", brand: "Seagate", capacity: 1000, type: 'HDD', cache: "64MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 210, sequentialWriteSpeed: 210, price: 45 }), // Re-add 1TB Barracuda
  calculateStorageMetrics({ name: "Samsung 980 500GB", brand: "Samsung", capacity: 500, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3100, sequentialWriteSpeed: 2600, price: 40 }),
  calculateStorageMetrics({ name: "WD Blue SN570 1TB", brand: "Western Digital", capacity: 1000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3000, price: 60 }),
  calculateStorageMetrics({ name: "SK Hynix Gold P31 1TB", brand: "SK Hynix", capacity: 1000, type: 'NVMe SSD', cache: "1GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3200, price: 85 }),
  calculateStorageMetrics({ name: "Crucial T500 1TB", brand: "Crucial", capacity: 1000, type: 'NVMe SSD', cache: "1GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7300, sequentialWriteSpeed: 6800, price: 80 }),
  calculateStorageMetrics({ name: "WD Black AN1500 2TB", brand: "Western Digital", capacity: 2000, type: 'NVMe SSD', cache: "N/A", formFactor: 'AIC (Add-In Card)', interface: 'PCIe 3.0 x8', rpm: null, sequentialReadSpeed: 6500, sequentialWriteSpeed: 4100, price: 250 }), // RAID AIC Example
  calculateStorageMetrics({ name: "Seagate Exos X18 18TB", brand: "Seagate", capacity: 18000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 270, sequentialWriteSpeed: 270, price: 350 }), // Enterprise HDD
  calculateStorageMetrics({ name: "WD Gold 14TB", brand: "Western Digital", capacity: 14000, type: 'HDD', cache: "512MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 267, sequentialWriteSpeed: 267, price: 320 }), // Enterprise HDD
  calculateStorageMetrics({ name: "Samsung 870 QVO 2TB", brand: "Samsung", capacity: 2000, type: 'SSD', cache: "2GB LPDDR4", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 530, price: 110 }), // QLC SATA
  calculateStorageMetrics({ name: "Intel 670p 1TB", brand: "Intel", capacity: 1024, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 2500, price: 70 }), // QLC NVMe
  calculateStorageMetrics({ name: "Patriot P300 512GB", brand: "Patriot", capacity: 512, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 1700, sequentialWriteSpeed: 1100, price: 38 }),
  calculateStorageMetrics({ name: "Silicon Power A60 1TB", brand: "Silicon Power", capacity: 1000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 2200, sequentialWriteSpeed: 1600, price: 52 }),
  calculateStorageMetrics({ name: "WD Red Plus 6TB", brand: "Western Digital", capacity: 6000, type: 'HDD', cache: "128MB", formFactor: '3.5"', interface: 'SATA III', rpm: 5400, sequentialReadSpeed: 185, sequentialWriteSpeed: 185, price: 140 }), // NAS HDD
  calculateStorageMetrics({ name: "Seagate IronWolf 4TB", brand: "Seagate", capacity: 4000, type: 'HDD', cache: "64MB", formFactor: '3.5"', interface: 'SATA III', rpm: 5900, sequentialReadSpeed: 180, sequentialWriteSpeed: 180, price: 95 }), // NAS HDD
  calculateStorageMetrics({ name: "Samsung 970 Pro 1TB", brand: "Samsung", capacity: 1024, type: 'NVMe SSD', cache: "1GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 2700, price: 150 }), // Older Pro Model MLC
  calculateStorageMetrics({ name: "Corsair MP600 Pro LPX 1TB", brand: "Corsair", capacity: 1000, type: 'NVMe SSD', cache: "1GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7100, sequentialWriteSpeed: 5800, price: 90 }), // PS5 Compatible
  calculateStorageMetrics({ name: "Adata Legend 840 1TB", brand: "Adata", capacity: 1000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 5000, sequentialWriteSpeed: 4500, price: 65 }),
  calculateStorageMetrics({ name: "Gigabyte AORUS Gen4 7000s 1TB", brand: "Gigabyte", capacity: 1000, type: 'NVMe SSD', cache: "1GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7000, sequentialWriteSpeed: 5500, price: 110 }),
  calculateStorageMetrics({ name: "WD Purple 4TB", brand: "Western Digital", capacity: 4000, type: 'HDD', cache: "64MB", formFactor: '3.5"', interface: 'SATA III', rpm: 5400, sequentialReadSpeed: 150, sequentialWriteSpeed: 150, price: 90 }), // Surveillance HDD
  calculateStorageMetrics({ name: "Seagate SkyHawk 8TB", brand: "Seagate", capacity: 8000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 210, sequentialWriteSpeed: 210, price: 190 }), // Surveillance HDD
  calculateStorageMetrics({ name: "Crucial P3 Plus 2TB", brand: "Crucial", capacity: 2000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 5000, sequentialWriteSpeed: 4200, price: 115 }),
  calculateStorageMetrics({ name: "SanDisk Ultra 3D 1TB", brand: "SanDisk", capacity: 1000, type: 'SSD', cache: "1GB DDR3L", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 530, price: 68 }),
  calculateStorageMetrics({ name: "TeamGroup Cardea Zero Z440 1TB", brand: "TeamGroup", capacity: 1000, type: 'NVMe SSD', cache: "1GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 5000, sequentialWriteSpeed: 4400, price: 85 }),
  calculateStorageMetrics({ name: "PNY CS900 500GB", brand: "PNY", capacity: 500, type: 'SSD', cache: "N/A", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 550, sequentialWriteSpeed: 500, price: 40 }),
  calculateStorageMetrics({ name: "HP EX950 1TB", brand: "HP", capacity: 1024, type: 'NVMe SSD', cache: "1GB DDR3L", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 2900, price: 90 }),
  calculateStorageMetrics({ name: "Toshiba N300 8TB", brand: "Toshiba", capacity: 8000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 240, sequentialWriteSpeed: 240, price: 180 }), // NAS HDD
  calculateStorageMetrics({ name: "Lexar NM620 1TB", brand: "Lexar", capacity: 1000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3300, sequentialWriteSpeed: 3000, price: 60 }),
  calculateStorageMetrics({ name: "Samsung PM9A1 1TB", brand: "Samsung", capacity: 1024, type: 'NVMe SSD', cache: "1GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7000, sequentialWriteSpeed: 5100, price: 85 }), // OEM version of 980 Pro
  calculateStorageMetrics({ name: "WD Blue 1TB", brand: "Western Digital", capacity: 1000, type: 'HDD', cache: "64MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 150, sequentialWriteSpeed: 150, price: 48 }),
  calculateStorageMetrics({ name: "Kingston Fury Renegade 1TB", brand: "Kingston", capacity: 1000, type: 'NVMe SSD', cache: "1GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7300, sequentialWriteSpeed: 6000, price: 95 }),
  calculateStorageMetrics({ name: "Sabrent Rocket Q 4TB", brand: "Sabrent", capacity: 4000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3400, sequentialWriteSpeed: 3000, price: 300 }), // QLC NVMe
  calculateStorageMetrics({ name: "Seagate BarraCuda Q5 1TB", brand: "Seagate", capacity: 1000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 2400, sequentialWriteSpeed: 1800, price: 60 }), // QLC NVMe
  calculateStorageMetrics({ name: "Crucial MX500 500GB", brand: "Crucial", capacity: 500, type: 'SSD', cache: "512MB DDR3", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 510, price: 42 }),
  calculateStorageMetrics({ name: "Samsung T7 Shield 1TB", brand: "Samsung", capacity: 1000, type: 'SSD', cache: "N/A", formFactor: 'Portable', interface: 'USB 3.2 Gen 2', rpm: null, sequentialReadSpeed: 1050, sequentialWriteSpeed: 1000, price: 100 }), // External SSD
  calculateStorageMetrics({ name: "SanDisk Extreme Portable 2TB", brand: "SanDisk", capacity: 2000, type: 'NVMe SSD', cache: "N/A", formFactor: 'Portable', interface: 'USB 3.2 Gen 2', rpm: null, sequentialReadSpeed: 1050, sequentialWriteSpeed: 1000, price: 150 }), // External NVMe
  calculateStorageMetrics({ name: "WD My Passport 5TB", brand: "Western Digital", capacity: 5000, type: 'HDD', cache: "N/A", formFactor: 'Portable', interface: 'USB 3.0', rpm: 5400, sequentialReadSpeed: 120, sequentialWriteSpeed: 120, price: 110 }), // External HDD
  calculateStorageMetrics({ name: "LaCie Rugged Mini 2TB", brand: "LaCie", capacity: 2000, type: 'HDD', cache: "N/A", formFactor: 'Portable', interface: 'USB 3.0', rpm: 5400, sequentialReadSpeed: 130, sequentialWriteSpeed: 130, price: 90 }), // External HDD Rugged
  calculateStorageMetrics({ name: "SK Hynix Gold S31 1TB", brand: "SK Hynix", capacity: 1000, type: 'SSD', cache: "1GB DDR3L", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 525, price: 65 }),
  calculateStorageMetrics({ name: "Inland Platinum 2TB", brand: "Inland", capacity: 2000, type: 'NVMe SSD', cache: "2GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7000, sequentialWriteSpeed: 5500, price: 140 }),
  calculateStorageMetrics({ name: "Silicon Power P34A80 1TB", brand: "Silicon Power", capacity: 1024, type: 'NVMe SSD', cache: "1GB DDR3L", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3400, sequentialWriteSpeed: 3000, price: 72 }),
  calculateStorageMetrics({ name: "Seagate Expansion 16TB", brand: "Seagate", capacity: 16000, type: 'HDD', cache: "N/A", formFactor: 'Desktop External 3.5"', interface: 'USB 3.0', rpm: 7200, sequentialReadSpeed: 180, sequentialWriteSpeed: 180, price: 280 }), // External Desktop HDD
  calculateStorageMetrics({ name: "WD Elements Desktop 12TB", brand: "Western Digital", capacity: 12000, type: 'HDD', cache: "N/A", formFactor: 'Desktop External 3.5"', interface: 'USB 3.0', rpm: 5400, sequentialReadSpeed: 170, sequentialWriteSpeed: 170, price: 230 }), // External Desktop HDD
  calculateStorageMetrics({ name: "Corsair Force MP510 960GB", brand: "Corsair", capacity: 960, type: 'NVMe SSD', cache: "1GB DDR3L", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3480, sequentialWriteSpeed: 3000, price: 100 }),
  calculateStorageMetrics({ name: "Samsung 860 Pro 1TB", brand: "Samsung", capacity: 1024, type: 'SSD', cache: "1GB LPDDR4", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 530, price: 130 }), // Older SATA Pro MLC
  calculateStorageMetrics({ name: "Gigabyte AORUS NVMe Gen4 1TB", brand: "Gigabyte", capacity: 1000, type: 'NVMe SSD', cache: "1GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 5000, sequentialWriteSpeed: 4400, price: 95 }),
  calculateStorageMetrics({ name: "Mushkin Enhanced Source 2 1TB", brand: "Mushkin", capacity: 1000, type: 'SSD', cache: "N/A", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 515, price: 55 }),
  calculateStorageMetrics({ name: "HP S700 500GB", brand: "HP", capacity: 500, type: 'SSD', cache: "N/A", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 510, price: 40 }),
  calculateStorageMetrics({ name: "WD Black SN850 500GB (No Heatsink)", brand: "Western Digital", capacity: 500, type: 'NVMe SSD', cache: "512MB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7000, sequentialWriteSpeed: 4100, price: 70 }),
  calculateStorageMetrics({ name: "Seagate FireCuda 520 500GB", brand: "Seagate", capacity: 500, type: 'NVMe SSD', cache: "512MB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 5000, sequentialWriteSpeed: 2500, price: 65 }),
  calculateStorageMetrics({ name: "Kingston NV1 500GB", brand: "Kingston", capacity: 500, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 2100, sequentialWriteSpeed: 1700, price: 35 }),
  calculateStorageMetrics({ name: "Crucial P2 500GB", brand: "Crucial", capacity: 500, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 2300, sequentialWriteSpeed: 940, price: 40 }),
  calculateStorageMetrics({ name: "Samsung 990 Pro 1TB", brand: "Samsung", capacity: 1000, type: 'NVMe SSD', cache: "1GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7450, sequentialWriteSpeed: 6900, price: 95 }), // Duplicate size, check pricing
  calculateStorageMetrics({ name: "WD Black SN850X 2TB", brand: "Western Digital", capacity: 2000, type: 'NVMe SSD', cache: "2GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7300, sequentialWriteSpeed: 6600, price: 170 }),
  calculateStorageMetrics({ name: "Seagate FireCuda 530 2TB", brand: "Seagate", capacity: 2000, type: 'NVMe SSD', cache: "2GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7300, sequentialWriteSpeed: 6900, price: 180 }),
  calculateStorageMetrics({ name: "Crucial P5 Plus 2TB", brand: "Crucial", capacity: 2000, type: 'NVMe SSD', cache: "2GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 6600, sequentialWriteSpeed: 5000, price: 130 }),
  calculateStorageMetrics({ name: "SK Hynix Platinum P41 2TB", brand: "SK Hynix", capacity: 2000, type: 'NVMe SSD', cache: "2GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7000, sequentialWriteSpeed: 6500, price: 185 }),
  calculateStorageMetrics({ name: "Samsung 870 EVO 1TB", brand: "Samsung", capacity: 1000, type: 'SSD', cache: "1GB LPDDR4", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 530, price: 70 }),
  calculateStorageMetrics({ name: "WD Blue SA510 2TB", brand: "Western Digital", capacity: 2000, type: 'SSD', cache: "1GB DDR3", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 510, price: 115 }),
  calculateStorageMetrics({ name: "Kingston KC3000 2TB", brand: "Kingston", capacity: 2048, type: 'NVMe SSD', cache: "2GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7000, sequentialWriteSpeed: 7000, price: 165 }),
  calculateStorageMetrics({ name: "Sabrent Rocket 4 Plus 4TB", brand: "Sabrent", capacity: 4000, type: 'NVMe SSD', cache: "2GB DDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7100, sequentialWriteSpeed: 6600, price: 350 }),
  calculateStorageMetrics({ name: "Seagate IronWolf Pro 12TB", brand: "Seagate", capacity: 12000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 250, sequentialWriteSpeed: 250, price: 310 }),
  calculateStorageMetrics({ name: "WD Red Pro 16TB", brand: "Western Digital", capacity: 16000, type: 'HDD', cache: "512MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 265, sequentialWriteSpeed: 265, price: 400 }),
  calculateStorageMetrics({ name: "Crucial P3 2TB", brand: "Crucial", capacity: 2000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3000, price: 95 }),
  calculateStorageMetrics({ name: "Samsung 970 EVO Plus 2TB", brand: "Samsung", capacity: 2000, type: 'NVMe SSD', cache: "2GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3300, price: 140 }),
  calculateStorageMetrics({ name: "TeamGroup MP33 2TB", brand: "TeamGroup", capacity: 2000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 1800, sequentialWriteSpeed: 1500, price: 90 }),
  calculateStorageMetrics({ name: "Adata XPG SX8200 Pro 2TB", brand: "Adata", capacity: 2000, type: 'NVMe SSD', cache: "2GB DDR3L", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3000, price: 135 }),
  calculateStorageMetrics({ name: "Toshiba X300 10TB", brand: "Toshiba", capacity: 10000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 240, sequentialWriteSpeed: 240, price: 240 }),
  calculateStorageMetrics({ name: "WD Black SN770 2TB", brand: "Western Digital", capacity: 2000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 5150, sequentialWriteSpeed: 4850, price: 125 }),
  calculateStorageMetrics({ name: "Crucial BX500 1TB", brand: "Crucial", capacity: 1000, type: 'SSD', cache: "N/A", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 540, sequentialWriteSpeed: 500, price: 58 }),
  calculateStorageMetrics({ name: "Kingston A400 960GB", brand: "Kingston", capacity: 960, type: 'SSD', cache: "N/A", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 500, sequentialWriteSpeed: 450, price: 50 }),
  calculateStorageMetrics({ name: "Seagate BarraCuda 4TB", brand: "Seagate", capacity: 4000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 5400, sequentialReadSpeed: 190, sequentialWriteSpeed: 190, price: 80 }),
  calculateStorageMetrics({ name: "Samsung 980 1TB", brand: "Samsung", capacity: 1000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3000, price: 70 }),
  calculateStorageMetrics({ name: "WD Blue SN570 2TB", brand: "Western Digital", capacity: 2000, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3000, price: 110 }),
  calculateStorageMetrics({ name: "SK Hynix Gold P31 2TB", brand: "SK Hynix", capacity: 2000, type: 'NVMe SSD', cache: "2GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 3200, price: 155 }),
  calculateStorageMetrics({ name: "Crucial T500 2TB", brand: "Crucial", capacity: 2000, type: 'NVMe SSD', cache: "2GB LPDDR4", formFactor: 'M.2-2280', interface: 'PCIe 4.0 x4', rpm: null, sequentialReadSpeed: 7400, sequentialWriteSpeed: 7000, price: 145 }),
  calculateStorageMetrics({ name: "Seagate Exos X20 20TB", brand: "Seagate", capacity: 20000, type: 'HDD', cache: "256MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 285, sequentialWriteSpeed: 285, price: 400 }),
  calculateStorageMetrics({ name: "WD Gold 20TB", brand: "Western Digital", capacity: 20000, type: 'HDD', cache: "512MB", formFactor: '3.5"', interface: 'SATA III', rpm: 7200, sequentialReadSpeed: 269, sequentialWriteSpeed: 269, price: 450 }),
  calculateStorageMetrics({ name: "Samsung 870 QVO 4TB", brand: "Samsung", capacity: 4000, type: 'SSD', cache: "4GB LPDDR4", formFactor: '2.5"', interface: 'SATA III', rpm: null, sequentialReadSpeed: 560, sequentialWriteSpeed: 530, price: 200 }),
  calculateStorageMetrics({ name: "Intel 670p 2TB", brand: "Intel", capacity: 2048, type: 'NVMe SSD', cache: "N/A", formFactor: 'M.2-2280', interface: 'PCIe 3.0 x4', rpm: null, sequentialReadSpeed: 3500, sequentialWriteSpeed: 2700, price: 120 }),
];