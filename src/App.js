import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    LineController, // Import LineController
    DoughnutController, // Import DoughnutController
    BarController // Import BarController
} from 'chart.js';
import {
    ArrowRight, Users, Handshake, DollarSign, Briefcase, Mail, Home, Lightbulb, Info, Newspaper,
    MapPin, CloudLightning, Wrench, Building, Rocket, Zap, HardHat, Scale, Layout, Globe, Package, CheckCircle,
    HardDrive // New icon for data storage
} from 'lucide-react'; // Import directly from lucide-react npm package

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    LineController, // Register LineController
    DoughnutController, // Register DoughnutController
    BarController // Register BarController
);

function App() {
    // State to manage which page is currently displayed
    const [currentPage, setCurrentPage] = useState('home');

    // Define AVIM brand colors for consistent use
    const colors = {
        primaryAccent: '#FF7F00', // Vibrant Orange
        secondaryAccent: '#808080', // Medium Grey
        darkText: '#333333',     // Dark Grey
        lightBg: '#F8F8F8',      // Off-White/Light Grey
        white: '#FFFFFF',        // White
    };

    // Ref for chart canvases
    const avMarketChartRef = useRef(null);
    const robotaxiMarketChartRef = useRef(null);
    const annualCostChartRef = useRef(null);
    const initialInvestmentChartRef = useRef(null);

    // Function to process labels for Chart.js to handle long strings by wrapping
    const processLabels = useCallback((labels) => {
        const maxLength = 16;
        return labels.map(label => {
            if (typeof label !== 'string' || label.length <= maxLength) {
                return label;
            }
            const words = label.split(' ');
            const lines = [];
            let currentLine = '';
            for (const word of words) {
                if ((currentLine + ' ' + word).trim().length > maxLength) {
                    lines.push(currentLine.trim());
                    currentLine = word;
                } else {
                    currentLine = (currentLine + ' ' + word).trim();
                }
            }
            if (currentLine) {
                lines.push(currentLine.trim());
            }
            return lines;
        });
    }, []);

    // Common Chart.js options for consistent styling and tooltip behavior
    const commonChartOptions = useCallback(() => ({
        responsive: true,
        maintainAspectRatio: false, // Important for charts to respect container size
        plugins: {
            legend: {
                labels: {
                    color: colors.darkText,
                    font: {
                        family: "'Inter', sans-serif",
                    }
                }
            },
            tooltip: {
                callbacks: {
                    title: function(tooltipItems) {
                        const item = tooltipItems[0];
                        let label = item.chart.data.labels[item.dataIndex];
                        if (Array.isArray(label)) {
                            return label.join(' '); // Join array labels for tooltip title
                        }
                        return label;
                    },
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            // Format currency for dollar values
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(context.parsed);
                        }
                        return label;
                    }
                },
                backgroundColor: 'rgba(51, 51, 51, 0.9)', // Dark grey for tooltip background
                titleFont: {
                    family: "'Inter', sans-serif",
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    family: "'Inter', sans-serif",
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: colors.darkText,
                    font: {
                        family: "'Inter', sans-serif",
                    }
                },
                grid: {
                    color: 'rgba(128, 128, 128, 0.1)' // Light grey for grid lines
                }
            },
            x: {
                ticks: {
                    color: colors.darkText,
                    font: {
                        family: "'Inter', sans-serif",
                    }
                },
                grid: {
                    display: false // Hide X-axis grid lines
                }
            }
        }
    }), [colors]);

    // Initialize Chart.js charts
    useEffect(() => {
        // Only render charts if on the home page (where infographic is embedded)
        if (currentPage === 'home') {
            // Chart data and configuration
            const avMarketData = {
                labels: ['2024', '2034'],
                datasets: [{
                    label: 'AV Market Value (in Trillions USD)',
                    data: [1.7, 3.9],
                    borderColor: colors.primaryAccent,
                    backgroundColor: `rgba(255, 127, 0, 0.2)`, // Orange with transparency
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: colors.primaryAccent
                }]
            };

            const robotaxiMarketData = {
                labels: ['2022', '2031'],
                datasets: [{
                    label: 'Robotaxi Market Value (in Billions USD)',
                    data: [1.71, 118.61],
                    borderColor: colors.secondaryAccent,
                    backgroundColor: `rgba(128, 128, 128, 0.3)`, // Grey with transparency
                    fill: true,
                    tension: 0.1,
                    pointRadius: 5,
                    pointBackgroundColor: colors.secondaryAccent
                }]
            };

            const annualCostData = {
                labels: ['Vehicle Amortization', 'Operational Support', 'Maintenance', 'Insurance', 'Charging/Depot', 'Cleaning', 'Other'],
                datasets: [{
                    label: 'Annual Cost Breakdown',
                    data: [22000, 10000, 9000, 7000, 5500, 5000, 3000],
                    backgroundColor: [
                        colors.primaryAccent,
                        colors.secondaryAccent,
                        '#FF9933', // Lighter orange
                        '#A0A0A0', // Lighter grey
                        '#CC6600', // Darker orange
                        '#666666', // Darker grey
                        '#FFBF80'  // Pale orange
                    ],
                    borderColor: colors.white,
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            };

            const investmentLabels = ['Software Dev & Testing', 'Hardware Integration', 'Autonomous Logistics Hub'];
            const processedInvestmentLabels = processLabels(investmentLabels);
            const initialInvestmentData = {
                labels: processedInvestmentLabels,
                datasets: [{
                    label: 'Low Est. (in Millions USD)',
                    data: [2, 0.5, 16.3],
                    backgroundColor: `rgba(128, 128, 128, 0.7)`, // Grey
                    borderColor: colors.secondaryAccent,
                    borderWidth: 2
                }, {
                    label: 'High Est. (in Millions USD)',
                    data: [8, 2, 16.3],
                    backgroundColor: `rgba(255, 127, 0, 0.7)`, // Orange
                    borderColor: colors.primaryAccent,
                    borderWidth: 2
                }]
            };

            // Initialize charts using refs and ensure previous instances are destroyed
            // Store chart instances on the ref object itself for proper cleanup
            if (avMarketChartRef.current && avMarketChartRef.current.chartInstance) {
                avMarketChartRef.current.chartInstance.destroy();
            }
            const avMarketChartCtx = avMarketChartRef.current?.getContext('2d');
            let avMarketChartInstance;
            if (avMarketChartCtx) {
                avMarketChartInstance = new ChartJS(avMarketChartCtx, {
                    type: 'line',
                    data: avMarketData,
                    options: commonChartOptions(),
                });
                avMarketChartRef.current.chartInstance = avMarketChartInstance; // Store instance
            }

            if (robotaxiMarketChartRef.current && robotaxiMarketChartRef.current.chartInstance) {
                robotaxiMarketChartRef.current.chartInstance.destroy();
            }
            const robotaxiMarketChartCtx = robotaxiMarketChartRef.current?.getContext('2d');
            let robotaxiMarketChartInstance;
            if (robotaxiMarketChartCtx) {
                robotaxiMarketChartInstance = new ChartJS(robotaxiMarketChartCtx, {
                    type: 'line',
                    data: robotaxiMarketData,
                    options: commonChartOptions(),
                });
                robotaxiMarketChartRef.current.chartInstance = robotaxiMarketChartInstance;
            }

            if (annualCostChartRef.current && annualCostChartRef.current.chartInstance) {
                annualCostChartRef.current.chartInstance.destroy();
            }
            const annualCostChartCtx = annualCostChartRef.current?.getContext('2d');
            let annualCostChartInstance;
            if (annualCostChartCtx) {
                annualCostChartInstance = new ChartJS(annualCostChartCtx, {
                    type: 'doughnut',
                    data: annualCostData,
                    options: {
                        ...commonChartOptions(),
                        plugins: {
                            ...commonChartOptions().plugins, // Merge common plugins
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: colors.darkText,
                                    padding: 15,
                                    font: { family: "'Inter', sans-serif" }
                                }
                            },
                        },
                    },
                });
                annualCostChartRef.current.chartInstance = annualCostChartInstance;
            }

            if (initialInvestmentChartRef.current && initialInvestmentChartRef.current.chartInstance) {
                initialInvestmentChartRef.current.chartInstance.destroy();
            }
            const initialInvestmentChartCtx = initialInvestmentChartRef.current?.getContext('2d');
            let initialInvestmentChartInstance;
            if (initialInvestmentChartCtx) {
                initialInvestmentChartInstance = new ChartJS(initialInvestmentChartCtx, {
                    type: 'bar',
                    data: initialInvestmentData,
                    options: {
                        indexAxis: 'y', // Horizontal bar chart
                        ...commonChartOptions(),
                        scales: {
                            x: {
                                ticks: {
                                    callback: function(value) { return '$' + value + 'M' }, // Format X-axis labels
                                    color: colors.darkText,
                                    font: { family: "'Inter', sans-serif" }
                                },
                                grid: { color: `rgba(128, 128, 128, 0.1)` } // Light grey grid lines
                            },
                            y: {
                                ticks: { color: colors.darkText, font: { family: "'Inter', sans-serif" } },
                                grid: { display: false }
                            }
                        }
                    }
                });
                initialInvestmentChartRef.current.chartInstance = initialInvestmentChartInstance;
            }

            // Cleanup function to destroy chart instances on component unmount or page change
            return () => {
                if (avMarketChartInstance) avMarketChartInstance.destroy();
                if (robotaxiMarketChartInstance) robotaxiMarketChartInstance.destroy();
                if (annualCostChartInstance) annualCostChartInstance.destroy();
                if (initialInvestmentChartInstance) initialInvestmentChartInstance.destroy();
            };
        }
    }, [currentPage, commonChartOptions, processLabels, colors]); // Re-run effect if current page or colors change

    // Utility function for smooth scrolling to sections
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Navigation click handler
    const handleNavClick = (section, id) => {
        setCurrentPage(section);
        // Use setTimeout to allow state update to render, then scroll
        setTimeout(() => scrollToSection(id), 0);
    };

    // Main page content, including embedded infographic sections
    const HomePage = () => (
        <>
            {/* Hero Section */}
            <section id="home" className="text-center my-12 md:my-20 py-12 rounded-3xl bg-gradient-to-br from-[#FF7F00] to-[#FF9933] text-white shadow-xl">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Empowering the Future of Autonomous Mobility</h1>
                <p className="text-xl md:text-2xl mt-4 font-semibold max-w-4xl mx-auto">AVIM provides the essential infrastructure solutions that enable autonomous vehicle companies to scale efficiently and focus on their core technology.</p>
                <button onClick={() => {
                    handleNavClick('home', 'services'); // Changed from direct setCurrentPage to handleNavClick
                }} className="mt-8 inline-block bg-white text-[#FF7F00] font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-colors">Discover Our Solutions</button>
            </section>

            {/* Services Section */}
            <section id="services" className="my-16">
                <h2 className="text-3xl font-bold text-center mb-10 text-[#333333]">Our Core Infrastructure Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <button onClick={() => setCurrentPage('groundSolutions')} className="bg-white rounded-2xl shadow-lg p-6 text-center kpi-card flex flex-col items-center justify-center">
                        <div className="text-5xl mb-4 text-[#FF7F00]">🚗</div>
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">Ground AV Solutions</h3>
                        <p className="text-gray-700">Comprehensive infrastructure for autonomous ground vehicles.</p>
                    </button>
                    <button onClick={() => setCurrentPage('airTaxiSolutions')} className="bg-white rounded-2xl shadow-lg p-6 text-center kpi-card flex flex-col items-center justify-center">
                        <div className="text-5xl mb-4 text-[#FF7F00]">✈️</div>
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">Air Taxi Solutions</h3>
                        <p className="text-gray-700">Pioneering vertiport development for urban air mobility.</p>
                    </button>
                    <button onClick={() => {
                         handleNavClick('home', 'infographic-section');
                    }} className="bg-white rounded-2xl shadow-lg p-6 text-center kpi-card flex flex-col items-center justify-center">
                        <div className="text-5xl mb-4 text-[#FF7F00]"><HardDrive /></div>
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">AV Data & Operations Hubs</h3>
                        <p className="text-gray-700">Providing physical hubs for secure data storage, high-volume charging, and integrated operational support.</p>
                    </button>
                </div>
            </section>

            {/* Embedded Infographic Section */}
            <section id="infographic-section" className="my-16">
                <header className="text-center my-8 md:my-16">
                    <h1 className="text-4xl md:text-6xl font-black text-[#FF7F00] tracking-tight">Our Vision: The Road Ahead</h1>
                    <p className="text-xl md:text-2xl mt-4 font-semibold text-[#333333]">Understanding the Compelling Case for AV Infrastructure-as-a-Service</p>
                    <p className="max-w-3xl mx-auto mt-4 text-lg">Dive deep into the data supporting the crucial need for outsourced, specialized infrastructure for autonomous vehicle companies.</p>
                </header>

                <section id="market-growth" className="my-12">
                    <h2 className="text-3xl font-bold text-center mb-8">An Unprecedented Growth Trajectory</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                            <h3 className="text-xl font-bold mb-4 text-[#808080]">Total AV Market Projection</h3>
                            <p className="mb-4">The global autonomous vehicle market is on a path of explosive growth, creating immense pressure on operators to scale their fleets and supporting infrastructure rapidly.</p>
                            <div className="chart-container">
                                <canvas ref={avMarketChartRef}></canvas>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                            <h3 className="text-xl font-bold mb-4 text-[#808080]">The Robotaxi Revolution</h3>
                             <p className="mb-4">The robotaxi segment is forecast to be the epicenter of AV expansion, with staggering growth that fundamentally requires centralized, high-throughput service depots.</p>
                            <div className="chart-container">
                                <canvas ref={robotaxiMarketChartRef}></canvas>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="financial-burden" className="my-16">
                    <h2 className="text-3xl font-bold text-center mb-2">The High Cost of Going It Alone</h2>
                    <p className="text-lg text-center max-w-3xl mx-auto mb-8">AV companies face immense capital and operational expenditures, tying up resources that could be focused on core technology development.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card flex flex-col">
                            <h3 className="text-xl font-bold mb-2 text-[#FF7F00]">The ~$61,500 Annual Burden Per Vehicle</h3>
                            <p className="mb-4 flex-grow">Operational costs, from maintenance to insurance and cleaning, create a significant and recurring financial drain on every single vehicle in a fleet.</p>
                            <div className="chart-container">
                                <canvas ref={annualCostChartRef}></canvas>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card flex flex-col">
                            <h3 className="text-xl font-bold mb-2 text-[#FF7F00]">The Multi-Million Dollar Buy-In</h3>
                             <p className="mb-4 flex-grow">Before a single AV hits the road, companies must invest millions in non-core activities like software testing, hardware integration, and facility construction.</p>
                             <div className="chart-container">
                                <canvas ref={initialInvestmentChartRef}></canvas>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="iaas-model" className="my-16 bg-[#333333] text-white rounded-2xl p-8 md:p-12 shadow-2xl">
                    <h2 className="text-3xl font-bold text-center mb-2 text-[#FF7F00]">The Strategic Shift: Infrastructure-as-a-Service</h2>
                    <p className="text-lg text-center max-w-3xl mx-auto mb-8">By outsourcing infrastructure, AV operators can convert heavy capital expenditures into predictable operational costs, enabling faster scaling and a sharper focus on core innovation.</p>
                    
                    <div className="flex flex-col md:flex-row justify-around items-center gap-8 mt-12">
                        <div className="w-full md:w-2/5 text-center">
                            <h4 className="text-2xl font-bold mb-4">The Current Fragmented Model</h4>
                             <div className="bg-white/10 rounded-lg p-6">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="p-4 bg-[#FF7F00] rounded-full text-2xl">🚗</div>
                                     <div className="font-bold text-lg ml-3">AV Operator</div>
                                </div>
                                <div className="text-4xl text-center my-4">↓</div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-white/20 p-3 rounded">Mapping Vendor</div>
                                    <div className="bg-white/20 p-3 rounded">Charging Network</div>
                                    <div className="bg-white/20 p-3 rounded">Maintenance Shop</div>
                                    <div className="bg-white/20 p-3 rounded">Software Provider</div>
                                     <div className="bg-white/20 p-3 rounded">Calibration Service</div>
                                    <div className="bg-white/20 p-3 rounded">Data Annotator</div>
                                </div>
                                 <p className="mt-4 text-sm text-gray-300">Complex, costly, and inefficient multi-vendor management.</p>
                            </div>
                        </div>

                        <div className="text-4xl font-black text-[#FF7F00] hidden md:block">→</div>

                        <div className="w-full md:w-2/5 text-center">
                            <h4 className="text-2xl font-bold mb-4">The Integrated IaaS Model</h4>
                            <div className="bg-[#808080] text-[#FFFFFF] rounded-lg p-6">
                                 <div className="flex items-center justify-center mb-4">
                                    <div className="p-4 bg-white/50 rounded-full text-2xl">🚗</div>
                                    <div className="font-bold text-lg ml-3">AV Operator</div>
                                </div>
                                <div className="text-4xl text-center my-4">↓</div>
                                <div className="bg-white/80 p-6 rounded-lg text-[#333333]">
                                    <div className="font-extrabold text-lg">Integrated Infrastructure Partner</div>
                                     <p className="mt-2 text-sm">One partner for data, charging, maintenance, and operations.</p>
                                </div>
                                 <p className="mt-4 text-sm text-gray-200">Simple, scalable, and cost-effective single-point solution.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="service-breakdown" className="my-16">
                    <h2 className="text-3xl font-bold text-center mb-8">The Three Pillars of AV Infrastructure</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                            <div className="text-4xl mb-4"><HardDrive /></div>
                            <h3 className="text-xl font-bold mb-2 text-[#808080]">AV Data Management & Storage</h3>
                            <p className="text-sm mb-4">Autonomous vehicles generate petabytes of data daily. We provide on-site, secure data storage and management solutions, enabling AV companies to offload massive data burdens and focus on critical data analysis.</p>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="font-bold">Key Challenge:</p>
                                <p className="text-sm">AVs generate <span className="font-black text-[#FF7F00]">petabytes of data daily</span>, requiring robust and secure on-site storage and processing infrastructure.</p>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold mb-2 text-[#808080]">Automated Charging & Depots</h3>
                            <p className="text-sm mb-4">With fleets being overwhelmingly electric, a core need is full-service charging depots. This goes beyond plugs; it includes site selection, permitting, automated vehicle handling, cleaning, and smart energy management to maximize fleet uptime.</p>
                             <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="font-bold">Key Insight:</p>
                                <p className="text-sm">Local operations, including charging, account for <span className="font-black text-[#FF7F00]">~50%</span> of total shared AV mobility costs.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                            <div className="text-4xl mb-4">🔧</div> {/* Icon is now orange */}
                            <h3 className="text-xl font-bold mb-2 text-[#333333]">Specialized Maintenance</h3> {/* Heading is now dark grey */}
                            <p className="text-sm mb-4">AV maintenance is highly complex, requiring AI-driven predictive diagnostics and precise calibration of sensitive sensors like LiDAR and cameras. A specialized service can provide this expertise more efficiently than in-house teams.</p>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="font-bold">Key Requirement:</p>
                                <p className="text-sm">Sensors like accelerometers require <span className="font-black text-[#808080]">annual recalibration</span> to ensure safety and accuracy.</p>
                            </div>
                        </div>

                    </div>
                </section>

                <section id="conclusion" className="my-12 text-center">
                     <h2 className="text-3xl font-bold text-center mb-4">A Clear and Compelling Market Need</h2>
                     <p className="max-w-4xl mx-auto text-lg mb-8">The path to profitability for AV companies is paved with efficiency. The immense costs and operational complexity of building proprietary infrastructure create an undeniable opportunity for a third-party provider. By offering an integrated, scalable, and reliable service, an IaaS partner becomes a critical enabler, allowing AV innovators to focus on what they do best: revolutionizing mobility.</p>
                     <div className="flex justify-center">
                        <button onClick={() => {
                            handleNavClick('home', 'contact');
                        }} className="bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">Partner With The Future</button>
                    </div>
                </section>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-16 bg-white rounded-xl shadow-lg my-8 mx-4">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#333333]">About AVIM</h2>
                    <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
                        AVIM is an infrastructure development company focused on the critical needs of emerging autonomous vehicle (AV) and electric fleet industries. As these technologies scale, they require specialized physical real estate tailored to operations like charging, storage, servicing, and dispatching. AVIM is working to provide that essential infrastructure, starting in key urban markets.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <img
                                src="/CIty backround 2.avif"
                                alt="AVIM's Vision for Autonomous Infrastructure"
                                className="rounded-lg shadow-md mx-auto mb-6 md:mb-0 w-full h-auto object-cover"
                            />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-semibold mb-4 text-[#333333]">Our Mission</h3>
                            <p className="text-gray-700 mb-4">
                                To accelerate the safe and efficient integration of autonomous and electric fleets by developing and managing purpose-built physical infrastructure that meets their unique operational demands.
                            </p>
                            <h3 className="text-2xl font-semibold mb-4 text-[#333333]">Why It Matters</h3>
                            <p className="text-gray-700">
                                As autonomous and electric vehicle adoption grows, cities and companies urgently need new types of infrastructure. AVIM positions itself as the behind-the-scenes engine—quietly building the depots, charging yards, and servicing facilities that power the future of transportation.
                            </p>
                        </div>
                    </div>
                    {/* Team section */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-semibold mb-6 text-[#333333]">Meet Our Leadership</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Teddy O'Brien's Profile */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                                <img
                                    src="/IMG_6843.JPG" // Direct reference to file in public folder
                                    alt="Teddy O'Brien"
                                    className="rounded-full w-24 h-24 object-cover mb-4 ring-2 ring-orange-300"
                                />
                                <h4 className="text-xl font-semibold text-[#333333]">Teddy O'Brien</h4>
                                <p className="text-orange-600 text-sm mb-2">CEO & Co-founder</p>
                                <p className="text-gray-600 text-center text-sm">
                                    Student at CU studying Real Estate and Finance, driving the vision for autonomous vehicle infrastructure.
                                </p>
                            </div>
                            {/* Default Founder Profile 1 */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                                <img
                                    src="https://placehold.co/120x120/5e5e5e/ffffff?text=Co-Founder+1"
                                    alt="Co-Founder Name"
                                    className="rounded-full w-24 h-24 object-cover mb-4 ring-2 ring-orange-300"
                                />
                                <h4 className="text-xl font-semibold text-[#333333]">Jane Doe</h4>
                                <p className="text-orange-600 text-sm mb-2">COO & Co-Founder</p>
                                <p className="text-gray-600 text-center text-sm">
                                    Visionary in urban tech and smart infrastructure. Previously led major projects at [Previous Company].
                                </p>
                            </div>
                            {/* Default Founder Profile 2 */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                                <img
                                    src="https://placehold.co/120x120/5e5e5e/ffffff?text=Co-Founder+2"
                                    alt="Co-Founder Name"
                                    className="rounded-full w-24 h-24 object-cover mb-4 ring-2 ring-orange-300"
                                />
                                <h4 className="text-xl font-semibold text-[#333333]">John Smith</h4>
                                <p className="text-orange-600 text-sm mb-2">CTO & Co-Founder</p>
                                <p className="text-gray-600 text-center text-sm">
                                    AI and robotics expert with a background in complex autonomous systems development.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partnerships Section */}
            <section id="partnerships" className="py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg my-8 mx-4">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#333333]">Partner with AVIM</h2>
                    <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
                        Collaboration is essential for scaling autonomous and electric fleets. AVIM partners with AV companies, electric fleet operators, and urban developers to provide the specialized infrastructure needed for efficient and expansive operations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Partner Type 1: AV & Electric Fleet Operators */}
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <Handshake className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3 text-[#333333]">AV & Electric Fleet Operators</h3>
                            <p className="text-gray-600">
                                Secure purpose-built depots for charging, maintenance, and dispatch, tailored to your operational needs and growth plans.
                            </p>
                        </div>
                        {/* Partner Type 2: Urban Planners & Real Estate Developers */}
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <Home className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3 text-[#333333]">Urban Planners & Developers</h3>
                            <p className="text-gray-600">
                                Integrate next-gen mobility infrastructure into smart city initiatives and large-scale urban development projects.
                            </p>
                        </div>
                        {/* Partner Type 3: Technology & Solution Providers */}
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <Lightbulb className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3 text-[#333333]">Technology & Solution Providers</h3>
                            <p className="text-gray-600">
                                Collaborate on integrating advanced charging, connectivity, and fleet management technologies into our physical hubs.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <button onClick={() => handleNavClick('home', 'contact')} className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                            Explore Partnership Opportunities <Handshake className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Careers Section */}
            <section id="careers" className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg my-8 mx-4">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#333333]">Join Our Team</h2>
                    <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
                        Are you passionate about building the foundational real estate and infrastructure for the future of transportation? Join AVIM and help us create the physical backbone for autonomous and electric fleets.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Job Opening 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                            <h3 className="text-2xl font-semibold mb-3 text-[#333333]">Real Estate Development Lead</h3>
                            <p className="text-orange-600 text-md mb-3">Full-time | Denver, CO</p>
                            <p className="text-gray-700 mb-4">
                                Lead site acquisition, zoning, and development for our initial AV/EV fleet depots in target urban markets.
                            </p>
                            <button onClick={() => handleNavClick('home', 'contact')} className="text-orange-600 hover:underline flex items-center">
                                Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                        {/* Job Opening 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                            <h3 className="text-2xl font-semibold mb-3 text-[#333333]">Infrastructure Project Manager</h3>
                            <p className="text-orange-600 text-md mb-3">Full-time | Flexible (US-based)</p>
                            <p className="text-gray-700 mb-4">
                                Oversee the design, construction, and integration of charging, servicing, and connectivity infrastructure within AV/EV depots.
                            </p>
                            <button onClick={() => handleNavClick('home', 'contact')} className="text-orange-600 hover:underline flex items-center">
                                Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-12">
                        <button onClick={() => handleNavClick('home', 'contact')} className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                            View All Careers <Briefcase className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Investors Section */}
            <section id="investors" className="py-16 bg-white rounded-xl shadow-lg my-8 mx-4">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#333333]">For Investors</h2>
                    <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
                        AVIM offers a unique investment opportunity at the forefront of the emerging autonomous and electric fleet real estate sector. We are building the critical physical infrastructure needed to enable the scaling of this multi-trillion dollar industry.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-left">
                            <h3 className="text-xl font-semibold mb-4 text-[#333333]">The Market Opportunity</h3>
                            <p className="text-gray-700 mb-4">
                                As autonomous vehicle adoption grows, cities and companies urgently need new types of infrastructure for operations like charging, storage, servicing, and dispatching. AVIM provides this essential physical real estate, positioning us at the core of future mobility ecosystems.
                            </p>
                            <h3 className="text-xl font-semibold mb-4 text-[#333333]">Initial Focus & Traction</h3>
                            <p className="text-gray-700 mb-4">
                                We are strategically focusing on key urban markets, starting with <span className="font-bold">Denver</span> as our launch city, with plans for expansion into <span className="font-bold">Austin, Phoenix, San Francisco, and Miami</span>. Our site criteria prioritize industrial-zoned land with highway access and favorable real estate conditions.
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">Team Strength:</span> Our leadership combines expertise in real estate, finance, autonomous systems, and urban development, uniquely positioning AVIM to execute on this critical market need.
                            </p>
                        </div>
                        <div>
                            <img
                                src="/Vertiport photo.png" // Corrected to PNG extension
                                alt="Vertiport Infrastructure by AVIM"
                                className="rounded-lg shadow-md mx-auto w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                    <div className="mt-12">
                        <button onClick={() => handleNavClick('home', 'contact')} className="bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                            Request Investor Deck <DollarSign className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* News & Insights Section */}
            <section id="news" className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg my-8 mx-4">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#333333]">News & Insights</h2>
                    <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
                        Stay up-to-date with the latest from AVIM and developments in autonomous and electric fleet infrastructure.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* News Article 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                            <img
                                src="https://placehold.co/400x250/c0c0c0/ffffff?text=Denver+Site+Plan"
                                alt="News Placeholder Image"
                                className="rounded-md mb-4 w-full h-40 object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-[#333333]">AVIM Identifies First Depot Site in Denver</h3>
                            <p className="text-gray-600 text-sm mb-4">June 20, 2025</p>
                            <p className="text-gray-700 text-base mb-4 line-clamp-3">
                                We're excited to announce the identification of our initial site in Denver, meeting key criteria for future AV/EV fleet operations...
                            </p>
                            <button onClick={() => handleNavClick('home', 'contact')} className="text-orange-600 hover:underline flex items-center">
                                Read More <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                        {/* News Article 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                            <img
                                src="https://placehold.co/400x250/c0c0c0/ffffff?text=EV+Charging"
                                alt="News Placeholder Image"
                                className="rounded-md mb-4 w-full h-40 object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-[#333333]">The Role of Purpose-Built Charging in Fleet Scaling</h3>
                            <p className="text-gray-600 text-sm mb-4">June 15, 2025</p>
                            <p className="text-gray-700 text-base mb-4 line-clamp-3">
                                Our latest insight piece explores the critical need for specialized charging infrastructure as electric fleets rapidly expand...
                            </p>
                            <button onClick={() => handleNavClick('home', 'contact')} className="text-orange-600 hover:underline flex items-center">
                                Read More <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                        {/* News Article 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                            <img
                                src="https://placehold.co/400x250/c0c0c0/ffffff?text=Smart+Logistics"
                                alt="News Placeholder Image"
                                className="rounded-md mb-4 w-full h-40 object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-[#333333]">AVIM at Future of Logistics Summit</h3>
                            <p className="text-gray-600 text-sm mb-4">June 10, 2025</p>
                            <p className="text-gray-700 text-base mb-4 line-clamp-3">
                                Members of the AVIM team shared insights on infrastructure development for autonomous logistics at the recent industry summit...
                            </p>
                            <button onClick={() => handleNavClick('home', 'contact')} className="text-orange-600 hover:underline flex items-center">
                                Read More <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-12">
                        <a href="#" className="inline-block text-orange-600 hover:underline font-semibold flex items-center justify-center">
                            View All News & Insights <Newspaper className="ml-2 h-5 w-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="py-16 bg-gray-900 text-white rounded-xl shadow-lg my-8 mx-4">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>
                    <p className="text-lg opacity-90 mb-8">
                        Whether you're an AV company, a city planner, a talented engineer, or an investor, we'd love to hear from you.
                    </p>
                    <form className="bg-white p-8 rounded-lg shadow-xl text-gray-900">
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-200"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-200"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Company (Optional)"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-200"
                            />
                        </div>
                        <div className="mb-6">
                            <textarea
                                placeholder="Your Message"
                                rows="6"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-200"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-orange-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Send Message
                        </button>
                    </form>
                    <div className="mt-8 text-white">
                        <p className="mb-2">Or reach us directly:</p>
                        <p className="font-semibold">
                            Email: <a href="mailto:info@avim.com" className="hover:underline">info@avim.com</a>
                        </p>
                        <p className="font-semibold">
                            LinkedIn: <a href="https://www.linkedin.com/company/aviminfra" target="_blank" rel="noopener noreferrer" className="hover:underline">AVIM on LinkedIn</a>
                        </p>
                        <p className="text-sm mt-4">
                            Location: San Antonio, TX, USA (Conceptual, if applicable)
                        </p>
                    </div>
                </div>
            </section>
        </>
    );

    // Ground AV Solutions Page Content
    const GroundSolutionsPage = () => (
        <>
            {/* Hero Section */}
            <section id="hero" className="text-center my-12 md:my-20 py-16 rounded-3xl bg-gradient-to-br from-[#FF7F00] to-[#FF9933] text-white shadow-xl">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Optimizing Ground AV Operations</h1>
                <p className="text-xl md:text-2xl mt-4 font-semibold max-w-4xl mx-auto">AVIM builds, owns, and operates state-of-the-art charging and maintenance facilities, enabling Waymo, Zoox, and other AV companies to scale their fleets cost-effectively.</p>
                <button onClick={() => {
                    setTimeout(() => {
                        document.getElementById('our-facilities')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }} className="mt-8 inline-block bg-white text-[#FF7F00] font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-colors">Explore Our Facilities</button>
            </section>

            {/* The Problem We Solve Section */}
            <section id="problem-solve" className="my-16 text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#333333]">Addressing the High Costs of In-House Infrastructure</h2>
                <p className="max-w-3xl mx-auto text-lg mb-12">Building and maintaining proprietary charging and maintenance infrastructure represents a significant capital and operational burden for autonomous vehicle companies. AVIM provides a solution to offload these non-core, yet critical, functions.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                        <div className="text-5xl mb-4 text-[#FF7F00]">💰</div>
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">Avoid Multi-Million Dollar Upfront Costs</h3>
                        <p className="text-gray-700">Establishing a single autonomous logistics hub can cost up to <span className="font-bold text-[#FF7F00]">$16.3 million USD</span>, diverting crucial capital from core AV technology development.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                        <div className="text-5xl mb-4 text-[#FF7F00]">💸</div>
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">Reduce Annual Operational Expenses</h3>
                        <p className="text-gray-700">Each autonomous vehicle incurs an estimated <span className="font-bold text-[#FF7F00]">$61,500 annually</span> in operational costs, with local operations (like charging and maintenance) accounting for <span className="font-bold text-[#FF7F00]">~50%</span> of total shared AV mobility costs.</p>
                    </div>
                </div>
            </section>

            {/* Our Facilities and Process Section */}
            <section id="our-facilities" className="my-16 bg-[#333333] text-white rounded-2xl p-8 md:p-12 shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-10 text-[#FF7F00]">Our Integrated Approach to Ground AV Infrastructure</h2>
                <p className="max-w-3xl mx-auto text-center text-lg mb-12">AVIM offers a comprehensive, streamlined solution for charging, maintenance, and operational support for ground AV fleets, designed for maximum efficiency and uptime.</p>

                <div className="grid grid-cols-1 gap-12">
                    {/* Charging Depots */}
                    <div className="bg-[#808080] text-white rounded-lg p-8 shadow-inner">
                        <h3 className="text-2xl font-bold mb-4 text-[#FF7F00]">Automated Charging Depots: Powering Your Fleet</h3>
                        <p className="text-lg mb-6">Our state-of-the-art charging depots are strategically located and engineered for high throughput, supporting rapid turnaround times for electric autonomous fleets.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#333333]">
                            <div className="process-card p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                                <Zap className="process-card-icon" />
                                <h4 className="text-xl font-bold mb-2">Smart Charging Systems</h4>
                                <p className="text-gray-700 text-sm">We deploy high-power DC fast chargers and intelligent energy management systems to optimize charging schedules, minimize costs, and maximize fleet availability.</p>
                            </div>
                            <div className="process-card p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                                <Users className="process-card-icon" /> {/* Using Users as a generic 'automation' icon */}
                                <h4 className="text-xl font-bold mb-2">Automated Vehicle Handling</h4>
                                <p className="text-gray-700 text-sm">Developing robotics and automated systems for vehicle movement within depots, reducing human intervention for parking, charging connection, and queuing.</p>
                            </div>
                            <div className="process-card p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                                <CheckCircle className="process-card-icon" /> {/* Using CheckCircle for 'cleaning' */}
                                <h4 className="text-xl font-bold mb-2">Integrated Cleaning & Staging</h4>
                                <p className="text-gray-700 text-sm">Automated interior and exterior cleaning bays are seamlessly integrated into the depot flow, ensuring vehicles are clean and ready for immediate redeployment.</p>
                            </div>
                        </div>
                        <p className="text-sm mt-6 text-gray-200">Our facilities are built to support fleets of hundreds of vehicles, with flexible configurations for expansion, typically spanning multiple acres (e.g., 200,000 to 500,000 square feet for a major hub).</p>
                    </div>

                    {/* Maintenance & Support Facilities */}
                    <div className="bg-[#808080] text-white rounded-lg p-8 shadow-inner">
                        <h3 className="text-2xl font-bold mb-4 text-[#FF7F00]">Specialized AV Maintenance: Ensuring Peak Performance</h3>
                        <p className="text-lg mb-6">Our maintenance centers are equipped with cutting-edge technology and staffed by expert technicians to handle the unique demands of autonomous vehicle upkeep.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#333333]">
                            <div className="process-card p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                                <Info className="process-card-icon" /> {/* Using Info for diagnostics */}
                                <h4 className="text-xl font-bold mb-2">AI-Driven Diagnostics</h4>
                                <p className="text-gray-700 text-sm">Utilizing AI-powered cameras and sensor data analysis for automated, rapid, and precise detection of vehicle issues, from tire wear to sensor anomalies.</p>
                            </div>
                            <div className="process-card p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                                <Wrench className="process-card-icon" /> {/* Using Wrench for calibration */}
                                <h4 className="text-xl font-bold mb-2">Precision Sensor Calibration</h4>
                                <p className="text-gray-700 text-sm">Advanced calibration labs ensure LiDAR, camera, and radar sensors maintain centimeter-level accuracy, crucial for AV safety and performance. We recommend annual recalibration for critical sensors.</p>
                            </div>
                            <div className="process-card p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                                <Package className="process-card-icon" /> {/* Using Package for proactive/predictive repair */}
                                <h4 className="text-xl font-bold mb-2">Proactive & Predictive Repair</h4>
                                <p className="text-gray-700 text-sm">Integrating predictive maintenance tools to anticipate component failures before they occur, scheduling repairs to minimize downtime and prevent costly incidents.</p>
                            </div>
                        </div>
                        <p className="text-sm mt-6 text-gray-200">Our maintenance facilities are designed for specialized tooling and environmental controls, often requiring large bays (e.g., 20-foot tall ceilings for certain equipment).</p>
                    </div>

                    {/* The Integrated Advantage */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4 text-[#333333]">The AVIM Integrated Advantage</h3>
                        <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">By combining charging, maintenance, and operational management under one roof, AVIM offers a seamless "Infrastructure-as-a-Service" that transforms your CapEx into OpEx, allowing you to scale faster.</p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[#333333] font-semibold text-lg">
                            <span className="p-4 bg-gray-100 rounded-full shadow-inner">Charging</span>
                            <span className="text-4xl font-bold text-[#808080] md:block hidden">→</span>
                            <span className="text-4xl font-bold text-[#808080] md:hidden block">↓</span>
                            <span className="p-4 bg-gray-100 rounded-full shadow-inner">Maintenance</span>
                            <span className="text-4xl font-bold text-[#808080] md:block hidden">→</span>
                            <span className="text-4xl font-bold text-[#808080] md:hidden block">↓</span>
                            <span className="p-4 bg-[#FF7F00] text-white rounded-full shadow-lg">Optimized Fleet Uptime</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action / Contact Section */}
            <section id="contact" className="my-16 text-center">
                <h2 className="text-3xl font-bold mb-6 text-[#333333]">Ready to Streamline Your AV Operations?</h2>
                <p className="max-w-2xl mx-auto text-lg mb-8">Partner with AVIM for robust, scalable, and cost-effective ground AV infrastructure. Let's discuss a tailored solution for your fleet.</p>
                <button onClick={() => {
                    handleNavClick('home', 'contact');
                }} className="bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">Contact Us About Ground AV Solutions</button>
            </section>
        </>
    );

    // Air Taxi Solutions Page Content
    const AirTaxiSolutionsPage = () => (
        <>
            {/* Hero Section */}
            <section id="hero" className="text-center my-12 md:my-20 py-16 rounded-3xl bg-gradient-to-br from-[#808080] to-[#A0A0A0] text-white shadow-xl">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Elevating Vertiport Infrastructure</h1> {/* Simplified title */}
                <p className="text-xl md:text-2xl mt-4 font-semibold max-w-4xl mx-auto">AVIM is pioneering the development and management of advanced vertiports and heli-pads to power the coming era of air taxis.</p>
                <button onClick={() => {
                    setTimeout(() => {
                        document.getElementById('our-approach')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }} className="mt-8 inline-block bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">See Our Approach</button>
            </section>

            {/* The Need Section */}
            <section id="the-need" className="my-16 text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#333333]">The Future of Flight Requires Groundbreaking Infrastructure</h2>
                <p className="max-w-3xl mx-auto text-lg mb-12">As electric vertical takeoff and landing (eVTOL) aircraft, commonly known as air taxis, prepare for commercial launch, the critical need for purpose-built landing, charging, and maintenance infrastructure (vertiports) becomes paramount. Current helipads are insufficient for future urban air mobility operations.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                        <div className="text-5xl mb-4 text-[#FF7F00]">🏙️</div>
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">Urban Integration</h3>
                        <p className="text-gray-700">Seamless integration of air taxis into cityscapes requires distributed, accessible vertiports.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                        <div className="text-5xl mb-4 text-[#FF7F00]">🔌</div>
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">High-Speed Charging</h3>
                        <p className="text-gray-700">eVTOLs demand rapid, high-power charging infrastructure for quick turnarounds.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
                        <div className="text-5xl mb-4 text-[#FF7F00]">🛡️</div>
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">Safety & Regulation</h3>
                        <p className="text-gray-700">Strict safety protocols and evolving regulations for air traffic and ground operations.</p>
                    </div>
                </div>
            </section>

            {/* Our Approach Section */}
            <section id="our-approach" className="my-16 bg-[#333333] text-white rounded-2xl p-8 md:p-12 shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-10 text-[#FF7F00]">Our Approach to Vertiport Development & Ownership</h2>
                <p className="max-w-3xl mx-auto text-center text-lg mb-12">AVIM provides end-to-end expertise in designing, building, owning, and operating advanced vertiports, empowering air taxi companies to focus on their flight operations.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                        <MapPin className="process-card-icon" />
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">1. Strategic Site Selection</h3>
                        <p className="text-gray-700 text-sm">We leverage data analytics and urban planning expertise to identify optimal locations for vertiports, considering air traffic routes, ground transportation connectivity, noise impact, and community integration. This includes rooftop sites, elevated structures, and repurposed ground facilities.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                        <Scale className="process-card-icon" />
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">2. Permitting & Regulatory Navigation</h3>
                        <p className="text-gray-700 text-sm">Navigating the complex landscape of FAA regulations, local zoning laws, environmental impact assessments, and building codes is our specialty. We manage the entire permitting process, ensuring full compliance and accelerating project timelines.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                        <Layout className="process-card-icon" />
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">3. Advanced Design & Engineering</h3>
                        <p className="text-gray-700 text-sm">Our designs integrate eVTOL landing pads, high-speed charging infrastructure, passenger lounges, baggage handling, and maintenance bays. We prioritize safety, efficiency, passenger experience, and scalability for future growth, adhering to all industry standards. Designs consider footprints from a few hundred square feet to tens of thousands for major hubs.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                        <HardHat className="process-card-icon" />
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">4. Construction & Deployment</h3>
                        <p className="text-gray-700 text-sm">AVIM oversees the full construction process, from groundbreaking to final inspection. We utilize modular construction techniques where feasible to reduce costs and accelerate deployment. Our focus is on robust, future-proof facilities built to aviation-grade standards.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                        <Globe className="process-card-icon" />
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">5. Operations & Maintenance</h3>
                        <p className="text-gray-700 text-sm">Post-construction, AVIM owns and operates the vertiports. This includes automated charging management, predictive maintenance for infrastructure and eVTOLs, air traffic integration, and passenger flow management, ensuring maximum uptime and profitability for air taxi operators.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                        <Handshake className="process-card-icon" />
                        <h3 className="text-xl font-bold mb-2 text-[#333333]">6. Partnership & Integration</h3>
                        <p className="text-gray-700 text-sm">We partner directly with leading eVTOL manufacturers and air taxi operators to provide a seamless "Vertiport-as-a-Service" model. This offloads CapEx and OpEx, allowing them to focus on flight technology and customer experience.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action / Contact Section */}
            <section id="contact" className="my-16 text-center">
                <h2 className="text-3xl font-bold mb-6 text-[#333333]">Ready for the Skies?</h2>
                <p className="max-w-2xl mx-auto text-lg mb-8">Partner with AVIM to lay the groundwork for a seamless urban air mobility future. Let's discuss your vertiport project today.</p>
                <button onClick={() => {
                    handleNavClick('home', 'contact');
                }} className="bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">Contact Us About Air Mobility</button>
            </section>
        </>
    );

    // Render the appropriate page based on current state
    const renderPage = () => {
        switch (currentPage) {
            case 'groundSolutions':
                return <GroundSolutionsPage />;
            case 'airTaxiSolutions':
                return <AirTaxiSolutionsPage />;
            case 'home':
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="bg-[#F8F8F8] text-[#333333] min-h-screen">
            {/* Navigation Bar */}
            <nav className="bg-[#FFFFFF] shadow-md py-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
                    <button onClick={() => setCurrentPage('home')} className="text-2xl font-black text-[#FF7F00]">AVIM</button>
                    <div className="space-x-4 md:space-x-6">
                        <button onClick={() => handleNavClick('home', 'home')} className="text-[#333333] hover:text-[#FF7F00] font-semibold hidden md:inline-block">Home</button>
                        <button onClick={() => handleNavClick('home', 'services')} className="text-[#333333] hover:text-[#FF7F00] font-semibold hidden md:inline-block">Services</button>
                        <button onClick={() => setCurrentPage('groundSolutions')} className="text-[#333333] hover:text-[#FF7F00] font-semibold">Ground AV</button>
                        <button onClick={() => setCurrentPage('airTaxiSolutions')} className="text-[#333333] hover:text-[#FF7F00] font-semibold">Air Taxi</button>
                        <button onClick={() => handleNavClick('home', 'infographic-section')} className="text-[#333333] hover:text-[#FF7F00] font-semibold hidden md:inline-block">Our Vision</button>
                        <button onClick={() => handleNavClick('home', 'contact')} className="bg-[#FF7F00] text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors">Contact Us</button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto p-4 md:p-8">
                {renderPage()}
            </div>

            {/* Footer */}
            <footer className="bg-[#333333] text-white text-center py-8 mt-16">
                <p>&copy; 2025 AVIM. All rights reserved.</p>
                <div className="mt-4 space-x-4">
                    <a href="#" className="text-white hover:text-[#FF7F00]">Privacy Policy</a>
                    <a href="#" className="text-white hover:text-[#FF7F00]">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
}

export default App;
