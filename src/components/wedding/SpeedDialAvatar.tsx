import React from "react";
import SpeedDial, { SpeedDialProps } from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";

import Avatar from "@mui/material/Avatar";

const actions = [
  { icon: <HomeRoundedIcon />, name: "Home" },
  { icon: <PeopleRoundedIcon />, name: "Guests" },
  { icon: <ImageRoundedIcon />, name: "Gallery" },
  { icon: <ImageRoundedIcon />, name: "Logout" },
];

export default function SpeedDialAvatar({ avatarImage }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <SpeedDial
        sx={{
          width: "fit-content",
        }}
        ariaLabel="Avatar Speed Dial"
        icon={
          <Avatar
            sx={{
              width: 100,
              height: 100,
              border: "4px solid hsl(44 85% 51%)",
            }}
            alt="Couple avatar"
            src={`../../${avatarImage}`}
          ></Avatar>
        }
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="right"
      >
        {actions.map((action) => (
          <SpeedDialAction
            sx={{ marginLeft: "1em" }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </>
  );
}
