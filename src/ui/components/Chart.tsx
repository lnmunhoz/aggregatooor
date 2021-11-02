import ApexCharts from "react-apexcharts";
import React, { useEffect, useRef } from "react";
import { useAppContext } from "../../context";
import { useComplexProtocolList } from "../../data/useDebank";

const regex = /DAI|USDC|USDT|UST|MIM/;

export const Chart = () => {
  const ref = useRef();
  const { walletManager } = useAppContext();
  const { data, isLoading } = useComplexProtocolList(
    walletManager.getAddress()
  );

  const suppliedTokens = data
    ?.flatMap((curr) => {
      return curr.portfolio_item_list?.flatMap((item: any) => {
        if ("supply_token_list" in item.detail) {
          return item.detail.supply_token_list;
        }
      });
    })
    .filter((curr) => !!curr);

  useEffect(() => {
    if (suppliedTokens) {
      var options = {
        series: suppliedTokens.map((s) => s.amount),
        chart: {
          width: 600,
          type: "pie",
        },
        labels: suppliedTokens.map((s) => s.symbol),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };

      var chart = new ApexCharts(ref.current, options);
      if (ref.current && suppliedTokens) {
        chart.render();
      }
    }
  }, [suppliedTokens]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !suppliedTokens) {
    return <div> No data </div>;
  }

  return (
    <ApexCharts
      options={{
        labels: suppliedTokens.map((s) => s.symbol),
        chart: {
          width: 600,
        },
      }}
      series={suppliedTokens.map((s) => s.amount)}
      type="pie"
    />
  );
};
