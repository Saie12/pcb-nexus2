import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ShuffleProps {
  text: string;
  className?: string;
  delay?: number;
  onHover?: boolean;
}

export default function Shuffle({ text, className = "", delay = 0, onHover = false }: ShuffleProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const originalText = text;
    let iteration = 0;

    const animateChars = () => {
      const interval = setInterval(() => {
        if (!element) return;

        element.innerText = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    if (onHover) {
      element.addEventListener("mouseenter", animateChars);
      return () => element.removeEventListener("mouseenter", animateChars);
    } else {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (!prefersReducedMotion) {
        ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          onEnter: () => {
            setTimeout(animateChars, delay);
          },
          once: true,
        });
      }
    }
  }, [text, delay, onHover]);

  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
}
