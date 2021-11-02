import ApexCharts from "react-apexcharts";
import React, { useEffect, useRef } from "react";
import { useAppContext } from "../../context";
import { useComplexProtocolList, useTokenList } from "../../data/hooks";
import { preparePieData } from "../../data/helpers";
import { Box } from "@chakra-ui/layout";

export const Chart = () => {
  const { walletManager } = useAppContext();
  const complexProtocolListQuery = useComplexProtocolList(
    walletManager.getAddress()
  );
  const tokenListQuery = useTokenList(walletManager.getAddress());

  const isLoading =
    complexProtocolListQuery.isLoading || tokenListQuery.isLoading;

  // @ts-ignore
  if (complexProtocolListQuery?.data?.errors || tokenListQuery?.data?.errors) {
    return <div>Error fetching data</div>;
  }

  const pieData =
    complexProtocolListQuery.data &&
    tokenListQuery.data &&
    preparePieData(complexProtocolListQuery.data, tokenListQuery.data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pieData) {
    return <div> No data </div>;
  }

  return (
    <Box maxWidth={600}>
      <button>Aggregate</button>

      <ApexCharts
        options={{
          labels: pieData.labels,
          stroke: {
            width: 0,
          },
          legend: {
            labels: {
              colors: ["#ffff"],
            },
          },
        }}
        series={pieData.series}
        type="pie"
      />
    </Box>
  );
};
