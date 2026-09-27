import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../providers/ScrollProvider';

function Range() {
  const ref = useRef();
  useFrame((_, d) => {
    ref.current.rotation.y += d * 0.025;
  });
  return (
    <group ref={ref} position={[0, -1, 0]}>
      {[-2, 0, 2].map((x, i) => (
        <mesh key={x} position={[x, i * 0.15, 0]} rotation={[0, 0.35, 0]}>
          <coneGeometry args={[1.7, 3 + i, 5]} />
          <meshStandardMaterial color={i === 1 ? '#2e4a46' : '#253a38'} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export function MountainScrollScene() {
  const ref = useRef();
  const { refreshScroll } = useScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: 0.82 },
        {
          scale: 1.12,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });
    const refreshId = requestAnimationFrame(() => refreshScroll());
    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, [refreshScroll]);

  return (
    <div ref={ref} className="h-[360px] overflow-hidden bg-[#101a1a]">
      <Canvas camera={{ position: [0, 1.1, 8], fov: 40 }} dpr={[1, 1.5]}>
        <fog attach="fog" args={['#101a1a', 5, 12]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 4]} intensity={2} />
        <Range />
      </Canvas>
    </div>
  );
}
