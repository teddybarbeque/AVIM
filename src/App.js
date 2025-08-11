import React, { useState } from 'react';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    // This function handles both navigating to a new page and scrolling to a specific section on that page.
    const handleNavClick = (page, sectionId) => {
        setCurrentPage(page);
        if (sectionId) {
            // Use a slight delay to allow the page to re-render before scrolling
            setTimeout(() => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const HomePage = () => (
        <>
            {/* Team section */}
            <section id="team" className="py-16 bg-white rounded-xl shadow-lg my-8 mx-4">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-6 text-[#333333]">Meet Our Leadership</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Teddy O'Brien's Profile */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                            <img
                                src="/IMG_6843.JPG"
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
                            <h3 className="text-xl font-semibold mb-3 text-[#333333]">AV & Electric Fleet Operators</h3>
                            <p className="text-gray-600">
                                Secure purpose-built depots for charging, maintenance, and dispatch, tailored to your operational needs and growth plans.
                            </p>
                        </div>
                        {/* Partner Type 2: Urban Planners & Real Estate Developers */}
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <h3 className="text-xl font-semibold mb-3 text-[#333333]">Urban Planners & Developers</h3>
                            <p className="text-gray-600">
                                Integrate next-gen mobility infrastructure into smart city initiatives and large-scale urban development projects.
                            </p>
                        </div>
                        {/* Partner Type 3: Technology & Solution Providers */}
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <h3 className="text-xl font-semibold mb-3 text-[#333333]">Technology & Solution Providers</h3>
                            <p className="text-gray-600">
                                Collaborate on integrating advanced charging, connectivity, and fleet management technologies into our physical hubs.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <button onClick={() => handleNavClick('home', 'contact')} className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                            Explore Partnership Opportunities
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
                                Apply Now
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
                                Apply Now
                            </button>
                        </div>
                    </div>
                    <div className="mt-12">
                        <button onClick={() => handleNavClick('home', 'contact')} className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                            View All Careers
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
                                src="/Vertiport photo.png"
                                alt="Vertiport Infrastructure by AVIM"
                                className="rounded-lg shadow-md mx-auto w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                    <div className="mt-12">
                        <button onClick={() => handleNavClick('home', 'contact')} className="bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                            Request Investor Deck
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
                                Read More
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
                                Read More
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
                                Read More
                            </button>
                        </div>
                    </div>
                    <div className="mt-12">
                        <a href="#" className="inline-block text-orange-600 hover:underline font-semibold flex items-center justify-center">
                            View All News & Insights
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
                <button onClick={() => handleNavClick('ground', 'our-facilities')} className="mt-8 inline-block bg-white text-[#FF7F00] font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-colors">Explore Our Facilities</button>
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
                                <h4 className="text-xl font-bold mb-2">Smart Charging Systems</h4>
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
                <button onClick={() => handleNavClick('home', 'contact')} className="bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">Contact Us About Ground AV Solutions</button>
            </section>
        </>
    );

    // Air Taxi Solutions Page Content
    const AirTaxiSolutionsPage = () => (
        <>
            {/* Hero Section */}
            <section id="hero" className="text-center my-12 md:my-20 py-16 rounded-3xl bg-gradient-to-br from-[#808080] to-[#A0A0A0] text-white shadow-xl">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Elevating Vertiport Infrastructure</h1>
                <p className="text-xl md:text-2xl mt-4 font-semibold max-w-4xl mx-auto">AVIM is pioneering the development and management of advanced vertiports and heli-pads to power the coming era of air taxis.</p>
                <button onClick={() => handleNavClick('air', 'our-approach')} className="mt-8 inline-block bg-[#FF7F00] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-orange-600 transition-colors">See Our Approach</button>
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
                    {/* The rest of the content for this page was not provided. It would go here. */}
                </div>
            </section>
        </>
    );

    return (
        <div className="App">
            {/* Navigation (You will need to create a navigation menu here) */}
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'ground' && <GroundSolutionsPage />}
            {currentPage === 'air' && <AirTaxiSolutionsPage />}
        </div>
    );
};

export default App;
