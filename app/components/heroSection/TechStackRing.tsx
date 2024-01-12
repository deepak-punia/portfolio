"use client"
import { useMemo } from "react";
import AddText from "./AddText";
import TechStackSquare from "./TechStackSquare";
import useisMobile from "./hooks/useisMobile";

const TechStackRing = ({ techStackTextures, ellipse, scrollPer }) => {
  const isMobile = window.innerWidth >= 768;

  let squares;
  if (isMobile) {
    squares = useMemo(() => {
      const temp = [];
      const count = techStackTextures.length;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = ellipse.a * Math.cos(angle);
        const z = ellipse.b * Math.sin(angle);
        temp.push(
          <TechStackSquare
            key={i}
            position={[0, z + 0.4, x]}
            texture={techStackTextures[i]}
            scrollPer={scrollPer}
          />
        );
      }
      temp.push(
        <AddText
        key={Math.random()}
          position={[-0.11, 2.1, 0]}
          fontSize={0.3}
          scrollPer={scrollPer}
          text={"Tech Stack"}
        />
      );
      return temp;
    }, [techStackTextures, ellipse]);
  } else {
    squares = useMemo(() => {
      const temp = [];
      const count = techStackTextures.length;
      for (let i = 0; i < count; i++) {
        const row = -Math.floor(i / 4);
        const col = i % 4;
        const x = col * 2; // Assuming each square is 1 unit apart horizontally
        const z = row * 2; // Assuming each square is 1 unit apart vertically

        temp.push(
          <TechStackSquare
            key={i}
            position={[0, z + 0.4, x - 3]}
            texture={techStackTextures[i]}
            scrollPer={scrollPer}
          />
        );
      }
      temp.push(
        <AddText
        key={Math.random()}
          position={[-0.11, 1.7, 0]}
          fontSize={0.5}
          scrollPer={scrollPer}
          text={"Tech Stack"}
        />
      );
      return temp;
    }, [techStackTextures, ellipse]);
  }

  return <>{squares}</>;
};

export default TechStackRing;
