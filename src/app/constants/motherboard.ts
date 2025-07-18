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
  supportsXMP?: boolean;
  supportsEXPO?: boolean;
};

// Array of motherboards with 'brand' prepended to 'name' and XMP/EXPO support added
export const motherboards: Motherboard[] = [
  // LGA 1151 (6th/7th/8th/9th Gen) - Primarily XMP support
  {
    name: "ASUS H110M-K",
    brand: "ASUS",
    socket: "LGA1151",
    chipset: "H110",
    formFactor: "Micro-ATX",
    memoryMax: 64, // Max supported might depend on CPU generation for this socket
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 46,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "GIGABYTE B250M-D3H",
    brand: "GIGABYTE",
    socket: "LGA1151",
    chipset: "B250",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 45,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "GIGABYTE H310M M.2 2.0",
    brand: "GIGABYTE",
    socket: "LGA1151", // Supports 8th/9th gen
    chipset: "H310",
    formFactor: "Micro-ATX",
    memoryMax: 32, // Corrected based on typical H310 spec
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 63,
    supportsXMP: true,
    supportsEXPO: false
  },
  // LGA 1200 (10th/11th Gen) - Primarily XMP support; B560/Z590 allow RAM OC
  {
    name: "ASUS PRIME H410M-E",
    brand: "ASUS",
    socket: "LGA1200",
    chipset: "H410",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 110,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "GIGABYTE B460M DS3H V2",
    brand: "GIGABYTE",
    socket: "LGA1200",
    chipset: "B460",
    formFactor: "Micro-ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 124,
    supportsXMP: true, // Supports reading XMP but B460 typically locks RAM speed
    supportsEXPO: false
  },
  {
    name: "MSI Z490-A PRO",
    brand: "MSI",
    socket: "LGA1200",
    chipset: "Z490",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 199,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASUS PRIME H510M-E",
    brand: "ASUS",
    socket: "LGA1200",
    chipset: "H510",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 86,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "Gigabyte H510M H V2",
    brand: "Gigabyte",
    socket: "LGA1200",
    chipset: "H510",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 80,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI H510M-A PRO",
    brand: "MSI",
    socket: "LGA1200",
    chipset: "H510",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 90,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASUS TUF Gaming B560M-PLUS WiFi",
    brand: "ASUS",
    socket: "LGA1200",
    chipset: "B560",
    formFactor: "Micro-ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 202,
    supportsXMP: true, // B560 allows RAM OC
    supportsEXPO: false
  },
  {
    name: "MSI B560M PRO-E",
    brand: "MSI",
    socket: "LGA1200",
    chipset: "B560",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 180,
    supportsXMP: true, // B560 allows RAM OC
    supportsEXPO: false
  },
  {
    name: "GIGABYTE Z590 AORUS ELITE",
    brand: "GIGABYTE",
    socket: "LGA1200",
    chipset: "Z590",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 329,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI MPG Z590 GAMING EDGE WIFI",
    brand: "MSI",
    socket: "LGA1200",
    chipset: "Z590",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 214,
    supportsXMP: true,
    supportsEXPO: false
  },
  // LGA 1700 (12th/13th/14th Gen) - Primarily XMP support; B660/B760/Z690/Z790 allow RAM OC
  {
    name: "MSI PRO H610M-G WIFI DDR4",
    brand: "MSI",
    socket: "LGA1700",
    chipset: "H610",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 80,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "GIGABYTE B660 DS3H AC DDR4",
    brand: "GIGABYTE",
    socket: "LGA1700",
    chipset: "B660",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 90,
    supportsXMP: true, // B660 allows RAM OC
    supportsEXPO: false
  },
  {
    name: "MSI MAG B660M MORTAR WIFI DDR4",
    brand: "MSI",
    socket: "LGA1700",
    chipset: "B660",
    formFactor: "Micro-ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black/Silver",
    price: 125,
    supportsXMP: true, // B660 allows RAM OC
    supportsEXPO: false
  },
  {
    name: "MSI PRO Z690-A WIFI DDR4",
    brand: "MSI",
    socket: "LGA1700",
    chipset: "Z690",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 95,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASUS Prime Z690-P D4",
    brand: "ASUS",
    socket: "LGA1700",
    chipset: "Z690",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black/Silver",
    price: 150,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI PRO B760M-A WIFI DDR4",
    brand: "MSI",
    socket: "LGA1700",
    chipset: "B760",
    formFactor: "Micro-ATX",
    memoryMax: 128, // DDR4 version typically 128GB max
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 170,
    supportsXMP: true, // B760 allows RAM OC
    supportsEXPO: false
  },
  {
    name: "MSI MAG B760 TOMAHAWK WIFI DDR4",
    brand: "MSI",
    socket: "LGA1700",
    chipset: "B760",
    formFactor: "ATX",
    memoryMax: 128, // DDR4 version typically 128GB max
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 190,
    supportsXMP: true, // B760 allows RAM OC
    supportsEXPO: false
  },
  {
    name: "GIGABYTE Z790 AORUS ELITE AX",
    brand: "GIGABYTE",
    socket: "LGA1700",
    chipset: "Z790",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 200,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASUS PRIME Z790-A WIFI",
    brand: "ASUS",
    socket: "LGA1700",
    chipset: "Z790",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "White/Silver",
    price: 230,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI MPG Z790 EDGE WIFI",
    brand: "MSI",
    socket: "LGA1700",
    chipset: "Z790",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Silver/White",
    price: 295,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASUS ROG STRIX Z790-E GAMING WIFI",
    brand: "ASUS",
    socket: "LGA1700",
    chipset: "Z790",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 300,
    supportsXMP: true,
    supportsEXPO: false
  },
  // LGA 1851 (Intel Core Ultra Series 2 - Arrow Lake) - Primarily XMP support
  {
    name: "GIGABYTE B860M AORUS ELITE",
    brand: "GIGABYTE",
    socket: "LGA1851",
    chipset: "B860",
    formFactor: "Micro-ATX",
    memoryMax: 256,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black/Silver",
    price: 197,
    supportsXMP: true, // Expected
    supportsEXPO: false
  },
  {
    name: "MSI PRO B860M-A WIFI",
    brand: "MSI",
    socket: "LGA1851",
    chipset: "B860",
    formFactor: "Micro-ATX",
    memoryMax: 256,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 211,
    supportsXMP: true, // Expected
    supportsEXPO: false
  },
  {
    name: "ASUS ROG STRIX B860-I GAMING WIFI",
    brand: "ASUS",
    socket: "LGA1851",
    chipset: "B860",
    formFactor: "Mini-ITX",
    memoryMax: 128, // Smaller form factor, might have lower max? Assuming 128 for 2 slots
    memorySlots: 2,
    ramType: 'DDR5',
    color: "Black",
    price: 322,
    supportsXMP: true, // Expected
    supportsEXPO: false
  },
  {
    name: "MSI MPG Z890 CARBON WIFI",
    brand: "MSI",
    socket: "LGA1851",
    chipset: "Z890",
    formFactor: "ATX",
    memoryMax: 256,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 615,
    supportsXMP: true, // Expected
    supportsEXPO: false
  },
  {
    name: "ASUS ROG MAXIMUS Z890 HERO",
    brand: "ASUS",
    socket: "LGA1851",
    chipset: "Z890",
    formFactor: "ATX",
    memoryMax: 256,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 981,
    supportsXMP: true, // Expected
    supportsEXPO: false
  },
  // AM4 Socket - Primarily XMP support (EXPO not applicable)
  {
    name: "MSI A520M-A PRO",
    brand: "MSI",
    socket: "AM4",
    chipset: "A520",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 52,
    supportsXMP: true, // Generally supports reading profiles
    supportsEXPO: false
  },
  {
    name: "ASUS Prime A520M-K",
    brand: "ASUS",
    socket: "AM4",
    chipset: "A520",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 52,
    supportsXMP: true, // Generally supports reading profiles
    supportsEXPO: false
  },
  {
    name: "ASRock B450M/AC R2.0",
    brand: "ASRock",
    socket: "AM4",
    chipset: "B450",
    formFactor: "Micro-ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 75,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASRock B450M-HDV R4.0",
    brand: "ASRock",
    socket: "AM4",
    chipset: "B450",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 53,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASRock B450 Steel Legend",
    brand: "ASRock",
    socket: "AM4",
    chipset: "B450",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black/White Camo",
    price: 106,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASUS Prime B450M-K II",
    brand: "ASUS",
    socket: "AM4",
    chipset: "B450",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 57,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "GIGABYTE B450M DS3H V3",
    brand: "GIGABYTE",
    socket: "AM4",
    chipset: "B450",
    formFactor: "Micro-ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 81,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "Gigabyte B450M K",
    brand: "Gigabyte",
    socket: "AM4",
    chipset: "B450",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 57,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI B450M-A PRO MAX II",
    brand: "MSI",
    socket: "AM4",
    chipset: "B450",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 59,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASRock B550 Phantom Gaming 4/ac",
    brand: "ASRock",
    socket: "AM4",
    chipset: "B550",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black/Silver",
    price: 90,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASUS Prime B550-PLUS AC-HES",
    brand: "ASUS",
    socket: "AM4",
    chipset: "B550",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 95,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASUS ROG Strix B550-F Gaming WiFi II",
    brand: "ASUS",
    socket: "AM4",
    chipset: "B550",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 149,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "GIGABYTE B550 AORUS ELITE AX V2",
    brand: "GIGABYTE",
    socket: "AM4",
    chipset: "B550",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 130,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "GIGABYTE B550M Aorus Elite AX",
    brand: "GIGABYTE",
    socket: "AM4",
    chipset: "B550",
    formFactor: "Micro-ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 134,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "GIGABYTE B550M DS3H",
    brand: "GIGABYTE",
    socket: "AM4",
    chipset: "B550",
    formFactor: "Micro-ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 92,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "GIGABYTE B550M K",
    brand: "GIGABYTE",
    socket: "AM4",
    chipset: "B550",
    formFactor: "Micro-ATX",
    memoryMax: 64,
    memorySlots: 2,
    ramType: 'DDR4',
    color: "Black",
    price: 95,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI MAG B550 TOMAHAWK",
    brand: "MSI",
    socket: "AM4",
    chipset: "B550",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 140,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI MPG B550 GAMING PLUS",
    brand: "MSI",
    socket: "AM4",
    chipset: "B550",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 169,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI PRO B550M PRO-VDH WIFI",
    brand: "MSI",
    socket: "AM4",
    chipset: "B550",
    formFactor: "Micro-ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 110,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI PRO B550M-VC WIFI",
    brand: "MSI",
    socket: "AM4",
    chipset: "B550",
    formFactor: "Micro-ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 120,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "MSI MPG X570 GAMING PLUS",
    brand: "MSI",
    socket: "AM4",
    chipset: "X570",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black/Red",
    price: 284,
    supportsXMP: true,
    supportsEXPO: false
  },
  {
    name: "ASUS ROG Strix X570-E Gaming",
    brand: "ASUS",
    socket: "AM4",
    chipset: "X570",
    formFactor: "ATX",
    memoryMax: 128,
    memorySlots: 4,
    ramType: 'DDR4',
    color: "Black",
    price: 350,
    supportsXMP: true,
    supportsEXPO: false
  },
  // AM5 Socket - Supports BOTH EXPO and XMP
  {
    name: "ASRock A620M-HDV/M.2+",
    brand: "ASRock",
    socket: "AM5",
    chipset: "A620",
    formFactor: "Micro-ATX",
    memoryMax: 96, // Max for 2-slot A620 often 96GB
    memorySlots: 2,
    ramType: 'DDR5',
    color: "Black",
    price: 75,
    supportsXMP: true,
    supportsEXPO: true
  },
  {
    name: "ASUS PRIME B650M-A AX",
    brand: "ASUS",
    socket: "AM5",
    chipset: "B650",
    formFactor: "Micro-ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black/Silver",
    price: 160,
    supportsXMP: true,
    supportsEXPO: true
  },
  {
    name: "ASUS PRIME B650-PLUS WIFI",
    brand: "ASUS",
    socket: "AM5",
    chipset: "B650",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 180,
    supportsXMP: true,
    supportsEXPO: true
  },
  {
    name: "ASUS TUF GAMING B650-PLUS WIFI",
    brand: "ASUS",
    socket: "AM5",
    chipset: "B650",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 170,
    supportsXMP: true,
    supportsEXPO: true
  },
  {
    name: "GIGABYTE B650 GAMING X AX",
    brand: "GIGABYTE",
    socket: "AM5",
    chipset: "B650",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 160,
    supportsXMP: true,
    supportsEXPO: true
  },
  {
    name: "MSI B650 GAMING PLUS WIFI",
    brand: "MSI",
    socket: "AM5",
    chipset: "B650",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 170,
    supportsXMP: true,
    supportsEXPO: true
  },
  {
    name: "ASRock B650E PG Riptide WiFi",
    brand: "ASRock",
    socket: "AM5",
    chipset: "B650E",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 190,
    supportsXMP: true,
    supportsEXPO: true
  },
  {
    name: "GIGABYTE X670 GAMING X AX V2",
    brand: "GIGABYTE",
    socket: "AM5",
    chipset: "X670",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 220,
    supportsXMP: true,
    supportsEXPO: true
  },
  {
    name: "ASUS ROG STRIX X670E-F GAMING WIFI",
    brand: "ASUS",
    socket: "AM5",
    chipset: "X670E",
    formFactor: "ATX",
    memoryMax: 192,
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 380,
    supportsXMP: true,
    supportsEXPO: true
  },
  {
    name: "ASUS ROG STRIX X870-A GAMING WIFI", // Upcoming AM5 chipset
    brand: "ASUS",
    socket: "AM5",
    chipset: "X870",
    formFactor: "ATX",
    memoryMax: 256, // Updated spec expectation for new chipsets
    memorySlots: 4,
    ramType: 'DDR5',
    color: "White/Silver",
    price: 300,
    supportsXMP: true, // Expected
    supportsEXPO: true  // Expected
  },
  {
    name: "GIGABYTE X870E AORUS ELITE WIFI7", // Upcoming AM5 chipset
    brand: "GIGABYTE",
    socket: "AM5",
    chipset: "X870E",
    formFactor: "ATX",
    memoryMax: 256, // Updated spec expectation for new chipsets
    memorySlots: 4,
    ramType: 'DDR5',
    color: "Black",
    price: 310,
    supportsXMP: true, // Expected
    supportsEXPO: true  // Expected
  }
];