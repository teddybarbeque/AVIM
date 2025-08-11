import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ArrowRight, Users, Handshake, DollarSign, Briefcase, Mail, Home as HomeIcon, Lightbulb, Info, Newspaper,
  MapPin, CloudLightning, Wrench, Building, Rocket, Zap, HardHat, Scale, Layout, Globe, Package, CheckCircle, HardDrive
} from 'lucide-react';

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
  const [currentPage, setCurrentPage] = useState('home');

  const colors = {
    primaryAccent: '#FF7F00',
    secondaryAccent: '#808080',
    darkText: '#333333',
    lightBg: '#F8F8F8',
    white: '#FFFFFF',
  };

  const avMarketChartRef = useRef(null);
  const robotaxiMarketChartRef = useRef(null);
  const annualCostChartRef = useRef(null);
  const initialInvestmentChartRef = useRef(null);

  const processLabels = useCallback((labels) => {
    const maxLength = 16;
    return labels.map(label => {
      if (typeof label !== 'string' || label.length <= maxLength) return label;
      const words = label.split(' ');
      const lines = [];
      let current = '';
      for (const w of words) {
        if ((current + ' ' + w).trim().length > maxLength) {
          lines.push(current.trim());
          current = w;
        } else {
          current = (current + ' ' + w).trim();
        }
      }
      if (current) lines.push(current.trim());
      return lines;
    });
  }, []);

  const commonChartOptions = useCallback(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: colors.darkText,
          font: { family: "'Inter', sans-serif" }
        }
      },
      tooltip: {
        callbacks: {
          title(items) {
            const item = items[0];
            const lbl = item.chart.data.labels[item.dataIndex];
            return Array.isArray(lbl) ? lbl.join(' ') : lbl;
          },
          label(ctx) {
            let l = ctx.dataset.label ? ctx.dataset.label + ': ' : '';
            if (ctx.parsed !== null) {
              l += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(ctx.parsed);
            }
            return l;
          }
        },
        backgroundColor: 'rgba(51,51,51,0.9)',
        titleFont: { family: "'Inter', sans-serif", size: 14, weight: 'bold' },
        bodyFont: { family: "'Inter', sans-serif" }
      }
    },
    scales: {
      y: {
        ticks: { color: colors.darkText, font: { family: "'Inter', sans-serif" } },
        grid: { color: 'rgba(128,128,128,0.1)' }
      },
      x: {
        ticks: { color: colors.darkText, font: { family: "'Inter', sans-serif" } },
        grid: { display: false }
      }
    }
  }), [colors]);

  useEffect(() => {
    if (currentPage !== 'home') return;

    const avMarketData = {
      labels: ['2024', '2034'],
      datasets: [{
        label: 'AV Market Value (in Trillions USD)',
        data: [1.7, 3.9],
        borderColor: colors.primaryAccent,
        backgroundColor: 'rgba(255,127,0,0.2)',
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
        backgroundColor: 'rgba(128,128,128,0.3)',
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
          colors.primaryAccent, colors.secondaryAccent, '#FF9933', '#A0A0A0', '#CC6600', '#666666', '#FFBF80'
        ],
        borderColor: colors.white,
        borderWidth: 3,
        hoverOffset: 10
      }]
    };

    const investmentLabels = ['Software Dev & Testing', 'Hardware Integration', 'Autonomous Logistics Hub'];
    const initialInvestmentData = {
      labels: processLabels(investmentLabels),
      datasets: [{
        label: 'Low Est. (in Millions USD)',
        data: [2, 0.5, 16.3],
        backgroundColor: 'rgba(128,128,128,0.7)',
        borderColor: colors.secondaryAccent,
        borderWidth: 2
      }, {
        label: 'High Est. (in Millions USD)',
        data: [8, 2, 16.3],
        backgroundColor: 'rgba(255,127,0,0.7)',
        borderColor: colors.primaryAccent,
        borderWidth: 2
      }]
    };

    const destroyIf = (ref) => {
      if (ref.current && ref.current.chartInstance) {
        ref.current.chartInstance.destroy();
        ref.current.chartInstance = null;
      }
    };

    destroyIf(avMarketChartRef);
    destroyIf(robotaxiMarketChartRef);
    destroyIf(annualCostChartRef);
    destroyIf(initialInvestmentChartRef);

    const mk = (ref, type, data, options) => {
      const ctx = ref.current?.getContext('2d');
      if (!ctx) return null;
      const inst = new ChartJS(ctx, { type, data, options });
      ref.current.chartInstance = inst;
      return inst;
    };

    const c1 = mk(avMarketChartRef, 'line', avMarketData, commonChartOptions());
    const c2 = mk(robotaxiMarketChartRef, 'line', robotaxiMarketData, commonChartOptions());
    const c3 = mk(annualCostChartRef, 'doughnut', annualCostData, {
      ...commonChartOptions(),
      plugins: {
        ...commonChartOptions().plugins,
        legend: {
          position: 'bottom',
          labels: { color: colors.darkText, padding: 15, font: { family: "'Inter', sans-serif" } }
        }
      }
    });
    const c4 = mk(initialInvestmentChartRef, 'bar', initialInvestmentData, {
      indexAxis: 'y',
      ...commonChartOptions(),
      scales: {
        x: {
          ticks: {
            callback: (v) => '$' + v + 'M',
            color: colors.darkText,
            font: { family: "'Inter', sans-serif" }
          },
          grid: { color: 'rgba(128,128,128,0.1)' }
        },
        y: {
          ticks: { color: colors.darkText, font: { family: "'Inter', sans-serif" } },
          grid: { display: false }
        }
      }
    });

    return () => {
      c1?.destroy(); c2?.destroy(); c3?.destroy(); c4?.destroy();
    };
  }, [currentPage, commonChartOptions, processLabels, colors]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (section, id) => {
    setCurrentPage(section);
    setTimeout(() => scrollToSection(id), 0);
  };

  const HomePage = () => (
    <>
      <section id="home" className="text-center my-12 md:my-20 py-12 rounded-3xl bg-gradient-to-br from-[#FF7F00] to-[#FF9933] text-white shadow-xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Empowering the Future of Autonomous Mobility</h1>
        <p className="text-xl md:text-2xl mt-4 font-semibold max-w-4xl mx-auto">AVIM provides the essential infrastructure solutions that enable autonomous vehicle companies to scale efficiently and focus on their core technology.</p>
        <button onClick={() => handleNavClick('home', 'services')} className="mt-8 inline-block bg-white text-[#FF7F00] font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-colors">Discover Our Solutions</button>
      </section>

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
          <button onClick={() => handleNavClick('home', 'infographic-section')} className="bg-white rounded-2xl shadow-lg p-6 text-center kpi-card flex flex-col items-center justify-center">
            <div className="text-5xl mb-4 text-[#FF7F00]"><HardDrive /></div>
            <h3 className="text-xl font-bold mb-2 text-[#333333]">AV Data & Operations Hubs</h3>
            <p className="text-gray-700">Providing physical hubs for secure data storage, high-volume charging, and integrated operational support.</p>
          </button>
        </div>
      </section>

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
              <div className="chart-container"><canvas ref={avMarketChartRef}></canvas></div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card">
              <h3 className="text-xl font-bold mb-4 text-[#808080]">The Robotaxi Revolution</h3>
              <p className="mb-4">The robotaxi segment is forecast to be the epicenter of AV expansion, with staggering growth that fundamentally requires centralized, high-throughput service depots.</p>
              <div className="chart-container"><canvas ref={robotaxiMarketChartRef}></canvas></div>
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
              <div className="chart-container"><canvas ref={annualCostChartRef}></canvas></div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 kpi-card flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-[#FF7F00]">The Multi-Million Dollar Buy-In</h3>
              <p className="mb-4 flex-grow">Before a single AV hits the road, companies must invest millions in non-core activities like software testing, hardware integration, and facility construction.</p>
              <div className="chart-container"><canvas ref={initialInvestmentChartRef}></canvas></div>
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
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-2 text-[#333333]">Specialized Maintenance</h3>
              <p className="text-sm mb-4">AV maintenance is complex, requiring AI-driven diagnostics and precise calibration of sensors like LiDAR and cameras. A specialized service can provide this expertise more efficiently than in-house teams.</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-bold">Key Requirement:</p>
                <p className="text-sm">Critical sensors need periodic recalibration to ensure safety and accuracy.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="conclusion" className="my-12 text-center">
          <h2 className="text-3xl font-bold text-center mb-4">A Clear and Compelling Market Need</h2>
          <p className="max-w-4xl mx-auto text-lg mb-8">The path to profitability for AV companies is paved with efficiency. The massive costs and operational complexity of building proprietary infrastructure create an undeniable opportunity for a third-party provider.</p>
          <div className="flex justify-center">
            <button onClick={() => handleNavClick('home', 'contact')} className="bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">Partner With The Future</button>
          </div>
        </section>
      </section>

      {/* About + Team + Partnerships + Careers + Investors + News + Contact */}
      {/* ——— KEEP YOUR SECTIONS HERE (unchanged) ——— */}
      {/* Make sure any images referenced like /IMG_6843.JPG or /vertiport-photo.png exist in /public */}
    </>
  );

  const GroundSolutionsPage = () => (
    <>
      <section id="hero" className="text-center my-12 md:my-20 py-16 rounded-3xl bg-gradient-to-br from-[#FF7F00] to-[#FF9933] text-white shadow-xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Optimizing Ground AV Operations</h1>
        <p className="text-xl md:text-2xl mt-4 font-semibold max-w-4xl mx-auto">AVIM builds, owns, and operates charging and maintenance facilities so AV companies can scale cost-effectively.</p>
        <button onClick={() => setTimeout(() => document.getElementById('our-facilities')?.scrollIntoView({ behavior: 'smooth' }), 100)} className="mt-8 inline-block bg-white text-[#FF7F00] font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-colors">Explore Our Facilities</button>
      </section>

      <section id="our-facilities" className="my-16 bg-[#333333] text-white rounded-2xl p-8 md:p-12 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#FF7F00]">Our Integrated Approach to Ground AV Infrastructure</h2>
        <p className="max-w-3xl mx-auto text-center text-lg mb-12">Charging, maintenance, and operational support designed for maximum uptime.</p>

        <div className="grid grid-cols-1 gap-12">
          <div className="bg-[#808080] text-white rounded-lg p-8 shadow-inner">
            <h3 className="text-2xl font-bold mb-4 text-[#FF7F00]">Automated Charging Depots</h3>
            <p className="text-lg mb-6">Strategically located, engineered for high throughput.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#333333]">
              <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                <Zap className="h-8 w-8 mb-2" />
                <h4 className="text-xl font-bold mb-2">Smart Charging Systems</h4>
                <p className="text-gray-700 text-sm">Energy management to optimize schedules, minimize cost, and maximize availability.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                <Users className="h-8 w-8 mb-2" />
                <h4 className="text-xl font-bold mb-2">Automated Vehicle Handling</h4>
                <p className="text-gray-700 text-sm">Robotics for parking, charging connection, and queuing.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                <CheckCircle className="h-8 w-8 mb-2" />
                <h4 className="text-xl font-bold mb-2">Integrated Cleaning & Staging</h4>
                <p className="text-gray-700 text-sm">Automated bays to keep vehicles clean and ready.</p>
              </div>
            </div>
            <p className="text-sm mt-6 text-gray-200">Facilities scalable to hundreds of vehicles.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#333333]">The AVIM Integrated Advantage</h3>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">Charging, maintenance, and ops under one roof turns CapEx into OpEx and speeds scale-up.</p>
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

      <section id="contact" className="my-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#333333]">Ready to Streamline Your AV Operations?</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">Let’s discuss a tailored solution for your fleet.</p>
        <button onClick={() => handleNavClick('home', 'contact')} className="bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">Contact Us About Ground AV Solutions</button>
      </section>
    </>
  );

  const AirTaxiSolutionsPage = () => (
    <>
      <section id="hero" className="text-center my-12 md:my-20 py-16 rounded-3xl bg-gradient-to-br from-[#808080] to-[#A0A0A0] text-white shadow-xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Elevating Vertiport Infrastructure</h1>
        <p className="text-xl md:text-2xl mt-4 font-semibold max-w-4xl mx-auto">We develop and operate vertiports to power the air-taxi era.</p>
        <button onClick={() => setTimeout(() => document.getElementById('our-approach')?.scrollIntoView({ behavior: 'smooth' }), 100)} className="mt-8 inline-block bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">See Our Approach</button>
      </section>

      <section id="our-approach" className="my-16 bg-[#333333] text-white rounded-2xl p-8 md:p-12 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#FF7F00]">Our Approach to Vertiport Development</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <MapPin className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold mb-2 text-[#333333]">1. Site Selection</h3>
            <p className="text-gray-700 text-sm">Optimal locations considering routes, ground links, noise, and community fit.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Scale className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold mb-2 text-[#333333]">2. Permitting</h3>
            <p className="text-gray-700 text-sm">FAA, zoning, environmental, and building code navigation.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Layout className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold mb-2 text-[#333333]">3. Design & Engineering</h3>
            <p className="text-gray-700 text-sm">Pads, charging, lounges, maintenance bays—built for safety and scale.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <HardHat className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold mb-2 text-[#333333]">4. Construction</h3>
            <p className="text-gray-700 text-sm">From groundbreaking to inspection, with modular where it helps.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Globe className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold mb-2 text-[#333333]">5. Operations</h3>
            <p className="text-gray-700 text-sm">Charging orchestration, maintenance, traffic integration, passenger flow.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Handshake className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold mb-2 text-[#333333]">6. Partnerships</h3>
            <p className="text-gray-700 text-sm">Vertiport-as-a-Service with leading eVTOL and air-taxi operators.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="my-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#333333]">Ready for the Skies?</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">Let’s talk about your vertiport project.</p>
        <button onClick={() => handleNavClick('home', 'contact')} className="bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">Contact Us About Air Mobility</button>
      </section>
    </>
  );

  const FutureTimelinePage = () => (
    <>
      <style>{`
        .timeline-container{background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 50%,#1a1a1a 100%);min-height:100vh;margin:-2rem;padding:2rem}
        .timeline::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:4px;background:linear-gradient(180deg,rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.8) 50%,rgba(255,255,255,0.3) 100%);transform:translateX(-50%)}
        @media (max-width:768px){.timeline::before{left:30px}}
      `}</style>

      <div className="timeline-container">
        <div className="text-center text-white mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6">The Autonomous Vehicle Revolution</h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-4xl mx-auto">Building the infrastructure for tomorrow’s self-driving world</p>
        </div>

        {/* Example single block; keep/extend as you like */}
        <div className="timeline relative max-w-6xl mx-auto pb-12">
          <div className="relative mb-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF7F00] to-[#FF9933] text-white font-bold px-6 py-3 rounded-full shadow-lg z-10 whitespace-nowrap">
              TODAY
            </div>
            <div className="bg-white rounded-2xl p-8 ml-auto w-full md:w-5/12 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-[#FF7F00] flex items-center">
                <span className="text-3xl mr-3">🚗</span> The Beginning: Waymo’s Rollout
              </h3>
              <p className="text-gray-700 mb-6">Autonomous vehicles are rolling out in select cities. The foundation is being laid.</p>
              <ul className="space-y-3">
                {['Waymo operating in Phoenix, San Francisco, LA',
                  'Limited service areas with safety drivers',
                  'Public getting comfortable with AV tech',
                  'Early adopters testing the waters'].map((t,i)=>(
                    <li key={i} className="flex items-start">
                      <span className="text-[#FF7F00] font-bold text-xl mr-3">→</span>
                      <span className="text-gray-600">{t}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-20 p-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-[#FF7F00] shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FF7F00]">Building Tomorrow’s Infrastructure Today</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">AVIM is positioning itself at the center of the AV revolution.</p>
          <button onClick={() => handleNavClick('home', 'contact')} className="bg-gradient-to-r from-[#FF7F00] to-[#FF9933] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">Join the Revolution</button>
        </div>
      </div>
    </>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'groundSolutions': return <GroundSolutionsPage />;
      case 'airTaxiSolutions': return <AirTaxiSolutionsPage />;
      case 'futureTimeline': return <FutureTimelinePage />;
      case 'home':
      default: return <HomePage />;
    }
  };

  return (
    <div className="bg-[#F8F8F8] text-[#333333] min-h-screen">
      <nav className="bg-[#FFFFFF] shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <button onClick={() => setCurrentPage('home')} className
