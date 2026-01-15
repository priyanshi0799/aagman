"use client";

import React from "react";
import { TabBar } from "@/components/TabBar";
import { MessageList } from "@/components/MessageList";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInputArea } from "@/components/ChatInputArea";
import styles from "./ChatInterface.module.css";

export const ChatInterface: React.FC = () => {
  const [message, setMessage] = React.useState("");

  return (
    <div className={styles.container}>
      {/* Tabs Section */}
      <TabBar />

      {/* Chat Body - Messages */}
      <MessageList>
        <ChatMessage sender="ai" senderName="Āagman">
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
        </ChatMessage>
      </MessageList>

      {/* Input Area */}
      <ChatInputArea message={message} onMessageChange={setMessage} />
    </div>
  );
};
