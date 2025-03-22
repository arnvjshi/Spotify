"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 1) {
      setIsSearching(true)
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Mock data - would be replaced with actual API call
        setResults(
          [
            {
              id: 1,
              title: "Blinding Lights",
              artist: "The Weeknd",
              type: "song",
              cover: "/placeholder.svg?height=60&width=60",
            },
            {
              id: 2,
              title: "After Hours",
              artist: "The Weeknd",
              type: "album",
              cover: "/placeholder.svg?height=60&width=60",
            },
            {
              id: 3,
              title: "Billie Jean",
              artist: "Michael Jackson",
              type: "song",
              cover: "/placeholder.svg?height=60&width=60",
            },
            {
              id: 4,
              title: "Bad Guy",
              artist: "Billie Eilish",
              type: "song",
              cover: "/placeholder.svg?height=60&width=60",
            },
            {
              id: 5,
              title: "Bohemian Rhapsody",
              artist: "Queen",
              type: "song",
              cover: "/placeholder.svg?height=60&width=60",
            },
          ].filter(
            (item) =>
              item.title.toLowerCase().includes(value.toLowerCase()) ||
              item.artist.toLowerCase().includes(value.toLowerCase()),
          ),
        )
        setIsSearching(false)
      }, 500)
    } else {
      setResults([])
    }
  }

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Search
      </motion.h1>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="What do you want to listen to?"
          className="pl-10 h-12 bg-background/60 backdrop-blur-md"
          value={query}
          onChange={handleSearch}
        />
      </div>

      {isSearching ? (
        <div className="py-10 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-muted-foreground">Searching...</p>
        </div>
      ) : (
        <SearchResults results={results} query={query} />
      )}
    </div>
  )
}

