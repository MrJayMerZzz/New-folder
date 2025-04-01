export type Motherboard = {
  name: string;
  socket: string; 
  chipset: string; 
  formFactor: string; 
  memoryMax: number; 
  memorySlots: number; 
  ramType: 'DDR' | 'DDR2' | 'DDR3' | 'DDR4' | 'DDR5'; 
  color: string; 
  price: number; 
};

export const motherboards: Motherboard[] = [
    {
      name: "ASUS H110M-K", // Example, specific chipset unclear from result
      socket: "LGA1151",
      chipset: "H110", // Chipset commonly associated with early LGA1151
      formFactor: "Micro-ATX", // Assumed based on "M"
      memoryMax: 64, // Typical for H110
      memorySlots: 2, // Typical for H110
      ramType: 'DDR4',
      color: "Black", // Default guess
      price: 46 // Approx IDR 690000 converted
    },
    {
      name: "GIGABYTE B250M-D3H",
      socket: "LGA1151",
      chipset: "B250",
      formFactor: "Micro-ATX", // Assumed based on "M"
      memoryMax: 64, // Typical for B250
      memorySlots: 4, // D3H often has 4
      ramType: 'DDR4',
      color: "Black", // Default guess
      price: 45 // Approx IDR 675000 converted
    },
    {
      name: "GIGABYTE H310M M.2 2.0",
      socket: "LGA1151",
      chipset: "H310", // Supports 8th/9th gen
      formFactor: "Micro-ATX", // Assumed based on "M"
      memoryMax: 64, // Typical for H310
      memorySlots: 2, // Typical for H310
      ramType: 'DDR4',
      color: "Black", // Default guess
      price: 63 // Approx IDR 950000 converted
    },
    // LGA 1200 (10th/11th Gen)
    {
      name: "ASUS PRIME H410M-E",
      socket: "LGA1200",
      chipset: "H410",
      formFactor: "Micro-ATX",
      memoryMax: 64, // Typical for H410
      memorySlots: 2, // Typical for H410
      ramType: 'DDR4',
      color: "Black",
      price: 110 // Approx based on Newegg
    },
    {
      name: "GIGABYTE B460M DS3H V2",
      socket: "LGA1200",
      chipset: "B460",
      formFactor: "Micro-ATX",
      memoryMax: 128, // B460 supports more
      memorySlots: 4, // DS3H often has 4
      ramType: 'DDR4',
      color: "Black",
      price: 124 // Approx based on Amazon/Newegg
    },
    {
      name: "MSI Z490-A PRO",
      socket: "LGA1200",
      chipset: "Z490",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 199 // Approx based on Amazon listing
    },
    {
      name: "ASUS PRIME H510M-E",
      socket: "LGA1200",
      chipset: "H510",
      formFactor: "Micro-ATX",
      memoryMax: 64, // H510 typical limit
      memorySlots: 2, // H510 typical slots
      ramType: 'DDR4',
      color: "Black",
      price: 86 // Approx from Amazon listing
    },
    {
      name: "Gigabyte H510M H V2",
      socket: "LGA1200",
      chipset: "H510",
      formFactor: "Micro-ATX", // Assumed from M
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black", // Default
      price: 80 // Approx from Amazon listing
    },
    {
      name: "MSI H510M-A PRO",
      socket: "LGA1200",
      chipset: "H510",
      formFactor: "Micro-ATX", // Assumed from M
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black", // Default
      price: 90 // Estimated based on similar boards
    },
    {
      name: "ASUS TUF Gaming B560M-PLUS WiFi",
      socket: "LGA1200",
      chipset: "B560",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 202 // Approx based on Newegg
    },
    {
      name: "MSI B560M PRO-E",
      socket: "LGA1200",
      chipset: "B560",
      formFactor: "Micro-ATX",
      memoryMax: 64, // PRO-E often 2 slots
      memorySlots: 2, // PRO-E often 2 slots
      ramType: 'DDR4',
      color: "Black",
      price: 180 // Approx from Amazon listing
    },
    {
      name: "GIGABYTE Z590 AORUS ELITE",
      socket: "LGA1200",
      chipset: "Z590",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 329 // Approx from Amazon listing
    },
    {
      name: "MSI MPG Z590 GAMING EDGE WIFI",
      socket: "LGA1200",
      chipset: "Z590",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 214 // Approx based on Newegg
    },
    // LGA 1700 (12th/13th/14th Gen)
    {
      name: "MSI PRO H610M-G WIFI DDR4", // Refurb price shown, new ~$100?
      socket: "LGA1700",
      chipset: "H610",
      formFactor: "Micro-ATX",
      memoryMax: 64,
      memorySlots: 2,
      ramType: 'DDR4',
      color: "Black",
      price: 80 // Refurb price from eBay
    },
    {
      name: "GIGABYTE B660 DS3H AC DDR4", // Refurb price shown, new ~$120?
      socket: "LGA1700",
      chipset: "B660",
      formFactor: "ATX", // DS3H is often ATX
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 90 // Refurb price from eBay
    },
    {
      name: "MSI MAG B660M MORTAR WIFI DDR4",
      socket: "LGA1700",
      chipset: "B660",
      formFactor: "Micro-ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black/Silver",
      price: 125 // New price from eBay listing
    },
    {
      name: "MSI PRO Z690-A WIFI DDR4", // Refurb price shown, new ~$180-200?
      socket: "LGA1700",
      chipset: "Z690",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 95 // Refurb price from eBay
    },
    {
      name: "ASUS Prime Z690-P D4", // Example, price varies
      socket: "LGA1700",
      chipset: "Z690",
      formFactor: "ATX",
      memoryMax: 128,
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black/Silver",
      price: 150 // Estimated price
    },
    {
      name: "MSI PRO B760M-A WIFI DDR4",
      socket: "LGA1700",
      chipset: "B760",
      formFactor: "Micro-ATX",
      memoryMax: 128, // B760 boards typically support 128/192GB
      memorySlots: 4, // Often 4 slots
      ramType: 'DDR4',
      color: "Black",
      price: 170 // Best Buy price
    },
    {
      name: "MSI MAG B760 TOMAHAWK WIFI DDR4",
      socket: "LGA1700",
      chipset: "B760",
      formFactor: "ATX",
      memoryMax: 128, // Or 192GB
      memorySlots: 4,
      ramType: 'DDR4',
      color: "Black",
      price: 190 // Estimated from Best Buy listings
    },
    {
      name: "GIGABYTE Z790 AORUS ELITE AX",
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryMax: 192, // Z790 supports higher density RAM
      memorySlots: 4,
      ramType: 'DDR5', // Usually DDR5 for Z790 Aorus Elite
      color: "Black",
      price: 200 // Sale price $239.99 - $40
    },
    {
      name: "ASUS PRIME Z790-A WIFI",
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "White/Silver",
      price: 230 // Sale price $309.99 - $80
    },
    {
      name: "MSI MPG Z790 EDGE WIFI",
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Silver/White",
      price: 295 // Sale price $299.99 - $5
    },
    {
      name: "ASUS ROG STRIX Z790-E GAMING WIFI", // Missing II from name in source
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryMax: 192,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black",
      price: 300 // Sale price $399.99 - $100
    },
    // LGA 1851 (Intel Core Ultra Series 2 - Arrow Lake)
    {
      name: "GIGABYTE B860M AORUS ELITE",
      socket: "LGA1851",
      chipset: "B860",
      formFactor: "Micro-ATX",
      memoryMax: 256, // Assuming new standard
      memorySlots: 4, // Likely 4
      ramType: 'DDR5', // Supports DDR5 6400+
      color: "Black/Silver", // Typical Aorus
      price: 197 // Approx IDR 2,949,000 converted
    },
    {
      name: "MSI PRO B860M-A WIFI",
      socket: "LGA1851",
      chipset: "B860",
      formFactor: "Micro-ATX",
      memoryMax: 256, // Assuming new standard
      memorySlots: 4, // Likely 4
      ramType: 'DDR5',
      color: "Black", // Typical PRO series
      price: 211 // Approx IDR 3,159,000 converted
    },
    {
      name: "ASUS ROG STRIX B860-I GAMING WIFI",
      socket: "LGA1851",
      chipset: "B860",
      formFactor: "Mini-ITX",
      memoryMax: 128, // ITX often has less capacity
      memorySlots: 2, // ITX typically 2 slots
      ramType: 'DDR5',
      color: "Black", // Typical ROG Strix ITX
      price: 322 // Approx IDR 4,830,000 converted
    },
     {
      name: "MSI MPG Z890 CARBON WIFI",
      socket: "LGA1851",
      chipset: "Z890",
      formFactor: "ATX",
      memoryMax: 256, // Z series max capacity
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black", // Typical Carbon
      price: 615 // Approx IDR 9,229,000 converted
    },
    {
      name: "ASUS ROG MAXIMUS Z890 HERO",
      socket: "LGA1851",
      chipset: "Z890",
      formFactor: "ATX", // Sometimes E-ATX
      memoryMax: 256,
      memorySlots: 4,
      ramType: 'DDR5',
      color: "Black", // Typical Hero
      price: 981 // Approx IDR 14,719,000 converted
    },
      // AM4 Socket
      {
        name: "MSI A520M-A PRO",
        socket: "AM4",
        chipset: "A520",
        formFactor: "Micro-ATX",
        memoryMax: 64, // A520 typical max
        memorySlots: 2, // A520 typical slots
        ramType: 'DDR4',
        color: "Black",
        price: 52 // Approx INR 4134 converted
      },
      {
        name: "ASUS Prime A520M-K",
        socket: "AM4",
        chipset: "A520",
        formFactor: "Micro-ATX",
        memoryMax: 64,
        memorySlots: 2,
        ramType: 'DDR4',
        color: "Black",
        price: 52 // Approx INR 4139 converted
      },
      {
        name: "ASRock B450M/AC R2.0",
        socket: "AM4",
        chipset: "B450",
        formFactor: "Micro-ATX",
        memoryMax: 128, // B450 can support 128GB
        memorySlots: 4, // Often 4 slots
        ramType: 'DDR4',
        color: "Black",
        price: 75 // Newegg price
      },
      {
        name: "ASRock B450M-HDV R4.0",
        socket: "AM4",
        chipset: "B450",
        formFactor: "Micro-ATX",
        memoryMax: 64, // Often 2 slots on HDV
        memorySlots: 2, // Often 2 slots on HDV
        ramType: 'DDR4',
        color: "Black",
        price: 53 // Approx INR 4224 converted
      },
       {
        name: "ASRock B450 Steel Legend",
        socket: "AM4",
        chipset: "B450",
        formFactor: "ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black/White Camo",
        price: 106 // Approx INR 8499 converted
      },
      {
        name: "ASUS Prime B450M-K II",
        socket: "AM4",
        chipset: "B450",
        formFactor: "Micro-ATX",
        memoryMax: 64,
        memorySlots: 2,
        ramType: 'DDR4',
        color: "Black",
        price: 57 // Approx INR 4540 converted
      },
      {
        name: "GIGABYTE B450M DS3H V3", // Assuming V3 is similar to V2 price
        socket: "AM4",
        chipset: "B450",
        formFactor: "Micro-ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 81 // Approx INR 6499 converted
      },
      {
        name: "Gigabyte B450M K",
        socket: "AM4",
        chipset: "B450",
        formFactor: "Micro-ATX",
        memoryMax: 64, // K models often 2 slots
        memorySlots: 2, // K models often 2 slots
        ramType: 'DDR4',
        color: "Black",
        price: 57 // Approx INR 4549 converted
      },
      {
        name: "MSI B450M-A PRO MAX II", // Assuming II is similar to non-II price
        socket: "AM4",
        chipset: "B450",
        formFactor: "Micro-ATX",
        memoryMax: 64,
        memorySlots: 2,
        ramType: 'DDR4',
        color: "Black",
        price: 59 // Approx INR 4729 converted
      },
      {
        name: "ASRock B550 Phantom Gaming 4/ac",
        socket: "AM4",
        chipset: "B550",
        formFactor: "ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black/Silver",
        price: 90 // Newegg price
      },
      {
        name: "ASUS Prime B550-PLUS AC-HES",
        socket: "AM4",
        chipset: "B550",
        formFactor: "ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 95 // Newegg price
      },
      {
        name: "ASUS ROG Strix B550-F Gaming WiFi II",
        socket: "AM4",
        chipset: "B550",
        formFactor: "ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 149 // Newegg price
      },
       {
        name: "GIGABYTE B550 AORUS ELITE AX V2",
        socket: "AM4",
        chipset: "B550",
        formFactor: "ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 130 // Newegg price
      },
      {
        name: "GIGABYTE B550M Aorus Elite AX", // Micro ATX version
        socket: "AM4",
        chipset: "B550",
        formFactor: "Micro-ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 134 // Approx INR 10749 converted
      },
       {
        name: "GIGABYTE B550M DS3H",
        socket: "AM4",
        chipset: "B550",
        formFactor: "Micro-ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 92 // Approx INR 7341 converted
      },
       {
        name: "GIGABYTE B550M K",
        socket: "AM4",
        chipset: "B550",
        formFactor: "Micro-ATX",
        memoryMax: 64, // K models often 2 slots
        memorySlots: 2, // K models often 2 slots
        ramType: 'DDR4',
        color: "Black",
        price: 95 // Newegg price
      },
      {
        name: "MSI MAG B550 TOMAHAWK",
        socket: "AM4",
        chipset: "B550",
        formFactor: "ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 140 // Newegg price
      },
      {
        name: "MSI MPG B550 GAMING PLUS",
        socket: "AM4",
        chipset: "B550",
        formFactor: "ATX",
        memoryMax: 128, // Amazon India lists 192GB, likely error for B550/DDR4
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 169 // Amazon India price converted approx
      },
      {
        name: "MSI PRO B550M PRO-VDH WIFI",
        socket: "AM4",
        chipset: "B550",
        formFactor: "Micro-ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 110 // Newegg price
      },
      {
        name: "MSI PRO B550M-VC WIFI",
        socket: "AM4",
        chipset: "B550",
        formFactor: "Micro-ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 120 // Newegg price
      },
      { // Assuming X570 examples based on search context
        name: "MSI MPG X570 GAMING PLUS",
        socket: "AM4",
        chipset: "X570",
        formFactor: "ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black/Red",
        price: 284 // Amazon price
      },
       { // Example, details sparse in results
        name: "ASUS ROG Strix X570-E Gaming",
        socket: "AM4",
        chipset: "X570",
        formFactor: "ATX",
        memoryMax: 128,
        memorySlots: 4,
        ramType: 'DDR4',
        color: "Black",
        price: 350 // Estimated price
      },
      // AM5 Socket
      {
        name: "ASRock A620M-HDV/M.2+", // Common A620 board
        socket: "AM5",
        chipset: "A620",
        formFactor: "Micro-ATX",
        memoryMax: 96, // A620 often lower max RAM
        memorySlots: 2, // A620 often 2 slots
        ramType: 'DDR5',
        color: "Black",
        price: 75 // Estimated entry price
      },
      {
        name: "ASUS PRIME B650M-A AX", // Common B650 board
        socket: "AM5",
        chipset: "B650",
        formFactor: "Micro-ATX",
        memoryMax: 192, // B650 often 192GB
        memorySlots: 4,
        ramType: 'DDR5',
        color: "Black/Silver",
        price: 160 // Estimated price
      },
      {
        name: "ASUS PRIME B650-PLUS WIFI",
        socket: "AM5",
        chipset: "B650",
        formFactor: "ATX",
        memoryMax: 192,
        memorySlots: 4,
        ramType: 'DDR5',
        color: "Black",
        price: 180 // Estimated Price from Newegg listing
      },
      {
        name: "ASUS TUF GAMING B650-PLUS WIFI",
        socket: "AM5",
        chipset: "B650",
        formFactor: "ATX",
        memoryMax: 192,
        memorySlots: 4,
        ramType: 'DDR5',
        color: "Black",
        price: 170 // Newegg sale price
      },
      {
        name: "GIGABYTE B650 GAMING X AX", // Common B650 board
        socket: "AM5",
        chipset: "B650",
        formFactor: "ATX",
        memoryMax: 192,
        memorySlots: 4,
        ramType: 'DDR5',
        color: "Black",
        price: 160 // Estimated price
      },
      {
        name: "MSI B650 GAMING PLUS WIFI",
        socket: "AM5",
        chipset: "B650",
        formFactor: "ATX",
        memoryMax: 192,
        memorySlots: 4,
        ramType: 'DDR5',
        color: "Black",
        price: 170 // Newegg sale price
      },
      { // B650E Example
        name: "ASRock B650E PG Riptide WiFi",
        socket: "AM5",
        chipset: "B650E",
        formFactor: "ATX",
        memoryMax: 192,
        memorySlots: 4,
        ramType: 'DDR5',
        color: "Black",
        price: 190 // Estimated price
      },
      { // X670 Example
        name: "GIGABYTE X670 GAMING X AX V2",
        socket: "AM5",
        chipset: "X670", // Dual chipset design
        formFactor: "ATX",
        memoryMax: 192,
        memorySlots: 4,
        ramType: 'DDR5',
        color: "Black",
        price: 220 // Estimated price
      },
      { // X670E Example
        name: "ASUS ROG STRIX X670E-F GAMING WIFI",
        socket: "AM5",
        chipset: "X670E",
        formFactor: "ATX",
        memoryMax: 192,
        memorySlots: 4,
        ramType: 'DDR5',
        color: "Black",
        price: 380 // Estimated price
      },
       { // X870 Example
        name: "ASUS ROG STRIX X870-A GAMING WIFI",
        socket: "AM5",
        chipset: "X870",
        formFactor: "ATX",
        memoryMax: 256, // Newer chipsets may support more
        memorySlots: 4,
        ramType: 'DDR5',
        color: "White/Silver",
        price: 300 // Newegg sale price
      },
      { // X870E Example
        name: "GIGABYTE X870E AORUS ELITE WIFI7",
        socket: "AM5",
        chipset: "X870E",
        formFactor: "ATX",
        memoryMax: 256,
        memorySlots: 4,
        ramType: 'DDR5',
        color: "Black",
        price: 310 // Newegg sale price
      }
];