import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { useCosmosStore } from '../store'

function PostProcessingWithCA() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.8}
        radius={0.85}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.75}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        offset={new Vector2(0.0006, 0.0006)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  )
}

function PostProcessingBasic() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.8}
        radius={0.85}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.75}
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
