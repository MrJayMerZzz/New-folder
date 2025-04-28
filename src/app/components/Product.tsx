// components/ProductPage.tsx
"use client";

import React, { useState, useMemo, ChangeEvent, useEffect } from 'react';
// Import the data map and necessary types from your updated data structure
import {
    componentDataMap,
    ComponentTypeKey, // Use the key type from data.ts
    AnyComponent,     // Use the union type from data.ts
    CPU, GPU, RAM, Motherboard, StorageDevice, PSU, Case, CPUCooler // Import individual types
} from '../constants/data'; // Adjust path as necessary

// --- Configuration for Each Product Type ---

interface TableColumn<T extends AnyComponent> {
    key: keyof T | string;
    label: string;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
}

interface ProductFilters {
    showBrand?: boolean;
    showCoreCount?: boolean;
    showBaseClock?: boolean;
    showBoostClock?: boolean;
    showMemorySize?: boolean;
    showRamSpeed?: boolean;
    showCasLatency?: boolean;
    showWattage?: boolean;
    showFormFactor?: boolean;
    showSocket?: boolean;
    showChipset?: boolean;
    showRamType?: boolean;
    showMemoryProfile?: boolean;
    showStorageType?: boolean;
    showStorageCapacity?: boolean;
}

interface ProductConfig<T extends AnyComponent> {
    dataKey: ComponentTypeKey;
    columns: TableColumn<T>[];
    filters: ProductFilters;
    getSortableKeys: () => (keyof T | string)[];
    getBrand: (item: T) => string | undefined;
    getName: (item: T) => string;
    getPrice: (item: T) => number | null | undefined;
    getCoreCount?: (item: T) => number | null | undefined;
    getBaseClock?: (item: T) => number | null | undefined;
    getBoostClock?: (item: T) => number | null | undefined;
    getMemorySize?: (item: T) => number | null | undefined;
    getRamSpeed?: (item: T) => number | null | undefined;
    getCasLatency?: (item: T) => number | null | undefined;
    getWattage?: (item: T) => number | null | undefined;
    getFormFactor?: (item: T) => string | undefined;
    getSocket?: (item: T) => string | undefined;
    getChipset?: (item: T) => string | undefined;
    getRamType?: (item: T) => string | undefined;
    getMemoryProfileSupport?: (item: T) => string;
    getStorageType?: (item: T) => string | undefined;
    getStorageCapacity?: (item: T) => number | null | undefined;
}

// --- Configuration Map ---
const productConfigurations: { [key in ComponentTypeKey]?: ProductConfig<any> } = {
    cpu: { /* ... CPU Config ... */
        dataKey: 'cpu',
        getBrand: (item: CPU) => item.brand,
        getName: (item: CPU) => `${item.brand} ${item.name}`,
        getPrice: (item: CPU) => item.price,
        getCoreCount: (item: CPU) => item.coreCount,
        getBaseClock: (item: CPU) => item.performanceCoreClock,
        getBoostClock: (item: CPU) => item.performanceCoreBoostClock,
        getSocket: (item: CPU) => item.microarchitecture,
        columns: [ { key: 'name', label: 'Name', align: 'left', sortable: true, render: (item: CPU) => <span className="font-medium text-gray-900">{productConfigurations.cpu?.getName(item)}</span> }, { key: 'coreCount', label: 'Cores', align: 'center', sortable: true }, { key: 'performanceCoreClock', label: 'Base Clock (GHz)', align: 'right', sortable: true, render: (item: CPU) => item.performanceCoreClock ? `${item.performanceCoreClock.toFixed(1)}` : '-' }, { key: 'performanceCoreBoostClock', label: 'Boost Clock (GHz)', align: 'right', sortable: true, render: (item: CPU) => item.performanceCoreBoostClock ? `${item.performanceCoreBoostClock.toFixed(1)}` : '-' }, { key: 'microarchitecture', label: 'Socket', align: 'left', sortable: true }, { key: 'tdp', label: 'TDP (W)', align: 'right', sortable: true, render: (item: CPU) => item.tdp ? `${item.tdp}` : '-' }, { key: 'integratedGraphics', label: 'iGPU', align: 'left', sortable: false, render: (item: CPU) => item.integratedGraphics === true ? (item.brand === 'Intel' ? 'Intel UHD/Graphics' : 'Radeon') : (item.integratedGraphics === false ? 'None' : 'N/A') }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: CPU) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true, showCoreCount: true, showBaseClock: true, showBoostClock: true, showSocket: true, },
        getSortableKeys: () => ['name', 'coreCount', 'performanceCoreClock', 'performanceCoreBoostClock', 'microarchitecture', 'tdp', 'price'],
     },
    videoCard: { /* ... GPU Config ... */
        dataKey: 'videoCard',
        getBrand: (item: GPU) => item.brand,
        getName: (item: GPU) => item.name,
        getPrice: (item: GPU) => item.price,
        getBaseClock: (item: GPU) => item.coreClock,
        getBoostClock: (item: GPU) => item.boostClock,
        getMemorySize: (item: GPU) => item.memory,
        columns: [ { key: 'name', label: 'Name', align: 'left', sortable: true, render: (item: GPU) => <span className="font-medium text-gray-900">{item.name}</span> }, { key: 'chipset', label: 'Chipset', align: 'left', sortable: true }, { key: 'memory', label: 'Memory (GB)', align: 'right', sortable: true, render: (item: GPU) => `${item.memory}` }, { key: 'coreClock', label: 'Core Clock (MHz)', align: 'right', sortable: true, render: (item: GPU) => item.coreClock ? `${item.coreClock}` : '-' }, { key: 'boostClock', label: 'Boost Clock (MHz)', align: 'right', sortable: true, render: (item: GPU) => item.boostClock ? `${item.boostClock}` : '-' }, { key: 'tdp', label: 'TDP (W)', align: 'right', sortable: true, render: (item: GPU) => item.tdp ? `${item.tdp}` : '-' }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: GPU) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, { key: 'length', label: 'Length (mm)', align: 'right', sortable: true, render: (item: GPU) => item.length ? `${item.length}` : '-' }, ],
        filters: { showBrand: true, showBaseClock: false, showBoostClock: false, showMemorySize: true, },
        getSortableKeys: () => ['name', 'chipset', 'memory', 'coreClock', 'boostClock', 'tdp', 'price', 'length'],
    },
    memory: { /* ... RAM Config ... */
        dataKey: 'memory',
        getBrand: (item: RAM) => item.brand,
        getName: (item: RAM) => item.name,
        getPrice: (item: RAM) => item.price,
        getMemorySize: (item: RAM) => item.sizeGB,
        getRamSpeed: (item: RAM) => item.speed,
        getCasLatency: (item: RAM) => item.casLatency,
        getMemoryProfileSupport: (item: RAM) => { const profiles: string[] = []; if (item.supportsXMP) profiles.push('XMP'); if (item.supportsEXPO) profiles.push('EXPO'); return profiles.length > 0 ? profiles.join(' & ') : 'None'; },
        columns: [ { key: 'name', label: 'Name', align: 'left', sortable: true, render: (item: RAM) => <span className="font-medium text-gray-900">{item.name}</span> }, { key: 'speed', label: 'Speed (MHz)', align: 'right', sortable: true, render: (item: RAM) => `${item.ddrType}-${item.speed}` }, { key: 'modules', label: 'Modules', align: 'center', sortable: true, render: (item: RAM) => `${item.modules}x${item.sizeGB / item.modules} GB` }, { key: 'casLatency', label: 'CL', align: 'center', sortable: true }, { key: 'firstWordLatency', label: 'Latency (ns)', align: 'right', sortable: true, render: (item: RAM) => item.firstWordLatency.toFixed(2) }, { key: 'memoryProfile', label: 'Mem Profile', align: 'center', sortable: true, render: (item: RAM) => productConfigurations.memory?.getMemoryProfileSupport?.(item) ?? 'N/A' }, { key: 'pricePerGB', label: 'Price/GB', align: 'right', sortable: true, render: (item: RAM) => item.pricePerGB != null ? `$${item.pricePerGB.toFixed(2)}` : '-' }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: RAM) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, { key: 'rgb', label: 'RGB', align: 'center', sortable: false, render: (item: RAM) => item.rgb ? 'Yes' : 'No' }, ],
        filters: { showMemorySize: true, showRamSpeed: true, showCasLatency: true, showMemoryProfile: true, },
        getSortableKeys: () => ['name', 'speed', 'modules', 'casLatency', 'firstWordLatency', 'memoryProfile', 'pricePerGB', 'price'],
    },
    motherboard: { /* ... Motherboard Config ... */
        dataKey: 'motherboard',
        getBrand: (item: Motherboard) => item.brand,
        getName: (item: Motherboard) => item.name,
        getPrice: (item: Motherboard) => item.price,
        getSocket: (item: Motherboard) => item.socket,
        getFormFactor: (item: Motherboard) => item.formFactor,
        getChipset: (item: Motherboard) => item.chipset,
        getRamType: (item: Motherboard) => item.ramType,
        getMemoryProfileSupport: (item: Motherboard) => { const profiles: string[] = []; if (item.supportsXMP) profiles.push('XMP'); if (item.supportsEXPO) profiles.push('EXPO'); return profiles.length > 0 ? profiles.join(' & ') : 'None'; },
        columns: [ { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: Motherboard) => <span className="font-medium text-gray-900">{`${item.brand} ${item.name}`}</span> }, { key: 'socket', label: 'Socket', align: 'left', sortable: true }, { key: 'chipset', label: 'Chipset', align: 'left', sortable: true }, { key: 'formFactor', label: 'Form Factor', align: 'left', sortable: true }, { key: 'ramType', label: 'RAM Type', align: 'center', sortable: true }, { key: 'memorySlots', label: 'RAM Slots', align: 'center', sortable: true }, { key: 'memoryMax', label: 'Max RAM (GB)', align: 'right', sortable: true }, { key: 'memoryProfile', label: 'Mem Profile', align: 'center', sortable: true, render: (item: Motherboard) => productConfigurations.motherboard?.getMemoryProfileSupport?.(item) ?? 'N/A' }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: Motherboard) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true, showSocket: true, showFormFactor: true, showChipset: true, showRamType: true, showMemoryProfile: true },
        getSortableKeys: () => ['brandAndName', 'socket', 'chipset', 'formFactor', 'ramType', 'memorySlots', 'memoryMax', 'memoryProfile', 'price'],
    },
    case: { /* ... Case Config ... */
        dataKey: 'case',
        getBrand: (item: Case) => item.brand,
        getName: (item: Case) => item.name,
        getPrice: (item: Case) => item.price,
        getFormFactor: (item: Case) => item.type,
        columns: [ { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: Case) => <span className="font-medium text-gray-900">{`${item.brand} ${item.name}`}</span> }, { key: 'type', label: 'Type', align: 'left', sortable: true }, { key: 'color', label: 'Color', align: 'left', sortable: true }, { key: 'sidePanel', label: 'Side Panel', align: 'left', sortable: true }, { key: 'maxGpuLength', label: 'Max GPU (mm)', align: 'right', sortable: true, render: (item: Case) => item.maxGpuLength ?? '-' }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: Case) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true, showFormFactor: true, },
        getSortableKeys: () => ['brandAndName', 'type', 'color', 'sidePanel', 'maxGpuLength', 'price'],
    },
    powerSupply: { /* ... PSU Config ... */
        dataKey: 'powerSupply',
        getBrand: (item: PSU) => item.brand,
        getName: (item: PSU) => item.name,
        getPrice: (item: PSU) => item.price,
        getWattage: (item: PSU) => item.wattage,
        columns: [ { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: PSU) => <span className="font-medium text-gray-900">{`${item.brand} ${item.name}`}</span> }, { key: 'wattage', label: 'Wattage (W)', align: 'right', sortable: true }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: PSU) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true, showWattage: true, },
        getSortableKeys: () => ['brandAndName', 'wattage', 'price'],
    },
    cpuCooler: { /* ... CPU Cooler Config ... */
        dataKey: 'cpuCooler',
        getBrand: (item: CPUCooler) => item.brand,
        getName: (item: CPUCooler) => item.name,
        getPrice: (item: CPUCooler) => item.price,
        columns: [ { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: CPUCooler) => <span className="font-medium text-gray-900">{`${item.brand} ${item.name}`}</span> }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: CPUCooler) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true, },
        getSortableKeys: () => ['brandAndName', 'price'],
    },
    storage: { /* ... Storage Config ... */
        dataKey: 'storage',
        getBrand: (item: StorageDevice) => item.brand,
        getName: (item: StorageDevice) => item.name,
        getPrice: (item: StorageDevice) => item.price,
        getStorageCapacity: (item: StorageDevice) => item.capacityGB,
        getStorageType: (item: StorageDevice) => item.type,
        columns: [ { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: StorageDevice) => <span className="font-medium text-gray-900">{`${item.brand} ${item.name}`}</span> }, { key: 'type', label: 'Type', align: 'left', sortable: true }, { key: 'capacityGB', label: 'Capacity (GB)', align: 'right', sortable: true }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: StorageDevice) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true, showStorageType: true, showStorageCapacity: true, },
        getSortableKeys: () => ['brandAndName', 'type', 'capacityGB', 'price'],
    },
};

const availableProductTypes = Object.keys(componentDataMap) as ComponentTypeKey[];
type SortableKey<T extends AnyComponent> = keyof T | string;

// Define common values for checkbox filters
const COMMON_CPU_CORES = [2, 4, 6, 8, 10, 12, 16, 24, 32, 64];
const COMMON_CPU_CLOCKS = ["< 3.0", "3.0-3.9", "4.0-4.9", ">= 5.0"];
const COMMON_GPU_MEMORIES = [4, 6, 8, 10, 12, 16, 20, 24, 32];
const COMMON_PSU_WATTAGES = [300, 450, 550, 650, 750, 850, 1000, 1200, 1600];
const COMMON_RAM_SIZES = [8, 16, 32, 48, 64, 96, 128];
const COMMON_RAM_SPEEDS = [2400, 2666, 3000, 3200, 3600, 4800, 5200, 5600, 6000, 6400, 7200, 8000];
const COMMON_CAS_LATENCIES = [9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 22, 28, 30, 32, 34, 36, 38, 40, 42, 46];
const COMMON_STORAGE_CAPACITIES = [120, 250, 500, 1000, 2000, 4000, 8000, 16000];

const ProductPage: React.FC = () => {
    const [selectedProductType, setSelectedProductType] = useState<ComponentTypeKey>(availableProductTypes[0] || 'cpu');
    const currentConfig = useMemo(() => productConfigurations[selectedProductType] as ProductConfig<AnyComponent> | undefined, [selectedProductType]);
    const originalProducts = useMemo(() => currentConfig ? (componentDataMap[currentConfig.dataKey] as AnyComponent[]) || [] : [], [currentConfig]);

    // --- Filter States ---
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedSockets, setSelectedSockets] = useState<string[]>([]);
    const [selectedChipsets, setSelectedChipsets] = useState<string[]>([]);
    const [selectedFormFactors, setSelectedFormFactors] = useState<string[]>([]);
    const [selectedRamTypes, setSelectedRamTypes] = useState<string[]>([]);
    const [selectedMemoryProfiles, setSelectedMemoryProfiles] = useState<string[]>([]);
    const [selectedStorageTypes, setSelectedStorageTypes] = useState<string[]>([]);
    // Checkbox states
    const [selectedCpuCores, setSelectedCpuCores] = useState<number[]>([]);
    const [selectedCpuClockRanges, setSelectedCpuClockRanges] = useState<string[]>([]);
    const [selectedGpuMemories, setSelectedGpuMemories] = useState<number[]>([]);
    const [selectedPsuWattages, setSelectedPsuWattages] = useState<number[]>([]);
    const [selectedMemorySizes, setSelectedMemorySizes] = useState<number[]>([]);
    const [selectedRamSpeeds, setSelectedRamSpeeds] = useState<number[]>([]);
    const [selectedCasLatencies, setSelectedCasLatencies] = useState<number[]>([]);
    const [selectedStorageCapacities, setSelectedStorageCapacities] = useState<number[]>([]);

    // --- Sorting State ---
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // --- Calculate Data Ranges (REMOVED - No longer needed for ranges) ---
    // const dataRanges = useMemo(() => { ... }, []);

    // Effect to initialize/reset filter states
    useEffect(() => {
        // Reset all checkbox states
        setSelectedBrands([]); setSelectedSockets([]); setSelectedChipsets([]); setSelectedFormFactors([]);
        setSelectedRamTypes([]); setSelectedMemoryProfiles([]); setSelectedStorageTypes([]);
        setSelectedCpuCores([]); setSelectedCpuClockRanges([]); setSelectedGpuMemories([]); setSelectedPsuWattages([]);
        setSelectedMemorySizes([]); setSelectedRamSpeeds([]); setSelectedCasLatencies([]);
        setSelectedStorageCapacities([]);
        // Reset sort
        setSortColumn(null); setSortDirection('asc');
    }, [selectedProductType]); // Depend only on selectedProductType

    // --- Event Handlers ---
    const handleSort = (columnKey: string) => {
        if (!currentConfig?.columns.find(c => c.key === columnKey)?.sortable) return;
        if (sortColumn === columnKey) { setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc'); }
        else { setSortColumn(columnKey); setSortDirection('asc'); }
    };
    const handleMultiSelectChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        const { value, checked } = e.target;
        setter(prev => checked ? [...prev, value] : prev.filter(v => v !== value));
    };
    const handleMultiSelectNumberChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number[]>>) => {
        const value = Number(e.target.value);
        const isChecked = e.target.checked;
        setter(prevSelected => isChecked ? [...prevSelected, value] : prevSelected.filter(v => v !== value));
    };
    const handleProductTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedProductType(event.target.value as ComponentTypeKey);
    };

    // --- Derived Data (Unique values for checkbox filters) ---
    const uniqueBrands = useMemo(() => {
        if (!currentConfig || !originalProducts) return [];
        const brands = new Set(originalProducts.map(p => currentConfig.getBrand(p)).filter(Boolean));
        return Array.from(brands).sort();
    }, [originalProducts, currentConfig]);
    const uniqueSockets = useMemo(() => {
        if (!currentConfig?.getSocket || !originalProducts) return [];
        const sockets = new Set(originalProducts.map(p => currentConfig.getSocket!(p)).filter(Boolean));
        return Array.from(sockets).sort();
    }, [originalProducts, currentConfig]);
    const uniqueFormFactors = useMemo(() => {
        if (!currentConfig?.getFormFactor || !originalProducts) return [];
        const factors = new Set(originalProducts.map(p => currentConfig.getFormFactor!(p)).filter(Boolean));
        return Array.from(factors).sort();
    }, [originalProducts, currentConfig]);
    const uniqueStorageTypes = useMemo(() => {
        if (!currentConfig?.getStorageType || !originalProducts) return [];
        const types = new Set(originalProducts.map(p => currentConfig.getStorageType!(p)).filter(Boolean));
        return Array.from(types).sort();
    }, [originalProducts, currentConfig]);
    const uniqueChipsets = useMemo(() => {
        if (!currentConfig?.getChipset || !originalProducts) return [];
        const chipsets = new Set(originalProducts.map(p => currentConfig.getChipset!(p)).filter(Boolean));
        return Array.from(chipsets).sort();
    }, [originalProducts, currentConfig]);
     const uniqueRamTypes = useMemo(() => {
        if (!currentConfig?.getRamType || !originalProducts) return [];
        const types = new Set(originalProducts.map(p => currentConfig.getRamType!(p)).filter(Boolean));
        return Array.from(types).sort();
    }, [originalProducts, currentConfig]);
    const uniqueMemoryProfiles = useMemo(() => {
        if (!currentConfig?.getMemoryProfileSupport || !originalProducts) return [];
        const profiles = new Set( originalProducts .map(p => currentConfig.getMemoryProfileSupport!(p)) .filter(Boolean) .flatMap(profileString => profileString.split(' & ')) .map(p => p.trim()) .filter(p => p !== 'None') );
        return Array.from(profiles).sort();
    }, [originalProducts, currentConfig]);


    // --- Filtering Logic ---
    const processedProducts = useMemo(() => {
        if (!currentConfig || !originalProducts) return [];
        let filtered = originalProducts.filter(product => {
            const brandMatch = !currentConfig.filters.showBrand || selectedBrands.length === 0 || selectedBrands.includes(currentConfig.getBrand(product) ?? '');
            const socketMatch = !currentConfig.filters.showSocket || selectedSockets.length === 0 || (currentConfig.getSocket && selectedSockets.includes(currentConfig.getSocket(product) ?? ''));
            const formFactorMatch = !currentConfig.filters.showFormFactor || selectedFormFactors.length === 0 || (currentConfig.getFormFactor && selectedFormFactors.includes(currentConfig.getFormFactor(product) ?? ''));
            const storageTypeMatch = !currentConfig.filters.showStorageType || selectedStorageTypes.length === 0 || (currentConfig.getStorageType && selectedStorageTypes.includes(currentConfig.getStorageType(product) ?? ''));
            const chipsetMatch = !currentConfig.filters.showChipset || selectedChipsets.length === 0 || (currentConfig.getChipset && selectedChipsets.includes(currentConfig.getChipset(product) ?? ''));
            const ramTypeMatch = !currentConfig.filters.showRamType || selectedRamTypes.length === 0 || (currentConfig.getRamType && selectedRamTypes.includes(currentConfig.getRamType(product) ?? ''));
            const memoryProfileMatch = !currentConfig.filters.showMemoryProfile || selectedMemoryProfiles.length === 0 || (currentConfig.getMemoryProfileSupport && ((supportedProfilesStr) => { if (!supportedProfilesStr || supportedProfilesStr === 'None') return false; const supportedProfiles = supportedProfilesStr.split(' & ').map(p=>p.trim()); return selectedMemoryProfiles.some(selectedProfile => supportedProfiles.includes(selectedProfile)); })(currentConfig.getMemoryProfileSupport(product)));

            // --- Checkbox Filter Logic ---
            const cpuCoreMatch = !currentConfig.filters.showCoreCount || selectedCpuCores.length === 0 || (currentConfig.getCoreCount && selectedCpuCores.includes(currentConfig.getCoreCount(product) ?? -1));
            const gpuMemoryMatch = !currentConfig.filters.showMemorySize || selectedGpuMemories.length === 0 || (currentConfig.getMemorySize && selectedGpuMemories.includes(currentConfig.getMemorySize(product) ?? -1));
            const psuWattageMatch = !currentConfig.filters.showWattage || selectedPsuWattages.length === 0 || (currentConfig.getWattage && selectedPsuWattages.includes(currentConfig.getWattage(product) ?? -1));
            const memorySizeMatch = !currentConfig.filters.showMemorySize || selectedMemorySizes.length === 0 || (currentConfig.getMemorySize && selectedMemorySizes.includes(currentConfig.getMemorySize(product) ?? -1));
            const ramSpeedMatch = !currentConfig.filters.showRamSpeed || selectedRamSpeeds.length === 0 || (currentConfig.getRamSpeed && selectedRamSpeeds.includes(currentConfig.getRamSpeed(product) ?? -1));
            const casLatencyMatch = !currentConfig.filters.showCasLatency || selectedCasLatencies.length === 0 || (currentConfig.getCasLatency && selectedCasLatencies.includes(currentConfig.getCasLatency(product) ?? -1));
            const storageCapacityMatch = !currentConfig.filters.showStorageCapacity || selectedStorageCapacities.length === 0 || (currentConfig.getStorageCapacity && selectedStorageCapacities.includes(currentConfig.getStorageCapacity(product) ?? -1));

            // CPU Clock Range Check
            const cpuClockMatch = !currentConfig.filters.showBaseClock || selectedCpuClockRanges.length === 0 || (
                currentConfig.getBaseClock && ((baseClock) => {
                    if (baseClock == null) return false;
                    return selectedCpuClockRanges.some(range => {
                        if (range === "< 3.0") return baseClock < 3.0;
                        if (range === "3.0-3.9") return baseClock >= 3.0 && baseClock <= 3.9;
                        if (range === "4.0-4.9") return baseClock >= 4.0 && baseClock <= 4.9;
                        if (range === ">= 5.0") return baseClock >= 5.0;
                        return false;
                    });
                })(currentConfig.getBaseClock(product))
            );

            // Combine all filter matches
            return brandMatch && socketMatch && formFactorMatch && storageTypeMatch && chipsetMatch && ramTypeMatch && memoryProfileMatch &&
                   cpuCoreMatch && cpuClockMatch && gpuMemoryMatch && psuWattageMatch && memorySizeMatch && ramSpeedMatch && casLatencyMatch &&
                   storageCapacityMatch;
        });

        // --- Sorting Logic ---
        if (sortColumn && currentConfig) { /* ... (Sorting logic remains the same) ... */ }

        return filtered;
    }, [ // Update dependencies for filtering
        originalProducts, currentConfig, selectedBrands, selectedSockets, selectedFormFactors, selectedStorageTypes, selectedChipsets, selectedRamTypes, selectedMemoryProfiles,
        selectedCpuCores, selectedCpuClockRanges, selectedGpuMemories, selectedPsuWattages, // CPU/GPU/PSU Checkbox states
        selectedMemorySizes, selectedRamSpeeds, selectedCasLatencies, // RAM Checkbox states
        selectedStorageCapacities, // Storage Checkbox state
        sortColumn, sortDirection
    ]);

    // --- Helper Functions ---
    const getSortIndicator = (columnKey: string): string => {
        if (sortColumn !== columnKey) return '';
        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    };

    // --- Render Component ---
     if (!currentConfig) {
        return ( <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center items-center"><p className="text-gray-500">Loading or select product type...</p></div> );
    }

    // *** MAIN RETURN STATEMENT ***
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="container mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Header with Dropdown */}
                <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-left text-gray-800">
                        {selectedProductType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Products
                    </h1>
                    <div>
                        <label htmlFor="productTypeSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Product Type:</label>
                        <select id="productTypeSelect" value={selectedProductType} onChange={handleProductTypeChange}
                            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            {availableProductTypes.map(typeKey => (
                                <option key={typeKey} value={typeKey}>
                                     {typeKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* --- Filters Section --- */}
                <div className="p-4 border-b border-gray-200 space-y-6">
                    {/* --- Checkbox Filters --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4"> {/* Adjusted grid columns */}
                        {/* Brand Filter */}
                        {currentConfig.filters.showBrand && uniqueBrands.length > 0 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Brand:</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {uniqueBrands.map(brand => ( <div key={brand} className="flex items-center"> <input type="checkbox" id={`brand-${brand}`} value={brand} checked={selectedBrands.includes(brand)} onChange={(e) => handleMultiSelectChange(e, setSelectedBrands)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`brand-${brand}`} className="ml-2 block text-sm text-gray-700">{brand}</label> </div> ))} </div> {selectedBrands.length > 0 && (<button onClick={() => setSelectedBrands([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Brands </button>)} </div> )}
                        {/* Socket Filter */}
                        {currentConfig.filters.showSocket && uniqueSockets.length > 0 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Socket:</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {uniqueSockets.map(socket => ( <div key={socket} className="flex items-center"> <input type="checkbox" id={`socket-${socket}`} value={socket} checked={selectedSockets.includes(socket)} onChange={(e) => handleMultiSelectChange(e, setSelectedSockets)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`socket-${socket}`} className="ml-2 block text-sm text-gray-700">{socket}</label> </div> ))} </div> {selectedSockets.length > 0 && (<button onClick={() => setSelectedSockets([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Sockets </button>)} </div> )}
                        {/* Chipset Filter */}
                        {currentConfig.filters.showChipset && uniqueChipsets.length > 0 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Chipset:</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {uniqueChipsets.map(chip => ( <div key={chip} className="flex items-center"> <input type="checkbox" id={`chip-${chip}`} value={chip} checked={selectedChipsets.includes(chip)} onChange={(e) => handleMultiSelectChange(e, setSelectedChipsets)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`chip-${chip}`} className="ml-2 block text-sm text-gray-700">{chip}</label> </div> ))} </div> {selectedChipsets.length > 0 && (<button onClick={() => setSelectedChipsets([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Chipsets </button>)} </div> )}
                        {/* Form Factor Filter */}
                         {currentConfig.filters.showFormFactor && uniqueFormFactors.length > 0 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Form Factor / Type:</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {uniqueFormFactors.map(ff => ( <div key={ff} className="flex items-center"> <input type="checkbox" id={`ff-${ff}`} value={ff} checked={selectedFormFactors.includes(ff)} onChange={(e) => handleMultiSelectChange(e, setSelectedFormFactors)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`ff-${ff}`} className="ml-2 block text-sm text-gray-700">{ff}</label> </div> ))} </div> {selectedFormFactors.length > 0 && (<button onClick={() => setSelectedFormFactors([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Types </button>)} </div> )}
                         {/* RAM Type Filter */}
                         {currentConfig.filters.showRamType && uniqueRamTypes.length > 0 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">RAM Type:</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {uniqueRamTypes.map(rt => ( <div key={rt} className="flex items-center"> <input type="checkbox" id={`rt-${rt}`} value={rt} checked={selectedRamTypes.includes(rt)} onChange={(e) => handleMultiSelectChange(e, setSelectedRamTypes)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`rt-${rt}`} className="ml-2 block text-sm text-gray-700">{rt}</label> </div> ))} </div> {selectedRamTypes.length > 0 && (<button onClick={() => setSelectedRamTypes([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear RAM Types </button>)} </div> )}
                         {/* Memory Profile Filter */}
                         {currentConfig.filters.showMemoryProfile && uniqueMemoryProfiles.length > 0 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Memory Profile:</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {uniqueMemoryProfiles.map(profile => ( <div key={profile} className="flex items-center"> <input type="checkbox" id={`profile-${profile}`} value={profile} checked={selectedMemoryProfiles.includes(profile)} onChange={(e) => handleMultiSelectChange(e, setSelectedMemoryProfiles)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`profile-${profile}`} className="ml-2 block text-sm text-gray-700">{profile}</label> </div> ))} </div> {selectedMemoryProfiles.length > 0 && (<button onClick={() => setSelectedMemoryProfiles([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Profiles </button>)} </div> )}
                         {/* Storage Type Filter */}
                         {currentConfig.filters.showStorageType && uniqueStorageTypes.length > 0 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Storage Type:</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {uniqueStorageTypes.map(st => ( <div key={st} className="flex items-center"> <input type="checkbox" id={`st-${st}`} value={st} checked={selectedStorageTypes.includes(st)} onChange={(e) => handleMultiSelectChange(e, setSelectedStorageTypes)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`st-${st}`} className="ml-2 block text-sm text-gray-700">{st}</label> </div> ))} </div> {selectedStorageTypes.length > 0 && (<button onClick={() => setSelectedStorageTypes([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Types </button>)} </div> )}

                        {/* ** NEW/UPDATED CHECKBOX FILTERS ** */}
                        {currentConfig.filters.showCoreCount && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">CPU Cores:</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {COMMON_CPU_CORES.map(core => ( <div key={`core-${core}`} className="flex items-center"> <input type="checkbox" id={`core-${core}`} value={core} checked={selectedCpuCores.includes(core)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedCpuCores)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`core-${core}`} className="ml-2 block text-sm text-gray-700">{core}</label> </div> ))} </div> {selectedCpuCores.length > 0 && (<button onClick={() => setSelectedCpuCores([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Cores </button>)} </div> )}
                        {currentConfig.filters.showBaseClock && selectedProductType === 'cpu' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">CPU Clock (GHz):</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {COMMON_CPU_CLOCKS.map(clockRange => ( <div key={`clock-${clockRange}`} className="flex items-center"> <input type="checkbox" id={`clock-${clockRange}`} value={clockRange} checked={selectedCpuClockRanges.includes(clockRange)} onChange={(e) => handleMultiSelectChange(e, setSelectedCpuClockRanges)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`clock-${clockRange}`} className="ml-2 block text-sm text-gray-700">{clockRange}</label> </div> ))} </div> {selectedCpuClockRanges.length > 0 && (<button onClick={() => setSelectedCpuClockRanges([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Clocks </button>)} </div> )}
                        {currentConfig.filters.showMemorySize && selectedProductType === 'videoCard' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">GPU Memory (GB):</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {COMMON_GPU_MEMORIES.map(mem => ( <div key={`gpumem-${mem}`} className="flex items-center"> <input type="checkbox" id={`gpumem-${mem}`} value={mem} checked={selectedGpuMemories.includes(mem)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedGpuMemories)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`gpumem-${mem}`} className="ml-2 block text-sm text-gray-700">{mem} GB</label> </div> ))} </div> {selectedGpuMemories.length > 0 && (<button onClick={() => setSelectedGpuMemories([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear GPU Mem </button>)} </div> )}
                        {currentConfig.filters.showWattage && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">PSU Wattage (W):</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {COMMON_PSU_WATTAGES.map(watt => ( <div key={`watt-${watt}`} className="flex items-center"> <input type="checkbox" id={`watt-${watt}`} value={watt} checked={selectedPsuWattages.includes(watt)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedPsuWattages)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`watt-${watt}`} className="ml-2 block text-sm text-gray-700">{watt} W</label> </div> ))} </div> {selectedPsuWattages.length > 0 && (<button onClick={() => setSelectedPsuWattages([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Wattages </button>)} </div> )}
                        {currentConfig.filters.showMemorySize && selectedProductType === 'memory' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Memory Size (GB):</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {COMMON_RAM_SIZES.map(size => ( <div key={`size-${size}`} className="flex items-center"> <input type="checkbox" id={`size-${size}`} value={size} checked={selectedMemorySizes.includes(size)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedMemorySizes)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`size-${size}`} className="ml-2 block text-sm text-gray-700">{size} GB</label> </div> ))} </div> {selectedMemorySizes.length > 0 && (<button onClick={() => setSelectedMemorySizes([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Sizes </button>)} </div> )}
                        {currentConfig.filters.showRamSpeed && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Speed (MHz):</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {COMMON_RAM_SPEEDS.map(speed => ( <div key={`speed-${speed}`} className="flex items-center"> <input type="checkbox" id={`speed-${speed}`} value={speed} checked={selectedRamSpeeds.includes(speed)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedRamSpeeds)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`speed-${speed}`} className="ml-2 block text-sm text-gray-700">{speed}</label> </div> ))} </div> {selectedRamSpeeds.length > 0 && (<button onClick={() => setSelectedRamSpeeds([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Speeds </button>)} </div> )}
                        {currentConfig.filters.showCasLatency && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">CAS Latency (CL):</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {COMMON_CAS_LATENCIES.map(cl => ( <div key={`cl-${cl}`} className="flex items-center"> <input type="checkbox" id={`cl-${cl}`} value={cl} checked={selectedCasLatencies.includes(cl)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedCasLatencies)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`cl-${cl}`} className="ml-2 block text-sm text-gray-700">CL{cl}</label> </div> ))} </div> {selectedCasLatencies.length > 0 && (<button onClick={() => setSelectedCasLatencies([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Latencies </button>)} </div> )}
                        {currentConfig.filters.showStorageCapacity && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Capacity (GB):</h3> <div className="flex flex-wrap gap-x-4 gap-y-1 max-h-24 overflow-y-auto pr-2"> {COMMON_STORAGE_CAPACITIES.map(cap => ( <div key={`cap-${cap}`} className="flex items-center"> <input type="checkbox" id={`cap-${cap}`} value={cap} checked={selectedStorageCapacities.includes(cap)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedStorageCapacities)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`cap-${cap}`} className="ml-2 block text-sm text-gray-700">{cap < 1000 ? `${cap} GB` : `${cap / 1000} TB`}</label> </div> ))} </div> {selectedStorageCapacities.length > 0 && (<button onClick={() => setSelectedStorageCapacities([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Capacities </button>)} </div> )}
                    </div>

                    {/* --- Range Sliders (REMOVED) --- */}
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4"> */}
                        {/* Sliders removed */}
                    {/* </div> */}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {/* ... (Table rendering remains the same, check for whitespace) ... */}
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="pl-4 pr-2 py-3 text-center w-4"></th>
                                {currentConfig.columns.map((col) => (
                                    <th key={col.key.toString()} scope="col"
                                        className={`py-3 px-4 text-${col.align || 'left'} text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap ${col.sortable ? 'cursor-pointer hover:bg-gray-200' : ''}`}
                                        onClick={col.sortable ? () => handleSort(col.key.toString()) : undefined}>
                                        {col.label}
                                        {col.sortable && getSortIndicator(col.key.toString())}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {processedProducts.map((product, index) => (
                                <tr key={currentConfig.getName(product) + index} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="pl-4 pr-2 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                                    </td>
                                    {currentConfig.columns.map((col) => (
                                        <td key={col.key.toString()} className={`py-3 px-4 whitespace-nowrap text-sm text-${col.align || 'left'} text-gray-700`}>
                                            {col.render ? col.render(product) : (product[col.key as keyof AnyComponent] != null ? String(product[col.key as keyof AnyComponent]) : '-')}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {processedProducts.length === 0 && (
                                <tr>
                                    <td colSpan={currentConfig.columns.length + 1} className="text-center py-4 text-gray-500 italic">
                                        No products match the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
