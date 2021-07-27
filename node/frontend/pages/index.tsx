import { Box, Container, Link, Typography } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import StockSearchView from "../src/components/stockSerach/StockSearchView-container";
import { withAppScafold } from "../src/layout/AppScafold";

function Home() {
  return (
    <Container maxWidth="sm" style={{ marginTop: 26 }}>
      <StockSearchView />
    </Container>
  );
}

export default withAppScafold(Home);
