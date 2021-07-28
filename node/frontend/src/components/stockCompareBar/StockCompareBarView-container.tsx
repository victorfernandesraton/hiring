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
    () => result.find((item) => item.name === base),
    [result, base]
  );
  return (
    <Container>
      <Grid>
        {tips.map((item) => (
          <StockCompareBarItem
            label={item ?? ""}
            key={item}
            onDelete={removeTip}
            isDefault={base === item}
          />
        ))}
      </Grid>
      <Button
        disabled={!base || base === "" || data?.length === 0}
        onClick={() => getCompare()}
        variant="contained"
      >
        Compare
      </Button>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <StockSearchView onClickResult={(item) => addBase(item.symbol)} />
        </Grid>
        <Grid item xs={6}>
          <StockSearchView onClickResult={(item) => addTip(item.symbol)} />
        </Grid>
        <Grid item>
          {result
            .filter((item) => item.name !== baseItem?.name)
            .map((item: StockQuota) => (
              <StockViewContainer
                key={item.name}
                dateRegister={new Date(item.priceAt)}
                name={item.name}
                reference={item.name}
                quota={item.lastPrice}
                compareAt={baseItem?.lastPrice}
              />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default withStockCompareContext(StockCompareBarView);
