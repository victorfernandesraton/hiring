import { Box, Container, Link, Typography } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import { withAppScafold } from "../src/layout/AppScafold";

function Home() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Container>
  );
}

export default withAppScafold(Home);
