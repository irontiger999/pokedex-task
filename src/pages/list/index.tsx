import {
  Flex,
  Grid,
  GridItem,
  Image,
  InputGroup,
  InputLeftElement,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import logoPath from "assets/images/logo.png";
import { PokemonCard } from "components/Card";
import { ChakraInput } from "components/Input";
import { BaseLayout } from "components/Layout";
import { Pagination } from "components/Pagination";
import { usePagination } from "hooks/usePagination";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Pokemon } from "utils/interface";
import { restAPI } from "utils/rest";
import theme from "utils/theme";

function ListPage() {
  const [list, setList] = useState<Pokemon[]>();
  const [searchResult, setSearchResult] = useState<Pokemon[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();

  const { next, prev, jump, currentData, currentPage, maxPage } = usePagination(
    {
      data: list || [],
      itemsPerPage: 12,
    }
  );

  const getList = useCallback(async () => {
    try {
      const { results } = await restAPI.getPokemonList(0);
      setList(results);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!list) {
      getList();
    }
  }, [getList, list]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 2) {
      setIsLoading(true);
      const filteredList = list?.filter((pokemon) =>
        pokemon.name.includes(value)
      );
      setSearchResult(filteredList);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const timeout = setTimeout(async () => {
        if (value !== "" && value.length > 2) {
          setIsLoading(false);
        }
      }, 1500);
      setTypingTimeout(timeout);
    } else if (value.length < 2) {
      setSearchResult(undefined);
    }
  };

  return (
    <BaseLayout>
      <VStack spacing={16} w="full">
        <Flex align="center" h={64}>
          <Image objectFit="cover" src={logoPath} alt="pokedex" />
        </Flex>
        <VStack spacing={12} w="full">
          <Flex align="center" justify="center" w="full" mx="auto" maxW="3xl">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={
                  <FiSearch color={theme.colors.bg.primary} fontSize={20} />
                }
                height="full"
              />
              <ChakraInput
                pl={10}
                placeholder="pokemon name"
                onChange={handleSearch}
              />
            </InputGroup>
          </Flex>
          {isLoading ? (
            <Flex
              align="center"
              justify="center"
              position="relative"
              minH={96}
              width="100%"
            >
              <Spinner position="absolute" color={theme.colors.text.button} />
            </Flex>
          ) : (
            <VStack spacing={12} w="full">
              <Grid
                templateColumns="repeat(6,1fr)"
                gap={{ base: 4, default: 8 }}
                width="100%"
              >
                {searchResult &&
                  searchResult.map((pokemon, index) => (
                    <GridItem key={index}>
                      <PokemonCard {...pokemon} />
                    </GridItem>
                  ))}
                {!searchResult &&
                  currentData()?.map((pokemon, index) => (
                    <GridItem key={index}>
                      <PokemonCard {...pokemon} />
                    </GridItem>
                  ))}
              </Grid>
              {!searchResult && (
                <Pagination
                  next={next}
                  prev={prev}
                  jump={jump}
                  currentPage={currentPage}
                  maxPage={maxPage}
                />
              )}
            </VStack>
          )}
        </VStack>
      </VStack>
    </BaseLayout>
  );
}

export default memo(ListPage);
