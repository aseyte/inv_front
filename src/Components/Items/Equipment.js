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
import axios from "axios";
const qs = require("qs");

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
  const [acquisitation, setAcquisition] = useState(new Date());
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

  //Utilities State
  const toast = useToast();
  const [isClick, setIsClick] = useState(false);

  const handleCreate = async () => {
    setIsClick(true);
    try {
      console.log({
        article,
        type,
        descOrig,
        desc,
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
      });
    } catch (error) {
      setIsClick(false);
      console.log(error);
    }
  };

  const sampe = async () => {
    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbxJnKwA3R0O60NRHSma4CfmOj8R9AS9wPnKmVF_rIMJGlaqyju_AWZ6YgTpwEaoU9wrMg/exec",
        {
          descOrig,
          desc,
          article,
          type,

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
        },
        {
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      );

      if (response) {
      }
    } catch (error) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <SimpleGrid columns={3} columnGap={3} rowGap={6} w="full" h={"full"}>
        <GridItem colSpan={3}>
          <FormControl isRequired>
            <FormLabel>Item Description (Orig)</FormLabel>
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
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
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
                marginTop={4}
                variant="filled"
                placeholder="If other, please specify"
              />
            )}
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
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
                marginTop={4}
                variant="filled"
                placeholder="If other, please specify"
              />
            )}
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Model</FormLabel>
            <Input value={model} onChange={(e) => setModel(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Variety/Color</FormLabel>
            <Input
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Details2</FormLabel>
            <Input
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Other</FormLabel>
            <Input value={other} onChange={(e) => setOther(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Brand</FormLabel>
            <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Manufacturer</FormLabel>
            <Input
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Country of Origin</FormLabel>
            <Input value={origin} onChange={(e) => setOrigin(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Serial Number</FormLabel>
            <Input
              value={serialNum}
              onChange={(e) => setSerialNum(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Warranty</FormLabel>
            <Input
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Acquisition Date</FormLabel>
            <Input
              value={acquisitation}
              onChange={(e) => setAcquisition(e.target.value)}
              type="date"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Supplier</FormLabel>
            <Input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Property Number</FormLabel>
            <Input
              value={propertyNum}
              onChange={(e) => setPropertyNum(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
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
          <FormControl isRequired>
            <FormLabel>Pack Size</FormLabel>
            <Input value={pack} onChange={(e) => setPack(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Loose Count</FormLabel>
            <Input value={loose} onChange={(e) => setLoose(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Physical Count in Piece(s)</FormLabel>
            <Input
              value={physical}
              onChange={(e) => setPhysical(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Unit</FormLabel>
            <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Acquisition Mode</FormLabel>
            <Input
              value={acquisitionMode}
              onChange={(e) => setAcquisitionMode(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Donor</FormLabel>
            <Input value={donor} onChange={(e) => setDonor(e.target.value)} />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Remarks</FormLabel>
            <Input
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Out</FormLabel>
            <Input value={out} onChange={(e) => setOut(e.target.value)} />
          </FormControl>
        </GridItem>
      </SimpleGrid>

      <HStack marginTop={5} justifyContent="flex-end">
        <Button
          color="#fff"
          isLoading={isClick ? true : false}
          colorScheme="teal"
          loadingText="Creating Item"
          onClick={() => sampe()}
        >
          Create Item
        </Button>
      </HStack>
    </>
  );
};

export default Equipment;
