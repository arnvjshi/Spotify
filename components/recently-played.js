"use client"

import { motion } from "framer-motion"
import { PlaylistCard } from "@/components/playlist-card"

export function RecentlyPlayed() {
  const recentPlaylists = [
    {
      id: 1,
      title: "Liked Songs",
      description: "Your favorite tracks",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 125,
    },
    {
      id: 2,
      title: "Chill Vibes",
      description: "Relaxing tunes for your day",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 42,
    },
    {
      id: 3,
      title: "Workout Mix",
      description: "Energy boosters for your workout",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 38,
    },
    {
      id: 4,
      title: "Road Trip",
      description: "Songs for the long drive",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 67,
    },
  ]

  return (
    <section>
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Recently played
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentPlaylists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
          >
            <PlaylistCard playlist={playlist} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

