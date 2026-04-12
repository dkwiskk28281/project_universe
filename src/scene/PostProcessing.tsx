import { EffectComposer, Bloom, Vignette, ChromaticAberration, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'
import { Vector2 } from 'three'
import { useCosmosStore } from '../store'

/**
 * Cinematic post-processing pipeline.
 *
 * Enhanced bloom for star glow, deeper vignette,
 * ACES filmic tone mapping for HDR-like dynamic range,
 * and subtle chromatic aberration for camera lens feel.
 */

function PostProcessingWithCA() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.15}
        luminanceSmoothing={0.95}
        intensity={2.5}
        radius={0.9}
        mipmapBlur
        levels={7}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette
        offset={0.25}
        darkness={0.8}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        offset={new Vector2(0.0008, 0.0008)}
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
        luminanceSmoothing={0.95}
        intensity={2.5}
        radius={0.9}
        mipmapBlur
        levels={5}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
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
