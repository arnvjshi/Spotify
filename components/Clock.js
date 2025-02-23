"use client"

import { useState, useEffect } from "react"
import { Typography } from "@mui/material"
import { motion } from "framer-motion"

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Typography variant="h3" component="div" sx={{ fontWeight: "bold", color: "primary.main" }}>
        {time.toLocaleTimeString()}
      </Typography>
    </motion.div>
  )
}

