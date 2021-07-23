import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

import { Container, Grid } from "@material-ui/core";

import StockViewContainer from "../../src/components/stock/StockViewContainer";
import { withAppScafold } from "../../src/layout/AppScafold";
import StockService from "../../src/components/stock/Stock-service";
import StockRequests from "../../src/components/stock/Stock-requests";
import StockHistoryView from "../../src/components/stockHistorical/StockHistoricalView-container";

function StockPage({ stock }) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const arr: string[] = ["IBM"];
  const paths = arr.map((stock_name) => {
    return {
      params: { stock_name },
    };
  });
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const service = new StockService({ request: StockRequests });
  if (!params?.stock_name || params?.stock_name === "") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  try {
    // const res = await service.getLastQuota(params?.stock_name);
    return {
      props: {
        stock: {
          name: "IBM",
          lastPrice: 137.92,
          priceAt: "2021-07-19T00:00:00.000Z",
        },
      },
      revalidate: 5 * 60,
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default withAppScafold(StockPage);
