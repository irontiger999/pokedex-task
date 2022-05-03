import { Center, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";
import theme from "utils/theme";
import { ChakraLayout } from "./Layout";

interface ErrorCodeProps {
  code?: 404 | 500;
}

function NotFound(props: ErrorCodeProps) {
  const { code = 404 } = props;
  const errorText =
    code === 404
      ? "The page you were looking for doesn't exist."
      : "Sorry! Server-side error occurred.";

  return (
    <ChakraLayout display="flex" zIndex={1}>
      <Center width="100%" height="100vh">
        <VStack
          align="center"
          justify="center"
          textAlign="center"
          flex={1}
          my={{ base: 16, lg: "auto" }}
          spacing={12}
          zIndex={1}
        >
          <Heading color={theme.colors.text.error} fontSize="9xl" as="h1">
            {code}
          </Heading>
          <Heading maxWidth="800px" as="h2">
            {errorText}
          </Heading>
          <Link href="/">
            <Text fontSize="2xl">Go to Home</Text>
          </Link>
        </VStack>
      </Center>
    </ChakraLayout>
  );
}

export default memo(NotFound);
