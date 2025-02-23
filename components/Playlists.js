"use client"

import { useState, useEffect } from "react"
import { List, ListItem, ListItemText, Typography } from "@mui/material"
import { styled } from "@mui/system"
import SpotifyWebApi from "spotify-web-api-js"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const spotifyApi = new SpotifyWebApi()

const PlaylistContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}))

const PlaylistItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
  },
}))

export default function Playlists() {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await spotifyApi.getUserPlaylists()
        setPlaylists(response.items)
      } catch (error) {
        console.error("Error fetching playlists:", error)
      }
    }

    fetchPlaylists()
  }, [])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(playlists)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setPlaylists(items)
  }

  return (
    <PlaylistContainer>
      <Typography variant="h6" gutterBottom>
        Your Playlists
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playlists">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {playlists.map((playlist, index) => (
                <Draggable key={playlist.id} draggableId={playlist.id} index={index}>
                  {(provided) => (
                    <PlaylistItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ListItemText primary={playlist.name} secondary={`${playlist.tracks.total} tracks`} />
                    </PlaylistItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </PlaylistContainer>
  )
}

