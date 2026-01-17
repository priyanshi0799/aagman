export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  chips?: string[];
  agentName?: string;
  hideHeader?: boolean;
}

export interface LoadingMessage {
  id: string;
  role: "assistant";
  isLoading: true;
}

export interface HandoffMessage {
  id: string;
  role: "assistant";
  isHandoff: true;
  content: string;
}

export type ChatMessage = Message | LoadingMessage | HandoffMessage;
