import { Project } from "@/lib/types/project";

export const projects: Project[] = [
  {
    id: "trust-laundry",
    title: "Trust Laundry",
    category: "Mobile App",
    description: "A laundry management system with mobile app for efficient service management and customer tracking. Includes real-time updates and cloud integration.",
    fullDescription: "Trust Laundry is a comprehensive laundry management system featuring a mobile application that streamlines service management and customer tracking. The platform provides real-time order updates, cloud-based data synchronization, and an intuitive admin dashboard for business operations.",
    features: ["Real-time Tracking", "Payment Integration", "Admin Dashboard"],
    techStack: [
      { name: "Flutter", color: "text-accent-green bg-accent-green/10" },
      { name: "Firebase", color: "text-accent-red bg-accent-red/10" },
      { name: "Node.js", color: "text-accent-green bg-accent-green/10" },
    ],
    previewImage: "/images/trust-laundry.png",
    links: { github: "https://github.com/" },
  },
  {
    id: "deliveryx-driver",
    title: "DeliveryX Driver",
    category: "Mobile App",
    description: "Delivery management system connecting customers and drivers with real-time package tracking and route optimization.",
    fullDescription: "DeliveryX Driver is a delivery management platform that connects customers with drivers through real-time package tracking and intelligent route optimization. The system ensures efficient delivery operations with multi-platform support.",
    features: ["Route Optimization", "Multi-platform"],
    techStack: [
      { name: "Flutter", color: "text-accent-green bg-accent-green/10" },
      { name: "Node.js", color: "text-accent-green bg-accent-green/10" },
      { name: "PostgreSQL", color: "text-accent-blue bg-accent-blue/10" },
    ],
    previewImage: "/images/deliveryx-driver.png",
    links: { github: "https://github.com/" },
  },
  {
    id: "esidea",
    title: "Esidea",
    category: "Web App",
    description: "Innovation platform for ESI school community to share ideas, collaborate on projects, and manage student initiatives.",
    fullDescription: "Esidea is an innovation platform designed for the ESI school community, enabling students to share ideas, collaborate on projects in real-time, and manage student-led initiatives. The platform features live collaboration tools and a project showcase gallery.",
    features: ["Real-time Collaboration", "Project Showcase"],
    techStack: [
      { name: "React", color: "text-accent-blue bg-accent-blue/10" },
      { name: "Node.js", color: "text-accent-green bg-accent-green/10" },
      { name: "Socket.io", color: "text-muted bg-muted/10" },
    ],
    previewImage: "/images/esidea.png",
    links: { github: "https://github.com/" },
  },
  {
    id: "comerco",
    title: "Comerco",
    category: "Mobile App",
    description: "E-store mobile app with online payment, smart notification and recommendation system based on user behavior.",
    fullDescription: "Comerco is a feature-rich e-commerce mobile application offering online payment processing, intelligent push notifications, and a personalized recommendation engine powered by user behavior analytics. The app includes inventory management tools for sellers.",
    features: ["Smart Notifications", "Inventory Management"],
    techStack: [
      { name: "Flutter", color: "text-accent-green bg-accent-green/10" },
      { name: "Firebase", color: "text-accent-red bg-accent-red/10" },
      { name: "Stripe", color: "text-accent-purple bg-accent-purple/10" },
    ],
    previewImage: "/images/comerco.png",
    links: { github: "https://github.com/" },
  },
];
