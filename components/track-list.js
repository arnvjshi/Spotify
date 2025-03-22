"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/hooks/use-music-player"

export function TrackList({ tracks }) {
  const { setCurrentTrack, play } = useMusicPlayer()
  const [hoveredTrack, setHoveredTrack] = useState(null)

  const handlePlay = (track) => {
    setCurrentTrack({
      id: track.id,
      title: track.title,
      artist: track.artist,
      album: track.album,
      duration: track.duration,
      cover: "/placeholder.svg?height=80&width=80",
    })
    play()
  }

  const formatPlays = (plays) => {
    if (plays >= 1000000) {
      return `${(plays / 1000000).toFixed(1)}M`
    } else if (plays >= 1000) {
      return `${(plays / 1000).toFixed(1)}K`
    }
    return plays
  }

  return (
    <div className="space-y-1">
      {tracks.map((track, index) => (
        <motion.div
          key={track.id}
          className={`grid grid-cols-12 py-2 px-4 rounded-md items-center ${
            hoveredTrack === track.id ? "bg-accent" : "hover:bg-accent/50"
          }`}
          onMouseEnter={() => setHoveredTrack(track.id)}
          onMouseLeave={() => setHoveredTrack(null)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.03 }}
        >
          <div className="col-span-1 flex items-center justify-center">
            {hoveredTrack === track.id ? (
              <Button size="icon" variant="ghost" className="h-8 w-8 p-0" onClick={() => handlePlay(track)}>
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <span className="text-muted-foreground">{index + 1}</span>
            )}
          </div>
          <div className="col-span-5">
            <div className="font-medium">{track.title}</div>
            <div className="text-sm text-muted-foreground">{track.artist}</div>
          </div>
          <div className="col-span-4 hidden md:block text-muted-foreground text-sm">{track.album}</div>
          <div className="col-span-2 flex items-center justify-end gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{formatPlays(track.plays)}</span>
            <span className="text-sm text-muted-foreground">{track.duration}</span>
            <Button size="icon" variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

