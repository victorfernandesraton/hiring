import React, { useCallback, useMemo, useReducer } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Container,
  Typography,
  Paper,
  InputBase,
  IconButton,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import StockRequests from "../stock/Stock-requests";
import SearchListView from "../stockSearchList/StockSearchListView-container";

import Reducer, {
  initialState,
  StockSearchReducerTypes,
} from "./StockSearch-reducer";
import { serachStocks, updateTextSearch } from "./StockSearch-actions";
import StockSearchService from "./StockSerach-service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export default function StockSearchView() {
  const classes = useStyles();

  const stockServiceInstance = useMemo(
    () => new StockSearchService(StockRequests),
    []
  );

  const stockSerachAction = useMemo(
    () =>
      serachStocks(
        {
          ERROR: StockSearchReducerTypes.ERROR,
          SUCESS: StockSearchReducerTypes.SUCCESS,
          LOADING: StockSearchReducerTypes.LOADING,
        },
        stockServiceInstance
      ),
    [stockServiceInstance, StockSearchReducerTypes]
  );

  const [{ query, loading, called, error, data }, dispatch] = useReducer(
    Reducer,
    initialState
  );

  const updateText = useCallback(
    (value: string) => updateTextSearch(dispatch, value),
    []
  );
  return (
    <>
      <Container>
        <Paper component="form" className={classes.root}>
          <InputBase
            value={query}
            onChange={(e) => updateText(e.target.value.toString())}
            className={classes.input}
            placeholder="Search Stock"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            disabled={loading}
            type="submit"
            className={classes.iconButton}
            onClick={(e) => {
              if (query && query != "") {
                stockSerachAction(dispatch, query);
              }
            }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>
      <Container>
        {loading && <CircularProgress />}

        {data.length > 0 ? (
          <SearchListView data={data} />
        ) : (
          <>
            {called && !loading && (
              <Container>
                <Typography variant="h2">Not Found</Typography>
              </Container>
            )}
          </>
        )}
      </Container>
    </>
  );
}
