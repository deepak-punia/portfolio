"use client";
import React from "react";

const MenuItems = () => {
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
    <ul className="hidden md:flex p-4 items-center justify-between  font-medium gap-8">
      <li
        className="link-style"
        data-replace="Home"
        onClick={() => scrollToPercent(0)}
      >
        <span>Home</span>
      </li>
      <li
        className="link-style"
        data-replace="Services"
        onClick={() => scrollToPercent(46)}
      >
        {" "}
        <span>Services</span>
      </li>
      <li
        className="link-style"
        data-replace="Projects"
        onClick={() => scrollToPercent(74)}
      >
        {" "}
        <span>Projects</span>
      </li>
      <li
        className="link-style"
        data-replace="Contact"
        onClick={() => scrollToPercent(91)}
      >
        {" "}
        <span>Contact</span>
      </li>
    </ul>
  );
};

export default MenuItems;
