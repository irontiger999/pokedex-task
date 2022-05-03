import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "contexts/auth";
import { useRoutes } from "react-router-dom";
import { routes } from "routes";
import theme from "utils/theme";

function App() {
  const content = useRoutes(routes);

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>{content}</ChakraProvider>
    </AuthProvider>
  );
}

export default App;
