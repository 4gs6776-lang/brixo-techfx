import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowUpRight, ArrowRight, Star, Facebook, Instagram, 
  MessageCircle, Mail, Phone, MapPin, 
  Palette, Image as ImageIcon, Globe, HeartPulse, Code, IdCard, 
  Sparkles, Layers, Quote, Check, Send, AlertCircle, Loader
} from 'lucide-react';

// --- HOOKS ---
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

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
      <div ref={dotRef} className="cursor-dot hidden lg:block" aria-hidden="true"></div>
      <div ref={ringRef} className="cursor-ring hidden lg:block" aria-hidden="true"></div>
    </>
  );
};

// --- NAVBAR ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "About", "Services", "Solutions", "Portfolio", "Process", "Contact"];
  
  return (
    <nav className={"fixed top-0 w-full z-50 transition-all duration-500 " + (scrolled ? "glass py-4" : "bg-transparent py-6")}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <a href="#home" className="font-display text-xl tracking-tight">BRIXO<span className="text-accent">-</span>TECHFX</a>
        <ul className="hidden lg:flex space-x-10">
          {links.map(link => (
            <li key={link}>
              <a href={"#" + link.toLowerCase()} className="text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden lg:flex items-center gap-2 bg-white text-black px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-accent transition-colors group">
          Start a Project <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
        </a>
        <button className="lg:hidden text-white z-50" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={"fixed inset-0 bg-primary z-40 flex flex-col items-start justify-center transition-transform duration-500 p-6 " + (menuOpen ? "translate-x-0" : "translate-x-full")}>
        <ul className="space-y-8">
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

// --- HERO ---
const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-24">
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-accent/5 rounded-full filter blur-[150px]"></div>
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-blue-600/5 rounded-full filter blur-[150px]"></div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-5xl">
          <span className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-accent mb-8">
            <span className="w-8 h-px bg-accent"></span> Digital Technology & Creative Solutions
          </span>
          <h1 className="font-display text-6xl md:text-8xl xl:text-9xl mb-8 text-balance">
            We Design.<br/>We Build.<br/>We <span className="gradient-text">Solve.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-12 text-balance">
            Creative design, intelligent technology and powerful digital solutions engineered to move businesses forward. Based in Port Harcourt, Nigeria.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="bg-accent text-black px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors group flex items-center gap-2">
              START A PROJECT <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </a>
            <a href="#portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:border-accent hover:text-accent transition-colors">
              Explore Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ABOUT ---
const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
        <div ref={ref} className={"lg:col-span-7 reveal " + (inView ? "in-view" : "")}>
          <span className="text-xs uppercase tracking-[0.25em] text-accent">Who We Are</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight text-balance">
            We turn ideas into professional digital experiences.
          </h2>
        </div>
        <div className="lg:col-span-5">
          <div className="border-l border-accent pl-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-6 text-balance">
              Brixo-TechFx combines creativity, technology and strategic thinking to create digital solutions that help brands communicate better, operate smarter and grow faster.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Established 31 March 2025. Operating from Port Harcourt, Nigeria.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400"><Check size={14} className="text-accent" /> Innovation</div>
              <div className="flex items-center gap-2 text-sm text-gray-400"><Check size={14} className="text-accent" /> Quality</div>
              <div className="flex items-center gap-2 text-sm text-gray-400"><Check size={14} className="text-accent" /> Professionalism</div>
              <div className="flex items-center gap-2 text-sm text-gray-400"><Check size={14} className="text-accent" /> Client-focused</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SERVICES ---
const Services = () => {
  const services = [
    { num: "01", icon: Palette, title: "Graphic Design", desc: "Creative visual designs that communicate a brand's message and create memorable impressions.", features: ["Logo Design", "Social Media Designs", "Flyers & Posters", "Business Cards"] },
    { num: "02", icon: ImageIcon, title: "Photo Editing", desc: "Professional photo editing and retouching for polished, high-quality results.", features: ["Photo Retouching", "Color Correction", "Background Removal", "Image Enhancement"] },
    { num: "03", icon: Globe, title: "Website Development", desc: "Modern, responsive and high-performance websites designed to represent businesses professionally.", features: ["Business Websites", "Portfolio Websites", "Landing Pages", "Responsive UI/UX"] },
    { num: "04", icon: HeartPulse, title: "Hospital Management System", desc: "Digital solutions designed to help hospitals manage operations more efficiently.", features: ["Patient Records", "Appointments", "Staff Management", "Billing & Inventory"] },
    { num: "05", icon: Code, title: "Business Software", desc: "Custom software solutions designed to automate processes and improve productivity.", features: ["CRM Systems", "Automation Tools", "Dashboards", "API Integration"] },
    { num: "06", icon: IdCard, title: "Branding Solutions", desc: "Complete visual identity solutions designed to help businesses establish a strong brand.", features: ["Brand Identity", "Logo Systems", "Brand Guidelines", "Visual Direction"] },
  ];

  return (
    <section id="services" className="py-32 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-accent">Our Expertise</span>
            <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight">Premium Digital Services</h2>
          </div>
          <p className="text-gray-400 max-w-md text-balance">Tailored solutions designed to elevate your digital presence and operations.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {services.map((s, i) => (
            <div key={i} className="group relative bg-primary p-10 transition-colors duration-300 hoverable flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-colors"><s.icon size={20} /></div>
                <span className="font-display text-5xl font-bold text-white/5 group-hover:text-accent/10 transition-colors">{s.num}</span>
              </div>
              <h3 className="text-2xl font-display mb-4">{s.title}</h3>
              <p className="text-gray-400 text-sm mb-8">{s.desc}</p>
              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {s.features.map((f, i) => (<span key={i} className="text-xs text-gray-500">{f}</span>))}
                </div>
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
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-accent">Impactful Solutions</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight">Digital solutions built for impact</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s, i) => (
            <div key={i} className="group relative h-72 rounded-2xl overflow-hidden flex flex-col justify-end p-8 hoverable cursor-pointer border border-white/5 bg-primary">
              <div className={"absolute inset-0 bg-gradient-to-br " + s.color + " opacity-0 group-hover:opacity-10 transition-opacity duration-500"}></div>
              <div className="absolute top-6 right-6 text-5xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors">{s.num}</div>
              <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className={"w-12 h-12 rounded-xl bg-gradient-to-br " + s.color + " flex items-center justify-center mb-4"}><s.icon size={20} className="text-white" /></div>
                <h3 className="text-xl font-display">{s.title}</h3>
                <div className="flex items-center text-accent mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Explore <ArrowRight size={14} className="ml-2" /></div>
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
  const filters = ["All", "Graphic Design", "Photo Editing", "Websites", "Software", "Branding"];
  const [activeFilter, setActiveFilter] = useState("All");
  const projects = [
    { title: "Project Preview: Corporate Identity", cat: "Branding", year: "2025", desc: "Clean, modern branding mockup for technology clients." },
    { title: "Project Preview: E-Commerce UI", cat: "Websites", year: "2025", desc: "High-converting e-commerce dashboard preview." },
    { title: "Project Preview: Healthcare App", cat: "Software", year: "2025", desc: "Custom software solution for clinic management." },
    { title: "Project Preview: Marketing Flyer", cat: "Graphic Design", year: "2025", desc: "Professional promotional material design." },
    { title: "Project Preview: Portrait Retouch", cat: "Photo Editing", year: "2025", desc: "High-end photo color correction and enhancement." },
  ];
  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.cat === activeFilter);

  return (
    <section id="portfolio" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-accent">Our Work</span>
            <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight">Turning ideas into experiences</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={"px-4 py-2 text-xs uppercase tracking-wider rounded-full border transition-colors " + (activeFilter === f ? "bg-accent text-black border-accent" : "border-white/10 hover:border-accent hover:text-accent")}>{f}</button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {filtered.map((p, i) => (
            <div key={i} className={"group relative overflow-hidden rounded-2xl hoverable border border-white/5 h-80 " + (i === 0 ? "lg:col-span-2 lg:row-span-2 lg:h-auto" : "")}>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="absolute right-8 bottom-8 w-16 h-16 rounded-full bg-accent text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

// --- WHY CHOOSE US ---
const WhyChooseUs = () => {
  const features = [
    { title: "Custom Solutions", desc: "Tailored to your unique needs and goals.", icon: Layers },
    { title: "Innovative & Reliable", desc: "We use modern tools and technologies to create effective digital solutions.", icon: Sparkles },
    { title: "Quality & Professionalism", desc: "We focus on delivering polished, professional results.", icon: Check },
    { title: "Focused on Growth", desc: "Solutions designed to help businesses improve their digital presence and operations.", icon: ArrowRight },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-accent">Why Brixo-TechFX</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight">Why choose us</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="border border-white/5 p-8 rounded-2xl hoverable transition-colors bg-primary">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6"><f.icon size={20} className="text-accent" /></div>
              <h3 className="text-lg font-display mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
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
    { num: "01", title: "Discover", desc: "Understand the client's business, goals and requirements." },
    { num: "02", title: "Strategize", desc: "Develop the right approach and solution." },
    { num: "03", title: "Design", desc: "Create the visual and user experience." },
    { num: "04", title: "Build", desc: "Develop the website, software or digital solution." },
    { num: "05", title: "Launch", desc: "Deploy, test, optimize and support the final product." },
  ];

  return (
    <section id="process" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-accent">How We Work</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight">Our process</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {steps.map((s, i) => (
            <div key={i} className="group relative bg-primary p-8 hoverable transition-colors">
              <span className="text-5xl font-display font-bold text-white/5 group-hover:text-accent/10 transition-colors block mb-8">{s.num}</span>
              <div className="w-12 h-1 bg-accent mb-6 group-hover:w-20 transition-all duration-300"></div>
              <h3 className="text-xl font-display mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- TESTIMONIALS ---
const Testimonials = () => {
  return (
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-accent">Client Feedback</span>
        <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight">Sample testimonials</h2>
        <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto">These are placeholders. Update with real client reviews soon.</p>
      </div>
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 max-w-5xl">
        <div className="glass p-10 rounded-2xl flex flex-col justify-between min-h-[250px]">
          <div>
            <Quote className="text-accent/30 mb-6" size={32} />
            <p className="text-lg text-gray-200 text-balance">This is a sample testimonial. Brixo-TechFX delivered exceptional service and helped us launch our digital presence. Replace this with real client feedback.</p>
          </div>
          <div className="flex items-center mt-8 pt-6 border-t border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-black font-bold text-sm">S</div>
            <div className="ml-4 text-left">
              <p className="font-display text-sm">Sample Client 1</p>
              <p className="text-xs text-gray-400">CEO, Sample Company</p>
            </div>
          </div>
        </div>
        <div className="glass p-10 rounded-2xl flex flex-col justify-between min-h-[250px]">
          <div>
            <Quote className="text-accent/30 mb-6" size={32} />
            <p className="text-lg text-gray-200 text-balance">This is a sample testimonial. The team's attention to detail and technical expertise is outstanding. Replace this with real client feedback.</p>
          </div>
          <div className="flex items-center mt-8 pt-6 border-t border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-black font-bold text-sm">S</div>
            <div className="ml-4 text-left">
              <p className="font-display text-sm">Sample Client 2</p>
              <p className="text-xs text-gray-400">Founder, Sample Startup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CONTACT ---
const Contact = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.target);
    try {
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      if (response.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-accent">Get In Touch</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight">Have a project in mind?</h2>
          <p className="text-gray-400 mt-6 mb-12 text-balance">Tell us what you want to build. Let's discuss how Brixo-TechFX can help turn your idea into a professional digital solution.</p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center"><MessageCircle size={16} className="text-accent" /></div>
              <div><p className="text-xs text-gray-500 uppercase tracking-wider">WhatsApp</p><a href="https://wa.me/2348148364233" target="_blank" rel="noopener noreferrer" className="hover:text-accent text-lg">08148364233</a></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center"><Phone size={16} className="text-accent" /></div>
              <div><p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p><a href="tel:+2347015852728" className="hover:text-accent text-lg">07015852728</a></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center"><Mail size={16} className="text-accent" /></div>
              <div><p className="text-xs text-gray-500 uppercase tracking-wider">Email</p><a href="mailto:hellobrixeledge@gmail.com" className="hover:text-accent text-lg">hellobrixeledge@gmail.com</a></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center"><MapPin size={16} className="text-accent" /></div>
              <div><p className="text-xs text-gray-500 uppercase tracking-wider">Location</p><p className="text-lg">Port Harcourt, Nigeria</p></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass p-10 rounded-2xl space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div><label className="text-xs text-gray-500 uppercase tracking-wider">Full Name</label><input type="text" name="name" placeholder="John Doe" required className="input-field" /></div>
            <div><label className="text-xs text-gray-500 uppercase tracking-wider">Email Address</label><input type="email" name="email" placeholder="john@company.com" required className="input-field" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div><label className="text-xs text-gray-500 uppercase tracking-wider">Phone Number</label><input type="text" name="phone" placeholder="080..." className="input-field" /></div>
            <div><label className="text-xs text-gray-500 uppercase tracking-wider">Company Name</label><input type="text" name="company" placeholder="Company Ltd" className="input-field" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div><label className="text-xs text-gray-500 uppercase tracking-wider">Service Required</label><select name="service" className="input-field"><option>Graphic Design</option><option>Photo Editing</option><option>Website Development</option><option>Hospital Management System</option><option>Business Software</option><option>Branding Solutions</option></select></div>
            <div><label className="text-xs text-gray-500 uppercase tracking-wider">Budget</label><select name="budget" className="input-field"><option>Under $1k</option><option>$1k - $5k</option><option>$5k - $10k</option><option>$10k+</option></select></div>
          </div>
          <div><label className="text-xs text-gray-500 uppercase tracking-wider">Project Details</label><textarea name="details" placeholder="Tell us about your project..." rows={3} className="input-field resize-none"></textarea></div>
          
          {status === "success" && (
            <div className="flex items-center gap-2 text-green-400 text-sm"><Check size={16} /> Thank you! Your project request has been sent successfully.</div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={16} /> Oops! There was a problem submitting the form. Please try again or email us directly.</div>
          )}
          
          <button type="submit" disabled={status === "loading"} className="w-full bg-accent text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white transition-colors group disabled:opacity-50">
            {status === "loading" ? <Loader size={18} className="animate-spin" /> : "SEND PROJECT REQUEST"}
            {status !== "loading" && <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => (
  <footer className="bg-primary pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-5">
          <h3 className="font-display text-3xl mb-4">BRIXO<span className="text-accent">-</span>TECHFX</h3>
          <p className="text-gray-400 max-w-md mb-8 text-balance">Creative Design. Smart Technology. Real Solutions. Transforming ideas into professional digital experiences.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-colors hoverable" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-colors hoverable" aria-label="Facebook"><Facebook size={16} /></a>
          </div>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-xs font-bold mb-6 uppercase tracking-widest text-gray-500">Navigation</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#home" className="hover:text-accent">Home</a></li>
            <li><a href="#about" className="hover:text-accent">About</a></li>
            <li><a href="#services" className="hover:text-accent">Services</a></li>
            <li><a href="#portfolio" className="hover:text-accent">Portfolio</a></li>
            <li><a href="#contact" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="text-xs font-bold mb-6 uppercase tracking-widest text-gray-500">Contact</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>Port Harcourt, Nigeria</li>
            <li><a href="tel:+2347015852728" className="hover:text-accent">07015852728</a></li>
            <li><a href="https://wa.me/2348148364233" className="hover:text-accent">08148364233 (WhatsApp)</a></li>
            <li><a href="mailto:hellobrixeledge@gmail.com" className="hover:text-accent">hellobrixeledge@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 pt-8 border-t border-white/5">
        <p>© 2026 Brixo-TechFx. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-accent">Privacy Policy</a>
          <a href="#" className="hover:text-accent">Terms & Conditions</a>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-40 left-0 w-full text-center font-display text-[200px] font-bold text-white/[0.015] pointer-events-none select-none tracking-tighter">BRIXO-TECHFX</div>
  </footer>
);

// --- WHATSAPP BUTTON ---
const WhatsAppButton = () => (
  <a href="https://wa.me/2348148364233?text=Hello%20Brixo-TechFX,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you." target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 hover:scale-110 transition-transform group" aria-label="Chat on WhatsApp">
    <MessageCircle size={24} className="text-white" />
    <span className="absolute right-16 bg-black text-white text-sm py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block whitespace-nowrap border border-white/10">Chat with us</span>
  </a>
);

// --- MAIN APP ---
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
        <About />
        <Services />
        <Solutions />
        <Portfolio />
        <WhyChooseUs />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="fixed bottom-8 left-8 z-50 w-12 h-12 glass rounded-full flex items-center justify-center hover:border-accent transition-colors" aria-label="Toggle theme">
        {theme === 'dark' ? <Sparkles size={20} className="text-accent"/> : <Layers size={20} className="text-black"/>}
      </button>
    </div>
  );
}
