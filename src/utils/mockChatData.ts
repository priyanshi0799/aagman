import type { ChatMessage } from "@/types/message";

/**
 * Initial welcome message shown when chat loads
 */
export const welcomeMessage = {
  sections: [
    {
      type: "greeting" as const,
      content: "Welcome to TradeFlow AI - Your Multi-Agent Trading Team! 👋",
    },
    {
      type: "intro" as const,
      content:
        "I'm your Orchestrator, and I coordinate our team of specialist agents:",
    },
    {
      type: "list" as const,
      items: [
        "🎯 Profile Discovery - Finds your perfect trading style (3×3×3)",
        "📊 Strategy Architect - Designs your trading strategy",
        "🔍 Stock Hunter - Scans for opportunities",
        "⚡ Execution Planner - Creates risk-validated trade plans",
      ],
    },
    {
      type: "callToAction" as const,
      content: "To get started: Just tell me what you'd like to do!",
      options: [
        'New to trading? Say "start" or "begin"',
        "Have experience? Tell me where you'd like to jump in",
        "Know what you want? Just ask!",
      ],
    },
    {
      type: "question" as const,
      content: "How can I help you today?",
    },
  ],
};

/**
 * Bot response flows for different user interactions
 */
export const botResponses = {
  initialResponse: {
    message:
      "Great! To get you started on your trading journey, we need to discover your trading profile using our 3×3×3 framework. This will help us tailor everything to your style and goals.\n\nLet me connect you with our Profile Discovery Agent who will guide you through this quick process.",
    delay: 2000, // milliseconds before showing response
  },

  handoffMessage: {
    content: "Handing off to Profile Discovery Agent...",
    delay: 500, // milliseconds after main response
    duration: 2000, // milliseconds to show handoff animation
  },

  profileDiscoveryQuestions: [
    {
      id: "goal",
      question:
        "Welcome! Let me help you find your perfect trading style.\n\nFirst question: What's your main goal - Making Money, Saving Money, or Saving Time?",
      chips: ["Making Money", "Saving Money", "Saving Time"],
      hideHeader: true,
      agentName: undefined,
    },
    {
      id: "style",
      question:
        "Great choice! Now, tell me—how would you describe your trading style?\n\nAre you more",
      chips: ["Quick and Active", "Patient and Steady", "Set and Forget"],
      hideHeader: false,
      agentName: "{Profile Discovery Agent...}",
      modalTriggers: [
        "Quick and Active",
        "Patient and Steady",
        "Set and Forget",
      ], // These chips open the modal
    },
  ],
};

/**
 * Function to generate bot messages based on conversation flow
 */
export const generateBotResponse = (
  userMessage: string,
  conversationStep: number
): {
  messages: Array<Partial<ChatMessage> & { isHandoff?: boolean }>;
  nextStep: number;
} => {
  // First user message
  if (conversationStep === 0) {
    return {
      messages: [
        {
          role: "assistant",
          content: botResponses.initialResponse.message,
          timestamp: new Date(),
        },
        {
          role: "assistant",
          isHandoff: true,
          content: botResponses.handoffMessage.content,
        },
        {
          role: "assistant",
          content: botResponses.profileDiscoveryQuestions[0].question,
          timestamp: new Date(),
          chips: botResponses.profileDiscoveryQuestions[0].chips,
          hideHeader: botResponses.profileDiscoveryQuestions[0].hideHeader,
          agentName: botResponses.profileDiscoveryQuestions[0].agentName,
        },
      ],
      nextStep: 1,
    };
  }

  // Second question (trading style)
  if (conversationStep === 1) {
    return {
      messages: [
        {
          role: "assistant",
          content: botResponses.profileDiscoveryQuestions[1].question,
          timestamp: new Date(),
          chips: botResponses.profileDiscoveryQuestions[1].chips,
          hideHeader: botResponses.profileDiscoveryQuestions[1].hideHeader,
          agentName: botResponses.profileDiscoveryQuestions[1].agentName,
        },
      ],
      nextStep: 2,
    };
  }

  // Default fallback
  return {
    messages: [
      {
        role: "assistant",
        content:
          "Thank you for your response. Our agents are processing your information.",
        timestamp: new Date(),
      },
    ],
    nextStep: conversationStep + 1,
  };
};

/**
 * Helper to check if a chip should trigger the modal
 */
export const shouldOpenModal = (chip: string): boolean => {
  return botResponses.profileDiscoveryQuestions.some((question) =>
    question.modalTriggers?.includes(chip)
  );
};

/**
 * Timing configurations for chat interactions
 */
export const chatTiming = {
  loadingDelay: 2000, // Delay before showing bot response
  handoffDelay: 500, // Delay before showing handoff message
  handoffDuration: 2000, // Duration of handoff animation
};
