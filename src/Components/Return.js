import React, { useState } from "react";
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
  InputGroup,
  InputLeftElement,
  Icon
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "./useClickOutside";
import { HiSearch } from "react-icons/hi";

const Return = () => {
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [requester, setRequester] = useState("");
  const [reason, setReason] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [isClick, setIsClick] = useState(false);
  const toast = useToast();

  const clearForm = () => {
    setDate("");
    setDesc("");
    setRequester("");
    setReason("");
    setQuantity("");
    setLocation("");
  };

  //Global state
  const { setAppState, item, appState, inventory } = useAuth();

  const returnItemAPI =
    "https://script.google.com/macros/s/AKfycby9YK1q3CQDA_vESrSQpylqOCIvAirNfkifar2-79o-8enMFT6E-b3Gt8a_qrVnFlmEfg/exec?action=returnItem";

  const handleReturnItem = async () => {
    setIsClick(true);
    try {
      if (desc === "") {
        toast({
          title: "Error",
          description: "Select item to return",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsClick(false);
        return;
      }

      if (requester === "") {
        toast({
          title: "Error",
          description: "Input requester name",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsClick(false);
        return;
      }

      if (quantity === "") {
        toast({
          title: "Error",
          description: "Input quantity",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsClick(false);
        return;
      }

      fetch(returnItemAPI, {
        method: "POST",
        body: JSON.stringify({
          date:
            date !== ""
              ? new Date(date).getMonth() +
                1 +
                "/" +
                new Date(date).getDate() +
                "/" +
                new Date(date).getFullYear()
              : "NOT INDICATED",
          desc,
          requester,
          reason,
          quantity,
          location,
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
            setAppState("Item return");
            setTimeout(() => setAppState(""), 100);
            toast({
              title: "Item returned",
              description: "Returned one (1) item to the database",
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
    } catch (error) {
      console.log(error);
    }
  };

  const [term, setTerm] = useState("");
  const [dropdown, setDropdown] = useState(null)


  const domNod = useClickOutside(() => {
    setDropdown(false)
  })
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
                <FormLabel>Date</FormLabel>
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel>Requester</FormLabel>
                <Input
                  value={requester}
                  onChange={(e) => setRequester(e.target.value)}
                  type="text"
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Storage Location</FormLabel>
                <Select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="- Select Location -"
                >
                  <option value="MMS Main Storage Level 1">
                    MMS Main Storage Level 1
                  </option>
                  <option value="MMS Main Storage Level 2">
                    MMS Main Storage Level 2
                  </option>
                  <option value="Tent 1">Tent 1</option>
                  <option value="Tent 2">Tent 2</option>
                  <option value="Tower 1">Tower 1</option>
                </Select>
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={6}>
              <FormControl>
                <FormLabel>Reason of Return</FormLabel>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </FormControl>
            </GridItem>
          </>
        )}
      </SimpleGrid>

      {desc !== "#N/A" && desc !== "" && (
        <HStack marginTop={5} justifyContent="flex-end">
          <Button
            color="#fff"
            isLoading={isClick ? true : false}
            colorScheme="teal"
            loadingText="Processing"
            onClick={() => handleReturnItem()}
            minW={100}
          >
            Return Item
          </Button>
        </HStack>
      )}
    </>
  );
};

export default Return;
