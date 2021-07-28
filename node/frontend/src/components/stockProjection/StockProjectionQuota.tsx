import React, { memo } from "react";
import { format } from "date-fns";

import { makeStyles } from "@material-ui/core/styles";

import { Grid, Typography } from "@material-ui/core";

import { StockProjectionPriceInDate } from "./StockProjectionCard";

const useStyles = makeStyles({
  pos: {
    marginBottom: 12,
  },
});

function StockProjectionQuota({ value, pricedAt }: StockProjectionPriceInDate) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item>
        <Typography className={classes.pos} color="textSecondary">
          {value.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.pos} color="textSecondary">
          {format(pricedAt, "yyyy/MM/dd")}
        </Typography>
      </Grid>
    </Grid>
  );
}
export default memo(StockProjectionQuota);
