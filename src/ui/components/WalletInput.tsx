import { useEffect, useState } from "react";
import { useAppContext } from "../../context";

interface WalletIputProps {
  onChange: (address: string) => void;
}

export const WalletInput = () => {
  const { walletManager } = useAppContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value.trim();
    walletManager.setAddress(address);
    localStorage.setItem("address", address);
  };

  useEffect(() => {
    const cachedAddress = localStorage.getItem("address");
    if (cachedAddress) {
      walletManager.setAddress(cachedAddress);
    }
  }, []);

  return (
    <input
      type="text"
      placeholder="Enter your wallet address"
      onChange={handleChange}
      value={walletManager.getAddress()}
    />
  );
};
