import { Container } from "@material-ui/core";
import Head from "next/head";

import StockCompareBarViewContainer from "../src/components/stockCompareBar/StockCompareBarView-container";
import StockSearchView from "../src/components/stockSerach/StockSearchView-container";
import { withAppScafold } from "../src/layout/AppScafold";

function Compare() {
  return (
    <>
      <Head>
        <title>{`Compare`}</title>
      </Head>

      <Container maxWidth="sm" style={{ marginTop: 26 }}>
        <StockCompareBarViewContainer />
      </Container>
    </>
  );
}

export default withAppScafold(Compare);
