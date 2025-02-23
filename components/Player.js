"use client"

import { useState, useEffect } from "react"
import { Box, IconButton, Slider, Typography } from "@mui/material"
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@mui/icons-material"
import { styled } from "@mui/system"
import anime from "animejs/lib/anime.es.js"

const PlayerContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const NeonIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&:hover": {
    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
  },
}))

export default function Player({ token }) {
  const [player, setPlayer] = useState(null)
  const [is_paused, setPaused] = useState(false)
  const [is_active, setActive] = useState(false)
  const [current_track, setTrack] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spotify Space",
        getOAuthToken: (cb) => {
          cb(token)
        },
        volume: 0.5,
      })

      setPlayer(player)

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id)
      })

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id)
      })

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return
        }

        setTrack(state.track_window.current_track)
        setPaused(state.paused)

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true)
        })
      })

      player.connect()
    }
  }, [token])

  useEffect(() => {
    if (!player) return

    const updateProgress = () => {
      player.getCurrentState().then((state) => {
        if (state) {
          setProgress((state.position / state.duration) * 100)
        }
      })
    }

    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [player])

  const handlePlayPause = () => {
    player.togglePlay()
    anime({
      targets: "#playPauseButton",
      scale: [1, 1.2, 1],
      duration: 300,
      easing: "easeInOutQuad",
    })
  }

  if (!is_active) {
    return (
      <PlayerContainer>
        <Typography>Transfer your playback to Spotify Space</Typography>
      </PlayerContainer>
    )
  }

  return (
    <PlayerContainer>
      <NeonIconButton onClick={() => player.previousTrack()}>
        <SkipPrevious />
      </NeonIconButton>
      <NeonIconButton id="playPauseButton" onClick={handlePlayPause}>
        {is_paused ? <PlayArrow /> : <Pause />}
      </NeonIconButton>
      <NeonIconButton onClick={() => player.nextTrack()}>
        <SkipNext />
      </NeonIconButton>
      <Slider
        value={progress}
        onChange={(_, newValue) => {
          const newPosition = (newValue / 100) * current_track.duration_ms
          player.seek(newPosition)
        }}
        sx={{ mx: 2, width: "50%" }}
      />
    </PlayerContainer>
  )
}

