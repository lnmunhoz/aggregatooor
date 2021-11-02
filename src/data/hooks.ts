import { useQuery } from "react-query";
import { ComplexProtocolListResponse, SupplyTokenList } from "./types";

const API_URL = "https://openapi.debank.com/v1";
const Endpoints = {
  userComplexProtocolList: `${API_URL}/user/complex_protocol_list`,
  userTokenList: `${API_URL}/user/token_list`,
};

export const useComplexProtocolList = (address: string) => {
  const { isLoading, error, data } = useQuery<ComplexProtocolListResponse[]>(
    `complexProtocolList.${address}`,
    () =>
      fetch(`${Endpoints.userComplexProtocolList}?id=${address}`).then((res) =>
        res.json()
      ),
    { enabled: !!address, onError: (e) => console.error(e) }
  );

  return {
    isLoading,
    error,
    data,
  };
};

export const useTokenList = (address: string) => {
  const { isLoading, error, data } = useQuery<SupplyTokenList[]>(
    `tokenList.${address}`,
    () =>
      fetch(`${Endpoints.userTokenList}?id=${address}`).then((res) =>
        res.json()
      ),
    { enabled: !!address, onError: (e) => console.error(e) }
  );

  return {
    isLoading,
    error,
    data,
  };
};
