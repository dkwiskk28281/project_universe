import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { useCosmosStore } from '../store'

function PostProcessingWithCA() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        intensity={2.2}
        radius={0.85}
        mipmapBlur
      />
      <Vignette
        offset={0.25}
        darkness={0.8}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        offset={new Vector2(0.0007, 0.0007)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation
        modulationOffset={0.5}
      />
    </EffectComposer>
  )
}

function PostProcessingBasic() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        intensity={2.2}
        radius={0.85}
        mipmapBlur
      />
      <Vignette
        offset={0.25}
        darkness={0.8}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}

export function PostProcessing() {
  const { qualityPreset } = useCosmosStore()

  if (qualityPreset.enableChromaticAberration) {
    return <PostProcessingWithCA />
  }
  return <PostProcessingBasic />
}
