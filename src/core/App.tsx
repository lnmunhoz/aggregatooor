import React from "react";
import { Address } from "./WalletManager";

interface IAppContext {
  selectAddress: (wallet: Address) => void;
  getSelectedAddress: () => Address;
}

export const AppContext = React.createContext({} as IAppContext);

export const AppProvider: React.FC = (props) => {
  const [selectedAddress, setSelectedAddress] = React.useState<Address>();

  const selectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const getSelectedAddress = () => {
    return selectedAddress;
  };

  return (
    <AppContext.Provider
      value={{
        selectAddress,
        getSelectedAddress,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
