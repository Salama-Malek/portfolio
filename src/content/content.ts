export type PortfolioContent = {
  person: {
    name: string;
    role: string;
    tagline: string;
    summary: string;
  };
  navigation: Array<{ label: string; href: string }>;
  hero: {
    eyebrow: string;
    headline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    keyFacts: Array<{ label: string; value: string }>;
  };
  projects: {
    featured: Array<{
      title: string;
      category: string;
      description: string;
      stack: string[];
      links: { repo: string | null; live: string | null };
    }>;
    additional: Array<{
      title: string;
      category: string;
      stack: string[];
      links: { repo: string | null; live: string | null };
    }>;
  };
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    highlights: string[];
  }>;
  skills: {
    frontend: string[];
    backend: string[];
    mobile: string[];
    tools: string[];
    cloud: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    methods: Array<{ label: string; href: string }>;
  };
  footer: {
    description: string;
    copyright: string;
  };
};

export const content: PortfolioContent = {
  person: {
    name: 'Salama Malek',
    role: 'Full Stack Web Developer',
    tagline:
      'ITI graduate and skilled Full Stack Web Developer with a passion for software development.',
    summary:
      'Seeking entry-level opportunities to apply technical expertise in MEAN stack, back-end and front-end programming, and mobile app development.',
  },
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About Me', href: '#about' },
    { label: 'Portfolio', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: "Hey! I'm Salama",
    headline: 'Building practical full-stack products with clean engineering fundamentals.',
    primaryCta: { label: 'View Projects', href: '#projects' },
    secondaryCta: { label: 'Contact Me', href: '#contact' },
    keyFacts: [
      { label: 'Programming Languages', value: '5' },
      { label: 'Years Experience', value: '2' },
      { label: 'Frameworks', value: '7' },
    ],
  },
  projects: {
    featured: [
      {
        title: 'IntervueAI',
        category: 'AI/ML',
        description:
          'Real-time mock interviews with AI, no forms or clicks just natural, personalized conversations.',
        stack: ['React', 'Node.js', 'OpenAI', 'WebRTC', 'MongoDB'],
        links: { repo: 'https://github.com/Salama-Malek/IntervueAI', live: null },
      },
      {
        title: 'E-Commerce Platform',
        category: 'Full Stack',
        description:
          'Full-featured online marketplace with advanced payment processing and inventory management.',
        stack: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'Stripe'],
        links: { repo: 'https://github.com/Salama-Malek/ECommerce-Platform', live: null },
      },
      {
        title: 'TaskFlow Manager',
        category: 'Web App',
        description:
          'Collaborative project management tool with real-time updates and team communication features.',
        stack: ['React', 'Socket.io', 'PostgreSQL', 'Express.js', 'Redis'],
        links: { repo: 'https://github.com/Salama-Malek/TaskFlow-Manager', live: null },
      },
    ],
    additional: [
      {
        title: 'Weather Analytics Dashboard',
        category: 'Data Viz',
        stack: ['D3.js', 'Python', 'Flask', 'Chart.js', 'OpenWeather API'],
        links: { repo: 'https://github.com/Salama-Malek/Weather-Analytics', live: null },
      },
      {
        title: 'Social Media Analytics',
        category: 'Analytics',
        stack: ['React', 'Python', 'Django', 'TensorFlow', 'PostgreSQL'],
        links: { repo: 'https://github.com/Salama-Malek/Social-Analytics', live: null },
      },
      {
        title: 'Mobile Fitness Tracker',
        category: 'Mobile',
        stack: ['React Native', 'Firebase', 'Node.js', 'TensorFlow Lite'],
        links: { repo: 'https://github.com/Salama-Malek/Fitness-Tracker', live: null },
      },
    ],
  },
  experience: [
    {
      role: 'Full Stack Web Developer',
      company: 'Freelance',
      duration: '2022 — Present',
      highlights: [
        'Delivered full-stack web applications with modern front-end and back-end technologies.',
        'Built responsive user interfaces with React and Angular while integrating scalable APIs.',
        'Collaborated directly with clients to gather requirements and ship production-ready features.',
      ],
    },
  ],
  skills: {
    frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular'],
    backend: ['Node.js', 'Express.js', 'Django', 'Laravel', 'Ruby on Rails'],
    mobile: ['React Native', 'Android'],
    tools: ['Git', 'GitHub', 'Docker', 'Postman'],
    cloud: ['AWS', 'REST APIs', 'JWT', 'Web Security'],
  },
  contact: {
    title: "Let's Discuss Your Project",
    subtitle:
      'Available for freelancing if the right project comes along. Feel free to contact me to discuss your web development needs.',
    email: 'hello@sm4tech.com',
    phone: '+7 993 287 3992',
    methods: [
      { label: 'Email', href: 'mailto:hello@sm4tech.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/salama-malek' },
      { label: 'GitHub', href: 'https://github.com/Salama-Malek' },
      { label: 'Khamsat', href: 'https://khamsat.com/user/salamamalek' },
    ],
  },
  footer: {
    description:
      'A passionate full-stack developer dedicated to building innovative and user-friendly web applications.',
    copyright: '© 2024 All rights reserved',
  },
};
