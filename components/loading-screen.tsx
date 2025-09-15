"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-2xl">SMN</span>
              </div>
              <h1 className="font-playfair font-bold text-2xl text-foreground">Portfolio</h1>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"
              style={{ maxWidth: "200px" }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground mt-4 text-sm"
            >
              Chargement en cours...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
