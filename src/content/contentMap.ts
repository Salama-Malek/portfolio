export type PortfolioContentMap = {
  person: {
    name: string;
    title: string;
    shortTagline: string;
    aboutShort: string;
    aboutLong: string;
  };
  contact: {
    emails: string[];
    phone: string;
    links: {
      linkedin: string | null;
      khamsat: string | null;
      github: string | null;
    };
  };
  nav: {
    home: string;
    about: string;
    portfolio: string;
    experience: string;
    testimonials: string;
    contact: string;
  };
  stats: Array<{ label: string; value: number }>;
  sections: {
    hero: {
      eyebrow: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    about: { miniTitle: string; title: string };
    portfolio: { miniTitle: string; title: string; viewProject: string };
    experience: { miniTitle: string; title: string };
    testimonials: { miniTitle: string; title: string; empty: string };
    contact: { miniTitle: string; title: string; subtitle: string };
    footer: { description: string; copyright: string };
  };
  projects: Array<{
    title: string;
    type: string;
    description: string;
    technologies: string[];
    liveDemoUrl: string | null;
    githubUrl: string | null;
  }>;
  experience: Array<{
    company: string;
    role: string;
    start: string;
    end: string;
    bullets: string[];
  }>;
  education: Array<{
    institution: string;
    program: string;
    years: string;
  }>;
  skills: {
    frontend: string[];
    backend: string[];
    mobile: string[];
    db: string[];
    tools: string[];
    cloudAndSecurity: string[];
  };
  testimonials: Array<{ name: string; quote: string }>;
};

// NOTE: Source text is intentionally constrained to existing repository content.
export const contentMap: PortfolioContentMap = {
  person: {
    name: 'Salama Malek',
    title: 'Full Stack Web Developer',
    shortTagline:
      'ITI graduate and skilled Full Stack Web Developer with a passion for software development.',
    aboutShort:
      'Seeking entry-level opportunities to apply technical expertise in MEAN stack, back-end and front-end programming, and mobile app development.',
    aboutLong:
      "Committed to delivering innovative solutions and fostering growth in dynamic and collaborative environments. I specialize in MEAN stack development, but I'm also proficient in other technologies like Laravel, Ruby on Rails, and Django.",
  },
  contact: {
    emails: ['hello@sm4tech.com', 'salamahassanein@gmail.com'],
    phone: '+7 993 287 3992',
    links: {
      linkedin: 'https://www.linkedin.com/in/salama-malek',
      khamsat: 'https://khamsat.com/user/salamamalek',
      github: 'https://github.com/Salama-Malek',
    },
  },
  nav: {
    home: 'Home',
    about: 'About Me',
    portfolio: 'Portfolio',
    experience: 'Experience',
    testimonials: 'Testimonials',
    contact: 'Contact',
  },
  stats: [
    { label: 'Programming Languages', value: 5 },
    { label: 'Years Experience', value: 2 },
    { label: 'Frameworks', value: 7 },
  ],
  sections: {
    hero: {
      eyebrow: "Hey! I'm Salama",
      ctaPrimary: 'Recent Projects',
      ctaSecondary: 'Get in touch',
    },
    about: {
      miniTitle: 'About Me',
      title: 'Available for Full Stack Projects',
    },
    portfolio: {
      miniTitle: 'My Work',
      title: 'Recent Projects',
      viewProject: 'View project ↗',
    },
    experience: {
      miniTitle: 'Experience',
      title: 'My Work Experience',
    },
    testimonials: {
      miniTitle: 'Testimonials',
      title: 'What Clients Say About My Work',
      empty: 'Coming soon',
    },
    contact: {
      miniTitle: 'Contact',
      title: "Let's Discuss Your Project",
      subtitle:
        'Available for freelancing if the right project comes along. Feel free to contact me to discuss your web development needs.',
    },
    footer: {
      description:
        'A passionate full-stack developer dedicated to building innovative and user-friendly web applications.',
      copyright: '© 2024 All rights reserved',
    },
  },
  projects: [
    {
      title: 'IntervueAI',
      type: 'AI/ML',
      description:
        'Real-time mock interviews with AI, no forms or clicks just natural, personalized conversations.',
      technologies: ['React', 'Node.js', 'OpenAI', 'WebRTC', 'MongoDB'],
      liveDemoUrl: null,
      githubUrl: 'https://github.com/Salama-Malek/IntervueAI',
    },
    {
      title: 'E-Commerce Platform',
      type: 'Full Stack',
      description:
        'Full-featured online marketplace with advanced payment processing and inventory management.',
      technologies: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'Stripe'],
      liveDemoUrl: null,
      githubUrl: 'https://github.com/Salama-Malek/ECommerce-Platform',
    },
    {
      title: 'TaskFlow Manager',
      type: 'Web App',
      description:
        'Collaborative project management tool with real-time updates and team communication features.',
      technologies: ['React', 'Socket.io', 'PostgreSQL', 'Express.js', 'Redis'],
      liveDemoUrl: null,
      githubUrl: 'https://github.com/Salama-Malek/TaskFlow-Manager',
    },
    {
      title: 'Weather Analytics Dashboard',
      type: 'Data Viz',
      description:
        'Advanced weather data visualization with predictive analytics and interactive charts.',
      technologies: ['D3.js', 'Python', 'Flask', 'Chart.js', 'OpenWeather API'],
      liveDemoUrl: null,
      githubUrl: 'https://github.com/Salama-Malek/Weather-Analytics',
    },
    {
      title: 'Social Media Analytics',
      type: 'Analytics',
      description:
        'Comprehensive social media monitoring and analytics platform with sentiment analysis.',
      technologies: ['React', 'Python', 'Django', 'TensorFlow', 'PostgreSQL'],
      liveDemoUrl: null,
      githubUrl: 'https://github.com/Salama-Malek/Social-Analytics',
    },
    {
      title: 'Mobile Fitness Tracker',
      type: 'Mobile',
      description:
        'Cross-platform fitness tracking application with personalized workout plans and health insights.',
      technologies: ['React Native', 'Firebase', 'Node.js', 'TensorFlow Lite'],
      liveDemoUrl: null,
      githubUrl: 'https://github.com/Salama-Malek/Fitness-Tracker',
    },
  ],
  experience: [
    {
      company: 'Freelance',
      role: 'Full Stack Web Developer',
      start: '2022',
      end: 'Present',
      bullets: [
        'Delivered full-stack web applications with modern front-end and back-end technologies.',
        'Built responsive user interfaces with React and Angular while integrating scalable APIs.',
        'Collaborated directly with clients to gather requirements and ship production-ready features.',
      ],
    },
  ],
  education: [
    {
      institution: 'Information Technology Institute (ITI)',
      program: 'Full Stack Web Development Program',
      years: '2022',
    },
  ],
  skills: {
    frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular'],
    backend: ['Node.js', 'Express.js', 'Django', 'Laravel', 'Ruby on Rails'],
    mobile: ['React Native', 'Android'],
    db: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
    tools: ['Git', 'GitHub', 'Docker', 'Postman'],
    cloudAndSecurity: ['AWS', 'REST APIs', 'JWT', 'Web Security'],
  },
  testimonials: [],
};
