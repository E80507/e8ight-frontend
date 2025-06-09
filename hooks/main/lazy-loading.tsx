import React, { ReactNode, useEffect, useRef, useState } from "react";

const LazyLoad = ({ children }: { children: ReactNode }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 600;
    const rootMargin = isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: rootMargin,
        threshold: 0,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return <div ref={ref}>{isIntersecting ? children : null}</div>;
};

export default LazyLoad;
