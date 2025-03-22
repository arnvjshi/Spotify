"use client"

import { motion } from "framer-motion"
import { PlaylistCard } from "@/components/playlist-card"

export function MadeForYou() {
  const madeForYouPlaylists = [
    {
      id: 9,
      title: "Release Radar",
      description: "Catch all the latest music from artists you follow",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 30,
    },
    {
      id: 10,
      title: "Time Capsule",
      description: "We made you a personalized playlist with songs to take you back in time",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 30,
    },
    {
      id: 11,
      title: "On Repeat",
      description: "Songs you've been playing most",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 30,
    },
    {
      id: 12,
      title: "Repeat Rewind",
      description: "Your past favorites",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 30,
    },
  ]

  return (
    <section>
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        Your top mixes
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {madeForYouPlaylists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
          >
            <PlaylistCard playlist={playlist} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

