import { type CPU, cpus } from './cpu';
import { type Motherboard, motherboards } from './motherboard';
import { type RAM, ram } from './ram';
import { type GPU, gpus } from './gpu';
import { type Case, cases } from './case';
import { type PSU, psus } from './psu';
import { type CPUCooler, coolers } from './cooler';
import { type StorageDevice, storages } from './storage';

export const componentDataMap = {
  cpu: cpus,
  cpuCooler: coolers,
  motherboard: motherboards,
  memory: ram,
  storage: storages,
  videoCard: gpus,
  case: cases,
  powerSupply: psus,
} as const;

export type ComponentTypeKey = keyof typeof componentDataMap;

export type AnyComponent = CPU | CPUCooler | Motherboard | RAM | StorageDevice | GPU | Case | PSU;

export type { CPU, GPU, RAM, Motherboard, StorageDevice, PSU, Case, CPUCooler };

export const getComponentData = (key: ComponentTypeKey): AnyComponent[] => {
  return componentDataMap[key] as AnyComponent[];
};