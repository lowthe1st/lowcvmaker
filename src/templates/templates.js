export const templateRegistry = [
  {
    id: 'modernMinimal',
    name: 'Modern Minimal',
    layoutType: 'modern',
    accentColor: '#5b4bc4',
    sectionsOrder: ['summary', 'experience', 'skills', 'education'],
    starterCv: `Alex Johnson
Product Designer
alex.johnson@email.com | Stockholm

Summary
Design-focused professional with 5+ years of experience creating user-centered digital products.

Experience
Senior Product Designer, Northlane Studio (2022-Present)
- Led redesign of onboarding flow, increasing activation by 18%.
- Built reusable design system components for web and mobile.

Product Designer, Fold Labs (2019-2022)
- Collaborated with engineering and PM to launch 12 major features.

Skills
Figma, UX Research, Prototyping, Design Systems, Accessibility

Education
B.Sc. Interaction Design, Umea University`,
    starterCoverLetter: `Dear Hiring Manager,

I am excited to apply for the role at your company. I bring strong product design experience, a user-first mindset, and a proven record of delivering measurable impact.

At Northlane Studio, I led cross-functional initiatives that improved onboarding conversion and reduced friction in key user journeys. I would love to bring the same collaborative and outcome-driven approach to your team.

Thank you for your time and consideration.

Sincerely,
Alex Johnson`,
  },
  {
    id: 'classicProfessional',
    name: 'Classic Professional',
    layoutType: 'classic',
    accentColor: '#5f6778',
    sectionsOrder: ['profile', 'experience', 'competencies', 'education'],
    starterCv: `Maria Svensson
Operations Manager
Stockholm, Sweden | maria@email.com

Professional Profile
Operations leader with strong background in process improvement, vendor management, and cross-team coordination.

Professional Experience
Operations Manager, Nordic Supply Group (2021-Present)
- Standardized workflows across 4 departments, reducing delays by 22%.
- Managed annual operational budget and supplier relationships.

Operations Coordinator, RailPoint AB (2017-2021)
- Improved reporting cadence and KPI visibility for leadership.

Core Competencies
Operations Strategy, Process Design, Stakeholder Management, Budgeting

Education
M.Sc. Business Administration, Stockholm University`,
    starterCoverLetter: `Dear Hiring Team,

I am writing to express my interest in the Operations role. My experience in building reliable processes and improving cross-functional collaboration aligns strongly with your needs.

In my current position, I have led operational initiatives that improved delivery speed and transparency, while maintaining high quality standards. I am eager to contribute this mindset to your organization.

Best regards,
Maria Svensson`,
  },
  {
    id: 'sidebarSkills',
    name: 'Sidebar Skills',
    layoutType: 'sidebar',
    accentColor: '#4356b4',
    sectionsOrder: ['profile', 'skills', 'experience', 'projects'],
    starterCv: `Daniel Kim
Frontend Engineer

Profile
Frontend engineer focused on performance, accessibility, and maintainable architecture.

Experience
Frontend Engineer, Wavefront Tech (2020-Present)
- Reduced bundle size by 30% through modularization and lazy loading.
- Introduced testing standards that reduced regressions in release cycles.

Engineer, Pixel Forge (2018-2020)
- Built reusable component library used by 5 product teams.

Skills
React, TypeScript, Vite, Testing Library, Cypress, CSS Architecture

Projects
Design System Platform, Marketing Site Rebuild, Internal Analytics Dashboard`,
    starterCoverLetter: `Dear Hiring Team,

I am excited to apply for the Frontend Engineer position. I specialize in building performant and accessible interfaces with clear engineering standards.

I have delivered measurable performance gains, scaled design systems, and improved release stability through better testing and architecture practices. I would value the opportunity to contribute to your product team.

Kind regards,
Daniel Kim`,
  },
  {
    id: 'twoColumnClean',
    name: 'Two-Column Clean',
    layoutType: 'two-column',
    accentColor: '#6a7390',
    sectionsOrder: ['summary', 'experience', 'skills', 'education'],
    starterCv: `Sara Patel
Marketing Specialist

Summary
Data-informed marketer with experience in campaign strategy, content planning, and lifecycle optimization.

Experience
Marketing Specialist, Brightline Media (2021-Present)
- Planned multi-channel campaigns that increased qualified leads by 25%.
- Improved email lifecycle performance and audience segmentation.

Marketing Associate, Motionly (2019-2021)
- Supported product launches and content distribution strategy.

Skills
Campaign Strategy, Content Marketing, Email Automation, Analytics, SEO

Education
B.A. Communication and Media Studies`,
    starterCoverLetter: `Dear Hiring Manager,

I am applying for the Marketing Specialist role and would be excited to support your growth goals. I combine creative planning with data-driven execution to deliver campaigns that perform.

My recent work includes improving lead quality and scaling lifecycle messaging through better segmentation and content strategy. I would welcome the chance to bring this approach to your team.

Sincerely,
Sara Patel`,
  },
  {
    id: 'boldHeader',
    name: 'Bold Header',
    layoutType: 'bold',
    accentColor: '#3447a2',
    sectionsOrder: ['about', 'workHistory', 'techStack', 'education'],
    starterCv: `Noah Berg
Software Engineer

About
Engineer with experience in backend services, cloud deployment, and product-focused delivery.

Work History
Software Engineer, CoreGrid Systems (2022-Present)
- Built internal APIs and reduced latency on core endpoints by 35%.
- Improved observability using structured logging and dashboards.

Developer, Blue Harbor (2019-2022)
- Delivered integrations for enterprise customers.

Tech Stack
Node.js, PostgreSQL, Docker, AWS, CI/CD, Monitoring

Education
B.Sc. Computer Science`,
    starterCoverLetter: `Hello Hiring Team,

I am interested in your Software Engineer opening. I enjoy building reliable systems and shipping practical features that solve user needs.

My background includes backend architecture, deployment automation, and strong collaboration with product teams. I would appreciate the opportunity to discuss how I can contribute.

Best,
Noah Berg`,
  },
  {
    id: 'darkAccent',
    name: 'Dark Accent',
    layoutType: 'dark',
    accentColor: '#2a355f',
    sectionsOrder: ['summary', 'experience', 'skills', 'education'],
    starterCv: `Emma Clarke
Customer Success Lead

Professional Summary
Customer success leader with a strong focus on onboarding, retention, and strategic account growth.

Experience
Customer Success Lead, Orbit Cloud (2021-Present)
- Increased renewal rate by 14% through proactive success planning.
- Built onboarding playbooks that reduced time-to-value by 20%.

Senior CSM, NovaSuite (2018-2021)
- Managed enterprise portfolio and drove expansion opportunities.

Skills
Customer Strategy, Account Planning, QBRs, Onboarding, Risk Management

Education
B.A. International Business`,
    starterCoverLetter: `Dear Hiring Team,

I am excited to apply for the Customer Success role. My experience centers on helping customers achieve outcomes quickly while building long-term account trust.

I have led retention and onboarding programs that improved both customer satisfaction and revenue stability. I would be glad to bring this experience to your organization.

Kind regards,
Emma Clarke`,
  },
]

export function getTemplateById(templateId) {
  return templateRegistry.find((template) => template.id === templateId) || null
}
