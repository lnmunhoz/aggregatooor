import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { useWalletManager } from "../../core/WalletManager";

export const WalletInput = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { addAddress } = useWalletManager();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value.trim();
    setAddress(address);
  };

  const onSearch = () => {
    try {
      addAddress(address);
      setAddress("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box display="flex">
      <Input
        type="text"
        placeholder="Add wallet address"
        onChange={handleChange}
        borderRadius={12}
        value={address}
        isInvalid={!!error}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
    </Box>
  );
};
