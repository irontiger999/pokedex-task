import { Button, ButtonProps } from "@chakra-ui/react";
import theme from "utils/theme";

export function PrimaryButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <Button
      background={theme.colors.bg.primary}
      borderRadius="3xl"
      color={theme.colors.text.button}
      h={16}
      {...rest}
      _hover={{
        background: theme.colors.bg.input,
        border: `1px solid ${theme.colors.bg.primary}`,
        color: theme.colors.text.primary,
        boxShadow: "none",
      }}
      _focus={{
        boxShadow: "none",
      }}
      _active={{
        background: theme.colors.bg.input,
        border: `1px solid ${theme.colors.bg.primary}`,
        color: theme.colors.text.primary,
        boxShadow: "none",
      }}
    >
      {children}
    </Button>
  );
}
