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
import { useClickOutside } from "../useClickOutside";

const SearchSel = ({
  name,
  data,
  isSelect,
  fetchdat,
  setValue,
  valueD,
  setSelect,
  propertyName,
}) => {
  //     {
  //   isdrop,
  //   datSetter,
  //   datGetter,
  //   valSetter,
  //   valGetter,
  //   setlectedSetter,
  //   selectedGetter,
  //   isVisible,
  //   setVisible,
  // }
  // const ref = useClickOutside(() => {
  //   setVisible(false);
  // });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleKeyDown = (ev, opt) => {
    if (ev.key === "ArrowDown") {
      setSelectedIndex((selectedIndex + 1) % data.length);
      //   setBrand(brandData[selectedIndex].brand_name);
    } else if (ev.key === "ArrowUp") {
      setSelectedIndex((selectedIndex - 1 + data.length) % data.length);
      //   setBrand(brandData[selectedIndex].brand_name);
    } else if (ev.key === "Enter") {
      setValue(data[selectedIndex][propertyName]);
      setSelect(data[selectedIndex]);
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel>{name}</FormLabel>
        <Input
          autoComplete={"off"}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          value={valueD}
          onChange={(e) => {
            setValue(e.target.value);
            setSelect(null);
            fetchdat(e.target.value);
          }}
        />
        {
          //   if input tempsearchSTATE here has a brand and !isSELECTEDbrandID it will display the drop down
          data && !isSelect && (
            <div
              /*ref={ref}*/
              className="select-dropdown"
              style={{ top: "75px" }}
            >
              {data.map((e, index) => {
                return (
                  <p
                    onMouseEnter={() => {
                      //   setValue(e);
                    }}
                    onClick={() => {
                      setSelect(e);
                      setValue(e[propertyName]);
                    }}
                    key={index}
                    style={{
                      backgroundColor:
                        index === selectedIndex && `rgb(238, 240, 241)`,
                    }}
                  >
                    {e[propertyName]}
                  </p>
                );
              })}
            </div>
          )
          //   if user click on brand it will close the dropdown and SETisSELECTEDbrandID
        }
      </FormControl>
    </>
  );
};

export default SearchSel;
