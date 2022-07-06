import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Select,
  Input,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";

const In = () => {
  const toast = useToast();
  const [item, setItem] = useState([]);
  const { appState, setAppState } = useAuth();
  const [isClick, setIsClick] = useState(false);
  const getItemAPI =
    "https://script.google.com/macros/s/AKfycbwfpAfHpL0FlhIbqd7GPqkElEKEQVeI8WcYl9ohIeUyE9NuCXVkLpuH6X9A9R5lGA5osw/exec?action=getEquipment";

  useEffect(() => {
    fetch(getItemAPI, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setItem(data);
        }
      })
      .catch((error) => console.log(error));
  }, [appState]);

  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [lot, setLot] = useState("");
  const [expiration, setExpiration] = useState("");
  const [iar, setIar] = useState("");
  const [iarDate, setIarDate] = useState("");
  const [delivery, setDelivery] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pack, setPack] = useState("");
  const [loose, setLoose] = useState("");
  const [unit, setUnit] = useState("");
  const [total, setTotal] = useState("");
  const [location, setLocation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [origin, setOrigin] = useState("");
  const [acquisition, setAcquisition] = useState("");
  const [expirationMonths, setExpirationMonths] = useState("");
  const [remarks, setRemarks] = useState("");
  const [condition, setCondition] = useState("");
  const [fundSource, setFundSource] = useState("");
  const [acquisitionCost, setAcquisitionCost] = useState("");
  const [category, setCategory] = useState("");

  const inItemAPI =
    "https://script.google.com/macros/s/AKfycbyLNI5Vlj46f-89i3kKxk6l-3QQpgRSEWxjJDNyrSqDngMX0jZH-1o2ubv1ReUoot6Bjw/exec?action=inItem";

  const clearForm = () => {
    setDesc("");
    setBrand("");
    setLot("");
    setExpiration("");
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
    setAcquisition("");
    setExpirationMonths("");
    setRemarks("");
    setCondition("");
    setFundSource("");
    setAcquisitionCost("");
    setCategory("");
  };

  const handleInItem = async () => {
    setIsClick(true);

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
        desc,
        brand,
        lot,
        expiration,
        iar,
        iarDate,
        delivery,
        quantity,
        pack,
        loose,
        unit,
        total,
        location,
        supplier,
        manufacturer,
        origin,
        acquisition,
        expirationMonths,
        remarks,
        condition,
        fundSource,
        acquisitionCost,
        category,
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

  return (
    <>
      <SimpleGrid columns={3} columnGap={3} rowGap={6} w="full" h={"full"}>
        <GridItem colSpan={3}>
          <FormControl isRequired>
            <FormLabel>Item Description</FormLabel>
            <Select
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="- Select Item -"
            >
              {item?.map((item, index) => {
                return (
                  <option value={item.desc} key={index}>
                    {item.desc}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Lot/Serial #</FormLabel>
            <Input value={lot} onChange={(e) => setLot(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Expiration</FormLabel>
            <Input
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              type="date"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>IAR #</FormLabel>
            <Input value={iar} onChange={(e) => setIar(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>IAR Date</FormLabel>
            <Input
              value={iarDate}
              onChange={(e) => setIarDate(e.target.value)}
              type="date"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
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
            <Input value={loose} onChange={(e) => setLoose(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Unit</FormLabel>
            <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Total</FormLabel>
            <Input value={total} onChange={(e) => setTotal(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Supplier/Donor</FormLabel>
            <Input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Manufacturer</FormLabel>
            <Input
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Origin</FormLabel>
            <Input value={origin} onChange={(e) => setOrigin(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Acquisition Mode</FormLabel>
            <Input
              value={acquisition}
              onChange={(e) => setAcquisition(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Expiration (Months)</FormLabel>
            <Input
              value={expirationMonths}
              onChange={(e) => setExpirationMonths(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Remarks</FormLabel>
            <Input
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Condition</FormLabel>
            <Input
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Fund Source</FormLabel>
            <Input
              value={fundSource}
              onChange={(e) => setFundSource(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Acquisition Cost</FormLabel>
            <Input
              value={acquisitionCost}
              onChange={(e) => setAcquisitionCost(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          onClick={() => handleInItem()}
          minW={100}
        >
          IN
        </Button>
      </HStack>
    </>
  );
};

export default In;
