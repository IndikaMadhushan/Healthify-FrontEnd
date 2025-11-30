import React, { useEffect, useState } from "react";

export default function CountUp({ end=0, duration=1500, suffix="" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf;
    function step(now){
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(end * progress);
      setV(current);
      if(progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  useEffect(()=> console.log("DebugCount final:", v), [v]);
  return <>{v}{suffix}</>;
}