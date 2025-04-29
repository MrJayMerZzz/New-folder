import React from 'react';

// Define the GuidePage component
const GuidePage: React.FC = () => {
  return (
    // Using a fragment as the top-level element
    <>
      {/* Main container with padding and max-width */}
      {/* No background class needed here, as layout handles the page background */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Header Section - Centered text */}
        <header className="mb-8 text-center">
          {/* Main title */}
          <h1 className="text-4xl font-bold text-white mb-2">
            Beginner's Guide to Building Your Own PC
          </h1>
          {/* Subtitle */}
          <p className="text-lg text-gray-600">
            Everything you need to know to get started with your first build.
          </p>
        </header>

        {/* Main Content Area - White background, padding, rounded corners, shadow */}
        <main className="bg-white p-6 md:p-8 rounded-lg shadow-md">

          {/* Introduction Section - Bottom margin and border */}
          <section className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Introduction: Why Build Your Own PC?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to the exciting world of PC building! Building your own computer might seem daunting at first, but it's a rewarding experience that offers several advantages over buying a pre-built system. You get complete control over the components, often better value for your money, and the satisfaction of creating something uniquely yours.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This guide is designed for beginners and will walk you through the essential steps, from planning your build to selecting components. By the end, you'll have a better understanding of:
            </p>
            {/* Example list */}
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
              <li>Defining the purpose and budget for your PC.</li>
              <li>Understanding the core components and their roles.</li>
              <li>Choosing compatible parts.</li>
              <li>(Future steps: Assembling the PC, Installing the OS, etc.)</li>
            </ul>
          </section>

          {/* Step/Section 1 */}
          <section className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 1: Define Your Purpose and Budget
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before you even think about specific parts, the most crucial first step is figuring out <strong>what you will use the PC for</strong> and <strong>how much you're willing to spend</strong>. These two factors will heavily influence every component choice you make.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">What's the PC's Main Job?</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>
                <strong>General Use / Office Work:</strong> Web browsing, email, word processing, spreadsheets. Requires less powerful components, focusing on reliability and responsiveness. Budget can be lower.
              </li>
              <li>
                <strong>Gaming:</strong> Requires a powerful graphics card (GPU) and a capable processor (CPU). The desired resolution (1080p, 1440p, 4K) and target frame rate will dictate the budget significantly. Faster RAM and storage are also beneficial.
              </li>
              <li>
                <strong>Content Creation (Video Editing, Graphic Design, 3D Rendering):</strong> Needs a strong multi-core CPU, plenty of RAM (32GB+ often recommended), a capable GPU (especially for video rendering/effects), and fast, large storage.
              </li>
              <li>
                <strong>Home Theater PC (HTPC):</strong> Focuses on quiet operation, small form factor (like Mini-ITX), and potentially good integrated graphics or a low-power dedicated GPU for video playback.
              </li>
              <li>
                <strong>Workstation (CAD, Scientific Computing):</strong> Often requires specialized workstation GPUs (like NVIDIA Quadro or AMD Radeon Pro), high core count CPUs, and large amounts of ECC RAM.
              </li>
              <li>
                <strong>Server:</strong> Prioritizes stability, uptime, remote access, and data handling. Often uses ECC RAM, RAID storage configurations, and may run headless (no monitor). Components are selected for long-term 24/7 reliability.
              </li>
              </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Setting Your Budget</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once you know the purpose, set a realistic budget. PC build costs can range from a few hundred dollars for basic systems to several thousand for high-end gaming or workstation rigs. Remember to account for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>All core components (CPU, GPU, RAM, Motherboard, Storage, PSU, Case).</li>
              <li>Operating System (Windows, Linux).</li>
              <li>Peripherals (Monitor, Keyboard, Mouse).</li>
              <li>Potential extras (CPU Cooler if not included, Case Fans, Wi-Fi adapter).</li>
            </ul>
            {/* Tip Box */}
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md mt-6 mb-4">
              <h3 className="font-semibold mb-2">Budgeting Tip</h3>
              <p>
                It's often helpful to allocate percentages of your budget to different components. For gaming PCs, the GPU usually takes the largest chunk (30-50%). For content creation, the CPU and RAM might be prioritized more heavily.
              </p>
            </div>
          </section>

          {/* Step/Section 2 */}
          <section className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 2: Understanding the Core Components
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Now that you have a purpose and budget, let's briefly introduce the main parts of a computer and what they do. We'll dive deeper into selecting each one in later steps.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>CPU (Central Processing Unit):</strong> The "brain" of the computer, performs calculations and executes instructions.</li>
              <li><strong>GPU (Graphics Processing Unit / Video Card):</strong> Renders images, video, and animations, crucial for gaming and visual tasks.</li>
              <li><strong>RAM (Random Access Memory):</strong> Short-term memory for active programs and data, allowing quick access.</li>
              <li><strong>Motherboard:</strong> The main circuit board connecting all components. Compatibility is key here.</li>
              <li><strong>Storage (SSD/HDD):</strong> Long-term storage for the operating system, applications, and files (SSDs are much faster than HDDs).</li>
              <li><strong>PSU (Power Supply Unit):</strong> Converts wall power to usable power for the components. Needs sufficient wattage and reliability.</li>
              <li><strong>Case:</strong> Houses all the components. Needs to fit everything and provide adequate airflow.</li>
              <li><strong>CPU Cooler:</strong> Keeps the CPU from overheating (some CPUs come with one, but aftermarket coolers are often better).</li>
            </ul>
          </section>

          {/* Step/Section 3 */}
            <section className="mb-8 pb-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Step 3: Choosing Your CPU and Motherboard
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The CPU and motherboard are tightly linked, as they must be compatible in terms of socket and chipset. Start with the CPU based on your needs and then find a compatible motherboard.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Choosing a CPU</h3>
                 <p className="text-gray-700 leading-relaxed mb-4">
                    For general use, an entry-level CPU like an Intel Core i3 or AMD Ryzen 3 may suffice. For gaming or productivity, mid- to high-end CPUs (e.g., Ryzen 5, Ryzen 7, Intel Core i5, i7) are recommended.
                </p>
  <h3 className="text-xl font-semibold text-gray-800 mb-3">Choosing a Motherboard</h3>
  <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li><strong>Socket:</strong> Must match the CPU (e.g., AM5 for Ryzen 7000, LGA 1700 for Intel 12th/13th Gen).</li>
    <li><strong>Form Factor:</strong> ATX, Micro-ATX, or Mini-ITX — this affects case compatibility.</li>
    <li><strong>Chipset:</strong> Determines features like overclocking, PCIe lanes, and connectivity.</li>
    <li><strong>RAM support:</strong> DDR4 or DDR5, max capacity, and number of slots.</li>
  </ul>
</section>

{/* Step/Section 4 */}
<section className="mb-8 pb-6 border-b border-gray-200">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
    Step 4: Choosing Your RAM
  </h2>
  <p className="text-gray-700 leading-relaxed mb-4">
    RAM (memory) affects how many tasks your computer can handle at once. For most users, 16GB is a solid starting point. Content creators and professionals may benefit from 32GB or more.
  </p>
  <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li><strong>Capacity:</strong> 8GB for basic use, 16GB for gaming, 32GB+ for editing/rendering.</li>
    <li><strong>Speed:</strong> Measured in MHz (e.g., 3200MHz, 6000MHz for DDR5). Faster speeds benefit certain workloads.</li>
    <li><strong>Channels:</strong> Dual-channel (2 sticks) is preferable to single-stick configurations.</li>
    <li><strong>Compatibility:</strong> Make sure the RAM type (DDR4 or DDR5) is supported by your motherboard.</li>
  </ul>
</section>

{/* Step/Section 5 */}
<section className="mb-8 pb-6 border-b border-gray-200">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
    Step 5: Choosing Storage
  </h2>
  <p className="text-gray-700 leading-relaxed mb-4">
    Storage determines how fast your system boots and how quickly applications load. SSDs are the modern standard due to their speed and reliability.
  </p>
  <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li><strong>SSD (Solid State Drive):</strong> Much faster than HDDs. NVMe SSDs are even faster than SATA SSDs.</li>
    <li><strong>HDD (Hard Disk Drive):</strong> Useful for mass storage (like media libraries) at a lower cost per GB.</li>
    <li><strong>Capacity:</strong> 500GB–1TB is typical for OS and apps. Consider more if storing large files or games.</li>
    <li><strong>Form Factor:</strong> M.2 (for NVMe or SATA), 2.5” (SATA), or 3.5” (HDD).</li>
  </ul>
</section>

{/* Step/Section 6 */}
<section className="mb-8 pb-6 border-b border-gray-200">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
    Step 6: Choosing a Power Supply Unit (PSU)
  </h2>
  <p className="text-gray-700 leading-relaxed mb-4">
    A good PSU ensures your system gets clean, reliable power. Avoid cheap, low-quality units — your components depend on stable electricity.
  </p>
  <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li><strong>Wattage:</strong> Calculate total system power needs and add headroom (e.g., 550W–750W for most builds).</li>
    <li><strong>Efficiency Rating:</strong> Look for 80 PLUS Bronze, Gold, or Platinum ratings for energy efficiency.</li>
    <li><strong>Modularity:</strong> Modular PSUs allow you to attach only the cables you need, improving cable management.</li>
    <li><strong>Build Quality:</strong> Trusted brands (like Seasonic, Corsair, EVGA) offer better components and warranties.</li>
  </ul>
</section>

        </main>

      </div>
    </>
  );
};

export default GuidePage;
