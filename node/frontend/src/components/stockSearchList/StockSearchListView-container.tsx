import React from "react";
import Link from "next/link";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { SearchListItem } from "./StockSearchListItem";
import { StockSearchItem } from "../stockSerach/StockSerach-service";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    item: {
      cursor: "pointer",
    },
  })
);

export interface SearchListViewProps {
  data: StockSearchItem[];
}
export default function SearchListView({ data }: SearchListViewProps) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {data.map(({ name, symbol }: StockSearchItem) => (
        <Link key={symbol} href={`/stock/${symbol}`} passHref prefetch>
          <Container className={classes.item}>
            <Divider variant="inset" component="li" />
            <SearchListItem name={name} symbol={symbol} />
          </Container>
        </Link>
      ))}
    </List>
  );
}
