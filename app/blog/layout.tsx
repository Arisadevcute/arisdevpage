'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

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
    if (id === "blog") {
      return;
    }
    router.push("/");
  };

  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer navItems={navItems} onNavClick={handleNavClick} />
    </div>
  );
}
