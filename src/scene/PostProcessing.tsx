import { useMemo } from 'react'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { useCosmosStore } from '../store'

const BLOOM_BY_QUALITY = {
  low: { intensity: 1.0, radius: 0.6, luminanceThreshold: 0.3, luminanceSmoothing: 0.9 },
  medium: { intensity: 1.4, radius: 0.75, luminanceThreshold: 0.25, luminanceSmoothing: 0.9 },
  high: { intensity: 1.8, radius: 0.85, luminanceThreshold: 0.2, luminanceSmoothing: 0.9 },
} as const

const VIGNETTE_BY_QUALITY = {
  low: { offset: 0.4, darkness: 0.6 },
  medium: { offset: 0.35, darkness: 0.7 },
  high: { offset: 0.3, darkness: 0.75 },
} as const

export function PostProcessing() {
  const quality = useCosmosStore((s) => s.quality)
  const qualityPreset = useCosmosStore((s) => s.qualityPreset)

  const bloomSettings = BLOOM_BY_QUALITY[quality]
  const vignetteSettings = VIGNETTE_BY_QUALITY[quality]

  const caOffset = useMemo(() => new Vector2(0.0006, 0.0006), [])

  if (qualityPreset.enableChromaticAberration) {
    return (
      <EffectComposer>
        <Bloom
          luminanceThreshold={bloomSettings.luminanceThreshold}
          luminanceSmoothing={bloomSettings.luminanceSmoothing}
          intensity={bloomSettings.intensity}
          radius={bloomSettings.radius}
          mipmapBlur
        />
        <Vignette
          offset={vignetteSettings.offset}
          darkness={vignetteSettings.darkness}
          blendFunction={BlendFunction.NORMAL}
        />
        <ChromaticAberration
          offset={caOffset}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    )
  }

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={bloomSettings.luminanceThreshold}
        luminanceSmoothing={bloomSettings.luminanceSmoothing}
        intensity={bloomSettings.intensity}
        radius={bloomSettings.radius}
        mipmapBlur
      />
      <Vignette
        offset={vignetteSettings.offset}
        darkness={vignetteSettings.darkness}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
