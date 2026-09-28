import { StrictMode, useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Bot, BriefcaseBusiness, BrainCircuit, CalendarDays, ChartColumn, Check, CheckCircle2, Code2, Database, Download, ExternalLink, Eye, FileText, GraduationCap, Layers3, Lock, Mail, MapPin, Menu, MoveUpRight, Send, Sparkles, Star, Workflow, X } from "lucide-react";
import "./styles.css";
import "./reveal.css";

const baseUrl = import.meta.env.BASE_URL;

const navItems = ["home", "about", "experience", "projects", "skills", "publications", "contact"];
const projectCategories = [
  { id: "ml", label: "Data Science / Machine Learning", tab: "DS / ML", icon: BrainCircuit, color: "mint", blurb: "End-to-end ML systems, deep learning research, and distributed training — built to be measured, not just demoed." },
  { id: "agentic", label: "Agentic AI", tab: "Agentic AI", icon: Bot, color: "orange", blurb: "Multi-step agents that reason over live data, route decisions, and act in the real world — with a human in the loop." },
  { id: "genai", label: "Generative AI", tab: "Generative AI", icon: Sparkles, color: "purple", blurb: "LLM-powered apps that turn a prompt or a photo into an answer someone can use." },
  { id: "analysis", label: "Data Analysis", tab: "Data Analysis", icon: ChartColumn, color: "blue", blurb: "Asking sharp questions of real data — and answering them in SQL." },
];

// Each card links to its GitHub repo; `extra` adds a secondary link (paper, live demo).
const projects = [
  {
    category: "ml", featured: true, year: "2026", kind: "MLOps system",
    title: "Geomagnetic Storm Early-Warning System",
    overview: "An end-to-end MLOps system that forecasts Kp ≥ 5 geomagnetic storms three hours ahead — trained on NASA OMNI2 history and served live from NOAA real-time solar-wind feeds, with automated retraining and drift monitoring.",
    metrics: [{ value: "228K+", label: "hourly observations" }, { value: "3 hr", label: "advance warning" }, { value: "Live", label: "NOAA inference" }],
    tags: ["FastAPI", "MLflow", "DVC", "Docker", "AWS", "GitHub Actions", "Evidently"],
    link: "https://github.com/Aniruddhan15/Project-Machine_Learning_System",
  },
  {
    category: "ml", featured: true, kind: "Distributed training",
    title: "CompressIQ",
    overview: "A bandwidth-aware gradient compression system for heterogeneous distributed training. A CVXPY convex optimizer chooses error-feedback-aware, per-layer compression for ring all-reduce across a 12-worker, 3-tier cluster.",
    metrics: [{ value: "3.26×", label: "cumulative speedup" }, { value: "1.85×", label: "faster communication" }, { value: "90.71%", label: "test accuracy kept" }],
    tags: ["PyTorch", "CVXPY", "Convex Optimization", "Distributed Systems"],
    link: "mailto:aniruddhan26@gmail.com?subject=CompressIQ%20code",
  },
  {
    category: "ml", featured: true, year: "2025", kind: "Research · Quantum ML",
    title: "Hybrid Quantum–Classical Brain Tumor Detection",
    overview: "Pairs a ResNet-50 feature extractor with a quantum variational circuit for MRI tumor classification, benchmarked against CNN, VGG and ResNet-50 baselines. Published in Scientific Reports (Nature Portfolio).",
    metrics: [{ value: "Published", label: "Scientific Reports" }, { value: "4", label: "classical baselines" }],
    tags: ["PennyLane", "ResNet-50", "Quantum Circuits", "Transfer Learning"],
    link: "https://github.com/Aniruddhan15/Brain-Tumor-Detection-using-Hybrid-Deep-Learning-Quantum-Model",
    extra: { label: "Paper", href: "https://www.nature.com/articles/s41598-026-51263-x" },
  },
  {
    category: "ml", year: "2024", kind: "Computer vision",
    title: "Brain Tumor Detection — ResNet-50 with Attention",
    overview: "A fine-tuned ResNet-50 with an attention layer for tumor vs. non-tumor MRI classification, made robust with augmentation, class balancing, and threshold optimization.",
    metrics: [{ value: "99%", label: "AUC" }, { value: "+12%", label: "accuracy vs. VGG-19" }],
    tags: ["TensorFlow", "Keras", "OpenCV", "Scikit-learn"],
    link: "https://github.com/Aniruddhan15/Brain-Tumor-Detection-using-Renset-50-with-Attention-Layer",
  },
  {
    category: "ml", year: "2024", kind: "Regression · App",
    title: "Honey Price Prediction",
    overview: "An end-to-end regression project: exploratory analysis of a honey-purity dataset, a Decision Tree price model, and a Streamlit app that returns instant price estimates.",
    tags: ["Scikit-learn", "Pandas", "Seaborn", "Streamlit"],
    link: "https://github.com/Aniruddhan15/Honey_Price_Prediction_End2End",
  },
  {
    category: "agentic", featured: true, year: "2026", kind: "Multi-agent platform",
    title: "ALTA — Adaptive Logistics & Tracking Agent",
    overview: "A real-time agentic platform for pharmaceutical cold-chain monitoring. An 8-node LangGraph pipeline on GPT-4o scores risk, routes by shipment state, and proposes actions a human approves — with an autonomous rerouting sub-agent and compliance audit logs.",
    metrics: [{ value: "8-node", label: "LangGraph pipeline" }, { value: "900+", label: "cargo routes" }, { value: "HITL", label: "human approval" }],
    tags: ["LangGraph", "LangChain", "GPT-4o", "FastAPI", "React", "TypeScript"],
    link: "https://github.com/Aniruddhan15/Cargo-Monitoring",
    extra: { label: "Live demo", href: "https://alta-logistics-agent.netlify.app" },
  },
  {
    category: "agentic", featured: true, year: "2026", kind: "NLP + MCP agent",
    title: "MedAgent — Medical Document Intelligence",
    overview: "Turns any lab-report PDF into plain-language insights: OCR ingestion, BioBERT medical NER, a lab-value severity parser, Llama-3.3-70B simplification, and an MCP agent that sets calendar reminders, drafts emails, and posts Slack nudges.",
    metrics: [{ value: "87.01%", label: "NER F1 (BioBERT)" }, { value: "+6.6", label: "reading grades simpler" }, { value: "4/4", label: "MCP tools working" }],
    tags: ["BioBERT", "Llama-3.3-70B", "MCP", "FastAPI", "Tesseract OCR"],
    link: "https://github.com/Aniruddhan15/MedAgent-An-End-to-End-Medical-Document-Intelligence-System",
  },
  {
    category: "genai", year: "2024", kind: "Vision LLM app",
    title: "AI Nutrition Analyzer",
    overview: "Upload a photo of a meal and Gemini Pro Vision identifies the food, estimates macronutrients, and returns personalized dietary guidance — packaged as a Streamlit app.",
    tags: ["Gemini Pro Vision", "Streamlit", "Python"],
    link: "https://github.com/Aniruddhan15/NUTRITION_APP-USING-GEMINI-API",
  },
  {
    category: "genai", year: "2024", kind: "LLM assistant",
    title: "IPL Win Predictor Assistant",
    overview: "A Streamlit assistant that feeds match context — teams, venue, pitch conditions — to Gemini Pro and returns a reasoned win prediction with key match insights.",
    tags: ["Gemini Pro", "Prompt Engineering", "Streamlit"],
    link: "https://github.com/Aniruddhan15/AI-IPL-Win-Predictor-Assistant-WebApp",
  },
  {
    category: "analysis", year: "2024", kind: "SQL analysis",
    title: "IPL Data Analysis with SQL",
    overview: "SQL analyses over IPL match and ball-by-ball data — strike rates, partnerships, toss impact, boundary trends, and bowler performance — built with joins, aggregations, and CTEs.",
    metrics: [{ value: "18", label: "analytical queries" }, { value: "2", label: "joined datasets" }],
    tags: ["SQL", "CTEs", "Joins", "Aggregations"],
    link: "https://github.com/Aniruddhan15/SQL_IPL_DATA_ANALYSIS_PROJECT",
  },
];

const experience = [
  {
    role: "Data Science Intern",
    company: "KCF Technologies",
    period: "Jun 2026 – Aug 2026",
    location: "State College, PA · Hybrid",
    icon: BrainCircuit,
    featured: true,
    achievements: [
      "Large-Scale Industrial ML — Developed and evaluated reinforcement learning-based fault classification systems using PPO and DQN across 30M+ industrial vibration sensor records, spanning multiple asset types, monitoring points, and X/Y vibration axes.",
      "Fault Detection Performance — Improved unhealthy-class recall by 20–30% through model experimentation, class-sensitive evaluation, feature engineering, and preprocessing improvements, prioritizing reduction of critical missed equipment faults.",
      "Production-Oriented ML Pipeline — Built scalable preprocessing, experimentation, and inference workflows using PySpark and Databricks, including missing-data handling, asset-level processing, feature preparation, model inference, and experiment tracking with MLflow.",
      "Time-Series ML Reliability — Identified and addressed temporal data leakage, class imbalance, and evaluation risks caused by randomized splitting, full-dataset scaling, and preprocessing practices; introduced chronological evaluation and assessed models using precision, recall, F1-score, and confusion matrices."
    ],
    technologies: ["Python", "PySpark", "Databricks", "MLflow", "PPO", "DQN", "Reinforcement Learning", "Time Series", "Pandas", "Scikit-learn", "Git"]
  },
  {
    role: "Research Author & Contributor",
    company: "Vellore Institute of Technology (VIT), Chennai",
    period: "Dec 2024 – Jun 2025",
    location: "Chennai, India",
    icon: Sparkles,
    featured: false,
    achievements: [
      "Co-authored \"Enhanced Brain Tumour Prediction Using Quantum: A Hybrid Deep Learning Approach,\" published in Scientific Reports (2026).",
      "Co-authored \"Scalable Enhancement of Cloud-Based DDoS Detection with Adaptive ML Pipelines,\" available as a TechRxiv preprint."
    ],
    technologies: ["Scientific Reports", "TechRxiv", "Deep Learning", "Quantum", "Cloud Security", "Research"]
  },
  {
    role: "Trainee & Project Contributor",
    company: "Fincrux Technologies LLP",
    period: "May 2024 – Aug 2024",
    location: "Chennai, India",
    icon: Workflow,
    featured: false,
    achievements: [
      "Predictive Modeling — Developed predictive modeling pipelines for digital advertising data, applying statistical modeling, preprocessing, feature analysis, and model validation to support data-driven decision making.",
      "Measurable Model Improvement — Improved predictive accuracy by 7% through regularization, preprocessing improvements, and systematic data-validation techniques.",
      "Time-Series & Revenue Analysis — Analyzed time-series trends and advertising performance data to uncover revenue-impacting patterns and provide insights supporting campaign and audience-targeting decisions.",
      "Data-to-Decision Workflow — Transformed raw advertising data into actionable analytical insights by combining exploratory analysis, predictive modeling, model evaluation, and communication of findings to project stakeholders."
    ],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Statistical Modeling", "Time-Series Analysis", "Data Visualization", "Predictive Modeling"]
  },
  {
    role: "SharePoint Developer Intern",
    company: "MUFG Global Services",
    period: "Nov 2023 – Dec 2023",
    location: "Bengaluru, India",
    icon: Layers3,
    featured: false,
    achievements: [
      "Enterprise Application Development — Developed an organization-wide leave management application using Microsoft Viva and SharePoint Framework, integrating the workflow with Microsoft Teams and Office 365.",
      "Workflow Automation — Automated employee leave approval workflows using Power Automate, enabling automated notifications and reducing manual follow-ups by 60%.",
      "Operational Impact — Improved request-handling efficiency by 40% by replacing manual coordination with structured approval workflows and centralized request processing.",
      "Production Delivery — Contributed to an enterprise application deployed for organizational use, gaining experience with production deployment, business requirements, workflow design, collaboration, and Agile delivery practices."
    ],
    technologies: ["Microsoft Viva", "SharePoint Framework", "Power Automate", "Microsoft Teams", "Office 365", "Workflow Automation", "Agile"]
  }
];

const skillGroups = [
  { label: "Programming & Databases", icon: Code2, items: ["Python", "SQL", "R", "C++", "PostgreSQL", "Microsoft SQL Server"] },
  { label: "Machine Learning & AI", icon: BrainCircuit, items: ["Scikit-learn", "PyTorch", "TensorFlow", "Keras", "Deep Learning", "NLP", "Time Series", "Statistical Modeling", "Model Optimization"] },
  { label: "GenAI & Agentic AI", icon: Sparkles, items: ["LangChain", "LlamaIndex", "RAG", "Agentic AI"] },
  { label: "Data & MLOps", icon: Database, items: ["Pandas", "NumPy", "PySpark", "Databricks", "MLflow", "DVC", "FastAPI", "Docker", "Git", "GitHub Actions", "CI/CD"] },
  { label: "Cloud & Deployment", icon: Workflow, items: ["AWS", "Azure", "Vertex AI", "Flask", "Streamlit", "Gradio"] },
];

const mastersCoursework = [
  { label: "Fall 2026", courses: ["MSML 641 — Machine Learning", "MSML 643 — Time Series", "MSAI 633 — Agentic AI"] },
  { label: "Spring 2026", courses: ["MSML 604 — Introduction to Optimization", "MSML 605 — Computing Systems for Machine Learning", "MSML 606 — Algorithms and Data Structures for Machine Learning"] },
  { label: "Fall 2025", courses: ["MSML 603 — Principles of Machine Learning", "MSML 602 — Principles of Data Science", "MSML 601 — Probability and Statistics"] },
];

const publications = [
  { title: "Enhanced Brain Tumour Prediction Using Quantum: A Hybrid Deep Learning Approach", status: "Published", description: "Peer-reviewed — Scientific Reports (Nature Portfolio) — ResNet + PennyLane quantum circuit hybrid", link: "https://www.nature.com/articles/s41598-026-51263-x" },
  { title: "Scalable Enhancement of Cloud-Based DDoS Detection with Adaptive ML Pipelines", status: "Preprint", description: "Preprint — TechRxiv", link: "https://doi.org/10.36227/techrxiv.175037203.37181551/v1" },
  { title: "Hybrid SARIMA-LSTM Model for Energy Demand Forecasting", status: "Under review", description: "Submitted — Scientific Reports (Nature Portfolio)" },
  { title: "Pancreatic Cancer Detection — Deep Learning Approach", status: "Under review", description: "Submitted manuscript" },
  { title: "Obesity Risk Classification via Ensemble Modeling", status: "Under review", description: "Submitted manuscript" },
];

// Role-tailored resumes shown in the resume picker. Add Data Engineer / AI Engineer entries here.
const resumes = [
  {
    id: "data-science",
    role: "Data Science",
    title: "Data Science Resume",
    tagline: "Evidence-first modeling — experimentation, statistics, and time series that drive decisions.",
    highlights: [
      { value: "30M+", text: "sensor records modeled at KCF, with a 20–30% lift in unhealthy-class recall" },
      { value: "4", text: "ML research works, one published in Scientific Reports" },
      { value: "228K+", text: "NASA observations behind a 3-hour-ahead storm early-warning system" },
    ],
    focus: ["Statistical Modeling", "Time Series", "PySpark", "SQL", "MLflow"],
    file: "resumes/Aniruddhan_Narasimhan_Data_Science_Resume.pdf",
    preview: "resumes/data-science-preview.webp",
    size: "301 KB",
    updated: "Sep 2026",
    color: "mint",
  },
  {
    id: "ml-engineer",
    role: "ML Engineering",
    title: "ML Engineer Resume",
    tagline: "From model to production — distributed training, agentic systems, and MLOps.",
    highlights: [
      { value: "3.26×", text: "cumulative training speedup from CompressIQ at 90.71% test accuracy" },
      { value: "8-node", text: "LangGraph agent (ALTA) rerouting 900+ cold-chain cargo routes" },
      { value: "CI/CD", text: "FastAPI, DVC, Docker, and drift monitoring on AWS for live inference" },
    ],
    focus: ["PyTorch", "Distributed Training", "LangGraph", "FastAPI", "Docker"],
    file: "resumes/Aniruddhan_Narasimhan_ML_Engineer_Resume.pdf",
    preview: "resumes/ml-engineer-preview.webp",
    size: "481 KB",
    updated: "Sep 2026",
    color: "orange",
  },
];

const statusClass = { "Published": "status-published", "Preprint": "status-preprint", "Under review": "status-review" };
const countWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const marqueeWords = ["RESEARCH-LED", "IMPACT-FOCUSED", "ALWAYS LEARNING"];
const highlightPattern = /(30M\+|20–30%|7%|60%|40%)/g;
const rippleSelector = ".button, .project-tabs button, .main-nav a, .nav-resume, .contact-links button, .resume-thumb, .modal-close, .contact-links a, .menu-toggle, .inline-link, .project-card";

// Plays the fade-out before actually unmounting a dialog.
function useAnimatedClose(onClosed) {
  const [closing, setClosing] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const close = useCallback(() => {
    setClosing(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onClosed();
      setClosing(false);
    }, 260);
  }, [onClosed]);
  return [closing, close];
}

// Scroll lock, Escape to close, focus trap, and focus restore for an open dialog.
function useDialog(isOpen, dialogRef, onClose) {
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.classList.add("modal-open");
    const opener = document.activeElement;
    dialogRef.current?.querySelector(".modal-close")?.focus({ preventScroll: true });
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll("button, a[href]");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
      opener?.focus?.({ preventScroll: true });
    };
  }, [isOpen, dialogRef, onClose]);
}

function GithubMark({ size = 16 }) {
  return <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>;
}

function ProjectCard({ project, category, index }) {
  const Icon = category.icon;
  const isRepo = project.link.startsWith("http");
  return <article className={`project-card reveal reveal-delay-${Math.min(index + 1, 4)}`}>
    <div className="project-card-top">
      <span className="project-icon"><Icon size={17} /></span>
      <span className="project-kind">{project.kind}</span>
      <span className="project-flags">
        {project.featured && <span className="project-badge"><Star size={10} /> Featured</span>}
        {project.year && <span className="project-year">{project.year}</span>}
      </span>
    </div>
    <h3><a className="project-link" href={project.link} target={isRepo ? "_blank" : undefined} rel="noreferrer">{project.title}</a></h3>
    <p className="project-overview">{project.overview}</p>
    {project.metrics && <dl className="project-metrics">{project.metrics.map((metric, metricIndex) => <div key={metric.label} style={{ "--j": metricIndex }}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>)}</dl>}
    <div className="tag-row">{project.tags.map((tag, tagIndex) => <span key={tag} style={{ "--i": tagIndex }}>{tag}</span>)}</div>
    <div className="project-footer">
      <span className="project-cta">{isRepo ? <><GithubMark /> View on GitHub</> : <><Lock size={14} /> Code on request</>}<ArrowUpRight size={16} className="cta-arrow" /></span>
      {project.extra && <a className="project-extra" href={project.extra.href} target="_blank" rel="noreferrer">{project.extra.label} <ExternalLink size={12} /></a>}
    </div>
  </article>;
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("all");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [downloadedResume, setDownloadedResume] = useState(null);
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const tabsRef = useRef(null);
  const projectListRef = useRef(null);
  const resumeModalRef = useRef(null);
  const downloadTimer = useRef(0);
  const projectTabs = [{ id: "all", tab: "All projects", color: "mint" }, ...projectCategories].map((tab) => ({ ...tab, count: tab.id === "all" ? projects.length : projects.filter((project) => project.category === tab.id).length }));
  const visibleCategories = projectFilter === "all" ? projectCategories : projectCategories.filter((category) => category.id === projectFilter);

  // Visibility lives in a data attribute so React re-rendering className can't wipe it,
  // and the effect re-runs on filter changes so newly mounted cards get observed.
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.visible = "true";
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.01 });
    document.querySelectorAll(".reveal:not([data-visible])").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [projectFilter]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty("transform", `scaleX(${max > 0 ? window.scrollY / max : 0})`);
      if (headerRef.current) headerRef.current.dataset.scrolled = String(window.scrollY > 24);
      // Active nav item: the last section whose top has passed 35% of the viewport.
      // (Tall sections never reach an IntersectionObserver ratio threshold, so measure directly.)
      const atBottom = window.scrollY >= max - 2;
      const current = atBottom ? navItems[navItems.length - 1] : navItems.filter((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * 0.35).pop();
      setActiveSection(current ?? "home");
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onPointerDown = (event) => {
      const target = event.target.closest(rippleSelector);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${event.clientX - rect.left - size / 2}px;top:${event.clientY - rect.top - size / 2}px`;
      target.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  // Slide the tab highlight under the active project filter.
  useEffect(() => {
    const update = () => {
      const list = tabsRef.current;
      const active = list?.querySelector('[aria-pressed="true"]');
      if (!active) return;
      list.style.setProperty("--tab-x", `${active.offsetLeft}px`);
      list.style.setProperty("--tab-w", `${active.offsetWidth}px`);
      active.scrollIntoView({ block: "nearest", inline: "nearest" });
    };
    update();
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [projectFilter]);

  const selectProjectFilter = (id) => {
    setProjectFilter(id);
    // If the list has scrolled under the sticky tabs, bring its start back into view.
    const top = projectListRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 150) window.scrollTo({ top: window.scrollY + top - 150, behavior: "smooth" });
  };

  const hideResume = useCallback(() => setResumeOpen(false), []);
  const [resumeClosing, closeResume] = useAnimatedClose(hideResume);
  useDialog(resumeOpen, resumeModalRef, closeResume);
  useEffect(() => () => clearTimeout(downloadTimer.current), []);

  const openResume = () => { setMenuOpen(false); setResumeOpen(true); };
  const markDownloaded = (id) => {
    setDownloadedResume(id);
    clearTimeout(downloadTimer.current);
    downloadTimer.current = setTimeout(() => setDownloadedResume(null), 2600);
  };

  const jumpTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return <div className="site-shell">
    <header className="site-header" ref={headerRef}>
      <a className="brand" href="#home" onClick={() => jumpTo("home")}><span>AN</span><small>ML / DS</small></a>
      <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
        <span className="menu-icon" key={menuOpen ? "close" : "open"}>{menuOpen ? <X /> : <Menu />}</span>
      </button>
      <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item, index) => <a className={activeSection === item ? "active" : ""} href={`#${item}`} key={item} style={{ "--i": index }} onClick={() => jumpTo(item)}>{item === "home" ? "Home" : item}</a>)}
        <button className="nav-resume" type="button" onClick={openResume} aria-haspopup="dialog" style={{ "--i": navItems.length }}><Download size={15} /> Resume</button>
      </nav>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
    </header>

    <main>
      <section className="hero-section section-pad" id="home">
        <div className="hero-grid">
          <div className="hero-content reveal reveal-one">
            <p className="kicker"><span className="live-dot" /> Applied ML / Data Science / AI</p>
            <h1>Turning messy data into <span>useful intelligence.</span></h1>
            <p className="hero-lede">I’m Aniruddhan Narasimhan, an Applied Machine Learning graduate student building models, pipelines, and products that hold up in the real world.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects" onClick={() => jumpTo("projects")}>Explore my work <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="mailto:aniruddhan26@gmail.com">Let’s connect <Mail size={16} /></a>
            </div>
            <div className="availability-status"><span className="status-pulse" /><span>Open to Full-Time 2027 Opportunities</span></div>
            <p className="availability-tags">Data Science • ML Engineering • AI Engineering • Data Analytics • Data Engineering</p>
            <div className="hero-meta"><span><MapPin size={14} /> College Park, Maryland</span><span><CheckCircle2 size={14} /> Open to opportunities</span></div>
          </div>
          <div className="hero-visual reveal reveal-two">
            <div className="visual-grid" />
            <div className="visual-ring ring-one" />
            <div className="visual-ring ring-two" />
            <div className="profile-frame"><img src={`${baseUrl}profile.png`} alt="Aniruddhan Narasimhan" /></div>
            <div className="orbit-card card-top"><span>Model → impact</span><strong>30M+</strong><small>sensor records</small></div>
          </div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about"><span>Scroll to explore</span><ArrowDown size={16} /></a>
      </section>

      <section className="marquee-band" aria-label="Research-led, impact-focused, always learning">
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => <div className="marquee-group" key={copy}>
            {[0, 1, 2, 3].flatMap((repeat) => marqueeWords.map((word) => <span className="marquee-item" key={`${repeat}-${word}`}><span>{word}</span><i>✳</i></span>))}
          </div>)}
        </div>
      </section>

      <section className="section-pad about-section" id="about">
        <div className="section-intro reveal"><p className="eyebrow">01 / About</p><h2>Curious about the <em>why</em> behind the model.</h2></div>
        <div className="about-layout">
          <div className="about-copy reveal">
            <p className="large-copy">I work at the intersection of applied machine learning, data systems, and human decisions.</p>
            <p>Currently pursuing an M.S. in Applied Machine Learning at the University of Maryland, I enjoy taking a problem from raw data to a tested model to a tool someone can actually use.</p>
            <p>My experience spans industrial health, medical imaging, advertising analytics, GenAI, and cloud deployment. I’m drawn to hard problems with measurable stakes and teams that care about doing the work properly.</p>
            <a className="inline-link" href="mailto:aniruddhan26@gmail.com">Start a conversation <MoveUpRight size={16} /></a>
          </div>
          <div className="education-card reveal reveal-delay-2">
            <div className="card-icon"><GraduationCap size={22} /></div>
            <p className="eyebrow">Education</p>
            <h3>M.S. Applied Machine Learning</h3>
            <strong>University of Maryland — College Park</strong>
            <div className="education-details"><span>Aug 2025 — May 2027</span><span>GPA 3.7 / 4.0</span></div>
            <div className="coursework-tree" aria-label="Master's coursework hierarchy">
              <div className="coursework-root">Coursework</div>
              <div className="coursework-branches">
                {mastersCoursework.map((semester, index) => <div className="coursework-branch" key={semester.label} style={{ animationDelay: `${0.18 + index * 0.18}s` }}>
                  <div className="semester-node">{semester.label}</div>
                  <div className="semester-courses">{semester.courses.map((course, courseIndex) => <span className="course-item" key={course} style={{ animationDelay: `${0.36 + index * 0.18 + courseIndex * 0.12}s` }}>{course}</span>)}</div>
                </div>)}
              </div>
            </div>
            <div className="education-divider" />
            <h3 className="smaller-title">B.Tech. Computer Science & Engineering</h3>
            <strong>VIT, Chennai · AI & Robotics</strong>
            <div className="education-details"><span>2021 — May 2025</span><span>GPA 3.6 / 4.0</span></div>
          </div>
        </div>
      </section>

      <section className="section-pad experience-section" id="experience">
        <div className="section-intro split-intro reveal"><div><p className="eyebrow">02 / Experience</p><h2>Where the work<br /><em>gets real.</em></h2></div><p>From industrial sensor data to enterprise workflows, each chapter has taught me to make models more honest, useful, and resilient.</p></div>
        <div className="experience-list">
          {experience.map((item, index) => {
            const Icon = item.icon;
            return <article className={`experience-card reveal reveal-delay-${Math.min(index + 1, 4)} ${item.featured ? "featured" : ""}`} key={`${item.company}-${item.role}`}>
              <div className="experience-header">
                <div className="experience-company-block"><div className="experience-icon"><Icon size={18} /></div><div><p className="eyebrow">{item.company}</p><h3>{item.role}</h3></div></div>
                <div className="experience-meta"><span className="experience-date"><CalendarDays size={13} /> {item.period}</span><span className="experience-location"><MapPin size={13} /> {item.location}</span></div>
              </div>
              <ul className="experience-points">{item.achievements.map((achievement, pointIndex) => <li key={achievement} style={{ "--i": pointIndex }}>{achievement.split(highlightPattern).map((part, partIndex) => partIndex % 2 ? <strong key={partIndex}>{part}</strong> : <span key={partIndex}>{part}</span>)}</li>)}</ul>
              <div className="experience-tech">{item.technologies.map((tech, techIndex) => <span key={tech} style={{ "--i": techIndex }}>{tech}</span>)}</div>
            </article>;
          })}
        </div>
      </section>

      <section className="section-pad projects-section" id="projects">
        <div className="section-intro split-intro reveal"><div><p className="eyebrow">03 / Selected work</p><h2>Built to answer<br /><em>better questions.</em></h2></div><p>{countWords[projects.length] ?? projects.length} projects across {countWords[projectCategories.length]?.toLowerCase() ?? projectCategories.length} tracks. Every card opens its code on GitHub.</p></div>
        <div className="project-tabs-wrap reveal">
          <div className="project-tabs" ref={tabsRef} data-color={projectTabs.find((tab) => tab.id === projectFilter)?.color} aria-label="Filter projects by track">
            <span className="tab-indicator" aria-hidden="true" />
            {projectTabs.map((tab) => <button type="button" key={tab.id} aria-pressed={projectFilter === tab.id} onClick={() => selectProjectFilter(tab.id)}>{tab.tab}<span className="tab-count">{tab.count}</span></button>)}
          </div>
        </div>
        <div className="project-groups" ref={projectListRef} key={projectFilter}>
          {visibleCategories.map((category) => {
            const items = projects.filter((project) => project.category === category.id);
            const number = String(projectCategories.indexOf(category) + 1).padStart(2, "0");
            return <section className={`project-group accent-${category.color}`} key={category.id} aria-labelledby={`group-${category.id}`}>
              <header className="project-group-head reveal">
                <span className="group-index">{number}</span>
                <div><h3 id={`group-${category.id}`}>{category.label}</h3><p>{category.blurb}</p></div>
                <span className="group-count">{items.length} {items.length === 1 ? "project" : "projects"}</span>
              </header>
              <div className="project-grid">{items.map((project, index) => <ProjectCard project={project} category={category} index={index} key={`${projectFilter}-${project.title}`} />)}</div>
            </section>;
          })}
        </div>
      </section>

      <section className="section-pad skills-section" id="skills">
        <div className="section-intro reveal"><p className="eyebrow">04 / Toolkit</p><h2>The stack is a means.<br /><em>The thinking is the craft.</em></h2></div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return <article className={`skill-group reveal reveal-delay-${Math.min(index + 1, 4)}`} key={group.label}>
              <div className="skill-title"><Icon size={19} /><h3>{group.label}</h3></div>
              <div className="skill-list">{group.items.map((item, itemIndex) => <span key={item} style={{ "--i": itemIndex }}>{item}</span>)}</div>
            </article>;
          })}
        </div>
      </section>

      <section className="section-pad proof-section" id="proof">
        <div className="proof-panel reveal">
          <div><p className="eyebrow">05 / Research notes</p><h2>{countWords[publications.length] ?? publications.length} research works.<br /><em>One through-line.</em></h2></div>
          <div className="proof-copy"><p>Medical imaging, quantum-driven feature extraction, ensemble learning, forecasting, and cloud security all point to the same belief: rigor makes useful intelligence possible.</p><a className="inline-link" href="mailto:aniruddhan26@gmail.com?subject=Research%20collaboration">Discuss research <MoveUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="section-pad publications-section" id="publications">
        <div className="section-intro reveal"><p className="eyebrow">06 / Publications</p><h2>Publications <em>& preprints.</em></h2></div>
        <div className="publication-list">
          {publications.map((publication, index) => <article className={`publication-item reveal reveal-delay-${Math.min(index + 1, 4)}`} key={publication.title}>
            <div className="publication-copy"><h3>{publication.link ? <a href={publication.link} target="_blank" rel="noreferrer">{publication.title} <ArrowUpRight size={18} /></a> : publication.title}</h3><p>{publication.description}</p></div>
            <span className={`publication-status ${statusClass[publication.status]}`}>{publication.status}{publication.link && <ExternalLink size={14} />}</span>
          </article>)}
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-inner reveal">
          <p className="eyebrow">07 / Contact</p>
          <h2>Have a hard problem?<br /><em>Let’s make it legible.</em></h2>
          <p>I’m always open to thoughtful conversations about machine learning, research, and building tools with real-world value.</p>
          <a className="button button-primary" href="mailto:aniruddhan26@gmail.com">aniruddhan26@gmail.com <Send size={16} /></a>
          <div className="contact-links"><a href="https://github.com/Aniruddhan15" target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub</a><a href="https://www.linkedin.com/in/aniruddhan-narasimhan-15688021b/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /> LinkedIn</a><button type="button" onClick={openResume} aria-haspopup="dialog"><FileText size={16} /> Resume</button></div>
        </div>
      </section>
    </main>

    <footer className="site-footer reveal"><span>© {new Date().getFullYear()} Aniruddhan Narasimhan</span><span>Built with curiosity · <a href="#home" onClick={() => jumpTo("home")}>Back to top ↑</a></span></footer>
    {resumeOpen && <div className={`modal-backdrop ${resumeClosing ? "is-closing" : ""}`} role="presentation" onClick={closeResume}>
      <div className="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-title" ref={resumeModalRef} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={closeResume} aria-label="Close resume picker"><X size={20} /></button>
        <div className="resume-modal-head">
          <p className="eyebrow">Resume · Full-Time 2027</p>
          <h2 id="resume-title">Pick the version <em>that fits the role.</em></h2>
          <p>Same experience, different emphasis. Each resume is tailored to what that role cares about most.</p>
        </div>
        <div className="resume-grid">
          {resumes.map((resume, index) => <article className={`resume-option ${resume.color}`} key={resume.id} style={{ "--i": index }}>
            <a className="resume-thumb" href={`${baseUrl}${resume.file}`} target="_blank" rel="noreferrer" aria-label={`Open the full ${resume.title} in a new tab`}>
              <img src={`${baseUrl}${resume.preview}`} alt="" />
              <span className="resume-thumb-hint"><Eye size={15} /> Preview full page</span>
            </a>
            <div className="resume-body">
              <p className="resume-kicker">0{index + 1} · {resume.role}</p>
              <h3>{resume.title}</h3>
              <p className="resume-tagline">{resume.tagline}</p>
              <ul className="resume-highlights">{resume.highlights.map((highlight, highlightIndex) => <li key={highlight.value} style={{ "--j": highlightIndex }}><strong>{highlight.value}</strong><span>{highlight.text}</span></li>)}</ul>
              <div className="tag-row">{resume.focus.map((skill, skillIndex) => <span key={skill} style={{ "--i": skillIndex }}>{skill}</span>)}</div>
              <div className="resume-meta"><span><FileText size={13} /> PDF · 1 page · {resume.size}</span><span>Updated {resume.updated}</span></div>
              <div className="resume-actions">
                <a className={`button button-primary resume-download ${downloadedResume === resume.id ? "is-done" : ""}`} href={`${baseUrl}${resume.file}`} download={resume.file.split("/").pop()} onClick={() => markDownloaded(resume.id)}>
                  {downloadedResume === resume.id ? <span className="download-label" key="done">Downloaded <Check size={16} /></span> : <span className="download-label" key="idle">Download PDF <Download size={16} /></span>}
                </a>
                <a className="button button-quiet" href={`${baseUrl}${resume.file}`} target="_blank" rel="noreferrer">View <ExternalLink size={15} /></a>
              </div>
            </div>
          </article>)}
        </div>
      </div>
    </div>}
  </div>;
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
