"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Music, Disc, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMusicPlayer } from "@/hooks/use-music-player"

export function SearchResults({ results, query }) {
  const { setCurrentTrack, play } = useMusicPlayer()

  const handlePlay = (result) => {
    setCurrentTrack({
      id: result.id,
      title: result.title,
      artist: result.artist,
      album: result.type === "album" ? result.title : "",
      duration: "3:20",
      cover: result.cover,
    })
    play()
  }

  if (!query) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        <p>Search for songs, artists, or albums</p>
      </div>
    )
  }

  if (query && results.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        <p>No results found for "{query}"</p>
      </div>
    )
  }

  const songs = results.filter((item) => item.type === "song")
  const albums = results.filter((item) => item.type === "album")
  const artists = results.filter((item) => item.type === "artist")

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={query}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {songs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Songs</h3>
                <div className="space-y-2">
                  {songs.map((result, index) => (
                    <SearchResultItem
                      key={result.id}
                      result={result}
                      index={index}
                      icon={<Music className="h-4 w-4" />}
                      onClick={() => handlePlay(result)}
                    />
                  ))}
                </div>
              </div>
            )}

            {albums.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Albums</h3>
                <div className="space-y-2">
                  {albums.map((result, index) => (
                    <SearchResultItem
                      key={result.id}
                      result={result}
                      index={index}
                      icon={<Disc className="h-4 w-4" />}
                      onClick={() => handlePlay(result)}
                    />
                  ))}
                </div>
              </div>
            )}

            {artists.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Artists</h3>
                <div className="space-y-2">
                  {artists.map((result, index) => (
                    <SearchResultItem
                      key={result.id}
                      result={result}
                      index={index}
                      icon={<User className="h-4 w-4" />}
                      onClick={() => handlePlay(result)}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="songs">
            {songs.length > 0 ? (
              <div className="space-y-2">
                {songs.map((result, index) => (
                  <SearchResultItem
                    key={result.id}
                    result={result}
                    index={index}
                    icon={<Music className="h-4 w-4" />}
                    onClick={() => handlePlay(result)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                <p>No songs found for "{query}"</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="albums">
            {albums.length > 0 ? (
              <div className="space-y-2">
                {albums.map((result, index) => (
                  <SearchResultItem
                    key={result.id}
                    result={result}
                    index={index}
                    icon={<Disc className="h-4 w-4" />}
                    onClick={() => handlePlay(result)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                <p>No albums found for "{query}"</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="artists">
            {artists.length > 0 ? (
              <div className="space-y-2">
                {artists.map((result, index) => (
                  <SearchResultItem
                    key={result.id}
                    result={result}
                    index={index}
                    icon={<User className="h-4 w-4" />}
                    onClick={() => handlePlay(result)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                <p>No artists found for "{query}"</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </AnimatePresence>
  )
}

function SearchResultItem({ result, index, icon, onClick }) {
  return (
    <motion.div
      className="flex items-center gap-4 p-2 rounded-md hover:bg-accent cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      onClick={onClick}
    >
      <div className="relative w-10 h-10 rounded overflow-hidden">
        <img src={result.cover || "/placeholder.svg"} alt={result.title} className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="font-medium">{result.title}</div>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          {icon}
          <span>{result.artist}</span>
        </div>
      </div>
    </motion.div>
  )
}

