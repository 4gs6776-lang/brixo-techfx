import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Check, Star, Facebook, Instagram, 
  MessageCircle, Linkedin, Twitter, Mail, Phone, MapPin, 
  Palette, Image, Globe, HeartPulse, Code, IdCard, 
  ShieldCheck, Zap, Sparkles, TrendingUp, Layers
} from 'lucide-react';

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    const hoverElements = document.querySelectorAll('a, button, .hoverable');
    const handleMouseEnter = () => cursorRef.current?.classList.add('hovering');
    const handleMouseLeave = () => cursorRef.current?.classList.remove('hovering');

    window.addEventListener('mousemove', move);
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} className="cursor-dot hidden md:block"></div>;
};

// --- NAVBAR ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ["Home", "About", "Services", "Solutions", "Portfolio", "Process", "Contact"];
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <a href="#home" className="font-display text-2xl font-bold tracking-wider">
          BRIXO<span className="text-accent">-</span>TECHFX
        </a>
        
        <ul className="hidden lg:flex space-x-8">
          {links.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="text-sm uppercase tracking-widest hover:text-accent transition-colors relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden lg:flex items-center gap-2 bg-accent text-primary px-6 py-2 rounded-full font-semibold text-sm hover:bg-white transition-colors">
          START A PROJECT <ArrowRight size={14} />
        </a>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className="space-y-8 text-center">
          {links.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-3xl font-display hover:text-accent transition-colors">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// --- HERO ---
const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-24">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-blue/30 rounded-full filter blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full filter blur-[120px]"></div>

      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent">
            <span className="w-8 h-px bg-accent"></span> BRIXO-TECHFX®
          </span>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter">
            WE <span className="gradient-text">DESIGN.</span><br/>
            WE <span className="gradient-text">BUILD.</span><br/>
            WE <span className="gradient-text">SOLVE.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl">
            Creative design, intelligent technology and powerful digital solutions engineered to move businesses forward.
          </p>

          <div className="flex gap-4 mt-4">
            <a href="#contact" className="bg-accent text-primary px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-white transition-colors group">
              START A PROJECT <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:border-accent hover:text-accent transition-colors">
              EXPLORE OUR WORK
            </a>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="text-xs uppercase tracking-widest text-gray-500">Trusted Digital Solutions for Modern Businesses</p>
          </div>
        </div>

        {/* 3D Abstract Composition */}
        <div className="hidden lg:block relative h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center animate-float">
            <div className="relative w-80 h-96 glass rounded-2xl p-6 transform rotate-6 hoverable">
              <div className="w-full h-32 bg-gradient-to-br from-accent-blue to-accent rounded-lg mb-4 flex items-center justify-center">
                <Globe size={48} className="text-white" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-white/20 rounded"></div>
                <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                <div className="h-20 w-full bg-white/5 rounded mt-4"></div>
              </div>
            </div>
            
            <div className="absolute top-10 right-10 w-48 h-64 glass rounded-2xl p-4 transform -rotate-3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 bg-accent/20 rounded"></div>
                <div className="h-16 bg-accent/10 rounded"></div>
                <div className="h-16 bg-accent/30 rounded"></div>
                <div className="h-16 bg-accent/5 rounded"></div>
              </div>
            </div>

            <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-accent to-accent-blue rounded-full opacity-80 filter blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-accent/30 rounded-3xl rotate-45"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- TRUST STRIP ---
const TrustStrip = () => {
  const stats = [
    { num: 50, suffix: "+", label: "Projects" },
    { num: 6, suffix: "+", label: "Services" },
    { num: 100, suffix: "%", label: "Commitment" },
    { num: 24, suffix: "/7", label: "Digital Support" },
  ];

  return (
    <section className="border-y border-white/10 py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <h2 className="text-center font-display text-2xl md:text-3xl mb-12 text-gray-300">
          CREATIVE TECHNOLOGY FOR AMBITIOUS BUSINESSES.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <h3 className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-accent group-hover:from-accent transition-all">
                {stat.num}{stat.suffix}
              </h3>
              <p className="text-sm uppercase tracking-widest text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ABOUT ---
const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            WE TURN IDEAS<br/>INTO DIGITAL<br/><span className="text-accent">EXPERIENCES.</span>
          </h2>
          <a href="#services" className="inline-flex items-center gap-2 mt-8 text-accent font-semibold group">
            Learn More <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
        
        <div className="relative">
          <div className="glass p-8 rounded-2xl relative z-10">
            <p className="text-lg text-gray-300 leading-relaxed">
              Brixo-TechFX combines creativity, technology and strategic thinking to create digital solutions that help brands communicate better, operate smarter and grow faster.
            </p>
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-32 glass p-6 rounded-2xl flex flex-col justify-center z-20 border-l-4 border-accent">
            <p className="text-4xl font-display font-bold text-accent">5+</p>
            <p className="text-xs uppercase tracking-widest mt-1">Years Experience</p>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full filter blur-2xl"></div>
        </div>
      </div>
    </section>
  );
};

// --- SERVICES ---
const Services = () => {
  const services = [
    { num: "01", icon: Palette, title: "Graphic Design", desc: "Creative visual designs that communicate your message and make your brand stand out.", features: ["Logo Design", "Social Media Kit", "Print Collateral"] },
    { num: "02", icon: Image, title: "Photo Editing", desc: "Professional photo editing and retouching for polished, high-quality results.", features: ["Retouching", "Color Correction", "Background Removal"] },
    { num: "03", icon: Globe, title: "Website Development", desc: "Modern, responsive and high-performance websites designed to convert visitors.", features: ["UI/UX Design", "React Development", "SEO Optimized"] },
    { num: "04", icon: HeartPulse, title: "Hospital Management System", desc: "Digital hospital solutions for managing patients, appointments, billing, and inventory.", features: ["Patient Records", "Staff Management", "Billing System"] },
    { num: "05", icon: Code, title: "Business Software", desc: "Custom software solutions that automate processes and improve productivity.", features: ["CRM/ERP", "Automation Tools", "API Integration"] },
    { num: "06", icon: IdCard, title: "Branding Solutions", desc: "Complete branding and visual identity solutions designed to build trust.", features: ["Brand Strategy", "Visual Identity", "Style Guide"] },
  ];

  return (
    <section id="services" className="py-32 bg-secondary/30 grid-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Our Expertise</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">Everything you need to build, improve and grow.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group glass p-8 rounded-2xl hover:border-accent/50 transition-all duration-500 relative overflow-hidden hoverable">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-colors">
                  <s.icon size={24} />
                </div>
                <span className="font-display text-5xl font-bold text-white/5 group-hover:text-accent/20 transition-colors">{s.num}</span>
              </div>

              <h3 className="text-xl font-display font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{s.desc}</p>
              
              <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out">
                <div className="border-t border-white/10 pt-4 space-y-2">
                  {s.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check size={14} className="text-accent" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <ArrowRight size={14} className="ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SOLUTIONS ---
const Solutions = () => {
  const solutions = [
    { num: "01", title: "Websites", icon: Globe, color: "from-blue-500 to-cyan-400" },
    { num: "02", title: "Business Software", icon: Code, color: "from-indigo-500 to-blue-500" },
    { num: "03", title: "Hospital Systems", icon: HeartPulse, color: "from-cyan-400 to-teal-400" },
    { num: "04", title: "Brand Experiences", icon: Sparkles, color: "from-purple-500 to-blue-500" },
  ];

  return (
    <section id="solutions" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold">DIGITAL SOLUTIONS BUILT FOR IMPACT</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s, i) => (
            <div key={i} className="group relative h-80 glass rounded-2xl overflow-hidden flex flex-col justify-end p-8 hoverable cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              <div className="absolute top-6 right-6 text-6xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors">{s.num}</div>
              
              <div className="relative z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                  <s.icon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold">{s.title}</h3>
                <div className="flex items-center text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- PORTFOLIO ---
const Portfolio = () => {
  const filters = ["All", "Design", "Photo", "Websites", "Software", "Branding"];
  const [activeFilter, setActiveFilter] = useState("All");
  
  const projects = [
    { title: "E-Commerce UI/UX", cat: "Websites", year: "2024", desc: "High-converting e-commerce platform with seamless checkout." },
    { title: "Healthcare Brand", cat: "Branding", year: "2024", desc: "Complete visual identity for a modern healthcare provider." },
    { title: "Corporate CRM", cat: "Software", year: "2023", desc: "Custom CRM solution for enterprise sales teams." },
    { title: "Fashion Retouching", cat: "Photo", year: "2024", desc: "High-end photo retouching for a fashion campaign." },
    { title: "Fintech App Design", cat: "Design", year: "2023", desc: "Intuitive financial dashboard UI/UX design." },
  ];

  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.cat === activeFilter);

  return (
    <section id="portfolio" className="py-32 bg-secondary/30 grid-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">Selected Work</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">A glimpse into what we can create.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${activeFilter === f ? 'bg-accent text-primary border-accent' : 'border-white/20 hover:border-accent'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {filtered.map((p, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-2xl hoverable ${i === 0 ? 'lg:row-span-2 h-96 lg:h-auto' : 'h-80'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary border border-white/10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs uppercase tracking-widest text-accent">{p.cat} • {p.year}</span>
                <h3 className="text-2xl font-display font-bold mt-2">{p.title}</h3>
                <p className="text-gray-400 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {p.desc}
                </p>
                <div className="flex items-center text-white mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  View Project <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- PROCESS ---
const Process = () => {
  const steps = [
    { num: "01", title: "Discover", desc: "We dive deep into your business, goals, and challenges to understand your needs." },
    { num: "02", title: "Strategize", desc: "We formulate a comprehensive plan and technology stack tailored to your goals." },
    { num: "03", title: "Design", desc: "We craft intuitive, futuristic interfaces and user experiences that captivate." },
    { num: "04", title: "Build", desc: "We develop robust, scalable, and high-performance digital solutions." },
    { num: "05", title: "Launch", desc: "We deploy, optimize, and support your solution for long-term success." },
  ];

  return (
    <section id="process" className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">How We Work</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">OUR PROCESS</h2>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
          <div className="space-y-12">
            {steps.map((s, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 glass p-8 rounded-2xl hover:border-accent/50 transition-colors w-full relative">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-display font-bold text-accent">{s.num}</span>
                    <h3 className="text-2xl font-display font-bold">{s.title}</h3>
                  </div>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-accent z-10 border-4 border-primary"></div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CONTACT CTA ---
const ContactCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full filter blur-[150px]"></div>
        <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter relative">
          LET'S BUILD YOUR<br/><span className="gradient-text">NEXT BIG IDEA.</span>
        </h2>
        <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto">
          Tell us what you want to build. We'll help turn the idea into a professional digital solution.
        </p>
        <a href="#contact" className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 rounded-full font-semibold mt-8 hover:bg-white transition-colors group">
          REQUEST A QUOTE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

// --- CONTACT ---
const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">HAVE A PROJECT<br/>IN MIND?</h2>
          <p className="text-gray-400 mt-6 mb-12">Let's discuss how we can help you achieve your digital goals.</p>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl flex items-center gap-4 hoverable">
              <Mail className="text-accent" size={24} />
              <div><p className="text-xs text-gray-500 uppercase">Email</p><a href="mailto:hello@brixotechfx.com" className="hover:text-accent">hello@brixotechfx.com</a></div>
            </div>
            <div className="glass p-6 rounded-xl flex items-center gap-4 hoverable">
              <Phone className="text-accent" size={24} />
              <div><p className="text-xs text-gray-500 uppercase">Phone</p><a href="tel:+1234567890" className="hover:text-accent">+1 (234) 567-890</a></div>
            </div>
          </div>
        </div>

        <form className="glass p-8 rounded-2xl space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" required className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            <input type="email" placeholder="Email Address" required className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Phone Number" className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            <input type="text" placeholder="Company Name" className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <select className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors">
              <option>Select Service</option>
              <option>Website Development</option>
              <option>Software Development</option>
              <option>Branding</option>
            </select>
            <select className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors">
              <option>Select Budget</option>
              <option>$1k - $5k</option>
              <option>$5k - $10k</option>
              <option>$10k+</option>
            </select>
          </div>
          <textarea placeholder="Project Details" rows={4} className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"></textarea>
          
          <button type="submit" className="w-full bg-accent text-primary py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white transition-colors group">
            SEND PROJECT REQUEST <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => {
  return (
    <footer className="bg-primary pt-20 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl font-bold mb-4">BRIXO<span className="text-accent">-</span>TECHFX</h3>
            <p className="text-gray-400 max-w-md">Creative Design. Smart Technology. Real Solutions. Transforming ideas into professional digital experiences.</p>
            <div className="flex gap-4 mt-6">
              {[Facebook, Instagram, Twitter, Linkedin, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-colors hoverable">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold mb-4 uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-accent">Home</a></li>
              <li><a href="#about" className="hover:text-accent">About</a></li>
              <li><a href="#portfolio" className="hover:text-accent">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 uppercase tracking-widest text-sm">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-accent">Web Development</a></li>
              <li><a href="#services" className="hover:text-accent">Software Solutions</a></li>
              <li><a href="#services" className="hover:text-accent">Branding</a></li>
              <li><a href="#services" className="hover:text-accent">Hospital Systems</a></li>
            </ul>
          </div>
        </div>

        {/* Animated line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 BRIXO-TECHFX. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- WHATSAPP BUTTON ---
const WhatsAppButton = () => (
  <a 
    href="https://wa.me/1234567890" // Replace with real number
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 hover:scale-110 transition-transform group"
  >
    <MessageCircle size={28} className="text-white" />
    <span className="absolute right-16 bg-primary text-white text-sm py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block whitespace-nowrap border border-white/20">
      Chat with us
    </span>
  </a>
);

// --- MAIN APP ---
export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  return (
    <div className="bg-primary min-h-screen">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <Solutions />
        <Portfolio />
        <Process />
        <ContactCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      
      {/* Theme Toggle Button - Floating */}
      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed bottom-8 left-8 z-50 w-12 h-12 glass rounded-full flex items-center justify-center hover:border-accent transition-colors"
      >
        {theme === 'dark' ? <Sparkles size={20} className="text-accent"/> : <Layers size={20} className="text-primary"/>}
      </button>
    </div>
  );
}