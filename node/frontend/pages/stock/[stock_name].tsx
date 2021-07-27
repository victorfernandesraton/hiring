import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { format } from "date-fns";

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
    <>
      <Head>
        <title>{`Info - ${name}`}</title>
        <meta
          name="description"
          content={`Stock ${name} evaluated in ${lastPrice} at ${format(
            new Date(priceAt),
            "eeee"
          )}`}
        />
      </Head>
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
            <StockHistoryView stockName={name} />
          </Grid>
        </Grid>
      </Container>
    </>
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
