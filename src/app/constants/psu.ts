export type PSU = {
    name: string;
    brand: string; // e.g., 'Corsair', 'EVGA', 'SeaSonic', 'Cooler Master'
    type: string; // Form Factor: Typically 'ATX', could also be 'SFX', 'SFX-L'
    efficiencyRating: string; // e.g., '80+ Bronze', '80+ Gold', '80+ Platinum', '80+ Titanium'
    wattage: number; // Output wattage (W)
    modular: 'Full' | 'Semi' | 'None'; // Cable modularity
    color: string; // Usually Black or White
    price?: number; // Optional: Price
  };
  
  export const psus: PSU[] = 
  [
    // 550W
    {
      name: "CX550 (2021)",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Bronze",
      wattage: 550,
      modular: "None",
      color: "Black",
      price: 60
    },
    {
      name: "CX550M (2021)",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Bronze",
      wattage: 550,
      modular: "Semi",
      color: "Black",
      price: 65
    },
    {
      name: "550 B5",
      brand: "EVGA",
      type: "ATX",
      efficiencyRating: "80+ Bronze",
      wattage: 550,
      modular: "Full",
      color: "Black",
      price: 60
    },
    {
      name: "MWE 550 Bronze V2",
      brand: "Cooler Master",
      type: "ATX",
      efficiencyRating: "80+ Bronze",
      wattage: 550,
      modular: "None",
      color: "Black",
      price: 55
    },
    {
      name: "CORE GM-550",
      brand: "SeaSonic",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 550,
      modular: "Semi",
      color: "Black",
      price: 80
    },
    // 600W
    {
      name: "600 W1",
      brand: "EVGA",
      type: "ATX",
      efficiencyRating: "80+ White",
      wattage: 600,
      modular: "None",
      color: "Black",
      price: 55
    },
    // 650W
    {
      name: "MWE Gold 650 V2",
      brand: "Cooler Master",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 650,
      modular: "Full",
      color: "Black",
      price: 90
    },
    {
      name: "GT 650 Black",
      brand: "SAMA",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 650,
      modular: "Full",
      color: "Black",
      price: 65
    },
     {
      name: "CORE Reactor II VE 650W",
      brand: "XPG",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 650,
      modular: "Full",
      color: "Black",
      price: 70
    },
    {
      name: "RM650x (2021)",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 650,
      modular: "Full",
      color: "Black",
      price: 110
    },
    {
      name: "SuperNOVA 650 G6",
      brand: "EVGA",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 650,
      modular: "Full",
      color: "Black",
      price: 100
    },
    // 750W
    {
      name: "SuperNOVA 750 G6",
      brand: "EVGA",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 750,
      modular: "Full",
      color: "Black",
      price: 120
    },
    {
      name: "FOCUS Plus Platinum 750",
      brand: "SeaSonic",
      type: "ATX",
      efficiencyRating: "80+ Platinum",
      wattage: 750,
      modular: "Full",
      color: "Black",
      price: 150
    },
    {
      name: "SF750",
      brand: "Corsair",
      type: "SFX",
      efficiencyRating: "80+ Platinum",
      wattage: 750,
      modular: "Full",
      color: "Black",
      price: 170
    },
    {
      name: "750RGB", // Assuming model name is just 750RGB
      brand: "T.F.SKYWINDINTL",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 750,
      modular: "Full",
      color: "Black",
      price: 60
    },
    {
      name: "Combat FG 750W",
      brand: "Super Flower",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 750,
      modular: "Full",
      color: "Black",
      price: 120
    },
    // 850W
    {
      name: "RM850x (2021)",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 850,
      modular: "Full",
      color: "Black",
      price: 135
    },
     {
      name: "RM850e",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 850,
      modular: "Full",
      color: "Black",
      price: 130
    },
     {
      name: "RM850x SHIFT",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 850,
      modular: "Full",
      color: "Black",
      price: 160
    },
     {
      name: "MAG A850GL PCIE5",
      brand: "MSI",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 850,
      modular: "Full",
      color: "Black",
      price: 111
    },
    {
      name: "TUF Gaming 850W Gold",
      brand: "ASUS",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 850,
      modular: "Full",
      color: "Black",
      price: 140
    },
    // 1000W
    {
      name: "Straight Power 11 1000W",
      brand: "be quiet!",
      type: "ATX",
      efficiencyRating: "80+ Platinum",
      wattage: 1000,
      modular: "Full",
      color: "Black",
      price: 210
    },
    {
      name: "TUF Gaming 1000W Gold",
      brand: "ASUS",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 1000,
      modular: "Full",
      color: "Black",
      price: 180
    },
    {
      name: "Leadex VII XP 1000W",
      brand: "Super Flower",
      type: "ATX",
      efficiencyRating: "80+ Platinum",
      wattage: 1000,
      modular: "Full",
      color: "White",
      price: 200
    },
     {
      name: "RM1000x (2021)",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 1000,
      modular: "Full",
      color: "Black",
      price: 190
    },
     {
      name: "SuperNOVA 1000 G6",
      brand: "EVGA",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 1000,
      modular: "Full",
      color: "Black",
      price: 185
    },
    // 1200W
    {
      name: "TUF Gaming 1200W Gold",
      brand: "ASUS",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 1200,
      modular: "Full",
      color: "Black",
      price: 220
    },
     {
      name: "AX1200i",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Platinum",
      wattage: 1200,
      modular: "Full",
      color: "Black",
      price: 400
    },
     {
      name: "PRIME TX-1200",
      brand: "SeaSonic",
      type: "ATX",
      efficiencyRating: "80+ Titanium",
      wattage: 1200,
      modular: "Full",
      color: "Black",
      price: 450
    },
     {
      name: "Dark Power 13 1200W",
      brand: "be quiet!",
      type: "ATX",
      efficiencyRating: "80+ Titanium",
      wattage: 1200,
      modular: "Full",
      color: "Black",
      price: 420
    },
     {
      name: "Toughpower GF3 1200W",
      brand: "Thermaltake",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 1200,
      modular: "Full",
      color: "Black",
      price: 200
    },
    // 1600W
    {
      name: "Leadex Titanium 1600W",
      brand: "Super Flower",
      type: "ATX",
      efficiencyRating: "80+ Titanium",
      wattage: 1600,
      modular: "Full",
      color: "Black",
      price: 400
    },
    {
      name: "AXi Series AX1600i",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Titanium",
      wattage: 1600,
      modular: "Full",
      color: "Black",
      price: 610
    },
    {
      name: "ROG Thor 1600W Titanium",
      brand: "ASUS",
      type: "ATX",
      efficiencyRating: "80+ Titanium",
      wattage: 1600,
      modular: "Full",
      color: "Black",
      price: 673
    },
    {
      name: "SuperNOVA 1600 P+",
      brand: "EVGA",
      type: "ATX",
      efficiencyRating: "80+ Platinum",
      wattage: 1600,
      modular: "Full",
      color: "Black",
      price: 449
    },
    {
      name: "Dark Power PRO 13 1600W",
      brand: "be quiet!",
      type: "ATX",
      efficiencyRating: "80+ Titanium",
      wattage: 1600,
      modular: "Full",
      color: "Black",
      price: 400
    },
    // 2000W
    {
      name: "SuperNOVA 2000 G+", // Needs 220V+ Input!
      brand: "EVGA",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 2000,
      modular: "Full",
      color: "Black",
      price: 400
    },
    {
      name: "M2000 Platinum",
      brand: "Cooler Master",
      type: "ATX",
      efficiencyRating: "80+ Platinum",
      wattage: 2000,
      modular: "Full",
      color: "Black",
      price: 512
    },
     {
      name: "LX2000W Platinum",
      brand: "Unknown", // Generic mining PSU
      type: "ATX", // Sometimes ATX, sometimes custom
      efficiencyRating: "80+ Platinum",
      wattage: 2000,
      modular: "Full",
      color: "Silver/Metal",
      price: 100
    },
    {
      name: "MiningCave 2000W PSU",
      brand: "MiningCave",
      type: "ATX",
      efficiencyRating: "80+ Gold", // Assume Gold
      wattage: 2000,
      modular: "Full",
      color: "Black/Silver",
      price: 80
    },
     {
      name: "D2000E-S0 Platinum",
      brand: "Dell", // Server PSU
      type: "Server",
      efficiencyRating: "80+ Platinum",
      wattage: 2000,
      modular: "None", // Hot-swap
      color: "Silver",
      price: 79
    }
  ]