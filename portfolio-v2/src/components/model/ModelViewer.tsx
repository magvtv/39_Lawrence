import { Card, CardContent } from "@/components/ui/card";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import type React from "react";
import { Suspense, useRef } from "react";

interface ModelViewerProps {
  url: string;
  className?: string;
  backgroundColor?: string;
  autoRotate?: boolean;
}

// Component to handle loading the 3D model
const Model = ({
  url,
  autoRotate = true,
}: { url: string; autoRotate?: boolean }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Auto-rotate the model
  useFrame((state) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={viewport.width / 5}
      position={[0, 0, 0]}
    />
  );
};

// Main component
export const ModelViewer: React.FC<ModelViewerProps> = ({
  url,
  className = "",
  backgroundColor = "#000000",
  autoRotate = true,
}) => {
  // For animated entry
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-[400px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <color attach="background" args={[backgroundColor]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />

              <Suspense fallback={null}>
                <Model url={url} autoRotate={autoRotate} />
                <Environment preset="city" />
              </Suspense>

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={false}
              />
            </Canvas>

            {/* Loading indicator overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Suspense
                fallback={
                  <div className="bg-black/20 backdrop-blur-sm p-3 rounded-full">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                  </div>
                }
              >
                <span className="sr-only">3D Model Loaded</span>
              </Suspense>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModelViewer;
