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
    LineController,
    DoughnutController,
    BarController
} from 'chart.js';
import {
    ArrowRight, Users, Handshake, DollarSign, Briefcase, Mail, Home, Lightbulb, Info, Newspaper,
    MapPin, CloudLightning, Wrench, Building, Rocket, Zap, HardHat, Scale, Layout, Globe, Package, CheckCircle,
    HardDrive
} from 'lucide-react';

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
    LineController,
    DoughnutController,
    BarController
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
