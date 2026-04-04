"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { MeshStandardMaterial, Mesh, Group } from "three";

const BASE_ROTATION_SPEED = 1.05;
const SCROLL_BOOST_PER_PX = 0.02;
const SCROLL_BOOST_MAX = 14;
const SCROLL_BOOST_TO_SPEED = 1.35;
const SCROLL_BOOST_DECAY = 0.85;

function Logo() {
  const groupRef = useRef<Group>(null);
  const scrollBoostRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const { scene } = useGLTF("/matter-logo.gltf");

  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#FFFFFF",
        metalness: 1,
        roughness: 0,
        side: 2,
      }),
    [],
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = material;
      }
    });
  }, [scene, material]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = Math.abs(y - lastScrollYRef.current);
      lastScrollYRef.current = y;
      scrollBoostRef.current = Math.min(
        scrollBoostRef.current + dy * SCROLL_BOOST_PER_PX,
        SCROLL_BOOST_MAX,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    scrollBoostRef.current *= Math.exp(-SCROLL_BOOST_DECAY * delta);

    const speed =
      BASE_ROTATION_SPEED + scrollBoostRef.current * SCROLL_BOOST_TO_SPEED;
    groupRef.current.rotation.y += delta * speed;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/matter-logo.gltf");

export default function Scene3D() {
  return (
    <section className="scene-3d">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, -2, -5]} intensity={0.3} />
        <Logo />
        <Environment preset="city" />
      </Canvas>
    </section>
  );
}
