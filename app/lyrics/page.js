"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/hooks/use-music-player"

export default function LyricsPage() {
  const { currentTrack } = useMusicPlayer()
  const [lyrics, setLyrics] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    // Simulate API fetch for lyrics
    setLoading(true)
    setTimeout(() => {
      // Mock lyrics data - would be replaced with actual API call
      setLyrics([
        { time: 0, text: "I've been reading books of old" },
        { time: 5, text: "The legends and the myths" },
        { time: 10, text: "Achilles and his gold" },
        { time: 15, text: "Hercules and his gifts" },
        { time: 20, text: "Spiderman's control" },
        { time: 25, text: "And Batman with his fists" },
        { time: 30, text: "And clearly I don't see myself upon that list" },
        { time: 35, text: "But she said, where'd you wanna go?" },
        { time: 40, text: "How much you wanna risk?" },
        { time: 45, text: "I'm not looking for somebody" },
        { time: 50, text: "With some superhuman gifts" },
        { time: 55, text: "Some superhero" },
        { time: 60, text: "Some fairytale bliss" },
        { time: 65, text: "Just something I can turn to" },
        { time: 70, text: "Somebody I can kiss" },
        { time: 75, text: "I want something just like this" },
      ])
      setLoading(false)

      // Simulate lyrics timing
      const interval = setInterval(() => {
        setCurrentLine((prev) => (prev + 1) % 16)
      }, 5000)

      return () => clearInterval(interval)
    }, 1000)
  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Lyrics</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {loading ? (
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        ) : (
          <div className="max-w-2xl w-full mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold">{currentTrack?.title || "Something Just Like This"}</h2>
              <p className="text-muted-foreground">{currentTrack?.artist || "The Chainsmokers & Coldplay"}</p>
            </motion.div>

            <div className="space-y-6 py-10">
              {lyrics.map((line, index) => (
                <motion.p
                  key={index}
                  className={`text-xl transition-all duration-500 ${
                    index === currentLine ? "font-bold text-primary scale-110" : "text-muted-foreground"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

