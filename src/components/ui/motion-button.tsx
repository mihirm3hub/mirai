'use client'

import { FC } from 'react'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

interface Props {
  label: string
  href?: string
  variant?: 'primary' | 'secondary'
  classes?: string
  animate?: boolean
  delay?: number
}

const MotionButton: FC<Props> = ({ label, href, classes, variant = 'primary' }) => {
  const className = cn(
    'motion-button',
    variant === 'secondary' && 'motion-button-secondary',
    classes
  )

  const content = (
    <>
      <span
        className={cn(
          'motion-button-circle',
          variant === 'secondary' && 'motion-button-circle-secondary'
        )}
        aria-hidden="true"
      />
      <div className="motion-button-icon">
        <ArrowRight className="motion-button-icon-svg" />
      </div>
      <span className="motion-button-text">
        {label}
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={className}>
      {content}
    </button>
  )
}

export default MotionButton
