import {
  Box,
  BoxProps,
  Center,
  Container,
  ContainerProps,
} from "@chakra-ui/react";
import layoutBgImage from "assets/images/bg.png";
import useAuth from "contexts/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ChakraLayout(props: ContainerProps) {
  const { children, ...rest } = props;
  return (
    <Container
      width="90%"
      maxWidth="90%"
      padding={0}
      minHeight="100vh"
      {...rest}
    >
      {children}
    </Container>
  );
}

export function BaseLayout(props: BoxProps) {
  const { children } = props;
  return (
    <Box
      width="full"
      minH="100vh"
      backgroundImage={layoutBgImage}
      backgroundSize="cover"
      backgroundPosition="center center"
      overflow="hidden"
      position="relative"
      p={{ base: 4, md: 8 }}
    >
      <Center width="full" maxWidth="6xl" mx="auto">
        {children}
      </Center>
    </Box>
  );
}

export function AuthLayout() {
  const { currentUser } = useAuth();
  const navigte = useNavigate();

  useEffect(() => {
    if (!currentUser?.dob || !currentUser?.name) {
      navigte("/form");
    } else {
      navigte("/list");
    }
  }, [currentUser, navigte]);

  return <></>;
}
