"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowTopRightIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { SocialMediaList } from "./SocialMediaList";
import { SocialMediaListItem } from "../types";

const socialMediaData: SocialMediaListItem[] = [
  {
    title: "Github",
    url: "",
    svgElement: <GitHubLogoIcon className="h-6 w-6" />,
  },
  {
    title: "LinkedIn",
    url: "",
    svgElement: <LinkedInLogoIcon className="h-6 w-6" />,
  },
];

export function Header() {
  const [handlersLoaded, setHandlersLoaded] = useState(false);

  const loadScrollHandler = async () => {
    if (!handlersLoaded) {
      const { initScrollHandler } = await import("./scrollHandler");
      initScrollHandler();
      setHandlersLoaded(true);
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      loadScrollHandler();
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [handlersLoaded]);

  const handleNavClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = event.currentTarget.getAttribute("href")?.substring(1);
    const sectionElement = document.getElementById(target || "");
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    await loadScrollHandler();
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <Link href="/">Akira Chow</Link>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          Front End Engineer
        </h2>
        <p className="mt-4 max-w-xs leading-normal">
          I build intuitive, high-performance mobile and web experiences.
        </p>
        <div className="mt-12">
          <Link
            className="inline-flex items-baseline leading-tight hover:text-teal-300 focus-visible:text-teal-300 font-semibold text-slate-200 group/link text-base"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View CV/Résumé (opens in a new tab)"
          >
            <span>
              View Full{" "}
              <span className="inline-block">
                CV/Résumé
                <ArrowTopRightIcon className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
              </span>
            </span>
          </Link>
        </div>
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            <li>
              <Link
                href="#about"
                className="group flex items-center py-3 active"
                onClick={handleNavClick}
                aria-label="Jump to About section"
              >
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                  About
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#experience"
                className="group flex items-center py-3"
                onClick={handleNavClick}
                aria-label="Jump to Experience section"
              >
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                  Experience
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <SocialMediaList items={socialMediaData} />
    </header>
  );
}