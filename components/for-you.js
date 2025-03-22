"use client"

import { motion } from "framer-motion"
import { PlaylistCard } from "@/components/playlist-card"

export function ForYou() {
  const forYouPlaylists = [
    {
      id: 5,
      title: "Daily Mix 1",
      description: "The Weeknd, Drake, Post Malone",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 25,
    },
    {
      id: 6,
      title: "Daily Mix 2",
      description: "Coldplay, Imagine Dragons, OneRepublic",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 25,
    },
    {
      id: 7,
      title: "Daily Mix 3",
      description: "Dua Lipa, Ariana Grande, Taylor Swift",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 25,
    },
    {
      id: 8,
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
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
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Made for you
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {forYouPlaylists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
          >
            <PlaylistCard playlist={playlist} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

