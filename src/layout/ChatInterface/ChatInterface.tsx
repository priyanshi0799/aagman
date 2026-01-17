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
import {
  welcomeMessage,
  generateBotResponse,
  shouldOpenModal,
  chatTiming,
} from "@/utils/mockChatData";

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
  const [conversationStep, setConversationStep] = useState(0);
  const [selectedBroker, setSelectedBroker] = useState("Zerodha");
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

    // Generate bot response based on conversation step
    const { messages: botMessages, nextStep } = generateBotResponse(
      message,
      conversationStep
    );

    // Simulate API call with delay (loading state)
    setTimeout(() => {
      setIsLoading(false);

      // Add the first message (main response)
      const firstMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        ...botMessages[0],
      } as ChatMessageType;

      setMessages((prev) => [...prev, firstMessage]);

      // If there are more messages (handoff and question), add them with delays
      if (botMessages.length > 1) {
        setTimeout(() => {
          // Add handoff message
          const handoffMsg: ChatMessageType = {
            id: (Date.now() + 2).toString(),
            ...botMessages[1],
          } as ChatMessageType;

          setMessages((prev) => [...prev, handoffMsg]);

          // After handoff animation, show the question
          if (botMessages.length > 2) {
            setTimeout(() => {
              const questionMsg: ChatMessageType = {
                id: (Date.now() + 3).toString(),
                ...botMessages[2],
              } as ChatMessageType;

              setMessages((prev) => [...prev, questionMsg]);
            }, chatTiming.handoffDuration);
          }
        }, chatTiming.handoffDelay);
      }

      setConversationStep(nextStep);
    }, chatTiming.loadingDelay);
  };

  const handleChipClick = (chip: string) => {
    console.log("Chip clicked:", chip);

    // Check if this chip should open the modal
    if (shouldOpenModal(chip)) {
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

    // Generate bot response based on conversation step
    const { messages: botMessages, nextStep } = generateBotResponse(
      chip,
      conversationStep
    );

    // Simulate API call with loading state
    setTimeout(() => {
      setIsLoading(false);

      // Add the bot's next question/response
      botMessages.forEach((botMsg, index) => {
        const newMessage: ChatMessageType = {
          id: (Date.now() + index + 1).toString(),
          ...botMsg,
        } as ChatMessageType;

        setMessages((prev) => [...prev, newMessage]);
      });

      setConversationStep(nextStep);
    }, chatTiming.loadingDelay);
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

          {/* Render welcome message sections from mock data */}
          {welcomeMessage.sections.map((section, index) => {
            if (section.type === "greeting") {
              return (
                <div key={index} className={styles.messageBlock}>
                  <p className={styles.messageText}>{section.content}</p>
                </div>
              );
            }

            if (section.type === "intro") {
              return (
                <div key={index} className={styles.messageBlock}>
                  <div className={styles.messageSubBlock}>
                    <p className={styles.messageText}>{section.content}</p>
                  </div>
                </div>
              );
            }

            if (section.type === "list" && "items" in section) {
              return (
                <div key={index} className={styles.messageBlock}>
                  {section.items.map((item, itemIndex) => (
                    <p key={itemIndex} className={styles.messageText}>
                      {item}
                    </p>
                  ))}
                </div>
              );
            }

            if (section.type === "callToAction" && "options" in section) {
              return (
                <div key={index} className={styles.messageBlock}>
                  <p className={styles.messageText}>{section.content}</p>
                  <div className={styles.messageSubBlock}>
                    {section.options.map((option, optionIndex) => (
                      <div key={optionIndex} className={styles.messageOption}>
                        <p className={styles.messageText}>{option}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (section.type === "question") {
              return (
                <div key={index} className={styles.messageBlock}>
                  <p className={styles.messageText}>{section.content}</p>
                </div>
              );
            }

            return null;
          })}

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

      <div className={styles.inputAreaFixed}>
        <ChatInputArea
          message={message}
          onMessageChange={setMessage}
          onSend={handleSendMessage}
          broker={selectedBroker}
          onBrokerChange={setSelectedBroker}
        />
      </div>

      {isModalOpen && (
        <TradeMonitoringModal
          onClose={() => setIsModalOpen(false)}
          selectedBroker={selectedBroker}
        />
      )}
    </div>
  );
};
