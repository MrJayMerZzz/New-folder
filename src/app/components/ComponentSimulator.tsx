"use client";

import { useState, useMemo, ChangeEvent } from "react";
import {
  componentDataMap,
  ComponentTypeKey,
  CPU,
  Motherboard,
  RAM, // Ensure RAM type is imported
  GPU,
  PowerSupply,
  Case,
  CPUCooler,
  StorageDevice // Added StorageDevice for completeness if needed
} from "../constants/data"; // Assuming data types are correctly defined here

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
interface BaseComponent {
    name: string;
    brand?: string;
    price?: number;
    // Add other common optional fields if needed
}


const ComponentSimulator = () => {
  const [selections, setSelections] = useState<SelectionsState>({});
  const [selectedCpuBrand, setSelectedCpuBrand] = useState<string>("");
  const [isAutoCompatEnabled, setIsAutoCompatEnabled] = useState<boolean>(true);

  const handleSelection = (field: ComponentTypeKey, value: string) => {
    setSelections((prev) => {
        const newState = { ...prev, [field]: value };
        // Reset logic (optional) remains commented out for simplicity
        return newState;
    });
  };

  const handleCpuBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newBrand = event.target.value;
    setSelectedCpuBrand(newBrand);
    setSelections((prev) => ({ ...prev, cpu: '' }));
  };

  // --- Get Selected Objects ---
  // These are needed for filtering and compatibility checks

  const selectedMotherboardObject = useMemo(() => componentDataMap.motherboard?.find(m => m.name === selections.motherboard), [selections.motherboard]);
  const selectedCpuObject = useMemo(() => componentDataMap.cpu?.find(c => c.name === selections.cpu), [selections.cpu]);
  const selectedCaseObject = useMemo(() => componentDataMap.case?.find(c => c.name === selections.case), [selections.case]);
  const selectedRamObject = useMemo(() => componentDataMap.memory?.find(r => r.name === selections.memory), [selections.memory]);
  const selectedGpuObject = useMemo(() => componentDataMap.videoCard?.find(g => g.name === selections.videoCard), [selections.videoCard]);
  const selectedCoolerObject = useMemo(() => componentDataMap.cpuCooler?.find(c => c.name === selections.cpuCooler), [selections.cpuCooler]);
  const selectedPsuObject = useMemo(() => componentDataMap.powerSupply?.find(p => p.name === selections.powerSupply), [selections.powerSupply]);


  // --- Filtered Options Calculation ---

  // Filter CPU Options (Based on Mobo Socket) - Works with your data
  const filteredCpuOptions = useMemo(() => {
    const allCpus = componentDataMap.cpu ?? [];
    let filtered: CPU[] = allCpus;

    if (selectedCpuBrand && selectedCpuBrand !== "All") {
      filtered = filtered.filter(cpu => cpu.brand === selectedCpuBrand);
    }

    // Filter by selected Motherboard socket
    if (isAutoCompatEnabled && selectedMotherboardObject) {
      filtered = filtered.filter(cpu => cpu.microarchitecture === selectedMotherboardObject.socket);
    }
    return filtered;
  }, [selectedCpuBrand, selections.motherboard, isAutoCompatEnabled, selectedMotherboardObject]);

  // Filter Motherboard Options (Based on CPU Socket) - Works with your data
  // Note: Case form factor filtering removed due to missing 'supportedFormFactors' in data
  const filteredMotherboardOptions = useMemo(() => {
    const allMotherboards = componentDataMap.motherboard ?? [];
    let filtered: Motherboard[] = allMotherboards;

    // Filter by selected CPU socket
    if (isAutoCompatEnabled && selectedCpuObject) {
        filtered = filtered.filter(mobo => mobo.socket === selectedCpuObject.microarchitecture);
    }

    // --- REMOVED Case Form Factor Filter ---
    // Reason: `selectedCaseObject.supportedFormFactors` does not exist in your Case data type
    // if (isAutoCompatEnabled && selectedCaseObject && selectedCaseObject.supportedFormFactors) {
    //    filtered = filtered.filter(mobo => selectedCaseObject.supportedFormFactors.includes(mobo.formFactor));
    // }

    return filtered;
  }, [selections.cpu, isAutoCompatEnabled, selectedCpuObject]); // Removed selectedCaseObject from deps as it's not used

  // Filter RAM Options (Based on Mobo RAM Type) - Works with your data
  const filteredRamOptions = useMemo(() => {
    const allRam = componentDataMap.memory ?? [];
    let filtered: RAM[] = allRam;

    // Filter by Motherboard RAM Type
    if (isAutoCompatEnabled && selectedMotherboardObject && selectedMotherboardObject.ramType) {
        filtered = filtered.filter(ram => ram.ddrType === selectedMotherboardObject.ramType);
    }
    return filtered;
  }, [selections.motherboard, isAutoCompatEnabled, selectedMotherboardObject]);

  // Filter GPU Options - Removed Case Length filter
  // Reason: `selectedCaseObject.maxGpuLength` does not exist in your Case data type
  const filteredGpuOptions = useMemo(() => {
    const allGpus = componentDataMap.videoCard ?? [];
    let filtered: GPU[] = allGpus;

    // --- REMOVED Case Max GPU Length Filter ---
    // if (isAutoCompatEnabled && selectedCaseObject && selectedCaseObject.maxGpuLength) {
    //     filtered = filtered.filter(gpu => !gpu.length || gpu.length <= selectedCaseObject.maxGpuLength);
    // }

    return filtered;
  }, [isAutoCompatEnabled]); // Removed selectedCaseObject from deps as it's not used

   // Filter Case Options - Removed Mobo Form Factor & GPU Length filters
   // Reason: Relied on `supportedFormFactors` and `maxGpuLength` which are missing
   const filteredCaseOptions = useMemo(() => {
     const allCases = componentDataMap.case ?? [];
     let filtered: Case[] = allCases;

     // --- REMOVED Motherboard Form Factor Filter ---
     // if (isAutoCompatEnabled && selectedMotherboardObject && selectedMotherboardObject.formFactor) {
     //     filtered = filtered.filter(c => c.supportedFormFactors?.includes(selectedMotherboardObject.formFactor));
     // }

     // --- REMOVED GPU Length Filter ---
     // if (isAutoCompatEnabled && selectedGpuObject && selectedGpuObject.length) {
     //     filtered = filtered.filter(c => !c.maxGpuLength || c.maxGpuLength >= selectedGpuObject.length);
     // }

     return filtered;
   }, [isAutoCompatEnabled]); // Removed selectedMotherboardObject, selectedGpuObject from deps

    // *** FIXED *** Filter Power Supply Options (Based on estimated wattage) - Calculates wattage internally
    const filteredPowerSupplyOptions = useMemo(() => {
        const allPsus = componentDataMap.powerSupply ?? [];
        let filtered: PowerSupply[] = allPsus;

        // Calculate required wattage *inside* this hook
        const cpuTdp = selectedCpuObject?.tdp || 0;
        const gpuTdp = selectedGpuObject?.tdp || 0;
        const otherComponentsEstimate = 50;
        const requiredWattage = cpuTdp + gpuTdp + otherComponentsEstimate; // Calculate here

        const headroomFactor = 1.2; // Suggest 20% headroom

        if (isAutoCompatEnabled && requiredWattage > 50) { // Check if wattage is > base estimate
            // Suggest PSUs with wattage >= estimated + headroom
            filtered = filtered.filter(psu => psu.wattage >= requiredWattage * headroomFactor);
        }
        return filtered;
    // Update dependencies: remove estimatedWattage, add selectedCpuObject and selectedGpuObject
    }, [isAutoCompatEnabled, selectedCpuObject, selectedGpuObject]); // Depends on the objects needed for calculation


   // Filter CPU Cooler Options - Removed Socket & Case Clearance filters
   // Reason: Relied on `supportedSockets` and `height` (Cooler) / `maxCoolerHeight` (Case) which are missing
   const filteredCpuCoolerOptions = useMemo(() => {
     const allCoolers = componentDataMap.cpuCooler ?? [];
     let filtered: CPUCooler[] = allCoolers;

     // --- REMOVED CPU Socket Filter ---
     // if (isAutoCompatEnabled && selectedCpuObject && selectedCpuObject.microarchitecture) {
     //   filtered = filtered.filter(cooler => cooler.supportedSockets?.includes(selectedCpuObject.microarchitecture));
     // }

     // --- REMOVED Case Cooler Height Filter ---
     // if (isAutoCompatEnabled && selectedCaseObject && selectedCaseObject.maxCoolerHeight) {
     //   filtered = filtered.filter(cooler => !cooler.height || cooler.height <= selectedCaseObject.maxCoolerHeight);
     // }

     return filtered;
   }, [isAutoCompatEnabled]); // Removed object dependencies as they are not used

   // Estimated Wattage Calculation - Moved below filters, Works
    const estimatedWattage = useMemo(() => {
     const cpuTdp = selectedCpuObject?.tdp || 0;
     const gpuTdp = selectedGpuObject?.tdp || 0;
     const otherComponentsEstimate = 50;

     if (cpuTdp > 0 || gpuTdp > 0) {
         return cpuTdp + gpuTdp + otherComponentsEstimate;
     }
     return 0;
    }, [selectedCpuObject, selectedGpuObject]); // Depend on the derived objects


  // --- Compatibility Checks --- (No change needed here based on the error)
  const compatibilityIssues = useMemo(() => {
     const issues: string[] = [];
     // Use the memoized selected objects from above

     // CPU <-> Motherboard Socket Check - Works
     if (selectedCpuObject && selectedMotherboardObject && selectedCpuObject.microarchitecture !== selectedMotherboardObject.socket) {
       issues.push(
         `CPU (${selectedCpuObject.brand || ''} ${selectedCpuObject.name}) socket (${selectedCpuObject.microarchitecture}) doesn't match Motherboard (${selectedMotherboardObject.brand || ''} ${selectedMotherboardObject.name}) socket (${selectedMotherboardObject.socket}).`
       );
     }

     // RAM Modules vs Motherboard Slots Check - Works
     if (selectedRamObject && selectedMotherboardObject && selectedRamObject.modules > selectedMotherboardObject.memorySlots) {
       issues.push(
         `RAM kit (${selectedRamObject.name}) has too many modules (${selectedRamObject.modules}) for motherboard slots (${selectedMotherboardObject.memorySlots}).`
       );
     }

     // RAM Type vs Motherboard Supported Type Check - Works
     if (selectedRamObject && selectedMotherboardObject && selectedMotherboardObject.ramType && selectedRamObject.ddrType !== selectedMotherboardObject.ramType) {
        issues.push(`RAM type (${selectedRamObject.ddrType}) is incompatible with Motherboard supported type (${selectedMotherboardObject.ramType}).`);
     }

     // --- REMOVED Checks based on missing data ---

     // Estimated Wattage vs PSU Wattage Check - Works
     const cpuTdp = selectedCpuObject?.tdp || 0;
     const gpuTdp = selectedGpuObject?.tdp || 0;
     const otherComponentsEstimate = 50;
     const estimatedPowerUsage = cpuTdp + gpuTdp + otherComponentsEstimate;

     if (estimatedPowerUsage > 50 && selectedPsuObject && selectedPsuObject.wattage < estimatedPowerUsage) {
       issues.push(
         `Selected PSU (${selectedPsuObject.name}) wattage (${selectedPsuObject.wattage}W) may be low for estimated load (~${estimatedPowerUsage}W). Consider a PSU with more headroom.`
       );
     }
     // Optional headroom warning check remains commented
     // else if (estimatedPowerUsage > 50 && selectedPsuObject && selectedPsuObject.wattage < estimatedPowerUsage * 1.2) {
     //     // issues.push(`PSU (${selectedPsuObject.name}) wattage (${selectedPsuObject.wattage}W) is close to estimated load (~${estimatedPowerUsage}W). Higher wattage recommended for headroom.`);
     // }

     return issues;
  }, [selectedCpuObject, selectedMotherboardObject, selectedRamObject, selectedGpuObject, selectedPsuObject, selectedCaseObject, selectedCoolerObject]); // Dependencies include all objects used


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
                    : estimatedWattage > 0 && Object.values(selections).some(val => val !== '') // Check if at least one part is selected
                    ? 'Selected components appear compatible based on available data.'
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
                 <li key={index}>{issue}</li>
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

                // Determine options and filtering status based on key
                switch (key) {
                  case 'cpu':
                    options = filteredCpuOptions;
                    filterDependencyMet = !!selectedMotherboardObject;
                    filtered = isAutoCompatEnabled && filterDependencyMet;
                    break;
                  case 'motherboard':
                     options = filteredMotherboardOptions;
                     filterDependencyMet = !!selectedCpuObject;
                     filtered = isAutoCompatEnabled && filterDependencyMet;
                     break;
                  case 'memory':
                    options = filteredRamOptions;
                    filterDependencyMet = !!selectedMotherboardObject;
                    filtered = isAutoCompatEnabled && filterDependencyMet;
                    break;
                  case 'videoCard':
                    options = filteredGpuOptions;
                    filtered = false; // No active filter
                    break;
                  case 'case':
                     options = filteredCaseOptions;
                     filtered = false; // No active filter
                     break;
                  case 'powerSupply':
                    options = filteredPowerSupplyOptions;
                    // Check if calculation inputs are present
                    filterDependencyMet = !!(selectedCpuObject?.tdp || selectedGpuObject?.tdp);
                    filtered = isAutoCompatEnabled && filterDependencyMet;
                    break;
                  case 'cpuCooler':
                     options = filteredCpuCoolerOptions;
                     filtered = false; // No active filter
                     break;
                  default:
                    options = componentDataMap[key as keyof typeof componentDataMap] ?? [];
                    break;
                }

                const currentSelection = selections[key] || "";
                const allOptionsForType = componentDataMap[key as keyof typeof componentDataMap] ?? [];

                // Add back current selection if filtered out
                const currentSelectedItem = allOptionsForType.find(item => item.name === currentSelection);
                if (currentSelection && currentSelectedItem && !options.some(opt => opt.name === currentSelection)) {
                    options = [currentSelectedItem, ...options];
                }


                // --- Special handling for CPU slot (Brand + Model) ---
                if (key === 'cpu') {
                    return (
                        <div key={key} className="bg-white p-4 rounded-lg shadow border space-y-3">
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
                                    {filtered && <span className="text-xs text-indigo-600 ml-1">(Filtered by Mobo Socket)</span>}
                                </label>
                                <select
                                    id={key}
                                    name={key}
                                    value={currentSelection}
                                    onChange={(e) => handleSelection(key, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm"
                                >
                                    <option value="">-- Select a {label} --</option>
                                    {options.length === 0 && isAutoCompatEnabled && filterDependencyMet && (
                                        <option disabled>No compatible CPUs for selected Motherboard</option>
                                    )}
                                    {options.map((item: CPU) => (
                                        <option key={item.name} value={item.name}>
                                            {item.brand} {item.name} {item.price ? `($${item.price.toFixed(2)})` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    );
                }

                // --- Default handling for other slots ---
                return (
                    <div key={key} className="bg-white p-4 rounded-lg shadow border">
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                            {label}
                            {filtered && key === 'motherboard' && <span className="text-xs text-indigo-600 ml-1">(Filtered by CPU Socket)</span>}
                            {filtered && key === 'memory' && <span className="text-xs text-indigo-600 ml-1">(Filtered by Mobo RAM Type)</span>}
                            {filtered && key === 'powerSupply' && <span className="text-xs text-indigo-600 ml-1">(Filtered by Wattage Est.)</span>}
                        </label>
                        <select
                            id={key}
                            name={key}
                            value={currentSelection}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelection(key, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm"
                        >
                            <option value="">-- Select a {label} --</option>
                             {options.length === 0 && isAutoCompatEnabled && filterDependencyMet && (
                                <option disabled>No compatible options based on current selections</option>
                             )}
                             {options.map((item: BaseComponent & { price?: number }) => (
                                <option key={item.name} value={item.name}>
                                    {item.brand ? `${item.brand} ` : ''}{item.name} {item.price ? `($${item.price.toFixed(2)})` : ''}
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