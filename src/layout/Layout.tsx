"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChatInterface } from "./ChatInterface";
import { Playground } from "./Playground";
import styles from "./Layout.module.css";

export const Layout: React.FC = () => {
  const [playgroundWidth, setPlaygroundWidth] = useState(33.33); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !mainRef.current) return;

      const mainRect = mainRef.current.getBoundingClientRect();
      const offsetX = e.clientX - mainRect.left;
      const percentage = ((mainRect.width - offsetX) / mainRect.width) * 100;

      const clampedPercentage = Math.min(Math.max(percentage, 20), 60);
      setPlaygroundWidth(clampedPercentage);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className={styles.main} ref={mainRef}>
        {/* Chat Section */}
        <section
          className={styles.chatSection}
          style={{ flex: `0 0 ${100 - playgroundWidth}%` }}
        >
          <Header title="Chat" />
          <ChatInterface />
        </section>

        {/* Resizer */}
        <div className={styles.resizer} onMouseDown={handleMouseDown} />

        {/* Playground Section */}
        <section
          className={styles.playgroundSection}
          style={{ flex: `0 0 ${playgroundWidth}%` }}
        >
          <Header title="Playground" />
          <Playground />
        </section>
      </main>
    </div>
  );
};
