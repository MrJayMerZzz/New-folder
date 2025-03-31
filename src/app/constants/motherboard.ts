export type Motherboard = {
  name: string;
  socket: string; // CPU Socket (e.g., 'LGA1700', 'AM5', 'LGA775', 'Socket 939')
  formFactor: string; // e.g., 'ATX', 'MicroATX', 'ITX'
  memoryMax: number; // Maximum supported RAM in GB
  memorySlots: number; // Number of RAM slots
  // Updated ramType to include all historical DDR generations
  ramType: 'DDR' | 'DDR2' | 'DDR3' | 'DDR4' | 'DDR5';
  color: string; // Primary color scheme
  price: number; // Price in your currency or USD
};

// --- Sample Data ---
// NOTE: The sample motherboards below ONLY support DDR4 or DDR5, as they
//       are for modern sockets (LGA1700, AM5). To add DDR, DDR2, or DDR3
//       motherboards, you would also need compatible older CPU data.
export const motherboards: Motherboard[] = [
  {
    name: "MSI PRO Z790-P WIFI",
    socket: "LGA1700",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5', // Z790 boards are typically DDR5
    color: "Black",
    price: 220
  },
  {
    name: "Gigabyte B650 AORUS ELITE AX",
    socket: "AM5", // AM5 is exclusively DDR5
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 210
  },
  {
    name: "ASRock Z790 Steel Legend WiFi",
    socket: "LGA1700",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5', // Z790
    color: "White/Silver",
    price: 280
  },
  {
    name: "ASUS ROG STRIX B650E-F GAMING WIFI",
    socket: "AM5", // AM5 is exclusively DDR5
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 290
  },
  {
    name: "MSI MAG B760 TOMAHAWK WIFI DDR4", // Explicitly a DDR4 board
    socket: "LGA1700",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4', // Supports DDR4 RAM
    color: "Black",
    price: 170
  },
   {
    name: "Gigabyte A620M S2H",
    socket: "AM5", // AM5 is exclusively DDR5
    formFactor: "MicroATX",
    memoryMax: 96,
    memorySlots: 2,
    ramType: 'DDR5',
    color: "Black",
    price: 85
  },
  {
    name: "ASUS PRIME B660M-A WIFI D4", // Another common DDR4 example for LGA1700
    socket: "LGA1700",
    formFactor: "MicroATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 130
  }
  // { // Example Structure for an older DDR3 board (Requires compatible CPU data)
  //   name: "ASUS P8Z77-V LK",
  //   socket: "LGA1155",
  //   formFactor: "ATX",
  //   memoryMax: 32,
  //   memorySlots: 4,
  //   ramType: 'DDR3',
  //   color: "Blue/Black",
  //   price: 100 // Fictional current price
  // },
];