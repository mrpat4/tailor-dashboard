import { useState, useEffect } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const useTailwindBreakpoints = () => {
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [isXl, setIsXl] = useState(false);
  const [is2Xl, setIs2Xl] = useState(false);

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      setIsSm(width < breakpoints.sm);
      setIsMd(width < breakpoints.md);
      setIsLg(width < breakpoints.lg);
      setIsXl(width < breakpoints.xl);
      setIs2Xl(width < breakpoints["2xl"]);
    };

    updateBreakpoints();
    window.addEventListener("resize", updateBreakpoints);

    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);

  return { isSm, isMd, isLg, isXl, is2Xl };
};

export default useTailwindBreakpoints;
