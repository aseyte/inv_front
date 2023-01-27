import React, { useEffect, useState, useMemo } from "react";
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
  Box,
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { HiSearch } from "react-icons/hi";
import { useClickOutside } from "../Components/useClickOutside";
import InItemModal from "./InItemModal";
import api from "../API/Api";
import SearchSel from "./searchableSelect/searchSel";
import CustomTable from "./CustomTable";

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
  const [itemDesc, setItemDesc] = useState("");

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
  const [term, setTerm] = useState(null);

  const [brand, setBrand] = useState(""); //Value in Select input
  const [brandData, setBrandData] = useState(""); //all the fetched data from db
  const [isSelectBrand, setSelectBrand] = useState(); //Selected state
  const [selectedIndex, setSelectedIndex] = useState(0); //index for arrow down

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
    console.log(isSelectBrand);
  }, [quantity, pack, loose, isSelectBrand]);

  const [tableData, setTableData] = useState([]);

  const fetchTableData = async (value) => {
    const result = await api.get(`/api/itemtable`, {
      params: {
        q: value ? value : "",
      },
    });
    setTableData(result.data);
  };

  const [searchTerm, setSearchterm] = useState([]);
  useEffect(() => {
    fetchTableData();
  }, [searchTerm]);
  const fetchitem = async (value) => {
    const result = await api.get(`/api/item`, {
      params: {
        q: value,
      },
    });
    setSearchterm(result.data);
  };

  const fetchbrand = async (value) => {
    const result = await api.get(`/api/brand`, {
      params: {
        q: value,
      },
    });
    setBrandData(result.data);
  };

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

  const domNod = useClickOutside(() => {
    setDropdown(false);
  });

  const [typeData, setTypeData] = useState();
  const [typeSelect, setTypeSelect] = useState();
  const [typeValue, setTypeValue] = useState();
  const fetchtypes = async (value) => {
    const result = await api.get(`/api/type`, {
      params: {
        q: value,
      },
    });
    setTypeData(result.data);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Item desc",
        accessor: "item_name",
      },
      {
        Header: "Brand",
        accessor: "brand_name",
      },
      {
        Header: "manufacturer",
        accessor: "manu_name",
      },
      {
        Header: "Type",
        accessor: "type_name",
      },
      {
        Header: "Article",
        accessor: "article_name",
      },
      {
        Header: "Remarks",
        accessor: "remarks",
      },
    ],
    []
  );

  return (
    <>
      <div className="table-container">
        <CustomTable title={"ITEMS"} columns={columns} data={tableData}>
          <SimpleGrid
            columns={6}
            columnGap={3}
            rowGap={6}
            w="full"
            h={"full"}
            p={6}
            flexDirection="column"
          >
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Item Description:{itemDesc && itemDesc}</FormLabel>
                <div
                  ref={domNod}
                  onClick={() => {
                    setDropdown(!dropdown);
                    fetchitem();
                  }}
                  className="custom-select"
                >
                  <p>{itemDesc === "" ? "- Select Item -" : itemDesc}</p>
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
                              fetchitem(e.target.value);
                            }}
                            fontSize="14px"
                            placeholder="Search"
                          />
                        </InputGroup>
                      </div>

                      {searchTerm?.map((item, index) => {
                        return (
                          <>
                            <p
                              onClick={() => {
                                setDesc(item.item_name);
                                setDropdown(false);
                                setItemDesc(item.item_name);
                                fetchTableData(item.item_name);
                              }}
                              key={index}
                            >
                              {item.item_name}
                            </p>
                          </>
                        );
                      })}
                    </div>
                  )}
                </div>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <SearchSel
                name={"Article"} // form label
                data={typeData} // data fetched from db
                propertyName={"type_name"} //property name to display to the select
                fetchdat={fetchtypes} //async function for fetch the data
                setSelect={setTypeSelect} //Select
                isSelect={typeSelect} //is Selected
                setValue={setTypeValue} //set value for viewing in select input
                valueD={typeValue} //value
              />
            </GridItem>
            <>
              {/* <GridItem colSpan={4}>
            <FormControl isRequired>
              <SearchSel
                name={"name select"} // form label
                data={typeData} // data fetched from db
                propertyName={"type_name"} //property name to display to the select
                fetchdat={fetchtypes} //async function for fetch the data
                setSelect={setTypeSelect} //Select
                isSelect={typeSelect} //is Selected
                setValue={setTypeValue} //set value for viewing in select input
                valueD={typeValue} //value
              />
              <FormLabel>Item Description:{desc && desc}</FormLabel>
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
                            fetchitem(e.target.value);
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

                    {searchTerm?.map((item, index) => {
                      return (
                        <>
                          <p
                            // className={desc === item.desc ? "active" : ""}
                            // onClick={() => {
                            //   // setDesc(item.desc);
                            //   setDropdown(false);
                            // }}
                            onClick={() => {
                              setDesc(item.Pk_itemId);
                              setDropdown(false);
                            }}
                            key={index}
                          >
                            {item.item_name}
                          </p>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Input
                onClick={() => setbrandRecommendDiv(!brandRecommendDiv)}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  fetchbrand(e.target.value);
                  setSelectBrand(null);
                }}
              />
              {
                //if input tempsearchSTATE here has a brand and !isSELECTEDbrandID it will display the drop down
                brandRecommendDiv && brandData && !isSelectBrand && (
                  <div
                    ref={brandRD}
                    className="select-dropdown"
                    style={{ top: "75px" }}
                  >
                    {brandData.map((e, index) => {
                      return (
                        <p
                          onMouseEnter={() => {
                            setBrand(e.brand_name);
                          }}
                          onClick={() => {
                            setSelectBrand(e);
                            setBrand(e.brand_name);
                          }}
                          key={index}
                          style={{
                            backgroundColor:
                              index === selectedIndex && `rgb(238, 240, 241)`,
                          }}
                        >
                          {e.brand_name}
                        </p>
                      );
                    })}
                  </div>
                )
                //if user click on brand it will close the dropdown and SETisSELECTEDbrandID
                //
              }
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
          </GridItem> */}
            </>
          </SimpleGrid>
        </CustomTable>
        {/* <HStack marginTop={5} justifyContent="flex-end">
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
        </HStack> */}
      </div>
    </>
  );
};

export default In;
