import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, Menu, X } from 'lucide-react'
import { Card, Section } from './components/Section'
import { Frame, type Shot } from './components/Frame'
import { Lightbox } from './components/Lightbox'
import { contacts, gallery, navItems, primaryNavItems, processSteps, projects, reflection, skills } from './content'

const sectionIds: string[] = navItems.map(([id]) => id)
const primarySection = (id: string) => id.startsWith('case-') ? 'projects' : ['studio', 'purpose', 'system', 'process', 'reflection'].includes(id) ? 'about' : id

export default function App() {
  const [active, setActive] = useState('cover')
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState<Shot | null>(null)
  const [lightboxGroup, setLightboxGroup] = useState<readonly Shot[]>([])
  const [toast, setToast] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [filter, setFilter] = useState('All')
  const go = useCallback((id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`); setActive(id); setMenuOpen(false) }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) { setActive(visible.target.id); history.replaceState(null, '', `#${visible.target.id}`) }
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .2, .5, .8] })
    sectionIds.forEach(id => { const element = document.getElementById(id); if (element) observer.observe(element) })
    const scroll = () => { const range = document.documentElement.scrollHeight - innerHeight; setProgress(range ? scrollY / range * 100 : 0) }
    const pop = () => { const id = decodeURIComponent(location.hash.slice(1)) || sectionIds[0]; if (sectionIds.includes(id)) { document.getElementById(id)?.scrollIntoView(); setActive(id) } }
    window.addEventListener('scroll', scroll, { passive: true }); scroll()
    window.addEventListener('popstate', pop)
    const hash = decodeURIComponent(location.hash.slice(1)); if (sectionIds.includes(hash)) setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 0)
    return () => { observer.disconnect(); window.removeEventListener('scroll', scroll); window.removeEventListener('popstate', pop) }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '?' && !(event.target instanceof HTMLInputElement)) setShowHelp(v => !v)
      if (event.key === 'Escape') { setShowHelp(false); setMenuOpen(false) }
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(event.target.tagName)) return
      const at = sectionIds.indexOf(active)
      if (['ArrowDown', 'PageDown'].includes(event.key)) { event.preventDefault(); go(sectionIds[Math.min(sectionIds.length - 1, at + 1)]) }
      if (['ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); go(sectionIds[Math.max(0, at - 1)]) }
      if (event.key === 'Home') { event.preventDefault(); go(sectionIds[0]) }
      if (event.key === 'End') { event.preventDefault(); go(sectionIds[sectionIds.length - 1]) }
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [active, go])

  const projectList = useMemo(() => projects.filter(project => {
    if (filter === 'All') return true
    if (filter === 'Web apps') return project.category === 'Web application'
    return project.category.toLowerCase().includes(filter.toLowerCase())
  }), [filter])
  const open = (shot: Shot) => setLightbox(shot)
  const copyHex = async (hex: string) => { try { await navigator.clipboard.writeText(hex); setToast(`Copied ${hex}`); setTimeout(() => setToast(''), 1800) } catch { setToast(hex); setTimeout(() => setToast(''), 1800) } }

  const frames = (shots: readonly Shot[], className = 'shot-grid') => <div className={className}>{shots.map(shot => <Frame key={shot[0]} shot={shot} onOpen={item => { setLightbox(item); setLightboxGroup(shots) }} />)}</div>
  const caseIntro = (eyebrow: string, title: string, id: string) => <><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-title`} className="case-title">{title}</h2></>

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="topbar">
      <button className="brand-mark" onClick={() => go('cover')} aria-label="Xoli's LABS home"><img src="./assets/logo-xolis-labs.svg" alt="Xoli's LABS" /></button>
      <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Section navigation">
        <button className="nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
        {primaryNavItems.map(([id, label]) => <a key={id} href={`#${id}`} className={primarySection(active) === id ? 'active' : ''} aria-current={primarySection(active) === id ? 'location' : undefined} onClick={event => { event.preventDefault(); go(id) }}>{label}</a>)}
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <div className="progress" style={{ width: `${progress}%` }} />
    <main id="main">
      <section id="cover" className="hero" aria-labelledby="cover-title">
        <div className="hero-glow" />
        <img className="hero-logo" src="./assets/logo-xolis-labs.svg" alt="Xoli's LABS pen nib logo" />
        <p className="hero-lockup" id="cover-title"><span>XOLI'S</span> <b>LABS</b></p>
        <p className="hero-tagline">Ideas into digital experiences.</p>
        <button className="scroll-cue" onClick={() => go('studio')} aria-label="Scroll to studio introduction"><ArrowDown /> Scroll to explore</button>
      </section>

      <Section id="studio" eyebrow="XOLI'S LABS · STUDIO INTRODUCTION"><h1 id="studio-title">design, code, and <em>experimentation</em> together.</h1><div className="stack-cards">
        {[['01', 'Design', 'Interfaces, identities, and visual systems built with intention and hierarchy.'], ['02', 'Development', 'Responsive, functional front-end and full-stack web applications.'], ['03', 'Experimentation', 'Multimedia, animation, and interactive concepts explored with curiosity.']].map(([n, title, copy]) => <Card key={n} label={n} title={title}>{copy}</Card>)}
      </div></Section>

      <Section id="about" eyebrow="ABOUT THE CREATOR"><div className="about-grid"><div><img className="about-mark" src="./assets/logo-xolis-labs.svg" alt="Xoli's LABS logo" /><h2 id="about-title">xolile <em>ludidi</em></h2><p className="eyebrow">MULTIMEDIA APPLICATIONS STUDENT · CPUT, SOUTH AFRICA</p><dl className="facts"><div><dt>Institution</dt><dd>Cape Peninsula University of Technology</dd></div><div><dt>Programme</dt><dd>Multimedia Applications</dd></div><div><dt>Focus</dt><dd>Design · UX · Web development</dd></div></dl><p className="body-copy">I'm a Multimedia Applications student at the Cape Peninsula University of Technology (CPUT), focusing on digital design, user experience, and web development. I enjoy turning ideas into useful, engaging digital experiences, combining visual thinking with practical technology and a constant curiosity for how things work.</p></div><figure className="portrait"><img src="./assets/images/page02-img01-739x1600.png" width="739" height="1600" loading="lazy" decoding="async" alt="Portrait of Xolile Ludidi" /></figure></div></Section>

      <Section id="purpose" eyebrow="STUDIO PRINCIPLES"><h2 id="purpose-title">studio with <em>purpose</em></h2><div className="trio">
        <Card label="VISION" title="thoughtful digital experiences" orange>Combine visual creativity with practical technology to make work that's both useful and considered.</Card>
        <Card label="MISSION" title="explore, design, build, improve">Design intuitive interfaces, build useful digital solutions, and keep improving through experimentation and real projects.</Card>
        <Card label="VALUE" title="creativity with purpose">Design decisions driven by intent, not decoration.</Card>
      </div><p className="eyebrow sub-eyebrow">WHERE THIS SHOWS UP</p><div className="three-mini">{[['Design intent', 'Every choice supports the experience.'], ['Useful solutions', 'Technology answers a real need.'], ['Real-project learning', 'Practice through building and reflection.']].map(([a,b]) => <Card key={a} title={a}>{b}</Card>)}</div></Section>

      <Section id="system" eyebrow="VISUAL SYSTEM"><h2 id="system-title">colour, type, and <em>components</em></h2><div className="swatches">{[['Charcoal','#141414','Backgrounds'],['Orange','#FF7A26','Accent, selective'],['Warm off-white','#F5F3EF','Headings, key text'],['Neutral grey','#777777','Labels, captions'],['Deep grey','#242424','Panels, cards']].map(([name, hex, usage]) => <button key={hex} className="swatch" onClick={() => copyHex(hex)} aria-label={`Copy ${name} ${hex}`}><span className="swatch-colour" style={{ backgroundColor: hex }} /><span><b>{name}</b><code>{hex}</code><small>{usage}</small></span></button>)}</div><div className="two-col type-cards"><Card label="HEADINGS · NAMCO" title="ab">Ideas into digital experiences.</Card><Card label="BODY · INTER REGULAR" title="Aa">Inter keeps long text calm and readable beside the bolder headings.</Card></div><p className="eyebrow sub-eyebrow">SYSTEM IN USE</p><div className="two-col"><Card label="COMPONENTS" title="A clear, consistent toolkit"><p><button className="pill-button" onClick={() => go('projects')}>Primary action</button> <button className="pill-button secondary" onClick={() => go('projects')}>Secondary</button></p><div className="tags"><span>React</span><span>Laravel</span><span>PHP</span></div><div className="mini-panel">Panel — Deep grey, 1 px outline, 22 px radius.</div></Card><Card label="LOGO ON CHARCOAL" className="logo-card"><img src="./assets/logo-xolis-labs.svg" alt="Xoli's LABS exact logo" /></Card></div></Section>

      <Section id="process" eyebrow="DESIGN PROCESS"><h2 id="process-title">from <em>concept</em> to interactive experience.</h2><div className="timeline">{processSteps.map(([name, copy], i) => <article className="timeline-step" key={name}><span className="step-number">{String(i+1).padStart(2,'0')}</span><div><h3>{name}</h3><p>{copy}</p></div></article>)}</div></Section>

      <Section id="projects" eyebrow="SELECTED PROJECTS"><h2 id="projects-title">four <em>projects</em>.</h2><p className="lead">Each case study ends with space for real screenshots and honest notes on what was built.</p><div className="filter-row">{['All','Brand','Web apps','E-commerce'].map(item => <button key={item} className={filter===item?'selected':''} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="project-grid">{projectList.map((project, i) => <article className={`project-card ${i===0 && filter==='All' ? 'project-orange' : ''}`} key={project.id}><p className="eyebrow">{project.category}</p><h3>{project.name}</h3><p>{project.intro}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><button className="text-link" onClick={() => go(project.id)}>Case study <ArrowRight size={15} /></button></article>)}</div></Section>

      <Section id="case-xolis-labs" eyebrow="CASE STUDY 01 · BRAND IDENTITY"><h2 id="case-xolis-labs-title" className="case-title">xoli's <em>labs</em></h2><p className="lead">Brand identity and creative direction.</p><div className="brand-stage"><img src="./assets/logo-xolis-labs.svg" alt="Xoli's LABS brand logo" /><p>Ideas into digital experiences.</p></div><div className="two-col"><Card label="CHALLENGE" title="Give the studio a clear identity">Communicate design, development, and multimedia through one recognisable mark while keeping the studio’s main focus clear.</Card><Card label="DIRECTION" title="A mark built around making">Retro-leaning display lettering and a pen-tool mark meet clean grids and restrained colour, so the identity feels technical and playful without becoming noisy.</Card></div><p className="eyebrow sub-eyebrow">BUILDING THE SYSTEM</p><div className="two-col"><Card label="COLOUR" title="Charcoal, orange, off-white">A focused palette for readable content and recognisable highlights.</Card><Card label="TYPOGRAPHY & SPACING" title="Namco + Inter">Expressive display typography pairs with clear, legible body text and generous spacing.</Card></div>{frames(gallery.brand,'brand-grid')}<Card label="REFLECTION" title="Identity with room to grow">The identity shows a studio that blends craft and code. Next steps: write a formal brand guide covering clear space, minimum sizes, and usage rules, and check orange-on-dark contrast at small sizes.</Card></Section>

      <Section id="case-quickspot" eyebrow="CASE STUDY 02 · WEB APPLICATION">{caseIntro('CASE STUDY 02 · QUICKSPOT', 'quickspot', 'case-quickspot')}<p className="lead">A digital way for campus users to find relevant support and manage appointments in one place.</p><div className="two-col"><Card label="PROBLEM" title="Finding the right support">Campus users need a clear, digital way to find the right staff member and manage their appointments in one place.</Card><Card label="APPROACH" title="One place to manage a booking">A React interface talks to a Node.js and Express server. Each part has a single job, which keeps the application easier to build and test.</Card></div><div className="two-col"><Card label="STACK · FRONT END" title="React + Vite">React builds the component-based interface. Vite provides the fast development server and build tooling.</Card><Card label="STACK · BACK END" title="Node.js + Express">Node.js runs the server. Express handles routing and the API requests from the interface.</Card></div><p className="eyebrow sub-eyebrow">USER FLOW</p><div className="flow">{['Register or log in','Select staff','Make appointment','View appointments'].map((label,i)=><div className="flow-item" key={label}><span>{String(i+1).padStart(2,'0')}</span>{label}{i<3&&<ArrowRight className="flow-arrow" />}</div>)}</div><p className="eyebrow sub-eyebrow">INTERFACE</p>{frames(gallery.quickspot,'quickspot-gallery')}<div className="two-col"><Card label="REFLECTION" title="Design for a clear next step">Interface design, user flows, front-end and back-end integration, and technical problem-solving across a full request cycle.</Card><Card label="SCOPE" title="Intended journey">Features described reflect the intended user journey. Only flows visible in the screenshots are presented as working.</Card></div></Section>

      <Section id="case-campus-connect" eyebrow="CASE STUDY 03 · WEB APPLICATION">{caseIntro('CASE STUDY 03 · CAMPUS CONNECT', 'campus connect', 'case-campus-connect')}<p className="lead">Organising campus events and managing attendee registration in one place.</p><div className="two-col"><Card label="PROBLEM" title="Campus events are easy to miss">Organisers need one place to publish events, review registrations, and keep attendees informed.</Card><Card label="APPROACH" title="Public discovery with organiser tools">A Laravel application with separate experiences for administrators, organisers, and attendees.</Card></div><Card label="STACK" title="Laravel · PHP · Tailwind CSS"><div className="tags"><span>Laravel</span><span>PHP</span><span>Tailwind CSS</span></div></Card><Card label="DATABASE"><span className="confirm-tag">[CONFIRM DATABASE USED IN THE PROJECT] · to confirm</span></Card><p className="eyebrow sub-eyebrow">FEATURES</p><div className="three-mini">{[['Event management','Create and maintain events.'],['Event search','Find events quickly.'],['Registration','Attendees register for events.'],['Approval','Organisers approve or reject registrations.'],['Status','Attendees see registration status.'],['Roles','Role-based access and views.']].map(([title,copy])=><Card key={title} title={title}>{copy}</Card>)}</div>{frames(gallery.campus,'campus-gallery')}<Card label="LESSONS" title="Plan roles and event data together">Application architecture, database integration, role-based access, event workflows, and improving the user experience.</Card></Section>

      <Section id="case-gosselin" eyebrow="CASE STUDY 04 · E-COMMERCE COURSEWORK">{caseIntro('CASE STUDY 04 · GOSSELIN GOURMET GOODS', 'gosselin gourmet goods', 'case-gosselin')}<p className="lead">A PHP and MySQL coursework project: an online store with product listings and shopping-cart functionality.</p><div className="two-col"><Card label="OBJECTIVE" title="A simple product browsing and cart flow">Develop a store with product listings and shopping-cart functionality using PHP and MySQL.</Card><Card label="COURSEWORK NOTE" title="Coursework, not a deployed store">A learning project, not a commercially deployed store.</Card></div><Card label="STACK" title="PHP · MySQL"><div className="tags"><span>PHP</span><span>MySQL</span></div></Card><p className="eyebrow sub-eyebrow">FEATURES</p><div className="three-mini"><Card title="Product listings">Browse products grouped by category.</Card><Card title="Shopping cart">Review selected products and quantities.</Card><Card title="Further features"><span className="confirm-tag">[CONFIRM: categories, inventory logic, checkout] · to confirm</span></Card></div>{frames(gallery.gosselin,'gosselin-gallery')}<Card label="LESSONS" title="Data handling, cart logic, and security">Data handling, application structure, cart logic, and why security matters, including input validation and keeping credentials out of screenshots and code.</Card></Section>

      <Section id="skills" eyebrow="SKILLS AND TECHNICAL CAPABILITIES"><h2 id="skills-title">skills, grouped by <em>where</em> they're used.</h2><div className="skills-grid">{skills.map(([label,title,copy])=><Card key={label} label={label.toUpperCase()} title={title}>{copy}</Card>)}</div><Card label="NOTE" title="Demonstrated, not rated" orange>Skills listed are those used in the projects shown. No percentage ratings are claimed.</Card></Section>

      <Section id="reflection" eyebrow="REFLECTION AND FUTURE DEVELOPMENT"><h2 id="reflection-title">what the work shows, and <em>what's next</em>.</h2><p className="lead">These projects show a growing range across design and full-stack development. They are learning projects, and the next steps are about maturity.</p><div className="reflection-grid">{reflection.map(([title,copy],i)=><Card key={title} label={String(i+1).padStart(2,'0')} title={title}>{copy}</Card>)}</div></Section>

      <Section id="contact" eyebrow="LET'S MAKE SOMETHING"><div className="contact-content"><img className="contact-mark" src="./assets/logo-xolis-labs.svg" alt="Xoli's LABS pen nib mark" /><p className="contact-lockup">&lt;/&gt; XOLI'S LABS</p><h2 id="contact-title">LET'S BUILD SOMETHING <strong>MEANINGFUL.</strong></h2><p className="hero-tagline">Ideas into digital experiences.</p><div className="contact-grid">{contacts.map(([label,href,text])=><div className="contact-item" key={label}><p className="eyebrow">{label}</p><a href={href} target={label==='Email'?undefined:'_blank'} rel={label==='Email'?undefined:'noopener noreferrer'}>{text}</a></div>)}</div><p className="copyright">Xolile Ludidi · 2026</p></div></Section>
    </main>
    <aside className="section-counter" aria-live="polite"><span>XOLI'S LABS · XOLILE LUDIDI</span><b>{String(sectionIds.indexOf(active)+1).padStart(2,'0')} / {String(sectionIds.length).padStart(2,'0')}</b></aside>
    <button className="help-button" onClick={() => setShowHelp(v=>!v)} aria-label="Keyboard shortcuts">?</button>
    {showHelp && <aside className="help-popover" role="dialog" aria-label="Keyboard shortcuts"><button onClick={() => setShowHelp(false)} aria-label="Close shortcuts"><X size={16}/></button><b>Keyboard shortcuts</b><p>↑ / ↓ or Page Up / Page Down — move between sections</p><p>Home / End — first or last section</p><p>? — show or hide this guide · Esc — close</p></aside>}
    {toast && <div className="toast" role="status">{toast}</div>}
    <Lightbox shot={lightbox} group={lightboxGroup} navigate={setLightbox} close={() => setLightbox(null)} />
  </>
}
