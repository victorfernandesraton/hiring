import React, { memo } from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
    },
    inline: {
      display: "inline",
    },
  })
);
export interface SearchListItemProps {
  name: string;
  symbol: string;
}
export const SearchListItem = ({ name, symbol }: SearchListItemProps) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            ></Typography>
            {symbol}
          </>
        }
      />
    </ListItem>
  );
};

export default memo(SearchListItem);
