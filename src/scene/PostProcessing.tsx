import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { useCosmosStore } from '../store'

/**
 * Post-processing — soft, warm, cocoon-like.
 *
 * Deeper vignette creates "safe space" feeling.
 * Softer bloom wraps everything in gentle glow.
 * No harsh effects.
 */

function PostProcessingWithCA() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.1}
        luminanceSmoothing={0.95}
        intensity={2.0}
        radius={0.92}
        mipmapBlur
      />
      <Vignette
        offset={0.15}
        darkness={0.88}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        offset={new Vector2(0.0004, 0.0004)}
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
        luminanceThreshold={0.1}
        luminanceSmoothing={0.95}
        intensity={2.0}
        radius={0.92}
        mipmapBlur
      />
      <Vignette
        offset={0.15}
        darkness={0.88}
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
