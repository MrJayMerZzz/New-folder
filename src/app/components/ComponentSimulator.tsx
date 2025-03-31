"use client";

import { useState, useMemo, ChangeEvent } from "react";
import {
  componentDataMap,
  ComponentTypeKey,
  CPU,
  Motherboard,
  RAM,
  GPU,
  PowerSupply,
  Case,
  CPUCooler
  // StorageDevice // Import if needed for checks
} from "../constants/data"; // Ensure data.ts exports all these types

const componentSlots: { key: ComponentTypeKey; label: string }[] = [
  { key: "cpu", label: "CPU" },
  { key: "cpuCooler", label: "CPU Cooler" },
  { key: "motherboard", label: "Motherboard" },
  { key: "memory", label: "Memory" },
  { key: "storage", label: "Storage" },
  { key: "videoCard", label: "Video Card" },
  { key: "case", label: "Case" },
  { key: "powerSupply", label: "Power Supply" },
];

type SelectionsState = Partial<Record<ComponentTypeKey, string>>;

const ComponentSimulator = () => {
  const [selections, setSelections] = useState<SelectionsState>({});

  const handleSelection = (field: ComponentTypeKey, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const compatibilityIssues = useMemo(() => {
    const issues: string[] = [];

    const selectedCpu = componentDataMap.cpu?.find(c => c.name === selections.cpu);
    const selectedMotherboard = componentDataMap.motherboard?.find(m => m.name === selections.motherboard);
    const selectedRam = componentDataMap.memory?.find(r => r.name === selections.memory);
    const selectedGpu = componentDataMap.videoCard?.find(g => g.name === selections.videoCard);
    const selectedPsu = componentDataMap.powerSupply?.find(p => p.name === selections.powerSupply);
    const selectedCase = componentDataMap.case?.find(c => c.name === selections.case);
    const selectedCooler = componentDataMap.cpuCooler?.find(c => c.name === selections.cpuCooler);
    // const selectedStorage = componentDataMap.storage?.find(s => s.name === selections.storage);

    // --- Compatibility Checks ---
    if (selectedCpu && selectedMotherboard && selectedCpu.microarchitecture !== selectedMotherboard.socket) {
      issues.push(
        `CPU (${selectedCpu.name}) socket (${selectedCpu.microarchitecture}) doesn't match Motherboard (${selectedMotherboard.name}) socket (${selectedMotherboard.socket}).`
      );
    }

    if (selectedRam && selectedMotherboard && selectedRam.modules > selectedMotherboard.memorySlots) {
      issues.push(
        `RAM kit (${selectedRam.name}) has too many modules (${selectedRam.modules}) for motherboard slots (${selectedMotherboard.memorySlots}).`
      );
    }

    // Requires 'ramType: "DDR4"|"DDR5"' property on Motherboard type/data
    if (selectedRam && selectedMotherboard && selectedMotherboard.ramType && selectedRam.ddrType !== selectedMotherboard.ramType) {
       issues.push(`RAM type (${selectedRam.ddrType}) is incompatible with Motherboard supported type (${selectedMotherboard.ramType}).`);
    }

    const estimatedPowerUsage = (selectedCpu?.tdp || 0) + (selectedGpu?.tdp || 0) + 50;
    if (selectedPsu && selectedPsu.wattage < estimatedPowerUsage) {
      issues.push(
        `Selected PSU (${selectedPsu.name}) wattage (${selectedPsu.wattage}W) may be too low for estimated usage (~${estimatedPowerUsage}W).`
      );
    }

    // Requires 'supportedFormFactors: string[]' property on Case type/data
    if (selectedMotherboard && selectedCase && selectedCase.supportedFormFactors && !selectedCase.supportedFormFactors.includes(selectedMotherboard.formFactor)) {
         issues.push(`Motherboard form factor (${selectedMotherboard.formFactor}) may not fit in the Case (${selectedCase.name}).`);
    }

    // Requires 'maxGpuLength: number' property on Case type/data
     if (selectedGpu && selectedCase && selectedCase.maxGpuLength && selectedGpu.length > selectedCase.maxGpuLength) {
         issues.push(`GPU (${selectedGpu.name}) length (${selectedGpu.length}mm) exceeds Case maximum (${selectedCase.maxGpuLength}mm).`);
     }

    // Add CPU Cooler clearance checks if data available (cooler height vs case width, cooler size vs RAM height)

    return issues;
  }, [selections]);

  const estimatedWattage = useMemo(() => {
    const cpuTdp = componentDataMap.cpu?.find(c => c.name === selections.cpu)?.tdp || 0;
    const gpuTdp = componentDataMap.videoCard?.find(g => g.name === selections.videoCard)?.tdp || 0;
    if (cpuTdp > 0 || gpuTdp > 0) {
        return cpuTdp + gpuTdp + 50;
    }
    return 0;
  }, [selections]);


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">PC Component Selector</h1>

        <div className={`p-3 rounded mb-6 text-sm ${
            compatibilityIssues.length === 0 && estimatedWattage > 0
              ? 'bg-green-100 text-green-800 border border-green-300'
              : compatibilityIssues.length > 0
              ? 'bg-red-100 text-red-800 border border-red-300'
              : 'bg-gray-100 text-gray-600 border border-gray-300'
          }`}
        >
          <span className="font-semibold">Compatibility:</span>{' '}
          {compatibilityIssues.length === 0
            ? 'No issues detected.'
            : `Found ${compatibilityIssues.length} potential issue(s).`}
            <span className="float-right font-semibold">
                Estimated Wattage: {estimatedWattage}W
            </span>
            {compatibilityIssues.length > 0 && (
                <ul className="list-disc pl-5 mt-2">
                    {compatibilityIssues.map((issue, index) => (<li key={index}>{issue}</li>))}
                </ul>
            )}
        </div>

        <div className="space-y-4">
            {componentSlots.map(({ key, label }) => {
                 const options = componentDataMap[key as keyof typeof componentDataMap] ?? [];
                 const currentSelection = selections[key] || "";

                 return (
                    <div key={key} className="bg-white p-4 rounded shadow">
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                            {label}
                        </label>
                        <select
                            id={key}
                            name={key}
                            value={currentSelection}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelection(key, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                        >
                            <option value="">-- Select a {label} --</option>
                            {options.map((item: any) => (
                                <option key={item.name} value={item.name}>
                                    {item.name} {item.price ? `($${item.price})` : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            })}
        </div>

      </div>
    </div>
  );
};

export default ComponentSimulator;