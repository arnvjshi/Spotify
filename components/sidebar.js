"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Search, Library, PlusCircle, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function Sidebar() {
  const pathname = usePathname()
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "Liked Songs" },
    { id: 2, name: "Chill Vibes" },
    { id: 3, name: "Workout Mix" },
    { id: 4, name: "Road Trip" },
    { id: 5, name: "90s Hits" },
    { id: 6, name: "Study Focus" },
  ])

  return (
    <div className="hidden md:flex h-full w-60 flex-col bg-card border-r">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
          </svg>
          Spotify
        </Link>
      </div>

      <div className="space-y-1 p-2">
        <NavItem href="/" icon={Home} label="Home" pathname={pathname} />
        <NavItem href="/search" icon={Search} label="Search" pathname={pathname} />
        <NavItem href="/library" icon={Library} label="Your Library" pathname={pathname} />
      </div>

      <div className="mt-6 px-4 space-y-4">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <PlusCircle className="h-5 w-5" />
          </Button>
          <span className="font-medium">Create Playlist</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-8 h-8 bg-gradient-to-br from-pink-500 to-blue-500 text-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <span className="font-medium">Liked Songs</span>
        </div>
      </div>

      <Separator className="my-4" />

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 p-2">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlist/${playlist.id}`}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                pathname === `/playlist/${playlist.id}` ? "bg-accent" : "transparent",
              )}
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <User className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </div>
  )
}

function NavItem({ href, icon: Icon, label, pathname }) {
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors relative",
        isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent",
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {isActive && (
        <motion.div
          className="absolute left-0 w-1 h-full bg-primary rounded-r-full"
          layoutId="sidebar-highlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  )
}

