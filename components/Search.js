"use client"

import { useState } from "react"
import { TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material"
import { styled } from "@mui/system"
import SpotifyWebApi from "spotify-web-api-js"

const spotifyApi = new SpotifyWebApi()

const SearchContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}))

const SearchResultItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
  },
}))

export default function Search() {
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async (event) => {
    const query = event.target.value
    if (query) {
      try {
        const results = await spotifyApi.search(query, ["track", "artist"])
        setSearchResults(results.tracks.items)
      } catch (error) {
        console.error("Error searching:", error)
      }
    } else {
      setSearchResults([])
    }
  }

  return (
    <SearchContainer>
      <TextField fullWidth label="Search for tracks or artists" variant="outlined" onChange={handleSearch} />
      <List>
        {searchResults.map((track) => (
          <SearchResultItem key={track.id} button>
            <ListItemAvatar>
              <Avatar src={track.album.images[0]?.url} alt={track.name} />
            </ListItemAvatar>
            <ListItemText primary={track.name} secondary={track.artists.map((artist) => artist.name).join(", ")} />
          </SearchResultItem>
        ))}
      </List>
    </SearchContainer>
  )
}

