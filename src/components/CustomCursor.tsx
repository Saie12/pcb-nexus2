import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const lastPosition = useRef({ x: 0, y: 0, time: Date.now() });

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const now = Date.now();
      const dt = (now - lastPosition.current.time) / 1000;
      
      if (dt > 0) {
        const dx = e.clientX - lastPosition.current.x;
        const dy = e.clientY - lastPosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = distance / dt;
        
        setVelocity(Math.min(speed / 10, 10));
      }
      
      lastPosition.current = { x: e.clientX, y: e.clientY, time: now };
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Generate lightning bolt paths with jagged, branching effect
  const generateLightningPath = (angle: number, length: number) => {
    const segments = Math.floor(length / 10);
    let path = "M 0 0";
    let currentX = 0;
    let currentY = 0;
    
    for (let i = 0; i < segments; i++) {
      const segmentLength = length / segments;
      const offsetX = (Math.random() - 0.5) * 15;
      const offsetY = segmentLength;
      
      currentX += offsetX;
      currentY += offsetY;
      
      path += ` L ${currentX} ${currentY}`;
      
      // Add occasional branches
      if (Math.random() > 0.7 && i < segments - 1) {
        const branchLength = segmentLength * 0.6;
        const branchX = currentX + (Math.random() - 0.5) * 20;
        const branchY = currentY + branchLength;
        path += ` M ${currentX} ${currentY} L ${branchX} ${branchY}`;
        path += ` M ${currentX} ${currentY}`;
      }
    }
    
    return path;
  };

  const generateLightningBolts = () => {
    const boltCount = Math.floor(velocity * 1.5);
    return Array.from({ length: boltCount }, (_, i) => {
      const angle = (i / boltCount) * Math.PI * 2;
      const length = 30 + velocity * 8;
      return {
        id: i,
        angle,
        length,
        path: generateLightningPath(angle, length),
        opacity: 0.4 + velocity * 0.06,
      };
    });
  };

  const lightningBolts = generateLightningBolts();

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovering ? 1.8 : isClicking ? 0.8 : 1 + velocity * 0.1,
          rotate: isHovering ? 90 : velocity * 10,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-[#00ff88] bg-[#00ff88]/20" />
      </motion.div>

      {/* Lightning bolts with jagged paths */}
      {lightningBolts.map((bolt) => (
        <motion.svg
          key={bolt.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: bolt.length * 2,
            height: bolt.length * 2,
            transform: `rotate(${(bolt.angle * 180) / Math.PI}deg)`,
            transformOrigin: "0 0",
          }}
          animate={{
            opacity: [bolt.opacity, bolt.opacity * 0.6, bolt.opacity],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <path
            d={bolt.path}
            stroke="#00BFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </motion.svg>
      ))}

      {/* Electric glow effect */}
      {velocity > 2 && (
        <motion.div
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: mousePosition.x - 40,
            top: mousePosition.y - 40,
            width: 80,
            height: 80,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(0, 191, 255, ${velocity * 0.15}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${velocity * 8}px rgba(0, 191, 255, ${velocity * 0.2})`,
            }}
          />
        </motion.div>
      )}

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.5 : 1 + velocity * 0.05,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
          mass: 0.2,
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-[#00BFFF]"
          style={{
            boxShadow: velocity > 1 ? `0 0 ${velocity * 3}px #00BFFF` : 'none',
          }}
        />
      </motion.div>
    </>
  );
}