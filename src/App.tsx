import {
  Stack,
  Box,
  ChakraProvider,
  extendTheme,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import "./App.css";
import { AppContext } from "./context";
import { queryClient } from "./data/queryClient";
import { Chart } from "./ui/components/Chart";
import { WalletInput } from "./ui/components/WalletInput";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <AppContext>
          <QueryClientProvider client={queryClient}>
            <Box height="100%">
              <Box padding={8}>
                <Stack spacing={4}>
                  <Heading size="lg">Portfolio Aggregatooor</Heading>
                  <WalletInput />
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
        </AppContext>
      </ChakraProvider>
    </>
  );
}

export default App;
