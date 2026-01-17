"use client";

import React, { useState, useRef, useEffect } from "react";
import { TabBar } from "@/components/TabBar";
import { MessageList } from "@/components/MessageList";
import { ChatInputArea } from "@/components/ChatInputArea";
import { ChatMessage } from "@/components/ChatMessage";
import { TradeMonitoringModal } from "@/components/TradeMonitoringModal";
import styles from "./ChatInterface.module.css";
import { LogoIcon } from "@/assets/icons";
import type { ChatMessage as ChatMessageType } from "@/types/message";

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant" as const,
  content: "",
  timestamp: new Date(),
};

export const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([
    INITIAL_MESSAGE,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Simulate API call with delay (loading state)
    setTimeout(() => {
      setIsLoading(false);

      // First, add the main response message
      const botResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Great! To get you started on your trading journey, we need to discover your trading profile using our 3×3×3 framework. This will help us tailor everything to your style and goals.\n\nLet me connect you with our Profile Discovery Agent who will guide you through this quick process.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);

      // After a brief delay, show the handoff message
      setTimeout(() => {
        const handoffMessage: ChatMessageType = {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          isHandoff: true,
          content: "Handing off to Profile Discovery Agent...",
        } as any;

        setMessages((prev) => [...prev, handoffMessage]);

        // After handoff animation (2 seconds), show the question with chips
        setTimeout(() => {
          const questionMessage: ChatMessageType = {
            id: (Date.now() + 3).toString(),
            role: "assistant",
            content:
              "Welcome! Let me help you find your perfect trading style.\n\nFirst question: What's your main goal - Making Money, Saving Money, or Saving Time?",
            timestamp: new Date(),
            chips: ["Making Money", "Saving Money", "Saving Time"],
            hideHeader: true,
          };

          setMessages((prev) => [...prev, questionMessage]);
        }, 2000);
      }, 500);
    }, 2000);
  };

  const handleChipClick = (chip: string) => {
    console.log("Chip clicked:", chip);

    // Open modal for specific chips
    if (
      chip === "Quick and Active" ||
      chip === "Patient and Steady" ||
      chip === "Set and Forget"
    ) {
      setIsModalOpen(true);
      return;
    }

    // Add user's selection as a message
    const userSelection: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content: chip,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userSelection]);
    setIsLoading(true);

    // Simulate API call with loading state
    setTimeout(() => {
      setIsLoading(false);

      // Add the next question with new chips
      const nextQuestion: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Great choice! Now, tell me—how would you describe your trading style?\n\nAre you more",
        timestamp: new Date(),
        chips: ["Quick and Active", "Patient and Steady", "Set and Forget"],
        agentName: "{Profile Discovery Agent...}",
      };

      setMessages((prev) => [...prev, nextQuestion]);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      {/* Scrollable Content: TabBar + Messages */}
      <div className={styles.scrollableContent}>
        {/* Tabs Section */}
        <TabBar />

        {/* Chat Body - Messages */}
        <MessageList>
          {/* Welcome Message - Always Visible */}
          <div className={styles.flexWrapper}>
            <LogoIcon />
            <p className={styles.logoText}>Āagman</p>
          </div>
          <div className={styles.messageBlock}>
            <p className={styles.messageText}>
              Welcome to TradeFlow AI - Your Multi-Agent Trading Team! 👋
            </p>
            <div className={styles.messageSubBlock}>
              <p className={styles.messageText}>
                I&apos;m your Orchestrator, and I coordinate our team of
                specialist agents:
              </p>
            </div>
            <p className={styles.messageText}>
              🎯 Profile Discovery - Finds your perfect trading style (3×3×3)
            </p>
            <p className={styles.messageText}>
              📊 Strategy Architect - Designs your trading strategy
            </p>
            <p className={styles.messageText}>
              🔍 Stock Hunter - Scans for opportunities
            </p>
            <p className={styles.messageText}>
              ⚡ Execution Planner - Creates risk-validated trade plans
            </p>
          </div>

          <div className={styles.messageBlock}>
            <p className={styles.messageText}>
              To get started: Just tell me what you&apos;d like to do!
            </p>
            <div className={styles.messageSubBlock}>
              <div className={styles.messageOption}>
                <p className={styles.messageText}>
                  New to trading? Say &quot;start&quot; or &quot;begin&quot;
                </p>
              </div>
              <div className={styles.messageOption}>
                <p className={styles.messageText}>
                  Have experience? Tell me where you&apos;d like to jump in
                </p>
              </div>
              <div className={styles.messageOption}>
                <p className={styles.messageText}>
                  Know what you want? Just ask!
                </p>
              </div>
            </div>
          </div>

          <div className={styles.messageBlock}>
            <p className={styles.messageText}>How can I help you today?</p>
          </div>

          {/* Conversation Messages */}
          {messages
            .filter((msg) => msg.id !== "welcome")
            .map((msg) => (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={"content" in msg ? msg.content : ""}
                isHandoff={"isHandoff" in msg ? msg.isHandoff : false}
                chips={"chips" in msg ? msg.chips : []}
                onChipClick={handleChipClick}
                agentName={"agentName" in msg ? msg.agentName : undefined}
                hideHeader={"hideHeader" in msg ? msg.hideHeader : false}
              />
            ))}
          {isLoading && <ChatMessage role="assistant" content="" isLoading />}
          <div ref={messagesEndRef} />
        </MessageList>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className={styles.inputAreaFixed}>
        <ChatInputArea
          message={message}
          onMessageChange={setMessage}
          onSend={handleSendMessage}
        />
      </div>

      {/* Trade Monitoring Modal */}
      {isModalOpen && (
        <TradeMonitoringModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
