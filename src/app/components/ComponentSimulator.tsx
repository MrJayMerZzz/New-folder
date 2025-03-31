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
} from "../constants/data";

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
  const [selectedCpuBrand, setSelectedCpuBrand] = useState<string>("");
  // State for the auto-compatibility toggle
  const [isAutoCompatEnabled, setIsAutoCompatEnabled] = useState<boolean>(true); // Default to ON

  const handleSelection = (field: ComponentTypeKey, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [field]: value,
    }));
     // If auto-compat is on, changing a core component might require resetting incompatible dependent ones
     // Example: Changing Mobo might require resetting CPU if auto-compat is on
     // This logic can get complex, omitted for brevity here. Consider libraries like Zustand/Redux for complex state dependencies.
  };

  const handleCpuBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newBrand = event.target.value;
    setSelectedCpuBrand(newBrand);
    handleSelection('cpu', ''); // Reset model
  };

  // --- Filtered Options Calculation ---

  // Get currently selected full objects (needed for filtering other lists)
  const selectedMotherboardObject = useMemo(() => componentDataMap.motherboard?.find(m => m.name === selections.motherboard), [selections.motherboard]);
  const selectedCpuObject = useMemo(() => componentDataMap.cpu?.find(c => c.name === selections.cpu), [selections.cpu]);
  // ... find other selected objects (selectedCase, selectedRam etc.) if needed for more filtering logic ...
  const selectedCaseObject = useMemo(() => componentDataMap.case?.find(c => c.name === selections.case), [selections.case]);

  // Filter CPU Options
  const filteredCpuOptions = useMemo(() => {
    const allCpus = componentDataMap.cpu ?? [];
    let filtered = allCpus;

    // 1. Filter by Brand
    if (selectedCpuBrand && selectedCpuBrand !== "All") {
      filtered = filtered.filter(cpu => cpu.brand === selectedCpuBrand);
    }

    // 2. Filter by Motherboard Socket (if auto-compat is ON)
    if (isAutoCompatEnabled && selectedMotherboardObject) {
      filtered = filtered.filter(cpu => cpu.microarchitecture === selectedMotherboardObject.socket);
    }
    return filtered;
  }, [selectedCpuBrand, selections.motherboard, isAutoCompatEnabled, selectedMotherboardObject]); // Dependencies

  // Filter Motherboard Options
  const filteredMotherboardOptions = useMemo(() => {
     const allMotherboards = componentDataMap.motherboard ?? [];
     let filtered = allMotherboards;

     // Filter by CPU socket (if auto-compat is ON and CPU selected)
     if (isAutoCompatEnabled && selectedCpuObject) {
         filtered = filtered.filter(mobo => mobo.socket === selectedCpuObject.microarchitecture);
     }

     // Filter by Case Form Factor support (if auto-compat is ON and Case selected)
     // Requires Case data to have 'supportedFormFactors: string[]'
     if (isAutoCompatEnabled && selectedCaseObject && selectedCaseObject.supportedFormFactors) {
        filtered = filtered.filter(mobo => selectedCaseObject.supportedFormFactors.includes(mobo.formFactor));
     }

     // Add more filters (e.g., RAM type based on selected RAM) if needed

     return filtered;
  }, [selections.cpu, selections.case, isAutoCompatEnabled, selectedCpuObject, selectedCaseObject]); // Dependencies


  // *** TODO: Create similar useMemo hooks for other components ***
  // e.g., filteredRamOptions, filteredGpuOptions, filteredCaseOptions etc.
  // Each would check isAutoCompatEnabled and filter based on relevant selections.


  // --- Compatibility Checks and Wattage Calculation (remain the same) ---
  const compatibilityIssues = useMemo(() => {
     // ... same logic as before ...
     // This still checks the *final* selection state
    const issues: string[] = [];
    const selectedCpu = componentDataMap.cpu?.find(c => c.name === selections.cpu);
    const selectedMotherboard = componentDataMap.motherboard?.find(m => m.name === selections.motherboard);
    const selectedRam = componentDataMap.memory?.find(r => r.name === selections.memory);
    const selectedGpu = componentDataMap.videoCard?.find(g => g.name === selections.videoCard);
    const selectedPsu = componentDataMap.powerSupply?.find(p => p.name === selections.powerSupply);
    const selectedCase = componentDataMap.case?.find(c => c.name === selections.case);

    if (selectedCpu && selectedMotherboard && selectedCpu.microarchitecture !== selectedMotherboard.socket) {
      issues.push(
        `CPU (${selectedCpu.brand || ''} ${selectedCpu.name}) socket (${selectedCpu.microarchitecture}) doesn't match Motherboard (${selectedMotherboard.brand || ''} ${selectedMotherboard.name}) socket (${selectedMotherboard.socket}).`
       );
    }
    if (selectedRam && selectedMotherboard && selectedRam.modules > selectedMotherboard.memorySlots) {
     issues.push(
        `RAM kit (${selectedRam.name}) has too many modules (${selectedRam.modules}) for motherboard slots (${selectedMotherboard.memorySlots}).`
      );
    }
    if (selectedRam && selectedMotherboard && selectedMotherboard.ramType && selectedRam.ddrType !== selectedMotherboard.ramType) {
       issues.push(`RAM type (${selectedRam.ddrType}) is incompatible with Motherboard supported type (${selectedMotherboard.ramType}).`);
    }
    const estimatedPowerUsage = (selectedCpu?.tdp || 0) + (selectedGpu?.tdp || 0) + 50;
    if (selectedPsu && selectedPsu.wattage < estimatedPowerUsage) {
      issues.push(
        `Selected PSU (${selectedPsu.name}) wattage (${selectedPsu.wattage}W) may be too low for estimated usage (~${estimatedPowerUsage}W).`
      );
    }
     if (selectedMotherboard && selectedCase && selectedCase.supportedFormFactors && !selectedCase.supportedFormFactors.includes(selectedMotherboard.formFactor)) {
          issues.push(`Motherboard form factor (${selectedMotherboard.formFactor}) may not fit in the Case (${selectedCase.name}).`);
     }
     if (selectedGpu && selectedCase && selectedCase.maxGpuLength && selectedGpu.length > selectedCase.maxGpuLength) {
          issues.push(`GPU (${selectedGpu.brand || ''} ${selectedGpu.name}) length (${selectedGpu.length}mm) exceeds Case maximum (${selectedCase.maxGpuLength}mm).`);
      }
     return issues;
  }, [selections]);

  const estimatedWattage = useMemo(() => {
    // ... same logic as before ...
    const cpuTdp = componentDataMap.cpu?.find(c => c.name === selections.cpu)?.tdp || 0;
     const gpuTdp = componentDataMap.videoCard?.find(g => g.name === selections.videoCard)?.tdp || 0;
     if (cpuTdp > 0 || gpuTdp > 0) {
         return cpuTdp + gpuTdp + 50;
     }
     return 0;
  }, [selections]);
  // --- End Compatibility/Wattage ---


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">PC Component Selector</h1>

        {/* Compatibility & Wattage Bar (remains the same) */}
        {/* ... bar JSX ... */}
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


        {/* Auto Compatibility Toggle */}
        <div className="bg-white p-4 rounded shadow flex items-center justify-end">
            <label htmlFor="autoCompat" className="text-sm font-medium text-gray-700 mr-3">
                Enable Auto-Compatibility Filter:
            </label>
            <input
                type="checkbox"
                id="autoCompat"
                checked={isAutoCompatEnabled}
                onChange={(e) => setIsAutoCompatEnabled(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
        </div>


        {/* Component Selection Area */}
        <div className="space-y-4">
            {componentSlots.map(({ key, label }) => {

                 // Determine which options list to use based on the component key
                 let options: any[] = []; // Use 'any[]' for simplicity, refine if needed
                 switch (key) {
                    case 'cpu':
                        options = filteredCpuOptions;
                        break;
                    case 'motherboard':
                         options = filteredMotherboardOptions;
                         break;
                    // *** TODO: Add cases for other components using their specific filtered option lists ***
                    // case 'memory':
                    //     options = filteredRamOptions; // Example
                    //     break;
                    // case 'videoCard':
                    //     options = filteredGpuOptions; // Example
                    //     break;
                    default:
                        // Fallback for components without specific filtering logic yet
                        options = componentDataMap[key as keyof typeof componentDataMap] ?? [];
                        break;
                 }

                 const currentSelection = selections[key] || "";

                 // --- Special handling for CPU slot (Brand + Model) ---
                 if (key === 'cpu') {
                     return (
                        <div key={key} className="bg-white p-4 rounded shadow space-y-3">
                             {/* CPU Brand Dropdown */}
                            <div>
                                <label htmlFor="cpuBrand" className="block text-sm font-medium text-gray-700 mb-1">
                                    CPU Brand
                                </label>
                                <select
                                    id="cpuBrand"
                                    name="cpuBrand"
                                    value={selectedCpuBrand}
                                    onChange={handleCpuBrandChange}
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                >
                                    <option value="">-- Select Brand (All) --</option>
                                    <option value="Intel">Intel</option>
                                    <option value="AMD">AMD</option>
                                </select>
                            </div>
                             {/* CPU Model Dropdown (uses filtered 'options' list) */}
                             <div>
                                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                                    {label} Model
                                </label>
                                <select
                                    id={key}
                                    name={key}
                                    value={currentSelection}
                                    onChange={(e) => handleSelection(key, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                >
                                    <option value="">-- Select a {label} --</option>
                                    {options.map((item: CPU) => ( // options here are already filtered CPUs
                                        <option key={item.name} value={item.name}>
                                            {item.name} {item.price ? `($${item.price})` : ''}
                                        </option>
                                    ))}
                                </select>
                             </div>
                        </div>
                     );
                 }

                 // --- Default handling for other slots (uses filtered 'options' list) ---
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
                            {/* 'options' list is now potentially filtered based on the switch statement above */}
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