import React from "react";
import Link from "next/link";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { List, Divider, Container } from "@material-ui/core";

import { SearchListItem } from "./StockSearchListItem";
import { StockSearchItem } from "../stockSerach/StockSerach-service";
import { StockSearchViewProps } from "../stockSerach/StockSearchView-container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 120,
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

export interface SearchListViewProps extends StockSearchViewProps {
  data: StockSearchItem[];
}
export default function SearchListView({
  data,
  onClickResult,
}: SearchListViewProps) {
  const classes = useStyles();
  const Wrapper = onClickResult
    ? (props: any) => <>{props.children}</>
    : (props: any) => <Link {...props}>{props.children}</Link>;
  return (
    <List className={classes.root}>
      {data.map(({ name, symbol }: StockSearchItem) => (
        <Container
          key={symbol}
          onClick={() => {
            if (onClickResult) {
              onClickResult({
                name,
                symbol,
              });
            }
          }}
        >
          <Wrapper href={`/stock/${symbol}`} passHref prefetch>
            <Container className={classes.item}>
              <Divider variant="inset" component="li" />
              <SearchListItem name={name} symbol={symbol} />
            </Container>
          </Wrapper>
        </Container>
      ))}
    </List>
  );
}
