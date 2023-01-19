import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  useToast,
  Divider,
  Textarea,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Icon,
  Container,
  InputLeftAddon,
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { HiSearch } from "react-icons/hi";
import { useClickOutside } from "../Components/useClickOutside";
import InItemModal from "./InItemModal";

const In = ({ setTab }) => {
  const toast = useToast();
  const [item, setItem] = useState([]);
  const { appState, setAppState, inventory, user } = useAuth();
  const [isClick, setIsClick] = useState(false);
  const getUniqueAPI =
    "https://script.google.com/macros/s/AKfycby9YK1q3CQDA_vESrSQpylqOCIvAirNfkifar2-79o-8enMFT6E-b3Gt8a_qrVnFlmEfg/exec?action=getUnique";

  useEffect(() => {
    fetch(getUniqueAPI, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setItem(data.filter((e) => e.desc !== ""));
        }
      })
      .catch((error) => console.log(error));
  }, [appState]);

  const todate = new Date();

  const [todayTime, setTodayTime] = useState(
    todate.getHours() + ":" + todate.getMinutes() + ":" + todate.getSeconds()
  );
  const [todayDate, setTodayDate] = useState(
    todate.getMonth() + 1 + "/" + todate.getDate() + "/" + todate.getFullYear()
  );
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [lot, setLot] = useState("");
  const [expiration, setExpiration] = useState("NOT INDICATED");
  const [iar, setIar] = useState("");
  const [iarDate, setIarDate] = useState("");
  const [delivery, setDelivery] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [pack, setPack] = useState(0);
  const [loose, setLoose] = useState(0);
  const [unit, setUnit] = useState("");
  const [total, setTotal] = useState("");
  const [location, setLocation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [origin, setOrigin] = useState("");
  const [expirationMonths, setExpirationMonths] = useState("NOT INDICATED");
  const [remarks, setRemarks] = useState("");
  const [condition, setCondition] = useState("");
  const [fundSource, setFundSource] = useState("");
  const [acquisitionCost, setAcquisitionCost] = useState("");

  const donors = [
    "doh",
    "department of health",
    "icrc",
    "international committee of the red cross",
    "biatf",
    "who",
    "world health organization",
  ];

  const inItemAPI =
    "https://script.google.com/macros/s/AKfycbzD3yhqneDKW_UvKgr-H6AGA1J3o3Jei_Ql3_t2MMQW7_XrdJ1vF3Th2kZyU7Mv2M5J9Q/exec?action=inItem";

  const clearForm = () => {
    setDesc("");
    setBrand("");
    setLot("");
    setExpiration("NOT INDICATED");
    setIar("");
    setIarDate("");
    setDelivery("");
    setQuantity("");
    setPack("");
    setLoose("");
    setUnit("");
    setTotal("");
    setLocation("");
    setSupplier("");
    setManufacturer("");
    setOrigin("");
    setExpirationMonths("NOT INDICATED");
    setRemarks("");
    setCondition("");
    setFundSource("");
    setAcquisitionCost("");
  };

  const handleInItem = async () => {
    setIsClick(true);

    if (total === 0) {
      setIsClick(false);
      toast({
        title: "Error",
        description: "Please enter quantity",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (!desc) {
      setIsClick(false);
      toast({
        title: "Error",
        description: "Enter Item Description",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    fetch(inItemAPI, {
      method: "POST",
      body: JSON.stringify({
        timestamp: todayTime + " " + todayDate,
        desc,
        brand,
        lot,
        expiration:
          expiration !== "NOT INDICATED"
            ? new Date(expiration).getMonth() +
              1 +
              "/" +
              new Date(expiration).getDate() +
              "/" +
              new Date(expiration).getFullYear()
            : "NOT INDICATED",
        iar,
        iarDate:
          iarDate !== ""
            ? new Date(iarDate).getMonth() +
              1 +
              "/" +
              new Date(iarDate).getDate() +
              "/" +
              new Date(iarDate).getFullYear()
            : null,

        delivery:
          delivery !== ""
            ? new Date(delivery).getMonth() +
              1 +
              "/" +
              new Date(delivery).getDate() +
              "/" +
              new Date(delivery).getFullYear()
            : null,

        quantity,
        pack,
        loose,
        unit,
        total,
        location,
        supplier,
        manufacturer,
        origin,
        acquisition: donors.includes(supplier.toLocaleLowerCase())
          ? "Donation"
          : "Purchase",
        expirationMonths,
        remarks,
        condition,
        fundSource,
        acquisitionCost,
        user: user?.firstname + " " + user?.lastname,
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
  };

  useEffect(() => {
    const fetchTotal = () => {
      if (!quantity && !pack && !loose) {
        return setTotal(0);
      } else if (quantity && pack && loose) {
        return setTotal(parseInt(quantity * pack) + parseInt(loose));
      } else if (quantity && !pack && !loose) {
        return setTotal(0);
      } else if (!quantity && pack && loose) {
        return setTotal(parseInt(pack) + parseInt(loose));
      } else if (!pack && loose) {
        return setTotal(loose);
      } else if (quantity && pack && !loose) {
        return setTotal(parseInt(quantity * pack));
      } else {
        return setTotal(pack);
      }
    };

    fetchTotal();
  }, [quantity, pack, loose]);

  const getExpirationMonth = (date1, date2) => {
    let months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();

    if (months < 0) {
      return setExpirationMonths("EXPIRED");
    } else {
      return setExpirationMonths(
        months > 1 ? `${months} MONTHS` : `${months} MONTH`
      );
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const [term, setTerm] = useState("");

  const domNod = useClickOutside(() => {
    setDropdown(false);
  });

  return (
    <>
      <Container
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
        bg="#fff"
        padding={5}
        borderRadius={8}
        maxW="container.lg"
        w="full"
        h="full"
      >
        <SimpleGrid
          columns={6}
          columnGap={3}
          rowGap={6}
          w="full"
          h={"full"}
          p={6}
          flexDirection="column"
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
                      <Button
                        onClick={() => {
                          setDesc("");
                          setTerm("");
                          setDropdown(false);
                          setTab("create");
                        }}
                        fontSize="14px"
                        ml={2}
                      >
                        New
                      </Button>
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
                      .filter((e) => e.desc !== "#N/A")
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
                            {item.desc}{" "}
                            <span
                              className={
                                inventory?.filter(
                                  (e) => e.desc === item.desc
                                )[0]?.available === 0
                                  ? "empty"
                                  : ""
                              }
                            >
                              {
                                inventory?.filter(
                                  (e) => e.desc === item.desc
                                )[0]?.available
                              }
                            </span>
                          </p>
                        );
                      })}

                    {item
                      ?.filter((f) =>
                        f.desc.toLowerCase().includes(term.toLocaleLowerCase())
                      )
                      .filter((e) => e.desc !== "#N/A").length === 0 && (
                      <p
                        onClick={() => {
                          setDesc("");
                          setTerm("");
                          setDropdown(false);
                          setTab("create");
                        }}
                        className="no-data"
                      >
                        No data found. Create new.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Lot/Serial #</FormLabel>
              <Input value={lot} onChange={(e) => setLot(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Expiration</FormLabel>
              <Input
                value={expiration}
                onChange={(e) => {
                  setExpiration(e.target.value);
                  getExpirationMonth(todate, new Date(e.target.value));
                }}
                type="date"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2} width="100%">
            <FormControl>
              <FormLabel>IAR #</FormLabel>
              <Input value={iar} onChange={(e) => setIar(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>IAR Date</FormLabel>
              <Input
                value={iarDate}
                onChange={(e) => setIarDate(e.target.value)}
                type="date"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Delivery Date</FormLabel>
              <Input
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                type="date"
              />
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

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Pack Size</FormLabel>
              <Input
                value={pack}
                onChange={(e) => setPack(e.target.value)}
                type="number"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Loose</FormLabel>
              <Input
                min={0}
                type="number"
                value={loose}
                onChange={(e) => {
                  setLoose(e.target.value);
                }}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Unit</FormLabel>
              <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Total</FormLabel>
              <Input
                value={total}
                disabled
                background="#eee"
                _readOnly
                opacity={1}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={3}>
            <FormControl>
              <FormLabel>Location</FormLabel>
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

          <GridItem colSpan={3}>
            <FormControl>
              <FormLabel>Supplier/Donor</FormLabel>
              <Input
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Manufacturer</FormLabel>
              <Input
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Origin</FormLabel>
              <Input
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Condition</FormLabel>
              <Input
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Fund Source</FormLabel>
              <Input
                value={fundSource}
                onChange={(e) => setFundSource(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Acquisition Cost</FormLabel>
              <InputGroup>
                <InputLeftAddon children="₱" />
                <Input
                  type="number"
                  value={acquisitionCost}
                  onChange={(e) => setAcquisitionCost(e.target.value)}
                  placeholder="Pesos (php)"
                />
              </InputGroup>
            </FormControl>
          </GridItem>

          <GridItem colSpan={6}>
            <FormControl>
              <FormLabel>Remarks</FormLabel>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </FormControl>
          </GridItem>
        </SimpleGrid>

        <HStack marginTop={5} justifyContent="flex-end">
          <Button
            color="#fff"
            isLoading={isClick ? true : false}
            colorScheme="teal"
            loadingText="Processing"
            onClick={() => handleInItem()}
            minW={100}
          >
            IN
          </Button>
        </HStack>
      </Container>
    </>
  );
};

export default In;
