import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeContext } from '../ThemeProvider';
import { getCssVariableValue } from '../utils/themeTokens';

// Tech stack for orbiting around the robot
const techStack = [
  { name: 'React', icon: '⚛️', colorToken: '--brand-react', fallback: '#61dafb' },
  { name: 'TypeScript', icon: '🔷', colorToken: '--brand-typescript', fallback: '#3178c6' },
  { name: 'Next.js', icon: '▲', colorToken: '--brand-next', fallback: '#000000' },
  { name: 'Tailwind', icon: '🎨', colorToken: '--brand-tailwind', fallback: '#06b6d4' },
  { name: 'Three.js', icon: '🎮', colorToken: '--brand-three', fallback: '#000000' },
  { name: 'Node.js', icon: '🟢', colorToken: '--brand-node', fallback: '#339933' },
  { name: 'Python', icon: '🐍', colorToken: '--brand-python', fallback: '#3776ab' },
  { name: 'MongoDB', icon: '🍃', colorToken: '--brand-mongodb', fallback: '#47a248' },
  { name: 'Docker', icon: '🐳', colorToken: '--brand-docker', fallback: '#2496ed' },
  { name: 'AWS', icon: '☁️', colorToken: '--brand-aws', fallback: '#ff9900' },
];

const paletteTokens = {
  primary: { token: '--brand-robot-primary', fallback: '#00d4ff' },
  secondary: { token: '--brand-robot-secondary', fallback: '#ff6b6b' },
  accent: { token: '--brand-robot-tertiary', fallback: '#4ecdc4' },
  robot: { token: '--brand-robot-base', fallback: '#2c3e50' },
  robotAccent: { token: '--brand-robot-base-alt', fallback: '#34495e' },
  glow: { token: '--brand-robot-glow', fallback: '#00ffff' },
  space: { token: '--bg', fallback: '#0a0a0a' },
  stars: { token: '--px-white', fallback: '#ffffff' }
};

const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== 'string') {
    return `rgba(0, 0, 0, ${alpha})`;
  }
  if (!hex.startsWith('#')) {
    return hex;
  }
  let normalized = hex.slice(1);
  if (normalized.length === 3) {
    normalized = normalized.split('').map((char) => char + char).join('');
  }
  if (normalized.length !== 6) {
    return hex;
  }
  const value = parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Futuristic Robot Component
function Robot({ isHovered, palette }) {
  const robotRef = useRef();
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const { mouse, viewport } = useThree();
  
  useFrame((state) => {
    if (!robotRef.current || !headRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Mouse following for head
    const targetX = (mouse.x * viewport.width) * 0.1;
    const targetY = (mouse.y * viewport.height) * 0.1;
    
    // Smooth head tracking
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.05);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetY, 0.05);
    
    // Floating animation
    robotRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    
    // Idle rotation
    robotRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    
    // Eye glow intensity
    const eyeIntensity = isHovered ? 2.0 : 1.0;
    if (leftEyeRef.current?.material && rightEyeRef.current?.material) {
      leftEyeRef.current.material.emissiveIntensity = eyeIntensity;
      rightEyeRef.current.material.emissiveIntensity = eyeIntensity;
    }
  });

  return (
    <group ref={robotRef} position={[0, 0, 0]}>
      {/* Robot Body */}
      <mesh position={[0, -0.5, 0]} scale={[1.2, 1.8, 0.8]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={palette.robot}
          metalness={0.9}
          roughness={0.1}
          emissive={palette.robotAccent}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Robot Head */}
      <group ref={headRef} position={[0, 1.2, 0]}>
        <mesh scale={[0.8, 0.8, 0.8]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={palette.robot}
            metalness={0.9}
            roughness={0.1}
            emissive={palette.robotAccent}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Glowing Eyes */}
        <mesh ref={leftEyeRef} position={[-0.25, 0.1, 0.4]} scale={[0.1, 0.1, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={palette.glow}
            emissive={palette.glow}
            emissiveIntensity={1.0}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
        
        <mesh ref={rightEyeRef} position={[0.25, 0.1, 0.4]} scale={[0.1, 0.1, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={palette.glow}
            emissive={palette.glow}
            emissiveIntensity={1.0}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
      </group>
      
      {/* Robot Arms */}
      <mesh position={[-1.1, 0.2, 0]} rotation={[0, 0, Math.PI/6]} scale={[0.2, 1.2, 0.2]}>
        <cylinderGeometry args={[1, 1, 1, 12]} />
        <meshStandardMaterial
          color={palette.robotAccent}
          metalness={0.8}
          roughness={0.2}
          emissive={palette.robotAccent}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      <mesh position={[1.1, 0.2, 0]} rotation={[0, 0, -Math.PI/6]} scale={[0.2, 1.2, 0.2]}>
        <cylinderGeometry args={[1, 1, 1, 12]} />
        <meshStandardMaterial
          color={palette.robotAccent}
          metalness={0.8}
          roughness={0.2}
          emissive={palette.robotAccent}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Energy Core */}
      <mesh position={[0, 0, 0]} scale={[0.3, 0.3, 0.3]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={palette.primary}
          emissive={palette.primary}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// Tech Orbit Component - Tech logos orbiting around the robot
function TechOrbit({ techStack, textColor }) {
  const orbitRef = useRef();
  
  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.005; // Slow orbit rotation
    }
  });

  return (
    <group ref={orbitRef}>
      {techStack.map((tech, index) => {
        const angle = (index / techStack.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0; // Will be animated in TechIcon component
        
        return (
          <TechIcon
            key={tech.name}
            tech={tech}
            position={[x, y, z]}
            index={index}
            textColor={textColor}
          />
        );
      })}
    </group>
  );
}

// Individual Tech Icon Component
function TechIcon({ tech, position, index, textColor }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Spin on own axis
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color={tech.color}
          transparent
          opacity={0.2}
          emissive={tech.color}
          emissiveIntensity={0.3}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Main icon */}
      <mesh ref={meshRef}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Icon text overlay */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial
          color={textColor}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

// Space Particles Component
function SpaceParticles({ palette }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        scale: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.5 ? palette.primary : palette.accent
      })),
    [palette.primary, palette.accent]
  );

  return (
    <group>
      {particles.map((particle, i) => (
        <Particle key={i} {...particle} />
      ))}
    </group>
  );
}

// Individual Particle Component
function Particle({ position, scale, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Slow floating animation
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
}


// Main 3D Scene Component
function Scene({ palette, techStack, textColor }) {
  const [isHovered] = useState(false);

  return (
    <>
      {/* Space Background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color={palette.primary}
      />
      <pointLight
        position={[0, 0, 5]}
        intensity={0.5}
        color={palette.glow}
      />
      
      {/* Scene Elements */}
      <Robot isHovered={isHovered} palette={palette} />
      <TechOrbit techStack={techStack} textColor={textColor} />
      <SpaceParticles palette={palette} />
      
      {/* Orbit Controls with limits */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={15}
        enableRotate={true}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main Tech Stack Section - Futuristic Space Scene
function TechStackSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useThemeContext();
  const palette = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(paletteTokens).map(([key, { token, fallback }]) => [
          key,
          getCssVariableValue(token, fallback)
        ])
      ),
    [theme]
  );
  const resolvedTechStack = useMemo(
    () =>
      techStack.map((tech) => ({
        ...tech,
        color: getCssVariableValue(tech.colorToken, tech.fallback)
      })),
    [theme]
  );
  const badgeBackground = useMemo(() => hexToRgba(palette.primary, 0.1), [palette.primary]);
  const badgeBorder = useMemo(() => `1px solid ${hexToRgba(palette.primary, 0.18)}`, [palette.primary]);
  const highlightShadow = useMemo(() => `0 0 40px ${hexToRgba(palette.primary, 0.18)}`, [palette.primary]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <section style={{
      width: '100%',
      height: '100vh',
      background: 'var(--gradient-space)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        zIndex: 10,
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '12px 24px',
          borderRadius: '50px',
          background: badgeBackground,
          backdropFilter: 'blur(10px)',
          border: badgeBorder,
          marginBottom: '24px',
          fontSize: '14px',
          fontWeight: '600',
          color: palette.stars,
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          🚀 Full-Stack Developer
        </div>

        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          fontWeight: '900',
          margin: 0,
          background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          textShadow: highlightShadow
        }}>
          Tech Universe
        </h1>

        <p style={{
          fontSize: '1.4rem',
          color: palette.stars,
          margin: '24px 0 0 0',
          fontWeight: '400',
          maxWidth: '600px',
          lineHeight: 1.6,
          opacity: 0.8
        }}>
          Explore my technology ecosystem orbiting in digital space
        </p>
      </div>

      <div style={{
        width: '100%',
        height: '70vh',
        maxWidth: '1200px',
        position: 'relative',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'scale(1)' : 'scale(0.9)',
        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
      }}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            background: 'transparent'
          }}
        >
          <Scene palette={palette} techStack={resolvedTechStack} textColor={palette.stars} />
        </Canvas>
      </div>

      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '25px',
        background: badgeBackground,
        backdropFilter: 'blur(10px)',
        border: badgeBorder,
        color: palette.stars,
        fontSize: '14px',
        fontWeight: '600',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateX(0)' : 'translateX(50px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
      }}>
        Interactive 3D Scene
      </div>
    </section>
  );
}

export default TechStackSection;
