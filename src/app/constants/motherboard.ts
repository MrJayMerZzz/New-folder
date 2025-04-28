// constants/motherboard.ts

// Define the Motherboard type (ensure all properties used are included)
export type Motherboard = {
  name: string; // Name will now include the brand
  brand: string;
  socket: string;
  chipset: string;
  formFactor: string;
  memoryMax: number;
  memorySlots: number;
  ramType: 'DDR' | 'DDR2' | 'DDR3' | 'DDR4' | 'DDR5';
  color: string;
  price: number | null;
  // Add any other relevant properties
};

// Array of motherboards with 'brand' prepended to 'name'
export const motherboards: Motherboard[] = [
    {
      name: "ASUS H110M-K", // Brand added to name
      brand: "ASUS",
      socket: "LGA1151",
      chipset: "H110",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 46
    },
    {
      name: "GIGABYTE B250M-D3H", // Brand added to name
      brand: "GIGABYTE",
      socket: "LGA1151",
      chipset: "B250",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 45
    },
    {
      name: "GIGABYTE H310M M.2 2.0", // Brand added to name
      brand: "GIGABYTE",
      socket: "LGA1151",
      chipset: "H310",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 63
    },
    // LGA 1200 (10th/11th Gen)
    {
      name: "ASUS PRIME H410M-E", // Brand added to name
      brand: "ASUS",
      socket: "LGA1200",
      chipset: "H410",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 110
    },
    {
      name: "GIGABYTE B460M DS3H V2", // Brand added to name
      brand: "GIGABYTE",
      socket: "LGA1200",
      chipset: "B460",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 124
    },
    {
      name: "MSI Z490-A PRO", // Brand added to name
      brand: "MSI",
      socket: "LGA1200",
      chipset: "Z490",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 199
    },
    {
      name: "ASUS PRIME H510M-E", // Brand added to name
      brand: "ASUS",
      socket: "LGA1200",
      chipset: "H510",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 86
    },
    {
      name: "Gigabyte H510M H V2", // Brand added to name
      brand: "Gigabyte",
      socket: "LGA1200",
      chipset: "H510",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 80
    },
    {
      name: "MSI H510M-A PRO", // Brand added to name
      brand: "MSI",
      socket: "LGA1200",
      chipset: "H510",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 90
    },
    {
      name: "ASUS TUF Gaming B560M-PLUS WiFi", // Brand added to name
      brand: "ASUS",
      socket: "LGA1200",
      chipset: "B560",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 202
    },
    {
      name: "MSI B560M PRO-E", // Brand added to name
      brand: "MSI",
      socket: "LGA1200",
      chipset: "B560",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 180
    },
    {
      name: "GIGABYTE Z590 AORUS ELITE", // Brand added to name
      brand: "GIGABYTE",
      socket: "LGA1200",
      chipset: "Z590",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 329
    },
    {
      name: "MSI MPG Z590 GAMING EDGE WIFI", // Brand added to name
      brand: "MSI",
      socket: "LGA1200",
      chipset: "Z590",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 214
    },
    // LGA 1700 (12th/13th/14th Gen)
    {
      name: "MSI PRO H610M-G WIFI DDR4", // Brand added to name
      brand: "MSI",
      socket: "LGA1700",
      chipset: "H610",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 80
    },
    {
      name: "GIGABYTE B660 DS3H AC DDR4", // Brand added to name
      brand: "GIGABYTE",
      socket: "LGA1700",
      chipset: "B660",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 90
    },
    {
      name: "MSI MAG B660M MORTAR WIFI DDR4", // Brand added to name
      brand: "MSI",
      socket: "LGA1700",
      chipset: "B660",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black/Silver",
      price: 125
    },
    {
      name: "MSI PRO Z690-A WIFI DDR4", // Brand added to name
      brand: "MSI",
      socket: "LGA1700",
      chipset: "Z690",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 95
    },
    {
      name: "ASUS Prime Z690-P D4", // Brand added to name
      brand: "ASUS",
      socket: "LGA1700",
      chipset: "Z690",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black/Silver",
      price: 150
    },
    {
      name: "MSI PRO B760M-A WIFI DDR4", // Brand added to name
      brand: "MSI",
      socket: "LGA1700",
      chipset: "B760",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 170
    },
    {
      name: "MSI MAG B760 TOMAHAWK WIFI DDR4", // Brand added to name
      brand: "MSI",
      socket: "LGA1700",
      chipset: "B760",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 190
    },
    {
      name: "GIGABYTE Z790 AORUS ELITE AX", // Brand added to name
      brand: "GIGABYTE",
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 200
    },
    {
      name: "ASUS PRIME Z790-A WIFI", // Brand added to name
      brand: "ASUS",
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "White/Silver",
      price: 230
    },
    {
      name: "MSI MPG Z790 EDGE WIFI", // Brand added to name
      brand: "MSI",
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Silver/White",
      price: 295
    },
    {
      name: "ASUS ROG STRIX Z790-E GAMING WIFI", // Brand added to name
      brand: "ASUS",
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 300
    },
    // LGA 1851 (Intel Core Ultra Series 2 - Arrow Lake)
    {
      name: "GIGABYTE B860M AORUS ELITE", // Brand added to name
      brand: "GIGABYTE",
      socket: "LGA1851",
      chipset: "B860",
      formFactor: "Micro-ATX",
      memoryMax: 256,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black/Silver",
      price: 197
    },
    {
      name: "MSI PRO B860M-A WIFI", // Brand added to name
      brand: "MSI",
      socket: "LGA1851",
      chipset: "B860",
      formFactor: "Micro-ATX",
      memoryMax: 256,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 211
    },
    {
      name: "ASUS ROG STRIX B860-I GAMING WIFI", // Brand added to name
      brand: "ASUS",
      socket: "LGA1851",
      chipset: "B860",
      formFactor: "Mini-ITX",
      memoryMax: 128,
      memorySlots: 2,
      ramType: 'DDR5',
      color: "Black",
      price: 322
    },
     {
      name: "MSI MPG Z890 CARBON WIFI", // Brand added to name
      brand: "MSI",
      socket: "LGA1851",
      chipset: "Z890",
      formFactor: "ATX",
      memoryMax: 256,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 615
    },
    {
      name: "ASUS ROG MAXIMUS Z890 HERO", // Brand added to name
      brand: "ASUS",
      socket: "LGA1851",
      chipset: "Z890",
      formFactor: "ATX",
      memoryMax: 256,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 981
    },
     // AM4 Socket
     {
      name: "MSI A520M-A PRO", // Brand added to name
      brand: "MSI",
      socket: "AM4",
      chipset: "A520",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 52
    },
    {
      name: "ASUS Prime A520M-K", // Brand added to name
      brand: "ASUS",
      socket: "AM4",
      chipset: "A520",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 52
    },
    {
      name: "ASRock B450M/AC R2.0", // Brand added to name
      brand: "ASRock",
      socket: "AM4",
      chipset: "B450",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 75
    },
    {
      name: "ASRock B450M-HDV R4.0", // Brand added to name
      brand: "ASRock",
      socket: "AM4",
      chipset: "B450",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 53
    },
     {
      name: "ASRock B450 Steel Legend", // Brand added to name
      brand: "ASRock",
      socket: "AM4",
      chipset: "B450",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black/White Camo",
      price: 106
    },
    {
      name: "ASUS Prime B450M-K II", // Brand added to name
      brand: "ASUS",
      socket: "AM4",
      chipset: "B450",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 57
    },
    {
      name: "GIGABYTE B450M DS3H V3", // Brand added to name
      brand: "GIGABYTE",
      socket: "AM4",
      chipset: "B450",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 81
    },
    {
      name: "Gigabyte B450M K", // Brand added to name
      brand: "Gigabyte",
      socket: "AM4",
      chipset: "B450",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 57
    },
    {
      name: "MSI B450M-A PRO MAX II", // Brand added to name
      brand: "MSI",
      socket: "AM4",
      chipset: "B450",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 59
    },
    {
      name: "ASRock B550 Phantom Gaming 4/ac", // Brand added to name
      brand: "ASRock",
      socket: "AM4",
      chipset: "B550",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black/Silver",
      price: 90
    },
    {
      name: "ASUS Prime B550-PLUS AC-HES", // Brand added to name
      brand: "ASUS",
      socket: "AM4",
      chipset: "B550",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 95
    },
    {
      name: "ASUS ROG Strix B550-F Gaming WiFi II", // Brand added to name
      brand: "ASUS",
      socket: "AM4",
      chipset: "B550",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 149
    },
     {
      name: "GIGABYTE B550 AORUS ELITE AX V2", // Brand added to name
      brand: "GIGABYTE",
      socket: "AM4",
      chipset: "B550",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 130
    },
    {
      name: "GIGABYTE B550M Aorus Elite AX", // Brand added to name
      brand: "GIGABYTE",
      socket: "AM4",
      chipset: "B550",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 134
    },
     {
      name: "GIGABYTE B550M DS3H", // Brand added to name
      brand: "GIGABYTE",
      socket: "AM4",
      chipset: "B550",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 92
    },
     {
      name: "GIGABYTE B550M K", // Brand added to name
      brand: "GIGABYTE",
      socket: "AM4",
      chipset: "B550",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 95
    },
    {
      name: "MSI MAG B550 TOMAHAWK", // Brand added to name
      brand: "MSI",
      socket: "AM4",
      chipset: "B550",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 140
    },
    {
      name: "MSI MPG B550 GAMING PLUS", // Brand added to name
      brand: "MSI",
      socket: "AM4",
      chipset: "B550",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 169
    },
    {
      name: "MSI PRO B550M PRO-VDH WIFI", // Brand added to name
      brand: "MSI",
      socket: "AM4",
      chipset: "B550",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 110
    },
    {
      name: "MSI PRO B550M-VC WIFI", // Brand added to name
      brand: "MSI",
      socket: "AM4",
      chipset: "B550",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 120
    },
    {
      name: "MSI MPG X570 GAMING PLUS", // Brand added to name
      brand: "MSI",
      socket: "AM4",
      chipset: "X570",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black/Red",
      price: 284
    },
     {
      name: "ASUS ROG Strix X570-E Gaming", // Brand added to name
      brand: "ASUS",
      socket: "AM4",
      chipset: "X570",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 350
    },
     // AM5 Socket
     {
      name: "ASRock A620M-HDV/M.2+", // Brand added to name
      brand: "ASRock",
      socket: "AM5",
      chipset: "A620",
      formFactor: "Micro-ATX",
      memoryMax: 96,
      memorySlots: 2,
      ramType: 'DDR5',
      color: "Black",
      price: 75
    },
    {
      name: "ASUS PRIME B650M-A AX", // Brand added to name
      brand: "ASUS",
      socket: "AM5",
      chipset: "B650",
      formFactor: "Micro-ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black/Silver",
      price: 160
    },
    {
      name: "ASUS PRIME B650-PLUS WIFI", // Brand added to name
      brand: "ASUS",
      socket: "AM5",
      chipset: "B650",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 180
    },
    {
      name: "ASUS TUF GAMING B650-PLUS WIFI", // Brand added to name
      brand: "ASUS",
      socket: "AM5",
      chipset: "B650",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 170
    },
    {
      name: "GIGABYTE B650 GAMING X AX", // Brand added to name
      brand: "GIGABYTE",
      socket: "AM5",
      chipset: "B650",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 160
    },
    {
      name: "MSI B650 GAMING PLUS WIFI", // Brand added to name
      brand: "MSI",
      socket: "AM5",
      chipset: "B650",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 170
    },
    {
      name: "ASRock B650E PG Riptide WiFi", // Brand added to name
      brand: "ASRock",
      socket: "AM5",
      chipset: "B650E",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 190
    },
    {
      name: "GIGABYTE X670 GAMING X AX V2", // Brand added to name
      brand: "GIGABYTE",
      socket: "AM5",
      chipset: "X670",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 220
    },
    {
      name: "ASUS ROG STRIX X670E-F GAMING WIFI", // Brand added to name
      brand: "ASUS",
      socket: "AM5",
      chipset: "X670E",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 380
    },
     {
      name: "ASUS ROG STRIX X870-A GAMING WIFI", // Brand added to name
      brand: "ASUS",
      socket: "AM5",
      chipset: "X870",
      formFactor: "ATX",
      memoryMax: 256,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "White/Silver",
      price: 300
    },
    {
      name: "GIGABYTE X870E AORUS ELITE WIFI7", // Brand added to name
      brand: "GIGABYTE",
      socket: "AM5",
      chipset: "X870E",
      formFactor: "ATX",
      memoryMax: 256,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 310
    }
];

