import { Button, Container, Grid } from "@material-ui/core";
import React from "react";
import { useMemo } from "react";
import { StockQuota } from "../stock/Stock-service";
import StockViewContainer from "../stock/StockViewContainer";
import {
  useStockCompare,
  withStockCompareContext,
} from "../stockCompare/StockCompare-context";
import StockCompareBarItem from "../stockCompareBarItem/StockCompareBarItem";
import StockSearchView from "../stockSerach/StockSearchView-container";

function StockCompareBarView() {
  const { data, addTip, removeTip, addBase, base, getCompare, result } =
    useStockCompare();

  const tips = useMemo(() => {
    if (base && base != "") {
      return [base, ...data];
    }
    return data;
  }, [base, data]);

  const baseItem = useMemo(
    () => result.filter((item) => item.name === base),
    [result, base]
  );
  return (
    <>
      <Grid>
        {tips.map((item) => (
          <StockCompareBarItem
            label={item ?? ""}
            key={item}
            onDelete={removeTip}
            isDefault={base === item}
          />
        ))}
        <Button
          disabled={!base || base === "" || data?.length === 0}
          onClick={() => getCompare()}
          variant="contained"
        >
          Compare
        </Button>
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
      <Container>
        {result.map((item: StockQuota) => (
          <StockViewContainer
            key={item.name}
            dateRegister={new Date(item.priceAt)}
            name={item.name}
            reference={item.name}
            quota={item.lastPrice}
          />
        ))}
      </Container>
    </>
  );
}

export default withStockCompareContext(StockCompareBarView);
