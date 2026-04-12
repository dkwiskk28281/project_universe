import { type QualityLevel } from './constants'

export function detectQualityLevel(): QualityLevel {
  const stored = localStorage.getItem('cosmos-quality')
  if (stored && (stored === 'low' || stored === 'medium' || stored === 'high')) {
    return stored
  }

  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  if (!gl) return 'low'

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
    if (renderer.includes('mali') || renderer.includes('adreno 5') || renderer.includes('powervr')) {
      return 'low'
    }
    if (renderer.includes('adreno 6') || renderer.includes('apple gpu') || renderer.includes('intel')) {
      return 'medium'
    }
    if (renderer.includes('nvidia') || renderer.includes('radeon') || renderer.includes('adreno 7')) {
      return 'high'
    }
  }

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  return isMobile ? 'medium' : 'high'
}

export function setQualityLevel(level: QualityLevel) {
  localStorage.setItem('cosmos-quality', level)
}
