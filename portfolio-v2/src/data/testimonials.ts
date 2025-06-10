export interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  content: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Fourth Year Student",
    organization: "Jomo Kenyatta University",
    content: "Dr. Lawrence's mentorship has been transformative. His practical approach to teaching and deep industry knowledge helped me bridge the gap between academic concepts and real-world applications. His guidance has been instrumental in shaping my career path in technology.",
    image: "/testimonials/student.jpg"
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "Senior Frontend Developer",
    organization: "Microsoft",
    content: "Having worked with Dr. Lawrence on several projects, I can attest to his exceptional technical expertise and leadership skills. His innovative teaching methods and commitment to excellence have produced graduates who excel in the tech industry.",
    image: "/testimonials/microsoft-dev.jpg"
  },
  {
    id: 3,
    name: "Dr. James Kamau",
    role: "Fellow Lecturer",
    organization: "Computer Science Department",
    content: "Dr. Lawrence's dedication to academic excellence and student success is unmatched. His integration of cutting-edge technology in teaching has revolutionized our department's approach to computer science education.",
    image: "/testimonials/lecturer.jpg"
  },
  {
    id: 4,
    name: "Dr. Yuki Tanaka",
    role: "Chief Executive",
    organization: "Japan-PAUSTI AICAN",
    content: "Dr. Lawrence's contributions to AI research and international collaboration have been remarkable. His work has strengthened the bridge between African and Japanese technological innovation.",
    image: "/testimonials/aican-ceo.jpg"
  },
  {
    id: 5,
    name: "Peter Ndegwa",
    role: "Managing Director",
    organization: "Safaricom",
    content: "Dr. Lawrence's expertise in technology and leadership has produced exceptional talent that continues to drive innovation in Kenya's tech sector. His graduates are among our most valued employees.",
    image: "/testimonials/safaricom-md.jpg"
  }
]; 