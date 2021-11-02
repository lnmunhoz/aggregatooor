import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
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
            <div id="app">
              <Box padding={8}>
                <WalletInput />
                <Chart />
              </Box>
            </div>
          </QueryClientProvider>
        </AppContext>
      </ChakraProvider>
    </>
  );
}

export default App;
