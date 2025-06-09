/**
 * Data module for the portfolio website
 * Contains project data, testimonials, and other content
 */

// Custom content data for feeds and updates
const customData = {
    projects: [
        {
            date: '2024-03-15',
            title: 'JHUB Africa Launch',
            description: 'Official launch of JHUB Africa, fostering tech talent and innovation in the region.',
            link: '#',
            image: './assets/images/interview-1.jpeg',
            type: 'projects'
        },
        {
            date: '2024-02-20',
            title: 'Digital Identity Management Symposium',
            description: 'Leading discussions on the future of digital identity management systems.',
            link: '#',
            image: './assets/images/interview-2.jpeg',
            type: 'projects'
        }
    ],
    publications: [
        {
            date: '2024-03-01',
            title: 'Fuzzy Logic in Context-Aware Systems',
            description: 'Research paper on implementing fuzzy logic in modern context-aware applications.',
            link: '#',
            image: './assets/images/philosophy.jpeg',
            type: 'publications'
        },
        {
            date: '2024-01-15',
            title: 'Digital Identity Management Systems Review',
            description: 'Comprehensive review of current digital identity management system models.',
            link: '#',
            image: './assets/images/interview-3.jpeg',
            type: 'publications'
        }
    ],
    linkedin: [
        {
            date: '2024-04-26',
            title: 'JKUAT, UoN Lead Kenyan Institutions in AI Research',
            description: 'The future of AI is here, and we are excited to be at the forefront of this transformative journey. Postgraduate research in AI must push the boundaries of innovation and discovery, focusing on advancing knowledge and equipping the next generation with skills to become leaders and entrepreneurs in the AI space.',
            link: 'https://www.linkedin.com/posts/dr-lawrence-nderu_jkuat-uon-lead-kenyan-institutions-in-ai-activity-7221058501840687104-V6dO',
            image: './assets/images/interview-1.jpeg',
            type: 'linkedin'
        },
        {
            date: '2023-05-30',
            title: 'Agent-Based Modeling Training at University of Nairobi',
            description: 'Facilitating a training session on Agent-Based Modeling at the University of Nairobi (UoN). This incredible opportunity allowed me to work alongside brilliant minds and eager learners, diving deep into the complexities of modelling infectious diseases. The African Population and Health Research Center (APHRC), CEMA, Gates Foundation, and JKUAT coordinated the training.',
            link: 'https://www.linkedin.com/posts/dr-lawrence-nderu_rethinking-health-cema-africa-activity-7186016660200243200-yML1',
            image: './assets/images/interview-2.jpeg',
            type: 'linkedin'
        },
        {
            date: '2023-03-15',
            title: 'AI-Powered Innovation in Healthcare',
            description: 'Exploring how artificial intelligence is revolutionizing healthcare delivery in Africa. From diagnostics to treatment recommendations, AI is helping overcome resource limitations and bring quality healthcare to underserved communities.',
            link: 'https://www.linkedin.com/in/dr-lawrence-nderu',
            image: './assets/images/interview-3.jpeg',
            type: 'linkedin'
        }
    ],
    articles: [
        {
            type: 'articles',
            title: 'Machine Learning in Healthcare',
            description: 'Exploring how ML algorithms are transforming diagnostic procedures and patient care in modern healthcare settings.',
            date: '2023-06-15',
            link: 'https://www.example.com/ml-healthcare',
            image: './assets/images/interview-1.jpeg'
        },
        {
            type: 'articles',
            title: 'Digital Identity Systems',
            description: 'A comprehensive review of modern approaches to digital identity management and their implications for privacy.',
            date: '2023-05-20',
            link: 'https://www.example.com/digital-identity',
            image: './assets/images/interview-2.jpeg'
        },
        {
            type: 'articles',
            title: 'Fuzzy Logic in Decision Systems',
            description: 'How fuzzy logic principles are being applied in decision support systems across various industries.',
            date: '2023-04-10',
            link: 'https://www.example.com/fuzzy-logic',
            image: './assets/images/interview-3.jpeg'
        }
    ],
    favorites: [
        {
            type: 'favorites',
            title: 'The Future of AI Ethics',
            description: 'A thought-provoking discussion on the ethical considerations in artificial intelligence development.',
            date: '2023-06-10',
            link: 'https://www.mittr.com/ai-ethics',
            image: './assets/images/philosophy.jpeg',
            source: 'MIT Technology Review'
        },
        {
            type: 'favorites',
            title: 'Blockchain in Education',
            description: 'How blockchain technology can revolutionize credential verification and educational record-keeping.',
            date: '2023-05-05',
            link: 'https://www.hbr.org/blockchain-education',
            image: './assets/images/interview-3.jpeg',
            source: 'Harvard Business Review'
        },
        {
            type: 'favorites',
            title: 'The Rise of African Tech Hubs',
            description: 'An analysis of the growing tech ecosystem across African nations and its global impact.',
            date: '2023-04-20',
            link: 'https://www.techcrunch.com/african-tech-hubs',
            image: './assets/images/interview-2.jpeg',
            source: 'TechCrunch'
        }
    ]
};

// Project data for the portfolio carousel
export const projectsData = [
  {
    id: 1,
    title: "2024 IDM Annual Symposium",
    subtitle: "Data Science, Global Health",
    image: "./assets/images/interview-1.jpeg",
    link: "#",
    description: "Annual symposium bringing together experts in infectious disease modeling"
  },
  {
    id: 2,
    title: "Official Launch of JHUB Africa",
    subtitle: "Tech Talent, Innovation",
    image: "./assets/images/interview-3.jpeg",
    link: "#",
    description: "Launch of JHUB Africa initiative to nurture tech talent across the continent"
  },
  {
    id: 3,
    title: "Humanizing Data Protection Laws",
    subtitle: "APHRC, Data Governance",
    image: "./assets/images/interview-2.jpeg",
    link: "#",
    description: "Research and advocacy work on human-centric data protection policies"
  },
  {
    id: 4,
    title: "AI for Healthcare Summit",
    subtitle: "Healthcare Tech, AI/ML",
    image: "./assets/images/interview-1.jpeg",
    link: "#",
    description: "Leading discussions on AI applications in healthcare delivery and research"
  },
  {
    id: 5,
    title: "Digital Identity Management Workshop",
    subtitle: "Security, Digital ID",
    image: "./assets/images/interview-3.jpeg",
    link: "#",
    description: "Workshop on secure and ethical digital identity management systems"
  },
  {
    id: 6,
    title: "ML Research Publication",
    subtitle: "Machine Learning, Academic",
    image: "./assets/images/interview-2.jpeg",
    link: "#",
    description: "Publication on ensemble classification methods for improved accuracy"
  },
  {
    id: 7,
    title: "African AI Forum 2024",
    subtitle: "Technology, Leadership",
    image: "./assets/images/philosophy.jpeg",
    link: "#",
    description: "Panel discussion on the future of AI development and implementation across Africa"
  },
  {
    id: 8,
    title: "Digital Identity Systems Conference",
    subtitle: "Privacy, Security",
    image: "./assets/images/interview-1.jpeg",
    link: "#",
    description: "International conference on modern approaches to secure digital identity systems"
  },
  {
    id: 9,
    title: "University Research Grant Award",
    subtitle: "Academic Funding, Research",
    image: "./assets/images/interview-3.jpeg",
    link: "#",
    description: "Secured major research grant for innovative work in machine learning applications"
  },
  {
    id: 10,
    title: "Tech Entrepreneurship Masterclass",
    subtitle: "Innovation, Startups",
    image: "./assets/images/interview-2.jpeg",
    link: "#",
    description: "Hosting a masterclass for aspiring tech entrepreneurs on building sustainable businesses"
  }
];

// Make customData available globally for non-module scripts
window.customData = customData;

// Export customData as well for module use
export { customData }; 