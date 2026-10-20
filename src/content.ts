export type Project = { id: string; name: string; category: string; intro: string; stack: string[] }

export const navItems = [
  ['cover', 'Home'], ['studio', 'Studio'], ['about', 'About'], ['purpose', 'Purpose'],
  ['system', 'System'], ['process', 'Process'], ['projects', 'Projects'], ['case-xolis-labs', '01'],
  ['case-quickspot', '02'], ['case-campus-connect', '03'], ['case-gosselin', '04'], ['skills', 'Skills'],
  ['reflection', 'Reflection'], ['contact', 'Contact'],
] as const

export const primaryNavItems = [
  ['cover', 'Home'], ['about', 'About'], ['projects', 'Projects'], ['skills', 'Skills'], ['contact', 'Contact'],
] as const

export const projects: Project[] = [
  { id: 'case-xolis-labs', name: "xoli's labs", category: 'Brand identity', intro: 'A visual identity for a creative technology studio.', stack: ['Illustrator', 'Identity'] },
  { id: 'case-quickspot', name: 'quickspot', category: 'Web application', intro: 'Campus appointment booking application.', stack: ['React', 'Vite', 'Node.js', 'Express'] },
  { id: 'case-campus-connect', name: 'campus connect', category: 'Web application', intro: 'Campus event management system.', stack: ['Laravel', 'PHP', 'Tailwind CSS'] },
  { id: 'case-gosselin', name: 'gosselin gourmet goods', category: 'E-commerce · Coursework', intro: 'PHP and MySQL coursework online store.', stack: ['PHP', 'MySQL'] },
]

export const processSteps = [
  ['Discover', 'Understand the problem and intended audience.'], ['Research', 'Explore requirements, context, and comparable solutions.'],
  ['Define', 'Establish objectives, content, and user needs.'], ['Design', 'Sketch, organise information, and create interface concepts.'],
  ['Build', 'Implement the design and functionality.'], ['Test', 'Evaluate usability, responsiveness, and technical behaviour.'],
  ['Refine', 'Fix issues and improve the final experience.'],
] as const

export const skills = [
  ['UI/UX and interface design', 'Layout · Hierarchy · User flows', 'Interface structure and flows across the web applications.'],
  ['Graphic design and visual identity', 'Brand identity · Colour · Typography', "Xoli's LABS identity and visual system."],
  ['Front-end', 'HTML · CSS · JavaScript · React · Vite · Tailwind CSS', 'Component-based and utility-styled interfaces.'],
  ['Back-end and full-stack', 'PHP · Laravel · Node.js · Express · MySQL', 'Coursework and project applications.'],
  ['Multimedia and interaction', 'Animation · Interactive concepts', 'Explored with curiosity.'],
  ['Tools', 'Git · GitHub · VS Code · Illustrator', 'Version control and design workflow.'],
] as const

export const reflection = [
  ['User-centred design', 'Start from the user’s need and test the flow.'], ['Responsive interfaces', 'Make every layout work on small screens.'],
  ['Code quality', 'Cleaner structure and clearer naming.'], ['Testing', 'Test features before calling them done.'],
  ['Security', 'Validate input and protect credentials.'], ['Stronger case studies', 'Add real screenshots, process, and honest outcomes.'],
] as const

export const contacts = [
  ['Email', 'mailto:Ludidixolilexolile@gmail.com', 'Ludidixolilexolile@gmail.com'],
  ['Portfolio', 'https://xolile2003.github.io/xolis-labs-portfolio', 'View portfolio'],
  ['GitHub', 'https://xolile2003.github.io/Xolile-Web/', 'Visit GitHub site'],
] as const

export const gallery = {
  brand: [
    ['./assets/images/page08-img02-606x871.png', 'Colour palette and identity exploration'],
    ['./assets/images/page08-img03-585x1040.png', 'Typography and visual identity board'],
    ['./assets/images/page08-img04-424x294.png', "Xoli's LABS logo on orange"],
  ],
  quickspot: [
    ['./assets/images/page10-img08-1918x1000.png', 'QuickSpot administrator dashboard'],
    ['./assets/images/page10-img05-382x457.png', 'Student booking portal overview'],
    ['./assets/images/page10-img06-369x359.png', 'Provider search and schedules'],
    ['./assets/images/page10-img07-438x346.png', 'Campus booking portal sign in'],
  ],
  campus: [
    ['./assets/images/page12-img09-715x868.png', 'Campus Connect registration form'],
    ['./assets/images/page12-img10-726x865.png', 'Campus Connect public events homepage'],
    ['./assets/images/page12-img11-724x799.png', 'Campus Connect organiser dashboard'],
    ['./assets/images/page12-img12-868x838.png', 'Campus Connect administrator dashboard'],
  ],
  gosselin: [
    ['./assets/images/page14-img13-796x411.png', 'Password confirmation test code'],
    ['./assets/images/page14-img14-948x232.png', 'Shopping cart session code'],
    ['./assets/images/page14-img15-940x420.png', 'Gosselin Gourmet Goods category page'],
    ['./assets/images/page14-img16-960x369.png', 'Gourmet coffee products listing'],
    ['./assets/images/page14-img17-1001x382.png', 'Shopping cart overview'],
    ['./assets/images/page14-img18-961x288.png', 'Local development server modules'],
  ],
} as const
