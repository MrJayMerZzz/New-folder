// components/CPUproduct.tsx (Recommended filename change)
"use client";

import React, { useState, useMemo, ChangeEvent } from 'react';
// Import the data map and specific types needed
import { componentDataMap, CPU } from '../constants/data'; // Adjust the import path as necessary

type SortableCpuKey = keyof CPU | 'integratedGraphicsText';

const cpuTableColumns: { key: SortableCpuKey; label: string; align?: 'left' | 'right' | 'center'; sortable?: boolean }[] = [
  { key: 'name', label: 'Name', align: 'left', sortable: true },
  { key: 'coreCount', label: 'Cores', align: 'center', sortable: true },
  { key: 'performanceCoreClock', label: 'Base Clock', align: 'right', sortable: true },
  { key: 'performanceCoreBoostClock', label: 'Boost Clock', align: 'right', sortable: true },
  { key: 'microarchitecture', label: 'Socket', align: 'left', sortable: true },
  { key: 'tdp', label: 'TDP', align: 'right', sortable: true },
  { key: 'integratedGraphicsText', label: 'iGPU', align: 'left', sortable: false },
  { key: 'price', label: 'Price', align: 'right', sortable: true },
];

// Renamed component function
const CPUproduct: React.FC = () => {
  const originalProducts = componentDataMap.cpu as CPU[];

  // --- State for Filters ---
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [coreCountMin, setCoreCountMin] = useState<number>(0);
  const [coreCountMax, setCoreCountMax] = useState<number>(64);
  const [baseClockMin, setBaseClockMin] = useState<number>(1.0);
  const [baseClockMax, setBaseClockMax] = useState<number>(5.0);
  const [boostClockMin, setBoostClockMin] = useState<number>(3.0);
  const [boostClockMax, setBoostClockMax] = useState<number>(6.0);

  // --- State for Sorting ---
   const [sortColumn, setSortColumn] = useState<SortableCpuKey | null>(null);
   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // --- Calculate Min/Max Ranges for Sliders from Data ---
  const dataRanges = useMemo(() => {
    let minCores = Infinity, maxCores = -Infinity;
    let minBase = Infinity, maxBase = -Infinity;
    let minBoost = Infinity, maxBoost = -Infinity;

    originalProducts.forEach(p => {
      if (p.coreCount != null) {
        minCores = Math.min(minCores, p.coreCount);
        maxCores = Math.max(maxCores, p.coreCount);
      }
      if (p.performanceCoreClock != null) {
        minBase = Math.min(minBase, p.performanceCoreClock);
        maxBase = Math.max(maxBase, p.performanceCoreClock);
      }
       if (p.performanceCoreBoostClock != null) {
        minBoost = Math.min(minBoost, p.performanceCoreBoostClock);
        maxBoost = Math.max(maxBoost, p.performanceCoreBoostClock);
      }
    });
    return {
        core: { min: isFinite(minCores) ? minCores : 1, max: isFinite(maxCores) ? maxCores : 64 },
        base: { min: isFinite(minBase) ? Math.floor(minBase*10)/10 : 1.0, max: isFinite(maxBase) ? Math.ceil(maxBase*10)/10 : 5.0 },
        boost: { min: isFinite(minBoost) ? Math.floor(minBoost*10)/10 : 3.0, max: isFinite(maxBoost) ? Math.ceil(maxBoost*10)/10 : 6.0 }
    };
  }, [originalProducts]);

   // Initialize filter state based on actual data ranges
   useState(() => {
       setCoreCountMin(dataRanges.core.min);
       setCoreCountMax(dataRanges.core.max);
       setBaseClockMin(dataRanges.base.min);
       setBaseClockMax(dataRanges.base.max);
       setBoostClockMin(dataRanges.boost.min);
       setBoostClockMax(dataRanges.boost.max);
   });


  const handleSort = (columnKey: SortableCpuKey) => {
      if (sortColumn === columnKey) {
          setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
      } else {
          setSortColumn(columnKey);
          setSortDirection('asc');
      }
  };


  const handleBrandChange = (event: ChangeEvent<HTMLInputElement>) => {
    const brandName = event.target.value;
    const isChecked = event.target.checked;
    setSelectedBrands(prevSelected => isChecked ? [...prevSelected, brandName] : prevSelected.filter(b => b !== brandName));
  };

  const availableBrands = useMemo(() => {
     const brands = new Set(originalProducts.map(p => p.brand));
     return Array.from(brands).sort();
   }, [originalProducts]);


  // --- Memoize the FILTERED and SORTED data ---
  const processedProducts = useMemo(() => {
    const minCores = coreCountMin;
    const maxCores = coreCountMax;
    const minBase = baseClockMin;
    const maxBase = baseClockMax;
    const minBoost = boostClockMin;
    const maxBoost = boostClockMax;

    let filtered = originalProducts.filter(product => {
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const coreMatch = product.coreCount >= minCores && product.coreCount <= maxCores;
      const baseClockMatch = product.performanceCoreClock >= minBase && product.performanceCoreClock <= maxBase;
      const boostClockMatch = product.performanceCoreBoostClock >= minBoost && product.performanceCoreBoostClock <= maxBoost;
      return brandMatch && coreMatch && baseClockMatch && boostClockMatch;
    });

    // Apply Sorting
    if (sortColumn) {
      filtered.sort((a, b) => {
        const valA = a[sortColumn as keyof CPU];
        const valB = b[sortColumn as keyof CPU];
        let comparison = 0;
        if (valA == null && valB == null) comparison = 0;
        else if (valA == null) comparison = -1;
        else if (valB == null) comparison = 1;
        else if (typeof valA === 'number' && typeof valB === 'number') comparison = valA - valB;
        else if (typeof valA === 'string' && typeof valB === 'string') comparison = valA.localeCompare(valB);
        return sortDirection === 'asc' ? comparison : comparison * -1;
      });
    }

    return filtered;
  }, [
      originalProducts, selectedBrands,
      coreCountMin, coreCountMax, baseClockMin, baseClockMax, boostClockMin, boostClockMax,
      sortColumn, sortDirection
    ]);


  const getIntegratedGraphicsText = (cpu: CPU): string => {
    if (cpu.integratedGraphics === true) return cpu.brand === 'Intel' ? 'Intel UHD/Graphics' : 'Radeon';
    if (cpu.integratedGraphics === false) return 'None';
    return 'N/A';
  };

  const getSortIndicator = (columnKey: SortableCpuKey): string => {
    if (sortColumn !== columnKey) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <h1 className="text-2xl font-bold p-6 text-left text-gray-800 border-b border-gray-200">CPU Products</h1>

        {/* --- Filters Section --- */}
        <div className="p-4 border-b border-gray-200 space-y-4">
           {/* Brand Filter */}
           <div>
             <h3 className="text-sm font-semibold text-gray-600 mb-2">Filter by Brand:</h3>
             <div className="flex flex-wrap gap-x-4 gap-y-2">
               {availableBrands.map(brand => (
                 <div key={brand} className="flex items-center">
                   <input type="checkbox" id={`brand-${brand}`} value={brand} checked={selectedBrands.includes(brand)} onChange={handleBrandChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                   <label htmlFor={`brand-${brand}`} className="ml-2 block text-sm text-gray-700">{brand}</label>
                 </div>
               ))}
                {selectedBrands.length > 0 && ( <button onClick={() => setSelectedBrands([])} className="text-xs text-indigo-600 hover:text-indigo-800"> Clear Brands </button> )}
             </div>
           </div>

           {/* Range Sliders */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {/* Core Count Filter */}
             <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-600">Core Count: {coreCountMin} - {coreCountMax}</label>
                <div className="space-y-1">
                   <input type="range" value={coreCountMin} min={dataRanges.core.min} max={dataRanges.core.max} step="1" onChange={(e) => setCoreCountMin(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                   <input type="range" value={coreCountMax} min={dataRanges.core.min} max={dataRanges.core.max} step="1" onChange={(e) => setCoreCountMax(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                </div>
             </div>
              {/* Base Clock Filter */}
             <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-600">Base Clock (GHz): {baseClockMin.toFixed(1)} - {baseClockMax.toFixed(1)}</label>
                 <div className="space-y-1">
                   <input type="range" value={baseClockMin} min={dataRanges.base.min} max={dataRanges.base.max} step="0.1" onChange={(e) => setBaseClockMin(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                   <input type="range" value={baseClockMax} min={dataRanges.base.min} max={dataRanges.base.max} step="0.1" onChange={(e) => setBaseClockMax(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                </div>
             </div>
             {/* Boost Clock Filter */}
             <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-600">Boost Clock (GHz): {boostClockMin.toFixed(1)} - {boostClockMax.toFixed(1)}</label>
                 <div className="space-y-1">
                    <input type="range" value={boostClockMin} min={dataRanges.boost.min} max={dataRanges.boost.max} step="0.1" onChange={(e) => setBoostClockMin(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                    <input type="range" value={boostClockMax} min={dataRanges.boost.min} max={dataRanges.boost.max} step="0.1" onChange={(e) => setBoostClockMax(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                </div>
             </div>
           </div>
        </div>


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
             <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="pl-4 pr-2 py-3 text-center w-4"></th>
                {cpuTableColumns.map((col) => (
                  <th key={col.key} scope="col"
                      className={`py-3 px-4 text-${col.align || 'left'} text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap ${col.sortable ? 'cursor-pointer hover:bg-gray-200' : ''}`}
                      onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    {col.label}
                    {col.sortable && getSortIndicator(col.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processedProducts.map((product, index) => (
                <tr key={product.name + index} className="hover:bg-gray-50 transition-colors duration-150">
                   <td className="pl-4 pr-2 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                     <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                   </td>
                   {cpuTableColumns.map((col) => (
                     <td key={col.key} className={`py-3 px-4 whitespace-nowrap text-sm text-${col.align || 'left'} text-gray-700`}>
                       {(() => {
                          switch (col.key) {
                              case 'name': return <span className="font-medium text-gray-900">{`${product.brand} ${product.name}`}</span>;
                              case 'coreCount': return product.coreCount;
                              case 'performanceCoreClock': case 'performanceCoreBoostClock': return product[col.key] ? `${product[col.key]?.toFixed(1)} GHz` : '-';
                              case 'microarchitecture': return product.microarchitecture;
                              case 'tdp': return product.tdp ? `${product.tdp} W` : '-';
                              case 'integratedGraphicsText': return getIntegratedGraphicsText(product);
                              case 'price': return product.price != null ? `$${product.price.toFixed(2)}` : '-';
                              default: const keyTyped = col.key as keyof CPU; return product[keyTyped] != null ? String(product[keyTyped]) : '-';
                          }
                       })()}
                     </td>
                   ))}
                </tr>
              ))}
              {processedProducts.length === 0 && (
                <tr>
                  <td colSpan={cpuTableColumns.length + 1} className="text-center py-4 text-gray-500 italic">
                    No CPUs match the selected filters.
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

// Renamed default export
export default CPUproduct;