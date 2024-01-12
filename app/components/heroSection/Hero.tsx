"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { Html } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import useisMobile from "./hooks/useisMobile";

const Hero = () => {
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

  if (isMobile === undefined) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }
  return (
    <div className="homepage">
      <section className="bg-white dark:bg-gray-900">
        <div className="pt-20 pb-1 px-4 mx-auto max-w-screen-xl text-center lg:pt-20 lg:px-12">
          <span
            onClick={() => scrollToPercent(isMobile ? 91 : 97)}
            className="cursor-pointer inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-xs bg-violet-600 rounded-full text-white px-4 py-1.5 mr-3">
              Innovative
            </span>{" "}
            <span className="text-sm font-medium">
              Solutions from Frontend to Backend
            </span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Full Stack Developer
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Hi, I'm Deepak Punia, a passionate full stack developer with
            experience in building dynamic, responsive, and user-friendly web
            applications and crafting native iOS and Android apps. I deliver
            end-to-end solutions that drive business success.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <div
              className="inline-flex justify-center items-center  bg-violet-600 py-3 px-5 rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#7c3aed] before:to-[#6b21a8] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 text-[#fff]"
              onClick={() => scrollToPercent(isMobile ? 91 : 97)}
            >
              Contact Me
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div
              className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              onClick={() => scrollToPercent(isMobile ? 74 : 89)}
            >
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              See Projects
            </div>
          </div>
        </div>
      </section>
      <div className="d-container">
        <div className="webgl">
          {/* Can hide Leva with hidden param */}
          <Leva hidden={true} />
          <Canvas
            camera={{
              fov: 60,
              zoom: isMobile ? 1 : 0.5,
              near: 0.5,
              far: 200,
              position: [-6, 0, 0],
            }}
            shadows
          >
            {/* Fallback loader if models are loading */}
            <Suspense
              fallback={
                <Html center>
                  <div className="custom-loader"></div>
                </Html>
              }
            >
              <Experience />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Hero;
