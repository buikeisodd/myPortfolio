import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Dot follows mouse precisely
  const dotX = useSpring(mx, { stiffness: 1000, damping: 40 })
const dotY = useSpring(my, { stiffness: 1000, damping: 40 })

const ringX = useSpring(mx, { stiffness: 300, damping: 35 })
const ringY = useSpring(my, { stiffness: 300, damping: 35 })

  useEffect(() => {
    // Only activate on fine-pointer devices (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    // Track hover on interactive elements
    const onHoverIn = () => setHovering(true)
    const onHoverOut = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    const interactive = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
      })
    }
  }, [mx, my, visible])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.8 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.25 } }}
      >
        <div
          className="rounded-full border transition-colors duration-300"
          style={{
            width: hovering ? 36 : 32,
            height: hovering ? 36 : 32,
            borderColor: hovering ? '#a3e635' : 'rgba(163,230,53,0.45)',
            transition: 'width 0.25s, height 0.25s, border-color 0.25s',
          }}
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
      </motion.div>
    </>
  )
}
