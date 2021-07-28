import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  ArrowDropDown,
  ArrowDropUp,
  Remove,
  Add,
  Stop,
} from "@material-ui/icons";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

import { red, green, yellow } from "@material-ui/core/colors";
import StockProjectionQuota from "./StockProjectionQuota";
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

export interface StockProjectionPriceInDate {
  pricedAt: Date;
  value: number;
}
export interface StockProjectionCardProps {
  name: string;

  inData: StockProjectionPriceInDate;
  last: StockProjectionPriceInDate;
  gains: number;
}

function StockProjectionCard({
  name,

  inData,
  last,
  gains,
}: StockProjectionCardProps) {
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
        <Grid container>
          <Grid item xs={2}>
            {gains > 0 ? (
              <Add
                fontSize="large"
                style={{
                  color: green[500],
                }}
              />
            ) : gains < 0 ? (
              <Remove
                fontSize="large"
                style={{
                  color: red[500],
                }}
              />
            ) : (
              <Stop fontSize="large" />
            )}
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="h5"
              component="h2"
              style={{
                color:
                  gains > 0 ? green[500] : gains < 0 ? red[500] : yellow[500],
              }}
            >
              {gains.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={6}>
            <Grid item xs={4}>
              <StockProjectionQuota {...last} />
            </Grid>
            <Grid item xs={4}>
              {last.value > inData.value ? (
                <ArrowDropDown style={{ color: red[500] }} fontSize="large" />
              ) : (
                <ArrowDropUp style={{ color: green[500] }} fontSize="large" />
              )}
            </Grid>
            <Grid item xs={4}>
              <StockProjectionQuota {...inData} />
            </Grid>
          </Grid>
        </Grid>
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

export default StockProjectionCard;
