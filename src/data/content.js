export const testimonials = {
  clients: [
    {
      quote: "Matt has helped me with my recruiting needs as Head of Development. After trying a few agencies I was able to leave the rest up to him. Excellent communication, quickly understands requirements, respectful of our budget. I confidently and highly recommend him.",
      author: "Software Development Manager",
      company: "Retail Technology Company",
    },
    {
      quote: "We had an urgent requirement that another agency couldn't fill. Matt responded the same day with candidates, 2 of which were an excellent fit. Thanks to his persistence and great networking, we filled the vacancy within 7 days. Exactly what we asked for.",
      author: "Director",
      company: "Software Company, Milton Keynes",
    },
    {
      quote: "Recruitment was a dreaded task. Our adverts generated spam, so it was a huge relief to partner with Matt and receive well-vetted candidates with the right skills and a genuine desire to work for us because of what we do.",
      author: "Head of Software Development",
      company: "Occupational Health Firm",
    },
    {
      quote: "Matt has provided us with an exceptional and very successful service. He understands our business and requirements and uses that knowledge to search for the right candidates. We are never disappointed with the CVs he provides.",
      author: "Managing Director",
      company: "Hospitality Tech Vendor",
    },
    {
      quote: "Reliable, professional and efficient — a Valued Partnership. We both work well together to ensure our applicants are managed through the process in the best way.",
      author: "Chief Operating Officer",
      company: "Payment Tech Business",
    },
  ],
  candidates: [
    {
      quote: "His guidance and regular contact made such a difference — without a doubt the best service I have received. We spoke straight after both my interviews, and I felt he was with me every step of the way.",
      author: "Business Intelligence Developer",
      company: "London, UK",
    },
    {
      quote: "Matt is an outstanding tech recruiter who makes the entire process smooth, simple and clear. I was never left in the dark and received great personalised tips throughout. Extremely knowledgeable about both the companies and recruitment as a whole.",
      author: "IT Analyst",
      company: "Milton Keynes, UK",
    },
    {
      quote: "The most dedicated recruiter I've worked with. What stood out was his thoroughness — checking in at every stage so I always knew exactly where I stood. He made the process both easy and enjoyable.",
      author: "Java Developer",
      company: "UK",
    },
    {
      quote: "I cannot thank you enough for your support, for believing in me, and for helping me start a new chapter of my career within just 10 days. You are brilliant at what you do.",
      author: "Web Developer",
      company: "Bedford, UK",
    },
    {
      quote: "Rarely do you find a recruiter that puts you first and focuses on helping you put your best foot forward. Key Partnership is a fresh breath of air in a stereotyped industry — determined, resourceful, an absolute pleasure.",
      author: "Web Developer",
      company: "Cardiff",
    },
  ],
}

export const jobs = [
  {
    id: 1,
    title: "Senior .NET Developer",
    discipline: "Software Development",
    location: "Milton Keynes",
    type: "Hybrid",
    salary: "£65,000 – £75,000",
    posted: "3 days ago",
  },
  {
    id: 2,
    title: "DevOps Engineer (AWS)",
    discipline: "Enterprise IT",
    location: "Remote (UK)",
    type: "Remote",
    salary: "£60,000 – £70,000",
    posted: "5 days ago",
  },
  {
    id: 3,
    title: "BI Developer — Power BI",
    discipline: "BI & Data",
    location: "Northampton",
    type: "Hybrid",
    salary: "£50,000 – £58,000",
    posted: "1 week ago",
  },
]

export const team = [
  {
    name: "Matt",
    role: "Senior Recruitment Consultant",
    bio: "Tech recruitment specialist with a reputation for outstanding communication and matching the right people to the right roles. Every testimonial on this site tells his story.",
    initial: "M",
  },
]

export const specialisms = [
  {
    slug: 'software-development',
    title: 'Software Development',
    short: 'Full-stack recruitment from Graduate to Architect, across every major technology.',
    description: `In a world where technology governs our every move, companies need to stay one step ahead. Key Partnership covers the full Software Development Lifecycle — back-end, front-end, full stack, architects, testers, and product managers.

We understand the technology deeply and have in-depth, technical conversations with developers. We present code samples, personal projects and GitHub repositories so clients can assess ability beyond a CV.`,
    signs: [
      'Dramatic increase of new customer requirements in a short period',
      'Recurring problems with systems arising daily',
      'Continuous inability to meet delivery timescales',
      'A skills gap with no internal subject matter expert',
    ],
    tech: ['Java', '.NET', 'Node.js', 'React', 'Angular', 'Python', 'AWS', 'Azure', 'TypeScript', 'PHP'],
    icon: '💻',
  },
  {
    slug: 'enterprise-it',
    title: 'Enterprise IT',
    short: 'IT support, infrastructure, MSPs and technology rollouts — from SMEs to Fortune 500.',
    description: `As your business grows, your technology must grow in parallel. Key Partnership recruits for both businesses with internal IT functions and Managed Service Providers delivering services to their customers.

We have built Industry Accredited Technology Teams for Fortune 500 companies and small-to-medium enterprises alike.`,
    signs: [
      'Major incidents occurring frequently across your technology estate',
      'Colleagues frustrated with the lack of IT support',
      'A big recent technology investment with no one to support it',
      'Growing concern about network security',
    ],
    tech: ['IT Support', 'Service Desk', 'Infrastructure', 'Field Services', 'Asset Management', 'Systems Administration'],
    icon: '🖥️',
  },
  {
    slug: 'bi-data',
    title: 'BI & Data',
    short: 'BI developers, DBAs, data architects and visualisation specialists.',
    description: `Companies make decisions through data. Key Partnership recruits across the full data stack — visualisation, warehousing, database management, and data integration — so your stakeholders can make the right calls quickly.`,
    signs: [
      'Unclear how much budget you have available',
      'Competitors edging closer in sales performance',
      'Staff churn with no clear understanding of why',
      'Still relying on Excel spreadsheets for critical reporting',
    ],
    tech: ['Power BI', 'Tableau', 'Qlik', 'SSRS', 'SQL Server', 'Oracle', 'PostgreSQL', 'MongoDB', 'Data Warehouse', 'ETL'],
    icon: '📊',
  },
]
