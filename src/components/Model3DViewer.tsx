import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Model3DViewerProps {
  modelPath: string;
  className?: string;
}

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

export default function Model3DViewer({ modelPath, className = "" }: Model3DViewerProps) {
  return (
    <motion.div
      className={`relative w-full h-[500px] rounded-xl overflow-hidden border border-[#00ff88]/20 bg-[#111111] ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <PresentationControls
              global
              snap
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <Model modelPath={modelPath} />
            </PresentationControls>
          </Stage>
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
          />
        </Suspense>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
      </Canvas>

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Loader2 className="w-8 h-8 animate-spin text-[#00ff88] opacity-50" />
      </div>

      {/* Interaction hint */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-sm text-[#00ff88] font-medium">
          🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </motion.div>
    </motion.div>
  );
}
