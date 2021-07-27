import React from "react";
import { format } from "date-fns";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@material-ui/core";

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
}
function StockViewContainer({
  name,
  reference,
  quota,
  dateRegister,
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
        <Typography className={classes.pos} color="textSecondary">
          {quota}
        </Typography>
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
