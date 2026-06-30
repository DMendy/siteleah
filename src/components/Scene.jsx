import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function CameraRig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.038
    camera.position.y += (mouse.y * 0.9 - camera.position.y) * 0.038
    camera.lookAt(0, 0, 0)
  })
  return null
}

const petalShape = (() => {
  const s = new THREE.Shape()
  s.moveTo(0, 0)
  s.bezierCurveTo(-0.13, 0.2, -0.17, 0.68, 0, 1)
  s.bezierCurveTo(0.17, 0.68, 0.13, 0.2, 0, 0)
  return s
})()

const featherShape = (() => {
  const s = new THREE.Shape()
  s.moveTo(0, 0)
  s.bezierCurveTo(-0.07, 0.4, -0.22, 1.3, -0.09, 2.3)
  s.bezierCurveTo(-0.05, 2.5, 0, 2.65, 0, 2.65)
  s.bezierCurveTo(0, 2.65, 0.05, 2.5, 0.09, 2.3)
  s.bezierCurveTo(0.22, 1.3, 0.07, 0.4, 0, 0)
  return s
})()

const mat = {
  petal: { roughness: 0.85, metalness: 0, side: THREE.DoubleSide },
  feather: { roughness: 0.9, metalness: 0, side: THREE.DoubleSide },
}

function Flower({ position, scale = 1, color = '#f4d7cf', centerColor = '#c69b55', petalCount = 5, speed = 0.5, rotOffset = 0 }) {
  return (
    <Float speed={speed} floatIntensity={0.55} rotationIntensity={0.07}>
      <group position={position} scale={scale} rotation={[0.12, 0.18, rotOffset]}>
        {Array.from({ length: petalCount }, (_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / petalCount]}>
            <shapeGeometry args={[petalShape, 8]} />
            <meshStandardMaterial color={color} transparent opacity={0.68} {...mat.petal} />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.2, 16]} />
          <meshStandardMaterial color={centerColor} transparent opacity={0.88} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  )
}

function Feather({ position, scale = 1, color = '#d4b896', speed = 0.4, rotOffset = 0 }) {
  return (
    <Float speed={speed} floatIntensity={0.65} rotationIntensity={0.06}>
      <group position={position} scale={scale} rotation={[0.18, 0.1, rotOffset]}>
        <mesh>
          <shapeGeometry args={[featherShape, 12]} />
          <meshStandardMaterial color={color} transparent opacity={0.6} {...mat.feather} />
        </mesh>
        <mesh position={[0, 1.32, 0.02]}>
          <capsuleGeometry args={[0.009, 2.65, 4, 6]} />
          <meshStandardMaterial color={color} transparent opacity={0.8} roughness={0.9} />
        </mesh>
      </group>
    </Float>
  )
}

function Dust({ count = 110 }) {
  const ref = useRef()
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 26
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.012
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.007) * 0.04
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.026} color="#7ED9D6" transparent opacity={0.22} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export function Scene() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <Canvas dpr={[1, 1.2]} camera={{ position: [0, 0, 9], fov: 50 }} gl={{ antialias: false, alpha: true }}>
        <CameraRig />
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 6, 4]} intensity={0.5} color="#e6fbfa" />

        {/* Fleurs */}
        <Flower position={[3.8, 2.6, -4]}  scale={1.5} color="#b8e8e4" centerColor="#007F7F" rotOffset={0.3}  speed={0.45} />
        <Flower position={[-4.2, 3.2, -6]} scale={1.1} color="#7ED9D6" centerColor="#005f5f" petalCount={6} rotOffset={1.1} speed={0.35} />
        <Flower position={[4.6, -2.8, -3]} scale={0.9} color="#a8dedd" centerColor="#007F7F" rotOffset={2.2}  speed={0.58} />
        <Flower position={[-2.2, -4, -5]}  scale={1.2} color="#c2ece9" centerColor="#00A8A8" petalCount={6} rotOffset={0.7} speed={0.42} />
        <Flower position={[0.6, 5.2, -7]}  scale={1.3} color="#7ED9D6" centerColor="#007F7F" rotOffset={1.8}  speed={0.38} />

        {/* Plumes */}
        <Feather position={[0.6, -0.4, -2]}  scale={3.8} color="#007F7F" rotOffset={0.12} speed={0.22} />
        <Feather position={[-5.2, 1.8, -4]}  scale={1.1} color="#1A7F8C" rotOffset={-0.4} speed={0.36} />
        <Feather position={[2.2, -1.8, -5]}  scale={1.0} color="#5FB3BD" rotOffset={0.6}  speed={0.44} />
        <Feather position={[-1.8, 4.2, -6]}  scale={1.4} color="#00A8A8" rotOffset={-1.2} speed={0.32} />
        <Feather position={[5.2, 0.2, -5]}   scale={0.85} color="#1A7F8C" rotOffset={1.4}  speed={0.5}  />

        <Dust count={110} />
      </Canvas>
    </div>
  )
}
