import React from "react";
import { QueryClientProvider } from "react-query";
import "./App.css";
import { AppContext } from "./context";
import { queryClient } from "./data/queryClient";
import { Chart } from "./ui/components/Chart";
import { WalletInput } from "./ui/components/WalletInput";

function App() {
  return (
    <AppContext>
      <QueryClientProvider client={queryClient}>
        <div id="app">
          <WalletInput />
          <Chart />
        </div>
      </QueryClientProvider>
    </AppContext>
  );
}

export default App;
