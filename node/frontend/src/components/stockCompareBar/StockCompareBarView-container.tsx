import { Container, Grid } from "@material-ui/core";
import React from "react";
import { useMemo } from "react";
import {
  useStockCompare,
  withStockCompareContext,
} from "../stockCompare/StockCompare-context";
import StockCompareBarItem from "../stockCompareBarItem/StockCompareBarItem";
import StockSearchView from "../stockSerach/StockSearchView-container";

function StockCompareBarView() {
  const { data, addTip, removeTip, addBase, base } = useStockCompare();
  const result = useMemo(() => {
    if (base && base != "") {
      return [base, ...data];
    }
    return data;
  }, [base, data.length]);
  return (
    <>
      <Grid>
        {result.map((item) => (
          <StockCompareBarItem
            label={item ?? ""}
            key={item}
            onDelete={removeTip}
            isDefault={base === item}
          />
        ))}
      </Grid>
      <Grid container direction="row" style={{ width: 600 }}>
        <Grid item>
          <StockSearchView
            onClickResult={(item) => addBase(item.symbol)}
            width={220}
          />
        </Grid>
        <Grid item>
          <StockSearchView
            onClickResult={(item) => addTip(item.symbol)}
            width={220}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default withStockCompareContext(StockCompareBarView);
