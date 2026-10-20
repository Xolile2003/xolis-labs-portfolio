import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Shot } from './Frame'

export function Lightbox({ shot, group, navigate, close }: { shot: Shot | null; group: readonly Shot[]; navigate: (shot: Shot) => void; close: () => void }) {
  const button = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!shot) return
    button.current?.focus()
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'Tab') {
        const controls = dialog.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
        if (!controls?.length) return
        const current = Array.from(controls).indexOf(document.activeElement as HTMLButtonElement)
        if (event.shiftKey && current <= 0) { event.preventDefault(); controls[controls.length - 1].focus() }
        else if (!event.shiftKey && current === controls.length - 1) { event.preventDefault(); controls[0].focus() }
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const current = group.findIndex(item => item[0] === shot[0])
        const by = event.key === 'ArrowRight' ? 1 : -1
        const next = group[(current + by + group.length) % group.length]
        if (next) navigate(next)
      }
    }
    document.addEventListener('keydown', key)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = '' }
  }, [shot, group, navigate, close])
  if (!shot) return null
  const index = group.findIndex(item => item[0] === shot[0])
  const move = (by: number) => { const next = group[(index + by + group.length) % group.length]; if (next) navigate(next) }
  return <div ref={dialog} className="lightbox" role="dialog" aria-modal="true" aria-label={shot[1]} onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
    <button ref={button} className="lightbox-close" onClick={close} aria-label="Close image"><X size={20} /></button>
    {group.length > 1 && <><button className="lightbox-prev" onClick={() => move(-1)} aria-label="Previous image">←</button><button className="lightbox-next" onClick={() => move(1)} aria-label="Next image">→</button></>}
    <figure><img src={shot[0]} alt={shot[1]} /><figcaption>{shot[1]}</figcaption></figure>
  </div>
}
