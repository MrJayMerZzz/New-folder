import { cpus } from "./cpu";
import { motherboards } from "./motherboard";
import { ram } from "./ram";
import { gpus } from "./gpu";
import { cases } from "./case";
import { psus } from "./psu";
import { coolers } from "./cooler";
import { storages } from "./storage";
// import { operatingSystems } from './os';

export type CPU = { name: string; microarchitecture: string; tdp: number; /* ... */ };
export type CPUCooler = { name: string; /* ... */ };
export type Motherboard = { name: string; socket: string; memorySlots: number; formFactor: string; /* ... */ };
export type RAM = { name: string; modules: number; /* ... */ };
export type StorageDevice = { name: string; /* ... */ };
export type GPU = { name: string; tdp: number; /* ... */ };
export type Case = { name: string; /* ... */ };
export type PowerSupply = { name: string; wattage: number; /* ... */ };
// export type OperatingSystem = { name: string; /* ... */ };

export const componentDataMap = {
  cpu: cpus,
  cpuCooler: coolers,
  motherboard: motherboards,
  memory: ram,
  storage: storages,
  videoCard: gpus,
  case: cases,
  powerSupply: psus,
  // operatingSystem: operatingSystems,
} as const;

export type ComponentTypeKey = keyof typeof componentDataMap;

export const getComponentData = (key: ComponentTypeKey) => {
  return componentDataMap[key];
};

// export type { CPU, Motherboard, RAM, GPU, Case, PowerSupply, CPUCooler, StorageDevice }; // Optional export