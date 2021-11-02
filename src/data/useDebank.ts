import { useQuery } from "react-query";

const API_URL = "https://openapi.debank.com/v1";
const Endpoints = {
  userComplexProtocolList: `${API_URL}/user/complex_protocol_list`,
};

export const useComplexProtocolList = (address: string) => {
  const { isLoading, error, data } = useQuery(
    "complexProtocolList",
    () =>
      fetch(`${Endpoints.userComplexProtocolList}?id=${address}`).then((res) =>
        res.json()
      ),
    { enabled: !!address }
  );

  return {
    isLoading,
    error,
    data,
  };
};
