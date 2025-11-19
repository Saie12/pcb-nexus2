import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Maximize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { modelCache } from "@/hooks/usePreloadAssets";

interface Model3DViewerProps {
  modelPath: string;
  className?: string;
}

function Model({ modelPath }: { modelPath: string }) {
  // Check cache first, otherwise load normally
  const gltf = modelCache.has(modelPath) 
    ? modelCache.get(modelPath) 
    : useLoader(GLTFLoader, modelPath);
  
  // Scale up the model significantly for better visibility
  return <primitive object={gltf.scene} scale={6} />;
}

export default function Model3DViewer({ modelPath, className = "" }: Model3DViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative w-full h-[550px] md:h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Decorative border glow */}
      <div className="absolute inset-0 rounded-2xl border border-[#00ff88]/30 shadow-[0_0_30px_rgba(0,255,136,0.15)]" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent pointer-events-none z-10" />

      <Canvas
        camera={{ position: [0, 0, 1.2], fov: 75 }}
        style={{ background: "transparent" }}
        onCreated={() => {
          setLoadProgress(100);
          setTimeout(() => setIsLoading(false), 500);
        }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Stage
            intensity={1.5}
            environment="city"
            shadows={{
              type: "contact",
              opacity: 0.5,
              blur: 2.5,
            }}
            adjustCamera={false}
          >
            <Model modelPath={modelPath} />
          </Stage>
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            enableDamping={true}
            dampingFactor={0.05}
            minDistance={0.4}
            maxDistance={3}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            rotateSpeed={0.8}
            zoomSpeed={1.2}
            panSpeed={0.8}
          />
        </Suspense>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.8} />
        <pointLight position={[0, 5, 5]} intensity={0.8} color="#00ff88" />
      </Canvas>

      {/* Enhanced Loading indicator with progress */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a]/95 via-[#111111]/95 to-[#0a0a0a]/95 backdrop-blur-md z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-6"
            >
              <Loader2 className="w-16 h-16 text-[#00ff88]" />
            </motion.div>
            
            <div className="w-64 h-2 bg-[#00ff88]/10 rounded-full overflow-hidden border border-[#00ff88]/20">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00ff88] to-[#00BFFF] shadow-[0_0_10px_rgba(0,255,136,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <motion.p
              className="text-sm text-[#00ff88] mt-4 font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading 3D Model... {loadProgress}%
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control hints - appears on hover */}
      <AnimatePresence>
        {!isLoading && showControls && (
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-3 bg-[#0a0a0a]/90 border border-[#00ff88]/30 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(0,255,136,0.2)]">
              <div className="flex items-center gap-6 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-[#00ff88]" />
                  <span>Drag to rotate</span>
                </div>
                <div className="w-px h-4 bg-[#00ff88]/30" />
                <div className="flex items-center gap-2">
                  <ZoomIn size={14} className="text-[#00ff88]" />
                  <span>Scroll to zoom</span>
                </div>
                <div className="w-px h-4 bg-[#00ff88]/30" />
                <div className="flex items-center gap-2">
                  <Maximize2 size={14} className="text-[#00ff88]" />
                  <span>Right-click to pan</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner accent decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#00ff88]/40 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#00ff88]/40 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#00ff88]/40 rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#00ff88]/40 rounded-br-2xl pointer-events-none" />
    </motion.div>
  );
}