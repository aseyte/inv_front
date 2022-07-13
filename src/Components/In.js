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
  Divider,
  Textarea,
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";

const In = () => {
  const toast = useToast();
  const [item, setItem] = useState([]);
  const { appState, setAppState } = useAuth();
  const [isClick, setIsClick] = useState(false);
  const getUniqueAPI =
    "https://script.google.com/macros/s/AKfycbwhWmYEWBY18WKMVOjokhBVZLC8eR-8OWB-QesfBxqBeO99z3Jo-HNshTxO133P8CIVtA/exec?action=getUnique";

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
  const [acquisition, setAcquisition] = useState("");
  const [expirationMonths, setExpirationMonths] = useState("NOT INDICATED");
  const [remarks, setRemarks] = useState("");
  const [condition, setCondition] = useState("");
  const [fundSource, setFundSource] = useState("");
  const [acquisitionCost, setAcquisitionCost] = useState("");
  const [category, setCategory] = useState("");

  const inItemAPI =
    "https://script.google.com/macros/s/AKfycbzE4Q7NmVI8wULcm6vfaPHCW1asXTNKTDQWKSoyBo2CgNlSbO5A_Dy-OCkBmFj-USj2_Q/exec?action=inItem";

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
    setAcquisition("");
    setExpirationMonths("NOT INDICATED");
    setRemarks("");
    setCondition("");
    setFundSource("");
    setAcquisitionCost("");
    setCategory("");
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
        <GridItem colSpan={5} mb={7} width="80%">
          <FormControl isRequired>
            <FormLabel>Item Description</FormLabel>
            <Select
              cursor="pointer"
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
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
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
            <Input value={origin} onChange={(e) => setOrigin(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Acquisition Mode</FormLabel>
            <Select
              value={acquisition}
              onChange={(e) => setAcquisition(e.target.value)}
              placeholder="- Select Acquisition -"
            >
              <option value="Purchase">Purchase</option>
              <option value="Donation">Donation</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem colSpan={3}>
          <FormControl>
            <FormLabel>Expiration (Months)</FormLabel>
            <Input value={expirationMonths} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={3}>
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
            <Input
              value={acquisitionCost}
              onChange={(e) => setAcquisitionCost(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
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
