import {
  Box,
  Flex,
  FormControl,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import logoPath from "assets/images/logo.png";
import { PrimaryButton } from "components/Button";
import { ChakraInput } from "components/Input";
import { BaseLayout } from "components/Layout";
import useAuth from "contexts/auth";
import { ChangeEvent, memo, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import theme from "utils/theme";

function FormPage() {
  const { currentUser, UpdateUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDob] = useState(0);
  const [errors, setErrors] = useState({
    name: false,
    dob: false,
  });
  const [isStep2, setIsStep2] = useState(false);

  useEffect(() => {
    if (currentUser?.name) {
      setIsStep2(true);
    }
  }, [currentUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrors({ ...errors, name: false });
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDob(Math.floor(date.getTime() / 1000));
    }
  };

  const handleNextStep = () => {
    if (isStep2) {
      if (dob) {
        UpdateUser(name, dob);
        navigate("/list");
      } else {
        setErrors({ ...errors, dob: true });
      }
    } else {
      if (name) {
        UpdateUser(name, dob);
        setIsStep2(true);
      } else {
        setErrors({ ...errors, name: true });
      }
    }
  };

  return (
    <BaseLayout>
      <VStack spacing={32} w="full">
        <Flex align="center" h={64}>
          <Image objectFit="cover" src={logoPath} alt="pokedex" />
        </Flex>
        <VStack spacing={12} w="full">
          <Flex align="center" justify="center" w="full" mx="auto" maxW="3xl">
            {isStep2 ? (
              <FormControl>
                <Box position="relative" width="100%">
                  <ReactDatePicker
                    className="react-datepicker--calendar"
                    placeholderText="MM/DD/YYYY"
                    dateFormat="MM/dd/yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    showPopperArrow={false}
                    selected={dob ? new Date(dob * 1000) : new Date()}
                    onChange={(date: Date | null) => handleChangeDate(date)}
                  />
                  <Icon
                    as={AiOutlineCalendar}
                    fontSize={24}
                    position="absolute"
                    right={0}
                    top="50%"
                    transform="translate(-50%, -50%)"
                  />
                </Box>
                {errors.dob && (
                  <Text fontSize="md" color={theme.colors.text.error}>
                    This field is required.
                  </Text>
                )}
              </FormControl>
            ) : (
              <FormControl>
                <ChakraInput
                  placeholder="Full name"
                  value={name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <Text fontSize="md" color={theme.colors.text.error}>
                    This field is required.
                  </Text>
                )}
              </FormControl>
            )}
          </Flex>

          <PrimaryButton w={60} onClick={handleNextStep}>
            Next
          </PrimaryButton>
        </VStack>
      </VStack>
    </BaseLayout>
  );
}

export default memo(FormPage);
