import React, { useCallback, useMemo, useReducer } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import Reducer, {
  initialState,
  StockSearchReducerTypes,
} from "./StockSearch-reducer";
import { serachStocks, updateTextSearch } from "./StockSearch-actions";
import StockSearchService from "./StockSerach-service";
import StockRequests from "../stock/Stock-requests";

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

  const [{ query, loading, called, error }, dispatch] = useReducer(
    Reducer,
    initialState
  );

  const updateText = useCallback(
    (value: string) => updateTextSearch(dispatch, value),
    []
  );
  return (
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
  );
}
