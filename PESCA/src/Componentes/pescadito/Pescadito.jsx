import { useEffect, useRef } from "react";

export default function Pescadito({ startX, startY, endX, endY, onEnd }) {
  const pescaditoRef = useRef(null);

  useEffect(() => {
    const el = pescaditoRef.current;
    if (!el) return;

    // Inicializamos posición al inicio
    el.style.transform = `translate(${startX}px, ${startY}px)`;

    requestAnimationFrame(() => {
      el.style.transition = 'transform 1s ease-in-out';
      el.style.transform = `translate(${endX}px, ${endY}px)`;
    });

    const handleTransitionEnd = () => {
      onEnd();
    };

    el.addEventListener('transitionend', handleTransitionEnd);

    return () => el.removeEventListener('transitionend', handleTransitionEnd);
  }, [startX, startY, endX, endY, onEnd]);

  return (
  <img
    ref={pescaditoRef}
    src="https://i.imgur.com/0KfbG9T.png"
    alt="Pescadito"
    style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '30px',
      height: '30px',
      pointerEvents: 'none',
      zIndex: 2000,
      transform: `translate(${startX}px, ${startY}px)`,
      transition: 'transform 1s ease-in-out',
    }}
  />
);}