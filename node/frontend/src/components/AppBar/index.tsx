import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";

import { useAppBarContext } from "./AppBar-context";
import AppBarDrawer from "./AppBarDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();

  const { mobileOpen, setMobileOpen } = useAppBarContext();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={setMobileOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={setMobileOpen}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <AppBarDrawer />
      </Drawer>
    </div>
  );
}
