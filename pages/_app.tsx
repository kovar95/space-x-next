import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useError } from "../src/jotai";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../src/RelayEnvironment";

function MyApp({ Component, pageProps }: AppProps) {
  const { error } = useError();
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {error ? (
        <Stack
          sx={{
            width: "300px",
            position: "absolute",
            top: "70px",
            left: "10px",
            zIndex: 33,
          }}
          spacing={2}
        >
          <Alert variant="filled" severity="error">
            <AlertTitle>{error.title}</AlertTitle>
            {error.description}
          </Alert>
        </Stack>
      ) : null}
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
