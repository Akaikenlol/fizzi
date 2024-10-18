import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Text } from "@react-three/drei";
import React from "react";
import * as THREE from "three";

type Props = {
  sentence: string;
  color?: string;
};

const ThreeText = ({ sentence, color }: Props) => {
  const words = sentence.toUpperCase().split(" ");
  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return words.map((word: string, wordI: number) => (
    <Text
      key={`${wordI} - ${word}`}
      scale={isDesktop ? 1 : 0.5}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
    >
      {word}
    </Text>
  ));
};

export default ThreeText;
