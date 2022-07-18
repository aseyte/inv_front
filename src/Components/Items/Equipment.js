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
} from "@chakra-ui/react";
import { listItems } from "../ListItems";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const Equipment = () => {
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
  const [supplier, setSupplier] = useState("");
  const [propertyNum, setPropertyNum] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [pack, setPack] = useState("");
  const [loose, setLoose] = useState("");
  const [physical, setPhysical] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");
  const [acquisitionMode, setAcquisitionMode] = useState("");
  const [donor, setDonor] = useState("");
  const [remarks, setRemarks] = useState("");
  const [out, setOut] = useState("");
  const [category, setCategory] = useState("Equipment");
  const [cost, setCost] = useState(0);
  const [assigned, setAssigned] = useState("");

  //Utilities State
  const toast = useToast();
  const [isClick, setIsClick] = useState(false);

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
    setSupplier("");
    setPropertyNum("");
    setQuantity("");
    setPack("");
    setLoose("");
    setPhysical("");
    setUnit("");
    setLocation("");
    setAcquisitionMode("");
    setDonor("");
    setRemarks("");
    setOut("");
    setCost("");
    setAssigned("");
  };

  const { setAppState } = useAuth();

  const createItemAPI =
    "https://script.google.com/macros/s/AKfycby2xlnFp-oFuGD4rIZjhBjmqwlCacybdZnIbD_lC42qbD0VCTW_-rIbZ7TxZfA3Km98iQ/exec?action=createEquipment";

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

    fetch(createItemAPI, {
      method: "POST",
      body: JSON.stringify({
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
        supplier,
        propertyNum,
        quantity,
        pack,
        loose,
        physical,
        unit,
        location,
        acquisitionMode,
        donor,
        remarks,
        out,
        assigned,
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
        <GridItem colSpan={3}>
          <FormControl>
            <FormLabel>Article</FormLabel>

            <Select
              value={article}
              onChange={(e) => {
                setArticle(e.target.value);
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
        <GridItem colSpan={3}>
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

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Model</FormLabel>
            <Input value={model} onChange={(e) => setModel(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Variety/Color</FormLabel>
            <Input
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Details2</FormLabel>
            <Input
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Other</FormLabel>
            <Input value={other} onChange={(e) => setOther(e.target.value)} />
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

        <GridItem colSpan={4}>
          <FormControl>
            <FormLabel>Supplier</FormLabel>
            <Input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={3}>
          <FormControl>
            <FormLabel>Property Number</FormLabel>
            <Input
              value={propertyNum}
              onChange={(e) => setPropertyNum(e.target.value)}
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
              min={0}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Pack Size</FormLabel>
            <Input
              type="number"
              value={pack}
              onChange={(e) => setPack(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Loose Count</FormLabel>
            <Input
              type="number"
              value={loose}
              onChange={(e) => setLoose(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Physical Count(pcs)</FormLabel>
            <Input
              type="number"
              value={physical}
              onChange={(e) => setPhysical(e.target.value)}
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
            <FormLabel>Acquisition Mode</FormLabel>
            <Input
              value={acquisitionMode}
              onChange={(e) => setAcquisitionMode(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={3}>
          <FormControl>
            <FormLabel>Donor</FormLabel>
            <Input value={donor} onChange={(e) => setDonor(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={3}>
          <FormControl>
            <FormLabel>Personnel Assigned</FormLabel>
            <Input
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Out</FormLabel>
            <Input value={out} onChange={(e) => setOut(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Cost</FormLabel>
            <Input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={5}>
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
          onClick={() => handleCreate()}
        >
          Create Item
        </Button>
      </HStack>
    </>
  );
};

export default Equipment;
