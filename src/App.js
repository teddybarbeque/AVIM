import React, { useState } from 'react';
import {
  ArrowRight, Users, Handshake, DollarSign, Briefcase, Mail, Home, Lightbulb, Info, Newspaper
} from 'lucide-react'; // Import directly from lucide-react npm package

function App() {
  // State to manage which section is currently active for navigation
  const [activeSection, setActiveSection] = useState('home');

  // Utility function for smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation click handler
  const handleNavClick = (section, id) => {
    setActiveSection(section);
    // Use setTimeout to allow state update to render, then scroll
    setTimeout(() => scrollToSection(id), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
      {/* Removed Tailwind CSS CDN script and style block from here, now in public/index.html */}
      
      {/* Header/Navigation Bar */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-50 rounded-b-xl">
        <nav className="container mx-auto px-4 flex items-center justify-between flex-wrap">
          {/* Logo/Brand Name */}
          <div className="flex items-center flex-shrink-0 text-gray-900 mr-6">
            <span className="font-extrabold text-2xl tracking-tight text-orange-700">AVIM</span>
            <span className="text-sm font-medium ml-2 text-gray-600 hidden md:block">
              Autonomous Vehicle Infrastructure Matrix
            </span>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="block lg:hidden">
            <button
              onClick={() => {
                const navLinks = document.getElementById('nav-links');
                navLinks.classList.toggle('hidden');
              }}
              className="flex items-center px-3 py-2 border rounded text-orange-500 border-orange-400 hover:text-orange-700 hover:border-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md"
            >
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div id="nav-links" className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden rounded-md">
            <div className="text-sm lg:flex-grow">
              <a
                href="#home"
                onClick={() => handleNavClick('home', 'home')}
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-orange-700 mr-4 py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#solutions"
                onClick={() => handleNavClick('solutions', 'solutions')}
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-orange-700 mr-4 py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Solutions
              </a>
              <a
                href="#about"
                onClick={() => handleNavClick('about', 'about')}
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-orange-700 mr-4 py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                About Us
              </a>
              <a
                href="#partnerships"
                onClick={() => handleNavClick('partnerships', 'partnerships')}
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-orange-700 mr-4 py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Partnerships
              </a>
              <a
                href="#careers"
                onClick={() => handleNavClick('careers', 'careers')}
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-orange-700 mr-4 py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Careers
              </a>
              <a
                href="#investors"
                onClick={() => handleNavClick('investors', 'investors')}
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-orange-700 mr-4 py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Investors
              </a>
              <a
                href="#news"
                onClick={() => handleNavClick('news', 'news')}
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-orange-700 mr-4 py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                News & Insights
              </a>
            </div>
            <div>
              <a
                href="#contact"
                onClick={() => handleNavClick('contact', 'contact')}
                className="inline-block text-sm px-6 py-3 leading-none border rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200 mt-4 lg:mt-0 shadow-md"
              >
                Contact Us
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20 md:py-32 overflow-hidden rounded-b-xl shadow-lg">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(https://placehold.co/1920x1080/4a4a4a/ffffff?text=Futuristic+Cityscape)' }}></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
              AVIM: Powering the Future of <br className="hidden sm:inline" />Autonomous Mobility.
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in-up delay-100">
              Building the foundational infrastructure – the **Autonomous Vehicle Infrastructure Matrix** – for Waymo, Cruise, and the next generation of self-driving companies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200">
              <button
                onClick={() => handleNavClick('solutions', 'solutions')}
                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 flex items-center justify-center"
              >
                Explore Our Solutions <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => handleNavClick('contact', 'contact')}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white hover:text-orange-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex items-center justify-center"
              >
                Get In Touch <Mail className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Value Proposition/Pillars Section */}
        <section className="py-16 bg-white rounded-xl shadow-inner my-8 mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
              Building the Future of Autonomous Infrastructure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Lightbulb className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Intelligent Intersections</h3>
                <p className="text-gray-600">
                  Deploying cutting-edge sensor networks and AI-powered traffic management systems for seamless AV flow and enhanced safety at urban intersections.
                </p>
              </div>
              {/* Pillar 2 */}
              <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <ArrowRight className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Dedicated AV Corridors</h3>
                <p className="text-gray-600">
                  Designing and implementing optimized lanes and zones exclusively for autonomous vehicles, ensuring efficiency and reliability for commercial fleets.
                </p>
              </div>
              {/* Pillar 3 */}
              <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Real-time Data & Connectivity</h3>
                <p className="text-gray-600">
                  Establishing robust communication networks and edge computing infrastructure to provide AVs with critical, real-time environmental data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg my-8 mx-4">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Our Comprehensive Infrastructure Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Solution Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Lightbulb className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">Smart Traffic Management</h3>
                <p className="text-gray-600 mb-4">
                  Leveraging AI and IoT to dynamically manage traffic signals, optimize routes, and reduce congestion for both human-driven and autonomous vehicles.
                </p>
                <ul className="text-gray-700 text-sm list-disc pl-5">
                  <li>Real-time traffic flow analysis</li>
                  <li>Predictive routing algorithms</li>
                  <li>Adaptive signal control</li>
                </ul>
              </div>
              {/* Solution Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Info className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">V2X Communication Systems</h3>
                <p className="text-gray-600 mb-4">
                  Developing vehicle-to-everything (V2X) communication infrastructure, enabling seamless data exchange between AVs, infrastructure, and pedestrians.
                </p>
                <ul className="text-gray-700 text-sm list-disc pl-5">
                  <li>Low-latency data transmission</li>
                  <li>Enhanced situational awareness</li>
                  <li>Standardized communication protocols</li>
                </ul>
              </div>
              {/* Solution Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Home className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">Modular Deployment Units</h3>
                <p className="text-gray-600 mb-4">
                  Designing adaptable, scalable infrastructure modules for quick and efficient deployment in diverse urban and logistical environments.
                </p>
                <ul className="text-gray-700 text-sm list-disc pl-5">
                  <li>Rapid installation & integration</li>
                  <li>Cost-effective scalability</li>
                  <li>Minimal urban disruption</li>
                </ul>
              </div>
              {/* Add more solution cards as needed */}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={() => handleNavClick('contact', 'contact')}
                className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                Discuss Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 bg-white rounded-xl shadow-lg my-8 mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">About AVIM</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
              AVIM (Autonomous Vehicle Infrastructure Matrix) is at the forefront of designing, developing, and deploying the physical and digital infrastructure essential for the widespread adoption of autonomous vehicles. We envision a future where urban and logistical environments seamlessly support self-driving technology, enhancing safety, efficiency, and sustainability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://placehold.co/600x400/8c8c8c/ffffff?text=Our+Vision"
                  alt="AVIM's Vision for Autonomous Infrastructure"
                  className="rounded-lg shadow-md mx-auto mb-6 md:mb-0 w-full h-auto object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h3>
                <p className="text-gray-700 mb-4">
                  To accelerate the safe and efficient integration of autonomous vehicles into daily life by building robust, intelligent, and scalable infrastructure solutions. We bridge the gap between cutting-edge AV technology and real-world operational environments.
                </p>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Expertise</h3>
                <p className="text-gray-700">
                  Our team comprises visionary engineers, urban planners, AI specialists, and logistics experts with deep experience in autonomous systems, smart city development, and complex infrastructure projects. We're committed to pioneering solutions that meet the unique demands of the autonomous future.
                </p>
              </div>
            </div>
            {/* Team section */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Meet Our Leadership</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Teddy O'Brien's Profile */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                  <img
                    src="uploaded:IMG_6843.JPG-29c56758-3f0e-4f9d-83c3-aef1a599b946" // Your uploaded image
                    alt="Teddy O'Brien"
                    className="rounded-full w-24 h-24 object-cover mb-4 ring-2 ring-orange-300"
                  />
                  <h4 className="text-xl font-semibold text-gray-800">Teddy O'Brien</h4>
                  <p className="text-orange-600 text-sm mb-2">Founder</p>
                  <p className="text-gray-600 text-center text-sm">
                    Student at CU studying Real Estate and Finance, driving the vision for autonomous vehicle infrastructure.
                  </p>
                  {/* Optional: LinkedIn icon */}
                </div>
                {/* Default Founder Profile 1 */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                  <img
                    src="https://placehold.co/120x120/5e5e5e/ffffff?text=Co-Founder+1"
                    alt="Co-Founder Name"
                    className="rounded-full w-24 h-24 object-cover mb-4 ring-2 ring-orange-300"
                  />
                  <h4 className="text-xl font-semibold text-gray-800">Jane Doe</h4>
                  <p className="text-orange-600 text-sm mb-2">CEO & Co-Founder</p>
                  <p className="text-gray-600 text-center text-sm">
                    Visionary in urban tech and smart infrastructure. Previously led major projects at [Previous Company].
                  </p>
                  {/* Optional: LinkedIn icon */}
                </div>
                {/* Default Founder Profile 2 */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                  <img
                    src="https://placehold.co/120x120/5e5e5e/ffffff?text=Co-Founder+2"
                    alt="Co-Founder Name"
                    className="rounded-full w-24 h-24 object-cover mb-4 ring-2 ring-orange-300"
                  />
                  <h4 className="text-xl font-semibold text-gray-800">John Smith</h4>
                  <p className="text-orange-600 text-sm mb-2">CTO & Co-Founder</p>
                  <p className="text-gray-600 text-center text-sm">
                    AI and robotics expert with a background in complex autonomous systems development.
                  </p>
                  {/* Optional: LinkedIn icon */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnerships Section */}
        <section id="partnerships" className="py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg my-8 mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Partner with AVIM</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
              Collaboration is key to building the future of autonomous mobility. AVIM is actively seeking strategic partnerships with a range of organizations to accelerate the deployment and scaling of autonomous vehicle infrastructure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Partner Type 1 */}
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Handshake className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Autonomous Vehicle Developers</h3>
                <p className="text-gray-600">
                  Integrate your AVs with our intelligent infrastructure for enhanced performance, safety, and expanded operational design domains.
                </p>
              </div>
              {/* Partner Type 2 */}
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Home className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Smart City Initiatives & Municipalities</h3>
                <p className="text-gray-600">
                  Co-create urban environments that are ready for autonomous fleets, improving public transportation, logistics, and quality of life.
                </p>
              </div>
              {/* Partner Type 3 */}
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Lightbulb className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Technology & Research Institutions</h3>
                <p className="text-gray-600">
                  Collaborate on R&D for next-generation infrastructure, pushing the boundaries of what's possible in AV integration.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <button
                onClick={() => handleNavClick('contact', 'contact')}
                className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                Explore Partnership Opportunities <Handshake className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section id="careers" className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg my-8 mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Join Our Team</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
              Are you passionate about shaping the future of transportation? AVIM is looking for talented, driven individuals to join our growing team. Be a part of building the foundational infrastructure that will enable autonomous vehicles worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Job Opening 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">Infrastructure Engineer (Hardware)</h3>
                <p className="text-orange-600 text-md mb-3">Full-time | San Antonio, TX</p>
                <p className="text-gray-700 mb-4">
                  Design and deploy physical sensor networks, V2X communication units, and edge computing nodes in urban environments.
                </p>
                <a href="#contact" onClick={() => handleNavClick('contact', 'contact')} className="text-orange-600 hover:underline flex items-center">
                  Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
              {/* Job Opening 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">AI/ML Software Engineer (Traffic Optimization)</h3>
                <p className="text-orange-600 text-md mb-3">Full-time | Remote (US-based)</p>
                <p className="text-gray-700 mb-4">
                  Develop and implement AI/ML algorithms for real-time traffic prediction, signal optimization, and autonomous vehicle pathfinding.
                </p>
                <a href="#contact" onClick={() => handleNavClick('contact', 'contact')} className="text-orange-600 hover:underline flex items-center">
                  Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
              {/* Add more job openings or a "View All Jobs" link */}
            </div>
            <div className="mt-12">
              <button
                onClick={() => handleNavClick('contact', 'contact')}
                className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                View All Careers <Briefcase className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Investors Section */}
        <section id="investors" className="py-16 bg-white rounded-xl shadow-lg my-8 mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">For Investors</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
              AVIM represents a unique investment opportunity at the intersection of autonomous technology and critical infrastructure development. We are building the foundational layer for a multi-trillion dollar industry.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">The Market Opportunity</h3>
                <p className="text-gray-700 mb-4">
                  The autonomous vehicle market is poised for exponential growth, but its full potential is bottlenecked by a lack of integrated physical and digital infrastructure. AVIM addresses this critical need, positioning us at the core of future mobility ecosystems.
                </p>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Traction & Vision</h3>
                <p className="text-gray-700 mb-4">
                  We are in early discussions for pilot programs with leading AV companies and forward-thinking municipalities. Our vision extends beyond individual smart components to a fully interconnected Autonomous Vehicle Infrastructure Matrix that is scalable, resilient, and ready for mass deployment.
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Team Strength:</span> Our leadership brings decades of combined experience in autonomous systems, urban development, and successful tech ventures.
                </p>
              </div>
              <div>
                <img
                  src="https://placehold.co/600x400/5e5e5e/ffffff?text=Investment+Opportunity"
                  alt="Investment Opportunity in AVIM"
                  className="rounded-lg shadow-md mx-auto w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="mt-12">
              <button
                onClick={() => handleNavClick('contact', 'contact')}
                className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                Request Investor Deck <DollarSign className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* News & Insights Section */}
        <section id="news" className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg my-8 mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">News & Insights</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
              Stay up-to-date with the latest from AVIM and developments in the autonomous infrastructure space.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* News Article 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                <img
                  src="https://placehold.co/400x250/c0c0c0/ffffff?text=News+1"
                  alt="News Placeholder Image"
                  className="rounded-md mb-4 w-full h-40 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">AVIM Announces Pilot Program Discussions</h3>
                <p className="text-gray-600 text-sm mb-4">June 20, 2025</p>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">
                  We're excited to announce that AVIM has entered into preliminary discussions for our first large-scale pilot program with a major autonomous vehicle developer...
                </p>
                <a href="#" className="text-orange-600 hover:underline flex items-center">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
              {/* News Article 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                <img
                  src="https://placehold.co/400x250/c0c0c0/ffffff?text=News+2"
                  alt="News Placeholder Image"
                  className="rounded-md mb-4 w-full h-40 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">The Future of Smart Intersections</h3>
                <p className="text-gray-600 text-sm mb-4">June 15, 2025</p>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">
                  Our latest blog post delves into how intelligent intersections are key to unlocking seamless urban autonomous mobility...
                </p>
                <a href="#" className="text-orange-600 hover:underline flex items-center">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
              {/* News Article 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-left">
                <img
                  src="https://placehold.co/400x250/c0c0c0/ffffff?text=News+3"
                  alt="News Placeholder Image"
                  className="rounded-md mb-4 w-full h-40 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">AVIM Attends Global Mobility Summit</h3>
                <p className="text-gray-600 text-sm mb-4">June 10, 2025</p>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">
                  Members of the AVIM leadership team recently participated in the Global Mobility Summit, discussing the future of infrastructure...
                </p>
                <a href="#" className="text-orange-600 hover:underline flex items-center">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </a>
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
              {/* Note: This form is for display only. For a functional form, you'd integrate a backend service.
                  You could use a service like Formspree, Netlify Forms, or build a custom serverless function.
                  For advanced AI-powered text generation based on user input, you would integrate a call
                  to the Gemini API here:
                  
                  Example (inside an async function for submit):
                  const prompt = `User message: ${messageContent}. User email: ${userEmail}. Generate a polite and informative response.`;
                  // Make a fetch call to the Gemini API as shown in the instructions.
                  // Update UI with loading state and then response.
              */}
            </form>
            <div className="mt-8 text-white">
              <p className="mb-2">Or reach us directly:</p>
              <p className="font-semibold">
                Email: <a href="mailto:info@avim.com" className="hover:underline">info@avim.com</a>
              </p>
              <p className="font-semibold">
                LinkedIn: <a href="https://www.linkedin.com/company/avim" target="_blank" rel="noopener noreferrer" className="hover:underline">AVIM on LinkedIn</a>
              </p>
              <p className="text-sm mt-4">
                Location: San Antonio, TX, USA (Conceptual, if applicable)
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 rounded-t-xl shadow-lg mt-8 mx-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} AVIM (Autonomous Vehicle Infrastructure Matrix). All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#home" onClick={() => handleNavClick('home', 'home')} className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <span className="text-gray-600">|</span>
            <a href="#home" onClick={() => handleNavClick('home', 'home')} className="hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
