"use client"

import { Canvas, useFrame } from '@react-three/fiber'
// import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// Create circular texture for particles
function createCircleTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  
  const context = canvas.getContext('2d')!
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 100
  
  // Create sharper radial gradient with higher contrast
  const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.95)')
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)')
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  
  context.fillStyle = gradient
  context.beginPath()
  context.arc(centerX, centerY, radius, 0, Math.PI * 2)
  context.fill()
  
  return canvas
}

/* Temporarily unused - FloatingOrb function
function FloatingOrb({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} scale={scale} args={[1, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.6}
          speed={4}
          roughness={0}
          metalness={1.0}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  )
}
*/

function ParticleWave() {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Create circle texture once with sharp settings
  const circleTexture = useMemo(() => {
    const texture = new THREE.CanvasTexture(createCircleTexture())
    texture.generateMipmaps = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBAFormat
    return texture
  }, [])
  
  // Seeded random function for consistent server/client rendering
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  const particlesGeometry = useMemo(() => {
    const count = 300
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Use seeded random with index to ensure consistency
      const x = (seededRandom(i * 3) - 0.5) * 15
      const y = (seededRandom(i * 3 + 1) - 0.5) * 8
      const z = (seededRandom(i * 3 + 2) - 0.5) * 15
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y  
      positions[i * 3 + 2] = z
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const z = positions[i + 2]
        positions[i + 1] += Math.sin(state.clock.elapsedTime + x * 0.1 + z * 0.1) * 0.001
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesGeometry.length / 3}
          array={particlesGeometry}
          itemSize={3}
          args={[particlesGeometry, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FFFFFF"
        size={0.15}
        transparent
        opacity={1.0}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        map={circleTexture}
        alphaTest={0.01}
      />
    </points>
  )
}

function GeometricShape() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[4, 0, -8]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        color="#8B5CF6"
        transparent
        opacity={0.5}
        wireframe
        emissive="#8B5CF6"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        className="absolute inset-0"
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          color="#ffffff" 
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={0.6} 
          color="#3B82F6" 
        />
        <pointLight 
          position={[10, 5, 5]} 
          intensity={0.5} 
          color="#8B5CF6" 
        />
        
        {/* Floating Orbs - Temporarily Hidden */}
        {/* <FloatingOrb position={[-4, 2, -3]} color="#3B82F6" scale={0.8} />
        <FloatingOrb position={[3, -1, -4]} color="#6366F1" scale={1.2} />
        <FloatingOrb position={[0, 3, -6]} color="#8B5CF6" scale={0.6} />
        <FloatingOrb position={[-2, -2, -2]} color="#06B6D4" scale={0.9} /> */}
        
        {/* Particle Wave */}
        <ParticleWave />
        
        {/* Geometric Shape */}
        <GeometricShape />
      </Canvas>
    </div>
  )
}
