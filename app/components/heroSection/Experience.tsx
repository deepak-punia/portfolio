"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import * as THREE from "three";
import {
  OrbitControls,
  useHelper,
  RoundedBox,
  useGLTF,
  Html,
  useProgress,
  Stage,
  Plane,
  Text,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import TechStackRing from "./TechStackRing";
import ServiceCard from "./services/ServiceCard";
import Ball from "./Ball";
import ProjectCarousel from "./projects/ProjectCarousel";
import ProjectDetails from "./ProjectDetails";
import SocialIcons from "./SocialIcons";
import ContactForm from "./ContactForm";

// scoll percentage function
function getScrollPercentage() {
  // Total document height
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

  // Current scroll position
  const currentScroll = window.scrollY;

  // Scroll percentage
  const scrollPercentage = (currentScroll / scrollableHeight) * 100;

  return scrollPercentage;
}
//fade in/out with scrool
const updateGroupOpacity = (
  group,
  fadeInStart,
  fadeInEnd,
  fadeOutStart,
  fadeOutEnd,
  scrollPer
) => {
  if (group.current) {
    let opacity = 1;

    if (scrollPer < fadeInStart || scrollPer > fadeOutEnd) {
      // Completely transparent before fadeInStart and after fadeOutEnd
      opacity = 0;
    } else if (scrollPer >= fadeInStart && scrollPer <= fadeInEnd) {
      // Fade in
      opacity = (scrollPer - fadeInStart) / (fadeInEnd - fadeInStart);
    } else if (scrollPer >= fadeOutStart && scrollPer <= fadeOutEnd) {
      // Fade out
      opacity = 1 - (scrollPer - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    }
    // Update opacity for all materials in the group
    group.current.traverse((child) => {
      if (child.isMesh) {
        child.material.opacity = opacity;
        child.material.transparent = true;
        // if (opacity < 1) {
        //   child.material.depthWrite = false;
        // }
      }
    });
  }
};


const Experience = () => {
  //Load models
  const webModel = useGLTF("./models/scene.gltf");
  const padlockModel = useGLTF("./models/padlock.gltf");
  const mailModel = useGLTF("./models/mail/scene.gltf");
  const techStackTextures = [
    // Replace these with actual textures
    { textureimg: "./images/css.png", text: "CSS", scrollThrushold: 11 },
    { textureimg: "./images/nodejs.png", text: "NodeJs", scrollThrushold: 12 },
    { textureimg: "./images/html.png", text: "HTML", scrollThrushold: 13 },
    {
      textureimg: "./images/javascript.png",
      text: "JavaScript",
      scrollThrushold: 14,
    },
    { textureimg: "./images/nextjs.png", text: "NextJs", scrollThrushold: 15 },
    {
      textureimg: "./images/mongodb.png",
      text: "MongoDB",
      scrollThrushold: 16,
    },
    { textureimg: "./images/git.png", text: "Git", scrollThrushold: 17 },
    {
      textureimg: "./images/tailwind.png",
      text: "Tailwind CSS",
      scrollThrushold: 18,
    },
    {
      textureimg: "./images/typescript.png",
      text: "TypeScript",
      scrollThrushold: 19,
    },
    { textureimg: "./images/redux.png", text: "Redux", scrollThrushold: 20 },
    {
      textureimg: "./images/threejs.png",
      text: "ThreeJs",
      scrollThrushold: 21,
    },
    { textureimg: "./images/spring.png", text: "Spring", scrollThrushold: 22 },
    {
      textureimg: "./images/bootstrap.png",
      text: "Bootstrap",
      scrollThrushold: 23,
    },
    { textureimg: "./images/react.png", text: "ReactJs", scrollThrushold: 24 },
    // ... more textures
  ];

  // each new card move Y-> -1,5
  const services = [
    {
      icon: "./images/static.png",
      text: "Responsive and static websites using modern technologies.",
      heading: "Static Website",
      position: [0, -1, -3],
      positionsm: [0, -1 + 0, 0],
      scrollThrushold: 38,
      scrollThrusholdsm: 38,
    },
    {
      icon: "./images/webdev.png",
      text: "Responsive and dynamic web applications using modern technologies.",
      heading: "Web Application",
      position: [0, 0, 0],
      positionsm: [0, -1 + -4.1, 0],
      scrollThrushold: 38,
      scrollThrusholdsm: 38.5,
    },
    {
      icon: "./images/saas.png",
      text: "Designing and developing scalable Software as a Service (SaaS) solutions.",
      heading: "SaaS Development",
      position: [0, 1, 3],
      positionsm: [0, -1 + -8.2, 0],
      scrollThrushold: 38,
      scrollThrusholdsm: 40,
    },
    {
      icon: "./images/ios.png",
      text: "Creating native applications for iOS platforms.",
      heading: "iOS Apps",
      position: [0, -2.5, -3],
      positionsm: [0, -1 + -12.3, 0],
      scrollThrusholdsm: 43.5,
      scrollThrushold: 45,
    },
    {
      icon: "./images/andriod.png",
      text: "Developing applications for Android platforms.",
      heading: "Android Apps",
      position: [0, -1.5, 0],
      positionsm: [0, -1 + -16.4, 0],
      scrollThrusholdsm: 46.5,
      scrollThrushold: 45,
    },
    {
      icon: "./images/ecommerce.png",
      text: "Crafting comprehensive online retail solutions.",
      heading: "E-commerce",
      position: [0, -0.5, 3],
      positionsm: [0, -1 + -20.5, 0],
      scrollThrusholdsm: 49.5,
      scrollThrushold: 45,
    },
    {
      icon: "./images/api.png",
      text: "Building and integrating APIs for enhanced functionality.",
      heading: "API Development",
      position: [0, -4, -3],
      positionsm: [0, -1 + -24.6, 0],
      scrollThrusholdsm: 53,
      scrollThrushold: 49,
    },
    {
      icon: "./images/ui.png",
      text: "Designing attractive and intuitive user interfaces.",
      heading: "User Interface",
      position: [0, -3, 0],
      positionsm: [0, -1 + -28.7, 0],
      scrollThrusholdsm: 56,
      scrollThrushold: 49,
    },
    {
      icon: "./images/seo.png",
      text: "Enhancing website performance for search engines.",
      heading: "SEO",
      position: [0, -2, 3],
      positionsm: [0, -1 + -32.8, 0],
      scrollThrusholdsm: 59,
      scrollThrushold: 49,
    },
    {
      icon: "./images/cms.png",
      text: "Building easy-to-use content management systems.",
      heading: "CMS Development",
      position: [0, -5.5, -3],
      positionsm: [0, -1 + -36.9, 0],
      scrollThrusholdsm: 62.5,
      scrollThrushold: 53,
    },
    {
      icon: "./images/marketing.png",
      text: "Executing digital marketing campaigns.",
      heading: "Digital Marketing",
      position: [0, -4.5, 0],
      positionsm: [0, -1 + -41, 0],
      scrollThrusholdsm: 65,
      scrollThrushold: 53,
    },
    {
      icon: "./images/3d.png",
      text: "Creating immersive 3D web experiences.",
      heading: "3D Website ",
      position: [0, -3.5, 3],
      positionsm: [0, -1 + -45.1, 0],
      scrollThrusholdsm: 68.5,
      scrollThrushold: 53,
    },
    {
      icon: "./images/cloud.png",
      text: "Implementing scalable cloud solutions for applications.",
      heading: "Cloud Solutions",
      position: [0, -7, -3],
      positionsm: [0, -1 + -49.2, 0],
      scrollThrusholdsm: 71.5,
      scrollThrushold: 57,
    },
    {
      icon: "./images/database.png",
      text: "Implementing efficient and scalable databases.",
      heading: "Database Design",
      position: [0, -6, 0],
      positionsm: [0, -1 + -53.3, 0],
      scrollThrusholdsm: 75,
      scrollThrushold: 57,
    },
    {
      icon: "./images/logo.png",
      text: "Crafting unique logos for brand identity.",
      heading: "Logo Design",
      position: [0, -5, 3],
      positionsm: [0, -1 + -57.4, 0],
      scrollThrusholdsm: 78,
      scrollThrushold: 57,
    },

    // Add more services as needed
  ];

  const projects = [
    {
      title: "Project 02",
      description:
        "Freight audit and payment services, ensuring the utmost accuracy, transparency, and cost savings.",
      image: "./images/freightcomm.png",
      video: "./media/project02.webm",
      technologies: [
        "React",
        "NextJS",
        "Next Auth",
        "AWS",
        "MongoDB",
        "Tailwind CSS",
        "Daisy UI",
        "TypeScript",
        "Zod",
        "React-email",
        "Apexcharts",
      ],
      features: [
        "Responsive design",
        "Role based user authentication",
        "NextJS Server Actions and API",
        "AWS cloud storage for files",
        "View pdfs in browser",
        "Email notifications",
      ],
      link: "https://www.freightcomm.ca",
      sourceCode: "https://github.com/deepak-punia",
    },
    {
      title: "Project 03",
      description: "3D car wash website with 3D car model.",
      image: "./images/carwash.png",
      video: "./media/project03.webm",
      technologies: [
        "React",
        "NextJS",
        "Tailwind CSS",
        "ThreeJS",
        "GSAP",
        "React Three Fiber",
        "Scrollmagic",
      ],
      features: ["Responsive design", "3D car model", "3D animations"],
      link: "https://carwash-pams.onrender.com",
      sourceCode: "https://github.com/deepak-punia/carwash",
    },
    {
      title: "Project 04",
      description: "Construction website with Content Management System.",
      image: "./images/bluehill.png",
      video: "./media/project04.mp4",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Redux",
        "Redux-thunk",
        "Swiper",
        "Axios",
      ],
      features: [
        "Responsive design",
        "User authentication",
        "Appointment booking.",
        "Customize website through admin panel.",
      ],
      link: "#",
      sourceCode: "https://github.com/deepak-punia/Construction_CMS",
    },
    {
      title: "Project 01",
      description:
        "Scheduling software designed to optimize time management and enhance efficiency in workplace scheduling.",
      image: "./images/alpha.jpg",
      video: "./media/project01.webm",
      technologies: [
        "Node.js",
        "Express",
        "Stripe",
        "AWS",
        "MongoDB",
        "Multer",
        "Nodemailer",
        "React",
        "React Native",
        "Redux",
        "Redux-thunk",
        "React-leaflet",
        "Bootstrap",
      ],
      features: [
        "Responsive design",
        "Role based user authentication",
        "Native iOS & android apps on Store",
        "GPS location tracing on map",
        "Payments with stripe",
      ],
      link: "https://www.alphascheduling.com",
      sourceCode: "https://github.com/deepak-punia",
    },

    // ... more projects
  ];

  mailModel.scene.children[0]?.children[0].traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });
  webModel.scene.children[0]?.children[0].traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  //Load texture
  const searchtexture = useLoader(THREE.TextureLoader, "./images/search.png");
  const imageicontexture = useLoader(
    THREE.TextureLoader,
    "./images/imageicon.png"
  );
  const starTexture = useLoader(THREE.TextureLoader, "./images/star4.png");
  const circleTexture = useLoader(THREE.TextureLoader, "./images/circle.png");
  const gearTexture = useLoader(THREE.TextureLoader, "./images/gear.png");

  //Directional light controls from GUI
  const { directLightPosition } = useControls({
    directLightPosition: { x: -23, y: 8, z: 0 },
  });

  // Directional light helper
  // const lighthelper = useRef();
  // useHelper(lighthelper, THREE.DirectionalLightHelper, "cyan");

  // Animations
  const gear = useRef();
  const lock = useRef();
  const yellowBall = useRef();
  const pieGreen = useRef();
  const row1 = useRef();
  const row2 = useRef();
  const row3 = useRef();
  const star1 = useRef();
  const star2 = useRef();
  const star3 = useRef();
  const star4 = useRef();
  const allgroup = useRef();
  const maingroup = useRef();
  const servicesgroup = useRef();
  const projectgroup = useRef();
  const webmodelref = useRef();
  const contactgroup = useRef();
  const selectedProjectRef = useRef(null);
  const isDialogOpen = !!selectedProjectRef.current;

  // Function to calculate the target scale based on scroll percentage
  const getTargetScale = (scrollPercent: number) => {
    if (scrollPercent >= 1 && scrollPercent < 10) {
      return 1 + (scrollPercent - 1) * 0.02; // Scaling up to 10%
    }
    return 1; // Default scale
  };

  // const updateGroupPositionJump = (group, targetY, lerpFactor = 0.1) => {
  //   if (group.current) {
  //     group.current.position.y += (targetY - group.current.position.y) * lerpFactor;
  //   }
  // };

  // const updateGroupPosition = (group, startScroll, endScroll, maxPosY, scrollPer, lerpFactor = 0.1, defaultPosY) => {
  //   if (group.current) {
  //     let targetY;

  //     if (scrollPer < startScroll) {
  //       targetY = defaultPosY;

  //     } else if (scrollPer >= startScroll && scrollPer < 35) {
  //       // Linear interpolation until 35%
  //       const progress = (scrollPer - startScroll) / (35 - startScroll);
  //       targetY = maxPosY * progress;
  //     } else if (scrollPer >= 35 && scrollPer < 36) {
  //       // Special case: Jump to 2.6 at 35%
  //       targetY = 2.6;
  //     } else if (scrollPer >= 36 && scrollPer <= endScroll) {
  //       // Special case: Jump to 10.2 at 36%, then continue as normal
  //       const progress = (scrollPer - 36) / (endScroll - 36);
  //       targetY = 10.2 + (maxPosY - 10.2) * progress;
  //     } else {

  //       targetY = maxPosY;
  //     }

  //     // Smooth transition to the target position
  //     group.current.position.y += (targetY - group.current.position.y) * lerpFactor;
  //   }
  // };
  const updateGroupPosition = (
    group,
    startScroll,
    endScroll,
    maxPosY,
    scrollPer,
    lerpFactor = 0.1,
    defaultPosY
  ) => {
    if (group.current) {
      let targetY;

      if (scrollPer.current < startScroll) {
        // Below start scroll, reset to original position
        targetY = defaultPosY;
      } else if (
        scrollPer.current >= startScroll &&
        scrollPer.current <= endScroll
      ) {
        // Between start and end scroll, interpolate towards maxPosY

        const progress =
          (scrollPer.current - startScroll) / (endScroll - startScroll);
        targetY = maxPosY * progress;
      } else {
        // Above end scroll, maintain the max position
        targetY = maxPosY;
      }

      // Apply smooth transition to the target position
      group.current.position.y +=
        (targetY - group.current.position.y) * lerpFactor;
    }
  };

  const scrollY = useRef(window.scrollY);
  const scrollPer = useRef(0);
  let cursorval = {
    x: 0,
    y: 0,
  };
  let windowSizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const deviceOnt: {
    alpha: null | number;
    beta: null | number;
    gamma: null | number;
  } = {
    alpha: null, //y axis change
    beta: null, //x axis change
    gamma: null, //z axis change
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      scrollY.current = window.scrollY;
      scrollPer.current = getScrollPercentage();
    });
    window.addEventListener("mousemove", (e) => {
      (cursorval.x = e.clientX / windowSizes.width - 0.5),
        (cursorval.y = e.clientY / windowSizes.height - 0.5);
    });
    window.addEventListener("resize", (e) => {
      windowSizes.width = window.innerWidth;
      windowSizes.height = window.innerHeight;
    });

    window.addEventListener("devicemotion", (e) => {
      //   deviceOnt.alpha = (e.alpha / 360) * 0.5;
      //   deviceOnt.beta = (e.beta / 180) * 0.5;
      //   deviceOnt.gamma = (e.gamma / 90) * 0.5;
      if (!e.rotationRate) {
        return;
      }
      deviceOnt.alpha = e.rotationRate.alpha || 0
      deviceOnt.beta = e.rotationRate.beta || 0
      deviceOnt.gamma = e.rotationRate.gamma || 0
    });

    return () => {
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("resize", () => {});
      window.removeEventListener("devicemotion", () => {});
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  useFrame((state, delta) => {
    //change camera on move move
    if (deviceOnt.alpha && windowSizes.width < 768) {
      // Adjust these multipliers to control sensitivity
    const sensitivity = { x: 0.1, y: 0.1 };
    // Map rotation rate to camera movement
    state.camera.position.z += deviceOnt.alpha * sensitivity.x * delta;
    state.camera.position.y += deviceOnt.gamma * sensitivity.y * delta;

    // Smoothly interpolate back to original position
    state.camera.position.z *= 0.9; // Adjust for smoother return
    state.camera.position.y *= 0.9;

    // Ensure the camera looks at a specific point (e.g., the origin)
    state.camera.lookAt(0, 0, 0);

    
      

      //   console.log("pX-Mobile", pX);
      // console.log("pY-Mobile", pY);
    } else if (cursorval.x !== 0 && windowSizes.width > 768) {
      const pX = cursorval.x;
      const pY = cursorval.y;
      state.camera.position.z += (-pX * 2 - state.camera.position.z) * 0.1;
      state.camera.position.y += (pY * 2 - state.camera.position.y) * 0.1;
      state.camera.lookAt(0, 0, 0);
      //   console.log("pX",pX)
      //   console.log("pY", pY)
    }

    //animation
    gear.current.rotation.x += delta * 0.4;
    pieGreen.current.rotation.x += delta * 0.6;
    webmodelref.current.rotation.y += delta * 0.4;
    if (Math.sin(state.clock.elapsedTime * 2) * 0.2 < 0) {
      star1.current.position.x =
        Math.sin(state.clock.elapsedTime * 2) * 0.2 - 1.11;
    }
    if (Math.sin(state.clock.elapsedTime * 2.1) * 0.2 < 0) {
      star2.current.position.x =
        Math.sin(state.clock.elapsedTime * 2.1) * 0.2 - 1.11;
    }
    if (Math.sin(state.clock.elapsedTime * 2.2) * 0.2 < 0) {
      star3.current.position.x =
        Math.sin(state.clock.elapsedTime * 2.2) * 0.2 - 1.11;
    }
    if (Math.sin(state.clock.elapsedTime * 2.3) * 0.2 < 0) {
      star4.current.position.x =
        Math.sin(state.clock.elapsedTime * 2.3) * 0.2 - 1.11;
    }

    console.log(scrollPer.current);
    
    //Animations based on scroll percentage
    //Scroll 1% - 10%
    if (windowSizes.width >= 768) {
      let scaleTemp = allgroup.current.scale.x;
      const targetScale = getTargetScale(scrollPer.current);

      scaleTemp += (targetScale - scaleTemp) * 0.1;
      allgroup.current.scale.set(scaleTemp, scaleTemp, scaleTemp);

      //Scrol 10% - 31%
      const targetScale2 =
        scrollPer.current > 10 && scrollPer.current <= 35 ? 0.5 : 1; // Scale down by 20% when squares are visible
      allgroup.current.scale.lerp(
        new THREE.Vector3(targetScale2, targetScale2, targetScale2),
        0.1
      );
    }

    updateGroupPosition(maingroup, 31, 100, windowSizes.width >= 768 ? 26 : 90, scrollPer, 0.1, 0);

    updateGroupOpacity(servicesgroup, 37, 38, windowSizes.width >= 768 ? 70 : 84, windowSizes.width >= 768 ? 71 : 85, scrollPer.current);
    updateGroupOpacity(projectgroup,windowSizes.width >= 768 ? 70 : 84, windowSizes.width >= 768 ? 71 : 85, windowSizes.width >= 768 ? 78 : 92, windowSizes.width >= 768 ? 79 : 93, scrollPer.current);
    updateGroupOpacity(contactgroup, windowSizes.width >= 768 ? 78 : 92, windowSizes.width >= 768 ? 79 : 93, 101, 101, scrollPer.current);

    // // scroll 31% - 52%
    // if (scrollPer.current > 31 && scrollPer.current <= 52) {
    //   // Scroll between 31% - 52%
    //   updateGroupPosition(servicesgroup, 0); // Position servicesgroup in view
    //   if(scrollPer.current > 35 && scrollPer.current <= 52){
    //     updateGroupPosition(servicesgroup, 2);
    //   }
    //   if(scrollPer.current > 39 && scrollPer.current <= 52){
    //     updateGroupPosition(servicesgroup, 4);
    //   }
    //   if(scrollPer.current > 44 && scrollPer.current <= 52){
    //     updateGroupPosition(servicesgroup, 6);
    //   }
    //   updateGroupPosition(allgroup, 10); // Move allgroup up

    //   updateGroupPosition(projectgroup, -10);
    //   updateGroupPosition(contactgroup, -20); // Position contactgroup out of view
    // } else if (scrollPer.current > 52 && scrollPer.current <= 73) {
    //   // Scroll between 52% - 73%
    //   updateGroupPosition(allgroup, 20); // Keep allgroup up
    //   updateGroupPosition(servicesgroup, 10); // Move servicesgroup out of view
    //   updateGroupPosition(projectgroup, 0); // Position projectgroup in view
    //   updateGroupPosition(contactgroup, -10); // Position contactgroup out of view
    // } else if (scrollPer.current > 73 && scrollPer.current <= 100) {
    //   // Scroll between 73% - 94%
    //   updateGroupPosition(allgroup, 30); // Keep allgroup up
    //   updateGroupPosition(servicesgroup, 20); // Move servicesgroup out of view
    //   updateGroupPosition(projectgroup, 10); // Position projectgroup in view
    //   updateGroupPosition(contactgroup, 0); // Position contactgroup in view
    // }else {
    //   // Reset positions when outside 20% - 40%
    //   updateGroupPosition(allgroup, 0);
    //   updateGroupPosition(servicesgroup, -10);
    //   updateGroupPosition(projectgroup, -20);
    //   updateGroupPosition(contactgroup, -30);
    // }

    // if(Math.floor(state.clock.elapsedTime % 4) === 1 )
    // {
    //     webmodelref.current.rotation.y += (1 - webmodelref.current.rotation.y) * 0.1
    // }

    //webmodelref.current.rotation.y += delta * 0.4
    //use GSAP to animate below every 3 seconds

    // row1.current.scale.x = Math.floor(state.clock.elapsedTime % 4) === 1 ? 0.6 : 0.5
    // row2.current.scale.x = Math.abs(Math.sin(state.clock.elapsedTime) * 0.5)
    // row3.current.scale.x = Math.abs(Math.sin(state.clock.elapsedTime) * 0.5)

    // This can update shodow position with camera movement
    // lighthelper.current.position.set(state.camera.position.x , state.camera.position.y, state.camera.position.z )
  });

  return (
    <>
      {/* Perf on debug mode to monitor performance */}
      {/* <Perf position="bottom-left" /> */}

      {/* <OrbitControls makeDefault enableRotate={false} /> */}

      <directionalLight
        position={[
          directLightPosition.x,
          directLightPosition.y,
          directLightPosition.z,
        ]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />

      <ambientLight intensity={0.5} />
      <group ref={maingroup} position={[0, 0, 0]}>
        {/* Tech Stack */}
        <TechStackRing
          techStackTextures={techStackTextures}
          ellipse={{ a: 4.4, b: 2.6 }}
          scrollPer={scrollPer}
        />

        {/* Services */}
        <group ref={servicesgroup} position={[0, windowSizes.width >= 768 ? -6 : -10, 0]}>
          <Text
            position={[-0.11, windowSizes.width >= 768 ? 2.3 : 2, windowSizes.width >= 768 ? -2 : 0]}
            fontSize={windowSizes.width >= 768 ? 0.35 : 0.5}
            rotation-y={-Math.PI * 0.5}
            color={"grey"}
          >
            Services I can help you with
          </Text>
          {services.map((service, index) => (
            <ServiceCard key={index} scrollPer={scrollPer} size={windowSizes.width >= 768 ? [2.45, 1.4, 0.1] : [7.9, 3.8, 0.1]} {...service} />
          ))}
          {/* Random balls and circles */}
          <Ball scale={6} position={[windowSizes.width >= 768 ?0 : 1, windowSizes.width >= 768 ? 1 : -10, windowSizes.width >= 768 ? -3 : -4.5]} color="orange" />
          <Ball scale={8} position={[3, windowSizes.width >= 768 ? 1 : -16, windowSizes.width >= 768 ? 2.5 : 5.5]} color="lightgreen" />
          {/* Add more balls and circles */}
        </group>

        {/* Projects */}
        <group ref={projectgroup} position={[0, windowSizes.width >= 768 ? -16 : -75, 0]}>
          <ProjectCarousel
            projects={projects}
            selectedProjectRef={selectedProjectRef}
          />
        </group>

        {/* Contact section */}
        <group ref={contactgroup} position={[0, windowSizes.width >= 768 ? -23 : -87, 0]} scale={windowSizes.width >= 768 ? 1 : (windowSizes.width >= 520 ? 1.4 : 1.8)}>
          <mesh position={[0, 0, 0]} >
            {/* Replace with your desired geometry */}
            {/* <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="blue" /> */}
            <Html
              transform
              position={[0, 0, 0]}
              scale={ 0.4 }
              rotation-y={-Math.PI * 0.5}
              style={{ opacity: 1, transition: "opacity 0.5s" }}
            >
              <ContactForm />
              <ProjectDetails />
            </Html>
          </mesh>
          <Ball scale={windowSizes.width >= 768 ? 6 : 4} position={ [windowSizes.width >= 768 ? 0 : 2.5, -3, -4]} color="orange" />
          <Ball scale={12} position={ [3, -1, 4.5]} color="lightgreen" />
          <SocialIcons />
        </group>

        <group ref={allgroup} position={[0, windowSizes.width >= 768 ? 0 : 3, 0]}>
          {/* Main browser screen */}
          <mesh
            position-y={1}
            scale={[5.8, 3.2, 0.2]}
            rotation-y={Math.PI * 0.5}
            receiveShadow
            castShadow
          >
            <boxGeometry />
            <meshStandardMaterial roughness={0.5} color="blue" />
          </mesh>

          {/* Second browser screen */}
          <mesh
            position-y={0.9}
            position-x={-0.5}
            scale={[3.5, 2.2, 0.2]}
            rotation-y={Math.PI * 0.5}
            receiveShadow
            castShadow
          >
            <boxGeometry />
            <meshStandardMaterial roughness={0.5} color="mediumpurple" />
          </mesh>

          {/* Circle */}
          <mesh
            position-y={1}
            position-x={-0.5}
            position-z={2.7}
            rotation-y={Math.PI * 0.5}
            castShadow
          >
            <planeGeometry />

            <meshStandardMaterial
              roughness={0.5}
              attach="material"
              color="purple"
              transparent={true}
              alphaMap={circleTexture}
              alphaTest={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Gear */}
          <mesh
            ref={gear}
            scale={1.5}
            position-y={2}
            position-x={-0.5}
            position-z={3}
            rotation-y={Math.PI * 0.5}
            castShadow
          >
            <planeGeometry />

            <meshStandardMaterial
              roughness={0.5}
              attach="material"
              color="gray"
              transparent={true}
              alphaMap={gearTexture}
              alphaTest={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Third browser screen - TOP BAR*/}
          <mesh
            position-y={1.7}
            position-x={-0.7}
            scale={[2.8, 0.3, 0.2]}
            rotation-y={Math.PI * 0.5}
            castShadow
          >
            <boxGeometry />
            <meshStandardMaterial roughness={0.5} color="skyblue" />
          </mesh>
          <mesh
            position-y={1.7}
            position-x={-0.81}
            scale={[2.8, 0.3, 0.2]}
            rotation-y={Math.PI * -0.5}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              attach="material"
              map={searchtexture}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Third browser screen - 1/2 Rect*/}
          <mesh
            position-y={0.7}
            position-x={-1}
            position-z={-1.035}
            scale={[0.7, 1.3, 0.2]}
            rotation-y={Math.PI * 0.5}
            castShadow
          >
            <boxGeometry />
            <meshStandardMaterial roughness={0.5} color="skyblue" />
          </mesh>
          {/* Pie Chart */}
          <mesh
            ref={pieGreen}
            position-y={0.95}
            position-x={-1.111}
            position-z={-1.035}
            rotation-y={Math.PI * 0.5}
          >
            <ringGeometry args={[0.15, 0.26, 32, 1, 0, (Math.PI * 3) / 4]} />
            <meshStandardMaterial
              roughness={0.5}
              color="green"
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            position-y={0.95}
            position-x={-1.11}
            position-z={-1.035}
            rotation-y={Math.PI * 0.5}
          >
            <ringGeometry args={[0.15, 0.26, 32, 1, 0, Math.PI * 2]} />
            <meshStandardMaterial
              roughness={0.5}
              color="red"
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh
            ref={row1}
            position-y={0.55}
            position-x={-1.11}
            position-z={-1.035}
            scale={[0.5, 0.08, 0.2]}
            rotation-y={Math.PI * 0.5}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              color="gray"
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            ref={row2}
            position-y={0.4}
            position-x={-1.11}
            position-z={-1.035}
            scale={[0.5, 0.08, 0.2]}
            rotation-y={Math.PI * 0.5}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              color="gray"
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            ref={row3}
            position-y={0.25}
            position-x={-1.11}
            position-z={-1.035}
            scale={[0.5, 0.08, 0.2]}
            rotation-y={Math.PI * 0.5}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              color="gray"
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Third browser screen - 2/2 Rect*/}
          <mesh
            position-y={0.7}
            position-x={-1}
            scale={[1.8, 1.3, 0.2]}
            rotation-y={Math.PI * 0.5}
            position-z={0.48}
            castShadow
          >
            <boxGeometry />
            <meshStandardMaterial roughness={0.5} color="skyblue" />
          </mesh>
          <mesh
            position-y={0.95}
            position-x={-1.11}
            scale={0.5}
            rotation-y={Math.PI * 0.5}
            position-z={0}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              color="greenyellow"
              map={imageicontexture}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            position-y={1.15}
            position-x={-1.11}
            position-z={0.8}
            scale={[0.95, 0.08, 0.2]}
            rotation-y={Math.PI * 0.5}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              color="gray"
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            position-y={1}
            position-x={-1.11}
            position-z={0.8}
            scale={[0.95, 0.08, 0.2]}
            rotation-y={Math.PI * 0.5}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              color="gray"
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            position-y={0.85}
            position-x={-1.11}
            position-z={0.8}
            scale={[0.95, 0.08, 0.2]}
            rotation-y={Math.PI * 0.5}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              color="gray"
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            position-y={0.55}
            position-x={-1.11}
            position-z={0.5}
            scale={[1.55, 0.08, 0.2]}
            rotation-y={Math.PI * 0.5}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              color="gray"
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* STARS */}
          <mesh
            ref={star1}
            position-y={0.27}
            position-x={-1.11}
            position-z={-0.14}
            rotation-y={Math.PI * 0.5}
            scale={0.4}
          >
            <planeGeometry />

            <meshStandardMaterial
              roughness={0.5}
              attach="material"
              color="yellow"
              transparent={true}
              alphaMap={starTexture}
              alphaTest={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            ref={star2}
            position-y={0.27}
            position-x={-1.11}
            position-z={0.2}
            rotation-y={Math.PI * 0.5}
            scale={0.4}
          >
            <planeGeometry />

            <meshStandardMaterial
              roughness={0.5}
              attach="material"
              color="yellow"
              transparent={true}
              alphaMap={starTexture}
              alphaTest={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            ref={star3}
            position-y={0.27}
            position-x={-1.11}
            position-z={0.54}
            rotation-y={Math.PI * 0.5}
            scale={0.4}
          >
            <planeGeometry />
            <meshStandardMaterial
              roughness={0.5}
              attach="material"
              color="yellow"
              transparent={true}
              alphaMap={starTexture}
              alphaTest={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            ref={star4}
            position-y={0.27}
            position-x={-1.11}
            position-z={0.88}
            rotation-y={Math.PI * 0.5}
            scale={0.4}
          >
            <planeGeometry />

            <meshStandardMaterial
              roughness={0.5}
              attach="material"
              color="yellow"
              transparent={true}
              alphaMap={starTexture}
              alphaTest={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Three Cylinders */}
          <mesh
            position={[-0.1, 2.3, -2.5]}
            rotation-z={Math.PI * 0.5}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 0.08, 32]} />
            <meshStandardMaterial roughness={0.5} color="red" />
          </mesh>
          <mesh
            position={[-0.1, 2.3, -2.3]}
            rotation-z={Math.PI * 0.5}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 0.08, 32]} />
            <meshStandardMaterial roughness={0.5} color="yellow" />
          </mesh>
          <mesh
            position={[-0.1, 2.3, -2.1]}
            rotation-z={Math.PI * 0.5}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 0.08, 32]} />
            <meshStandardMaterial roughness={0.5} color="green" />
          </mesh>

          {/* Mail Model */}
          <primitive
            object={mailModel.scene}
            scale={0.2}
            position={[-0.5, 0.1, 3]}
            rotation-y={Math.PI * -0.5}
          />

          {/* Floor */}
          <mesh
            position-y={-1}
            position-x={2}
            rotation-x={-Math.PI * 0.5}
            scale={[5, 9, 0.1]}
            receiveShadow
          >
            <planeGeometry />
            <meshStandardMaterial toneMapped={false} color="white" />
          </mesh>
          {/* Sphere */}
          <mesh
            ref={yellowBall}
            position={[-0.7, -0.2, -2.6]}
            scale={0.4}
            castShadow
          >
            <sphereGeometry args={[1]} />
            <meshStandardMaterial roughness={0.5} color="orange" />
          </mesh>

          {/* Web Model */}
          <primitive
            ref={webmodelref}
            object={webModel.scene}
            scale={0.15}
            position={[-0.5, 0.1, -3.7]}
          />

          {/* Padlock Model */}
          <primitive
            ref={lock}
            object={padlockModel.scene}
            scale={0.2}
            position={[-0.5, 0.1, -3.7]}
          />
        </group>
      </group>
    </>
  );
};

export default Experience;
