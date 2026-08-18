import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowUpRight, Star, Facebook, Instagram, 
  MessageCircle, Linkedin, Twitter, Mail, Phone, 
  Palette, Image, Globe, HeartPulse, Code, IdCard, 
  Sparkles, Layers, ArrowRight, Quote
} from 'lucide-react';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    const move = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + "px";
        dotRef.current.style.top = mouseY + "px";
      }
    };
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + "px";
        ringRef.current.style.top = ringY + "px";
      }
      requestAnimationFrame(animateRing);
    };
    const addHover = () => ringRef.current?.classList.add("hovering");
    const removeHover = () => ringRef.current?.classList.remove("hovering");

    window.addEventListener("mousemove", move);
    const interval = setInterval(animateRing, 10);
    const hoverables = document.querySelectorAll("a, button, .hoverable");
    hoverables.forEach(el => el.addEventListener("mouseenter", addHover));
    hoverables.forEach(el => el.addEventListener("mouseleave", removeHover));

    return () => {
      window.removeEventListener("mousemove", move);
      clearInterval(interval);
      hoverables.forEach(el => el.removeEventListener("mouseenter", addHover));
      hoverables.forEach(el => el.removeEventListener("mouseleave", removeHover));
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block"></div>
      <div ref={ringRef} className="cursor-ring hidden lg:block"></div>
    </>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const links = ["Home", "About", "Services", "Solutions", "Work", "Process", "Contact"];
  
  return (
    <nav className={"fixed top-0 w-full z-50 transition-all duration-500 " + (scrolled ? "glass py-4" : "bg-transparent py-6")}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <a href="#home" className="font-display text-2xl tracking-tight">BRIXO<span className="text-accent">-</span>TECHFX</a>
        <ul className="hidden lg:flex space-x-8">
          {links.map(link => (
            <li key={link}>
              <a href={"#" + link.toLowerCase()} className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden lg:flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-accent transition-colors group">
          START A PROJECT <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
        </a>
        <button className="lg:hidden text-white z-50" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={"fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center transition-transform duration-500 " + (menuOpen ? "translate-x-0" : "translate-x-full")}>
        <ul className="space-y-8 text-center">
          {links.map(link => (
            <li key={link}>
              <a href={"#" + link.toLowerCase()} onClick={() => setMenuOpen(false)} className="text-4xl font-display hover:text-accent transition-colors">{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-24">
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full filter blur-[150px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-[150px]"></div>
      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <span className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
            <span className="w-8 h-px bg-accent"></span> DIGITAL TECHNOLOGY & CREATIVE SOLUTIONS
          </span>
          <h1 className="font-display text-6xl md:text-7xl xl:text-8xl">
            WE DESIGN.<br/>WE BUILD.<br/>WE <span className="gradient-text">SOLVE.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl text-balance">
            Creative design, intelligent technology and powerful digital solutions engineered to move businesses forward.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#contact" className="bg-accent text-black px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors group flex items-center gap-2">
              START A PROJECT <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </a>
            <a href="#work" className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:border-accent hover:text-accent transition-colors">
              EXPLORE OUR WORK
            </a>
          </div>
        </div>
        <div className="hidden lg:block relative h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[400px] h-[400px] border border-accent/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-[300px] h-[300px] border border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute w-40 h-40 bg-gradient-to-br from-accent to-blue-600 rounded-full filter blur-2xl opacity-40"></div>
            <div className="absolute top-10 right-0 w-64 glass rounded-2xl p-5 backdrop-blur-xl animate-float">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Analytics</span>
                <span className="text-xs text-green-400">+24%</span>
              </div>
              <div className="h-20 w-full bg-gradient-to-br from-accent/20 to-transparent rounded-lg flex items-end p-2 gap-1">
                <div className="w-2 bg-accent rounded-t h-[40%]"></div>
                <div className="w-2 bg-accent rounded-t h-[65%]"></div>
                <div className="w-2 bg-accent rounded-t h-[50%]"></div>
                <div className="w-2 bg-accent rounded-t h-[80%]"></div>
                <div className="w-2 bg-accent rounded-t h-[60%]"></div>
                <div className="w-2 bg-accent rounded-t h-[90%]"></div>
              </div>
            </div>
            <div className="absolute bottom-10 left-0 w-72 glass rounded-2xl p-5 backdrop-blur-xl animate-float [animation-delay:1.5s]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="text-accent">const solution = build(</div>
                <div className="text-gray-300 pl-4">type: web,</div>
                <div className="text-gray-300 pl-4">stack: React,</div>
                <div className="text-accent">);</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCounter = ({ target, suffix, label }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime;
    const duration = 2000;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center group">
      <h3 className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-accent group-hover:to-accent transition-all duration-500">
        {count}{suffix}
      </h3>
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">{label}</p>
    </div>
  );
};

const TrustStrip = () => (
  <section className="border-y border-white/5 py-20 bg-secondary/20 relative z-10">
    <div className="container mx-auto px-6">
      <h2 className="text-center font-display text-2xl md:text-4xl mb-12 text-gray-300 tracking-tight">CREATIVE TECHNOLOGY FOR AMBITIOUS BUSINESSES.</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <StatCounter target={50} suffix="+" label="Projects" />
        <StatCounter target={6} suffix="+" label="Services" />
        <StatCounter target={100} suffix="%" label="Commitment" />
        <StatCounter target={24} suffix="/7" label="Digital Support" />
      </div>
    </div>
  </section>
);

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-30"></div>
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div ref={ref} className={"reveal " + (inView ? "in-view" : "")}>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Who We Are</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">WE TURN IDEAS<br/>INTO DIGITAL<br/><span className="gradient-text">EXPERIENCES.</span></h2>
        </div>
        <div className="relative">
          <div className="glass p-8 rounded-2xl relative z-10 border-l-2 border-accent">
            <p className="text-lg text-gray-300 leading-relaxed mb-6 text-balance">Brixo-TechFx combines creativity, technology and strategic thinking to create digital solutions that help brands communicate better, operate smarter and grow faster.</p>
            <a href="#contact" className="inline-flex items-center gap-2 mt-4 text-accent font-semibold group">Learn More <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></a>
          </div>
          <div className="absolute -bottom-12 -right-12 w-48 h-36 glass p-6 rounded-2xl flex flex-col justify-center z-20 border-t-2 border-accent">
            <p className="text-5xl font-display font-bold gradient-text">98%</p>
            <p className="text-xs uppercase tracking-widest mt-1 text-gray-400">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

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
    <section id="services" className="py-32 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Our Expertise</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">Everything you need to build, improve and grow.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group relative glass p-8 rounded-2xl hoverable transition-colors duration-300 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-accent/5"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-xl glass flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors"><s.icon size={24} /></div>
                  <span className="font-display text-6xl font-bold text-white/5 group-hover:text-accent/20 transition-colors">{s.num}</span>
                </div>
                <h3 className="text-2xl font-display mb-4">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{s.desc}</p>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {s.features.map((f, i) => (<span key={i} className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">{f}</span>))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Impactful Solutions</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">DIGITAL SOLUTIONS BUILT FOR IMPACT</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s, i) => (
            <div key={i} className="group relative h-80 glass rounded-2xl overflow-hidden flex flex-col justify-end p-8 hoverable cursor-pointer">
              <div className={"absolute inset-0 bg-gradient-to-br " + s.color + " opacity-0 group-hover:opacity-20 transition-opacity duration-500"}></div>
              <div className="absolute top-6 right-6 text-6xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors">{s.num}</div>
              <div className="relative z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
                <div className={"w-14 h-14 rounded-xl bg-gradient-to-br " + s.color + " flex items-center justify-center mb-4"}><s.icon size={24} className="text-white" /></div>
                <h3 className="text-2xl font-display">{s.title}</h3>
                <div className="flex items-center text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Explore <ArrowRight size={16} className="ml-2" /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const filters = ["All", "Design", "Photo", "Websites", "Software", "Branding"];
  const [activeFilter, setActiveFilter] = useState("All");
  const projects = [
    { title: "E-Commerce Platform", cat: "Websites", year: "2024", desc: "High-converting e-commerce platform with seamless checkout." },
    { title: "Healthcare Brand Identity", cat: "Branding", year: "2024", desc: "Complete visual identity for a modern healthcare provider." },
    { title: "Corporate CRM System", cat: "Software", year: "2023", desc: "Custom CRM solution for enterprise sales teams." },
    { title: "Fashion Campaign Retouching", cat: "Photo", year: "2024", desc: "High-end photo retouching for a fashion campaign." },
    { title: "Fintech App UI/UX", cat: "Design", year: "2023", desc: "Intuitive financial dashboard UI/UX design." },
  ];
  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.cat === activeFilter);

  return (
    <section id="work" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">Selected Work</span>
            <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">A glimpse into what we can create.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={"px-4 py-2 text-sm rounded-full border transition-colors " + (activeFilter === f ? "bg-accent text-black border-accent" : "border-white/20 hover:border-accent hover:text-accent")}>{f}</button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {filtered.map((p, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl hoverable border border-white/5 h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="portfolio-arrow absolute right-8 bottom-8 w-16 h-16 rounded-full bg-accent text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight size={24} />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs uppercase tracking-widest text-accent">{p.cat} • {p.year}</span>
                <h3 className="text-2xl font-display mt-2">{p.title}</h3>
                <p className="text-gray-400 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Success Stories</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">FROM IDEA TO IMPACT.</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-32 h-[400px] glass rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-blue-600/20 flex items-center justify-center">
              <Globe size={80} className="text-accent/30" />
            </div>
          </div>
          <div className="space-y-12">
            {[
              { stage: "Challenge", text: "A growing healthcare provider needed a unified system to handle patient data and appointments." },
              { stage: "Strategy", text: "We architected a secure, scalable cloud-based Hospital Management System." },
              { stage: "Design", text: "Designed an intuitive UI reducing staff training time by 40%." },
              { stage: "Development", text: "Built with React, Node.js, and HIPAA-compliant database structures." },
              { stage: "Result", text: "Increased operational efficiency by 65% and reduced patient wait times." }
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-2xl border-l-2 border-accent hover:border-l-4 transition-all duration-300">
                <h3 className="text-sm uppercase tracking-widest text-accent mb-2">{i+1}. {item.stage}</h3>
                <p className="text-xl text-gray-200 text-balance">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

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
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">How We Work</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">OUR PROCESS</h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10"></div>
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent to-transparent"></div>
          
          <div className="space-y-12">
            {steps.map((s, i) => (
              <div key={i} className="relative pl-20 group">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full glass flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors z-10">{i + 1}</div>
                <div className="glass p-6 rounded-xl hover:border-accent/30 transition-colors">
                  <h3 className="text-2xl font-display mb-2">{s.title}</h3>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: "Sarah Johnson", role: "CEO, MedCare", text: "Brixo-TechFx transformed our clinic operations. Their hospital management system is unparalleled." },
    { name: "David Chen", role: "Founder, TechFlow", text: "The custom software they built scaled our business effortlessly. Truly a $10k+ experience." },
    { name: "Emma Williams", role: "Marketing Dir., StyleCo", text: "Exceptional branding and photo retouching. They understand modern aesthetics perfectly." },
    { name: "Michael Brown", role: "CTO, FinTechX", text: "Secure, fast, and beautiful. Our web platform has never performed better." },
  ];
  const items = [...testimonials, ...testimonials];

  return (
    <section className="py-32 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Client Feedback</span>
        <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">TRUSTED BY LEADERS</h2>
      </div>
      <div className="flex gap-6 animate-marquee w-max">
        {items.map((t, i) => (
          <div key={i} className="w-[500px] glass p-8 rounded-2xl flex flex-col justify-between min-h-[250px]">
            <div>
              <Quote className="text-accent/30 mb-4" size={32} />
              <p className="text-lg text-gray-200 text-balance">{t.text}</p>
            </div>
            <div className="flex items-center mt-6 pt-6 border-t border-white/5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-black font-bold">{t.name.charAt(0)}</div>
              <div className="ml-4">
                <p className="font-display">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
              <div className="ml-auto flex">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-accent fill-accent" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactCTA = () => (
  <section className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 grid-bg"></div>
    <div className="container mx-auto px-6 relative z-10 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full filter blur-[150px]"></div>
      <h2 className="font-display text-5xl md:text-7xl tracking-tight relative">LETS BUILD YOUR<br/><span className="gradient-text">NEXT BIG IDEA.</span></h2>
      <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto text-balance">Tell us what you want to build. We will help turn the idea into a professional digital solution.</p>
      <a href="#contact" className="inline-flex items-center gap-2 bg-accent text-black px-8 py-4 rounded-full font-semibold mt-8 hover:bg-white transition-colors group">
        REQUEST A QUOTE <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
      </a>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 bg-secondary/20">
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Get In Touch</span>
        <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">HAVE A PROJECT<br/>IN MIND?</h2>
        <p className="text-gray-400 mt-6 mb-12">Lets discuss how we can help you achieve your digital goals.</p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl flex items-center gap-4 hoverable">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center"><Mail className="text-accent" size={20} /></div>
            <div><p className="text-xs text-gray-500 uppercase">Email</p><a href="mailto:hello@brixotechfx.com" className="hover:text-accent">hello@brixotechfx.com</a></div>
          </div>
          <div className="glass p-6 rounded-xl flex items-center gap-4 hoverable">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center"><Phone className="text-accent" size={20} /></div>
            <div><p className="text-xs text-gray-500 uppercase">Phone</p><a href="tel:+1234567890" className="hover:text-accent">+1 (234) 567-890</a></div>
          </div>
        </div>
      </div>
      <form className="glass p-8 rounded-2xl space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Full Name" required className="input-field" />
          <input type="email" placeholder="Email Address" required className="input-field" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Phone Number" className="input-field" />
          <input type="text" placeholder="Company Name" className="input-field" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <select className="input-field"><option>Select Service</option><option>Website Development</option><option>Software Development</option><option>Branding</option></select>
          <select className="input-field"><option>Select Budget</option><option>$1k - $5k</option><option>$5k - $10k</option><option>$10k+</option></select>
        </div>
        <textarea placeholder="Project Details" rows={4} className="input-field resize-none"></textarea>
        <button type="submit" className="w-full bg-accent text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white transition-colors group">SEND PROJECT REQUEST <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" /></button>
      </form>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-primary pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl mb-4">BRIXO<span className="text-accent">-</span>TECHFX</h3>
          <p className="text-gray-400 max-w-md mb-6">Creative Design. Smart Technology. Real Solutions. Transforming ideas into professional digital experiences.</p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter, Linkedin, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-colors hoverable"><Icon size={16} /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4 uppercase tracking-widest text-sm">Navigation</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#home" className="hover:text-accent">Home</a></li>
            <li><a href="#about" className="hover:text-accent">About</a></li>
            <li><a href="#work" className="hover:text-accent">Work</a></li>
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
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent mb-8"></div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2026 BRIXO-TECHFX. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-accent">Privacy Policy</a>
          <a href="#" className="hover:text-accent">Terms & Conditions</a>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-32 left-0 w-full text-center font-display text-[200px] font-bold text-white/[0.02] pointer-events-none select-none tracking-tighter">BRIXO-TECHFX</div>
  </footer>
);

const WhatsAppButton = () => (
  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform group">
    <MessageCircle size={24} className="text-white" />
    <span className="absolute right-16 bg-black text-white text-sm py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block whitespace-nowrap border border-white/10">Chat with us</span>
  </a>
);

export default function App() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.remove('light');
    else document.documentElement.classList.add('light');
  }, [theme]);

  return (
    <div className="bg-primary min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <Solutions />
        <Portfolio />
        <CaseStudies />
        <Process />
        <Testimonials />
        <ContactCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="fixed bottom-8 left-8 z-50 w-12 h-12 glass rounded-full flex items-center justify-center hover:border-accent transition-colors">
        {theme === 'dark' ? <Sparkles size={20} className="text-accent"/> : <Layers size={20} className="text-black"/>}
      </button>
    </div>
  );
}