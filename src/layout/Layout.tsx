"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChatInterface } from "./ChatInterface";
import { Playground } from "./Playground";
import styles from "./Layout.module.css";

export const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className={styles.main}>
        {/* Chat Section */}
        <section className={styles.chatSection}>
          <Header title="Chat" />
          <ChatInterface />
        </section>

        {/* Playground Section */}
        <section className={styles.playgroundSection}>
          <Header title="Playground" />
          <Playground />
        </section>
      </main>
    </div>
  );
};
