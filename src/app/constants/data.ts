// constants/data.ts

// Import data arrays AND their full types
import { type CPU, cpus } from './cpu';
import { type Motherboard, motherboards } from './motherboard'; // <<< IMPORT the type here
import { type RAM, ram } from './ram'; // Assuming ram.ts exports data as 'ram'
import { type GPU, gpus } from './gpu'; // Assuming gpu.ts exports data as 'gpus'
import { type Case, cases } from './case';
import { type PSU, psus } from './psu';
import { type CPUCooler, coolers } from './cooler'; // Assuming cooler.ts exports type/data
import { type StorageDevice, storages } from './storage'; // Assuming storage.ts exports type/data


// Create the map using the imported data
export const componentDataMap = {
  cpu: cpus,
  cpuCooler: coolers,
  motherboard: motherboards, // Uses imported data
  memory: ram,
  storage: storages,
  videoCard: gpus,
  case: cases,
  powerSupply: psus,
  // operatingSystem: operatingSystems,
} as const;

// Define the type for the keys of the componentDataMap
export type ComponentTypeKey = keyof typeof componentDataMap;

// Union type using the IMPORTED types
export type AnyComponent = CPU | CPUCooler | Motherboard | RAM | StorageDevice | GPU | Case | PSU;

// Re-export the IMPORTED types so other components can use them from data.ts
export type { CPU, GPU, RAM, Motherboard, StorageDevice, PSU, Case, CPUCooler };

// Utility function (optional, but can be useful)
export const getComponentData = (key: ComponentTypeKey) => {
  return componentDataMap[key] as AnyComponent[];
};
