import React from "react";
import protectedRoute from "../../src/helpers/protectedRoute";
import { mockWeddings } from "../../mocks/mockWeddings";
import { mockUsers } from "../../mocks/mockUsers";
import { mockRSVP } from "../../mocks/mockRSVP";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

/* Mock list for user 1 */
function weddingList(): JSX.Element {
  console.log({ mockWeddings, mockUsers, mockRSVP });
  console.log(
    mockRSVP.filter((rsvp) => {
      return rsvp.userId === "1";
    })
  );

  return (
    <div className="page wedding-list-page text-align-center">
      <div className="wedding-list">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <h1 className="text-dark">Wedding list</h1>
        <Divider className="ff-serif fs-500">Organizer</Divider>
        <List>
          {mockRSVP
            .filter((rsvp) => {
              return (
                rsvp.userId === "1" &&
                (rsvp.role.includes("spouse") || rsvp.role.includes("spouse"))
              );
            })
            .map((rsvp) => {
              return (
                <>
                  <ListItem
                    secondaryAction={<span>Attending ? {rsvp.status}</span>}
                  >
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={mockWeddings[rsvp.weddingId].name}
                      secondary={rsvp.role.join(", ")}
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
        </List>
        <Divider className="ff-serif fs-500">Guest</Divider>
        <List>
          {mockRSVP
            .filter((rsvp) => {
              return rsvp.userId === "1" && rsvp.role.includes("guest");
            })
            .map((rsvp) => {
              return (
                <>
                  <ListItem
                    secondaryAction={<span>Attending ? {rsvp.status}</span>}
                  >
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={mockWeddings[rsvp.weddingId].name}
                      secondary={rsvp.role.join(", ")}
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
        </List>
      </div>
    </div>
  );
}

export default protectedRoute(weddingList);
