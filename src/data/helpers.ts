import { ComplexProtocolListResponse, SupplyTokenList } from "./types";

const hasValue = (value: any) => {
  return !!value;
};

const stableAssetsRegex = /DAI|USDC|USDT|UST|MIM|av3CRV/;
const ethAssetsRegex = /ETH/;
const btcAssetsRegex = /BTC/;

interface SuppliedGroups {
  assets: AssetData[];
  stables: AssetData[];
}

type AssetData = {
  symbol: string;
  netUsdValue: number;
  amount: number;
};

type AssetGroup = Record<string, AssetData>;

export const preparePieData = (
  complexProtocolList: ComplexProtocolListResponse[],
  tokenList: SupplyTokenList[]
) => {
  const suppliedAssets = complexProtocolList
    .flatMap((curr) =>
      curr.portfolio_item_list.flatMap((item) => {
        if ("supply_token_list" in item.detail) {
          return item.detail.supply_token_list;
        }
      })
    )
    .filter(hasValue)
    .concat(tokenList.filter((t) => t.is_verified));

  const assetsGroup = suppliedAssets.reduce((acc, curr) => {
    if (acc[curr.symbol]) {
      acc[curr.symbol].amount += curr.amount;
      acc[curr.symbol].netUsdValue += curr.price * curr.amount;
    } else {
      acc[curr.symbol] = {
        symbol: curr.symbol,
        netUsdValue: curr.price * curr.amount,
        amount: curr.amount,
      };
    }
    return acc;
  }, {} as AssetGroup);

  const suppliedGroups = Object.values(assetsGroup).reduce(
    (acc, curr) => {
      if (stableAssetsRegex.test(curr.symbol)) {
        acc.stables.push(curr);
      } else {
        acc.assets.push(curr);
      }
      return acc;
    },
    { assets: [], stables: [] } as SuppliedGroups
  );

  const labels = ["Stablecoins", ...suppliedGroups.assets.map((a) => a.symbol)];
  const series = [
    suppliedGroups.stables.reduce((acc, curr) => acc + curr.netUsdValue, 0),
    ...suppliedGroups.assets.map((a) => a.netUsdValue),
  ];

  return {
    labels,
    series,
    suppliedAssets,
  };
};
