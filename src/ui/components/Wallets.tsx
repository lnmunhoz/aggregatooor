import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/tag";
import { useAppContext } from "../../core/App";
import { useWalletManager } from "../../core/WalletManager";

export const Wallets = () => {
  const walletManager = useWalletManager();
  const addresses = walletManager.getAddresses();
  const { getSelectedAddress, selectAddress } = useAppContext();
  const selectedAddress = getSelectedAddress();
  const isSelected = (address: string) => address === selectedAddress;

  return (
    <>
      {addresses.map((address) => (
        <Box key={address} display="flex">
          <Tag
            variant={isSelected(address) ? "solid" : "outline"}
            size="lg"
            width="100%"
            justifyContent="space-between"
            paddingRight={0}
          >
            {address}
            <IconButton
              variant="ghost"
              aria-label="delete"
              icon={<DeleteIcon />}
              onClick={() => walletManager.removeAddress(address)}
            />
          </Tag>
        </Box>
      ))}
    </>
  );
};
