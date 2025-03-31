export type Motherboard = {
    name: string;
    socket: string; // CPU Socket (e.g., 'LGA1700', 'AM5'), must match CPU's microarchitecture
    formFactor: string; // e.g., 'ATX', 'MicroATX', 'ITX'
    memoryMax: number; // Maximum supported RAM in GB
    memorySlots: number; // Number of RAM slots (usually 2 or 4)
    color: string; // Primary color scheme
    price: number; // Price in your currency or USD
  };
  
  export const motherboards: Motherboard[] = [
    {
      name: "MSI PRO Z790-P WIFI",
      socket: "LGA1700",
      formFactor: "ATX",
      memoryMax: 192, // Max RAM supported by chipset/board
      memorySlots: 4,
      color: "Black",
      price: 220
    },
    {
      name: "Gigabyte B650 AORUS ELITE AX",
      socket: "AM5",
      formFactor: "ATX",
      memoryMax: 128, // Check specific model, often 128GB for DDR5
      memorySlots: 4,
      color: "Black",
      price: 210
    },
    {
      name: "ASRock Z790 Steel Legend WiFi",
      socket: "LGA1700",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      color: "White/Silver",
      price: 280
    },
    {
      name: "ASUS ROG STRIX B650E-F GAMING WIFI",
      socket: "AM5",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      color: "Black",
      price: 290
    },
    {
      name: "MSI MAG B760 TOMAHAWK WIFI DDR4", // Example DDR4 board for LGA1700
      socket: "LGA1700",
      formFactor: "ATX",
      memoryMax: 128, // Max RAM for DDR4 boards on this chipset
      memorySlots: 4,
      color: "Black",
      price: 170
    },
     {
      name: "Gigabyte A620M S2H", // Example MicroATX AM5 board
      socket: "AM5",
      formFactor: "MicroATX",
      memoryMax: 96, // Check specific model, might be lower for A620
      memorySlots: 2, // Often only 2 slots on budget boards
      color: "Black",
      price: 85
    }
  ];