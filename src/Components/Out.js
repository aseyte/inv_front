import React, { useState, useEffect } from "react";
import {
  FormControl,
  SimpleGrid,
  GridItem,
  Select,
  FormLabel,
  Input,
  useToast,
  HStack,
  Button,
  Textarea,
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";

const Out = () => {
  const { setAppState, item } = useAuth();
  const [isClick, setIsClick] = useState(false);
  const toast = useToast();

  const [desc, setDesc] = useState("");
  const [risDate, setRisDate] = useState("");
  const [risNum, setRisNum] = useState("");

  const [quantity, setQuantity] = useState("");
  const [requester, setRequester] = useState("");
  const [area, setArea] = useState("");
  const [available, setAvailable] = useState("");
  const [unit, setUnit] = useState("");

  const [remark, setRemark] = useState("");

  const clearForm = () => {
    setDesc("");
    setRisDate("");
    setRisNum("");
    setQuantity("");
    setRequester("");
    setArea("");
    setAvailable("");
    setUnit("");

    setRemark("");
  };

  const outItemAPI =
    "https://script.google.com/macros/s/AKfycbzAVA5lTsPmyXmYv425gOoVD1-mw6OsMaMKhAf16vppmm6KslUbAClp0hbg4fRhOiG7pw/exec?action=outItem";

  const handleOutItem = async () => {
    setIsClick(true);
    try {
      if (!desc) {
        toast({
          title: "Error",
          description: "Select Item",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsClick(false);
      } else if (!quantity) {
        toast({
          title: "Error",
          description: "Input quantity",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsClick(false);
      } else if (!area) {
        toast({
          title: "Error",
          description: "Input area",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsClick(false);
      } else if (!requester) {
        toast({
          title: "Error",
          description: "Indicate the requester's name",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsClick(false);
      } else {
        fetch(outItemAPI, {
          method: "POST",
          body: JSON.stringify({
            desc,
            risDate,
            risNum,

            quantity,
            requester,
            area,
            available,
            unit,

            remark,
          }),
        })
          .then(async (response) => {
            const isJson = response.headers
              .get("content-type")
              ?.includes("application/json");
            const data = isJson && (await response.json());

            if (response.ok) {
              setIsClick(false);
              clearForm();
              setAppState("Item Created");
              setTimeout(() => setAppState(""), 500);
              toast({
                title: "Item Created",
                description: "Added one (1) item to the database",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }

            // check for error response
            if (!response.ok) {
              setIsClick(false);
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;

              return Promise.reject(error);
            }
          })
          .catch((error) => {
            setIsClick(false);
            toast({
              title: "Error",
              description: "An error occured",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occured",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsClick(false);
    }
  };

  return (
    <>
      <SimpleGrid
        columns={6}
        columnGap={3}
        rowGap={6}
        w="full"
        h={"full"}
        p={6}
      >
        <GridItem colSpan={5} width="80%" mb={7}>
          <FormControl isRequired>
            <FormLabel>Item Description</FormLabel>
            <Select
              cursor="pointer"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              placeholder="- Select Item -"
            >
              {item?.map((item, index) => {
                return (
                  <option key={index} value={item.desc}>
                    {item.desc}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </GridItem>

        <GridItem colSpan={3}>
          <FormControl isRequired>
            <FormLabel>RIS Date</FormLabel>
            <Input
              value={risDate}
              onChange={(e) => setRisDate(e.target.value)}
              type="date"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel>RIS #</FormLabel>
            <Input value={risNum} onChange={(e) => setRisNum(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Quantity</FormLabel>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={4}>
          <FormControl isRequired>
            <FormLabel>Requester Name</FormLabel>
            <Input
              value={requester}
              onChange={(e) => setRequester(e.target.value)}
              placeholder="Full name"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel>Area/Office</FormLabel>
            <Input value={area} onChange={(e) => setArea(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel>Available</FormLabel>
            <Input />
          </FormControl>
        </GridItem>

        <GridItem colSpan={3}>
          <FormControl isRequired>
            <FormLabel>Unit</FormLabel>
            <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={5}>
          <FormControl isRequired>
            <FormLabel>Remarks</FormLabel>
            <Textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </FormControl>
        </GridItem>
      </SimpleGrid>

      <HStack marginTop={5} justifyContent="flex-end">
        <Button
          color="#fff"
          isLoading={isClick ? true : false}
          colorScheme="teal"
          loadingText="Creating Item"
          onClick={() => handleOutItem()}
          minW={100}
        >
          OUT
        </Button>
      </HStack>
    </>
  );
};

export default Out;
