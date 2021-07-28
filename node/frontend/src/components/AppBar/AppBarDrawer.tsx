import React from "react";
import Link from "next/link";

import {
  createStyles,
  Divider,
  List,
  ListItem,
  IconButton,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ChevronLeft as ChevronLeftIcon } from "@material-ui/icons";

import { useAppBarContext } from "./AppBar-context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawerHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  })
);

function AppBarDrawer() {
  const classes = useStyles();

  const { setMobileOpen } = useAppBarContext();

  return (
    <div className={classes.drawerHeader}>
      <div className={classes.toolbar} />
      <div>
        <IconButton onClick={() => setMobileOpen()}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {[
          { path: "/", name: "Inicio" },
          { path: "/me", name: "Minhas acões" },
          { path: "/compare", name: "Comparar  acões" },
        ].map(({ name, path }) => (
          <Link href={path} key={path}>
            <ListItem button>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );
}

export default AppBarDrawer;
