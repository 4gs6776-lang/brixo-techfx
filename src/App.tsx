import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowUpRight, Check, Star, Facebook, Instagram, 
  MessageCircle, Linkedin, Twitter, Mail, Phone, 
  Palette, Image, Globe, HeartPulse, Code, IdCard, 
  ShieldCheck, Zap, Sparkles, TrendingUp, Layers, ArrowRight, Quote
} from 'lucide-react';

// --- HOOKS & UTILITIES ---
const useInView = (ref: React.RefObject<HTMLElement>) => {
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
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      requestAnimationFrame(animateRing);
    };
    const addHover = () => ringRef.current?.classList.add('hovering');
    const removeHover = () => ringRef.current?.classList.remove('hovering');

    window.addEventListener('mousemove', move);
    const interval = setInterval(animateRing, 10);
    const hoverables = document.querySelectorAll('a, button, .hoverable');
    hoverables.forEach(el => el.addEventListener('mouseenter', addHover));
    hoverables.forEach(el => el.addEventListener('mouseleave', removeHover));

    return () => {
      window.removeEventListener('mousemove', move);
      clearInterval(interval);
      hoverables.forEach(el => el.removeEventListener('mouseenter', addHover));
      hoverables.forEach(el => el.removeEventListener('mouseleave', removeHover));
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block"></div>
      <div ref={ringRef} className="cursor-ring hidden lg:block"></div>
    </>
  );
};

// --- MAGNETIC BUTTON ---
const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; href?: string }> = ({ children, className, href }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <a 
      ref={ref} 
      href={href} 
      className={`inline-flex items-center gap-2 transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
};

// --- NAVBAR ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const links = ["Home", "About", "Services", "Solutions", "Work", "Process", "Contact"];
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <a href="#home" className="font-display text-2xl tracking-tight">BRIXO<span className="text-accent">-</span>TECHFX</a>
        <ul className="hidden lg:flex space-x-8">
          {links.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>
        <MagneticButton href="#contact" className="hidden lg:flex bg-white text-black px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-accent group">
          START A PROJECT <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
        </MagneticButton>
        <button className="lg:hidden text-white z-50" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className="space-y-8 text-center">
          {links.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-4xl font-display hover:text-accent transition-colors">{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// --- HERO ---
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    heroRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-24" onMouseMove={handleMouseMove}>
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full filter blur-[150px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-[150px]"></div>

      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <span className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent reveal in-view">
            <span className="w-8 h-px bg-accent"></span> DIGITAL TECHNOLOGY & CREATIVE SOLUTIONS
          </span>
          <h1 className="font-display text-6xl md:text-7xl xl:text-8xl reveal in-view">
            WE DESIGN.<br/>WE BUILD.<br/>WE <span className="gradient-text">SOLVE.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl reveal in-view text-balance">
            Creative design, intelligent technology and powerful digital solutions engineered to move businesses forward.
          </p>
          <div className="flex gap-4 mt-4 reveal in-view">
            <MagneticButton href="#contact" className="bg-accent text-black px-8 py-4 rounded-full font-semibold hover:bg-white group">
              START A PROJECT <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </MagneticButton>
            <a href="#work" className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:border-accent hover:text-accent transition-colors">
              EXPLORE OUR WORK
            </a>
          </div>
          <div className="mt-12 border-t border-white/10 pt-6 reveal in-view">
            <p className="text-xs uppercase tracking-widest text-gray-500">Trusted Digital Solutions for Modern Businesses</p>
          </div>
        </div>

        {/* 3D Parallax Tech Composition */}
        <div ref={heroRef} className="hidden lg:block relative h-[600px] transition-transform duration-200 ease-out">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[400px] h-[400px] border border-accent/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute w-[300px] h-[300px] border border-accent/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            <div className="absolute w-40 h-40 bg-gradient-to-br from-accent to-blue-600 rounded-full filter blur-2xl opacity-40"></div>
            
            <div className="absolute top-10 right-0 w-64 glass rounded-2xl p-5 backdrop-blur-xl animate-float" style={{ transform: 'translateZ(40px)' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Analytics</span>
                <span className="text-xs text-green-400">+24%</span>
              </div>
              <div className="h-20 w-full bg-gradient-to-br from-accent/20 to-transparent rounded-lg flex items-end p-2 gap-1">
                {[40, 65, 50, 80, 60, 90].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="w-2 bg-accent rounded-t"></div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-10 left-0 w-72 glass rounded-2xl p-5 backdrop-blur-xl animate-float" style={{ animationDelay: '1.5s', transform: 'translateZ(80px)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="text-accent">const solution = build({'{'}</div>
                <div className="text-gray-300 pl-4">type: 'web',</div>
                <div className="text-gray-300 pl-4">stack: 'React',</div>
                <div className="text-accent">});</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- TRUST STRIP ---
const StatCounter: React.FC<{ target: number; suffix: string; label: string }> = ({ target, suffix, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    const duration = 2000;
    const animate = (timestamp: number) => {
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
      <h2 className="text-center font-display text-2xl md:text-4xl mb-12 text-gray-300 tracking-tight">
        CREATIVE TECHNOLOGY FOR AMBITIOUS BUSINESSES.
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <StatCounter target={50} suffix="+" label="Projects" />
        <StatCounter target={6} suffix="+" label="Services" />
        <StatCounter target={100} suffix="%" label="Commitment" />
        <StatCounter target={24} suffix="/7" label="Digital Support" />
      </div>
    </div>
  </section>
);

// --- ABOUT ---
const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-30"></div>
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Who We Are</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">
            WE TURN IDEAS<br/>INTO DIGITAL<br/><span className="gradient-text">EXPERIENCES.</span>
          </h2>
        </div>
        <div className="relative">
          <div className="glass p-8 rounded-2xl relative z-10 border-l-2 border-accent">
            <p className="text-lg text-gray-300 leading-relaxed mb-6 text-balance">
              Brixo-TechFX combines creativity, technology and strategic thinking to create digital solutions that help brands communicate better, operate smarter and grow faster.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 mt-4 text-accent font-semibold group">
              Learn More <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
          <div className="absolute -bottom-12 -right-12 w-48 h-36 glass p-6 rounded-2xl flex flex-col justify-center z-20 border-t-2 border-accent">
            <p className="text-5xl font-display font-bold gradient-text">98%</p>
            <p className="text-xs uppercase tracking-widest mt-1 text-gray-400">Client Satisfaction</p>
          </div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full filter blur-3xl"></div>
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="services" className="py-32 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Our Expertise</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tight">Everything you need to build, improve and grow.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group relative glass p-8 rounded-2xl hoverable transition-colors duration-300" onMouseMove={handleMouseMove}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(0, 209, 255, 0.1), transparent 80%)' }}></div