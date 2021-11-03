import { useQuery } from "react-query";
import { ComplexProtocolListResponse, SupplyTokenList } from "./types";
import flatMap from "lodash/flatMap";

const API_URL = "https://openapi.debank.com/v1";
const Endpoints = {
  userComplexProtocolList: `${API_URL}/user/complex_protocol_list`,
  userTokenList: `${API_URL}/user/token_list`,
};

export const useComplexProtocolList = (addresses: string[]) => {
  const { isLoading, error, data } = useQuery<ComplexProtocolListResponse[]>(
    `complexProtocolList.${addresses.join(",")}`,
    () => {
      return Promise.all(
        addresses.map((addr) => {
          return fetch(`${Endpoints.userComplexProtocolList}?id=${addr}`).then(
            (res) => res.json()
          );
        })
      );
    },
    { enabled: addresses?.length > 0, onError: (e) => console.error(e) }
  );

  return {
    isLoading,
    error,
    data: flatMap(data),
  };
};

export const useTokenList = (addresses: string[]) => {
  const { isLoading, error, data } = useQuery<SupplyTokenList[]>(
    `tokenList.${addresses.join(",")}`,
    () => {
      return Promise.all(
        addresses.map((addr) => {
          return fetch(`${Endpoints.userTokenList}?id=${addr}`).then((res) =>
            res.json()
          );
        })
      );
    },
    { enabled: addresses?.length > 0, onError: (e) => console.error(e) }
  );

  return {
    isLoading,
    error,
    data: flatMap(data),
  };
};
