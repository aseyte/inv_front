import React, { useState } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import Equipment from "../Components/Items/Equipment";
import Janitorial from "../Components/Items/Janitorial";
import Medical from "../Components/Items/Medical";
import Office from "../Components/Items/Office";
const CreateItem = () => {
  const [selected, setSelected] = useState("");
  return (
    <>
      <FormControl my={6} isRequired width="70%" px={6}>
        <FormLabel htmlFor="items">Item Category </FormLabel>
        <Select
          cursor="pointer"
          onChange={(e) => setSelected(e.target.value)}
          id="items"
          placeholder="- Select Item -"
        >
          <option value="equipment">Equipment</option>
          <option value="janitorial">Janitorial Supplies</option>
          <option value="office">Office Supplies</option>
          <option value="medical">Medical/Dental Supplies</option>
        </Select>
      </FormControl>
      {selected === "equipment" && <Equipment />}
      {selected === "janitorial" && <Janitorial />}
      {selected === "medical" && <Medical />}
      {selected === "office" && <Office />}
    </>
  );
};

export default CreateItem;
