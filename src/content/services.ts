import {
  IconAccessPoint,
  IconBrain,
  IconCode,
  IconCpu,
  IconDeviceDesktopCog,
  IconShieldLock,
  type Icon,
} from "@tabler/icons-react"

// Maturity labels keep current capabilities distinct from future directions (blueprint §9).
// Confirm each status with the team before launch.
export const statusLabels = {
  core: "Core capability",
  scoped: "Scoped per project",
  expanding: "Expanding capability",
  exploring: "Area of exploration",
} as const

export type ServiceStatus = keyof typeof statusLabels

export type Service = {
  id: string
  title: string
  icon: Icon
  status: ServiceStatus
  /** Short description used on the home page. */
  teaser: string
  linkLabel: string
  summary: string
  body: string[]
  areasLabel?: string
  areas?: string[]
}

export const services: Service[] = [
  {
    id: "embedded-systems",
    title: "Embedded Systems Engineering",
    icon: IconCpu,
    status: "core",
    teaser:
      "We design and develop embedded systems, electronic devices and hardware-based solutions, from microcontroller applications to specialized embedded products.",
    linkLabel: "Explore Embedded Systems",
    summary:
      "Hardware-focused engineering for devices and applications that interact with the physical world.",
    body: [
      "We design and develop embedded systems, electronic devices and hardware-based solutions. From custom microcontroller projects to complete embedded applications, we work on products for commercial use and specialized engineering projects for clients.",
    ],
    areasLabel: "Potential areas of work",
    areas: [
      "Microcontroller-based applications",
      "Embedded hardware and firmware development",
      "Electronic device prototyping",
      "Hardware and software integration",
      "Embedded product development",
    ],
  },
  {
    id: "software-development",
    title: "Software Development",
    icon: IconCode,
    status: "core",
    teaser:
      "We build software applications, backend systems and custom digital solutions designed around specific business and operational requirements.",
    linkLabel: "Explore Software Development",
    summary:
      "Custom software designed to support products, businesses and operations.",
    body: [
      "We design, develop and maintain software applications and digital solutions. Our work covers custom software programmes, backend systems, application development and software solutions tailored to specific business and operational requirements.",
    ],
    areasLabel: "Potential areas of work",
    areas: [
      "Web application development",
      "Backend systems and APIs",
      "Custom business software",
      "Application development",
      "Software integration and maintenance",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: IconShieldLock,
    status: "scoped",
    teaser:
      "We explore and develop solutions that help improve digital security, protect systems and strengthen the resilience of technological infrastructure.",
    linkLabel: "Explore Cybersecurity",
    summary:
      "Technology and practices focused on strengthening digital security.",
    body: [
      "We explore and develop cybersecurity solutions focused on improving digital security, protecting systems and strengthening the resilience of technological infrastructure.",
    ],
    areasLabel: "Potential areas of work",
    areas: [
      "Security-focused software development",
      "System security research",
      "Security-conscious application architecture",
      "Cybersecurity tools and solution development",
    ],
  },
  {
    id: "technology-solutions",
    title: "Computer and Technology Solutions",
    icon: IconDeviceDesktopCog,
    status: "scoped",
    teaser:
      "We bring together computing, hardware, software and system-level knowledge to address a range of technical and operational challenges.",
    linkLabel: "Explore Technology Solutions",
    summary:
      "Practical computing and system-level solutions for technical challenges.",
    body: [
      "We provide technology-oriented engineering and computing solutions, bringing together hardware, software and system-level expertise to address diverse technical challenges.",
      "If your challenge doesn't fit neatly into one of our other areas, tell us about it and we'll discuss whether we can help.",
    ],
  },
  {
    id: "iot",
    title: "Internet of Things (IoT) and Intelligent Systems",
    icon: IconAccessPoint,
    status: "expanding",
    teaser:
      "We develop connected-technology capabilities that enable devices, sensors and systems to communicate, exchange information and support intelligent operations.",
    linkLabel: "Explore IoT Solutions",
    summary:
      "Connected devices and systems that exchange information and support intelligent operations.",
    body: [
      "We are expanding into connected technologies, developing IoT solutions that enable devices, sensors and systems to communicate, exchange information and perform intelligent operations.",
    ],
    areasLabel: "Potential areas of exploration",
    areas: [
      "Connected device concepts",
      "Sensor-based systems",
      "Device-to-platform communication",
      "Hardware and software integration",
      "Monitoring and automation systems",
    ],
  },
  {
    id: "ai-hardware",
    title: "Artificial Intelligence and Intelligent Hardware",
    icon: IconBrain,
    status: "exploring",
    teaser:
      "We are exploring the integration of AI with embedded platforms, connected devices and specialized computing hardware to create practical intelligent systems.",
    linkLabel: "Explore Intelligent Systems",
    summary:
      "Exploring the intersection of AI, embedded engineering and specialized hardware.",
    body: [
      "Our future direction includes integrating Artificial Intelligence into connected devices, embedded platforms and dedicated hardware. We aim to explore intelligent systems that combine AI models, specialized computing hardware and embedded engineering to create practical, autonomous and innovative solutions.",
      "This is an area of research and future development. We'll introduce specific services and products here once they are ready.",
    ],
    areasLabel: "Potential areas of exploration",
    areas: [
      "AI-enabled embedded devices",
      "Edge AI concepts",
      "Intelligent hardware platforms",
      "AI and sensor integration",
      "Autonomous and connected systems",
    ],
  },
]
