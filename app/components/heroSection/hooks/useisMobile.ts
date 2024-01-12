"use client"
import { useEffect, useRef, useState } from 'react';

const useisMobile = () => {
  
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);
// console.log(isMobile)
  useEffect(() => {
        setIsMobile(window.innerWidth >= 768 ? true : false);
}, []);

  return isMobile;
};

export default useisMobile;
