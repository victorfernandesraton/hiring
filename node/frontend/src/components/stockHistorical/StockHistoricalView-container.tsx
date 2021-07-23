import React from "react";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <KeyboardDatePicker
          clearable
          value={new Date()}
          label="De"
          placeholder="10/10/2018"
          // onChange={date => handleDateChange(date)}
          onChange={console.log}
          format="MM/dd/yyyy"
        />
        <KeyboardDatePicker
          clearable
          label="Até"
          value={new Date()}
          placeholder="10/10/2018"
          // onChange={date => handleDateChange(date)}
          onChange={console.log}
          format="MM/dd/yyyy"
        />
      </CardContent>
    </Card>
  );
}
