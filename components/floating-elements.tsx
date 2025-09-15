"use client"
import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary/20 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent/20 rounded-full"
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-primary/15 rounded-full"
        animate={{
          y: [0, 18, 0],
          x: [0, -12, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  )
}
