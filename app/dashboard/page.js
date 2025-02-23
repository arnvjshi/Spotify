"use client"

import { useState, useEffect } from "react"
import { Box, Grid, Typography } from "@mui/material"
import { styled } from "@mui/system"
import SpotifyWebApi from "spotify-web-api-js"
import Player from "@/components/Player"
import Sidebar from "@/components/Sidebar"
import NowPlaying from "@/components/NowPlaying"
import Clock from "@/components/Clock"
import Search from "@/components/Search"
import Playlists from "@/components/Playlists"

const spotifyApi = new SpotifyWebApi()

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
}))

export default function Dashboard() {
  const [token, setToken] = useState(null)
  const [currentTrack, setCurrentTrack] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token) {
      setToken(token)
      spotifyApi.setAccessToken(token)
    }
  }, [])

  useEffect(() => {
    if (!token) return

    const fetchCurrentTrack = async () => {
      try {
        const response = await spotifyApi.getMyCurrentPlaybackState()
        if (response && response.item) {
          setCurrentTrack(response.item)
        }
      } catch (error) {
        console.error("Error fetching current track:", error)
      }
    }

    fetchCurrentTrack()
    const interval = setInterval(fetchCurrentTrack, 5000)
    return () => clearInterval(interval)
  }, [token])

  if (!token) return <Typography>Please login</Typography>

  return (
    <DashboardContainer>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Clock />
          </Grid>
          <Grid item xs={12} md={8}>
            <Search />
          </Grid>
          <Grid item xs={12} md={4}>
            <NowPlaying track={currentTrack} />
          </Grid>
          <Grid item xs={12}>
            <Playlists />
          </Grid>
        </Grid>
      </Box>
      <Player token={token} />
    </DashboardContainer>
  )
}

