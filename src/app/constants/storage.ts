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
    const pricePerGB = drive.price / drive.capacity;
    return {
      ...drive,
      pricePerGB: parseFloat(pricePerGB.toFixed(3)),
    };
  };
  
  export const storages: StorageDevice[] = [
    calculateStorageMetrics({
      name: "Samsung 980 Pro 1TB",
      brand: "Samsung",
      capacity: 1000,
      type: 'NVMe SSD',
      cache: "1GB LPDDR4",
      formFactor: 'M.2-2280',
      interface: 'PCIe 4.0 x4',
      rpm: null, // SSDs don't have RPM
      sequentialReadSpeed: 7000, // Approx. speed
      sequentialWriteSpeed: 5000, // Approx. speed
      price: 90
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
      sequentialReadSpeed: 560, // Approx. SATA III SSD speed
      sequentialWriteSpeed: 510, // Approx. SATA III SSD speed
      price: 65
    }),
    calculateStorageMetrics({
      name: "Western Digital Blue 4TB",
      brand: "Western Digital",
      capacity: 4000,
      type: 'HDD',
      cache: "256MB",
      formFactor: '3.5"',
      interface: 'SATA III',
      rpm: 5400, // Common WD Blue RPM
      sequentialReadSpeed: 180, // Approx. HDD speed
      sequentialWriteSpeed: 180, // Approx. HDD speed
      price: 75
    }),
    calculateStorageMetrics({
      name: "Kingston NV2 2TB",
      brand: "Kingston",
      capacity: 2000,
      type: 'NVMe SSD',
      cache: "N/A", // DRAM-less
      formFactor: 'M.2-2280',
      interface: 'PCIe 4.0 x4',
      rpm: null,
      sequentialReadSpeed: 3500, // Approx. speed for this model
      sequentialWriteSpeed: 2800, // Approx. speed for this model
      price: 100
    }),
     calculateStorageMetrics({
      name: "Seagate Barracuda Compute 2TB",
      brand: "Seagate",
      capacity: 2000,
      type: 'HDD',
      cache: "256MB",
      formFactor: '3.5"',
      interface: 'SATA III',
      rpm: 7200, // Common Barracuda RPM
      sequentialReadSpeed: 220, // Approx. 7200 RPM HDD speed
      sequentialWriteSpeed: 220, // Approx. 7200 RPM HDD speed
      price: 55
    }),
     calculateStorageMetrics({ // High-end PCIe 5.0 example
      name: "Crucial T700 2TB",
      brand: "Crucial",
      capacity: 2000,
      type: 'NVMe SSD',
      cache: "2GB LPDDR4", // Example cache
      formFactor: 'M.2-2280',
      interface: 'PCIe 5.0 x4',
      rpm: null,
      sequentialReadSpeed: 12400, // Approx. PCIe 5.0 speed
      sequentialWriteSpeed: 11800, // Approx. PCIe 5.0 speed
      price: 260 // Higher price for PCIe 5.0
    }),
  ];