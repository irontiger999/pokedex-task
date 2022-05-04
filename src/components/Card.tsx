import { Flex, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { PokemonCardBgSVG } from "utils/icons";
import { Pokemon, PokemonDetail } from "utils/interface";
import { restAPI } from "utils/rest";
import theme from "utils/theme";
import { PokemonModal } from "./Modal";

export function PokemonCard(props: Pokemon) {
  const { url, name } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();

  useEffect(() => {
    if (!imgSrc) {
      const getData = async () => {
        try {
          const { sprites, ...rest } = await restAPI.getPokemon(url);
          setImgSrc(sprites.front_default);
          setPokemonDetail({
            ...rest,
            name,
            url: sprites.front_default,
          });
        } catch (e) {
          console.error(e);
        }
      };
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <Fragment>
      <VStack
        spacing={5}
        padding={2}
        borderRadius="2xl"
        boxShadow={theme.colors.other.card.boxShadow}
        background={theme.colors.bg.input}
        onClick={() => setIsOpen(true)}
        cursor="pointer"
      >
        <Flex
          align="center"
          justify="center"
          borderRadius="2xl"
          border="1px solid"
          borderColor={theme.colors.other.card.border}
          position="relative"
          minW={36}
          minH={36}
        >
          <PokemonCardBgSVG
            width="100%"
            height="100%"
            position="absolute"
            top={0}
          />
          {imgSrc ? <Image src={imgSrc} alt={name} /> : <Spinner />}
        </Flex>
        <Text
          color={theme.colors.text.primary}
          textTransform="uppercase"
          fontSize="md"
          fontWeight={600}
          fontStyle="italic"
          lineHeight="16px"
          textAlign="center"
        >
          {name}
        </Text>
      </VStack>
      <PokemonModal
        isOpen={isOpen}
        data={pokemonDetail}
        onDismiss={() => setIsOpen(false)}
      />
    </Fragment>
  );
}
