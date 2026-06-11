"use client";

import { useState } from "react";
import "./globals.css";
import styles from "./page.module.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import About from "@/components/sections/About/About";

type Page = "profile" | "about" | "projects" | "skills" | "contact" | "blog" | "socials" | "stats" | "games";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("about");

  const navItems = [
    { key: "^A", label: "About Me", id: "about" },
    { key: "^P", label: "Projects", id: "projects" },
    { key: "^S", label: "Skills", id: "skills" },
    { key: "^W", label: "Last.fm Stats", id: "stats" },
    { key: "^C", label: "Contact", id: "contact" },
    { key: "^X", label: "Leave Site", id: "exit" },
    { key: "^R", label: "Read Blog", id: "blog" },
    { key: "^\\", label: "Socials", id: "socials", reversed: true },
    { key: "^U", label: "Statistics", id: "stats" },
    { key: "^T", label: "Fun Games", id: "games" },
  ];

  const handleNavClick = (id: string) => {
    if (id === "exit") {
      window.location.href = "https://google.com";
      return;
    }
    setCurrentPage(id as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <About />;
      case "projects":
        return (
          <section className={styles.pageSection}>
            <h2>Projects</h2>
            <p>Coming soon...</p>
          </section>
        );
      case "skills":
        return (
          <section className={styles.pageSection}>
            <h2>Skills</h2>
            <p>Coming soon...</p>
          </section>
        );
      case "contact":
        return (
          <section className={styles.pageSection}>
            <h2>Contact</h2>
            <p>Coming soon...</p>
          </section>
        );
      case "blog":
        return (
          <section className={styles.pageSection}>
            <h2>Blog</h2>
            <p>Coming soon...</p>
          </section>
        );
      case "socials":
        return (
          <section className={styles.pageSection}>
            <h2>Socials</h2>
            <p>Coming soon...</p>
          </section>
        );
      case "games":
        return (
          <section className={styles.pageSection}>
            <h2>Games</h2>
            <p>Coming soon...</p>
          </section>
        );
      default:
        return <About />;
    }
  };

  return (
    <div>
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer navItems={navItems} onNavClick={handleNavClick} />
    </div>
  );
}
