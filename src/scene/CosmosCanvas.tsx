import { Canvas } from '@react-three/fiber'
import { useCosmosStore } from '../store'
import { CAMERA } from '../utils/constants'
import { CameraRig } from './CameraRig'
import { StarField } from './StarField'
import { MilkyWay } from './MilkyWay'
import { DistantGalaxies } from './DistantGalaxies'
import { NebulaSkybox } from './NebulaSkybox'
import { NebulaVolume } from './NebulaVolume'
import { PostProcessing } from './PostProcessing'
import { EncounterEntity } from './EncounterEntity'
import { ShootingStar } from './ShootingStar'
import { Supernova } from './Supernova'
import { CelestialBodies } from './CelestialBodies'

export function CosmosCanvas() {
  const { qualityPreset } = useCosmosStore()

  return (
    <Canvas
      dpr={qualityPreset.dpr}
      camera={{
        fov: CAMERA.fov,
        near: CAMERA.near,
        far: CAMERA.far,
        position: [0, 0, 0],
      }}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
        depth: true,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000',
      }}
    >
      <color attach="background" args={['#000000']} />
      <CameraRig />
      <NebulaSkybox />
      <NebulaVolume />
      <StarField />
      <MilkyWay />
      <DistantGalaxies />
      <CelestialBodies />
      <ShootingStar />
      <Supernova />
      <EncounterEntity />
      <PostProcessing />
    </Canvas>
  )
}
