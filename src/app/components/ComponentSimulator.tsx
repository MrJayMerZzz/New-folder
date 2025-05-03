"use client";

import React, { useState, useMemo, ChangeEvent } from "react";
import jsPDF from 'jspdf';
import {
    componentDataMap,
    ComponentTypeKey,
    CPU,
    Motherboard,
    RAM,
    GPU,
    PSU,
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
    { key: "powerSupply", label: "Power Supply" }
];

type SelectionsState = Partial<Record<ComponentTypeKey, string>>;

interface BaseComponent {
    name: string;
    brand?: string;
    price?: number | null;
    tdp?: number;
    wattage?: number;
    microarchitecture?: string;
    socket?: string;
    formFactor?: string;
    memorySlots?: number;
    modules?: number;
    ddrType?: 'DDR3' | 'DDR4' | 'DDR5';
    ramType?: Motherboard['ramType'];
    length?: number;
    supportedFormFactors?: string[];
    maxGpuLength?: number | null;
    maxCoolerHeight?: number | null;
    supportedSockets?: string[];
    height?: number | null;
    type?: 'Air' | 'Liquid' | string;
    radiatorSize?: number | null;
    supportedRadiatorLocations?: Case['supportedRadiatorLocations'];
    chipset?: string;
    memory?: number;
    coreClock?: number;
    boostClock?: number;
    color?: string;
}

const caseSupportsRadiator = (caseObj: Case | undefined, radiatorSize: number | null): boolean => {
    if (!caseObj?.supportedRadiatorLocations || radiatorSize == null) {
        return false;
    }
    const locations = caseObj.supportedRadiatorLocations;
    const topSupports = Array.isArray(locations.top) && locations.top.includes(radiatorSize);
    const frontSupports = Array.isArray(locations.front) && locations.front.includes(radiatorSize);
    const rearSupports = Array.isArray(locations.rear) && locations.rear.includes(radiatorSize);
    const sideSupports = Array.isArray(locations.side) && locations.side.includes(radiatorSize);
    const bottomSupports = Array.isArray(locations.bottom) && locations.bottom.includes(radiatorSize);
    return topSupports || frontSupports || rearSupports || sideSupports || bottomSupports;
};

const calculateRecommendedWattage = (
    cpu: CPU | undefined,
    gpu: GPU | undefined,
    ramModulesCount: number,
    storageQty: number
): number => {
    const cpuTdp = cpu?.tdp || 0;
    const gpuTdp = gpu?.tdp || 0;
    if (cpuTdp === 0 && gpuTdp === 0 && ramModulesCount === 0 && storageQty === 0) return 0;

    const cpuPeakMultiplier = 1.4;
    const gpuPeakMultiplier = 1.5;
    const ramStickWattage = 3;
    const storageDeviceWattage = 8;
    const motherboardBaseWattage = 50;
    const fansCoolingWattage = 25;
    const headroomFactor = 1.25;

    const estimatedPeakCpu = cpuTdp * cpuPeakMultiplier;
    const estimatedPeakGpu = gpuTdp * gpuPeakMultiplier;
    const estimatedRamWattage = ramModulesCount * ramStickWattage;
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
    const [selectedGpuBrand, setSelectedGpuBrand] = useState<string>("");
    const [isAutoCompatEnabled, setIsAutoCompatEnabled] = useState<boolean>(true);
    const [ramQuantity, setRamQuantity] = useState<number>(1);
    const [storageQuantity, setStorageQuantity] = useState<number>(1);

    const handleSelection = (field: ComponentTypeKey, value: string) => {
        setSelections((prev) => ({ ...prev, [field]: value }));
        // Removing these lines as requested to fix brand selection issue
        // if (field === 'cpu' && value === '') setSelectedCpuBrand('');
        // if (field === 'videoCard' && value === '') setSelectedGpuBrand('');
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
        handleSelection('cpu', ''); // Resets CPU *model* when brand changes
    };
    const handleGpuBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newBrand = event.target.value;
        setSelectedGpuBrand(newBrand);
        handleSelection('videoCard', ''); // Resets GPU *model* when brand changes
    };

    const selectedMotherboardObject = useMemo(() => {
        const list = componentDataMap?.motherboard as Motherboard[] | undefined;
        return list?.find(m => m.name === selections.motherboard);
    }, [selections.motherboard]);

    const selectedCpuObject = useMemo(() => {
        const list = componentDataMap?.cpu as CPU[] | undefined;
        return list?.find(c => c.name === selections.cpu);
    }, [selections.cpu]);

    const selectedCaseObject = useMemo(() => {
        const list = componentDataMap?.case as Case[] | undefined;
        return list?.find(c => c.name === selections.case);
    }, [selections.case]);

    const selectedRamObject = useMemo(() => {
        const list = componentDataMap?.memory as RAM[] | undefined;
        return list?.find(r => r.name === selections.memory);
    }, [selections.memory]);

    const selectedGpuObject = useMemo(() => {
        const list = componentDataMap?.videoCard as GPU[] | undefined;
        return list?.find(g => g.name === selections.videoCard);
    }, [selections.videoCard]);

    const selectedCoolerObject = useMemo(() => {
        const list = componentDataMap?.cpuCooler as CPUCooler[] | undefined;
        return list?.find(c => c.name === selections.cpuCooler);
    }, [selections.cpuCooler]);

    const selectedPsuObject = useMemo(() => {
        const list = componentDataMap?.powerSupply as PSU[] | undefined;
        return list?.find(p => p.name === selections.powerSupply);
    }, [selections.powerSupply]);

    const selectedStorageObject = useMemo(() => {
        const list = componentDataMap?.storage as StorageDevice[] | undefined;
        return list?.find(s => s.name === selections.storage);
    }, [selections.storage]);

     const recommendedWattage = useMemo(() => {
        const totalRamModules = selectedRamObject?.modules ? selectedRamObject.modules * ramQuantity : ramQuantity * 2;
        return calculateRecommendedWattage(
            selectedCpuObject,
            selectedGpuObject,
            totalRamModules,
            storageQuantity
        );
     }, [selectedCpuObject, selectedGpuObject, selectedRamObject, ramQuantity, storageQuantity]);
     const estimatedWattage = recommendedWattage;

     const totalPrice = useMemo(() => {
        let total = 0;
        const getPrice = (obj: { price?: number | null } | undefined) => obj?.price ?? 0;
        total += getPrice(selectedCpuObject);
        total += getPrice(selectedCoolerObject);
        total += getPrice(selectedMotherboardObject);
        total += getPrice(selectedGpuObject);
        total += getPrice(selectedCaseObject);
        total += getPrice(selectedPsuObject);
        total += getPrice(selectedRamObject) * ramQuantity;
        total += getPrice(selectedStorageObject) * storageQuantity;
        return total;
     }, [
        selectedCpuObject, selectedCoolerObject, selectedMotherboardObject,
        selectedRamObject, selectedStorageObject, selectedGpuObject,
        selectedCaseObject, selectedPsuObject,
        ramQuantity, storageQuantity
     ]);

    const filteredCpuOptions = useMemo(() => {
        const allCpus: CPU[] = (componentDataMap?.cpu as CPU[] | undefined) ?? [];
        let filtered = allCpus;
        if (selectedCpuBrand) {
            filtered = filtered.filter(cpu => cpu.brand === selectedCpuBrand);
        }
        if (isAutoCompatEnabled && selectedMotherboardObject?.socket) {
            filtered = filtered.filter(cpu => cpu.microarchitecture === selectedMotherboardObject.socket);
        }
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }, [selectedCpuBrand, isAutoCompatEnabled, selectedMotherboardObject]);

    const filteredMotherboardOptions = useMemo(() => {
        const allMotherboards: Motherboard[] = (componentDataMap?.motherboard as Motherboard[] | undefined) ?? [];
        let filtered = allMotherboards;
        if (isAutoCompatEnabled && selectedCpuObject?.microarchitecture) {
            filtered = filtered.filter(mobo => mobo.socket === selectedCpuObject.microarchitecture);
        }
        if (isAutoCompatEnabled && selectedCaseObject?.supportedFormFactors) {
            filtered = filtered.filter(mobo => mobo.formFactor && selectedCaseObject.supportedFormFactors.includes(mobo.formFactor));
        }
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }, [isAutoCompatEnabled, selectedCpuObject, selectedCaseObject]);

    const filteredRamOptions = useMemo(() => {
        const allRam: RAM[] = (componentDataMap?.memory as RAM[] | undefined) ?? [];
        let filtered = allRam;
        if (isAutoCompatEnabled && selectedMotherboardObject?.ramType) {
            filtered = filtered.filter(ram => ram.ddrType === selectedMotherboardObject.ramType);
        }
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }, [isAutoCompatEnabled, selectedMotherboardObject]);

    const filteredGpuOptions = useMemo(() => {
        const allGpus: GPU[] = (componentDataMap?.videoCard as GPU[] | undefined) ?? [];
        let filtered = allGpus;
        if (selectedGpuBrand) {
            filtered = filtered.filter(gpu => gpu.brand === selectedGpuBrand);
        }
        if (isAutoCompatEnabled && selectedCaseObject?.maxGpuLength != null) {
             filtered = filtered.filter(gpu => !gpu.length || gpu.length <= (selectedCaseObject.maxGpuLength ?? Infinity));
        }
        return filtered;
    }, [isAutoCompatEnabled, selectedCaseObject, selectedGpuBrand]);

    const filteredCaseOptions = useMemo(() => {
        const allCases: Case[] = (componentDataMap?.case as Case[] | undefined) ?? [];
        let filtered = allCases;
        if (isAutoCompatEnabled && selectedMotherboardObject?.formFactor) {
             filtered = filtered.filter(c => c.supportedFormFactors?.includes(selectedMotherboardObject.formFactor ?? ''));
        }
        if (isAutoCompatEnabled && selectedGpuObject?.length) {
            filtered = filtered.filter(c => c.maxGpuLength == null || c.maxGpuLength >= (selectedGpuObject.length ?? 0));
        }
         if (isAutoCompatEnabled && selectedCoolerObject?.type === 'Air' && selectedCoolerObject?.height != null) {
             filtered = filtered.filter(c => c.maxCoolerHeight == null || c.maxCoolerHeight >= (selectedCoolerObject.height ?? 0));
         }
         if (isAutoCompatEnabled && selectedCoolerObject?.type === 'Liquid' && selectedCoolerObject?.radiatorSize != null) {
             filtered = filtered.filter(c => caseSupportsRadiator(c, selectedCoolerObject.radiatorSize));
         }
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }, [isAutoCompatEnabled, selectedMotherboardObject, selectedGpuObject, selectedCoolerObject]);

    const filteredPowerSupplyOptions = useMemo(() => {
        const allPsus: PSU[] = (componentDataMap?.powerSupply as PSU[] | undefined) ?? [];
        let filtered = allPsus;
        if (isAutoCompatEnabled && recommendedWattage > 0) {
            filtered = allPsus.filter(psu => psu.wattage != null && psu.wattage >= recommendedWattage);
        }
        return filtered.sort((a, b) => (a.wattage ?? 0) - (b.wattage ?? 0) || a.name.localeCompare(b.name));
    }, [isAutoCompatEnabled, recommendedWattage]);

    const filteredCpuCoolerOptions = useMemo(() => {
        const allCoolers: CPUCooler[] = (componentDataMap?.cpuCooler as CPUCooler[] | undefined) ?? [];
        let filtered = allCoolers;
        const targetSocket = selectedCpuObject?.microarchitecture || selectedMotherboardObject?.socket;

        if (isAutoCompatEnabled && targetSocket) {
          filtered = filtered.filter(cooler => cooler.supportedSockets?.includes(targetSocket));
        }

        if (isAutoCompatEnabled && selectedCaseObject) {
            filtered = filtered.filter(cooler => {
                if (cooler.type === 'Air') {
                    return cooler.height == null || selectedCaseObject.maxCoolerHeight == null || cooler.height <= selectedCaseObject.maxCoolerHeight;
                }
                if (cooler.type === 'Liquid') {
                    return cooler.radiatorSize == null || caseSupportsRadiator(selectedCaseObject, cooler.radiatorSize);
                }
                return true;
            });
        }
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }, [isAutoCompatEnabled, selectedCpuObject, selectedMotherboardObject, selectedCaseObject]);

    const compatibilityIssues = useMemo(() => {
        const issues: { message: string; involvedKeys: ComponentTypeKey[] }[] = [];
         const cpuName = selectedCpuObject?.name ?? '';
         const cpuBrand = selectedCpuObject?.brand ?? '';
         const cpuSocket = selectedCpuObject?.microarchitecture;
         const moboName = selectedMotherboardObject?.name ?? '';
         const moboBrand = selectedMotherboardObject?.brand ?? '';
         const moboSocket = selectedMotherboardObject?.socket;
         const moboMemSlots = selectedMotherboardObject?.memorySlots;
         const moboRamType = selectedMotherboardObject?.ramType;
         const moboFormFactor = selectedMotherboardObject?.formFactor;
         const ramModules = selectedRamObject?.modules;
         const ramType = selectedRamObject?.ddrType;
         const gpuName = selectedGpuObject?.name ?? '';
         const gpuBrand = selectedGpuObject?.brand ?? '';
         const gpuLength = selectedGpuObject?.length;
         const caseName = selectedCaseObject?.name ?? '';
         const caseFactors = selectedCaseObject?.supportedFormFactors;
         const caseMaxGpu = selectedCaseObject?.maxGpuLength;
         const caseMaxCooler = selectedCaseObject?.maxCoolerHeight;
         const caseRadLocations = selectedCaseObject?.supportedRadiatorLocations;
         const coolerName = selectedCoolerObject?.name ?? '';
         const coolerType = selectedCoolerObject?.type;
         const coolerHeight = selectedCoolerObject?.height;
         const coolerRadSize = selectedCoolerObject?.radiatorSize;
         const coolerSockets = selectedCoolerObject?.supportedSockets;
         const psuName = selectedPsuObject?.name ?? '';
         const psuWattage = selectedPsuObject?.wattage;

         if (selectedCpuObject && selectedMotherboardObject && cpuSocket !== moboSocket) {
             issues.push({ message: `CPU (${cpuBrand} <span class="math-inline">\{cpuName\}\) socket \(<b\></span>{cpuSocket}</b>) doesn't match Motherboard (${moboBrand} <span class="math-inline">\{moboName\}\) socket \(<b\></span>{moboSocket}</b>).`, involvedKeys: ['cpu', 'motherboard'] });
         }
         if (ramModules && moboMemSlots && (ramModules * ramQuantity) > moboMemSlots) {
             issues.push({ message: `Selected RAM quantity (${ramQuantity} x <span class="math-inline">\{ramModules\} modules/kit \= <b\></span>{ramModules * ramQuantity}</b> total modules) exceeds motherboard slots (<b>${moboMemSlots}</b>).`, involvedKeys: ['memory', 'motherboard'] });
         }
         if (ramType && moboRamType && ramType !== moboRamType) {
             issues.push({ message: `RAM type (<b><span class="math-inline">\{ramType\}</b\>\) is incompatible with Motherboard supported type \(<b\></span>{moboRamType}</b>).`, involvedKeys: ['memory', 'motherboard'] });
         }
         if (moboFormFactor && caseFactors && !caseFactors.includes(moboFormFactor)) {
             issues.push({ message: `Motherboard form factor (<b><span class="math-inline">\{moboFormFactor\}</b\>\) may not fit in the Case \(</span>{caseName}). Supported: ${caseFactors.join(', ')}.`, involvedKeys: ['motherboard', 'case'] });
         }
         if (gpuLength && caseMaxGpu != null && gpuLength > caseMaxGpu) {
             issues.push({ message: `GPU (${gpuBrand} <span class="math-inline">\{gpuName\}\) length \(<b\></span>{gpuLength}mm</b>) exceeds Case maximum (<b>${caseMaxGpu}mm</b>).`, involvedKeys: ['videoCard', 'case'] });
         } else if (gpuLength && selectedCaseObject && caseMaxGpu === undefined) {
             issues.push({ message: `Note: Case (<span class="math-inline">\{caseName\}\) maximum GPU length is not specified\. Verify compatibility with GPU \(</span>{gpuName}, ${gpuLength}mm).`, involvedKeys: ['videoCard', 'case'] });
         }
         if (coolerType === 'Air' && coolerHeight != null && caseMaxCooler != null && coolerHeight > caseMaxCooler) {
             issues.push({ message: `CPU Cooler (<span class="math-inline">\{coolerName\}\) height \(<b\></span>{coolerHeight}mm</b>) exceeds Case maximum clearance (<b>${caseMaxCooler}mm</b>).`, involvedKeys: ['cpuCooler', 'case'] });
         } else if (coolerType === 'Air' && coolerHeight != null && selectedCaseObject && caseMaxCooler === undefined) {
             issues.push({ message: `Note: Case (<span class="math-inline">\{caseName\}\) maximum CPU cooler height is not specified\. Verify compatibility with CPU Cooler \(</span>{coolerName}, ${coolerHeight}mm).`, involvedKeys: ['cpuCooler', 'case'] });
         }
         if (coolerType === 'Liquid' && coolerRadSize != null && selectedCaseObject && !caseSupportsRadiator(selectedCaseObject, coolerRadSize)) {
             if (caseRadLocations !== undefined) {
                 issues.push({ message: `Case (<span class="math-inline">\{caseName\}\) does not appear to support the selected AIO cooler's radiator size \(<b\></span>{coolerRadSize}mm</b>). Check mounting options (Top, Front, Rear, etc.).`, involvedKeys: ['cpuCooler', 'case'] });
             } else {
                 issues.push({ message: `Note: Case (<span class="math-inline">\{caseName\}\) radiator support information is missing\. Verify compatibility with AIO Cooler \(</span>{coolerName}, ${coolerRadSize}mm).`, involvedKeys: ['cpuCooler', 'case'] });
             }
         }
         if (coolerSockets) {
             const targetSocket = cpuSocket || moboSocket;
             if (targetSocket && !coolerSockets.includes(targetSocket)) {
                 issues.push({ message: `CPU Cooler (<span class="math-inline">\{coolerName\}\) may not support the selected CPU/Motherboard socket \(<b\></span>{targetSocket}</b>). Supported: ${coolerSockets.join(', ')}.`, involvedKeys: ['cpuCooler', 'cpu', 'motherboard'] });
             }
         }
         if (recommendedWattage > 0 && psuWattage != null && psuWattage < recommendedWattage) {
             issues.push({ message: `Selected PSU (<span class="math-inline">\{psuName\}\) wattage \(<b\></span>{psuWattage}W</b>) is below the recommended level (~${recommendedWattage}W) for these components. Consider a higher wattage PSU for stability.`, involvedKeys: ['powerSupply', 'cpu', 'videoCard', 'memory', 'storage'] });
         }

        return issues;
    }, [
        selectedCpuObject, selectedMotherboardObject, selectedRamObject,
        selectedGpuObject, selectedPsuObject, selectedCaseObject,
        selectedCoolerObject, selectedStorageObject,
        ramQuantity, storageQuantity,
        recommendedWattage
    ]);

    const hasError = (componentKey: ComponentTypeKey): boolean => {
        return (compatibilityIssues || []).some(issue => issue.involvedKeys.includes(componentKey));
    };

     const generatePdf = () => {
          const doc = new jsPDF();
         const lineHeight = 7;
         const startX = 10;
         const pageHeight = doc.internal.pageSize.height;
         const marginBottom = 20;
         let currentY = 20;

         const addPageIfNeeded = () => {
             if (currentY > pageHeight - marginBottom) {
                 doc.addPage();
                 currentY = 20;
             }
         };

         doc.setFontSize(18);
         doc.text("PC Component Selection", startX, currentY);
         currentY += lineHeight * 1.5;
         addPageIfNeeded();

         doc.setFontSize(10);
         doc.text(`Generated on: ${new Date().toLocaleDateString()}`, startX, currentY);
         currentY += lineHeight * 1.5;
         addPageIfNeeded();

         doc.setFontSize(12);
         doc.setFont('helvetica', 'bold');
         doc.text("Selected Components:", startX, currentY);
         doc.setFont('helvetica', 'normal');
         currentY += lineHeight;
         addPageIfNeeded();

         const selectedItems = [
              { label: "CPU", obj: selectedCpuObject, qty: 1, key: 'cpu' as ComponentTypeKey },
              { label: "CPU Cooler", obj: selectedCoolerObject, qty: 1, key: 'cpuCooler' as ComponentTypeKey },
              { label: "Motherboard", obj: selectedMotherboardObject, qty: 1, key: 'motherboard' as ComponentTypeKey },
              { label: "Memory", obj: selectedRamObject, qty: ramQuantity, key: 'memory' as ComponentTypeKey },
              { label: "Storage", obj: selectedStorageObject, qty: storageQuantity, key: 'storage' as ComponentTypeKey },
              { label: "Video Card", obj: selectedGpuObject, qty: 1, key: 'videoCard' as ComponentTypeKey },
              { label: "Case", obj: selectedCaseObject, qty: 1, key: 'case' as ComponentTypeKey },
              { label: "Power Supply", obj: selectedPsuObject, qty: 1, key: 'powerSupply' as ComponentTypeKey },
         ];

         doc.setFontSize(10);
         selectedItems.forEach(({ label, obj, qty, key }) => {
             if (obj?.name && typeof obj.name === 'string' && obj.name.length > 0) {
                 const isItemErrored = hasError(key);
                 const price = obj.price ?? 0;
                 const linePrice = price * qty;
                 const priceString = price > 0 ? `$${price.toFixed(2)}` : 'N/A';
                 const linePriceString = linePrice > 0 ? `$${linePrice.toFixed(2)}` : '';
                 const quantityString = (label === 'Memory' || label === 'Storage') && qty > 1 ? ` (x${qty})` : '';
                 const itemName = obj.name;
                 let lineText = `${label}: <span class="math-inline">\{itemName\}</span>{quantityString} - Price: ${priceString}`;
                 if (linePriceString && quantityString) lineText += ` | Total: ${linePriceString}`;

                 let splitText: string | string[] = '';
                 try {
                     if (lineText) {
                         splitText = doc.splitTextToSize(lineText, 180);
                     } else {
                          console.warn(`PDF Gen: Empty lineText for ${label}: ${itemName}`);
                          splitText = [`${label}: ${itemName} - Error creating details line`];
                     }
                 } catch (splitError) {
                     console.error(`PDF Gen: Error during splitTextToSize for ${label}: ${itemName}`, splitError, { lineText });
                     splitText = [`${label}: ${itemName} - Error splitting text`];
                 }

                 addPageIfNeeded();

                 const textToDraw = (Array.isArray(splitText) && splitText.length > 0)
                                     ? splitText
                                     : (typeof splitText === 'string' && splitText.length > 0)
                                     ? [splitText]
                                     : null;

                 if (textToDraw) {
                     if (isItemErrored) {
                         console.log(`PDF Gen: Attempting to draw ERRORED item: ${label}`, { lineText, splitText, textToDraw });
                         doc.setTextColor(255, 0, 0);
                     }

                     try {
                         doc.text(textToDraw, startX, currentY);
                     } catch (textError) {
                          console.error(`PDF Gen: Error during doc.text for ${label}: ${itemName}`, textError, { textToDraw });
                          doc.setTextColor(255, 0, 0);
                          doc.text(`${label}: Error rendering details`, startX, currentY);
                     }

                     doc.setTextColor(0, 0, 0);

                     currentY += lineHeight * textToDraw.length;
                     currentY += lineHeight * 0.3;
                 } else {
                      console.error(`PDF Gen: Could not generate valid text array for ${label}: ${itemName}`, {lineText, splitText});
                      addPageIfNeeded();
                      doc.setTextColor(150, 150, 150);
                      doc.text(`${label}: --- Error displaying item ---`, startX, currentY);
                      doc.setTextColor(0, 0, 0);
                      currentY += lineHeight * 1.3;
                 }

             } else if (selections[key]) {
                  addPageIfNeeded();
                  doc.setTextColor(150, 150, 150);
                  doc.text(`${label}: ${selections[key]} (Data Object Not Found)`, startX, currentY);
                  doc.setTextColor(0, 0, 0);
                  currentY += lineHeight * 1.3;
             }
         });

         currentY += lineHeight * 0.7;
         addPageIfNeeded();
         doc.setLineWidth(0.5);
         doc.line(startX, currentY, 200, currentY);
         currentY += lineHeight;
         addPageIfNeeded();

         if (Array.isArray(compatibilityIssues) && compatibilityIssues.length > 0) {
             doc.setFontSize(11);
             doc.setFont('helvetica', 'bold');
             doc.setTextColor(200, 0, 0);
             doc.text("Potential Compatibility Issues:", startX, currentY);
             doc.setFont('helvetica', 'normal');
             currentY += lineHeight * 0.8;
             addPageIfNeeded();

             doc.setFontSize(9);
             doc.setTextColor(0, 0, 0);
             compatibilityIssues.forEach(issue => {
                 const message = (typeof issue?.message === 'string') ? issue.message.replace(/<\/?b>/g, '') : 'Unknown issue';
                 const splitIssueText = doc.splitTextToSize(`- ${message}`, 180);
                 addPageIfNeeded();
                 doc.text(Array.isArray(splitIssueText) ? splitIssueText : [splitIssueText], startX + 2, currentY);
                 currentY += lineHeight * (Array.isArray(splitIssueText) ? splitIssueText.length : 1) * 0.9;
             });
             currentY += lineHeight;
             addPageIfNeeded();
         }

         if (typeof recommendedWattage === 'number' && recommendedWattage > 0) {
             doc.setFontSize(10);
             doc.setFont('helvetica', 'bold');
             doc.text(`Recommended PSU Wattage: ~${recommendedWattage}W`, startX, currentY);
             currentY += lineHeight;
             addPageIfNeeded();
             doc.setFont('helvetica', 'normal');
         }

         if (typeof totalPrice === 'number' && totalPrice > 0) {
             doc.setFontSize(10);
             doc.setFont('helvetica', 'bold');
             doc.text(`Estimated Total Price: $${totalPrice.toFixed(2)}`, startX, currentY);
             currentY += lineHeight;
             addPageIfNeeded();
             doc.setFont('helvetica', 'normal');
         }

         currentY += lineHeight * 0.5;
         addPageIfNeeded();
         doc.setFontSize(8);
         doc.setTextColor(100);
         doc.text("Note: Prices are estimates and may vary. Wattage is an estimate; check manufacturer recommendations.", startX, currentY);
         doc.setTextColor(0);

         doc.save("pc-build-list.pdf");
    };


    // --- Rendering ---
    return (
        // REMOVED dark mode classes from root div
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-gray-800 font-sans">
            {/* Main Content Container */}
            <div className="max-w-5xl mx-auto space-y-6">
                {/* REMOVED dark mode classes from h1 */}
                <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">PC Part Picker Simulator</h1>

                 {/* Compatibility & Wattage Bar - Sticky */}
                  <div className={`p-4 rounded-lg mb-6 border text-sm shadow sticky top-0 z-10 bg-gray-100/90 backdrop-blur-sm ${
                       compatibilityIssues.length > 0
                           ? 'border-red-300 text-red-800 bg-red-50/90'
                           : (selectedCpuObject || selectedGpuObject)
                           ? 'border-green-300 text-green-800 bg-green-50/90'
                           : 'border-blue-300 text-blue-800 bg-blue-50/90'
                     }`}
                     role="alert"
                  >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                              <span className="font-semibold">System Status:</span>{' '}
                              {compatibilityIssues.length > 0
                                  ? <>Found <b>{compatibilityIssues.length}</b> potential compatibility issue(s).</>
                                  : (selectedCpuObject || selectedGpuObject || selectedMotherboardObject || selectedCaseObject || selectedPsuObject || selectedCoolerObject || selectedRamObject || selectedStorageObject)
                                  ? 'Selected components are compatible.'
                                  : 'Select components to check compatibility.'}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-right self-end sm:self-center">
                               {(selectedCpuObject || selectedGpuObject) ? (
                                   <span className="font-semibold whitespace-nowrap">Rec. Wattage: ~{estimatedWattage}W</span>
                               ) : null}
                               {totalPrice > 0 && ( <span className="font-semibold whitespace-nowrap">Total Price: ${totalPrice.toFixed(2)}</span> )}
                          </div>
                      </div>
                      {compatibilityIssues.length > 0 && (
                         <ul className="list-disc pl-5 mt-2 space-y-1 border-t border-red-200 pt-2">
                             {compatibilityIssues.map((issue, index) => (
                                 <li key={index} dangerouslySetInnerHTML={{ __html: issue.message }} />
                             ))}
                         </ul>
                      )}
                  </div>


                {/* Controls Area - NOT Sticky */}
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-end gap-4 mb-4 border border-gray-200">
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
                            case 'videoCard': options = filteredGpuOptions; filterDependencyMet = selectedCaseObject?.maxGpuLength != null || !!selectedGpuBrand; filtered = isAutoCompatEnabled && (filterDependencyMet || !!selectedGpuBrand); break;
                            case 'case': options = filteredCaseOptions; filterDependencyMet = !!selectedMotherboardObject?.formFactor || selectedGpuObject?.length != null || selectedCoolerObject?.height != null || selectedCoolerObject?.radiatorSize != null; filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            case 'powerSupply': options = filteredPowerSupplyOptions; filterDependencyMet = recommendedWattage > 0; filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            case 'cpuCooler': options = filteredCpuCoolerOptions; filterDependencyMet = !!(selectedCpuObject?.microarchitecture || selectedMotherboardObject?.socket || selectedCaseObject?.maxCoolerHeight != null || selectedCaseObject?.supportedRadiatorLocations); filtered = isAutoCompatEnabled && filterDependencyMet; break;
                            default: options = (componentDataMap[key as keyof typeof componentDataMap] as BaseComponent[] | undefined) ?? []; break;
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
                             default: const allOptionsForType = (componentDataMap[key as keyof typeof componentDataMap] as BaseComponent[] | undefined) ?? []; currentSelectedItem = allOptionsForType.find(item => item.name === currentSelection);
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
                                      <div className="space-y-3">
                                          <div>
                                              <label htmlFor="cpuBrand" className="block text-sm font-medium text-gray-700 mb-1">CPU Brand Filter</label>
                                              <select id="cpuBrand" name="cpuBrand" value={selectedCpuBrand} onChange={handleCpuBrandChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                                                  <option value="">-- All Brands --</option>
                                                  <option value="Intel">Intel</option>
                                                  <option value="AMD">AMD</option>
                                              </select>
                                          </div>
                                          <div>
                                              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                                                  {label} Model {filtered && <span className="text-xs text-indigo-600 ml-1">(Filtered)</span>}
                                              </label>
                                              <select id={key} name={key} value={currentSelection} onChange={(e) => handleSelection(key, e.target.value)} className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm ${isErrored ? 'border-red-400' : ''}`}>
                                                   <option value="">-- Select a {label} --</option>
                                                   {options.length === 0 && isAutoCompatEnabled && filterDependencyMet && (<option disabled>No compatible CPUs found</option>)}
                                                   {options.map((item) => (
                                                        <option key={item.name} value={item.name}>{item.name}</option>
                                                   ))}
                                              </select>
                                          </div>
                                      </div>
                                       <div className="text-sm text-gray-700 text-right md:mt-0 mt-2 self-end pb-2">
                                           {currentSelectedItem?.price != null ? (<span className="font-medium text-gray-900">${currentSelectedItem.price.toFixed(2)}</span>)
                                           : currentSelection ? (<span className="text-gray-400">N/A</span>)
                                           : (<span className="text-gray-400">--</span>)}
                                       </div>
                                 </div>
                            );
                        }

                        // --- Special rendering for GPU slot ---
                        if (key === 'videoCard') {
                             return (
                                 <div key={key} className={`grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-x-4 items-start bg-white p-4 rounded-lg shadow border ${isErrored ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}>
                                      <div className="space-y-3">
                                          <div>
                                              <label htmlFor="gpuBrand" className="block text-sm font-medium text-gray-700 mb-1">GPU Brand Filter</label>
                                              <select id="gpuBrand" name="gpuBrand" value={selectedGpuBrand} onChange={handleGpuBrandChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                                                  <option value="">-- All Brands --</option>
                                                  <option value="NVIDIA">NVIDIA</option>
                                                  <option value="AMD">AMD</option>
                                                  <option value="Intel">Intel</option>
                                              </select>
                                          </div>
                                          <div>
                                              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                                                  {label} Model {filtered && <span className="text-xs text-indigo-600 ml-1">(Filtered)</span>}
                                              </label>
                                              <select id={key} name={key} value={currentSelection} onChange={(e) => handleSelection(key, e.target.value)} className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm ${isErrored ? 'border-red-400' : ''}`}>
                                                   <option value="">-- Select a {label} --</option>
                                                   {options.length === 0 && isAutoCompatEnabled && filterDependencyMet && (<option disabled>No compatible GPUs found</option>)}
                                                   {options.map((item) => (
                                                        <option key={item.name} value={item.name}>{item.name}</option>
                                                   ))}
                                              </select>
                                          </div>
                                      </div>
                                      <div className="h-10 self-end pb-1"></div>
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
                                     <select id={key} name={key} value={currentSelection} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelection(key, e.target.value)} className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm ${isErrored ? 'border-red-400' : ''}`}>
                                         <option value="">-- Select a {label} --</option>
                                         {options.length === 0 && isAutoCompatEnabled && filterDependencyMet && (<option disabled>No compatible options found</option>)}
                                         {options.map((item) => (
                                              <option key={item.name} value={item.name}>{item.name}</option>
                                         ))}
                                     </select>
                                 </div>

                                 {/* Column 2: Quantity Input (Conditional) */}
                                 <div className="md:mt-0 mt-2 self-end pb-1">
                                     {(key === 'memory' || key === 'storage') && currentSelection ? (
                                         <input
                                             type="number"
                                             min="1"
                                             step="1"
                                             value={currentQuantity}
                                             onChange={(e) => handleQuantityChange(key, e.target.value)}
                                             aria-label={`${label} Quantity`}
                                             className={`w-16 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm ${isErrored ? 'border-red-400' : ''}`}
                                         />
                                     ) : ( <div className="h-10"></div> )}
                                 </div>

                                 {/* Column 3: Price Display */}
                                 <div className="text-sm text-gray-700 text-right md:mt-0 mt-2 self-end pb-2">
                                      {currentSelectedItem?.price != null ? (
                                          <span className="font-medium text-gray-900">
                                              ${currentSelectedItem.price.toFixed(2)}
                                          </span>
                                      ) : currentSelection ? (
                                          <span className="text-gray-400">N/A</span>
                                      ) : (
                                          <span className="text-gray-400">--</span>
                                      )}
                                 </div>
                             </div>
                        );
                    })}
                </div> {/* End Component Selection Area */}

                 {/* --- BUTTON MOVED HERE --- */}
                 <div className="mt-8 text-center">
                    <button
                         onClick={generatePdf}
                         disabled={Object.values(selections).every(val => !val)}
                         className="px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                         Generate PDF List
                    </button>
                 </div>
                 {/* --- END BUTTON MOVE --- */}

            </div> {/* End Main Content Container */}
        </div> // End Root Div
    );
};

export default ComponentSimulator;