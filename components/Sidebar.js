import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Home, Search, LibraryMusic } from "@mui/icons-material"
import { styled } from "@mui/system"

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
}))

const NeonListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiListItemText-primary": {
      color: theme.palette.primary.main,
    },
    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
  },
}))

export default function Sidebar() {
  return (
    <SidebarContainer>
      <List>
        <NeonListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </NeonListItem>
        <NeonListItem button>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </NeonListItem>
        <NeonListItem button>
          <ListItemIcon>
            <LibraryMusic />
          </ListItemIcon>
          <ListItemText primary="Your Library" />
        </NeonListItem>
      </List>
    </SidebarContainer>
  )
}

