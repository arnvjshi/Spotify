"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useMusicPlayer } from "@/hooks/use-music-player"

export function HomeHero() {
  const { setCurrentTrack, play } = useMusicPlayer()
  const [greeting, setGreeting] = useState("")
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)

    const hour = time.getHours()
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning")
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }

    return () => clearInterval(timer)
  }, [time])

  const handlePlay = () => {
    setCurrentTrack({
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      cover: "/placeholder.svg?height=80&width=80",
    })
    play()
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-6">{greeting}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="bg-black/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 group hover:bg-black/20 transition-colors cursor-pointer"
            onClick={handlePlay}
          >
            <div className="relative w-12 h-12 rounded overflow-hidden">
              <img src="/placeholder.svg?height=48&width=48" alt="Playlist cover" className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-6 w-6 fill-white text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Liked Songs</h3>
              <p className="text-sm text-muted-foreground">125 songs</p>
            </div>
          </div>
          <div
            className="bg-black/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 group hover:bg-black/20 transition-colors cursor-pointer"
            onClick={handlePlay}
          >
            <div className="relative w-12 h-12 rounded overflow-hidden">
              <img src="/placeholder.svg?height=48&width=48" alt="Playlist cover" className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-6 w-6 fill-white text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Daily Mix 1</h3>
              <p className="text-sm text-muted-foreground">For you</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

