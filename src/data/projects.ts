export type FeaturedProject = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  accent: "mirai" | "cyan";
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "01",
    title: "Marvel x JimJam",
    description: "Mobile WebAR system with on-device inference, spatial overlays, and adaptive interaction loops.",
    stack: ["WebXR", "ONNX", "Three.js", "Edge CV"],
    accent: "mirai"
  },
  {
    id: "02",
    title: "NBV-Bench",
    description: "Next-best-view planning lab with coverage metrics, point cloud evaluation, and visualization tooling.",
    stack: ["3D Vision", "SLAM", "C++", "Python"],
    accent: "cyan"
  },
  {
    id: "03",
    title: "AgentCorp",
    description: "Agent observability chamber for multi-agent operations, risk simulation, and policy enforcement.",
    stack: ["LLM Ops", "Multi-Agent", "Telemetry", "Security"],
    accent: "mirai"
  },
  {
    id: "04",
    title: "IBM Quantum Vision Pro",
    description: "Spatial storytelling prototype for quantum infrastructure with layered visual systems.",
    stack: ["Vision Pro", "Realtime 3D", "UIKit", "XR"],
    accent: "cyan"
  },
  {
    id: "05",
    title: "Physical AI Simulation Systems",
    description: "Digital twin simulation suite for embodied AI validation and robotics decision systems.",
    stack: ["Simulation", "Robotics", "Digital Twin", "Sensors"],
    accent: "mirai"
  }
];
