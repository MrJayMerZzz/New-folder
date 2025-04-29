// components/ProductPage.tsx
"use client";

import React, { useState, useMemo, ChangeEvent, useEffect } from 'react';
// Import the data map and necessary types from your updated data structure
// ENSURE StorageDevice here is the NEW definition you provided previously
import {
    componentDataMap,
    ComponentTypeKey, // Use the key type from data.ts
    AnyComponent,     // Use the union type from data.ts
    CPU, GPU, RAM, Motherboard, StorageDevice, PSU, Case, CPUCooler // Import individual types
} from '../constants/data'; // Adjust path as necessary

// --- Configuration for Each Product Type ---

interface TableColumn<T extends AnyComponent> {
    key: keyof T | string; // Allow string for composite/calculated keys
    label: string;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
}

interface ProductFilters {
    showBrand?: boolean;
    showCoreCount?: boolean;
    showBaseClock?: boolean;
    showBoostClock?: boolean; // Not implemented yet in filters
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
    // Flags for new storage filters if needed:
    showInterface?: boolean;
    // Add flags for other potential filters (e.g., efficiency, modularity for PSU)
}

interface ProductConfig<T extends AnyComponent> {
    dataKey: ComponentTypeKey;
    columns: TableColumn<T>[];
    filters: ProductFilters; // Ensure this is always present
    getSortableKeys: () => string[]; // Use string[] as keys can be composite
    getBrand: (item: T) => string | undefined;
    getName: (item: T) => string; // Often used for display and potentially sorting composite names
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
    getMemoryProfileSupport?: (item: T) => string; // Returns 'XMP', 'EXPO', 'XMP & EXPO', or 'None'
    getStorageType?: (item: T) => string | undefined;
    getStorageCapacity?: (item: T) => number | null | undefined; // Corrected getter needed for storage
    // Getters for new storage fields if needed for filtering/sorting
    getInterface?: (item: T) => string | undefined;
    getReadSpeed?: (item: T) => number | null | undefined;
    getWriteSpeed?: (item: T) => number | null | undefined;
    // Add specific getters if needed for sorting composite keys like brandAndName
    getBrandAndName?: (item: T) => string;
}

// Helper function to generate Brand + Name string if needed
const defaultGetBrandAndName = (item: { brand?: string; name: string }) => `${item.brand ? item.brand + ' ' : ''}${item.name}`;

// --- Configuration Map (Ensure 'filters' is present for all) ---
const productConfigurations: { [key in ComponentTypeKey]?: ProductConfig<any> } = {
    // --- CPU Config (Unchanged) ---
    cpu: {
        dataKey: 'cpu',
        getBrand: (item: CPU) => item.brand,
        getName: (item: CPU) => `${item.brand} ${item.name}`,
        getPrice: (item: CPU) => item.price,
        getCoreCount: (item: CPU) => item.coreCount,
        getBaseClock: (item: CPU) => item.performanceCoreClock,
        getBoostClock: (item: CPU) => item.performanceCoreBoostClock,
        getSocket: (item: CPU) => item.microarchitecture,
        columns: [ { key: 'name', label: 'Name', align: 'left', sortable: true, render: (item: CPU) => <span className="font-medium text-gray-900">{productConfigurations.cpu?.getName(item)}</span> }, { key: 'coreCount', label: 'Cores', align: 'center', sortable: true }, { key: 'performanceCoreClock', label: 'Base Clock (GHz)', align: 'right', sortable: true, render: (item: CPU) => item.performanceCoreClock ? `${item.performanceCoreClock.toFixed(1)}` : '-' }, { key: 'performanceCoreBoostClock', label: 'Boost Clock (GHz)', align: 'right', sortable: true, render: (item: CPU) => item.performanceCoreBoostClock ? `${item.performanceCoreBoostClock.toFixed(1)}` : '-' }, { key: 'microarchitecture', label: 'Socket', align: 'left', sortable: true }, { key: 'tdp', label: 'TDP (W)', align: 'right', sortable: true, render: (item: CPU) => item.tdp ? `${item.tdp}` : '-' }, { key: 'integratedGraphics', label: 'iGPU', align: 'left', sortable: false, render: (item: CPU) => item.integratedGraphics === true ? (item.brand === 'Intel' ? 'Intel UHD/Graphics' : 'Radeon') : (item.integratedGraphics === false ? 'None' : 'N/A') }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: CPU) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true, showCoreCount: true, showBaseClock: true, showSocket: true, },
        getSortableKeys: () => ['name', 'coreCount', 'performanceCoreClock', 'performanceCoreBoostClock', 'microarchitecture', 'tdp', 'price'],
    },
    // --- Video Card Config (Unchanged) ---
    videoCard: {
        dataKey: 'videoCard',
        getBrand: (item: GPU) => item.brand,
        getName: (item: GPU) => item.name,
        getPrice: (item: GPU) => item.price,
        getBaseClock: (item: GPU) => item.coreClock,
        getBoostClock: (item: GPU) => item.boostClock,
        getMemorySize: (item: GPU) => item.memory,
        columns: [ { key: 'name', label: 'Name', align: 'left', sortable: true, render: (item: GPU) => <span className="font-medium text-gray-900">{item.name}</span> }, { key: 'chipset', label: 'Chipset', align: 'left', sortable: true }, { key: 'memory', label: 'Memory (GB)', align: 'right', sortable: true, render: (item: GPU) => `${item.memory}` }, { key: 'coreClock', label: 'Core Clock (MHz)', align: 'right', sortable: true, render: (item: GPU) => item.coreClock ? `${item.coreClock}` : '-' }, { key: 'boostClock', label: 'Boost Clock (MHz)', align: 'right', sortable: true, render: (item: GPU) => item.boostClock ? `${item.boostClock}` : '-' }, { key: 'tdp', label: 'TDP (W)', align: 'right', sortable: true, render: (item: GPU) => item.tdp ? `${item.tdp}` : '-' }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: GPU) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, { key: 'length', label: 'Length (mm)', align: 'right', sortable: true, render: (item: GPU) => item.length ? `${item.length}` : '-' }, ],
        filters: { showBrand: true, showMemorySize: true, },
        getSortableKeys: () => ['name', 'chipset', 'memory', 'coreClock', 'boostClock', 'tdp', 'price', 'length'],
    },
    // --- Memory Config (Unchanged) ---
    memory: {
        dataKey: 'memory',
        getBrand: (item: RAM) => item.brand,
        getName: (item: RAM) => item.name,
        getPrice: (item: RAM) => item.price,
        getMemorySize: (item: RAM) => item.sizeGB,
        getRamSpeed: (item: RAM) => item.speed,
        getCasLatency: (item: RAM) => item.casLatency,
        getMemoryProfileSupport: (item: RAM) => { const profiles: string[] = []; if (item.supportsXMP) profiles.push('XMP'); if (item.supportsEXPO) profiles.push('EXPO'); return profiles.length > 0 ? profiles.join(' & ') : 'None'; },
        columns: [ { key: 'name', label: 'Name', align: 'left', sortable: true, render: (item: RAM) => <span className="font-medium text-gray-900">{item.name}</span> }, { key: 'speed', label: 'Speed (MHz)', align: 'right', sortable: true, render: (item: RAM) => `${item.ddrType}-${item.speed}` }, { key: 'modules', label: 'Modules', align: 'center', sortable: true, render: (item: RAM) => `${item.modules}x${item.sizeGB / item.modules} GB` }, { key: 'casLatency', label: 'CL', align: 'center', sortable: true }, { key: 'firstWordLatency', label: 'Latency (ns)', align: 'right', sortable: true, render: (item: RAM) => item.firstWordLatency.toFixed(2) }, { key: 'memoryProfile', label: 'Mem Profile', align: 'center', sortable: true, render: (item: RAM) => productConfigurations.memory?.getMemoryProfileSupport?.(item) ?? 'N/A' }, { key: 'pricePerGB', label: 'Price/GB', align: 'right', sortable: true, render: (item: RAM) => item.pricePerGB != null ? `$${item.pricePerGB.toFixed(2)}` : '-' }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: RAM) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, { key: 'rgb', label: 'RGB', align: 'center', sortable: false, render: (item: RAM) => item.rgb ? 'Yes' : 'No' }, ],
        filters: { showBrand: true, showMemorySize: true, showRamSpeed: true, showCasLatency: true, showMemoryProfile: true, },
        getSortableKeys: () => ['name', 'speed', 'modules', 'casLatency', 'firstWordLatency', 'memoryProfile', 'pricePerGB', 'price'],
    },
    // --- Motherboard Config (Unchanged) ---
     motherboard: {
         dataKey: 'motherboard',
         getBrand: (item: Motherboard) => item.brand,
         getName: (item: Motherboard) => item.name,
         getBrandAndName: defaultGetBrandAndName,
         getPrice: (item: Motherboard) => item.price,
         getSocket: (item: Motherboard) => item.socket,
         getFormFactor: (item: Motherboard) => item.formFactor,
         getChipset: (item: Motherboard) => item.chipset,
         getRamType: (item: Motherboard) => item.ramType,
         getMemoryProfileSupport: (item: Motherboard) => { const profiles: string[] = []; if (item.supportsXMP) profiles.push('XMP'); if (item.supportsEXPO) profiles.push('EXPO'); return profiles.length > 0 ? profiles.join(' & ') : 'None'; },
         columns: [ { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: Motherboard) => <span className="font-medium text-gray-900">{productConfigurations.motherboard?.getBrandAndName?.(item)}</span> }, { key: 'socket', label: 'Socket', align: 'left', sortable: true }, { key: 'chipset', label: 'Chipset', align: 'left', sortable: true }, { key: 'formFactor', label: 'Form Factor', align: 'left', sortable: true }, { key: 'ramType', label: 'RAM Type', align: 'center', sortable: true }, { key: 'memorySlots', label: 'RAM Slots', align: 'center', sortable: true }, { key: 'memoryMax', label: 'Max RAM (GB)', align: 'right', sortable: true }, { key: 'memoryProfile', label: 'Mem Profile', align: 'center', sortable: true, render: (item: Motherboard) => productConfigurations.motherboard?.getMemoryProfileSupport?.(item) ?? 'N/A' }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: Motherboard) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
         filters: { showBrand: true, showSocket: true, showFormFactor: true, showChipset: true, showRamType: true, showMemoryProfile: true },
         getSortableKeys: () => ['brandAndName', 'socket', 'chipset', 'formFactor', 'ramType', 'memorySlots', 'memoryMax', 'memoryProfile', 'price'],
     },
    // --- Case Config (Unchanged) ---
    case: {
        dataKey: 'case',
        getBrand: (item: Case) => item.brand,
        getName: (item: Case) => item.name,
        getBrandAndName: defaultGetBrandAndName,
        getPrice: (item: Case) => item.price,
        getFormFactor: (item: Case) => item.type,
        columns: [ { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: Case) => <span className="font-medium text-gray-900">{productConfigurations.case?.getBrandAndName?.(item)}</span> }, { key: 'type', label: 'Type', align: 'left', sortable: true }, { key: 'color', label: 'Color', align: 'left', sortable: true }, { key: 'sidePanel', label: 'Side Panel', align: 'left', sortable: true }, { key: 'maxGpuLength', label: 'Max GPU (mm)', align: 'right', sortable: true, render: (item: Case) => item.maxGpuLength ?? '-' }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: Case) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true, showFormFactor: true, },
        getSortableKeys: () => ['brandAndName', 'type', 'color', 'sidePanel', 'maxGpuLength', 'price'],
    },
    // --- Power Supply Config (Unchanged) ---
    powerSupply: {
        dataKey: 'powerSupply',
        getBrand: (item: PSU) => item.brand,
        getName: (item: PSU) => item.name,
        getBrandAndName: defaultGetBrandAndName,
        getPrice: (item: PSU) => item.price,
        getWattage: (item: PSU) => item.wattage,
        columns: [ { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: PSU) => <span className="font-medium text-gray-900">{productConfigurations.powerSupply?.getBrandAndName?.(item)}</span> }, { key: 'wattage', label: 'Wattage (W)', align: 'right', sortable: true }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: PSU) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true, showWattage: true, },
        getSortableKeys: () => ['brandAndName', 'wattage', 'price'],
    },
    // --- CPU Cooler Config (Unchanged) ---
    cpuCooler: {
        dataKey: 'cpuCooler',
        getBrand: (item: CPUCooler) => item.brand,
        getName: (item: CPUCooler) => item.name,
        getBrandAndName: defaultGetBrandAndName,
        getPrice: (item: CPUCooler) => item.price,
        columns: [ { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: CPUCooler) => <span className="font-medium text-gray-900">{productConfigurations.cpuCooler?.getBrandAndName?.(item)}</span> }, { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: CPUCooler) => item.price != null ? `$${item.price.toFixed(2)}` : '-' }, ],
        filters: { showBrand: true },
        getSortableKeys: () => ['brandAndName', 'price'],
    },

    // *** UPDATED STORAGE CONFIG ***
    storage: {
        dataKey: 'storage',
        getBrand: (item: StorageDevice) => item.brand,
        getName: (item: StorageDevice) => item.name,
        getBrandAndName: defaultGetBrandAndName, // Uses the helper
        getPrice: (item: StorageDevice) => item.price,
        // CORRECTED: Use 'capacity' (based on your NEW StorageDevice type)
        getStorageCapacity: (item: StorageDevice) => item.capacity,
        getStorageType: (item: StorageDevice) => item.type,
        // Added getters for potential use in filtering/sorting logic if needed
        getInterface: (item: StorageDevice) => item.interface,
        getFormFactor: (item: StorageDevice) => item.formFactor,
        getReadSpeed: (item: StorageDevice) => item.sequentialReadSpeed,
        getWriteSpeed: (item: StorageDevice) => item.sequentialWriteSpeed,

        // UPDATED: Columns array to include new fields and fix 'capacity' key
        columns: [
            { key: 'brandAndName', label: 'Name', align: 'left', sortable: true, render: (item: StorageDevice) => <span className="font-medium text-gray-900">{productConfigurations.storage?.getBrandAndName?.(item)}</span> },
            { key: 'type', label: 'Type', align: 'left', sortable: true },
            // CORRECTED: Use 'capacity' as the key, updated label, added render
            { key: 'capacity', label: 'Capacity', align: 'right', sortable: true, render: (item: StorageDevice) => item.capacity < 1000 ? `${item.capacity} GB` : `${item.capacity / 1000} TB` },
            // ADDED: Interface column
            { key: 'interface', label: 'Interface', align: 'left', sortable: true },
            // ADDED: Form Factor column
            { key: 'formFactor', label: 'Form Factor', align: 'left', sortable: true },
            // ADDED: Read Speed column
            { key: 'sequentialReadSpeed', label: 'Read (MB/s)', align: 'right', sortable: true, render: (item: StorageDevice) => item.sequentialReadSpeed ?? '-' },
            // ADDED: Write Speed column
            { key: 'sequentialWriteSpeed', label: 'Write (MB/s)', align: 'right', sortable: true, render: (item: StorageDevice) => item.sequentialWriteSpeed ?? '-' },
            // ADDED: Cache column (Optional)
            { key: 'cache', label: 'Cache', align: 'right', sortable: true, render: (item: StorageDevice) => item.cache || '-' },
            // ADDED: RPM column (Optional)
             { key: 'rpm', label: 'RPM', align: 'right', sortable: true, render: (item: StorageDevice) => item.rpm ?? '-' },
             // ADDED: Price/GB column (Optional)
             { key: 'pricePerGB', label: 'Price/GB', align: 'right', sortable: true, render: (item: StorageDevice) => item.pricePerGB != null ? `$${item.pricePerGB.toFixed(2)}` : '-' },
            // Price column remains
            { key: 'price', label: 'Price', align: 'right', sortable: true, render: (item: StorageDevice) => item.price != null ? `$${item.price.toFixed(2)}` : '-' },
        ],
        // Define which filters to show for Storage devices
        // CORRECTED: Use the correct getter for capacity filtering if enabled
        filters: {
            showBrand: true,
            showStorageType: true,
            showStorageCapacity: true, // This will now use getStorageCapacity which points to 'capacity'
            // ADD Flags for new filters if you implement them:
            // showInterface: true,
            // showFormFactor: true,
        },
        // UPDATED: getSortableKeys to use 'capacity' and include new sortable columns
        getSortableKeys: () => [
            'brandAndName',
            'type',
            'capacity', // Corrected key
            'interface', // Added
            'formFactor', // Added
            'sequentialReadSpeed', // Added
            'sequentialWriteSpeed', // Added
            'cache', // Added
            'rpm', // Added
            'pricePerGB', // Added
            'price'
        ],
    },
};


// --- The rest of the component remains the same as the last version provided ---

const availableProductTypes = Object.keys(componentDataMap) as ComponentTypeKey[];

// --- Common Filter Values ---
const COMMON_CPU_CORES = [2, 4, 6, 8, 10, 12, 16, 24, 32, 64];
const COMMON_CPU_CLOCKS = ["< 3.0", "3.0-3.9", "4.0-4.9", ">= 5.0"];
const COMMON_GPU_MEMORIES = [4, 6, 8, 10, 12, 16, 20, 24, 32];
const COMMON_PSU_WATTAGES = [300, 450, 550, 650, 750, 850, 1000, 1200, 1600];
const COMMON_RAM_SIZES = [8, 16, 32, 48, 64, 96, 128];
const COMMON_RAM_SPEEDS = [2400, 2666, 3000, 3200, 3600, 4800, 5200, 5600, 6000, 6400, 7200, 8000];
const COMMON_CAS_LATENCIES = [9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 22, 28, 30, 32, 34, 36, 38, 40, 42, 46];
// Updated common capacities to align with StorageDevice.capacity (still in GB)
const COMMON_STORAGE_CAPACITIES = [120, 250, 500, 1000, 2000, 4000, 8000, 16000]; // GB

// Helper function to format type keys for display
const formatTypeKey = (typeKey: ComponentTypeKey): string => {
    return typeKey.charAt(0).toUpperCase() + typeKey.slice(1).replace(/([A-Z])/g, ' $1').trim();
};


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
    const [selectedCpuCores, setSelectedCpuCores] = useState<number[]>([]);
    const [selectedCpuClockRanges, setSelectedCpuClockRanges] = useState<string[]>([]);
    const [selectedGpuMemories, setSelectedGpuMemories] = useState<number[]>([]);
    const [selectedPsuWattages, setSelectedPsuWattages] = useState<number[]>([]);
    const [selectedMemorySizes, setSelectedMemorySizes] = useState<number[]>([]);
    const [selectedRamSpeeds, setSelectedRamSpeeds] = useState<number[]>([]);
    const [selectedCasLatencies, setSelectedCasLatencies] = useState<number[]>([]);
    // This state uses the COMMON_STORAGE_CAPACITIES which are in GB
    const [selectedStorageCapacities, setSelectedStorageCapacities] = useState<number[]>([]);
    // Add states for new filters if needed (e.g., selectedInterfaces)

    // --- Sorting State ---
    const [sortColumn, setSortColumn] = useState<string | null>(null); // Use string to match column keys
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // --- Effect to initialize/reset filter states and sorting ---
    useEffect(() => {
        // Reset Filters
        setSelectedBrands([]); setSelectedSockets([]); setSelectedChipsets([]); setSelectedFormFactors([]);
        setSelectedRamTypes([]); setSelectedMemoryProfiles([]); setSelectedStorageTypes([]);
        setSelectedCpuCores([]); setSelectedCpuClockRanges([]); setSelectedGpuMemories([]); setSelectedPsuWattages([]);
        setSelectedMemorySizes([]); setSelectedRamSpeeds([]); setSelectedCasLatencies([]);
        setSelectedStorageCapacities([]);
        // Reset Sorting
        setSortColumn(null); setSortDirection('asc');
    }, [selectedProductType]); // Depend only on selectedProductType

    // --- Event Handlers ---
    const handleSort = (columnKey: string) => {
        // Find the column definition to check if it's sortable
        const columnDefinition = currentConfig?.columns.find(c => c.key === columnKey);
        if (!columnDefinition?.sortable) return; // Exit if column is not sortable

        if (sortColumn === columnKey) {
            // If clicking the same column, toggle direction
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            // If clicking a new column, set it and default to ascending
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
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
    // (Unique value calculations remain the same logic, but ensure getters used match config)
     const uniqueBrands = useMemo(() => {
        if (!currentConfig?.filters?.showBrand || !originalProducts || !currentConfig.getBrand) return [];
        const brands = new Set(originalProducts.map(p => currentConfig.getBrand(p)).filter((b): b is string => !!b));
        return Array.from(brands).sort();
    }, [originalProducts, currentConfig]);

    const uniqueSockets = useMemo(() => {
        if (!currentConfig?.filters?.showSocket || !currentConfig.getSocket || !originalProducts) return [];
        const sockets = new Set(originalProducts.map(p => currentConfig.getSocket!(p)).filter((s): s is string => !!s));
        return Array.from(sockets).sort();
    }, [originalProducts, currentConfig]);

    const uniqueFormFactors = useMemo(() => {
        // Use getFormFactor for Motherboard/Case, getFormFactor (Storage specific) for Storage
        const getter = currentConfig?.getFormFactor || (selectedProductType === 'storage' ? currentConfig?.getFormFactor : undefined);
        if (!currentConfig?.filters?.showFormFactor || !getter || !originalProducts) return [];
        const factors = new Set(originalProducts.map(p => getter(p)).filter((f): f is string => !!f));
        return Array.from(factors).sort();
    }, [originalProducts, currentConfig, selectedProductType]);

    const uniqueStorageTypes = useMemo(() => {
        if (!currentConfig?.filters?.showStorageType || !currentConfig.getStorageType || !originalProducts) return [];
        const types = new Set(originalProducts.map(p => currentConfig.getStorageType!(p)).filter((t): t is string => !!t));
        return Array.from(types).sort();
    }, [originalProducts, currentConfig]);

    const uniqueChipsets = useMemo(() => {
        if (!currentConfig?.filters?.showChipset || !currentConfig.getChipset || !originalProducts) return [];
        const chipsets = new Set(originalProducts.map(p => currentConfig.getChipset!(p)).filter((c): c is string => !!c));
        return Array.from(chipsets).sort();
    }, [originalProducts, currentConfig]);

     const uniqueRamTypes = useMemo(() => {
         if (!currentConfig?.filters?.showRamType || !currentConfig.getRamType || !originalProducts) return [];
         const types = new Set(originalProducts.map(p => currentConfig.getRamType!(p)).filter((t): t is string => !!t));
         return Array.from(types).sort();
     }, [originalProducts, currentConfig]);

    const uniqueMemoryProfiles = useMemo(() => {
        if (!currentConfig?.filters?.showMemoryProfile || !currentConfig.getMemoryProfileSupport || !originalProducts) return [];
        const profiles = new Set(
            originalProducts
                .map(p => currentConfig.getMemoryProfileSupport!(p))
                .filter((p): p is string => !!p && p !== 'None')
                .flatMap(profileString => profileString.split(' & '))
                .map(p => p.trim())
                .filter(p => p.length > 0)
        );
        return Array.from(profiles).sort();
    }, [originalProducts, currentConfig]);

    // --- Filtering and Sorting Logic ---
    const processedProducts = useMemo(() => {
        if (!currentConfig || !originalProducts) return [];

        // --- Filtering ---
        let filtered = originalProducts.filter(product => {
            // String/boolean based filters
            const brandMatch = !currentConfig.filters?.showBrand || selectedBrands.length === 0 || selectedBrands.includes(currentConfig.getBrand(product) ?? '__NOMATCH__');
            const socketMatch = !currentConfig.filters?.showSocket || !currentConfig.getSocket || selectedSockets.length === 0 || selectedSockets.includes(currentConfig.getSocket(product) ?? '__NOMATCH__');
            const storageTypeMatch = !currentConfig.filters?.showStorageType || !currentConfig.getStorageType || selectedStorageTypes.length === 0 || selectedStorageTypes.includes(currentConfig.getStorageType(product) ?? '__NOMATCH__');
            const chipsetMatch = !currentConfig.filters?.showChipset || !currentConfig.getChipset || selectedChipsets.length === 0 || selectedChipsets.includes(currentConfig.getChipset(product) ?? '__NOMATCH__');
            const ramTypeMatch = !currentConfig.filters?.showRamType || !currentConfig.getRamType || selectedRamTypes.length === 0 || selectedRamTypes.includes(currentConfig.getRamType(product) ?? '__NOMATCH__');

             // Form Factor Filter - Uses correct getter based on type
            const formFactorGetter = currentConfig?.getFormFactor || (selectedProductType === 'storage' ? currentConfig?.getFormFactor : undefined);
            const formFactorMatch = !currentConfig.filters?.showFormFactor || !formFactorGetter || selectedFormFactors.length === 0 || selectedFormFactors.includes(formFactorGetter(product) ?? '__NOMATCH__');


            const memoryProfileMatch = !currentConfig.filters?.showMemoryProfile || !currentConfig.getMemoryProfileSupport || selectedMemoryProfiles.length === 0 || (
                (supportedProfilesStr) => {
                    if (!supportedProfilesStr || supportedProfilesStr === 'None') return false;
                    const supportedProfiles = supportedProfilesStr.split(' & ').map(p => p.trim());
                    return selectedMemoryProfiles.some(selectedProfile => supportedProfiles.includes(selectedProfile));
                }
            )(currentConfig.getMemoryProfileSupport(product));

            // Numeric/Range filters (Ensure type check)
            const cpuCoreMatch = !currentConfig.filters?.showCoreCount || !currentConfig.getCoreCount || selectedProductType !== 'cpu' || selectedCpuCores.length === 0 || selectedCpuCores.includes(currentConfig.getCoreCount(product) ?? -1);
            const gpuMemoryMatch = !currentConfig.filters?.showMemorySize || !currentConfig.getMemorySize || selectedProductType !== 'videoCard' || selectedGpuMemories.length === 0 || selectedGpuMemories.includes(currentConfig.getMemorySize(product) ?? -1);
            const psuWattageMatch = !currentConfig.filters?.showWattage || !currentConfig.getWattage || selectedProductType !== 'powerSupply' || selectedPsuWattages.length === 0 || selectedPsuWattages.includes(currentConfig.getWattage(product) ?? -1);
            const memorySizeMatch = !currentConfig.filters?.showMemorySize || !currentConfig.getMemorySize || selectedProductType !== 'memory' || selectedMemorySizes.length === 0 || selectedMemorySizes.includes(currentConfig.getMemorySize(product) ?? -1);
            const ramSpeedMatch = !currentConfig.filters?.showRamSpeed || !currentConfig.getRamSpeed || selectedProductType !== 'memory' || selectedRamSpeeds.length === 0 || selectedRamSpeeds.includes(currentConfig.getRamSpeed(product) ?? -1);
            const casLatencyMatch = !currentConfig.filters?.showCasLatency || !currentConfig.getCasLatency || selectedProductType !== 'memory' || selectedCasLatencies.length === 0 || selectedCasLatencies.includes(currentConfig.getCasLatency(product) ?? -1);

            // CORRECTED: Use the right getter for Storage Capacity filtering
            const storageCapacityMatch = !currentConfig.filters?.showStorageCapacity || !currentConfig.getStorageCapacity || selectedProductType !== 'storage' || selectedStorageCapacities.length === 0 || selectedStorageCapacities.includes(currentConfig.getStorageCapacity(product) ?? -1);

            const cpuClockMatch = !currentConfig.filters?.showBaseClock || !currentConfig.getBaseClock || selectedProductType !== 'cpu' || selectedCpuClockRanges.length === 0 || (
                (baseClock) => {
                    if (baseClock == null) return false;
                    return selectedCpuClockRanges.some(range => {
                        if (range === "< 3.0") return baseClock < 3.0;
                        if (range === "3.0-3.9") return baseClock >= 3.0 && baseClock <= 3.999;
                        if (range === "4.0-4.9") return baseClock >= 4.0 && baseClock <= 4.999;
                        if (range === ">= 5.0") return baseClock >= 5.0;
                        return false;
                    });
                }
            )(currentConfig.getBaseClock(product));

            // Combine all match conditions
            return brandMatch && socketMatch && formFactorMatch && storageTypeMatch && chipsetMatch && ramTypeMatch && memoryProfileMatch &&
                   cpuCoreMatch && cpuClockMatch && gpuMemoryMatch && psuWattageMatch && memorySizeMatch && ramSpeedMatch && casLatencyMatch &&
                   storageCapacityMatch;
        });

        // --- Sorting Logic ---
        if (sortColumn && currentConfig) {
            const compareValues = (a: any, b: any): number => {
                const aIsNull = a === null || a === undefined;
                const bIsNull = b === null || b === undefined;
                if (aIsNull && bIsNull) return 0;
                if (aIsNull) return 1;
                if (bIsNull) return -1;
                if (typeof a === 'number' && typeof b === 'number') return a - b;
                if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
                if (typeof a === 'boolean' && typeof b === 'boolean') return (a === b)? 0 : a? -1 : 1;
                try { return String(a).localeCompare(String(b)); } catch (e) { console.warn("Compare Error:", e); return 0; }
            };

            filtered.sort((itemA, itemB) => {
                let valueA: any;
                let valueB: any;

                // Handle special cases first
                if (sortColumn === 'brandAndName' && currentConfig.getBrandAndName) {
                     valueA = currentConfig.getBrandAndName(itemA);
                     valueB = currentConfig.getBrandAndName(itemB);
                } else if (sortColumn === 'name' && currentConfig.getName && !currentConfig.getBrandAndName) {
                     valueA = currentConfig.getName(itemA);
                     valueB = currentConfig.getName(itemB);
                 } else if (sortColumn === 'memoryProfile' && currentConfig.getMemoryProfileSupport) {
                    valueA = currentConfig.getMemoryProfileSupport(itemA);
                    valueB = currentConfig.getMemoryProfileSupport(itemB);
                } else if (sortColumn === 'pricePerGB' && (selectedProductType === 'memory' || selectedProductType === 'storage')) {
                    // Handle pricePerGB for both RAM and Storage if applicable
                    valueA = (itemA as any).pricePerGB; // Use 'any' or check type more specifically
                    valueB = (itemB as any).pricePerGB;
                }
               // Add specific checks for other computed/special sort keys as needed
                else {
                    // Default: Direct property access
                    valueA = itemA[sortColumn as keyof AnyComponent];
                    valueB = itemB[sortColumn as keyof AnyComponent];
                }

                const comparison = compareValues(valueA, valueB);
                return sortDirection === 'asc' ? comparison : -comparison;
            });
        }
        // --- End Sorting Logic ---

        return filtered; // Return the filtered (and potentially sorted) array
    }, [ // Update dependencies for filtering AND sorting
        originalProducts, currentConfig, selectedBrands, selectedSockets, selectedFormFactors, selectedStorageTypes, selectedChipsets, selectedRamTypes, selectedMemoryProfiles,
        selectedCpuCores, selectedCpuClockRanges, selectedGpuMemories, selectedPsuWattages,
        selectedMemorySizes, selectedRamSpeeds, selectedCasLatencies,
        selectedStorageCapacities, // Ensure this is included
        sortColumn, sortDirection // Add sorting state dependencies
    ]);

    // --- Helper Functions ---
    const getSortIndicator = (columnKey: string): string => {
        if (sortColumn !== columnKey) return '';
        const columnDefinition = currentConfig?.columns.find(c => c.key === columnKey);
        if (!columnDefinition?.sortable) return '';
        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    };

    // --- Render Component ---
     if (!currentConfig) {
         return (
             <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                 <div className="container mx-auto bg-white shadow-xl rounded-lg p-6">
                     <label htmlFor="productTypeSelect" className="block text-sm font-medium text-gray-700 mr-2">Select Product Type:</label>
                     <select id="productTypeSelect" value={selectedProductType} onChange={handleProductTypeChange}
                         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black">
                         {availableProductTypes.map(typeKey => <option key={typeKey} value={typeKey}>{formatTypeKey(typeKey)}</option>)}
                     </select>
                     <p className="mt-4 text-gray-500">Loading configuration or select a product type...</p>
                 </div>
             </div>
         );
     }

    // *** MAIN RETURN STATEMENT ***
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="container mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Header with Dropdown */}
                <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-left text-gray-800 whitespace-nowrap">{formatTypeKey(selectedProductType)} Products</h1>
                    <div>
                        <label htmlFor="productTypeSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Type:</label>
                        <select id="productTypeSelect" value={selectedProductType} onChange={handleProductTypeChange}
                            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black">
                            {availableProductTypes.map(typeKey => <option key={typeKey} value={typeKey}>{formatTypeKey(typeKey)}</option>)}
                        </select>
                    </div>
                </div>

                {/* --- Filters Section (Always Visible) --- */}
                {currentConfig.filters && Object.values(currentConfig.filters).some(show => show) && (
                    <div className="p-4 border-b border-gray-200">
                        <div className="space-y-6">
                             <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                                {/* Render filter sections based on currentConfig.filters */}
                                {/* Brand Filter */}
                                {currentConfig.filters.showBrand && uniqueBrands.length > 1 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Brand:</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {uniqueBrands.map(brand => ( <div key={brand} className="flex items-center"> <input type="checkbox" id={`brand-${brand}`} value={brand} checked={selectedBrands.includes(brand)} onChange={(e) => handleMultiSelectChange(e, setSelectedBrands)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`brand-${brand}`} className="ml-2 block text-sm text-gray-700 flex-1 truncate">{brand}</label> </div> ))} </div> {selectedBrands.length > 0 && (<button onClick={() => setSelectedBrands([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Brands </button>)} </div> )}
                                {/* Socket Filter */}
                                {currentConfig.filters.showSocket && uniqueSockets.length > 1 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Socket:</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {uniqueSockets.map(socket => ( <div key={socket} className="flex items-center"> <input type="checkbox" id={`socket-${socket}`} value={socket} checked={selectedSockets.includes(socket)} onChange={(e) => handleMultiSelectChange(e, setSelectedSockets)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`socket-${socket}`} className="ml-2 block text-sm text-gray-700">{socket}</label> </div> ))} </div> {selectedSockets.length > 0 && (<button onClick={() => setSelectedSockets([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Sockets </button>)} </div> )}
                                {/* Chipset Filter */}
                                {currentConfig.filters.showChipset && uniqueChipsets.length > 1 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Chipset:</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {uniqueChipsets.map(chip => ( <div key={chip} className="flex items-center"> <input type="checkbox" id={`chip-${chip}`} value={chip} checked={selectedChipsets.includes(chip)} onChange={(e) => handleMultiSelectChange(e, setSelectedChipsets)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`chip-${chip}`} className="ml-2 block text-sm text-gray-700">{chip}</label> </div> ))} </div> {selectedChipsets.length > 0 && (<button onClick={() => setSelectedChipsets([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Chipsets </button>)} </div> )}
                                {/* Form Factor Filter */}
                                {currentConfig.filters.showFormFactor && uniqueFormFactors.length > 1 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Form Factor / Type:</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {uniqueFormFactors.map(ff => ( <div key={ff} className="flex items-center"> <input type="checkbox" id={`ff-${ff}`} value={ff} checked={selectedFormFactors.includes(ff)} onChange={(e) => handleMultiSelectChange(e, setSelectedFormFactors)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`ff-${ff}`} className="ml-2 block text-sm text-gray-700">{ff}</label> </div> ))} </div> {selectedFormFactors.length > 0 && (<button onClick={() => setSelectedFormFactors([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Types </button>)} </div> )}
                                {/* RAM Type Filter */}
                                {currentConfig.filters.showRamType && uniqueRamTypes.length > 1 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">RAM Type:</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {uniqueRamTypes.map(rt => ( <div key={rt} className="flex items-center"> <input type="checkbox" id={`rt-${rt}`} value={rt} checked={selectedRamTypes.includes(rt)} onChange={(e) => handleMultiSelectChange(e, setSelectedRamTypes)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`rt-${rt}`} className="ml-2 block text-sm text-gray-700">{rt}</label> </div> ))} </div> {selectedRamTypes.length > 0 && (<button onClick={() => setSelectedRamTypes([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear RAM Types </button>)} </div> )}
                                {/* Memory Profile Filter */}
                                {currentConfig.filters.showMemoryProfile && uniqueMemoryProfiles.length > 0 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Memory Profile:</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {uniqueMemoryProfiles.map(profile => ( <div key={profile} className="flex items-center"> <input type="checkbox" id={`profile-${profile}`} value={profile} checked={selectedMemoryProfiles.includes(profile)} onChange={(e) => handleMultiSelectChange(e, setSelectedMemoryProfiles)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`profile-${profile}`} className="ml-2 block text-sm text-gray-700">{profile}</label> </div> ))} </div> {selectedMemoryProfiles.length > 0 && (<button onClick={() => setSelectedMemoryProfiles([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Profiles </button>)} </div> )}
                                {/* Storage Type Filter */}
                                {currentConfig.filters.showStorageType && uniqueStorageTypes.length > 1 && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Storage Type:</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {uniqueStorageTypes.map(st => ( <div key={st} className="flex items-center"> <input type="checkbox" id={`st-${st}`} value={st} checked={selectedStorageTypes.includes(st)} onChange={(e) => handleMultiSelectChange(e, setSelectedStorageTypes)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`st-${st}`} className="ml-2 block text-sm text-gray-700">{st}</label> </div> ))} </div> {selectedStorageTypes.length > 0 && (<button onClick={() => setSelectedStorageTypes([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Types </button>)} </div> )}
                                {/* CPU Core Count Filter */}
                                {currentConfig.filters.showCoreCount && selectedProductType === 'cpu' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">CPU Cores:</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {COMMON_CPU_CORES.map(core => ( <div key={`core-${core}`} className="flex items-center"> <input type="checkbox" id={`core-${core}`} value={core} checked={selectedCpuCores.includes(core)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedCpuCores)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`core-${core}`} className="ml-2 block text-sm text-gray-700">{core}</label> </div> ))} </div> {selectedCpuCores.length > 0 && (<button onClick={() => setSelectedCpuCores([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Cores </button>)} </div> )}
                                {/* CPU Clock Filter */}
                                {currentConfig.filters.showBaseClock && selectedProductType === 'cpu' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">CPU Clock (GHz):</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {COMMON_CPU_CLOCKS.map(clockRange => ( <div key={`clock-${clockRange}`} className="flex items-center"> <input type="checkbox" id={`clock-${clockRange}`} value={clockRange} checked={selectedCpuClockRanges.includes(clockRange)} onChange={(e) => handleMultiSelectChange(e, setSelectedCpuClockRanges)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`clock-${clockRange}`} className="ml-2 block text-sm text-gray-700">{clockRange}</label> </div> ))} </div> {selectedCpuClockRanges.length > 0 && (<button onClick={() => setSelectedCpuClockRanges([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Clocks </button>)} </div> )}
                                {/* GPU Memory Filter */}
                                {currentConfig.filters.showMemorySize && selectedProductType === 'videoCard' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">GPU Memory (GB):</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {COMMON_GPU_MEMORIES.map(mem => ( <div key={`gpumem-${mem}`} className="flex items-center"> <input type="checkbox" id={`gpumem-${mem}`} value={mem} checked={selectedGpuMemories.includes(mem)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedGpuMemories)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`gpumem-${mem}`} className="ml-2 block text-sm text-gray-700">{mem} GB</label> </div> ))} </div> {selectedGpuMemories.length > 0 && (<button onClick={() => setSelectedGpuMemories([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear GPU Mem </button>)} </div> )}
                                {/* PSU Wattage Filter */}
                                {currentConfig.filters.showWattage && selectedProductType === 'powerSupply' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">PSU Wattage (W):</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {COMMON_PSU_WATTAGES.map(watt => ( <div key={`watt-${watt}`} className="flex items-center"> <input type="checkbox" id={`watt-${watt}`} value={watt} checked={selectedPsuWattages.includes(watt)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedPsuWattages)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`watt-${watt}`} className="ml-2 block text-sm text-gray-700">{watt} W</label> </div> ))} </div> {selectedPsuWattages.length > 0 && (<button onClick={() => setSelectedPsuWattages([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Wattages </button>)} </div> )}
                                {/* RAM Memory Size Filter */}
                                {currentConfig.filters.showMemorySize && selectedProductType === 'memory' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Memory Size (GB):</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {COMMON_RAM_SIZES.map(size => ( <div key={`size-${size}`} className="flex items-center"> <input type="checkbox" id={`size-${size}`} value={size} checked={selectedMemorySizes.includes(size)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedMemorySizes)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`size-${size}`} className="ml-2 block text-sm text-gray-700">{size} GB</label> </div> ))} </div> {selectedMemorySizes.length > 0 && (<button onClick={() => setSelectedMemorySizes([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Sizes </button>)} </div> )}
                                {/* RAM Speed Filter */}
                                {currentConfig.filters.showRamSpeed && selectedProductType === 'memory' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Speed (MHz):</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {COMMON_RAM_SPEEDS.map(speed => ( <div key={`speed-${speed}`} className="flex items-center"> <input type="checkbox" id={`speed-${speed}`} value={speed} checked={selectedRamSpeeds.includes(speed)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedRamSpeeds)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`speed-${speed}`} className="ml-2 block text-sm text-gray-700">{speed}</label> </div> ))} </div> {selectedRamSpeeds.length > 0 && (<button onClick={() => setSelectedRamSpeeds([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Speeds </button>)} </div> )}
                                {/* CAS Latency Filter */}
                                {currentConfig.filters.showCasLatency && selectedProductType === 'memory' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">CAS Latency (CL):</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {COMMON_CAS_LATENCIES.map(cl => ( <div key={`cl-${cl}`} className="flex items-center"> <input type="checkbox" id={`cl-${cl}`} value={cl} checked={selectedCasLatencies.includes(cl)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedCasLatencies)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`cl-${cl}`} className="ml-2 block text-sm text-gray-700">CL{cl}</label> </div> ))} </div> {selectedCasLatencies.length > 0 && (<button onClick={() => setSelectedCasLatencies([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Latencies </button>)} </div> )}
                                {/* Storage Capacity Filter */}
                                {currentConfig.filters.showStorageCapacity && selectedProductType === 'storage' && ( <div> <h3 className="text-sm font-semibold text-gray-600 mb-2">Capacity:</h3> <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2"> {COMMON_STORAGE_CAPACITIES.map(cap => ( <div key={`cap-${cap}`} className="flex items-center"> <input type="checkbox" id={`cap-${cap}`} value={cap} checked={selectedStorageCapacities.includes(cap)} onChange={(e) => handleMultiSelectNumberChange(e, setSelectedStorageCapacities)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> <label htmlFor={`cap-${cap}`} className="ml-2 block text-sm text-gray-700">{cap < 1000 ? `${cap} GB` : `${cap / 1000} TB`}</label> </div> ))} </div> {selectedStorageCapacities.length > 0 && (<button onClick={() => setSelectedStorageCapacities([])} className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"> Clear Capacities </button>)} </div> )}
                             </div>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="pl-4 pr-2 py-3 text-center w-4 sticky top-0 bg-gray-50 z-10"></th>
                                {currentConfig.columns.map((col) => (
                                    <th key={col.key.toString()} scope="col"
                                        className={`py-3 px-4 text-${col.align || 'left'} text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap sticky top-0 bg-gray-50 z-10 ${col.sortable ? 'cursor-pointer hover:bg-gray-200 transition-colors duration-150' : ''}`}
                                        onClick={col.sortable ? () => handleSort(col.key.toString()) : undefined}
                                        style={{ textAlign: col.align || 'left' }}
                                        title={col.sortable ? `Sort by ${col.label}` : undefined}>
                                        {col.label}
                                        {col.sortable && getSortIndicator(col.key.toString())}
                                    </th>
                                ))}
                             </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                            {processedProducts.map((product, index) => (
                                <tr key={(product as any).id || currentConfig.getName(product) + index} className="hover:bg-gray-50 transition-colors duration-150 group">
                                     <td className="pl-4 pr-2 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                                         <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" aria-label={`Select ${currentConfig.getName(product)}`} />
                                     </td>
                                    {currentConfig.columns.map((col) => (
                                        <td key={col.key.toString()} className={`py-3 px-4 whitespace-nowrap text-sm text-${col.align || 'left'} text-gray-700 group-hover:text-gray-900`} style={{ textAlign: col.align || 'left' }}>
                                            {col.render ? col.render(product) : (product[col.key as keyof AnyComponent] != null ? String(product[col.key as keyof AnyComponent]) : '-')}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {processedProducts.length === 0 && (
                                <tr>
                                    <td colSpan={currentConfig.columns.length + 1} className="text-center py-8 px-4 text-gray-500 italic">No products match the selected filters.</td>
                                </tr>
                            )}
                         </tbody>
                     </table>
                     <div className="p-4 text-sm text-gray-500 border-t border-gray-200">Showing {processedProducts.length} of {originalProducts.length} items</div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;