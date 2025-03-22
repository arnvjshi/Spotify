"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrackList } from "@/components/track-list"

export default function PlaylistPage({ params }) {
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPlaylist({
        id: params.id,
        title: "Chill Vibes",
        description: "Relaxing tunes for your day",
        cover: "/placeholder.svg?height=300&width=300",
        owner: "SpotifyUser",
        followers: 1245,
        songs: 42,
        tracks: [
          {
            id: 1,
            title: "Sunset Lover",
            artist: "Petit Biscuit",
            album: "Petit Biscuit",
            duration: "3:56",
            plays: 12500000,
          },
          { id: 2, title: "Flares", artist: "BOJET", album: "Flares", duration: "4:23", plays: 8750000 },
          { id: 3, title: "Overthinker", artist: "INZO", album: "Overthinker", duration: "4:08", plays: 15300000 },
          { id: 4, title: "Bloom", artist: "Odesza", album: "In Return", duration: "3:15", plays: 9800000 },
          {
            id: 5,
            title: "Indian Summer",
            artist: "Jai Wolf",
            album: "Indian Summer",
            duration: "4:12",
            plays: 11200000,
          },
          { id: 6, title: "Innerbloom", artist: "RÜFÜS DU SOL", album: "Bloom", duration: "9:38", plays: 7600000 },
          { id: 7, title: "Breathe", artist: "Télépopmusik", album: "Genetic World", duration: "4:40", plays: 6300000 },
          {
            id: 8,
            title: "Midnight City",
            artist: "M83",
            album: "Hurry Up, We're Dreaming",
            duration: "4:03",
            plays: 18900000,
          },
        ],
      })
      setLoading(false)
    }, 800)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-60 h-60 shadow-xl"
        >
          <Image
            src={playlist.cover || "/placeholder.svg"}
            alt={playlist.title}
            fill
            className="object-cover rounded-md"
          />
        </motion.div>
        <motion.div
          className="flex flex-col gap-2 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span className="text-sm font-medium">PLAYLIST</span>
          <h1 className="text-4xl md:text-6xl font-bold">{playlist.title}</h1>
          <p className="text-muted-foreground">{playlist.description}</p>
          <div className="flex items-center gap-1 text-sm">
            <span className="font-medium">{playlist.owner}</span>
            <span>•</span>
            <span>{playlist.followers.toLocaleString()} likes</span>
            <span>•</span>
            <span>{playlist.songs} songs</span>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Button size="lg" className="rounded-full gap-2">
          <Play className="h-5 w-5 fill-black" />
          Play
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="pt-4">
        <div className="border-b mb-4">
          <div className="grid grid-cols-12 py-2 px-4 text-sm text-muted-foreground">
            <div className="col-span-1">#</div>
            <div className="col-span-5">TITLE</div>
            <div className="col-span-4 hidden md:block">ALBUM</div>
            <div className="col-span-2 flex justify-end">
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </div>
        <TrackList tracks={playlist.tracks} />
      </div>
    </div>
  )
}

