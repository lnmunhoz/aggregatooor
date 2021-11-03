import {
  Box,
  ChakraProvider,
  extendTheme,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import "./App.css";
import { AppProvider } from "./core/App";
import { WalletManagerProvider } from "./core/WalletManager";
import { queryClient } from "./data/queryClient";
import { Chart } from "./ui/components/Chart";
import { WalletInput } from "./ui/components/WalletInput";
import { Wallets } from "./ui/components/Wallets";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <WalletManagerProvider>
          <AppProvider>
            <QueryClientProvider client={queryClient}>
              <Box height="100%">
                <Box padding={8}>
                  <Stack spacing={4}>
                    <Heading size="lg">Portfolio Aggregatooor</Heading>
                    <WalletInput />
                    <Wallets />
                  </Stack>

                  <Box maxWidth={600} margin="0 auto" padding={4}>
                    <Chart />
                  </Box>
                </Box>

                <Box
                  color="gray.500"
                  position="absolute"
                  bottom={0}
                  padding={4}
                  display="flex"
                  justifyContent="center"
                  width="100%"
                >
                  Made by #wagmibr nation
                </Box>
              </Box>
            </QueryClientProvider>
          </AppProvider>
        </WalletManagerProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
