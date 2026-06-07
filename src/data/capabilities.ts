export type Capability = {
  id: string;
  title: string;
  description: string;
};

export const capabilities: Capability[] = [
  {
    id: "01",
    title: "XR / AR / VR",
    description: "Multi-device spatial interfaces with immersive navigation and interaction systems."
  },
  {
    id: "02",
    title: "Computer Vision",
    description: "Perception pipelines, neural sensing, and real-time inference orchestration."
  },
  {
    id: "03",
    title: "3D Web Experiences",
    description: "High-performance WebGL and R3F worlds built for browsers and immersive platforms."
  },
  {
    id: "04",
    title: "AI Agents",
    description: "Autonomous orchestration, intelligence routing, and contextual toolchains."
  },
  {
    id: "05",
    title: "Physical AI Simulation",
    description: "Digital twin environments for robotics, embodied AI, and system validation."
  },
  {
    id: "06",
    title: "Real-time Interaction Systems",
    description: "Responsive sensor-driven pipelines for gesture, spatial, and multimodal UX."
  }
];
