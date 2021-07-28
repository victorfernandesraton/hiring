import React from "react";
import { format } from "date-fns";

import { makeStyles } from "@material-ui/core/styles";

import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

import { red, green } from "@material-ui/core/colors";
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

export interface StockViewContainerProps {
  name: string;
  reference: string;
  quota: number;
  dateRegister: Date;
  compareAt?: number;
}
function StockViewContainer({
  name,
  reference,
  quota,
  dateRegister,
  compareAt,
}: StockViewContainerProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {name}
        </Typography>
        <Typography variant="h5" component="h2">
          {reference}
        </Typography>
        <Grid container direction="row">
          <Grid item xs={compareAt ? 2 : 8}>
            <Typography className={classes.pos} color="textSecondary">
              {quota}
            </Typography>
          </Grid>
          {compareAt && compareAt != quota && (
            <Grid item xs={10}>
              {compareAt > quota ? (
                <ArrowDropDown style={{ color: red[500] }} fontSize="large" />
              ) : (
                <ArrowDropUp style={{ color: green[500] }} fontSize="large" />
              )}
            </Grid>
          )}
        </Grid>
        <Typography variant="body2" component="p">
          {format(dateRegister, "eeee")}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container alignContent="flex-start">
          <Button variant="contained" size="small" color="primary">
            Adicionar as minhas acões
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default StockViewContainer;
