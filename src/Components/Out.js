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
  const { setAppState, item, appState } = useAuth();
  const [isClick, setIsClick] = useState(false);
  const toast = useToast();
  const [equipment, setEquipment] = useState([]);
  const [desc, setDesc] = useState("");
  const [risDate, setRisDate] = useState("");
  const [risNum, setRisNum] = useState("");

  const [quantity, setQuantity] = useState("");
  const [requester, setRequester] = useState("");
  const [area, setArea] = useState("");
  const [available, setAvailable] = useState(0);
  const [unit, setUnit] = useState("");

  const [remark, setRemark] = useState("");

  const [inventory, setInventory] = useState([]);

  const clearForm = () => {
    setDesc("");
    setRisDate("");
    setRisNum("");
    setQuantity("");
    setRequester("");
    setArea("");
    setAvailable("");
    setUnit("");
    setInventory(null);
    setRemark("");
  };

  const outItemAPI =
    "https://script.google.com/macros/s/AKfycbz00BMUuPS1w-g7VnEyM5JsxqsNkOS8boIWuUfv8vVpKmavPFUu2xnYW7qvu8fo9vuBRA/exec?action=outItem";

  const getAvailableAPI =
    "https://script.google.com/macros/s/AKfycbz00BMUuPS1w-g7VnEyM5JsxqsNkOS8boIWuUfv8vVpKmavPFUu2xnYW7qvu8fo9vuBRA/exec?action=getAvailable";

  const getEquipmentAPI =
    "https://script.google.com/macros/s/AKfycbz00BMUuPS1w-g7VnEyM5JsxqsNkOS8boIWuUfv8vVpKmavPFUu2xnYW7qvu8fo9vuBRA/exec?action=getEquipment";

  useEffect(() => {
    fetch(getAvailableAPI, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setInventory(data);
        }
      })
      .catch((error) => console.log(error));
  }, [appState]);

  useEffect(() => {
    fetch(getEquipmentAPI, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.filter(e => e.desc !== ""
        ))
        if (data) {
          setEquipment(
            data.filter((e) => e.desc !== "").filter((f) => f.desc === desc)[0]
          );
        }
      })
      .catch((error) => console.log(error));
  }, [appState, inventory, desc]);

  const handleOutItem = async () => {
    setIsClick(true);
    try {
      if (available < 0) {
        toast({
          title: "Error",
          description: "Not enough stocks",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsClick(false);
        return;
      }
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
            brand: equipment?.brand,
            serialNum: equipment?.serialNum,

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
              setTimeout(() => setAppState(""), 100);
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

  useEffect(() => {
    setAvailable(
      desc === ""
        ? 0
        : inventory?.filter((f) => f.desc === desc)[0]?.available - quantity
    );
  }, [desc, quantity]);

  useEffect(() => {
    console.log(equipment);
  }, [equipment]);

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
            <FormLabel>Item Description </FormLabel>
            <Select
              cursor="pointer"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
                setEquipment([]);
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
              onChange={(e) => {
                setQuantity(e.target.value);
                setAvailable(available - e.target.value);
              }}
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
            <FormLabel>Available Stocks</FormLabel>
            <Input value={available} />
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
