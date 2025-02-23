"use client"

import { useState, useEffect } from "react"
import { Button, Container, Typography } from "@mui/material"
import { styled } from "@mui/system"
import anime from "animejs/lib/anime.es.js"

const CLIENT_ID = "your_spotify_client_id"
const REDIRECT_URI = "http://localhost:3000/callback"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const NeonButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  "&:hover": {
    boxShadow: "0 6px 10px 4px rgba(255, 105, 135, .5)",
  },
}))

export default function Home() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

    // Animate the title
    anime({
      targets: "#title",
      translateY: [-50, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1500,
    })
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom id="title">
        Spotify Space
      </Typography>
      {!token ? (
        <NeonButton
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </NeonButton>
      ) : (
        <NeonButton onClick={logout}>Logout</NeonButton>
      )}
    </Container>
  )
}

