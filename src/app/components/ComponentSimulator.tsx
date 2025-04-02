"use client";

import { useState, useMemo, ChangeEvent } from "react";
// Assuming your data.ts file correctly imports and exports componentDataMap
// and the necessary types (CPU, Motherboard, RAM etc.) based on the file structure
import {
  componentDataMap,
  ComponentTypeKey,
  CPU,
  Motherboard,
  RAM,
  GPU,
  PowerSupply,
  Case,
  CPUCooler,
  StorageDevice
} from "../constants/data"; // Adjust path as needed

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

// Define a base type for components if not already done in data.ts
// Ensure this includes all fields potentially used across different component types
interface BaseComponent {
    name: string;
    brand?: string;
    price?: number;
    microarchitecture?: string; // From CPU
    socket?: string; // From Motherboard
    tdp?: number; // From CPU, GPU
    memorySlots?: number; // From Motherboard
    formFactor?: string; // From Motherboard
    modules?: number; // From RAM
    ddrType?: 'DDR3' | 'DDR4' | 'DDR5'; // From RAM
    length?: number; // From GPU
    wattage?: number; // From PowerSupply
    supportedFormFactors?: string[]; // From Case
    maxGpuLength?: number | null; // From Case
    maxCoolerHeight?: number | null; // From Case
    supportedSockets?: string[]; // From CPUCooler
    height?: number | null; // From CPUCooler
}


const ComponentSimulator = () => {
  const [selections, setSelections] = useState<SelectionsState>({});
  const [selectedCpuBrand, setSelectedCpuBrand] = useState<string>("");
  const [isAutoCompatEnabled, setIsAutoCompatEnabled] = useState<boolean>(true);

  const handleSelection = (field: ComponentTypeKey, value: string) => {
    setSelections((prev) => {
        const newState = { ...prev, [field]: value };
        return newState;
    });
  };

  const handleCpuBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newBrand = event.target.value;
    setSelectedCpuBrand(newBrand);
    setSelections((prev) => ({ ...prev, cpu: '' }));
  };

  // --- Get Selected Objects ---
  const selectedMotherboardObject = useMemo(() => componentDataMap.motherboard?.find(m => m.name === selections.motherboard), [selections.motherboard]);
  const selectedCpuObject = useMemo(() => componentDataMap.cpu?.find(c => c.name === selections.cpu), [selections.cpu]);
  const selectedCaseObject = useMemo(() => componentDataMap.case?.find(c => c.name === selections.case) as Case | undefined, [selections.case]);
  const selectedRamObject = useMemo(() => componentDataMap.memory?.find(r => r.name === selections.memory), [selections.memory]);
  const selectedGpuObject = useMemo(() => componentDataMap.videoCard?.find(g => g.name === selections.videoCard), [selections.videoCard]);
  const selectedCoolerObject = useMemo(() => componentDataMap.cpuCooler?.find(c => c.name === selections.cpuCooler) as CPUCooler | undefined, [selections.cpuCooler]);
  const selectedPsuObject = useMemo(() => componentDataMap.powerSupply?.find(p => p.name === selections.powerSupply), [selections.powerSupply]);


  // --- Filtered Options Calculation ---
  // (Assuming data files contain necessary fields for active filters)

  // Filter CPU Options (Based on Mobo Socket)
  const filteredCpuOptions = useMemo(() => {
    const allCpus = componentDataMap.cpu ?? [];
    let filtered: CPU[] = allCpus;
    if (selectedCpuBrand && selectedCpuBrand !== "All") {
      filtered = filtered.filter(cpu => cpu.brand === selectedCpuBrand);
    }
    if (isAutoCompatEnabled && selectedMotherboardObject) {
      filtered = filtered.filter(cpu => cpu.microarchitecture === selectedMotherboardObject.socket);
    }
    return filtered;
  }, [selectedCpuBrand, isAutoCompatEnabled, selectedMotherboardObject]);

  // Filter Motherboard Options (Based on CPU Socket & Case Form Factor)
  const filteredMotherboardOptions = useMemo(() => {
    const allMotherboards = componentDataMap.motherboard ?? [];
    let filtered: Motherboard[] = allMotherboards;
    if (isAutoCompatEnabled && selectedCpuObject) {
        filtered = filtered.filter(mobo => mobo.socket === selectedCpuObject.microarchitecture);
    }
    if (isAutoCompatEnabled && selectedCaseObject && selectedCaseObject.supportedFormFactors) {
       filtered = filtered.filter(mobo => selectedCaseObject.supportedFormFactors.includes(mobo.formFactor));
    }
    return filtered;
  }, [isAutoCompatEnabled, selectedCpuObject, selectedCaseObject]);

  // Filter RAM Options (Based on Mobo RAM Type)
  const filteredRamOptions = useMemo(() => {
    const allRam = componentDataMap.memory ?? [];
    let filtered: RAM[] = allRam;
    if (isAutoCompatEnabled && selectedMotherboardObject && selectedMotherboardObject.ramType) {
        filtered = filtered.filter(ram => ram.ddrType === selectedMotherboardObject.ramType);
    }
    return filtered;
  }, [isAutoCompatEnabled, selectedMotherboardObject]);

  // Filter GPU Options (Based on Case Length)
  const filteredGpuOptions = useMemo(() => {
    const allGpus = componentDataMap.videoCard ?? [];
    let filtered: GPU[] = allGpus;
     if (isAutoCompatEnabled && selectedCaseObject && selectedCaseObject.maxGpuLength != null) {
         filtered = filtered.filter(gpu => !gpu.length || gpu.length <= selectedCaseObject.maxGpuLength);
     }
    return filtered;
  }, [isAutoCompatEnabled, selectedCaseObject]);

   // Filter Case Options (Based on Mobo Form Factor & GPU Length)
   const filteredCaseOptions = useMemo(() => {
     const allCases = componentDataMap.case ?? [];
     let filtered: Case[] = allCases;
      if (isAutoCompatEnabled && selectedMotherboardObject && selectedMotherboardObject.formFactor) {
          filtered = filtered.filter(c => c.supportedFormFactors?.includes(selectedMotherboardObject.formFactor));
      }
     if (isAutoCompatEnabled && selectedGpuObject && selectedGpuObject.length) {
         filtered = filtered.filter(c => c.maxGpuLength == null || c.maxGpuLength >= selectedGpuObject.length);
     }
     return filtered;
   }, [isAutoCompatEnabled, selectedMotherboardObject, selectedGpuObject]);

    // Filter Power Supply Options (Based on estimated wattage)
    const filteredPowerSupplyOptions = useMemo(() => {
        const allPsus = componentDataMap.powerSupply ?? [];
        let filtered: PowerSupply[] = allPsus;
        const cpuTdp = selectedCpuObject?.tdp || 0;
        const gpuTdp = selectedGpuObject?.tdp || 0;
        const otherComponentsEstimate = 50;
        const requiredWattage = cpuTdp + gpuTdp + otherComponentsEstimate;
        const headroomFactor = 1.2;
        if (isAutoCompatEnabled && requiredWattage > 50) {
            filtered = filtered.filter(psu => psu.wattage >= requiredWattage * headroomFactor);
        }
        return filtered;
    }, [isAutoCompatEnabled, selectedCpuObject, selectedGpuObject]);

   // Filter CPU Cooler Options (Based on CPU Socket & Case Clearance)
   const filteredCpuCoolerOptions = useMemo(() => {
     const allCoolers = componentDataMap.cpuCooler ?? [];
     let filtered: CPUCooler[] = allCoolers;
      const targetSocket = selectedCpuObject?.microarchitecture || selectedMotherboardObject?.socket;
      if (isAutoCompatEnabled && targetSocket) {
        filtered = filtered.filter(cooler => cooler.supportedSockets?.includes(targetSocket));
      }
      if (isAutoCompatEnabled && selectedCaseObject && selectedCaseObject.maxCoolerHeight != null) {
        filtered = filtered.filter(cooler => cooler.height == null || cooler.height <= selectedCaseObject.maxCoolerHeight);
      }
     return filtered;
   }, [isAutoCompatEnabled, selectedCpuObject, selectedMotherboardObject, selectedCaseObject]);

   // Estimated Wattage Calculation
    const estimatedWattage = useMemo(() => {
     const cpuTdp = selectedCpuObject?.tdp || 0;
     const gpuTdp = selectedGpuObject?.tdp || 0;
     const otherComponentsEstimate = 50;
     if (cpuTdp > 0 || gpuTdp > 0) {
         return cpuTdp + gpuTdp + otherComponentsEstimate;
     }
     return 0;
    }, [selectedCpuObject, selectedGpuObject]);


  // --- Compatibility Checks ---
  const compatibilityIssues = useMemo(() => {
    const issues: { message: string; involvedKeys: ComponentTypeKey[] }[] = [];

    // --- *** FIX: Ensure all message strings use BACKTICKS (`) *** ---

    // CPU <-> Motherboard Socket Check
    if (selectedCpuObject && selectedMotherboardObject && selectedCpuObject.microarchitecture !== selectedMotherboardObject.socket) {
      issues.push({
      message: `CPU (${selectedCpuObject.brand || ''} ${selectedCpuObject.name}) socket (${selectedCpuObject.microarchitecture}) doesn't match Motherboard (${selectedMotherboardObject.brand || ''} ${selectedMotherboardObject.name}) socket (${selectedMotherboardObject.socket}).`,
      involvedKeys: ['cpu', 'motherboard']
      });
    }

    // RAM Modules vs Motherboard Slots Check
    if (selectedRamObject && selectedMotherboardObject && selectedRamObject.modules > selectedMotherboardObject.memorySlots) {
      issues.push({
        message: `RAM kit (<span class="math-inline">\{selectedRamObject\.name\}\) has too many modules \(</span>{selectedRamObject.modules}) for motherboard slots (${selectedMotherboardObject.memorySlots}).`,
        involvedKeys: ['memory', 'motherboard']
      });
    }

    // Inside compatibilityIssues = useMemo(() => { ... });

    // RAM Type vs Motherboard Supported Type Check
    if (selectedRamObject && selectedMotherboardObject && selectedMotherboardObject.ramType && selectedRamObject.ddrType !== selectedMotherboardObject.ramType) {
      issues.push({
        // --- MAKE SURE THIS LINE USES BACKTICKS ` ` ---
        message: `RAM type (${selectedRamObject.ddrType}) is incompatible with Motherboard supported type (${selectedMotherboardObject.ramType}).`,
        involvedKeys: ['memory', 'motherboard']
      });
    }

    // Motherboard Form Factor vs Case Check
    if (selectedMotherboardObject && selectedCaseObject && selectedCaseObject.supportedFormFactors && !selectedCaseObject.supportedFormFactors.includes(selectedMotherboardObject.formFactor)) {
      issues.push({
      message: `Motherboard form factor (${selectedMotherboardObject.formFactor}) may not fit in the Case (${selectedCaseObject.name}). Check case specs.`,
      involvedKeys: ['motherboard', 'case']
      });
    }

    // Inside compatibilityIssues = useMemo(() => { ... });
    if (selectedGpuObject && selectedCaseObject && selectedCaseObject.maxGpuLength != null && selectedGpuObject.length > selectedCaseObject.maxGpuLength) {
      issues.push({
         // --- CHECK THIS LINE: Make sure it starts and ends with ` ---
        message: `GPU (${selectedGpuObject.brand || ''} ${selectedGpuObject.name}) length (${selectedGpuObject.length}mm) may exceed Case maximum (${selectedCaseObject.maxGpuLength}mm).`,
        involvedKeys: ['videoCard', 'case']
      });
    }

    // CPU Cooler Height vs Case Clearance Check
    if (selectedCoolerObject && selectedCaseObject && selectedCaseObject.maxCoolerHeight != null && selectedCoolerObject.height != null && selectedCoolerObject.height > selectedCaseObject.maxCoolerHeight) {
      issues.push({
        message: `CPU Cooler (<span class="math-inline">\{selectedCoolerObject\.name\}\) height \(</span>{selectedCoolerObject.height}mm) exceeds Case maximum clearance (${selectedCaseObject.maxCoolerHeight}mm).`,
        involvedKeys: ['cpuCooler', 'case']
      });
    }

    // CPU Cooler Socket vs CPU/Motherboard Socket Check
    if (selectedCoolerObject && selectedCoolerObject.supportedSockets) {
      const targetSocket = selectedCpuObject?.microarchitecture || selectedMotherboardObject?.socket;
      if (targetSocket && !selectedCoolerObject.supportedSockets.includes(targetSocket)) {
        issues.push({
          // --- >>> THIS LINE <<< ---
          // --- Must start and end with backticks (`), not single (') or double (") quotes ---
          message: `CPU Cooler (${selectedCoolerObject.name}) may not support the selected CPU/Motherboard socket (${targetSocket}).`,
          involvedKeys: ['cpuCooler', 'cpu', 'motherboard']
        });
      }
    }
    // Estimated Wattage vs PSU Wattage Check
    const cpuTdp = selectedCpuObject?.tdp || 0;
    const gpuTdp = selectedGpuObject?.tdp || 0;
    const otherComponentsEstimate = 50;
    const estimatedPowerUsage = cpuTdp + gpuTdp + otherComponentsEstimate;

    // Inside compatibilityIssues = useMemo(() => { ... });

    // Estimated Wattage vs PSU Wattage Check
    // ... (calculate estimatedPowerUsage) ...
    if (estimatedPowerUsage > 50 && selectedPsuObject && selectedPsuObject.wattage < estimatedPowerUsage) {
      issues.push({
         // --- MAKE SURE THIS LINE USES BACKTICKS ` ` ---
        message: `Selected PSU (${selectedPsuObject.name}) wattage (${selectedPsuObject.wattage}W) may be low for estimated load (~${estimatedPowerUsage}W). Consider a PSU with more headroom.`,
        involvedKeys: ['powerSupply', 'cpu', 'videoCard']
      });
    }

    return issues;
  }, [selectedCpuObject, selectedMotherboardObject, selectedRamObject, selectedGpuObject, selectedPsuObject, selectedCaseObject, selectedCoolerObject]);

  // Helper function to check if a component has an error
  const hasError = (componentKey: ComponentTypeKey): boolean => {
    return compatibilityIssues.some(issue => issue.involvedKeys.includes(componentKey));
  };


  // --- Rendering ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">PC Part Picker Simulator</h1>

        {/* Compatibility & Wattage Bar */}
         <div className={`p-4 rounded-lg mb-6 border text-sm shadow ${
             compatibilityIssues.length > 0
               ? 'bg-red-50 border-red-300 text-red-800'
               : estimatedWattage > 0
               ? 'bg-green-50 border-green-300 text-green-800'
               : 'bg-blue-50 border-blue-300 text-blue-800'
           }`}
           role="alert"
         >
           <div className="flex justify-between items-start">
               <div>
                  <span className="font-semibold">System Status:</span>{' '}
                  {compatibilityIssues.length > 0
                    ? `Found ${compatibilityIssues.length} potential compatibility issue(s).`
                    : estimatedWattage > 0 && Object.values(selections).some(val => !!val)
                    ? 'Selected components appear compatible.'
                    : 'Select components to check compatibility.'}
               </div>
               {estimatedWattage > 0 && (
                   <span className="font-semibold whitespace-nowrap ml-4">
                     Est. Wattage: {estimatedWattage}W
                   </span>
               )}
           </div>
           {compatibilityIssues.length > 0 && (
             <ul className="list-disc pl-5 mt-2 space-y-1">
               {compatibilityIssues.map((issue, index) => (
                 // Use dangerouslySetInnerHTML to render potential HTML in messages
                 <li key={index} dangerouslySetInnerHTML={{ __html: issue.message }} />
               ))}
             </ul>
           )}
         </div>


        {/* Auto Compatibility Toggle */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-end sticky top-0 z-10 mb-4 border">
            <label htmlFor="autoCompat" className="text-sm font-medium text-gray-700 mr-3 cursor-pointer">
                Enable Auto-Compatibility Filtering:
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                    type="checkbox"
                    id="autoCompat"
                    checked={isAutoCompatEnabled}
                    onChange={(e) => setIsAutoCompatEnabled(e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
                    style={{
                        transition: 'right 0.2s ease-in-out, border-color 0.2s ease-in-out',
                        right: isAutoCompatEnabled ? '0.25rem' : 'calc(100% - 1.75rem)',
                        borderColor: isAutoCompatEnabled ? '#4f46e5' : '#e5e7eb',
                    }}
                />
                 <label htmlFor="autoCompat" className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                    style={{
                        backgroundColor: isAutoCompatEnabled ? '#a5b4fc' : '#d1d5db',
                    }}
                ></label>
            </div>
        </div>


        {/* Component Selection Area */}
        <div className="space-y-4">
            {componentSlots.map(({ key, label }) => {

                let options: BaseComponent[] = [];
                let filtered = false;
                let filterDependencyMet = false;

                switch (key) {
                  // ... cases to determine options, filtered, filterDependencyMet ...
                   case 'cpu':
                       options = filteredCpuOptions;
                       filterDependencyMet = !!selectedMotherboardObject;
                       filtered = isAutoCompatEnabled && filterDependencyMet;
                       break;
                   case 'motherboard':
                       options = filteredMotherboardOptions;
                       filterDependencyMet = !!selectedCpuObject || (!!selectedCaseObject && !!selectedCaseObject.supportedFormFactors);
                       filtered = isAutoCompatEnabled && filterDependencyMet;
                       break;
                   case 'memory':
                       options = filteredRamOptions;
                       filterDependencyMet = !!selectedMotherboardObject;
                       filtered = isAutoCompatEnabled && filterDependencyMet;
                       break;
                   case 'videoCard':
                       options = filteredGpuOptions;
                       filterDependencyMet = !!selectedCaseObject && selectedCaseObject.maxGpuLength != null;
                       filtered = isAutoCompatEnabled && filterDependencyMet;
                       break;
                   case 'case':
                       options = filteredCaseOptions;
                       filterDependencyMet = (!!selectedMotherboardObject && !!selectedMotherboardObject.formFactor) || (!!selectedGpuObject && !!selectedGpuObject.length);
                       filtered = isAutoCompatEnabled && filterDependencyMet;
                       break;
                   case 'powerSupply':
                       options = filteredPowerSupplyOptions;
                       filterDependencyMet = !!(selectedCpuObject?.tdp || selectedGpuObject?.tdp);
                       filtered = isAutoCompatEnabled && filterDependencyMet;
                       break;
                   case 'cpuCooler':
                       options = filteredCpuCoolerOptions;
                       filterDependencyMet = !!(selectedCpuObject || selectedMotherboardObject || (selectedCaseObject && selectedCaseObject.maxCoolerHeight != null));
                       filtered = isAutoCompatEnabled && filterDependencyMet;
                       break;
                    default:
                      options = componentDataMap[key as keyof typeof componentDataMap] ?? [];
                      break;
                }

                const currentSelection = selections[key] || "";
                const allOptionsForType = componentDataMap[key as keyof typeof componentDataMap] as BaseComponent[] ?? [];
                const currentSelectedItem = allOptionsForType.find(item => item.name === currentSelection);
                if (currentSelection && currentSelectedItem && !options.some(opt => opt.name === currentSelection)) {
                    options = [currentSelectedItem, ...options];
                }

                const isErrored = hasError(key);

                // --- Special handling for CPU slot ---
                if (key === 'cpu') {
                    return (
                        <div key={key} className={`bg-white p-4 rounded-lg shadow border space-y-3 ${isErrored ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}>
                            <div>
                                <label htmlFor="cpuBrand" className="block text-sm font-medium text-gray-700 mb-1">
                                    CPU Brand Filter
                                </label>
                                <select
                                    id="cpuBrand"
                                    name="cpuBrand"
                                    value={selectedCpuBrand}
                                    onChange={handleCpuBrandChange}
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm"
                                >
                                    <option value="">-- All Brands --</option>
                                    <option value="Intel">Intel</option>
                                    <option value="AMD">AMD</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                                    {label} Model
                                    {filtered && <span className="text-xs text-indigo-600 ml-1">(Filtered)</span>}
                                </label>
                                 <select
                                    id={key}
                                    name={key}
                                    value={currentSelection}
                                    onChange={(e) => handleSelection(key, e.target.value)}
                                    className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm ${isErrored ? 'border-red-400' : ''}`}
                                >
                                    <option value="">-- Select a {label} --</option>
                                    {options.length === 0 && isAutoCompatEnabled && filterDependencyMet && (
                                        <option disabled>No compatible CPUs</option>
                                    )}
                                    {options.map((item: CPU) => {
                                        const nameIncludesBrand = item.brand && item.name.toLowerCase().startsWith(item.brand.toLowerCase() + ' ');
                                        return (
                                            <option key={item.name} value={item.name}>
                                                {!nameIncludesBrand ? `${item.brand} ` : ''}{item.name} {item.price ? `($${item.price.toFixed(2)})` : ''}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    );
                }

                // --- Default handling for other slots ---
                return (
                    <div key={key} className={`bg-white p-4 rounded-lg shadow border ${isErrored ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}>
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                            {label}
                            {filtered && <span className="text-xs text-indigo-600 ml-1">(Filtered)</span>}
                        </label>
                        <select
                            id={key}
                            name={key}
                            value={currentSelection}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelection(key, e.target.value)}
                            className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm ${isErrored ? 'border-red-400' : ''}`}
                        >
                           <option value="">-- Select a {label} --</option>
                             {options.length === 0 && isAutoCompatEnabled && filterDependencyMet && (
                                <option disabled>No compatible options</option>
                             )}
                             {options.map((item: BaseComponent & { price?: number }) => {
                                const nameIncludesBrand = item.brand && item.name.toLowerCase().startsWith(item.brand.toLowerCase() + ' ');
                                return (
                                    <option key={item.name} value={item.name}>
                                        {!nameIncludesBrand && item.brand ? `${item.brand} ` : ''}{item.name} {item.price ? `($${item.price.toFixed(2)})` : ''}
                                    </option>
                                );
                             })}
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