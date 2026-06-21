export type FeaturedProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  stack: string[];
  accent: "mirai" | "cyan";
  eyebrow: string;
  year: string;
  role: string;
  summary: string;
  challenge: string;
  process: string[];
  systemDesign: string[];
  outcomes: string[];
  deliverables: string[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "01",
    slug: "marvel-x-jimjam",
    title: "Marvel x JimJam",
    description: "Mobile WebAR system with on-device inference, spatial overlays, and adaptive interaction loops.",
    stack: ["WebXR", "ONNX", "Three.js", "Edge CV"],
    accent: "mirai",
    eyebrow: "Immersive Commerce",
    year: "2025",
    role: "Spatial Product Engineer",
    summary:
      "Built a campaign-grade mobile WebAR experience that paired branded character moments with lightweight on-device computer vision and responsive 3D overlays.",
    challenge:
      "The system had to feel cinematic on commodity phones while staying resilient to unstable lighting, variable camera permissions, and short-form user attention.",
    process: [
      "Mapped the interaction loop from landing, camera onboarding, scan trigger, scene activation, and reward reveal.",
      "Optimized the asset pipeline so tracking, rendering, and audio fit within a mobile-first performance budget.",
      "Used staged prototypes to validate recognition confidence thresholds and interaction pacing before full visual polish."
    ],
    systemDesign: [
      "Client-side WebXR scene graph with lightweight state orchestration for onboarding, detection, and reward states.",
      "On-device inference layer feeding pose or marker confidence into overlay placement and animation triggers.",
      "Analytics hooks tracking funnel completion, scan success rate, dwell time, and replay behavior."
    ],
    outcomes: [
      "Reduced friction between campaign entry and spatial interaction by keeping the full experience browser-native.",
      "Maintained responsive overlays across a broad range of handset performance tiers.",
      "Created a reusable launch pattern for future branded WebAR activations."
    ],
    deliverables: ["Interaction architecture", "Runtime optimization", "Launch analytics", "Spatial UI system"]
  },
  {
    id: "02",
    slug: "nbv-bench",
    title: "NBV-Bench",
    description: "Next-best-view planning lab with coverage metrics, point cloud evaluation, and visualization tooling.",
    stack: ["3D Vision", "SLAM", "C++", "Python"],
    accent: "cyan",
    eyebrow: "3D Vision Research",
    year: "2024",
    role: "Vision Systems Developer",
    summary:
      "Designed a research bench for evaluating next-best-view strategies with consistent coverage metrics, reproducible scenes, and interpretable debugging output.",
    challenge:
      "Researchers needed a single environment where planning policies, sensor movement, and reconstruction quality could be compared without bespoke evaluation tooling per experiment.",
    process: [
      "Structured the benchmark around repeatable scene presets, sensor constraints, and evaluation checkpoints.",
      "Built visualization passes for point-cloud accumulation, unseen-surface heatmaps, and planner intent.",
      "Validated metric consistency across synthetic and semi-real capture runs."
    ],
    systemDesign: [
      "Planner core in C++ for simulation speed with Python orchestration for experiment control and analysis.",
      "Metric layer computing coverage, overlap efficiency, reconstruction confidence, and move-cost tradeoffs.",
      "Visualization module exposing planner decisions as overlays for rapid qualitative review."
    ],
    outcomes: [
      "Made planning-policy comparisons faster and easier to explain to both research and product stakeholders.",
      "Improved experiment reproducibility with standardized scenario and metric definitions.",
      "Created a foundation for integrating active perception methods into production robotics pipelines."
    ],
    deliverables: ["Benchmark framework", "Coverage metrics", "Planner visualizer", "Experiment reports"]
  },
  {
    id: "03",
    slug: "agentcorp",
    title: "AgentCorp",
    description: "Agent observability chamber for multi-agent operations, risk simulation, and policy enforcement.",
    stack: ["LLM Ops", "Multi-Agent", "Telemetry", "Security"],
    accent: "mirai",
    eyebrow: "Agent Infrastructure",
    year: "2025",
    role: "AI Systems Product Lead",
    summary:
      "Created an observability and control surface for multi-agent workflows, focused on runtime visibility, failure tracing, and governance boundaries.",
    challenge:
      "As agent chains grow, teams lose visibility into tool usage, escalation paths, and policy drift. The system needed to expose those flows without slowing execution.",
    process: [
      "Mapped critical operator workflows across agent launch, tool execution, exception handling, and human override.",
      "Defined a telemetry grammar for prompts, tool calls, state transitions, and safety events.",
      "Designed dashboards and chamber cards that surfaced system state without overwhelming operators."
    ],
    systemDesign: [
      "Event pipeline aggregating agent decisions, tool traces, and guardrail outcomes into session timelines.",
      "Policy layer attaching permissions, red-team checks, and escalation requirements to agent actions.",
      "UI chamber translating logs and metrics into operator-readable states, risk signals, and intervention controls."
    ],
    outcomes: [
      "Reduced investigation time for failed agent runs through structured event traces.",
      "Made policy enforcement visible instead of hidden inside backend middleware.",
      "Established a design language for agent operations interfaces and risk simulation."
    ],
    deliverables: ["Telemetry schema", "Operations dashboard", "Policy controls", "Failure analysis flows"]
  },
  {
    id: "04",
    slug: "ibm-quantum-vision-pro",
    title: "IBM Quantum Vision Pro",
    description: "Spatial storytelling prototype for quantum infrastructure with layered visual systems.",
    stack: ["Vision Pro", "Realtime 3D", "UIKit", "XR"],
    accent: "cyan",
    eyebrow: "Spatial Storytelling",
    year: "2024",
    role: "XR Experience Designer",
    summary:
      "Developed a Vision Pro prototype translating abstract quantum infrastructure into a guided spatial narrative with layered UI, volumetric motion, and explainable moments.",
    challenge:
      "Quantum infrastructure is difficult to explain visually. The experience had to teach without flattening the subject into static slides or dense terminology.",
    process: [
      "Turned technical concepts into narrative beats that could be placed in space and explored progressively.",
      "Balanced volumetric scene depth with readable 2D support panels for context and control.",
      "Iterated on gesture-friendly pacing to keep the flow legible inside a headset environment."
    ],
    systemDesign: [
      "Scene composition layer separating volumetric hero content, informational panes, and state-driven callouts.",
      "Interaction model for gaze, dwell, and gesture triggers across explanatory sequences.",
      "Content pipeline supporting modular story chapters and reusable spatial components."
    ],
    outcomes: [
      "Improved comprehension of a complex technical system through spatial sequencing.",
      "Created reusable patterns for enterprise storytelling on spatial hardware.",
      "Provided a foundation for future headset-native technical demos."
    ],
    deliverables: ["Narrative map", "Vision Pro prototype", "Spatial UI kit", "Presentation flow"]
  },
  {
    id: "05",
    slug: "physical-ai-simulation-systems",
    title: "Physical AI Simulation Systems",
    description: "Digital twin simulation suite for embodied AI validation and robotics decision systems.",
    stack: ["Simulation", "Robotics", "Digital Twin", "Sensors"],
    accent: "mirai",
    eyebrow: "Embodied Intelligence",
    year: "2025",
    role: "Simulation Systems Architect",
    summary:
      "Built a digital-twin oriented simulation environment for evaluating embodied AI behaviors, sensor assumptions, and downstream decision policies before physical deployment.",
    challenge:
      "Robotics teams needed faster confidence in policy behavior across environments, but hardware iteration was expensive and sensor assumptions often broke late.",
    process: [
      "Defined scenario libraries covering nominal tasks, environmental noise, and edge-case failures.",
      "Connected sensor abstractions to behavior evaluation so teams could inspect perception-policy coupling.",
      "Structured review outputs around operator-readable system states instead of raw simulator logs."
    ],
    systemDesign: [
      "Simulation core integrating robot state, environment models, and sensor emulation into a unified runtime.",
      "Decision-evaluation layer comparing policy outcomes against safety, efficiency, and recovery thresholds.",
      "Twin interfaces for replay, debugging, and scenario parameter sweeps."
    ],
    outcomes: [
      "Shortened iteration loops before hardware trials by moving validation earlier into simulation.",
      "Exposed perception and policy mismatches in a format that engineering and product teams could both act on.",
      "Improved confidence in embodied system deployment readiness."
    ],
    deliverables: ["Scenario library", "Sensor simulation", "Replay tooling", "Validation dashboards"]
  }
];
