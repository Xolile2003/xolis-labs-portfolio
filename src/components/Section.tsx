import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Section({ id, eyebrow, children, className = '' }: { id: string; eyebrow: string; children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <motion.section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: reduce ? 0 : 0.42, ease: 'easeOut' }}>
    <div className="section-inner"><p className="eyebrow">{eyebrow}</p>{children}</div>
  </motion.section>
}

export function Card({ label, title, children, orange = false, className = '' }: { label?: string; title?: string; children?: ReactNode; orange?: boolean; className?: string }) {
  return <article className={`card ${orange ? 'card-orange' : ''} ${className}`}>{label && <p className="card-label">{label}</p>}{title && <h3>{title}</h3>}{children && <div className="card-copy">{children}</div>}</article>
}
