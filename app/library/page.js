"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlaylistCard } from "@/components/playlist-card"

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState([
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
    {
      id: 5,
      title: "90s Hits",
      description: "Throwback to the 90s",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 83,
    },
    {
      id: 6,
      title: "Study Focus",
      description: "Concentration enhancers",
      cover: "/placeholder.svg?height=200&width=200",
      songs: 51,
    },
  ])

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Your Library
      </motion.h1>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
        </TabsList>
        <TabsContent value="playlists" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="artists">
          <div className="py-10 text-center text-muted-foreground">
            <p>Your followed artists will appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="albums">
          <div className="py-10 text-center text-muted-foreground">
            <p>Your saved albums will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

