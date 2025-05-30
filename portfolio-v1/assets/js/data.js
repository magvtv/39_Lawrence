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
            type: 'projects'
        },
        {
            date: '2024-02-20',
            title: 'Digital Identity Management Symposium',
            description: 'Leading discussions on the future of digital identity management systems.',
            link: '#',
            type: 'projects'
        }
    ],
    publications: [
        {
            date: '2024-03-01',
            title: 'Fuzzy Logic in Context-Aware Systems',
            description: 'Research paper on implementing fuzzy logic in modern context-aware applications.',
            link: '#',
            type: 'publications'
        },
        {
            date: '2024-01-15',
            title: 'Digital Identity Management Systems Review',
            description: 'Comprehensive review of current digital identity management system models.',
            link: '#',
            type: 'publications'
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
  }
];

// Make customData available globally for non-module scripts
window.customData = customData;

// Export customData as well for module use
export { customData }; 