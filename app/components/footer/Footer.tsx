"use client";
import React from "react";
import Logo from "../menu/Logo";
import useisMobile from "../heroSection/hooks/useisMobile";

const Footer = () => {
  const isMobile = useisMobile();
  const scrollToPercent = (percent: number) => {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    // Viewport height
    const viewportHeight = window.innerHeight;

    // Maximum scrollable height
    const scrollableHeight = documentHeight - viewportHeight;

    const targetScrollY = (scrollableHeight * percent) / 100;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    
  };
  return (
    <footer className="bg-white  dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="w-11 flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Logo />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <span
                onClick={() => scrollToPercent(0)}
                className="cursor-pointer hover:underline me-4 md:me-6"
              >
                Home
              </span>
            </li>
            <li>
              <span
                onClick={() =>
                  scrollToPercent(isMobile ? 46 : 38.5)
                }
                className="cursor-pointer hover:underline me-4 md:me-6"
              >
                Services
              </span>
            </li>
            <li>
              <span
                onClick={() =>
                  scrollToPercent(isMobile ? 74 : 89)
                }
                className="cursor-pointer hover:underline me-4 md:me-6"
              >
                Projects
              </span>
            </li>
            <li>
              <span
                onClick={() =>
                  scrollToPercent(isMobile ? 91 : 97)
                }
                className="cursor-pointer hover:underline"
              >
                Contact
              </span>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            AFullStack.Dev
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
