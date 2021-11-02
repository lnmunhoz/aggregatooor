import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context";

export const WalletInput = () => {
  const [address, setAddress] = useState("");
  const { walletManager } = useAppContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value.trim();
    setAddress(address);
  };

  const onSearch = () => {
    localStorage.setItem("address", address);
    walletManager.setAddress(address);
  };

  useEffect(() => {
    const cachedAddress = localStorage.getItem("address");
    if (cachedAddress) {
      setAddress(cachedAddress);
    }
  }, []);

  return (
    <Box display="flex">
      <Input
        type="text"
        placeholder="Enter your wallet address"
        onChange={handleChange}
        value={address}
      />
      <Button leftIcon={<SearchIcon />} onClick={onSearch}>
        Search
      </Button>
    </Box>
  );
};
