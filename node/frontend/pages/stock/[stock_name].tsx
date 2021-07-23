import React from "react";
import {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";

import { Container, Grid } from "@material-ui/core";

import StockViewContainer from "../../src/components/stock/StockViewContainer";
import { withAppScafold } from "../../src/layout/AppScafold";
import StockService, {
  StockQuota,
} from "../../src/components/stock/Stock-service";
import StockRequests from "../../src/components/stock/Stock-requests";
import StockHistoryView from "../../src/components/stockHistorical/StockHistoricalView-container";

interface StockPageProps {
  stock: StockQuota;
}

function StockPage({ stock }: StockPageProps) {
  const { name, lastPrice, priceAt } = stock;
  return (
    <Container
      style={{
        marginTop: 32,
      }}
    >
      <Grid container direction="row" spacing={2}>
        <Grid item>
          <StockViewContainer
            reference={name}
            name={name}
            dateRegister={new Date(priceAt)}
            quota={lastPrice}
          />
        </Grid>
        <Grid item>
          <StockHistoryView />
        </Grid>
      </Grid>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const service = new StockService({ request: StockRequests });
  if (!params?.stock_name || params?.stock_name === "") {
    return {
      notFound: true,
    };
  }
  try {
    const res = await service.getLastQuota(params?.stock_name.toString() ?? "");
    return {
      props: {
        stock: {
          ...res,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default withAppScafold(StockPage);
