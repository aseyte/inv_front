import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  SimpleGrid,
  GridItem,
  Select,
  Button,
  useToast,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import { listItems } from "../ListItems";
import useAuth from "../../Hooks/useAuth";
import uniqid from "uniqid";

const Equipment = ({ setTab }) => {
  const donors = [
    "doh",
    "department of health",
    "icrc",
    "international committee of the red cross",
    "biatf",
    "who",
    "world health organization",
  ];

  const [article, setArticle] = useState("");
  const [articleOther, setArticleOther] = useState("");
  const [type, setType] = useState("");
  const [typeOther, setTypeOther] = useState("");
  const [descOrig, setDescOrig] = useState("");
  const [desc, setDesc] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [details, setDetails] = useState("");
  const [other, setOther] = useState("");
  const [brand, setBrand] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [origin, setOrigin] = useState("");
  const [serialNum, setSerialNum] = useState("");
  const [warranty, setWarranty] = useState("");
  const [acquisitation, setAcquisition] = useState("");
  const [propertyNum, setPropertyNum] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");
  const [donor, setDonor] = useState("");
  const [remarks, setRemarks] = useState("");
  const [category, setCategory] = useState("Equipment");
  const [cost, setCost] = useState(0);
  const { user } = useAuth();

  //Utilities State
  const todate = new Date();
  const toast = useToast();
  const [isClick, setIsClick] = useState(false);
  const [todayTime, setTodayTime] = useState(
    todate.getHours() + ":" + todate.getMinutes() + ":" + todate.getSeconds()
  );
  const [todayDate, setTodayDate] = useState(
    todate.getMonth() + 1 + "/" + todate.getDate() + "/" + todate.getFullYear()
  );

  const inItemAPI =
    "https://script.google.com/macros/s/AKfycbzD3yhqneDKW_UvKgr-H6AGA1J3o3Jei_Ql3_t2MMQW7_XrdJ1vF3Th2kZyU7Mv2M5J9Q/exec?action=inItem";

  //In state
  const [lot, setLot] = useState("");
  const [expiration, setExpiration] = useState("NOT INDICATED");
  const [iar, setIar] = useState("");
  const [iarDate, setIarDate] = useState("");
  const [delivery, setDelivery] = useState("");
  const [total, setTotal] = useState(1);
  const [condition, setCondition] = useState("");
  const [fundSource, setFundSource] = useState("");

  const clearForm = () => {
    setArticle("");
    setArticleOther("");
    setType("");
    setTypeOther("");
    setDescOrig("");
    setDesc("");
    setModel("");
    setVariant("");
    setDetails("");
    setOther("");
    setBrand("");
    setManufacturer("");
    setOrigin("");
    setSerialNum("");
    setWarranty("");
    setAcquisition("");
    setPropertyNum("");
    setUnit("");
    setLocation("");
    setDonor("");
    setRemarks("");
    setCost("");
    setLot("");
    setExpiration("NOT INDICATED");
    setIar("");
    setIarDate("");
    setDelivery("");
    setCondition("");
    setFundSource("");
  };

  const { setAppState } = useAuth();

  const createItemAPI =
    "https://script.google.com/macros/s/AKfycbwSKHgXCCpP70HGGC8m7V3McqJV5K2j7zN4zCAcTzSL-dcd13--QJlOY9XWxu4HV97KVQ/exec?action=createEquipment";

  const handleCreate = async () => {
    setIsClick(true);

    if (
      !descOrig ||
      (!article &&
        !articleOther &&
        !type &&
        !typeOther &&
        !model &&
        !variant &&
        !details &&
        !other)
    ) {
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

    if (total <= 0) {
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

    fetch(createItemAPI, {
      method: "POST",
      body: JSON.stringify({
        uniqueId: uniqid() + uniqid(),
        descOrig,
        desc,
        article: article === "Other" ? articleOther : article,
        type: type === "Other" ? typeOther : type,
        model,
        variant,
        details,
        other,
        brand,
        manufacturer,
        origin,
        serialNum,
        warranty,
        acquisitation,
        propertyNum,
        unit,
        location,
        acquisitionMode: donors.includes(donor.toLocaleLowerCase())
          ? "Donation"
          : "Purchase",
        donor,
        remarks,
        assigned: user?.firstname + " " + user?.lastname,
        cost,
        category,
      }),
    })
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        if (response.ok) {
          handleInItem();
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
        console.log(error);
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
    setDesc(
      (article === "Other" ? articleOther : article) +
        " " +
        (type === "Other" ? typeOther : type) +
        " " +
        model +
        " " +
        variant +
        " " +
        details +
        " " +
        other
    );
  }, [article, articleOther, type, typeOther, model, variant, details, other]);

  const handleInItem = async () => {
    setIsClick(true);

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

        quantity: "",
        pack: "",
        loose: "",
        unit,
        total,
        location,
        supplier: donor,
        manufacturer,
        origin,
        acquisition: donors.includes(donor.toLocaleLowerCase())
          ? "Donation"
          : "Purchase",
        remarks,
        condition,
        fundSource,
        acquisitionCost: cost,
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

  return (
    <>
      <SimpleGrid
        columns={6}
        columnGap={4}
        rowGap={6}
        w="full"
        h={"full"}
        p={6}
      >
        <GridItem colSpan={3}>
          <FormControl isRequired>
            <FormLabel>Item Description (Original)</FormLabel>
            <Textarea
              value={descOrig}
              onChange={(e) => setDescOrig(e.target.value)}
              placeholder="Original Description"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={3}>
          <FormControl isRequired>
            <FormLabel>Item Description</FormLabel>
            <Textarea isReadOnly background="#eee" disabled value={desc} />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Article</FormLabel>

            <Select
              value={article}
              onChange={(e) => {
                setArticle(e.target.value);
                setTypeOther("");
                setType("");
              }}
              placeholder="- Select Article -"
            >
              {listItems.map((item, index) => {
                return (
                  <option value={item.article} key={index}>
                    {item.article}
                  </option>
                );
              })}
            </Select>
            {article === "Other" && (
              <Input
                value={articleOther}
                onChange={(e) => setArticleOther(e.target.value)}
                marginTop={4}
                variant="filled"
                placeholder="If other, please specify"
              />
            )}
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Type/Form</FormLabel>

            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="- Select Type/Form -"
            >
              {listItems
                .filter((e) => e.article === article)
                .map((f) => {
                  return f.type.map((item, index) => {
                    return (
                      <option key={index} selected value={item}>
                        {item}
                      </option>
                    );
                  });
                })}
            </Select>

            {type === "Other" && (
              <Input
                value={typeOther}
                onChange={(e) => setTypeOther(e.target.value)}
                marginTop={4}
                variant="filled"
                placeholder="If other, please specify"
              />
            )}
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Model</FormLabel>
            <Input value={model} onChange={(e) => setModel(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Variety/Color</FormLabel>
            <Input
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={6}>
          <FormControl>
            <FormLabel>Details2</FormLabel>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Other</FormLabel>
            <Input value={other} onChange={(e) => setOther(e.target.value)} />
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
            <FormLabel>Manufacturer</FormLabel>
            <Input
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Country of Origin</FormLabel>
            <Input value={origin} onChange={(e) => setOrigin(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Serial Number</FormLabel>
            <Input
              value={serialNum}
              onChange={(e) => setSerialNum(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Warranty</FormLabel>
            <Input
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              type="date"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Acquisition Date</FormLabel>
            <Input
              value={acquisitation}
              onChange={(e) => setAcquisition(e.target.value)}
              type="date"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Property Number</FormLabel>
            <Input
              value={propertyNum}
              onChange={(e) => setPropertyNum(e.target.value)}
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
            <Input value={donor} onChange={(e) => setDonor(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Cost</FormLabel>
            <InputGroup>
              <InputLeftAddon children="₱" />
              <Input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="Pesos (php)"
              />
            </InputGroup>
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
        <Button onClick={() => setTab("inItem")}>Cancel</Button>
        <Button
          color="#fff"
          isLoading={isClick ? true : false}
          colorScheme="teal"
          loadingText="Creating Item"
          onClick={() => handleCreate()}
        >
          Create Item
        </Button>
      </HStack>
    </>
  );
};

export default Equipment;
