import React, { useEffect } from "react";
import { ethers } from "ethers";

export type Address = string;

interface IWalletManager {
  getAddresses: () => Address[];
  addAddress: (address: Address) => void;
  removeAddress: (address: Address) => void;
}

const WalletManagerContext = React.createContext({} as IWalletManager);

export const WalletManagerProvider: React.FC = (props) => {
  const [addresses, setAddresses] = React.useState<Address[]>([]);

  const addAddress = (address: Address) => {
    const isValid = ethers.utils.isAddress(address);

    if (!isValid) {
      throw new Error("Invalid address");
    }

    if (addresses.indexOf(address) === -1) {
      setAddresses([...addresses, address]);
    }
  };

  const removeAddress = (address: Address) => {
    setAddresses(addresses.filter((a) => a !== address));
  };

  const getAddresses = () => addresses;

  useEffect(() => {
    const cachedAddresses = localStorage.getItem("addresses");
    if (cachedAddresses) {
      try {
        const parsed = JSON.parse(cachedAddresses);
        setAddresses(parsed);
      } catch (e) {
        console.log("Error parsing cached addresses", e);
        setAddresses([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  return (
    <WalletManagerContext.Provider
      value={{
        addAddress,
        removeAddress,
        getAddresses,
      }}
    >
      {" "}
      {props.children}
    </WalletManagerContext.Provider>
  );
};

export const useWalletManager = () => React.useContext(WalletManagerContext);
