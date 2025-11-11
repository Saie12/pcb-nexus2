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
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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

  // Generate natural lightning bolt paths with jagged, branching effect
  const generateLightningPath = (angle: number, length: number) => {
    const segments = Math.floor(length / 8) + 3;
    let path = "M 0 0";
    let currentX = 0;
    let currentY = 0;
    
    const angleRad = (angle * Math.PI) / 180;
    const baseDirectionX = Math.cos(angleRad);
    const baseDirectionY = Math.sin(angleRad);
    
    for (let i = 0; i < segments; i++) {
      const segmentLength = (length / segments) * (0.8 + Math.random() * 0.4);
      const jitter = (Math.random() - 0.5) * 25;
      
      currentX += baseDirectionX * segmentLength + jitter;
      currentY += baseDirectionY * segmentLength + jitter;
      
      path += ` L ${currentX} ${currentY}`;
      
      // Add occasional branches for natural look
      if (Math.random() > 0.65 && i < segments - 2) {
        const branchLength = segmentLength * (0.4 + Math.random() * 0.3);
        const branchAngle = (Math.random() - 0.5) * 60;
        const branchRad = ((angle + branchAngle) * Math.PI) / 180;
        const branchX = currentX + Math.cos(branchRad) * branchLength;
        const branchY = currentY + Math.sin(branchRad) * branchLength;
        path += ` M ${currentX} ${currentY} L ${branchX} ${branchY}`;
        path += ` M ${currentX} ${currentY}`;
      }
    }
    
    return path;
  };

  const generateLightningBolts = () => {
    const boltCount = Math.max(2, Math.floor(velocity * 1.2));
    const speedRatio = Math.min(velocity / 10, 1);
    
    return Array.from({ length: boltCount }, (_, i) => {
      const angle = (i / boltCount) * 360 + Math.random() * 30;
      const length = 8 + velocity * 4 + Math.random() * 6;
      
      // Color transition: blue at low speed -> orange at high speed
      const blueAmount = Math.max(0, 1 - speedRatio * 1.5);
      const orangeAmount = Math.min(1, speedRatio * 1.2);
      
      const r = Math.floor(0 * blueAmount + 255 * orangeAmount);
      const g = Math.floor(136 * blueAmount + 107 * orangeAmount);
      const b = Math.floor(255 * blueAmount + 53 * orangeAmount);
      
      return {
        id: i,
        angle,
        length,
        path: generateLightningPath(angle, length),
        color: `rgb(${r}, ${g}, ${b})`,
        opacity: 0.5 + velocity * 0.05 + Math.random() * 0.2,
        strokeWidth: 1.5 + velocity * 0.3,
      };
    });
  };

  const lightningBolts = velocity > 0.5 ? generateLightningBolts() : [];

  // Calculate glow color based on speed
  const speedRatio = Math.min(velocity / 10, 1);
  const glowR = Math.floor(0 * (1 - speedRatio) + 255 * speedRatio);
  const glowG = Math.floor(136 * (1 - speedRatio) + 107 * speedRatio);
  const glowB = Math.floor(255 * (1 - speedRatio) + 53 * speedRatio);

  return (
    <>
      {/* Soldering Iron Tip Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          x: cursorX, 
          y: cursorY,
          left: -12,
          top: -12,
        }}
        animate={{
          scale: isHovering ? 1.3 : isClicking ? 0.9 : 1 + velocity * 0.08,
          rotate: isHovering ? 15 : velocity * 8,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        {/* Soldering Iron Tip SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Iron tip (pointed) */}
          <path
            d="M12 2 L8 8 L10 8 L10 14 L14 14 L14 8 L16 8 Z"
            fill="#C0C0C0"
            stroke="#808080"
            strokeWidth="0.5"
          />
          {/* Hot tip glow */}
          <circle
            cx="12"
            cy="3"
            r="2"
            fill={`rgb(${glowR}, ${glowG}, ${glowB})`}
            opacity={0.8 + velocity * 0.1}
            filter="url(#tip-glow)"
          />
          <defs>
            <filter id="tip-glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* Lightning bolts emanating from the tip */}
      {lightningBolts.map((bolt) => (
        <motion.svg
          key={bolt.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: bolt.length * 2.5,
            height: bolt.length * 2.5,
            overflow: "visible",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [bolt.opacity, bolt.opacity * 0.7, bolt.opacity],
          }}
          transition={{
            duration: 0.08 + Math.random() * 0.05,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <g transform={`rotate(${bolt.angle} 0 0)`}>
            <path
              d={bolt.path}
              stroke={bolt.color}
              strokeWidth={bolt.strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#lightning-glow)"
            />
          </g>
          <defs>
            <filter id="lightning-glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </motion.svg>
      ))}

      {/* Electric glow effect around the tip */}
      {velocity > 2 && (
        <motion.div
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(${glowR}, ${glowG}, ${glowB}, ${velocity * 0.12}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${velocity * 10}px rgba(${glowR}, ${glowG}, ${glowB}, ${velocity * 0.25})`,
            }}
          />
        </motion.div>
      )}
    </>
  );
}