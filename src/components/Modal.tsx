import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PokemonModalStats } from "utils/constants";
import {
  AbilityEffect1SVG,
  AbilityEffect2SVG,
  PokemonCardBgSVG,
} from "utils/icons";
import { PokemonModalProps } from "utils/interface";
import theme from "utils/theme";
import { PrimaryButton } from "./Button";

interface Dic {
  [key: string]: number;
}

export const PokemonModal = (props: PokemonModalProps): JSX.Element => {
  const { data, isOpen, onDismiss = () => null } = props;
  const [stats, setStats] = useState<Dic>();

  useEffect(() => {
    if (data) {
      const tmpStats: Dic = {};
      data.stats.forEach((item) => {
        tmpStats[item.stat.name] = item.base_stat;
      });
      setStats(tmpStats);
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onDismiss} isCentered size="xs">
      <ModalOverlay />
      <ModalContent rounded="2xl">
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody p={6} zIndex={1}>
          <VStack spacing={7} width="100%">
            <VStack spacing={4} width="100%">
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
                {data?.url ? (
                  <Image src={data?.url} alt={data?.name} />
                ) : (
                  <Spinner />
                )}
              </Flex>
              <Text
                color={theme.colors.text.primary}
                textTransform="uppercase"
                fontSize="2xl"
                fontWeight={600}
                fontStyle="italic"
                lineHeight="16px"
                textAlign="center"
              >
                {data?.name}
              </Text>
            </VStack>
            <VStack spacing={2.5} width="100%">
              {PokemonModalStats.map((stat, idx) => (
                <Flex
                  justify="space-between"
                  align="center"
                  width="100%"
                  key={idx}
                >
                  <HStack spacing={5}>
                    <Icon as={stat.icon} fontSize={30} />
                    <Text
                      fontSize="md"
                      textTransform="capitalize"
                      lineHeight="16px"
                      color={theme.colors.text.secondary}
                      fontWeight={300}
                    >
                      {stat.key}
                    </Text>
                  </HStack>
                  {stats && (
                    <Text
                      fontSize="md"
                      lineHeight="16px"
                      color={theme.colors.text.secondary}
                      fontWeight={400}
                    >
                      {stats[stat.key]}
                    </Text>
                  )}
                </Flex>
              ))}
            </VStack>
            <VStack
              spacing={6}
              padding={6}
              width="100%"
              bg={theme.colors.other.card.border}
              borderRadius="xl"
            >
              <Flex align="center" justify="space-between" width="100%">
                <Text
                  fontSize="md"
                  textTransform="uppercase"
                  lineHeight="16px"
                  color={theme.colors.text.secondary}
                  fontWeight={300}
                >
                  height
                </Text>
                <Text
                  fontSize="md"
                  textTransform="capitalize"
                  lineHeight="16px"
                  color={theme.colors.text.secondary}
                  fontWeight={400}
                >
                  {data?.height}
                </Text>
              </Flex>
              <Flex align="center" justify="space-between" width="100%">
                <Text
                  fontSize="md"
                  textTransform="uppercase"
                  lineHeight="16px"
                  color={theme.colors.text.secondary}
                  fontWeight={300}
                >
                  weight
                </Text>
                <Text
                  fontSize="md"
                  textTransform="capitalize"
                  lineHeight="16px"
                  color={theme.colors.text.secondary}
                  fontWeight={400}
                >
                  {data?.weight}
                </Text>
              </Flex>
            </VStack>
            <Box
              bg={theme.colors.other.card.border}
              borderRadius="xl"
              paddingY={1.5}
              width="100%"
            >
              <Box position="relative" width="100%">
                <AbilityEffect1SVG position="absolute" top={0} left={50} />
                <AbilityEffect2SVG position="absolute" top={0} right={50} />
              </Box>
              <Text
                fontSize="lg"
                fontStyle="italic"
                fontWeight={600}
                textAlign="center"
                textTransform="uppercase"
                lineHeight="16px"
                color={theme.colors.bg.primary}
              >
                abilities
              </Text>
              <VStack spacing={4} py={7} width="100%">
                {data?.abilities.map(({ ability }, idx) => (
                  <Text
                    fontSize="md"
                    fontWeight={500}
                    textTransform="capitalize"
                    lineHeight="16px"
                    color={theme.colors.text.secondary}
                    key={idx}
                  >
                    {ability.name}
                  </Text>
                ))}
              </VStack>
            </Box>
            <PrimaryButton onClick={onDismiss} width="100%">
              Close
            </PrimaryButton>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
