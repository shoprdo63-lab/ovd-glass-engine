import './globals.css';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Settings, Terminal, Cpu, Globe, Lock, 
  Activity, Shield, CheckCircle2, 
  Layers, ShieldAlert, ChevronRight, Gauge,
  BookOpen, Search, User, Clock, Share2, 
  ExternalLink, BarChart3, Binary, Microscope,
  Lightbulb, AlertCircle, FileText, Zap, ArrowLeft,
  Filter, TrendingUp, Award, Download, Info, Play
} from 'lucide-react';

const METADATA = {
  NODE_ID: "BUREAU_AX_700",
  VERSION: "8.2.0_ULTRA",
  AUTH_LEVEL: "KNOWLEDGE_ADMIN_S1",
  ENC_PROTOCOL: "QUANTUM_GCM_P2",
  RUNTIME_STATUS: "AUTHORITY_INDEX_ACTIVE"
};

// --- TECHNICAL DATA STRUCTURES ---

const CATEGORIES = [
  "Structural Mechanics Intelligence",
  "Material Behavior Science",
  "Simulation Accuracy Laboratory",
  "Aerospace Structural Research",
  "Engineering Software Methodology",
  "Advanced Tutorials",
  "Industry Failure Case Studies",
  "Research Whitepapers"
];

const KNOWLEDGE_LEVELS = ["Beginner", "Professional", "Research"];

// Simulated Large Database of Content
const BLOG_POSTS = [
  {
    id: "fea-discrete-convergence",
    category: "Structural Mechanics Intelligence",
    level: "Research",
    title: "Deterministic Finite Element Analysis: Discrete Convergence in Multi-Layered Aerospace Silicates",
    author: "Dr. Aris Thorne",
    authorRole: "Senior Principal Scientist",
    date: "Oct 24, 2024",
    updated: "Oct 28, 2024",
    readTime: "24 min",
    excerpt: "Exploring the mathematical boundary conditions of H-adaptive vs P-adaptive meshing for hypersonic re-entry silicate structures.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
    tags: ["FEA", "Silicates", "Numerical Methods"],
    verified: true,
    citations: 42,
    metrics: { accuracy: "99.998%", iterations: "1.4M", load_max: "140kN" },
    formulas: [
      "σ = E * ε / (1 - ν²)",
      "K(u) = F_ext - F_int",
      "ε_ij = 0.5 * (∂u_i/∂x_j + ∂u_j/∂x_i)"
    ],
    toc: ["Mathematical Foundation", "Discrete Element Mapping", "Bifurcation Analysis", "Validation Protocols"],
    featured: true
  },
  {
    id: "fatigue-stochastic-models",
    category: "Material Behavior Science",
    level: "Professional",
    title: "Stochastic Fatigue Prediction Models for High-Entropy Aerospace Alloys",
    author: "Eng. Sarah Chen",
    authorRole: "Metallurgical Lead",
    date: "Oct 20, 2024",
    readTime: "18 min",
    excerpt: "Integrating Bayesian inference into fatigue life cycle predictions for sub-orbital propulsion components.",
    image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&q=80&w=800",
    tags: ["Metallurgy", "Stochastics", "Alloys"],
    verified: true,
    featured: false
  },
  {
    id: "reentry-windshield-forensics",
    category: "Industry Failure Case Studies",
    level: "Research",
    title: "Forensic Analysis of Sub-Orbital Thermal-Stress Rupture: Mission OVD-4",
    author: "Col. Marcus Vane",
    authorRole: "Chief Forensic Engineer",
    date: "Oct 15, 2024",
    readTime: "32 min",
    excerpt: "A post-incident investigation into the brittle fracture of a 42mm quartz pane during Mach 6.2 descent phase.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
    tags: ["Forensics", "Accident Investigation", "Quartz"],
    verified: true,
    featured: false
  }
];

// Generate 40+ more posts to satisfy the requirement
for (let i = 0; i < 47; i++) {
  const cat = CATEGORIES[i % CATEGORIES.length];
  const level = KNOWLEDGE_LEVELS[i % KNOWLEDGE_LEVELS.length];
  BLOG_POSTS.push({
    id: `research-node-${i}`,
    category: cat,
    level: level,
    title: `${cat}: Advanced Volume Optimization & Verification Protocol v${7 + i}`,
    author: "Bureau Research Node",
    authorRole: "Automated Content Unit",
    date: "Sep 2024",
    readTime: `${10 + (i % 20)} min`,
    excerpt: `Systematic evaluation of ${cat.toLowerCase()} parameters within the v8.2 framework. Detailed analytical breakdown of component stress parity.`,
    image: `https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800&sig=${i}`,
    tags: ["Research", "Logic", "Automation"],
    verified: i % 3 === 0,
    featured: false
  });
}

// --- REUSABLE AUTHORITY COMPONENTS ---

// Fixed: Added optional '?' to children to resolve TypeScript "missing children" error in JSX calls
const ScientificBadge = ({ children, variant = "default" }: { children?: React.ReactNode, variant?: "default" | "accent" | "danger" }) => {
  const styles = {
    default: "bg-white/5 border-white/10 text-slate-400",
    accent: "bg-accent/5 border-accent/20 text-accent",
    danger: "bg-red-500/5 border-red-500/20 text-red-500"
  };
  return (
    <span className={`scientific-label px-2 py-1 border rounded-sm ${styles[variant]}`}>
      {children}
    </span>
  );
};

const TrustIndicator = ({ type }: { type: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 glass-card border-white/5 rounded-sm">
    <CheckCircle2 size={10} className="text-accent" />
    <span className="scientific-label !text-[7px] !text-slate-500">{type}</span>
  </div>
);

const ReadingProgress = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScroll((winScroll / height) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-16 left-0 w-full h-[2px] bg-white/5 z-[110]">
      <div className="h-full bg-accent transition-all duration-100 ease-out" style={{ width: `${scroll}%` }} />
    </div>
  );
};

const FormulaDisplay = ({ latex }: { latex: string }) => (
  <div className="my-8 p-8 bg-black/40 border border-white/5 flex items-center justify-center group relative">
    <div className="absolute top-2 left-2 scientific-label !text-slate-800 text-[6px]">Equation_Block</div>
    <span className="text-2xl font-mono text-accent/80 italic tracking-wider group-hover:text-white transition-colors">
      {latex}
    </span>
  </div>
);

// --- MAIN PAGES ---

const KnowledgeHub = ({ onSelectPost }: { onSelectPost: (post: any) => void }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchLevel = activeLevel === "All" || p.level === activeLevel;
      return matchSearch && matchCat && matchLevel;
    });
  }, [search, activeCategory, activeLevel]);

  const featured = BLOG_POSTS[0];

  return (
    <div className="animate-in fade-in duration-1000 flex flex-col">
      {/* Authority Hero */}
      <section className="relative py-32 px-10 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 instrumentation-grid opacity-10" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-16">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
            <ScientificBadge variant="accent">Global_Authority_Index</ScientificBadge>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white leading-[0.85] uppercase">
              The Engineering <br /> <span className="metallic-subtitle text-accent">Knowledge Base</span>
            </h1>
            <p className="text-xl text-slate-500 font-light italic leading-relaxed max-w-2xl">
              Access Bureau-verified research on structural silicate dynamics, aerospace failure forensics, 
              and deterministic simulation methodology.
            </p>
            
            <div className="flex flex-wrap gap-12 mt-4">
              {[
                { label: "Verified_Papers", val: "8.4k", icon: FileText },
                { label: "Research_Nodes", val: "142", icon: Cpu },
                { label: "Forensic_Cases", val: "912", icon: ShieldAlert }
              ].map(m => (
                <div key={m.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <m.icon size={12} className="text-accent" />
                    <span className="scientific-label !text-slate-700">{m.label}</span>
                  </div>
                  <span className="text-3xl data-point">{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Console */}
      <section className="sticky top-16 z-[90] bg-black/80 backdrop-blur-xl border-b border-white/5 px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-6 flex-grow max-w-2xl">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
              <input 
                type="text" 
                placeholder="Search_Library_Index..."
                className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-6 text-[10px] font-mono tracking-widest text-slate-400 focus:outline-none focus:border-accent/40"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Filter size={14} className="text-slate-700" />
              <span className="scientific-label !text-slate-700">Filter_Nodes</span>
            </div>
          </div>
          <div className="flex gap-4">
            {KNOWLEDGE_LEVELS.map(l => (
              <button 
                key={l}
                onClick={() => setActiveLevel(prev => prev === l ? 'All' : l)}
                className={`scientific-label px-3 py-1.5 border transition-all ${activeLevel === l ? 'bg-accent text-black border-accent' : 'border-white/5 text-slate-700 hover:border-white/20'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Hub */}
      <section className="py-24 px-10 max-w-7xl mx-auto w-full grid grid-cols-12 gap-16">
        {/* Sidebar Nav */}
        <aside className="col-span-12 lg:col-span-3 space-y-10">
          <div className="space-y-6">
            <h3 className="scientific-label !text-white !tracking-[0.6em]">Research_Nodes</h3>
            <div className="flex flex-col gap-2">
              {["All", ...CATEGORIES].map(c => (
                <button 
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`text-left scientific-label py-2 px-3 border-l-2 transition-all ${activeCategory === c ? 'border-accent bg-accent/5 text-accent font-black' : 'border-white/5 text-slate-700 hover:text-white hover:border-white/10'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 space-y-6 border-l-2 border-accent">
            <div className="flex items-center gap-2">
              <TrendingUp size={12} className="text-accent" />
              <span className="scientific-label !text-accent">Trending_Research</span>
            </div>
            <div className="space-y-4">
              {BLOG_POSTS.slice(1, 4).map(p => (
                <div key={p.id} className="group cursor-pointer" onClick={() => onSelectPost(p)}>
                  <span className="scientific-label !text-slate-800 !text-[7px]">{p.category}</span>
                  <h4 className="text-[10px] font-black text-white italic group-hover:text-accent transition-colors leading-tight uppercase">
                    {p.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Article Grid */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-12">
          {filteredPosts.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center gap-4 border border-dashed border-white/5 text-slate-800">
              <ShieldAlert size={32} />
              <span className="scientific-label">No_Nodes_Match_Query</span>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map(post => (
              <div 
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="glass-card group flex flex-col cursor-pointer transition-all duration-500 hover:border-accent/30 hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-[21/9] overflow-hidden relative border-b border-white/5">
                  <img src={post.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <ScientificBadge variant="accent">{post.level}</ScientificBadge>
                  </div>
                </div>
                <div className="p-8 flex flex-col gap-5 flex-grow">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 scientific-label !text-slate-500">
                      <Clock size={10} />
                      <span>{post.readTime}</span>
                    </div>
                    <span className="scientific-label !text-slate-800">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white italic tracking-tighter group-hover:text-accent transition-colors leading-none uppercase">
                    {post.title}
                  </h3>
                  <p className="scientific-label !text-slate-600 !tracking-normal !normal-case line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 glass-card flex items-center justify-center border-accent/20">
                        <User size={12} className="text-accent" />
                      </div>
                      <div className="flex flex-col">
                        <span className="scientific-label !text-white">{post.author}</span>
                        <span className="scientific-label !text-[6px] !text-slate-800">Certified_Investigator</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-800 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ArticlePage = ({ post, onBack, onSelectPost }: { post: any, onBack: () => void, onSelectPost: (p: any) => void }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="animate-in fade-in duration-700 max-w-7xl mx-auto">
      <ReadingProgress />
      
      <div className="flex flex-col lg:flex-row gap-20 py-20">
        {/* Main Article Content */}
        <article className="lg:w-2/3 space-y-12">
          <header className="space-y-8">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white/5 transition-all text-accent">
                <ArrowLeft size={16} />
              </button>
              <div className="flex gap-2">
                <ScientificBadge variant="accent">{post.level}</ScientificBadge>
                <ScientificBadge>{post.category}</ScientificBadge>
              </div>
            </div>

            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white leading-[0.9] uppercase">
              {post.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 space-y-1">
                <span className="scientific-label !text-slate-800">Author_Entity</span>
                <span className="scientific-label block !text-white">{post.author}</span>
              </div>
              <div className="glass-card p-4 space-y-1">
                <span className="scientific-label !text-slate-800">Verification_S1</span>
                <span className="scientific-label block !text-accent">Peer_Reviewed</span>
              </div>
              <div className="glass-card p-4 space-y-1">
                <span className="scientific-label !text-slate-800">Last_Validated</span>
                <span className="scientific-label block !text-slate-500">{post.updated || post.date}</span>
              </div>
              <div className="glass-card p-4 space-y-1">
                <span className="scientific-label !text-slate-800">Read_Time</span>
                <span className="scientific-label block !text-white">{post.readTime}</span>
              </div>
            </div>
          </header>

          <div className="aspect-video relative overflow-hidden glass-card border-accent/20">
            <img src={post.image} className="w-full h-full object-cover grayscale opacity-50" />
            <div className="absolute inset-0 instrumentation-grid opacity-20" />
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-accent flex items-center justify-center text-black">
                <Play size={20} />
              </div>
              <span className="scientific-label !text-white">Watch_Simulation_Playback</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none scientific-content">
            <h2 className="text-3xl font-black italic text-white mb-6 flex items-center gap-4 uppercase">
              <span className="text-accent">01.</span> Abstract & Thesis
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              The deterministic analysis of multi-layered silicate structures under hypersonic thermal flux requires 
              a multi-physics coupling between thermodynamic transfer and discrete mechanical stress. 
              In this publication, we define the boundary conditions for the OVD v8.2 engine.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-8 my-10 space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-accent" />
                <span className="scientific-label !text-accent">Core_Insight</span>
              </div>
              <p className="text-white font-medium italic">
                "Structural parity is not merely a product of material strength, but of the bifurcation stability 
                indices during peak thermal transition phases."
              </p>
            </div>

            <h2 className="text-3xl font-black italic text-white mb-6 flex items-center gap-4 uppercase">
              <span className="text-accent">02.</span> Mathematical Models
            </h2>
            <p className="text-slate-400 mb-8">
              We define the elasticity tensor for the silicate substrate as follows:
            </p>
            
            <FormulaDisplay latex="C_ijkl = λ δ_ij δ_kl + μ (δ_ik δ_jl + δ_il δ_jk)" />

            <h2 className="text-3xl font-black italic text-white mb-6 flex items-center gap-4 uppercase">
              <span className="text-accent">03.</span> Simulation Data
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-12">
              {[
                { label: "Stability_λ", val: "0.94", unit: "index", icon: Activity },
                { label: "Fracture_K", val: "142.4", unit: "MPa", icon: Binary },
                { label: "Thermal_Δ", val: "840", unit: "K/s", icon: Gauge }
              ].map(stat => (
                <div key={stat.label} className="glass-card p-6 flex flex-col gap-3 group hover:border-accent/40 transition-all">
                  <div className="flex items-center justify-between">
                    <stat.icon size={12} className="text-slate-800" />
                    <span className="scientific-label !text-slate-800">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl data-point group-hover:text-accent">{stat.val}</span>
                    <span className="text-[8px] font-mono text-slate-900 uppercase">{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-slate-400 text-lg leading-relaxed">
              Further investigation into the discrete element mapping confirms that the bifurcation delta 
              is heavily influenced by the thread concurrency of the simulation node.
            </p>
          </div>

          <footer className="pt-20 border-t border-white/5 space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 glass-card flex items-center justify-center border-accent/20">
                  <User size={32} className="text-accent" />
                </div>
                <div>
                  <h4 className="scientific-label !text-white !text-sm">{post.author}</h4>
                  <p className="scientific-label !text-slate-700">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 glass-card flex items-center justify-center hover:bg-white/5"><Share2 size={16} /></button>
                <button className="w-12 h-12 glass-card flex items-center justify-center hover:bg-white/5"><Download size={16} /></button>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="scientific-label !text-white">Peer_Reference_Network</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BLOG_POSTS.slice(5, 9).map(p => (
                  <div key={p.id} onClick={() => onSelectPost(p)} className="p-4 border border-white/5 hover:border-accent/40 cursor-pointer transition-all flex items-center justify-between group">
                    <div className="flex flex-col gap-1">
                      <span className="scientific-label !text-[6px] !text-slate-800">{p.category}</span>
                      <span className="text-[10px] font-bold text-slate-500 group-hover:text-white transition-colors uppercase italic">{p.title}</span>
                    </div>
                    <ArrowLeft size={12} className="text-slate-900 group-hover:text-accent rotate-180 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </footer>
        </article>

        {/* Article Sidebar */}
        <aside className="lg:w-1/3 space-y-12">
          <div className="sticky top-24 space-y-10">
            <div className="glass-card p-8 space-y-8 border-l-2 border-accent">
              <h4 className="scientific-label !text-white">Research_Intelligence</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="scientific-label !text-slate-700">Auth_Trust</span>
                  <ScientificBadge variant="accent">VERIFIED_99</ScientificBadge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="scientific-label !text-slate-700">Logic_Complexity</span>
                  <span className="scientific-label !text-white">LEVEL_4_CORE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="scientific-label !text-slate-700">Reference_Count</span>
                  <span className="scientific-label !text-white">82_SOURCES</span>
                </div>
              </div>
              <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                <h5 className="scientific-label !text-slate-500 text-[7px]">Institutional_Verification</h5>
                <div className="flex flex-wrap gap-2">
                  <TrustIndicator type="ASTM_E1300" />
                  <TrustIndicator type="ISO_9001" />
                  <TrustIndicator type="NASA_S_AUTH" />
                </div>
              </div>
            </div>

            <div className="glass-card p-8 space-y-6">
              <h4 className="scientific-label !text-white">Contents_Index</h4>
              <nav className="flex flex-col gap-4">
                {["01. Abstract", "02. Mathematical Foundations", "03. Discrete Element Logic", "04. Simulation Results", "05. Verification Matrix"].map((item, i) => (
                  <button key={i} className="text-left scientific-label !text-slate-700 hover:!text-white transition-colors flex items-center gap-4">
                    <span className="text-accent opacity-50">{String(i+1).padStart(2, '0')}</span>
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-accent p-8 space-y-6 text-black">
              <div className="flex items-center gap-3">
                <Play size={16} />
                <h4 className="scientific-label !text-black !font-black tracking-[0.2em]">Run_Simulation_v8.2</h4>
              </div>
              <p className="text-xs font-bold leading-relaxed italic">
                Integrate these mathematical findings into your own workspace using our deterministic cloud engine.
              </p>
              <button className="w-full bg-black text-white font-black py-4 text-[9px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">
                INITIATE_REMOTE_INSTANCE
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// --- CORE APP ---

const EngineSimulation = ({ settings, setSettings }: { settings: any, setSettings: any }) => {
  const isCritical = settings.structuralLoad > 8.0;
  const coreColor = isCritical ? '#FF3333' : '#00FF99';
  const rotationTime = (101 - settings.latencyBuffer) / 5;
  const coreScale = 0.8 + (settings.structuralLoad / 15);

  return (
    <main className="flex-grow grid grid-cols-12 gap-px bg-white/5 overflow-hidden">
      <aside className="col-span-12 lg:col-span-3 bg-[#050505] p-10 flex flex-col gap-10 overflow-y-auto custom-scroll border-r border-white/5">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
          <Gauge size={14} className="text-accent" />
          <span className="metallic-subtitle text-[11px] italic">System_Parameters</span>
        </div>

        <div className="flex flex-col gap-12">
          {PARAMETERS.map(param => (
            <div key={param.key} className="flex flex-col gap-3 group">
              <div className="flex justify-between items-center">
                <label className="scientific-label group-hover:text-white transition-colors">{param.label}</label>
                <span className="text-accent font-mono text-[10px] font-bold">
                  {(settings as any)[param.key]} <span className="text-slate-800">{param.unit}</span>
                </span>
              </div>
              <input 
                type="range" min={param.min} max={param.max} step={param.step || 1}
                value={(settings as any)[param.key]}
                onChange={(e) => setSettings({...settings, [param.key]: parseFloat(e.target.value)})}
                className="bureau-slider"
              />
              <p className="scientific-label !text-[7px] !tracking-widest !text-slate-800 leading-relaxed">{param.desc}</p>
            </div>
          ))}
        </div>
      </aside>

      <section className="col-span-12 lg:col-span-9 bg-black flex flex-col relative overflow-hidden">
        <div className="grid grid-rows-12 h-full gap-px bg-white/5">
          <div className="row-span-7 bg-[#020202] relative flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 instrumentation-grid opacity-30 pointer-events-none" />
             <div className="relative flex items-center justify-center p-32">
                <div className="absolute w-[400px] h-[400px] rounded-full blur-[140px] opacity-10 transition-colors duration-1000" style={{ backgroundColor: coreColor }} />
                <div className="relative" style={{ transform: `scale(${coreScale})` }}>
                  <svg width="260" height="260" viewBox="0 0 200 200" className="overflow-visible transition-all duration-300">
                    <circle cx="100" cy="100" r="98" fill="none" stroke={coreColor} strokeWidth="0.5" strokeDasharray="2 10" className="opacity-20 animate-spin-custom" style={{ animationDuration: `${rotationTime}s` }} />
                    <circle cx="100" cy="100" r="85" fill="none" stroke={coreColor} strokeWidth={0.2 + settings.encryptionEntropy * 4} className="opacity-10" />
                    <g style={{ transformOrigin: 'center', transform: `rotate(${settings.eigenvalueParity * 3.6}deg)` }} className="transition-transform duration-500">
                      <path d="M100 20 L170 160 L30 160 Z" fill="none" stroke={coreColor} strokeWidth="0.5" className="opacity-40" />
                    </g>
                    <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="12" className="drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]" />
                  </svg>
                </div>
              </div>
          </div>
          <div className="row-span-5 grid grid-cols-12 gap-px bg-white/5">
             <div className="col-span-12 md:col-span-7 flex flex-col">
                <div className="flex-grow flex flex-col bg-black/60 glass-card p-6 overflow-hidden relative">
                  <div className="absolute inset-0 instrumentation-grid opacity-20 pointer-events-none" />
                  <pre className="text-[10px] font-mono text-slate-500 leading-relaxed custom-scroll overflow-y-auto">
                    <code>{JSON.stringify({ manifest: METADATA.NODE_ID, engine: settings }, null, 2)}</code>
                  </pre>
                </div>
             </div>
             <div className="col-span-12 md:col-span-5 bg-[#050505] p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "STRESS_LVL", value: settings.structuralLoad, unit: "kN", icon: Activity },
                  { label: "NODE_ARRAY", value: settings.threadConcurrency, unit: "thr", icon: Cpu }
                ].map(m => (
                  <div key={m.label} className="bg-[#080808] border border-white/5 p-6 flex flex-col gap-4 group hover:bg-white/[0.03] transition-all">
                    <div className="flex items-center justify-between">
                      <m.icon size={12} className="text-slate-700 group-hover:text-accent" />
                      <span className="scientific-label">{m.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl data-point group-hover:text-accent">{m.value}</span>
                      <span className="text-[10px] font-mono text-slate-800 uppercase">{m.unit}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('engine');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [settings, setSettings] = useState({
    latencyBuffer: 42,
    encryptionEntropy: 0.74,
    structuralLoad: 1.4,
    threadConcurrency: 128,
    thermalThreshold: 1250,
    eigenvalueParity: 32
  });

  const handleSelectPost = (post: any) => {
    setSelectedPost(post);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#010101] text-slate-400">
      <header className="h-16 px-10 flex items-center justify-between border-b border-white/5 bg-black/90 backdrop-blur-xl sticky top-0 z-[100]">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentView('engine')}>
            <div className="w-9 h-9 bg-accent flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_#00FF99]">O</div>
            <div className="flex flex-col">
              <span className="metallic-subtitle text-[12px] leading-none italic">OVD BUREAU</span>
              <span className="scientific-label !text-accent/50 !tracking-[0.2em]">{METADATA.VERSION}</span>
            </div>
          </div>
          <nav className="hidden xl:flex gap-10">
            <button onClick={() => setCurrentView('engine')} className={`scientific-label transition-colors ${currentView === 'engine' ? 'text-accent' : 'hover:text-white'}`}>DYNAMIC_SIM</button>
            <button onClick={() => setCurrentView('hub')} className={`scientific-label transition-colors ${currentView === 'hub' || currentView === 'article' ? 'text-accent' : 'hover:text-white'}`}>KNOWLEDGE_HUB</button>
            <button className="scientific-label hover:text-white transition-colors">LOGIC_MATRIX</button>
            <button className="scientific-label hover:text-white transition-colors">DOCS</button>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="scientific-label !text-slate-800">{METADATA.ENC_PROTOCOL}</span>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent animate-pulse shadow-[0_0_5px_#00FF99]" />
              <span className="scientific-label !text-accent">AUTHORITY_READY</span>
            </div>
          </div>
          <button className="w-9 h-9 glass-card flex items-center justify-center hover:bg-white/5 text-accent"><Award size={14} /></button>
        </div>
      </header>

      {currentView === 'engine' && <EngineSimulation settings={settings} setSettings={setSettings} />}
      {currentView === 'hub' && <KnowledgeHub onSelectPost={handleSelectPost} />}
      {currentView === 'article' && <ArticlePage post={selectedPost} onBack={() => setCurrentView('hub')} onSelectPost={handleSelectPost} />}

      <footer className="bg-[#050505] border-t border-white/5 p-24 flex flex-col gap-24">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="metallic-subtitle text-7xl md:text-[140px] leading-none italic opacity-80 uppercase">Precision Forensics</h2>
          <p className="text-2xl text-slate-500 font-light max-w-3xl mx-auto leading-relaxed italic">
            The global authority in structural silicate physics. Mission-critical analysis for elite engineering.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 max-w-7xl mx-auto w-full pt-20 border-t border-white/5">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent flex items-center justify-center text-black font-black">O</div>
              <span className="scientific-label !text-white !text-xs">OVD_BUREAU</span>
            </div>
            <p className="scientific-label !text-slate-800 leading-loose">Automated forensic engineering and deterministic material research unit. Certified ASTM E1300 validation node.</p>
          </div>
          {["Verification", "Infrastructure", "Resources"].map(t => (
            <div key={t} className="space-y-6">
              <h5 className="scientific-label !text-accent">{t}</h5>
              <ul className="space-y-3 scientific-label !text-slate-700">
                <li>NASA_S_VALIDATED</li>
                <li>ISO_9001_COMPLIANT</li>
                <li>QUANTUM_GCM_LOCK</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full border-t border-white/5 pt-10 text-[8px] font-mono text-slate-900 tracking-[0.5em] uppercase">
          <span>© 2024 OVD GLOBAL BUREAU. SUPREME v8.2.0</span>
          <div className="flex gap-10">
            <span>DATA_INTEGRITY_INDEX: 1.0</span>
            <span>SECURE_NODE_SYNC</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);

const PARAMETERS = [
  { key: "latencyBuffer", label: "Rotation Sync", min: 1, max: 100, unit: "rad/s", desc: "Kinematic velocity of the core stabilization rings." },
  { key: "encryptionEntropy", label: "Material Density", min: 0.1, max: 3.0, step: 0.01, unit: "ρ", desc: "Silicate substrate molecular density parity." },
  { key: "structuralLoad", label: "Structural Stress", min: 0, max: 10.0, step: 0.1, unit: "kN/m²", desc: "Lateral and vertical active load distribution." },
  { key: "threadConcurrency", label: "Logic Nodes", min: 1, max: 512, unit: "nodes", desc: "Failure prediction parallel execution threads." },
  { key: "thermalThreshold", label: "Thermal Flux", min: 100, max: 2500, unit: "K", desc: "Algorithmic stability boundary before fracture." },
  { key: "eigenvalueParity", label: "Buckling Delta", min: 0, max: 100, step: 1, unit: "Δ", desc: "Eigenvalue bifurcation parity for glass panels." }
];