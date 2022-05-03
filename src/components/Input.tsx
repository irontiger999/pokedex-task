import { Input, InputProps } from "@chakra-ui/react";
import theme from "utils/theme";

export function ChakraInput(props: InputProps) {
  return (
    <Input
      background={theme.colors.bg.input}
      borderColor={theme.colors.bg.primary}
      borderRadius="2xl"
      h={16}
      p={4}
      _hover={{
        borderWidth: 2,
      }}
      {...props}
    />
  );
}
