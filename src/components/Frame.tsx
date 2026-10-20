import { useState } from 'react'

export type Shot = readonly [string, string]

export function Frame({ shot, onOpen, compact = false }: { shot: Shot; onOpen: (shot: Shot) => void; compact?: boolean }) {
  const [src, alt] = shot
  return <figure className={`shot ${compact ? 'shot-compact' : ''}`}>
    <button className="shot-button" onClick={() => onOpen(shot)} aria-label={`Open image: ${alt}`}>
      <span className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{alt}</span></span>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </button><figcaption>{alt}</figcaption>
  </figure>
}
