"use client";

import React, { useRef } from "react";
import FloatingCan from "@/components/FloatingCan";
import * as THREE from "three";
import { Cloud, Environment } from "@react-three/drei";
import { Content } from "@prismicio/client";
import ThreeText from "@/components/ThreeText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = ({ sentence, flavor }: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 75 * (Math.PI / 180);

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  useGSAP(() => {
    if (
      !cloudsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current ||
      !canRef.current ||
      !wordsRef.current
    )
      return;

    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, { ...getXYPositions(-4) });

    gsap.set(
      wordsRef.current.children.map((word: any) => word.position),
      { ...getXYPositions(7), z: 2 },
    );

    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0}
          floatIntensity={3}
          floatSpeed={3}
        ></FloatingCan>
      </group>
      <FloatingCan ref={canRef}></FloatingCan>

      <Cloud ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Cloud>

      {/* Text */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#F97315" />}
      </group>

      {/* Lights */}
      <ambientLight intensity={2} color={"#9DDEFA"} />
      <Environment files={"/hdr/field.hdr"} environmentIntensity={1.5} />
    </group>
  );
};

export default Scene;
