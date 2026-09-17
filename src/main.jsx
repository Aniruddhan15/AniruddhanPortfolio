import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, BrainCircuit, CalendarDays, CheckCircle2, Code2, Database, Download, ExternalLink, GraduationCap, Layers3, Mail, MapPin, Menu, MoveUpRight, Send, Sparkles, Workflow, X } from "lucide-react";
import "./styles.css";
import "./reveal.css";

const baseUrl = import.meta.env.BASE_URL;

const navItems = ["home", "about", "experience", "projects", "skills", "publications", "contact"];
const projects = [
  { title: "AI-Powered Nutrition Analyzer", category: "GenAI", year: "2025", summary: "A deployed nutrition companion that reads meals from images, estimates macros, and turns a single upload into practical recommendations.", detail: "Built with Gemini Vision Pro, Python, Git, and Streamlit Community Cloud. The product combines meal recognition, macro-nutrient estimation, personalized recommendations, and dietary tracking in one focused workflow.", tags: ["Gemini Vision", "Python", "Streamlit"], link: "https://github.com/Aniruddhan15/NUTRITION_APP-USING-GEMINI-API", color: "orange" },
  { title: "Brain Tumor Detection with ResNet-50", category: "Computer vision", year: "2025", summary: "An MRI classification pipeline tuned for robust tumor versus non-tumor prediction, with 99% AUC and a 12% accuracy lift over VGG-19.", detail: "The work combined transfer learning, augmentation, class balancing, preprocessing, and threshold optimization with TensorFlow, Keras, Scikit-learn, and OpenCV.", tags: ["ResNet-50", "TensorFlow", "OpenCV"], link: "mailto:aniruddhan26@gmail.com?subject=Brain%20Tumor%20Detection", color: "mint" },
  { title: "DDoS Detection with Adaptive ML Pipelines", category: "Research", year: "2025", summary: "Scalable cloud-oriented machine learning pipelines for adaptive DDoS detection and more responsive security operations.", detail: "A research contribution focused on scalable deployment techniques, adaptive model workflows, and cloud security. The work is available on TechRxiv.", tags: ["MLOps", "AWS", "Docker"], link: "mailto:aniruddhan26@gmail.com?subject=DDoS%20Detection%20Research", color: "blue" },
  { title: "Advertising Performance Modeling", category: "Applied ML", year: "2024", summary: "Predictive modeling and time-series analysis for digital advertising data, improving predictive accuracy by 7%.", detail: "At Fincrux Technologies, I used Python, statistical modeling, preprocessing, and data validation to identify revenue-impacting patterns for campaign and targeting decisions.", tags: ["Python", "Statistics", "Time series"], link: "mailto:aniruddhan26@gmail.com?subject=Advertising%20Modeling", color: "purple" },
];

const experience = [
  {
    role: "Machine Learning Intern",
    company: "KCF Technologies",
    period: "Jun 2026 – Aug 2026",
    location: "United States",
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
    role: "ASO Intern",
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
  { label: "Languages", icon: Code2, items: ["Python", "SQL", "R", "C++"] },
  { label: "Machine learning", icon: BrainCircuit, items: ["Scikit-learn", "PyTorch", "TensorFlow", "Keras", "Pandas", "NumPy", "Deep learning", "Time series"] },
  { label: "GenAI & data", icon: Database, items: ["LangChain", "LlamaIndex", "RAG", "PySpark", "Databricks", "MLflow", "DVC"] },
  { label: "Cloud & delivery", icon: Workflow, items: ["AWS", "Azure", "Vertex AI", "FastAPI", "Docker", "GitHub Actions", "CI/CD", "Streamlit", "Gradio"] },
];

const mastersCoursework = [
  { label: "Fall 2026", courses: ["MSML 641 — Machine Learning", "MSML 643 — Time Series", "MSAI 633 — Agentic AI"] },
  { label: "Spring 2026", courses: ["MSML 604 — Introduction to Optimization", "MSML 605 — Computing Systems for Machine Learning", "MSML 606 — Algorithms and Data Structures for Machine Learning"] },
  { label: "Fall 2025", courses: ["MSML 603 — Principles of Machine Learning", "MSML 602 — Principles of Data Science", "MSML 601 — Probability and Statistics"] },
];

const focusTree = {
  primary: ["Machine Learning", "Data Science", "Agentic AI"],
  secondary: [
    { label: "MLOps", parent: "Machine Learning" },
    { label: "Model Optimization", parent: "Machine Learning" },
    { label: "NLP", parent: "Data Science" },
    { label: "Time Series", parent: "Data Science" },
  ]
};

const publications = [
  { title: "Enhanced Brain Tumour Prediction Using Quantum: A Hybrid Deep Learning Approach", status: "Published", description: "Peer-reviewed — Scientific Reports (Nature Portfolio) — ResNet + PennyLane quantum circuit hybrid", link: "https://www.nature.com/articles/s41598-026-51263-x", external: true },
  { title: "Scalable Enhancement of Cloud-Based DDoS Detection with Adaptive ML Pipelines", status: "Published", description: "Peer-reviewed research — TechRxiv preprint", link: "https://www.techrxiv.org/doi/pdf/10.36227/techrxiv.175037203.37181551/v1", external: true },
  { title: "Hybrid SARIMA-LSTM Model for Energy Demand Forecasting", status: "Under review", description: "Peer-reviewed research — Scientific Reports (Nature Portfolio)" },
  { title: "Pancreatic Cancer Detection — Deep Learning Approach", status: "Under review", description: "Peer-reviewed research" },
  { title: "Obesity Risk Classification via Ensemble Modeling", status: "Under review", description: "Peer-reviewed research" },
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  useEffect(() => {
    const sections = navItems.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -55%", threshold: [0.1, 0.25, 0.5] });
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px 220px 0px", threshold: 0.01 });
    sections.forEach((section) => observer.observe(section));
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(selectedProject));
    return () => document.body.classList.remove("modal-open");
  }, [selectedProject]);

  const jumpTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const visibleProjects = projectFilter === "All" ? projects : projects.filter((project) => project.category === projectFilter);

  return <div className="site-shell">
    <header className="site-header">
      <a className="brand" href="#home" onClick={() => jumpTo("home")}><span>AN</span><small>ML / DS</small></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item) => <a className={activeSection === item ? "active" : ""} href={`#${item}`} key={item} onClick={() => jumpTo(item)}>{item === "home" ? "Home" : item}</a>)}
        <a className="nav-resume" href={`${baseUrl}resume.pdf`} target="_blank" rel="noreferrer"><Download size={15} /> Resume</a>
      </nav>
    </header>

    <main>
      <section className="hero-section section-pad" id="home">
        <div className="hero-grid">
          <div className="hero-content reveal reveal-one">
            <p className="kicker"><span className="live-dot" /> Applied ML / Data Science / AI</p>
            <h1>Turning messy data into <span>useful intelligence.</span></h1>
            <p className="hero-lede">I’m Aniruddhan Narasimhan, an Applied Machine Learning graduate student building models, pipelines, and products that hold up in the real world.</p>
            <div className="hero-actions"><a className="button button-primary" href="#projects" onClick={() => jumpTo("projects")}>Explore my work <ArrowUpRight size={17} /></a><a className="button button-quiet" href="mailto:aniruddhan26@gmail.com">Let’s connect <Mail size={16} /></a></div>
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
            <div className="orbit-card card-bottom"><span>Current focus</span><strong>AI</strong><small>knowledge tree</small></div>
            <div className="ai-focus-tree" aria-label="AI knowledge focus tree">
              <div className="tree-root">AI</div>
              <div className="tree-row tree-primary">
                {focusTree.primary.map((node, index) => (
                  <div className="tree-node" key={node} style={{ animationDelay: `${0.16 + index * 0.18}s` }}>
                    <span>{node}</span>
                  </div>
                ))}
              </div>
              <div className="tree-row tree-secondary">
                {focusTree.secondary.map((node, index) => (
                  <div className="tree-node tree-node-secondary" key={node.label} style={{ animationDelay: `${0.42 + index * 0.12}s` }}>
                    <span>{node.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about"><span>Scroll to explore</span><ArrowDown size={16} /></a>
      </section>

      <section className="marquee-band"><div className="marquee-track"><span>RESEARCH-LED</span><i>✳</i><span>IMPACT-FOCUSED</span><i>✳</i><span>ALWAYS LEARNING</span><i>✳</i><span>RESEARCH-LED</span><i>✳</i><span>IMPACT-FOCUSED</span></div></section>

      <section className="section-pad about-section" id="about"><div className="section-intro reveal"><p className="eyebrow">01 / About</p><h2>Curious about the <em>why</em> behind the model.</h2></div><div className="about-layout"><div className="about-copy reveal"><p className="large-copy">I work at the intersection of applied machine learning, data systems, and human decisions.</p><p>Currently pursuing an M.S. in Applied Machine Learning at the University of Maryland, I enjoy taking a problem from raw data to a tested model to a tool someone can actually use.</p><p>My experience spans industrial health, medical imaging, advertising analytics, GenAI, and cloud deployment. I’m drawn to hard problems with measurable stakes and teams that care about doing the work properly.</p><a className="inline-link" href="mailto:aniruddhan26@gmail.com">Start a conversation <MoveUpRight size={16} /></a></div><div className="education-card reveal reveal-two"><div className="card-icon"><GraduationCap size={22} /></div><p className="eyebrow">Education</p><h3>M.S. Applied Machine Learning</h3><strong>University of Maryland — College Park</strong><div className="education-details"><span>Aug 2025 — May 2027</span><span>GPA 3.7 / 4.0</span></div><div className="coursework-tree" aria-label="Master's coursework hierarchy"><div className="coursework-root">Coursework</div><div className="coursework-branches">{mastersCoursework.map((semester, index) => (<div className="coursework-branch" key={semester.label} style={{ animationDelay: `${0.18 + index * 0.18}s` }}><div className="semester-node">{semester.label}</div><div className="semester-courses">{semester.courses.map((course, courseIndex) => (<span className="course-item" key={course} style={{ animationDelay: `${0.36 + index * 0.18 + courseIndex * 0.12}s` }}>{course}</span>))}</div></div>))}</div></div><div className="education-divider" /><h3 className="smaller-title">B.Tech. Computer Science & Engineering</h3><strong>VIT, Chennai · AI & Robotics</strong><div className="education-details"><span>2021 — May 2025</span><span>GPA 3.6 / 4.0</span></div></div></div></section>

      <section className="section-pad experience-section" id="experience"><div className="section-intro split-intro reveal"><div><p className="eyebrow">02 / Experience</p><h2>Where the work<br /><em>gets real.</em></h2></div><p>From industrial sensor data to enterprise workflows, each chapter has taught me to make models more honest, useful, and resilient.</p></div><div className="experience-list">{experience.map((item, index) => { const Icon = item.icon; return <article className={`experience-card reveal reveal-delay-${Math.min(index + 1, 4)} ${item.featured ? "featured" : ""}`} key={`${item.company}-${item.role}`}><div className="experience-header"><div className="experience-company-block"><div className="experience-icon"><Icon size={18} /></div><div><p className="eyebrow">{item.company}</p><h3>{item.role}</h3></div></div><div className="experience-meta"><span className="experience-date"><CalendarDays size={13} /> {item.period}</span><span className="experience-location"><MapPin size={13} /> {item.location}</span></div></div><ul className="experience-points">{item.achievements.map((achievement) => <li key={achievement}>{achievement.split(/(30M\+|20–30%|7%|60%|40%)/g).map((part, index) => /^(30M\+|20–30%|7%|60%|40%)$/.test(part) ? <strong key={`${part}-${index}`}>{part}</strong> : <span key={`${part}-${index}`}>{part}</span>)}</li>)}</ul><div className="experience-tech">{item.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></article>; })}</div></section>

      <section className="section-pad projects-section" id="projects"><div className="section-intro split-intro reveal"><div><p className="eyebrow">03 / Selected work</p><h2>Built to answer<br /><em>better questions.</em></h2></div><p>Explore a selection of projects across computer vision, GenAI, applied modeling, and ML research.</p></div><div className="filter-row reveal">{categories.map((category) => <button className={projectFilter === category ? "filter-active" : ""} key={category} onClick={() => setProjectFilter(category)}>{category}</button>)}</div><div className="project-grid">{visibleProjects.map((project, index) => <article className={`project-card ${project.color} reveal reveal-delay-${Math.min(index + 1, 4)}`} key={project.title} onClick={() => setSelectedProject(project)}><div className="project-card-top"><span>{project.category}</span><span>{project.year}</span></div><div className="project-art"><div className="art-lines" /><div className="art-core">{project.category === "GenAI" ? <Sparkles /> : project.category === "Computer vision" ? <BrainCircuit /> : project.category === "Research" ? <Database /> : <Workflow />}</div></div><h3>{project.title}</h3><p>{project.summary}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-open" aria-label={`View ${project.title}`}><ArrowUpRight size={18} /></button></article>)}</div></section>

      <section className="section-pad skills-section" id="skills"><div className="section-intro reveal"><p className="eyebrow">04 / Toolkit</p><h2>The stack is a means.<br /><em>The thinking is the craft.</em></h2></div><div className="skills-grid">{skillGroups.map((group, index) => { const Icon = group.icon; return <article className={`skill-group reveal reveal-delay-${index + 1}`} key={group.label}><div className="skill-title"><Icon size={19} /><h3>{group.label}</h3></div><div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>; })}</div></section>

      <section className="section-pad proof-section" id="proof"><div className="proof-panel reveal"><div><p className="eyebrow">05 / Research notes</p><h2>Four research works.<br /><em>One through-line.</em></h2></div><div className="proof-copy"><p>Medical imaging, quantum-driven feature extraction, ensemble learning, forecasting, and cloud security all point to the same belief: rigor makes useful intelligence possible.</p><a className="inline-link" href="mailto:aniruddhan26@gmail.com?subject=Research%20collaboration">Discuss research <MoveUpRight size={16} /></a></div></div></section>

      <section className="section-pad publications-section" id="publications"><div className="section-intro reveal"><p className="eyebrow">06 / Publications</p><h2>Peer-reviewed <em>research.</em></h2></div><div className="publication-list">{publications.map((publication, index) => <article className={`publication-item reveal reveal-delay-${Math.min(index + 1, 4)}`} key={publication.title}><div className="publication-copy"><h3>{publication.link ? <a href={publication.link} target="_blank" rel="noreferrer">{publication.title} <ArrowUpRight size={18} /></a> : publication.title}</h3><p>{publication.description}</p></div><span className={`publication-status ${publication.status === "Published" ? "status-published" : "status-review"}`}>{publication.status}{publication.link && <ExternalLink size={14} />}</span></article>)}</div></section>

      <section className="contact-section section-pad" id="contact"><div className="contact-inner reveal"><p className="eyebrow">07 / Contact</p><h2>Have a hard problem?<br /><em>Let’s make it legible.</em></h2><p>I’m always open to thoughtful conversations about machine learning, research, and building tools with real-world value.</p><a className="button button-primary" href="mailto:aniruddhan26@gmail.com">aniruddhan26@gmail.com <Send size={16} /></a><div className="contact-links"><a href="https://github.com/Aniruddhan15" target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub</a><a href="https://www.linkedin.com/in/aniruddhan-narasimhan-15688021b/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /> LinkedIn</a></div></div></section>
    </main>

    <footer className="site-footer"><span>© 2026 Aniruddhan Narasimhan</span><span>Built with curiosity · <a href="#home">Back to top ↑</a></span></footer>
    {selectedProject && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={20} /></button><p className="eyebrow">{selectedProject.category} · {selectedProject.year}</p><h2 id="project-title">{selectedProject.title}</h2><p>{selectedProject.detail}</p><div className="tag-row">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="button button-primary" href={selectedProject.link} target={selectedProject.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">Open project <ExternalLink size={16} /></a></div></div>}
  </div>;
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
