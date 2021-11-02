import React, { useState } from "react";

interface IWalletManager {
  getAddress: () => string;
  setAddress: (addr: string) => void;
}

interface AppContext {
  walletManager: IWalletManager;
}

export function createContext(): AppContext {
  const [address, setAddress] = useState<string>();

  return {
    walletManager: {
      getAddress: () => {
        return address || "";
      },
      setAddress: (addr: string) => {
        setAddress(addr);
      },
    },
  };
}

const Context = React.createContext<AppContext>({} as AppContext);

export const AppContext: React.FC = (props) => {
  return (
    <Context.Provider value={createContext()}>
      {props.children}
    </Context.Provider>
  );
};

export const useAppContext = () => React.useContext(Context);
