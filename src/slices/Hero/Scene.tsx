import FloatingCan from "@/components/FloatingCan";
import React from "react";
import { Environment } from "@react-three/drei";

const Scene = () => {
  return (
    <group>
      <FloatingCan />
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
};

export default Scene;
