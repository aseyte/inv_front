import { useEffect, useRef } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  SimpleGrid,
  Grid,
  GridItem,
  Divider,
  Center,
  Text,
  Square,
  Flex,
  Stack,
  Box,
  Heading,
  Image,
} from "@chakra-ui/react";

export const VerticallyCenter = ({
  title,
  children,
  isOpen,
  onClose,
  postSubmit,
}) => {
  const CardDet = ({ property, detail }) => {
    return (
      <Box fontSize={15} color={"blackAlpha.600"} w={"100%"} h={"auto"}>
        <Divider orientation="horizontal" />
        <Flex flexDirection={"row"} gap={5}>
          <Text flex={1} fontWeight={"500"}>
            {property}
          </Text>
          <Text flex={1} textAlign={"left"}>
            {detail}
          </Text>
        </Flex>
      </Box>
    );
  };

  return (
    <>
      <Modal onClose={onClose} size={"full"} isOpen={isOpen} isCentered>
        <ModalContent w={"70%"} minW={"70%"} margin={"100px"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {children} */}
            <Flex color="white" h={"70vh"} gap={6}>
              <Box flex="8">
                <Text>Box 3</Text>
              </Box>
              <Divider orientation="vertical"></Divider>
              <Box flex="6" overflowY={"auto"} paddingRight={2}>
                <Stack gap={3}>
                  <Heading
                    color={"blackAlpha.600"}
                    style={{ fontFamily: "poppins" }}
                    fontWeight={"regular"}
                    fontSize={"30"}
                  >
                    Items Description
                  </Heading>
                  <Box
                    fontSize={15}
                    color={"blackAlpha.600"}
                    w={"100%"}
                    h={"auto"}
                  >
                    <Divider orientation="horizontal" />
                    <Flex flexDirection={"row"} gap={5}>
                      <Text flex={1} fontWeight={"500"}>
                        Item Image
                      </Text>
                      <Image
                        boxSize="300px"
                        objectFit="cover"
                        src="https://media.karousell.com/media/photos/products/2022/5/29/dell_latitude_5520_intel_core__1653831125_b8e7d0fe.jpg"
                        alt="Dan Abramov"
                      ></Image>
                    </Flex>
                  </Box>

                  <CardDet
                    property={"Item name"}
                    detail={
                      "description about the details sample sample sample sample sample"
                    }
                  />
                  <CardDet property={"Type"} detail={"sample sample sample"} />
                </Stack>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"teal"} onClick={postSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
