"use client";
import React, { useRef, useState } from "react";
import Logo from "./Logo";

const MobileMenu = () => {
  const menuToggle = useRef(null);
  const [isOpen, setisOpen] = useState(false);
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
    setisOpen(false);
  };
  return (
    <nav
      className={`bg-white top-0 start-0 border-b border-gray-200 opacity-95 block h-14 fixed z-50 w-full md:hidden ${
        isOpen ? "nav--open " : ""
      }`}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3 md:py-0">
        <div className="w-16">
          <Logo />
        </div>
      </div>
      <div
        ref={menuToggle}
        className="nav__toggle"
        role="button"
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls="menu"
        onClick={() => setisOpen((prev) => !prev)}
        hidden={isOpen ? true : false}
      >
        <svg
          className="menuicon"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 50 50"
        >
          <title>Toggle Menu</title>
          <g>
            <line
              className="menuicon__bar"
              x1="13"
              y1="16.5"
              x2="37"
              y2="16.5"
            />
            <line
              className="menuicon__bar"
              x1="13"
              y1="24.5"
              x2="37"
              y2="24.5"
            />
            <line
              className="menuicon__bar"
              x1="13"
              y1="24.5"
              x2="37"
              y2="24.5"
            />
            <line
              className="menuicon__bar"
              x1="13"
              y1="32.5"
              x2="37"
              y2="32.5"
            />
            <circle className="menuicon__circle" r="23" cx="25" cy="25" />
          </g>
        </svg>
      </div>
      <div className="splash"></div>
      <ul className="nav__menu" id="menu" aria-label="main navigation" hidden>
        <li className="nav__item">
          <span className="nav__link" onClick={() => scrollToPercent(0)}>
            Home
          </span>
        </li>
        <li className="nav__item">
          <span className="nav__link" onClick={() => scrollToPercent(38.5)}>
            Services
          </span>
        </li>
        <li className="nav__item">
          <span className="nav__link" onClick={() => scrollToPercent(89)}>
            Projects
          </span>
        </li>
        <li className="nav__item">
          <span className="nav__link" onClick={() => scrollToPercent(97)}>
            Contact
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
