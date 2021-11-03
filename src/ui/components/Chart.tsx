import ApexCharts from "react-apexcharts";
import React, { useEffect, useRef } from "react";
import { useComplexProtocolList, useTokenList } from "../../data/hooks";
import { preparePieData } from "../../data/helpers";
import { Box } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { useAppContext } from "../../core/App";

export const Chart = () => {
  const { getSelectedAddress } = useAppContext();
  const complexProtocolListQuery = useComplexProtocolList(getSelectedAddress());
  const tokenListQuery = useTokenList(getSelectedAddress());

  const isLoading =
    complexProtocolListQuery.isLoading || tokenListQuery.isLoading;

  // @ts-ignore
  if (complexProtocolListQuery?.data?.errors || tokenListQuery?.data?.errors) {
    return (
      <Box margin="0 auto" justifyContent="center" display="flex">
        Error fetching data
      </Box>
    );
  }

  const pieData =
    complexProtocolListQuery.data &&
    tokenListQuery.data &&
    preparePieData(complexProtocolListQuery.data, tokenListQuery.data);

  if (isLoading) {
    return (
      <Box margin="0 auto" justifyContent="center" display="flex">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (!pieData) {
    return (
      <Box margin="0 auto" justifyContent="center" display="flex">
        Nothing to show
      </Box>
    );
  }

  return (
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
  );
};
