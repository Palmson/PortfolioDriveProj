import { Float, Line, OrbitControls, PerspectiveCamera, useScroll } from "@react-three/drei";
import { Background } from "./Background";
import { useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from 'react';

import { LEGEND } from "./Legend";
import { City } from "./Firsttry";
import { Signs } from "./Signs";



const LINE_NB_POINTS = 100



export const Experience = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(1, 0, -3),
        new THREE.Vector3(1, 0, -95),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    )
    const curPoint = linePoints[curPointIndex];

    cameraGroup.current.position.lerp(curPoint, delta * 24)
  })

  return (
    <>
      {/* <OrbitControls enableZoom={false}/> */}
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0.69, 0.1, 1]} fov={40} makeDefault />
        <LEGEND scale={[1, 1, 1]} position-y={-0.2} position-x={1.1} position-z={0.69}/>
      </group>
      <mesh>
        <extrudeGeometry args={[
          shape,
          {steps: LINE_NB_POINTS,
          beveEnabled: false,
        extrudePath: curve,
      }
        ]} />
        <meshStandardMaterial color={"yellow"} opacity = {1} />
      </mesh>
      {/* <Street  rotation-y={Math.PI } scale={[1, 1, 1]} position-y={-0.4} position-x={-0.69} position-z={-46} /> */}
      <City   scale={[1, 1, 1]} position-y={-0.4} position-x={0} position-z={-46} />
      <Signs  scale={[1, 1, 1]} position-y={-0.4} position-x={0} position-z={-46} />
    </>
  );
};