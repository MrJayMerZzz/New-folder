export type PowerSupply = {
    name: string;
    brand: string; // e.g., 'Corsair', 'EVGA', 'SeaSonic', 'Cooler Master'
    type: string; // Form Factor: Typically 'ATX', could also be 'SFX', 'SFX-L'
    efficiencyRating: string; // e.g., '80+ Bronze', '80+ Gold', '80+ Platinum', '80+ Titanium'
    wattage: number; // Output wattage (W)
    modular: 'Full' | 'Semi' | 'None'; // Cable modularity
    color: string; // Usually Black or White
    price?: number; // Optional: Price
  };
  
  export const psus: PowerSupply[] = [
    {
      name: "Corsair RM850x (2021)",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 850,
      modular: "Full",
      color: "Black",
      price: 135
    },
    {
      name: "EVGA SuperNOVA 750 G6",
      brand: "EVGA",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 750,
      modular: "Full",
      color: "Black",
      price: 120
    },
    {
      name: "SeaSonic FOCUS Plus Platinum 750", // Platinum Example
      brand: "SeaSonic",
      type: "ATX",
      efficiencyRating: "80+ Platinum",
      wattage: 750,
      modular: "Full",
      color: "Black",
      price: 150
    },
    {
      name: "Cooler Master MWE Gold 650 V2",
      brand: "Cooler Master",
      type: "ATX",
      efficiencyRating: "80+ Gold",
      wattage: 650,
      modular: "Full", // Some MWE models are non-modular, check specific SKU
      color: "Black",
      price: 90
    },
    {
      name: "Corsair SF750", // SFX Example
      brand: "Corsair",
      type: "SFX", // Small Form Factor
      efficiencyRating: "80+ Platinum",
      wattage: 750,
      modular: "Full",
      color: "Black",
      price: 170
    },
    {
      name: "be quiet! Straight Power 11 1000W",
      brand: "be quiet!",
      type: "ATX",
      efficiencyRating: "80+ Platinum", // High efficiency example
      wattage: 1000,
      modular: "Full",
      color: "Black",
      price: 210
    },
    {
      name: "EVGA 600 W1", // Non-Modular, Lower Efficiency Example
      brand: "EVGA",
      type: "ATX",
      efficiencyRating: "80+ White", // Basic efficiency
      wattage: 600,
      modular: "None",
      color: "Black",
      price: 55
    },
    {
      name: "Corsair CX550M (2021)",
      brand: "Corsair",
      type: "ATX",
      efficiencyRating: "80+ Bronze", // Lower efficiency tier example
      wattage: 550, // Wattage for testing warnings
      modular: "Semi", // Semi-modular example
      color: "Black",
      price: 65
    },
  ];