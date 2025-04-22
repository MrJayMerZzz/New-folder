"use client";

import React, { useState, useMemo, ChangeEvent } from "react";
// Import jsPDF - NOTE: You need to install this library: npm install jspdf
import jsPDF from 'jspdf';

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
    StorageDevice // Assuming this type exists for storage items
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
    tdp?: number; // Used for CPU, GPU
    wattage?: number; // Used for PSU
    microarchitecture?: string;
    socket?: string;
    formFactor?: string;
    memorySlots?: number;
    modules?: number;
    ddrType?: 'DDR3' | 'DDR4' | 'DDR5';
    ramType?: 'DDR3' | 'DDR4' | 'DDR5';
    length?: number;
    supportedFormFactors?: string[];
    maxGpuLength?: number | null;
    maxCoolerHeight?: number | null;
    supportedSockets?: string[];
    height?: number | null;
}

// Helper function to calculate recommended PSU wattage
const calculateRecommendedWattage = (
    cpu: CPU | undefined,
    gpu: GPU | undefined,
    ramQty: number,
    storageQty: number
): number => {
    const cpuTdp = cpu?.tdp || 0;
    const gpuTdp = gpu?.tdp || 0;

    // Only calculate wattage if a CPU or GPU is present
    if (cpuTdp === 0 && gpuTdp === 0) {
        return 0;
    }

    const cpuPeakMultiplier = 1.4;
    const gpuPeakMultiplier = 1.5;
    const ramStickWattage = 3;
    const storageDeviceWattage = 8;
    const motherboardBaseWattage = 50;
    const fansCoolingWattage = 25;
    const headroomFactor = 1.25; // +25%

    const estimatedPeakCpu = cpuTdp * cpuPeakMultiplier;
    const estimatedPeakGpu = gpuTdp * gpuPeakMultiplier;
    const estimatedRamWattage = ramQty * ramStickWattage;
    const estimatedStorageWattage = storageQty * storageDeviceWattage;

    const totalEstimatedPeak =
        estimatedPeakCpu + estimatedPeakGpu + motherboardBaseWattage +
        fansCoolingWattage + estimatedRamWattage + estimatedStorageWattage;

    if (totalEstimatedPeak <= 0) return 0;
    const recommendedWattageWithHeadroom = totalEstimatedPeak * headroomFactor;
    return Math.ceil(recommendedWattageWithHeadroom / 50) * 50;
};


const ComponentSimulator = () => {
    const [selections, setSelections] = useState<SelectionsState>({});
    const [selectedCpuBrand, setSelectedCpuBrand] = useState<string>("");
    const [isAutoCompatEnabled, setIsAutoCompatEnabled] = useState<boolean>(true);
    const [ramQuantity, setRamQuantity] = useState<number>(1);
    const [storageQuantity, setStorageQuantity] = useState<number>(1);

    // --- Handler Functions ---
    const handleSelection = (field: ComponentTypeKey, value: string) => {
        setSelections((prev) => ({ ...prev, [field]: value }));
    };
    const handleQuantityChange = (field: ComponentTypeKey, value: string) => {
        const quantity = parseInt(value, 10);
        const validQuantity = Math.max(1, isNaN(quantity) ? 1 : quantity);
        if (field === 'memory') setRamQuantity(validQuantity);
        else if (field === 'storage') setStorageQuantity(validQuantity);
    };
    const handleCpuBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newBrand = event.target.value;
        setSelectedCpuBrand(newBrand);
        handleSelection('cpu', '');
    };

    // --- Get Selected Objects (Memoized) ---
    const selectedMotherboardObject = useMemo(() => {
        const list = Array.isArray(componentDataMap?.motherboard) ? componentDataMap.motherboard : [];
        return list.find(m => m.name === selections.motherboard) as Motherboard | undefined;
    }, [selections.motherboard, componentDataMap?.motherboard]);
    const selectedCpuObject = useMemo(() => {
        const list = Array.isArray(componentDataMap?.cpu) ? componentDataMap.cpu : [];
        return list.find(c => c.name === selections.cpu) as CPU | undefined;
    }, [selections.cpu, componentDataMap?.cpu]);
    const selectedCaseObject = useMemo(() => {
        const list = Array.isArray(componentDataMap?.case) ? componentDataMap.case : [];
        return list.find(c => c.name === selections.case) as Case | undefined;
    }, [selections.case, componentDataMap?.case]);
    const selectedRamObject = useMemo(() => {
        const list = Array.isArray(componentDataMap?.memory) ? componentDataMap.memory : [];
        return list.find(r => r.name === selections.memory) as RAM | undefined;
    }, [selections.memory, componentDataMap?.memory]);
    const selectedGpuObject = useMemo(() => {
        const list = Array.isArray(componentDataMap?.videoCard) ? componentDataMap.videoCard : [];
        return list.find(g => g.name === selections.videoCard) as GPU | undefined;
    }, [selections.videoCard, componentDataMap?.videoCard]);
    const selectedCoolerObject = useMemo(() => {
        const list = Array.isArray(componentDataMap?.cpuCooler) ? componentDataMap.cpuCooler : [];
        return list.find(c => c.name === selections.cpuCooler) as CPUCooler | undefined;
    }, [selections.cpuCooler, componentDataMap?.cpuCooler]);
    const selectedPsuObject = useMemo(() => {
        const list = Array.isArray(componentDataMap?.powerSupply) ? componentDataMap.powerSupply : [];
        return list.find(p => p.name === selections.powerSupply) as PowerSupply | undefined;
    }, [selections.powerSupply, componentDataMap?.powerSupply]);
    const selectedStorageObject = useMemo(() => {
        const list = Array.isArray(componentDataMap?.storage) ? componentDataMap.storage : [];
        return list.find(s => s.name === selections.storage) as StorageDevice | undefined;
    }, [selections.storage, componentDataMap?.storage]);

    // --- Calculate Recommended Wattage centrally ---
    const recommendedWattage = useMemo(() => {
        return calculateRecommendedWattage(
            selectedCpuObject,
            selectedGpuObject,
            ramQuantity,
            storageQuantity
        );
     }, [selectedCpuObject, selectedGpuObject, ramQuantity, storageQuantity]);
    const estimatedWattage = recommendedWattage;

    // --- Calculate Total Price ---
    const totalPrice = useMemo(() => {
        let total = 0;
        if (selectedCpuObject?.price != null) total += selectedCpuObject.price;
        if (selectedCoolerObject?.price != null) total += selectedCoolerObject.price;
        if (selectedMotherboardObject?.price != null) total += selectedMotherboardObject.price;
        if (selectedGpuObject?.price != null) total += selectedGpuObject.price;
        if (selectedCaseObject?.price != null) total += selectedCaseObject.price;
        if (selectedPsuObject?.price != null) total += selectedPsuObject.price;
        if (selectedRamObject?.price != null) total += selectedRamObject.price * ramQuantity;
        if (selectedStorageObject?.price != null) total += selectedStorageObject.price * storageQuantity;
        return total;
    }, [
        selectedCpuObject, selectedCoolerObject, selectedMotherboardObject,
        selectedRamObject, selectedStorageObject, selectedGpuObject,
        selectedCaseObject, selectedPsuObject,
        ramQuantity, storageQuantity
    ]);

    // --- Filtered Options Calculation (Memoized) ---
    const filteredCpuOptions = useMemo(() => {
        const allCpus: CPU[] = Array.isArray(componentDataMap?.cpu) ? componentDataMap.cpu : [];
        let filtered = allCpus;
        if (selectedCpuBrand && selectedCpuBrand !== "All") {
            filtered = filtered.filter(cpu => cpu.brand === selectedCpuBrand);
        }
        if (isAutoCompatEnabled && selectedMotherboardObject?.socket) {
            filtered = filtered.filter(cpu => cpu.microarchitecture === selectedMotherboardObject.socket);
        }
        return filtered;
    }, [selectedCpuBrand, isAutoCompatEnabled, selectedMotherboardObject, componentDataMap?.cpu]);

    const filteredMotherboardOptions = useMemo(() => {
        const allMotherboards: Motherboard[] = Array.isArray(componentDataMap?.motherboard) ? componentDataMap.motherboard : [];
        let filtered = allMotherboards;
        if (isAutoCompatEnabled && selectedCpuObject?.microarchitecture) {
            filtered = filtered.filter(mobo => mobo.socket === selectedCpuObject.microarchitecture);
        }
        if (isAutoCompatEnabled && selectedCaseObject?.supportedFormFactors && selectedMotherboardObject?.formFactor) {
           filtered = filtered.filter(mobo => selectedCaseObject.supportedFormFactors.includes(mobo.formFactor));
        }
        return filtered;
    }, [isAutoCompatEnabled, selectedCpuObject, selectedCaseObject, selectedMotherboardObject, componentDataMap?.motherboard]);

    const filteredRamOptions = useMemo(() => {
        const allRam: RAM[] = Array.isArray(componentDataMap?.memory) ? componentDataMap.memory : [];
        let filtered = allRam;
        if (isAutoCompatEnabled && selectedMotherboardObject?.ramType) {
            filtered = filtered.filter(ram => ram.ddrType === selectedMotherboardObject.ramType);
        }
        return filtered;
    }, [isAutoCompatEnabled, selectedMotherboardObject, componentDataMap?.memory]);

    const filteredGpuOptions = useMemo(() => {
        const allGpus: GPU[] = Array.isArray(componentDataMap?.videoCard) ? componentDataMap.videoCard : [];
        let filtered = allGpus;
         if (isAutoCompatEnabled && selectedCaseObject?.maxGpuLength != null) {
             filtered = filtered.filter(gpu => !gpu.length || gpu.length <= selectedCaseObject.maxGpuLength);
         }
        return filtered;
    }, [isAutoCompatEnabled, selectedCaseObject, componentDataMap?.videoCard]);

    const filteredCaseOptions = useMemo(() => {
        const allCases: Case[] = Array.isArray(componentDataMap?.case) ? componentDataMap.case : [];
        let filtered = allCases;
         if (isAutoCompatEnabled && selectedMotherboardObject?.formFactor) {
             filtered = filtered.filter(c => c.supportedFormFactors?.includes(selectedMotherboardObject.formFactor));
         }
        if (isAutoCompatEnabled && selectedGpuObject?.length) {
            filtered = filtered.filter(c => c.maxGpuLength == null || c.maxGpuLength >= selectedGpuObject.length);
        }
         if (isAutoCompatEnabled && selectedCoolerObject?.height != null) {
             filtered = filtered.filter(c => c.maxCoolerHeight == null || c.maxCoolerHeight >= selectedCoolerObject.height);
         }
        return filtered;
    }, [isAutoCompatEnabled, selectedMotherboardObject, selectedGpuObject, selectedCoolerObject, componentDataMap?.case]);

    const filteredPowerSupplyOptions = useMemo(() => {
        const allPsus: PowerSupply[] = Array.isArray(componentDataMap?.powerSupply) ? componentDataMap.powerSupply : [];
        let filtered: PowerSupply[] = allPsus;
        if (isAutoCompatEnabled && recommendedWattage > 0) {
            filtered = allPsus.filter(psu => psu.wattage != null && psu.wattage >= recommendedWattage);
        }
        return filtered;
    }, [isAutoCompatEnabled, recommendedWattage, componentDataMap?.powerSupply]);

    const filteredCpuCoolerOptions = useMemo(() => {
        const allCoolers: CPUCooler[] = Array.isArray(componentDataMap?.cpuCooler) ? componentDataMap.cpuCooler : [];
        let filtered: CPUCooler[] = allCoolers;
        const targetSocket = selectedCpuObject?.microarchitecture || selectedMotherboardObject?.socket;
        if (isAutoCompatEnabled && targetSocket) {
          filtered = filtered.filter(cooler => cooler.supportedSockets?.includes(targetSocket));
        }
        if (isAutoCompatEnabled && selectedCaseObject?.maxCoolerHeight != null) {
          filtered = filtered.filter(cooler => cooler.height == null || cooler.height <= selectedCaseObject.maxCoolerHeight);
        }
        return filtered;
    }, [isAutoCompatEnabled, selectedCpuObject, selectedMotherboardObject, selectedCaseObject, componentDataMap?.cpuCooler]);


    // --- Compatibility Issues Check ---
    const compatibilityIssues = useMemo(() => {
        const issues: { message: string; involvedKeys: ComponentTypeKey[] }[] = [];
        // CPU <-> Motherboard Socket Check
        if (selectedCpuObject && selectedMotherboardObject && selectedCpuObject.microarchitecture !== selectedMotherboardObject.socket) {
            issues.push({ message: `CPU (${selectedCpuObject.brand || ''} ${selectedCpuObject.name}) socket (${selectedCpuObject.microarchitecture}) doesn't match Motherboard (${selectedMotherboardObject.brand || ''} ${selectedMotherboardObject.name}) socket (${selectedMotherboardObject.socket}).`, involvedKeys: ['cpu', 'motherboard'] });
        }
        // RAM Modules vs Motherboard Slots Check
        if (selectedRamObject?.modules && selectedMotherboardObject?.memorySlots && (selectedRamObject.modules * ramQuantity) > selectedMotherboardObject.memorySlots) {
             issues.push({ message: `Selected RAM quantity (${ramQuantity} x ${selectedRamObject.modules} modules/kit = ${selectedRamObject.modules * ramQuantity} total modules) exceeds motherboard slots (${selectedMotherboardObject.memorySlots}).`, involvedKeys: ['memory', 'motherboard'] });
        }
        // RAM Type vs Motherboard Supported Type Check
        if (selectedRamObject?.ddrType && selectedMotherboardObject?.ramType && selectedRamObject.ddrType !== selectedMotherboardObject.ramType) {
            issues.push({ message: `RAM type (${selectedRamObject.ddrType}) is incompatible with Motherboard supported type (${selectedMotherboardObject.ramType}).`, involvedKeys: ['memory', 'motherboard'] });
        }
        // Motherboard Form Factor vs Case Check
        if (selectedMotherboardObject?.formFactor && selectedCaseObject?.supportedFormFactors && !selectedCaseObject.supportedFormFactors.includes(selectedMotherboardObject.formFactor)) {
            issues.push({ message: `Motherboard form factor (${selectedMotherboardObject.formFactor}) may not fit in the Case (${selectedCaseObject.name}). Supported: ${selectedCaseObject.supportedFormFactors.join(', ')}.`, involvedKeys: ['motherboard', 'case'] });
        }
        // GPU Length vs Case Max Length Check
        if (selectedGpuObject?.length && selectedCaseObject?.maxGpuLength != null && selectedGpuObject.length > selectedCaseObject.maxGpuLength) {
            issues.push({ message: `GPU (${selectedGpuObject.brand || ''} ${selectedGpuObject.name}) length (${selectedGpuObject.length}mm) exceeds Case maximum (${selectedCaseObject.maxGpuLength}mm).`, involvedKeys: ['videoCard', 'case'] });
        }
        // CPU Cooler Height vs Case Clearance Check
        if (selectedCoolerObject?.height != null && selectedCaseObject?.maxCoolerHeight != null && selectedCoolerObject.height > selectedCaseObject.maxCoolerHeight) {
            issues.push({ message: `CPU Cooler (${selectedCoolerObject.name}) height (${selectedCoolerObject.height}mm) exceeds Case maximum clearance (${selectedCaseObject.maxCoolerHeight}mm).`, involvedKeys: ['cpuCooler', 'case'] });
        }
        // CPU Cooler Socket vs CPU/Motherboard Socket Check
        if (selectedCoolerObject?.supportedSockets) {
            const targetSocket = selectedCpuObject?.microarchitecture || selectedMotherboardObject?.socket;
            if (targetSocket && !selectedCoolerObject.supportedSockets.includes(targetSocket)) {
                issues.push({ message: `CPU Cooler (${selectedCoolerObject.name}) may not support the selected CPU/Motherboard socket (${targetSocket}). Supported: ${selectedCoolerObject.supportedSockets.join(', ')}.`, involvedKeys: ['cpuCooler', 'cpu', 'motherboard'] });
            }
        }
        // PSU Wattage Check
        if (recommendedWattage > 0 && selectedPsuObject?.wattage != null && selectedPsuObject.wattage < recommendedWattage) {
            issues.push({ message: `Selected PSU (${selectedPsuObject.name}) wattage (${selectedPsuObject.wattage}W) is below the recommended level (~${recommendedWattage}W) for these components. This may cause instability or shutdowns under load.`, involvedKeys: ['powerSupply', 'cpu', 'videoCard', 'memory', 'storage'] });
        }
        return issues;
    }, [
        selectedCpuObject, selectedMotherboardObject, selectedRamObject,
        selectedGpuObject, selectedPsuObject, selectedCaseObject,
        selectedCoolerObject, selectedStorageObject,
        ramQuantity, storageQuantity,
        recommendedWattage
    ]);

    // Helper function to check if a component has an error
    const hasError = (componentKey: ComponentTypeKey): boolean => {
        // Provide fallback for compatibilityIssues
        return (compatibilityIssues || []).some(issue => issue.involvedKeys.includes(componentKey));
    };

    // --- PDF Generation Handler ---
    const generatePdf = () => {
        const doc = new jsPDF();
        const lineHeight = 7;
        const startX = 10;
        let currentY = 20;

        doc.setFontSize(18);
        doc.text("PC Component Selection", startX, currentY);
        currentY += lineHeight * 1.5;

        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, startX, currentY);
        currentY += lineHeight * 1.5;

        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text("Selected Components:", startX, currentY);
        doc.setFont(undefined, 'normal');
        currentY += lineHeight;

        const selectedItems = [
            { label: "CPU", obj: selectedCpuObject, qty: 1 },
            { label: "CPU Cooler", obj: selectedCoolerObject, qty: 1 },
            { label: "Motherboard", obj: selectedMotherboardObject, qty: 1 },
            { label: "Memory", obj: selectedRamObject, qty: ramQuantity },
            { label: "Storage", obj: selectedStorageObject, qty: storageQuantity },
            { label: "Video Card", obj: selectedGpuObject, qty: 1 },
            { label: "Case", obj: selectedCaseObject, qty: 1 },
            { label: "Power Supply", obj: selectedPsuObject, qty: 1 },
        ];

        doc.setFontSize(10);
        selectedItems.forEach(({ label, obj, qty }) => {
            if (obj) {
                const price = obj.price != null ? obj.price : 0;
                const linePrice = price * qty;
                const priceString = price > 0 ? `$${price.toFixed(2)}` : 'N/A';
                const linePriceString = linePrice > 0 ? `$${linePrice.toFixed(2)}` : '';
                const quantityString = (label === 'Memory' || label === 'Storage') && qty > 1 ? ` (x${qty})` : '';
                let lineText = `${label}: ${obj.name}${quantityString} - Price: ${priceString}`;
                if (linePriceString && quantityString) lineText += ` | Total: ${linePriceString}`;
                const splitText = doc.splitTextToSize(lineText, 180);
                doc.text(splitText, startX, currentY);
                currentY += lineHeight * splitText.length;
                currentY += lineHeight * 0.5;
            }
        });

        currentY += lineHeight * 0.5;
        doc.setLineWidth(0.5);
        doc.line(startX, currentY, 200, currentY);
        currentY += lineHeight;

        if (recommendedWattage > 0) {
            doc.setFont(undefined, 'bold');
            doc.text(`Recommended PSU Wattage: ${recommendedWattage}W`, startX, currentY);
            currentY += lineHeight;
            doc.setFont(undefined, 'normal');
        }

        if (totalPrice > 0) {
            doc.setFont(undefined, 'bold');
            doc.text(`Estimated Total Price: $${totalPrice.toFixed(2)}`, startX, currentY);
            currentY += lineHeight;
            doc.setFont(undefined, 'normal');
        }

        currentY += lineHeight;
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text("Note: Prices are estimates based on available data and may vary.", startX, currentY);
        doc.setTextColor(0);

        doc.save("pc-build-list.pdf");
    };


    // --- Rendering ---
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">PC Part Picker Simulator</h1>

                {/* Compatibility & Wattage Bar */}
                 <div className={`p-4 rounded-lg mb-6 border text-sm shadow ${
                     // --- FIX: Add fallback for compatibilityIssues ---
                     (compatibilityIssues || []).length > 0
                         ? 'bg-red-50 border-red-300 text-red-800'
                         : estimatedWattage > 0 && Object.values(selections).some(val => !!val)
                         ? 'bg-green-50 border-green-300 text-green-800'
                         : 'bg-blue-50 border-blue-300 text-blue-800'
                   }`}
                   role="alert"
                 >
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                         {/* Status Message Area */}
                         <div>
                             <span className="font-semibold">System Status:</span>{' '}
                             {/* --- FIX: Add fallback for compatibilityIssues --- */}
                             {(compatibilityIssues || []).length > 0
                                 ? `Found ${(compatibilityIssues || []).length} potential compatibility issue(s).`
                                 : Object.values(selections).some(val => !!val) && estimatedWattage > 0
                                 ? 'Selected components appear compatible.'
                                 : 'Select components to check compatibility.'}
                         </div>
                         {/* Wattage and Price Area */}
                         <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-right self-end sm:self-center">
                              {estimatedWattage > 0 && ( <span className="font-semibold whitespace-nowrap">Rec. Wattage: {estimatedWattage}W</span> )}
                              {totalPrice > 0 && ( <span className="font-semibold whitespace-nowrap">Total Price: ${totalPrice.toFixed(2)}</span> )}
                         </div>
                     </div>
                     {/* Compatibility Issues List */}
                      {/* --- FIX: Add fallback for compatibilityIssues --- */}
                     {(compatibilityIssues || []).length > 0 && (
                        <ul className="list-disc pl-5 mt-2 space-y-1 border-t border-red-200 pt-2">
                            {/* --- FIX: Add fallback for compatibilityIssues --- */}
                            {(compatibilityIssues || []).map((issue, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: issue.message }} />
                            ))}
                        </ul>
                     )}
                 </div>


                {/* Controls Area (Toggle Only, Sticky) */}
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-end gap-4 sticky top-0 z-10 mb-4 border">
                    {/* Auto Compatibility Toggle */}
                    <div className="flex items-center">
                        <label htmlFor="autoCompat" className="text-sm font-medium text-gray-700 mr-3 cursor-pointer">
                            Enable Auto-Compatibility Filtering:
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox" id="autoCompat" checked={isAutoCompatEnabled}
                                onChange={(e) => setIsAutoCompatEnabled(e.target.checked)}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
                                style={{
                                     transition: 'right 0.2s ease-in-out, border-color 0.2s ease-in-out',
                                     right: isAutoCompatEnabled ? '0.25rem' : 'calc(100% - 1.75rem)',
                                     borderColor: isAutoCompatEnabled ? '#4f46e5' : '#e5e7eb',
                                }}
                            />
                            <label
                                htmlFor="autoCompat" className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                                style={{ backgroundColor: isAutoCompatEnabled ? '#a5b4fc' : '#d1d5db' }}
                            ></label>
                        </div>
                    </div>
                </div> {/* End Controls Area */}


                {/* --- Component Selection Area --- */}
                <div className="space-y-4">
                    {componentSlots.map(({ key, label }) => {
                        let options: BaseComponent[] = [];
                        let filtered = false;
                        let filterDependencyMet = false;
                        switch (key) {
                            case 'cpu': options = filteredCpuOptions; filterDependencyMet = !!selectedMotherboardObject?.socket; filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            case 'motherboard': options = filteredMotherboardOptions; filterDependencyMet = !!selectedCpuObject?.microarchitecture || !!selectedCaseObject?.supportedFormFactors; filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            case 'memory': options = filteredRamOptions; filterDependencyMet = !!selectedMotherboardObject?.ramType; filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            case 'videoCard': options = filteredGpuOptions; filterDependencyMet = selectedCaseObject?.maxGpuLength != null; filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            case 'case': options = filteredCaseOptions; filterDependencyMet = !!selectedMotherboardObject?.formFactor || selectedGpuObject?.length != null || selectedCoolerObject?.height != null; filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            case 'powerSupply': options = filteredPowerSupplyOptions; filterDependencyMet = recommendedWattage > 0; filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            case 'cpuCooler': options = filteredCpuCoolerOptions; filterDependencyMet = !!(selectedCpuObject?.microarchitecture || selectedMotherboardObject?.socket || selectedCaseObject?.maxCoolerHeight != null); filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            default: options = componentDataMap[key as keyof typeof componentDataMap] as BaseComponent[] ?? []; break;
                        }

                        const currentSelection = selections[key] || "";
                        let currentSelectedItem: BaseComponent | undefined;
                        switch (key) {
                            case 'cpu': currentSelectedItem = selectedCpuObject; break;
                            case 'motherboard': currentSelectedItem = selectedMotherboardObject; break;
                            case 'memory': currentSelectedItem = selectedRamObject; break;
                            case 'storage': currentSelectedItem = selectedStorageObject; break;
                            case 'videoCard': currentSelectedItem = selectedGpuObject; break;
                            case 'case': currentSelectedItem = selectedCaseObject; break;
                            case 'powerSupply': currentSelectedItem = selectedPsuObject; break;
                            case 'cpuCooler': currentSelectedItem = selectedCoolerObject; break;
                            default: const allOptionsForType = componentDataMap[key as keyof typeof componentDataMap] as BaseComponent[] ?? []; currentSelectedItem = allOptionsForType.find(item => item.name === currentSelection);
                        }

                        if (currentSelection && currentSelectedItem && !options.some(opt => opt.name === currentSelection)) {
                            options = [currentSelectedItem, ...options];
                        }

                        const isErrored = hasError(key);
                        const currentQuantity = key === 'memory' ? ramQuantity : key === 'storage' ? storageQuantity : 1;

                        // --- Special rendering for CPU slot ---
                        if (key === 'cpu') {
                            return (
                                 <div key={key} className={`grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-4 items-start bg-white p-4 rounded-lg shadow border ${isErrored ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}>
                                     {/* Column 1: CPU Selection */}
                                     <div className="space-y-3">
                                         <div>
                                             <label htmlFor="cpuBrand" className="block text-sm font-medium text-gray-700 mb-1">CPU Brand Filter</label>
                                             <select id="cpuBrand" name="cpuBrand" value={selectedCpuBrand} onChange={handleCpuBrandChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm">
                                                 <option value="">-- All Brands --</option>
                                                 <option value="Intel">Intel</option>
                                                 <option value="AMD">AMD</option>
                                             </select>
                                         </div>
                                         <div>
                                             <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                                                 {label} Model {filtered && <span className="text-xs text-indigo-600 ml-1">(Filtered)</span>}
                                             </label>
                                             <select id={key} name={key} value={currentSelection} onChange={(e) => handleSelection(key, e.target.value)} className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm ${isErrored ? 'border-red-400' : ''}`}>
                                                 <option value="">-- Select a {label} --</option>
                                                 {options.length === 0 && isAutoCompatEnabled && filterDependencyMet && (<option disabled>No compatible CPUs found</option>)}
                                                 {options.map((item: BaseComponent) => {
                                                      const nameIncludesBrand = item.brand && item.name.toLowerCase().startsWith(item.brand.toLowerCase() + ' ');
                                                      const nameString = !nameIncludesBrand && item.brand ? `${item.brand} ${item.name}` : item.name;
                                                      return (<option key={item.name} value={item.name}>{nameString}</option>);
                                                 })}
                                             </select>
                                         </div>
                                     </div>
                                     {/* Column 2: Price Display */}
                                      <div className="text-sm text-gray-700 text-right md:mt-0 mt-2 self-end pb-2">
                                          {currentSelectedItem?.price != null ? (<span className="font-medium text-gray-900">${currentSelectedItem.price.toFixed(2)}</span>)
                                           : currentSelection ? (<span className="text-gray-400">N/A</span>)
                                           : (<span className="text-gray-400">--</span>)}
                                      </div>
                                 </div>
                            );
                        }

                        // --- Default rendering for other slots ---
                        return (
                             <div key={key} className={`grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-x-4 items-center bg-white p-4 rounded-lg shadow border ${isErrored ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}>
                                 {/* Column 1: Label and Select */}
                                 <div>
                                     <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                                         {label} {filtered && <span className="text-xs text-indigo-600 ml-1">(Filtered)</span>}
                                     </label>
                                     <select id={key} name={key} value={currentSelection} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelection(key, e.target.value)} className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm ${isErrored ? 'border-red-400' : ''}`}>
                                         <option value="">-- Select a {label} --</option>
                                          {options.length === 0 && isAutoCompatEnabled && filterDependencyMet && (<option disabled>No compatible options found</option>)}
                                         {options.map((item: BaseComponent) => {
                                             const nameIncludesBrand = item.brand && item.name.toLowerCase().startsWith(item.brand.toLowerCase() + ' ');
                                             const nameString = !nameIncludesBrand && item.brand ? `${item.brand} ${item.name}` : item.name;
                                             return (<option key={item.name} value={item.name}>{nameString}</option>);
                                         })}
                                     </select>
                                 </div>

                                 {/* Column 2: Quantity Input (Conditional) */}
                                 <div className="md:mt-0 mt-2 self-end pb-1">
                                     {(key === 'memory' || key === 'storage') && currentSelection ? (
                                         <input type="number" min="1" value={currentQuantity} onChange={(e) => handleQuantityChange(key, e.target.value)} aria-label={`${label} Quantity`} className={`w-16 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm ${isErrored ? 'border-red-400' : ''}`} />
                                     ) : ( <div className="h-10"></div> )} {/* Placeholder for alignment */}
                                 </div>

                                 {/* Column 3: Price Display */}
                                 <div className="text-sm text-gray-700 text-right md:mt-0 mt-2 self-end pb-2">
                                      {currentSelectedItem?.price != null ? (<span className="font-medium text-gray-900">${currentSelectedItem.price.toFixed(2)}</span>)
                                       : currentSelection ? (<span className="text-gray-400">N/A</span>)
                                       : (<span className="text-gray-400">--</span>)}
                                 </div>
                             </div>
                        );
                    })}
                </div> {/* End Component Selection Area */}

                 {/* PDF Button at the bottom */}
                 <div className="mt-8 text-center">
                     <button
                          onClick={generatePdf}
                          disabled={Object.values(selections).every(val => !val)}
                          className="px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          Generate PDF
                      </button>
                 </div>

            </div> {/* End max-w-4xl */}
        </div> // End Root Div
    );
};

export default ComponentSimulator;
