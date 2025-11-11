import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const lastPosition = useRef({ x: 0, y: 0, time: Date.now() });
  const velocityDecayRef = useRef<NodeJS.Timeout | null>(null);

  const cursorX = useSpring(0, { stiffness: 600, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 600, damping: 30 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const now = Date.now();
      const dt = (now - lastPosition.current.time) / 1000;
      
      if (dt > 0) {
        const dx = e.clientX - lastPosition.current.x;
        const dy = e.clientY - lastPosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = distance / dt;
        
        // Normalized velocity: 0-10 scale with clear thresholds
        const normalizedVelocity = Math.min(speed / 8, 10);
        setVelocity(normalizedVelocity);
        
        // Clear any existing decay timeout
        if (velocityDecayRef.current) {
          clearTimeout(velocityDecayRef.current);
        }
        
        // Decay velocity to 0 after 100ms of no movement
        velocityDecayRef.current = setTimeout(() => {
          setVelocity(0);
        }, 100);
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
      if (velocityDecayRef.current) {
        clearTimeout(velocityDecayRef.current);
      }
    };
  }, [cursorX, cursorY]);

  // Generate natural lightning bolt paths with jagged, branching effect
  const generateLightningPath = (angle: number, length: number) => {
    const segments = Math.max(3, Math.floor(length / 6));
    let path = "M 0 0";
    let currentX = 0;
    let currentY = 0;
    
    const angleRad = (angle * Math.PI) / 180;
    const baseDirectionX = Math.cos(angleRad);
    const baseDirectionY = Math.sin(angleRad);
    
    for (let i = 0; i < segments; i++) {
      const segmentLength = (length / segments) * (0.7 + Math.random() * 0.6);
      const jitter = (Math.random() - 0.5) * 20;
      
      currentX += baseDirectionX * segmentLength + jitter;
      currentY += baseDirectionY * segmentLength + jitter;
      
      path += ` L ${currentX} ${currentY}`;
      
      // Add occasional branches for natural look
      if (Math.random() > 0.7 && i < segments - 2 && i > 0) {
        const branchLength = segmentLength * (0.3 + Math.random() * 0.4);
        const branchAngle = (Math.random() - 0.5) * 70;
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
    // Clear speed thresholds
    // 0-1: no bolts
    // 1-3: 2-3 bolts, 8-12px length
    // 3-6: 3-5 bolts, 12-20px length
    // 6-10: 5-8 bolts, 20-30px length
    
    let boltCount: number;
    let baseLength: number;
    
    if (velocity < 1) {
      return [];
    } else if (velocity < 3) {
      boltCount = 2 + Math.floor(Math.random() * 2);
      baseLength = 8 + velocity * 1.5;
    } else if (velocity < 6) {
      boltCount = 3 + Math.floor(velocity * 0.5);
      baseLength = 12 + velocity * 1.5;
    } else {
      boltCount = 5 + Math.floor(velocity * 0.4);
      baseLength = 20 + velocity * 1.2;
    }
    
    const speedRatio = Math.min(velocity / 10, 1);
    
    return Array.from({ length: boltCount }, (_, i) => {
      const angle = (i / boltCount) * 360 + Math.random() * 40;
      const length = baseLength + Math.random() * 5;
      
      // Smooth color transition: blue (0,136,255) -> orange (255,107,53)
      const blueAmount = Math.max(0, 1 - speedRatio * 1.3);
      const orangeAmount = Math.min(1, speedRatio * 1.1);
      
      const r = Math.floor(0 * blueAmount + 255 * orangeAmount);
      const g = Math.floor(136 * blueAmount + 107 * orangeAmount);
      const b = Math.floor(255 * blueAmount + 53 * orangeAmount);
      
      return {
        id: `${i}-${Date.now()}`,
        angle,
        length,
        path: generateLightningPath(angle, length),
        color: `rgb(${r}, ${g}, ${b})`,
        opacity: 0.6 + speedRatio * 0.3,
        strokeWidth: 1.2 + speedRatio * 0.5,
      };
    });
  };

  const lightningBolts = generateLightningBolts();

  // Calculate glow color based on speed
  const speedRatio = Math.min(velocity / 10, 1);
  const glowR = Math.floor(0 * (1 - speedRatio) + 255 * speedRatio);
  const glowG = Math.floor(136 * (1 - speedRatio) + 107 * speedRatio);
  const glowB = Math.floor(255 * (1 - speedRatio) + 53 * speedRatio);

  return (
    <>
      {/* Complete Soldering Iron Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          x: cursorX, 
          y: cursorY,
          left: -16,
          top: -16,
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
        {/* Complete Soldering Iron SVG */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Handle (ergonomic grip) */}
          <ellipse
            cx="16"
            cy="22"
            rx="4.5"
            ry="5"
            fill="#34495E"
            stroke="#2C3E50"
            strokeWidth="0.5"
          />
          {/* Handle grip texture */}
          <path
            d="M12 20 Q16 20.5 20 20"
            stroke="#2C3E50"
            strokeWidth="0.4"
            fill="none"
          />
          <path
            d="M12 22 Q16 22.5 20 22"
            stroke="#2C3E50"
            strokeWidth="0.4"
            fill="none"
          />
          <path
            d="M12 24 Q16 24.5 20 24"
            stroke="#2C3E50"
            strokeWidth="0.4"
            fill="none"
          />
          
          {/* Metal barrel/shaft */}
          <rect
            x="14"
            y="10"
            width="4"
            height="12"
            rx="0.5"
            fill="#7F8C8D"
            stroke="#5D6D7E"
            strokeWidth="0.5"
          />
          
          {/* Heating element section */}
          <rect
            x="14.5"
            y="6"
            width="3"
            height="4"
            fill="#95A5A6"
            stroke="#7F8C8D"
            strokeWidth="0.4"
          />
          
          {/* Iron tip (conical) */}
          <path
            d="M16 2 L14.5 6 L17.5 6 Z"
            fill="#BDC3C7"
            stroke="#95A5A6"
            strokeWidth="0.5"
          />
          
          {/* Hot tip glow */}
          <circle
            cx="16"
            cy="3.5"
            r="2"
            fill={`rgb(${glowR}, ${glowG}, ${glowB})`}
            opacity={0.8 + velocity * 0.1}
            filter="url(#tip-glow)"
          />
          
          {/* Power cord/wire */}
          <path
            d="M16 27 Q17 28.5 18.5 29 Q20 29.5 22 29"
            stroke="#E74C3C"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M16 27 Q17 28.2 18.2 28.5"
            stroke="#C0392B"
            strokeWidth="0.6"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
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
            opacity: [bolt.opacity, bolt.opacity * 0.6, bolt.opacity],
          }}
          transition={{
            duration: 0.06,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
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

      {/* Electric glow effect around the tip - reduced to quarter size */}
      {velocity > 2 && (
        <motion.div
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: mousePosition.x - 12.5,
            top: mousePosition.y - 12.5,
            width: 25,
            height: 25,
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