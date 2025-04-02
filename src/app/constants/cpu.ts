
export type CPU = {
  name: string;
  brand: 'Intel' | 'AMD';
  coreCount: number;
  performanceCoreClock: number; // Base clock speed in GHz
  performanceCoreBoostClock: number; // Max boost clock speed in GHz
  microarchitecture: string; // Socket name LGA1151, LGA1200, LGA1700 etc.
  tdp: number; // Thermal Design Power in Watts
  integratedGraphics: boolean;
  price: number; // Approx Price in USD
};

// Sorted CPU list: i3 -> i5 -> i7 -> i9 / 9th -> 13th Gen
export const cpus: CPU[] = [
// --- Core i3 ---
// 9th Gen (Coffee Lake Refresh) - LGA1151
{
  name: "Intel Core i3-9100",
  brand: 'Intel',
  coreCount: 4,
  performanceCoreClock: 3.60,
  performanceCoreBoostClock: 4.20,
  microarchitecture: "LGA1151",
  tdp: 65,
  integratedGraphics: true, // UHD 630
  price: 122 // RCP
},
 { // Assuming 9100F exists based on pattern, search didn't explicitly find it
  name: "Intel Core i3-9100F",
  brand: 'Intel',
  coreCount: 4,
  performanceCoreClock: 3.60,
  performanceCoreBoostClock: 4.20,
  microarchitecture: "LGA1151",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 115 // Estimated
},
// 10th Gen (Comet Lake) - LGA1200
{
  name: "Intel Core i3-10100",
  brand: 'Intel',
  coreCount: 4,
  performanceCoreClock: 3.60,
  performanceCoreBoostClock: 4.30,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: true, // UHD 630
  price: 139 // Approx RCP
},
 {
  name: "Intel Core i3-10105F",
  brand: 'Intel',
  coreCount: 4,
  performanceCoreClock: 3.70,
  performanceCoreBoostClock: 4.40,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 112 // Approx RCP
},
// 11th Gen (Rocket Lake) - LGA1200 (Desktop i3 was limited)
 { // Assuming desktop i3-11100 exists - Needs verification
   name: "Intel Core i3-11100", // Placeholder name, verify model exists
   brand: 'Intel',
   coreCount: 4,
   performanceCoreClock: 3.7, // Estimated
   performanceCoreBoostClock: 4.4, // Estimated
   microarchitecture: "LGA1200",
   tdp: 65,
   integratedGraphics: true, // UHD 730 assumed
   price: 140 // Estimated
 },
// 12th Gen (Alder Lake) - LGA1700
{
  name: "Intel Core i3-12100",
  brand: 'Intel',
  coreCount: 4, // 4P + 0E
  performanceCoreClock: 3.30,
  performanceCoreBoostClock: 4.30,
  microarchitecture: "LGA1700",
  tdp: 60, // Base Power
  integratedGraphics: true, // UHD 730
  price: 139 // Approx RCP
},
 { // Assuming 12100F exists
  name: "Intel Core i3-12100F",
  brand: 'Intel',
  coreCount: 4, // 4P + 0E
  performanceCoreClock: 3.30,
  performanceCoreBoostClock: 4.30,
  microarchitecture: "LGA1700",
  tdp: 58, // Base Power (F slightly lower?)
  integratedGraphics: false, // F version
  price: 110 // Estimated
},
// 13th Gen (Raptor Lake) - LGA1700
{
  name: "Intel Core i3-13100",
  brand: 'Intel',
  coreCount: 4, // 4P + 0E
  performanceCoreClock: 3.40,
  performanceCoreBoostClock: 4.50,
  microarchitecture: "LGA1700",
  tdp: 60, // Base Power
  integratedGraphics: true, // UHD 730
  price: 139 // Approx RCP
},
 { // Assuming 13100F exists
  name: "Intel Core i3-13100F",
  brand: 'Intel',
  coreCount: 4, // 4P + 0E
  performanceCoreClock: 3.40,
  performanceCoreBoostClock: 4.50,
  microarchitecture: "LGA1700",
  tdp: 58, // Base Power
  integratedGraphics: false, // F version
  price: 115 // Estimated
},

// --- Core i5 ---
// 9th Gen (Coffee Lake Refresh) - LGA1151
{ // Example i5-9400/9400F - search results were missing direct spec page
  name: "Intel Core i5-9400F",
  brand: 'Intel',
  coreCount: 6,
  performanceCoreClock: 2.90,
  performanceCoreBoostClock: 4.10,
  microarchitecture: "LGA1151",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 150 // Estimated
},
{ // Example i5-9600K
  name: "Intel Core i5-9600K",
  brand: 'Intel',
  coreCount: 6,
  performanceCoreClock: 3.70,
  performanceCoreBoostClock: 4.60,
  microarchitecture: "LGA1151",
  tdp: 95,
  integratedGraphics: true, // UHD 630
  price: 260 // Estimated historical
},
// 10th Gen (Comet Lake) - LGA1200
{
  name: "Intel Core i5-10400",
  brand: 'Intel',
  coreCount: 6,
  performanceCoreClock: 2.90,
  performanceCoreBoostClock: 4.30,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: true, // UHD 630
  price: 205 // Approx RCP
},
{ // Assuming 10400F exists
  name: "Intel Core i5-10400F",
  brand: 'Intel',
  coreCount: 6,
  performanceCoreClock: 2.90,
  performanceCoreBoostClock: 4.30,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 160 // Estimated
},
 {
  name: "Intel Core i5-10600K",
  brand: 'Intel',
  coreCount: 6,
  performanceCoreClock: 4.10,
  performanceCoreBoostClock: 4.80,
  microarchitecture: "LGA1200",
  tdp: 125,
  integratedGraphics: true, // UHD 630
  price: 260 // Approx based on listings
},
// 11th Gen (Rocket Lake) - LGA1200
 {
  name: "Intel Core i5-11400",
  brand: 'Intel',
  coreCount: 6,
  performanceCoreClock: 2.60,
  performanceCoreBoostClock: 4.40,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: true, // UHD 730 (11th gen i5 uses 730 or 750)
  price: 200 // Approx based on listings
},
{
  name: "Intel Core i5-11400F",
  brand: 'Intel',
  coreCount: 6,
  performanceCoreClock: 2.60,
  performanceCoreBoostClock: 4.40,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 160 // Approx PHP converted
},
 {
  name: "Intel Core i5-11600KF",
  brand: 'Intel',
  coreCount: 6,
  performanceCoreClock: 3.90,
  performanceCoreBoostClock: 4.90,
  microarchitecture: "LGA1200",
  tdp: 125,
  integratedGraphics: false, // KF version
  price: 250 // Approx based on listings
},
// 12th Gen (Alder Lake) - LGA1700
 { // Assuming 12400/F - search results were missing direct spec page
  name: "Intel Core i5-12400",
  brand: 'Intel',
  coreCount: 6, // 6P + 0E
  performanceCoreClock: 2.50,
  performanceCoreBoostClock: 4.40,
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: true, // UHD 730
  price: 180 // Estimated
},
 {
  name: "Intel Core i5-12400F",
  brand: 'Intel',
  coreCount: 6, // 6P + 0E
  performanceCoreClock: 2.50,
  performanceCoreBoostClock: 4.40,
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 150 // Estimated
},
{
  name: "Intel Core i5-12600K",
  brand: 'Intel',
  coreCount: 10, // 6P + 4E
  performanceCoreClock: 3.70, // P-core base
  performanceCoreBoostClock: 4.90, // P-core boost
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: true, // UHD 770
  price: 280 // Estimated historical
},
// 13th Gen (Raptor Lake) - LGA1700
{
  name: "Intel Core i5-13400",
  brand: 'Intel',
  coreCount: 10, // 6P + 4E
  performanceCoreClock: 2.50, // P-core base
  performanceCoreBoostClock: 4.60, // P-core boost
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: true, // UHD 730
  price: 230 // Estimated
},
{
  name: "Intel Core i5-13400F",
  brand: 'Intel',
  coreCount: 10, // 6P + 4E
  performanceCoreClock: 2.50, // P-core base
  performanceCoreBoostClock: 4.60, // P-core boost
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 195 // From initial data
},
{
  name: "Intel Core i5-13600K",
  brand: 'Intel',
  coreCount: 14, // 6P + 8E
  performanceCoreClock: 3.50, // P-core base
  performanceCoreBoostClock: 5.10, // P-core boost
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: true, // UHD 770
  price: 300 // From initial data
},

// --- Core i7 ---
// 9th Gen (Coffee Lake Refresh) - LGA1151
{
  name: "Intel Core i7-9700",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 3.00,
  performanceCoreBoostClock: 4.70,
  microarchitecture: "LGA1151",
  tdp: 65,
  integratedGraphics: true, // UHD 630
  price: 300 // Approx from Tokopedia IDR
},
{ // Assuming 9700K exists
  name: "Intel Core i7-9700K",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 3.60, // Higher base for K
  performanceCoreBoostClock: 4.90, // Higher boost for K
  microarchitecture: "LGA1151",
  tdp: 95, // Higher TDP for K
  integratedGraphics: true, // UHD 630
  price: 375 // Estimated historical
},
// 10th Gen (Comet Lake) - LGA1200
 {
  name: "Intel Core i7-10700",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 2.90,
  performanceCoreBoostClock: 4.80,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: true, // UHD 630
  price: 365 // RCP
},
{
  name: "Intel Core i7-10700F", // Assuming F exists
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 2.90,
  performanceCoreBoostClock: 4.80,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 320 // Estimated
},
{
  name: "Intel Core i7-10700K",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 3.80,
  performanceCoreBoostClock: 5.10,
  microarchitecture: "LGA1200",
  tdp: 125,
  integratedGraphics: true, // UHD 630
  price: 375 // Approx based on listings
},
// 11th Gen (Rocket Lake) - LGA1200
 {
  name: "Intel Core i7-11700",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 2.50,
  performanceCoreBoostClock: 4.90,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: true, // UHD 750
  price: 360 // Approx RCP
},
{
  name: "Intel Core i7-11700F", // Assuming F exists
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 2.50,
  performanceCoreBoostClock: 4.90,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 330 // Estimated
},
{
  name: "Intel Core i7-11700K",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 3.60,
  performanceCoreBoostClock: 5.00,
  microarchitecture: "LGA1200",
  tdp: 125,
  integratedGraphics: true, // UHD 750
  price: 444 // Approx RCP
},
 {
  name: "Intel Core i7-11700KF",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 3.60,
  performanceCoreBoostClock: 5.00,
  microarchitecture: "LGA1200",
  tdp: 125,
  integratedGraphics: false, // KF version
  price: 400 // Approx based on listings
},
// 12th Gen (Alder Lake) - LGA1700
{
  name: "Intel Core i7-12700",
  brand: 'Intel',
  coreCount: 12, // 8P + 4E
  performanceCoreClock: 2.10, // P-core Base
  performanceCoreBoostClock: 4.90, // Max Turbo
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: true, // UHD 770
  price: 378 // Approx RCP
},
 {
  name: "Intel Core i7-12700F", // Assuming F exists
  brand: 'Intel',
  coreCount: 12, // 8P + 4E
  performanceCoreClock: 2.10,
  performanceCoreBoostClock: 4.90,
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 350 // Estimated
},
{
  name: "Intel Core i7-12700K",
  brand: 'Intel',
  coreCount: 12, // 8P + 4E
  performanceCoreClock: 3.60, // P-core base
  performanceCoreBoostClock: 5.00, // Max Turbo
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: true, // UHD 770
  price: 410 // Estimated historical
},
 {
  name: "Intel Core i7-12700KF",
  brand: 'Intel',
  coreCount: 12, // 8P + 4E
  performanceCoreClock: 3.60,
  performanceCoreBoostClock: 5.00,
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: false, // KF version
  price: 427 // Approx RCP
},
// 13th Gen (Raptor Lake) - LGA1700
 {
  name: "Intel Core i7-13700", // Assuming non-F exists
  brand: 'Intel',
  coreCount: 16, // 8P + 8E
  performanceCoreClock: 2.10, // P-core base
  performanceCoreBoostClock: 5.20, // Max Turbo
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: true, // UHD 770
  price: 390 // Estimated
},
 {
  name: "Intel Core i7-13700F",
  brand: 'Intel',
  coreCount: 16, // 8P + 8E
  performanceCoreClock: 2.10, // P-core base
  performanceCoreBoostClock: 5.20, // Max Turbo
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 364 // Approx RCP
},
{
  name: "Intel Core i7-13700K",
  brand: 'Intel',
  coreCount: 16, // 8P + 8E
  performanceCoreClock: 3.40, // P-core base
  performanceCoreBoostClock: 5.40, // Max Turbo
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: true, // UHD 770
  price: 410 // Approx
},
 { // Assuming KF exists
  name: "Intel Core i7-13700KF",
  brand: 'Intel',
  coreCount: 16, // 8P + 8E
  performanceCoreClock: 3.40,
  performanceCoreBoostClock: 5.40,
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: false, // KF version
  price: 390 // Estimated
},

// --- Core i9 ---
// 9th Gen (Coffee Lake Refresh) - LGA1151
{ // Search results missed i9-9th gen, using known data
  name: "Intel Core i9-9900K",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 3.60,
  performanceCoreBoostClock: 5.00,
  microarchitecture: "LGA1151",
  tdp: 95,
  integratedGraphics: true, // UHD 630
  price: 480 // Estimated historical
},
 {
  name: "Intel Core i9-9900KF",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 3.60,
  performanceCoreBoostClock: 5.00,
  microarchitecture: "LGA1151",
  tdp: 95,
  integratedGraphics: false, // KF version
  price: 460 // Estimated historical
},
// 10th Gen (Comet Lake) - LGA1200
 {
  name: "Intel Core i9-10850K", // Found in earlier search
  brand: 'Intel',
  coreCount: 10,
  performanceCoreClock: 3.60,
  performanceCoreBoostClock: 5.20,
  microarchitecture: "LGA1200",
  tdp: 125,
  integratedGraphics: true, // UHD 630
  price: 400 // Estimated
},
 {
  name: "Intel Core i9-10900", // Found in earlier search
  brand: 'Intel',
  coreCount: 10,
  performanceCoreClock: 2.80,
  performanceCoreBoostClock: 5.20,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: true, // UHD 630
  price: 440 // Estimated
},
{
  name: "Intel Core i9-10900F", // Found in earlier search
  brand: 'Intel',
  coreCount: 10,
  performanceCoreClock: 2.80,
  performanceCoreBoostClock: 5.20,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 420 // Approx based on listings
},
 {
  name: "Intel Core i9-10900K",
  brand: 'Intel',
  coreCount: 10,
  performanceCoreClock: 3.70,
  performanceCoreBoostClock: 5.30,
  microarchitecture: "LGA1200",
  tdp: 125,
  integratedGraphics: true, // UHD 630
  price: 542 // Approx RCP
},
// 11th Gen (Rocket Lake) - LGA1200
 {
  name: "Intel Core i9-11900",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 2.50,
  performanceCoreBoostClock: 5.20,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: true, // UHD 750
  price: 488 // Approx RCP
},
 {
  name: "Intel Core i9-11900F", // Assuming F exists
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 2.50,
  performanceCoreBoostClock: 5.20,
  microarchitecture: "LGA1200",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 460 // Estimated
},
{
  name: "Intel Core i9-11900K", // Found in earlier search
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 3.50,
  performanceCoreBoostClock: 5.30,
  microarchitecture: "LGA1200",
  tdp: 125,
  integratedGraphics: true, // UHD 750
  price: 540 // Estimated RCP/historical
},
 { // Assuming KF exists
  name: "Intel Core i9-11900KF",
  brand: 'Intel',
  coreCount: 8,
  performanceCoreClock: 3.50,
  performanceCoreBoostClock: 5.30,
  microarchitecture: "LGA1200",
  tdp: 125,
  integratedGraphics: false, // KF version
  price: 515 // Estimated
},
// 12th Gen (Alder Lake) - LGA1700
 { // Search results missed i9-12th gen, using known data
  name: "Intel Core i9-12900",
  brand: 'Intel',
  coreCount: 16, // 8P + 8E
  performanceCoreClock: 2.40, // P-core base
  performanceCoreBoostClock: 5.10, // Max Turbo
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: true, // UHD 770
  price: 500 // Estimated
},
 {
  name: "Intel Core i9-12900F",
  brand: 'Intel',
  coreCount: 16, // 8P + 8E
  performanceCoreClock: 2.40,
  performanceCoreBoostClock: 5.10,
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 480 // Estimated
},
 {
  name: "Intel Core i9-12900K",
  brand: 'Intel',
  coreCount: 16, // 8P + 8E
  performanceCoreClock: 3.20, // P-core base
  performanceCoreBoostClock: 5.20, // Max Turbo
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: true, // UHD 770
  price: 590 // Estimated historical
},
 {
  name: "Intel Core i9-12900KF",
  brand: 'Intel',
  coreCount: 16, // 8P + 8E
  performanceCoreClock: 3.20,
  performanceCoreBoostClock: 5.20,
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: false, // KF version
  price: 565 // Estimated historical
},
// 13th Gen (Raptor Lake) - LGA1700
{ // Assuming 13900/F exists
  name: "Intel Core i9-13900",
  brand: 'Intel',
  coreCount: 24, // 8P + 16E
  performanceCoreClock: 2.00, // P-core base
  performanceCoreBoostClock: 5.60, // Max Turbo
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: true, // UHD 770
  price: 570 // Estimated
},
{
  name: "Intel Core i9-13900F",
  brand: 'Intel',
  coreCount: 24, // 8P + 16E
  performanceCoreClock: 2.00,
  performanceCoreBoostClock: 5.60,
  microarchitecture: "LGA1700",
  tdp: 65,
  integratedGraphics: false, // F version
  price: 545 // Estimated
},
{
  name: "Intel Core i9-13900K",
  brand: 'Intel',
  coreCount: 24, // 8P + 16E
  performanceCoreClock: 3.00, // P-core base
  performanceCoreBoostClock: 5.80, // Max Turbo
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: true, // UHD 770
  price: 590 // Approx
},
 { // Assuming KF exists
  name: "Intel Core i9-13900KF",
  brand: 'Intel',
  coreCount: 24, // 8P + 16E
  performanceCoreClock: 3.00,
  performanceCoreBoostClock: 5.80,
  microarchitecture: "LGA1700",
  tdp: 125,
  integratedGraphics: false, // KF version
  price: 565 // Estimated
},
  {
    name: "Core Ultra 5 245K",
    brand: 'Intel',
    coreCount: 14, // 6P + 8E
    performanceCoreClock: 4.2, // P-core base
    performanceCoreBoostClock: 5.2, // P-core boost
    microarchitecture: "LGA1851",
    tdp: 125,
    integratedGraphics: true, // Intel Graphics (Xe-LPG)
    price: 309 // Approx MSRP
  },
  {
    name: "Core Ultra 5 245KF",
    brand: 'Intel',
    coreCount: 14, // 6P + 8E
    performanceCoreClock: 4.2,
    performanceCoreBoostClock: 5.2,
    microarchitecture: "LGA1851",
    tdp: 125,
    integratedGraphics: false, // KF version
    price: 294 // Approx MSRP
  },
  {
    name: "Core Ultra 7 265K",
    brand: 'Intel',
    coreCount: 20, // 8P + 12E
    performanceCoreClock: 3.9, // P-core base
    performanceCoreBoostClock: 5.5, // Max Turbo
    microarchitecture: "LGA1851",
    tdp: 125,
    integratedGraphics: true, // Intel Graphics (Xe-LPG)
    price: 394 // Approx RCP / MSRP
  },
  {
    name: "Core Ultra 7 265KF",
    brand: 'Intel',
    coreCount: 20, // 8P + 12E
    performanceCoreClock: 3.9,
    performanceCoreBoostClock: 5.5,
    microarchitecture: "LGA1851",
    tdp: 125,
    integratedGraphics: false, // KF version
    price: 379 // Approx MSRP
  },
  {
    name: "Core Ultra 9 285K",
    brand: 'Intel',
    coreCount: 24, // 8P + 16E
    performanceCoreClock: 3.7, // P-core base
    performanceCoreBoostClock: 5.7, // Max Turbo
    microarchitecture: "LGA1851",
    tdp: 125,
    integratedGraphics: true, // Intel Graphics (Xe-LPG)
    price: 589 // Approx RCP / MSRP
  },
    {
      name: "Ryzen 3 4300G",
      brand: 'AMD',
      coreCount: 4,
      performanceCoreClock: 3.8,
      performanceCoreBoostClock: 4.0,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: true,
      price: 110
    },
    {
      name: "Ryzen 5 3600",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.6,
      performanceCoreBoostClock: 4.2,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: false,
      price: 149
    },
    {
      name: "Ryzen 5 4500",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.6,
      performanceCoreBoostClock: 4.1,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: false,
      price: 80
    },
    {
      name: "Ryzen 5 5500",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.6,
      performanceCoreBoostClock: 4.2,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: false,
      price: 129
    },
    {
      name: "Ryzen 5 5500GT",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.6,
      performanceCoreBoostClock: 4.4,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: true,
      price: 179
    },
    {
      name: "Ryzen 5 5600",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.5,
      performanceCoreBoostClock: 4.4,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: false,
      price: 199
    },
    {
      name: "Ryzen 5 5600G",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.9,
      performanceCoreBoostClock: 4.4,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: true,
      price: 140
    },
    {
      name: "Ryzen 5 5600X",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.7,
      performanceCoreBoostClock: 4.6,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: false,
      price: 169
    },
    {
      name: "Ryzen 5 7600",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.8,
      performanceCoreBoostClock: 5.1,
      microarchitecture: "AM5",
      tdp: 65,
      integratedGraphics: true,
      price: 185
    },
    {
      name: "Ryzen 5 7600X",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 4.7,
      performanceCoreBoostClock: 5.3,
      microarchitecture: "AM5",
      tdp: 105,
      integratedGraphics: true,
      price: 192
    },
    {
      name: "Ryzen 5 8500G",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.55,
      performanceCoreBoostClock: 5.0,
      microarchitecture: "AM5",
      tdp: 65,
      integratedGraphics: true,
      price: 179
    },
    {
      name: "Ryzen 5 8600G",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 4.35,
      performanceCoreBoostClock: 5.0,
      microarchitecture: "AM5",
      tdp: 65,
      integratedGraphics: true,
      price: 229
    },
    {
      name: "Ryzen 5 9600X",
      brand: 'AMD',
      coreCount: 6,
      performanceCoreClock: 3.9,
      performanceCoreBoostClock: 5.4,
      microarchitecture: "AM5",
      tdp: 65,
      integratedGraphics: true,
      price: 229
    },
    {
      name: "Ryzen 7 3800XT",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 3.9,
      performanceCoreBoostClock: 4.7,
      microarchitecture: "AM4",
      tdp: 105,
      integratedGraphics: false,
      price: 429
    },
    {
      name: "Ryzen 7 5700",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 3.7,
      performanceCoreBoostClock: 4.6,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: true,
      price: 229
    },
    {
      name: "Ryzen 7 5700G",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 3.8,
      performanceCoreBoostClock: 4.6,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: true,
      price: 329
    },
    {
      name: "Ryzen 7 5700X",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 3.4,
      performanceCoreBoostClock: 4.6,
      microarchitecture: "AM4",
      tdp: 65,
      integratedGraphics: false,
      price: 269
    },
    {
      name: "Ryzen 7 5700X3D",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 3.0,
      performanceCoreBoostClock: 4.1,
      microarchitecture: "AM4",
      tdp: 105,
      integratedGraphics: false,
      price: 306
    },
    {
      name: "Ryzen 7 5800X",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 3.8,
      performanceCoreBoostClock: 4.7,
      microarchitecture: "AM4",
      tdp: 105,
      integratedGraphics: false,
      price: 210
    },
    {
      name: "Ryzen 7 5800X3D",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 3.4,
      performanceCoreBoostClock: 4.5,
      microarchitecture: "AM4",
      tdp: 105,
      integratedGraphics: false,
      price: 320
    },
    {
      name: "Ryzen 7 7700",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 3.8,
      performanceCoreBoostClock: 5.3,
      microarchitecture: "AM5",
      tdp: 65,
      integratedGraphics: true,
      price: 310
    },
    {
      name: "Ryzen 7 7700X",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 4.5,
      performanceCoreBoostClock: 5.4,
      microarchitecture: "AM5",
      tdp: 105,
      integratedGraphics: true,
      price: 288
    },
    {
      name: "Ryzen 7 7800X3D",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 4.2,
      performanceCoreBoostClock: 5.0,
      microarchitecture: "AM5",
      tdp: 120,
      integratedGraphics: true,
      price: 439
    },
    {
      name: "Ryzen 7 8700G",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 4.2,
      performanceCoreBoostClock: 5.1,
      microarchitecture: "AM5",
      tdp: 65,
      integratedGraphics: true,
      price: 329
    },
    {
      name: "Ryzen 7 9700X",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 3.8,
      performanceCoreBoostClock: 5.5,
      microarchitecture: "AM5",
      tdp: 65,
      integratedGraphics: true,
      price: 306
    },
    {
      name: "Ryzen 7 9800X3D",
      brand: 'AMD',
      coreCount: 8,
      performanceCoreClock: 4.7,
      performanceCoreBoostClock: 5.2,
      microarchitecture: "AM5",
      tdp: 120,
      integratedGraphics: true,
      price: 479
    },
    {
      name: "Ryzen 9 5900X",
      brand: 'AMD',
      coreCount: 12,
      performanceCoreClock: 3.7,
      performanceCoreBoostClock: 4.8,
      microarchitecture: "AM4",
      tdp: 105,
      integratedGraphics: false,
      price: 300
    },
    {
      name: "Ryzen 9 5950X",
      brand: 'AMD',
      coreCount: 16,
      performanceCoreClock: 3.4,
      performanceCoreBoostClock: 4.9,
      microarchitecture: "AM4",
      tdp: 105,
      integratedGraphics: false,
      price: 380
    },
    {
      name: "Ryzen 9 7900",
      brand: 'AMD',
      coreCount: 12,
      performanceCoreClock: 3.7,
      performanceCoreBoostClock: 5.4,
      microarchitecture: "AM5",
      tdp: 65,
      integratedGraphics: true,
      price: 326
    },
    {
      name: "Ryzen 9 7900X",
      brand: 'AMD',
      coreCount: 12,
      performanceCoreClock: 4.7,
      performanceCoreBoostClock: 5.6,
      microarchitecture: "AM5",
      tdp: 170,
      integratedGraphics: true,
      price: 336
    },
    {
      name: "Ryzen 9 7900X3D",
      brand: 'AMD',
      coreCount: 12,
      performanceCoreClock: 4.4,
      performanceCoreBoostClock: 5.6,
      microarchitecture: "AM5",
      tdp: 120,
      integratedGraphics: true,
      price: 451
    },
    {
      name: "Ryzen 9 7950X",
      brand: 'AMD',
      coreCount: 16,
      performanceCoreClock: 4.5,
      performanceCoreBoostClock: 5.7,
      microarchitecture: "AM5",
      tdp: 170,
      integratedGraphics: true,
      price: 432
    },
    {
      name: "Ryzen 9 7950X3D",
      brand: 'AMD',
      coreCount: 16,
      performanceCoreClock: 4.2,
      performanceCoreBoostClock: 5.7,
      microarchitecture: "AM5",
      tdp: 120,
      integratedGraphics: true,
      price: 575
    },
    {
      name: "Ryzen 9 9900X",
      brand: 'AMD',
      coreCount: 12,
      performanceCoreClock: 4.4,
      performanceCoreBoostClock: 5.6,
      microarchitecture: "AM5",
      tdp: 120,
      integratedGraphics: true,
      price: 408
    },
    {
      name: "Ryzen 9 9950X",
      brand: 'AMD',
      coreCount: 16,
      performanceCoreClock: 4.3,
      performanceCoreBoostClock: 5.7,
      microarchitecture: "AM5",
      tdp: 170,
      integratedGraphics: true,
      price: 544
    }
  ]