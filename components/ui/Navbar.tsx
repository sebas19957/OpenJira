import React, { useContext } from "react";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { UIContext } from "../../context/ui";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="secondary"
          onClick={openSideMenu}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h5" color="secondary">
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
