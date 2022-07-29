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
  Icon,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "./useClickOutside";
import { HiSearch } from "react-icons/hi";

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
  const [brand, setBrand] = useState("");
  const [remark, setRemark] = useState("");
  const [serialNum, setSerialNum] = useState("");
  const [expiration, setExpiration] = useState("NOT INDICATED");
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
    setBrand("");
    setSerialNum("");
    setExpiration("NOT INDICATED");
  };

  const outItemAPI =
    "https://script.google.com/macros/s/AKfycby9YK1q3CQDA_vESrSQpylqOCIvAirNfkifar2-79o-8enMFT6E-b3Gt8a_qrVnFlmEfg/exec?action=outItem";

  const getAvailableAPI =
    "https://script.google.com/macros/s/AKfycby9YK1q3CQDA_vESrSQpylqOCIvAirNfkifar2-79o-8enMFT6E-b3Gt8a_qrVnFlmEfg/exec?action=getAvailable";

  const getEquipmentAPI =
    "https://script.google.com/macros/s/AKfycby9YK1q3CQDA_vESrSQpylqOCIvAirNfkifar2-79o-8enMFT6E-b3Gt8a_qrVnFlmEfg/exec?action=getEquipment";

  const todate = new Date();

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
            risDate:
              risDate !== ""
                ? new Date(risDate).getMonth() +
                  1 +
                  "/" +
                  new Date(risDate).getDate() +
                  "/" +
                  new Date(risDate).getFullYear()
                : "",
            risNum,
            brand,
            serialNum,
            quantity,
            requester,
            area,
            available,
            unit,
            remark,
            expiration:
              expiration !== "NOT INDICATED"
                ? new Date(expiration).getMonth() +
                  1 +
                  "/" +
                  new Date(expiration).getDate() +
                  "/" +
                  new Date(expiration).getFullYear()
                : "",
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



  const [term, setTerm] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const domNod = useClickOutside(() => {
    setDropdown(false);
  });

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
        <GridItem colSpan={4}>
          <FormControl isRequired>
            <FormLabel>Item Description</FormLabel>
            <div
              ref={domNod}
              onClick={() => setDropdown(!dropdown)}
              className="custom-select"
            >
              <p>{desc === "" ? "- Select Item -" : desc}</p>
              {dropdown && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="select-dropdown"
                >
                  <div className="select-input-container">
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children={<Icon as={HiSearch} />}
                      />
                      <Input
                        background="#fff"
                        value={term}
                        onChange={(e) => {
                          setTerm(e.target.value);
                        }}
                        fontSize="14px"
                        placeholder="Search"
                      />
                    </InputGroup>
                  </div>

                  {item
                    ?.filter((val) => {
                      if (term === "") {
                        return val;
                      } else if (
                        val.desc
                          .toLowerCase()
                          .includes(term.toLocaleLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item, index) => {
                      return (
                        <p
                          className={desc === item.desc ? "active" : ""}
                          onClick={() => {
                            setDesc(item.desc);
                            setDropdown(false);
                          }}
                          key={index}
                        >
                          {item.desc}
                          <span
                            className={
                              inventory?.filter((e) => e.desc === item.desc)[0]
                                ?.available === 0
                                ? "empty"
                                : ""
                            }
                          >
                            {
                              inventory?.filter((e) => e.desc === item.desc)[0]
                                ?.available
                            }
                          </span>
                        </p>
                      );
                    })}
                </div>
              )}
            </div>
           
          </FormControl>
        </GridItem>

        {desc !== "#N/A" && desc !== "" && (
          <>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Brand</FormLabel>
                <Input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  type="text"
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>RIS Date</FormLabel>
                <Input
                  value={risDate}
                  onChange={(e) => setRisDate(e.target.value)}
                  type="date"
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>RIS #</FormLabel>
                <Input
                  value={risNum}
                  onChange={(e) => setRisNum(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>LOT/Serial #</FormLabel>
                <Input
                  value={serialNum}
                  onChange={(e) => setSerialNum(e.target.value)}
                />
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

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Expiration</FormLabel>
                <Input
                  value={expiration}
                  onChange={(e) => {
                    setExpiration(e.target.value);
                   
                  }}
                  type="date"
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Unit</FormLabel>
                <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel>Available Stocks</FormLabel>
                <Input disabled background="#eee" _readOnly value={available} />
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

            <GridItem colSpan={6}>
              <FormControl>
                <FormLabel>Remarks</FormLabel>
                <Textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </FormControl>
            </GridItem>
          </>
        )}
      </SimpleGrid>

      {desc !== "" && desc !== "#N/A" && (
        <HStack marginTop={5} justifyContent="flex-end">
          <Button
            color="#fff"
            isLoading={isClick ? true : false}
            colorScheme="teal"
            loadingText="Processing"
            onClick={() => handleOutItem()}
            minW={100}
          >
            OUT
          </Button>
        </HStack>
      )}
    </>
  );
};

export default Out;
