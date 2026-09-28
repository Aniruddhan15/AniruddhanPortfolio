import { StrictMode, useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, BrainCircuit, CalendarDays, CheckCircle2, Code2, Database, Download, ExternalLink, GraduationCap, Layers3, Mail, MapPin, Menu, MoveUpRight, Send, Sparkles, Workflow, X } from "lucide-react";
import "./styles.css";
import "./reveal.css";

const baseUrl = import.meta.env.BASE_URL;

const navItems = ["home", "about", "experience", "projects", "skills", "publications", "contact"];
const projects = [
  { title: "AI-Powered Nutrition Analyzer", category: "GenAI", year: "2025", summary: "A deployed nutrition companion that reads meals from images, estimates macros, and turns a single upload into practical recommendations.", detail: "Built with Gemini Vision Pro, Python, Git, and Streamlit Community Cloud. The product combines meal recognition, macro-nutrient estimation, personalized recommendations, and dietary tracking in one focused workflow.", tags: ["Gemini Vision", "Python", "Streamlit"], link: "https://github.com/Aniruddhan15/NUTRITION_APP-USING-GEMINI-API", linkLabel: "View on GitHub", color: "orange" },
  { title: "Brain Tumor Detection with ResNet-50", category: "Computer vision", year: "2025", summary: "An MRI classification pipeline tuned for robust tumor versus non-tumor prediction, with 99% AUC and a 12% accuracy lift over VGG-19.", detail: "The work combined transfer learning, augmentation, class balancing, preprocessing, and threshold optimization with TensorFlow, Keras, Scikit-learn, and OpenCV.", tags: ["ResNet-50", "TensorFlow", "OpenCV"], link: "https://github.com/Aniruddhan15/Brain_Tumour_Prediction_Resnet_50", linkLabel: "View on GitHub", color: "mint" },
  { title: "DDoS Detection with Adaptive ML Pipelines", category: "Research", year: "2025", summary: "Scalable cloud-oriented machine learning pipelines for adaptive DDoS detection and more responsive security operations.", detail: "A research contribution focused on scalable deployment techniques, adaptive model workflows, and cloud security. The work is available as a TechRxiv preprint.", tags: ["MLOps", "AWS", "Docker"], link: "https://doi.org/10.36227/techrxiv.175037203.37181551/v1", linkLabel: "Read the preprint", color: "blue" },
  { title: "Advertising Performance Modeling", category: "Applied ML", year: "2024", summary: "Predictive modeling and time-series analysis for digital advertising data, improving predictive accuracy by 7%.", detail: "At Fincrux Technologies, I used Python, statistical modeling, preprocessing, and data validation to identify revenue-impacting patterns for campaign and targeting decisions. This was client work, so the code isn’t public — happy to walk through it.", tags: ["Python", "Statistics", "Time series"], link: "mailto:aniruddhan26@gmail.com?subject=Advertising%20Modeling", linkLabel: "Ask me about it", color: "purple" },
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

const statusClass = { "Published": "status-published", "Preprint": "status-preprint", "Under review": "status-review" };
const countWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const marqueeWords = ["RESEARCH-LED", "IMPACT-FOCUSED", "ALWAYS LEARNING"];
const highlightPattern = /(30M\+|20–30%|7%|60%|40%)/g;
const rippleSelector = ".button, .filter-row button, .main-nav a, .project-open, .modal-close, .contact-links a, .menu-toggle, .inline-link, .project-card";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalClosing, setModalClosing] = useState(false);
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const modalRef = useRef(null);
  const closeTimer = useRef(0);
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  // Filtering only helps once some category holds more than one project.
  const showFilter = categories.slice(1).some((category) => projects.filter((project) => project.category === category).length > 1);

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

  const closeProject = useCallback(() => {
    setModalClosing(true);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setSelectedProject(null);
      setModalClosing(false);
    }, 260);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(selectedProject));
    if (!selectedProject) return undefined;
    const opener = document.activeElement;
    modalRef.current?.querySelector(".modal-close")?.focus({ preventScroll: true });
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeProject();
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll("button, a[href]");
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
  }, [selectedProject, closeProject]);

  const jumpTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const visibleProjects = projectFilter === "All" ? projects : projects.filter((project) => project.category === projectFilter);

  return <div className="site-shell">
    <header className="site-header" ref={headerRef}>
      <a className="brand" href="#home" onClick={() => jumpTo("home")}><span>AN</span><small>ML / DS</small></a>
      <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
        <span className="menu-icon" key={menuOpen ? "close" : "open"}>{menuOpen ? <X /> : <Menu />}</span>
      </button>
      <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item, index) => <a className={activeSection === item ? "active" : ""} href={`#${item}`} key={item} style={{ "--i": index }} onClick={() => jumpTo(item)}>{item === "home" ? "Home" : item}</a>)}
        <a className="nav-resume" href={`${baseUrl}resume.pdf`} target="_blank" rel="noreferrer" style={{ "--i": navItems.length }}><Download size={15} /> Resume</a>
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
        <div className="section-intro split-intro reveal"><div><p className="eyebrow">03 / Selected work</p><h2>Built to answer<br /><em>better questions.</em></h2></div><p>Explore a selection of projects across computer vision, GenAI, applied modeling, and ML research.</p></div>
        {showFilter && <div className="filter-row reveal">{categories.map((category) => <button className={projectFilter === category ? "filter-active" : ""} key={category} onClick={() => setProjectFilter(category)}>{category}</button>)}</div>}
        <div className="project-grid">
          {visibleProjects.map((project, index) => <article className={`project-card ${project.color} reveal reveal-delay-${Math.min(index + 1, 4)}`} key={`${projectFilter}-${project.title}`} onClick={() => setSelectedProject(project)}>
            <div className="project-card-top"><span>{project.category}</span><span>{project.year}</span></div>
            <div className="project-art"><div className="art-lines" /><div className="art-core">{project.category === "GenAI" ? <Sparkles /> : project.category === "Computer vision" ? <BrainCircuit /> : project.category === "Research" ? <Database /> : <Workflow />}</div></div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="tag-row">{project.tags.map((tag, tagIndex) => <span key={tag} style={{ "--i": tagIndex }}>{tag}</span>)}</div>
            <button className="project-open" aria-label={`View ${project.title}`}><ArrowUpRight size={18} /></button>
          </article>)}
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
          <div className="contact-links"><a href="https://github.com/Aniruddhan15" target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub</a><a href="https://www.linkedin.com/in/aniruddhan-narasimhan-15688021b/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /> LinkedIn</a></div>
        </div>
      </section>
    </main>

    <footer className="site-footer reveal"><span>© {new Date().getFullYear()} Aniruddhan Narasimhan</span><span>Built with curiosity · <a href="#home" onClick={() => jumpTo("home")}>Back to top ↑</a></span></footer>
    {selectedProject && <div className={`modal-backdrop ${modalClosing ? "is-closing" : ""}`} role="presentation" onClick={closeProject}>
      <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" ref={modalRef} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={closeProject} aria-label="Close project details"><X size={20} /></button>
        <p className="eyebrow">{selectedProject.category} · {selectedProject.year}</p>
        <h2 id="project-title">{selectedProject.title}</h2>
        <p>{selectedProject.detail}</p>
        <div className="tag-row">{selectedProject.tags.map((tag, tagIndex) => <span key={tag} style={{ "--i": tagIndex }}>{tag}</span>)}</div>
        <a className="button button-primary" href={selectedProject.link} target={selectedProject.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{selectedProject.linkLabel} {selectedProject.link.startsWith("mailto:") ? <Mail size={16} /> : <ExternalLink size={16} />}</a>
      </div>
    </div>}
  </div>;
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
