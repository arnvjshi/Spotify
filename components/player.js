"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Maximize2, Mic } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/hooks/use-music-player"

export default function Player() {
  const { currentTrack, isPlaying, togglePlay } = useMusicPlayer()
  const [volume, setVolume] = useState([75])
  const [progress, setProgress] = useState([0])
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Update progress every second when playing
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1
          if (newTime >= duration) {
            clearInterval(interval)
            return 0
          }
          setProgress([Math.floor((newTime / duration) * 100)])
          return newTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, duration])

  // Set initial duration when track changes
  useEffect(() => {
    if (currentTrack) {
      // Parse duration from format like "3:45"
      const [min, sec] = (currentTrack.duration || "0:30").split(":").map(Number)
      const durationInSeconds = min * 60 + sec
      setDuration(durationInSeconds)
      setCurrentTime(0)
      setProgress([0])
    }
  }, [currentTrack])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVolumeChange = (value) => {
    setVolume(value)
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    if (isMuted) {
      setVolume([75])
      setIsMuted(false)
    } else {
      setVolume([0])
      setIsMuted(true)
    }
  }

  const handleProgressChange = (value) => {
    const newTime = Math.floor((value[0] / 100) * duration)
    setCurrentTime(newTime)
    setProgress(value)
  }

  return (
    <>
      <div className="h-20 border-t bg-card p-2 flex items-center">
        <div className="w-1/3 flex items-center gap-3">
          {currentTrack ? (
            <>
              <div className="relative h-14 w-14 rounded-md overflow-hidden">
                <Image
                  src={currentTrack.cover || "/placeholder.svg?height=56&width=56"}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <Link href="#" className="text-sm font-medium hover:underline">
                  {currentTrack.title || "Unknown Track"}
                </Link>
                <span className="text-xs text-muted-foreground">{currentTrack.artist || "Unknown Artist"}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 bg-muted rounded-md flex items-center justify-center">
                <Music className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Select a track</span>
                <span className="text-xs text-muted-foreground">Browse your library</span>
              </div>
            </div>
          )}
        </div>

        <div className="w-1/3 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              onClick={togglePlay}
              className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-full flex items-center gap-2 px-4">
            <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
            <Slider value={progress} max={100} step={1} className="w-full" onValueChange={handleProgressChange} />
            <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="w-1/3 flex items-center justify-end gap-4 pr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Mic className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider value={volume} max={100} step={1} className="w-24" onValueChange={handleVolumeChange} />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsFullscreen(true)}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <FullscreenPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            progress={progress}
            handleProgressChange={handleProgressChange}
            currentTime={currentTime}
            duration={duration}
            formatTime={formatTime}
            onClose={() => setIsFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function FullscreenPlayer({
  currentTrack,
  isPlaying,
  togglePlay,
  progress,
  handleProgressChange,
  currentTime,
  duration,
  formatTime,
  onClose,
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-10 w-10 rounded-full" onClick={onClose}>
        <X className="h-6 w-6" />
      </Button>

      <div className="max-w-screen-md w-full flex flex-col items-center gap-8">
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Image
            src={currentTrack?.cover || "/placeholder.svg?height=320&width=320"}
            alt={currentTrack?.title || "Now Playing"}
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="text-center space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold">{currentTrack?.title || "Unknown Track"}</h2>
          <p className="text-muted-foreground">{currentTrack?.artist || "Unknown Artist"}</p>
        </motion.div>

        <motion.div
          className="w-full space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Slider value={progress} max={100} step={1} className="w-full" onValueChange={handleProgressChange} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
            <Shuffle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
            <SkipBack className="h-6 w-6" />
          </Button>
          <Button
            onClick={togglePlay}
            className="h-16 w-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
            <SkipForward className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
            <Repeat className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Heart({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function Music({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function X({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

