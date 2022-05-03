import { Button, HStack, Icon, IconButton } from "@chakra-ui/react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaEllipsisH,
} from "react-icons/fa";
import { PaginationFCProps } from "utils/interface";
import theme from "utils/theme";

export function Pagination(props: PaginationFCProps) {
  const { next, prev, jump, currentPage, maxPage } = props;

  return (
    <HStack align="stretch" spacing={4}>
      <IconButton
        aria-label="back"
        icon={<FaAngleDoubleLeft fontSize={20} />}
        width={14}
        height={14}
        onClick={prev}
        bg={theme.colors.bg.primary}
        color={theme.colors.text.button}
      />
      <HStack
        align="center"
        background={theme.colors.bg.input}
        borderRadius="md"
      >
        <Button
          width={14}
          height={14}
          bg={
            currentPage === maxPage
              ? theme.colors.bg.input
              : theme.colors.bg.primary
          }
          color={
            currentPage === maxPage
              ? theme.colors.text.primary
              : theme.colors.text.button
          }
          onClick={() => jump(currentPage === maxPage ? 1 : currentPage)}
        >
          {currentPage === maxPage ? 1 : currentPage}
        </Button>
        {currentPage !== maxPage && (
          <Button
            width={14}
            height={14}
            bg={theme.colors.bg.input}
            color={theme.colors.text.primary}
            onClick={() => jump(currentPage + 1)}
          >
            {currentPage + 1}
          </Button>
        )}
        <Icon as={FaEllipsisH} />
        <Button
          width={14}
          height={14}
          bg={
            currentPage === maxPage
              ? theme.colors.bg.primary
              : theme.colors.bg.input
          }
          color={
            currentPage === maxPage
              ? theme.colors.text.button
              : theme.colors.text.primary
          }
          onClick={() => jump(maxPage)}
        >
          {maxPage}
        </Button>
      </HStack>
      <IconButton
        aria-label="forward"
        icon={<FaAngleDoubleRight fontSize={20} />}
        width={14}
        height={14}
        onClick={next}
        bg={theme.colors.bg.primary}
        color={theme.colors.text.button}
      />
    </HStack>
  );
}
