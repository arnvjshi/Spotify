"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/hooks/use-music-player"

export function PlaylistCard({ playlist }) {
  const { setCurrentTrack, play } = useMusicPlayer()
  const [isHovered, setIsHovered] = useState(false)

  const handlePlay = (e) => {
    e.preventDefault()
    setCurrentTrack({
      id: 1,
      title: playlist.title,
      artist: playlist.description,
      album: playlist.title,
      duration: "3:20",
      cover: playlist.cover,
    })
    play()
  }

  return (
    <Link href={`/playlist/${playlist.id}`}>
      <motion.div
        className="group relative bg-card rounded-lg p-4 transition-all hover:bg-card/80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative aspect-square rounded-md overflow-hidden mb-4 shadow-md">
          <Image
            src={playlist.cover || "/placeholder.svg"}
            alt={playlist.title}
            fill
            className="object-cover transition-all group-hover:scale-105 duration-300"
          />
          <motion.div
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
          >
            <Button
              size="icon"
              className="rounded-full bg-primary text-primary-foreground h-10 w-10 shadow-lg"
              onClick={handlePlay}
            >
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </Button>
          </motion.div>
        </div>
        <h3 className="font-semibold line-clamp-1">{playlist.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{playlist.description}</p>
      </motion.div>
    </Link>
  )
}

