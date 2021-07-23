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
import React from "react";
import { useAppBarContext } from "./AppBar-context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawerHeader: {
      display: "flex",
      flexDirection: "column",
      width: 300,
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default AppBarDrawer;
