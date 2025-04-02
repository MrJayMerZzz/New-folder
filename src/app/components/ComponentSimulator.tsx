"use client";

  import React, { useState, useMemo, ChangeEvent } from "react"; // Added React import
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
  interface BaseComponent {
      name: string;
      brand?: string;
      price?: number;
      microarchitecture?: string;
      socket?: string;
      tdp?: number;
      memorySlots?: number;
      formFactor?: string;
      modules?: number;
      ddrType?: 'DDR3' | 'DDR4' | 'DDR5';
      length?: number;
      wattage?: number;
      supportedFormFactors?: string[];
      maxGpuLength?: number | null;
      maxCoolerHeight?: number | null;
      supportedSockets?: string[];
      height?: number | null;
  }
  
  
  const ComponentSimulator = () => {
    const [selections, setSelections] = useState<SelectionsState>({});
    const [selectedCpuBrand, setSelectedCpuBrand] = useState<string>("");
    const [isAutoCompatEnabled, setIsAutoCompatEnabled] = useState<boolean>(true);
  
    // --- Add State for Quantities ---
    const [ramQuantity, setRamQuantity] = useState<number>(1);
    const [storageQuantity, setStorageQuantity] = useState<number>(1);
  
    const handleSelection = (field: ComponentTypeKey, value: string) => {
      setSelections((prev) => {
          const newState = { ...prev, [field]: value };
          // Reset quantity if selection is cleared? Optional.
          // if (value === '' && field === 'memory') setRamQuantity(1);
          // if (value === '' && field === 'storage') setStorageQuantity(1);
          return newState;
      });
    };
  
    // --- Handlers for Quantity Changes ---
    const handleQuantityChange = (field: ComponentTypeKey, value: string) => {
      const quantity = parseInt(value, 10);
      // Ensure quantity is at least 1
      const validQuantity = Math.max(1, isNaN(quantity) ? 1 : quantity);
  
      if (field === 'memory') {
        setRamQuantity(validQuantity);
      } else if (field === 'storage') {
        setStorageQuantity(validQuantity);
      }
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
    // (Filters remain the same)
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
  
    const filteredRamOptions = useMemo(() => {
      const allRam = componentDataMap.memory ?? [];
      let filtered: RAM[] = allRam;
      if (isAutoCompatEnabled && selectedMotherboardObject && selectedMotherboardObject.ramType) {
          filtered = filtered.filter(ram => ram.ddrType === selectedMotherboardObject.ramType);
      }
      return filtered;
    }, [isAutoCompatEnabled, selectedMotherboardObject]);
  
    const filteredGpuOptions = useMemo(() => {
      const allGpus = componentDataMap.videoCard ?? [];
      let filtered: GPU[] = allGpus;
       if (isAutoCompatEnabled && selectedCaseObject && selectedCaseObject.maxGpuLength != null) {
           filtered = filtered.filter(gpu => !gpu.length || gpu.length <= selectedCaseObject.maxGpuLength);
       }
      return filtered;
    }, [isAutoCompatEnabled, selectedCaseObject]);
  
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
  
     // Estimated Wattage Calculation (Unaffected by quantity for now)
      const estimatedWattage = useMemo(() => {
       const cpuTdp = selectedCpuObject?.tdp || 0;
       const gpuTdp = selectedGpuObject?.tdp || 0;
       const otherComponentsEstimate = 50;
       if (cpuTdp > 0 || gpuTdp > 0) {
           return cpuTdp + gpuTdp + otherComponentsEstimate;
       }
       return 0;
      }, [selectedCpuObject, selectedGpuObject]);
  
  
    // --- Compatibility Checks --- (Unaffected by quantity for now)
    const compatibilityIssues = useMemo(() => {
      const issues: { message: string; involvedKeys: ComponentTypeKey[] }[] = [];
      // ... (checks remain the same, using backticks for messages) ...
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
            message: `RAM kit (${selectedRamObject.name}) has too many modules (${selectedRamObject.modules}) for motherboard slots (${selectedMotherboardObject.memorySlots}).`,
            involvedKeys: ['memory', 'motherboard']
          });
        }
        // RAM Type vs Motherboard Supported Type Check
        if (selectedRamObject && selectedMotherboardObject && selectedMotherboardObject.ramType && selectedRamObject.ddrType !== selectedMotherboardObject.ramType) {
          issues.push({
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
        // GPU Length vs Case Max Length Check
        if (selectedGpuObject && selectedCaseObject && selectedCaseObject.maxGpuLength != null && selectedGpuObject.length > selectedCaseObject.maxGpuLength) {
          issues.push({
            message: `GPU (${selectedGpuObject.brand || ''} ${selectedGpuObject.name}) length (${selectedGpuObject.length}mm) may exceed Case maximum (${selectedCaseObject.maxGpuLength}mm).`,
            involvedKeys: ['videoCard', 'case']
          });
        }
        // CPU Cooler Height vs Case Clearance Check
        if (selectedCoolerObject && selectedCaseObject && selectedCaseObject.maxCoolerHeight != null && selectedCoolerObject.height != null && selectedCoolerObject.height > selectedCaseObject.maxCoolerHeight) {
          issues.push({
            message: `CPU Cooler (${selectedCoolerObject.name}) height (${selectedCoolerObject.height}mm) exceeds Case maximum clearance (${selectedCaseObject.maxCoolerHeight}mm).`,
            involvedKeys: ['cpuCooler', 'case']
          });
        }
        // CPU Cooler Socket vs CPU/Motherboard Socket Check
        if (selectedCoolerObject && selectedCoolerObject.supportedSockets) {
          const targetSocket = selectedCpuObject?.microarchitecture || selectedMotherboardObject?.socket;
          if (targetSocket && !selectedCoolerObject.supportedSockets.includes(targetSocket)) {
            issues.push({
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
        if (estimatedPowerUsage > 50 && selectedPsuObject && selectedPsuObject.wattage < estimatedPowerUsage) {
          issues.push({
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
             <div className="flex justify-between items-start mb-2">
                 <div>
                    <span className="font-semibold">System Status:</span>{' '}
                    {compatibilityIssues.length > 0
                      ? `Found ${compatibilityIssues.length} potential compatibility issue(s).`
                      : estimatedWattage > 0 && Object.values(selections).some(val => !!val)
                      ? 'Selected components appear compatible.'
                      : 'Select components to check compatibility.'}
                 </div>
                 <div className="flex space-x-4">
                     {/* Removed RAM Slot Info */}
                     {estimatedWattage > 0 && (
                         <span className="font-semibold whitespace-nowrap">
                           Est. Wattage: {estimatedWattage}W
                         </span>
                     )}
                 </div>
             </div>
             {compatibilityIssues.length > 0 && (
               <ul className="list-disc pl-5 mt-1 space-y-1 border-t border-red-200 pt-2">
                 {compatibilityIssues.map((issue, index) => (
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
              {/* ... Toggle Input ... */}
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
  
  
          {/* --- Component Selection Area --- */}
          {/* Changed main layout div */}
          <div className="space-y-4">
              {componentSlots.map(({ key, label }) => {
  
                  // ... (logic to get options, filtered, filterDependencyMet, currentSelection, currentSelectedItem, isErrored) ...
                  let options: BaseComponent[] = [];
                  let filtered = false;
                  let filterDependencyMet = false;
  
                  switch (key) {
                     // ... cases ...
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
  
                   // --- Determine current quantity based on component key ---
                   const currentQuantity = key === 'memory' ? ramQuantity : key === 'storage' ? storageQuantity : 1;
  
  
                  // --- Special handling for CPU slot ---
                  if (key === 'cpu') {
                      return (
                           // Use Grid layout for CPU section too for consistency
                          <div key={key} className={`grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-4 items-center bg-white p-4 rounded-lg shadow border ${isErrored ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}>
                             {/* Column 1: CPU Selection */}
                             <div className="space-y-3">
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
                                             const nameString = !nameIncludesBrand ? `${item.brand} ${item.name}` : item.name;
                                             return (
                                                 <option key={item.name} value={item.name}>
                                                     {nameString}
                                                 </option>
                                             );
                                         })}
                                     </select>
                                 </div>
                             </div>
                             {/* Column 2: Price Display */}
                              <div className="text-sm text-gray-700 text-right md:mt-0 mt-2"> {/* Add top margin on small screens */}
                                  {currentSelectedItem?.price != null ? (
                                      <span className="font-medium text-gray-900">
                                          ${currentSelectedItem.price.toFixed(2)}
                                      </span>
                                  ) : (
                                      <span className="text-gray-400">--</span>
                                  )}
                              </div>
                          </div>
                      );
                  }
  
                  // --- Default handling for other slots ---
                  return (
                       // Use Grid layout here too
                      <div key={key} className={`grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-x-4 items-center bg-white p-4 rounded-lg shadow border ${isErrored ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}>
                           {/* Column 1: Label and Select */}
                           <div>
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
                                      const nameString = !nameIncludesBrand && item.brand ? `${item.brand} ${item.name}` : item.name;
                                      return (
                                          <option key={item.name} value={item.name}>
                                              {nameString}
                                          </option>
                                      );
                                  })}
                              </select>
                           </div>
  
                            {/* Column 2: Quantity Input (Conditional) */}
                            <div className="md:mt-0 mt-2"> {/* Add top margin on small screens */}
                                {(key === 'memory' || key === 'storage') && currentSelection ? (
                                   <input
                                       type="number"
                                       min="1"
                                       value={currentQuantity}
                                       onChange={(e) => handleQuantityChange(key, e.target.value)}
                                       aria-label={`${label} Quantity`}
                                       className={`w-16 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm ${isErrored ? 'border-red-400' : ''}`}
                                   />
                                ) : (
                                    // Optional: Render an empty div or null to maintain grid structure
                                    <div></div> // Or simply null
                                )}
                            </div>
  
  
                           {/* Column 3: Price Display */}
                           <div className="text-sm text-gray-700 text-right md:mt-0 mt-2"> {/* Add top margin on small screens */}
                               {currentSelectedItem?.price != null ? (
                                   <span className="font-medium text-gray-900">
                                       ${currentSelectedItem.price.toFixed(2)}
                                   </span>
                               ) : (
                                   <span className="text-gray-400">--</span>
                               )}
                           </div>
                      </div>
                  );
              })}
          </div>
  
        </div>
      </div>
    );
  };
  
  export default ComponentSimulator;