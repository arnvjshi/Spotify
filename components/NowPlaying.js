"use client"

import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { styled } from "@mui/system"
import anime from "animejs/lib/anime.es.js"
import { useEffect, useRef } from "react"

const NowPlayingCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0 0 20px ${theme.palette.primary.main}`,
  overflow: "hidden",
  cursor: "move",
}))

export default function NowPlaying({ track }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        translateY: [-20, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1000,
      })
    }
  }, [])

  if (!track) {
    return null
  }

  return (
    <NowPlayingCard ref={cardRef}>
      <CardMedia component="img" height="140" image={track.album.images[0].url} alt={track.name} />
      <CardContent>
        <Typography variant="h6" component="div">
          {track.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {track.artists.map((artist) => artist.name).join(", ")}
        </Typography>
      </CardContent>
    </NowPlayingCard>
  )
}

