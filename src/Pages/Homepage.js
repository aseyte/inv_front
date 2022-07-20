import React, { useState } from "react";
import CreateItem from "../Components/CreateItem";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Container,
  Text,
  useToast,
} from "@chakra-ui/react";
import In from "../Components/In";
import Out from "../Components/Out";
import Return from "../Components/Return";

const Homepage = () => {
  const [alerts, setAlerts] = useState(false);

  return (
    <>
      <div className="container">
        <Container
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
          bg="#fff"
          padding={5}
          borderRadius={8}
          maxW="container.lg"
          w="full"
          h="full"
          overflowY={"scroll"}
        >
          <Tabs isFitted variant="enclosed-colored">
            <TabList mb="1em">
              <Tab borderRadius={5} _hover={{ background: "#e6eaec" }}>
                <Text fontSize="xl">IN</Text>
              </Tab>
              <Tab borderRadius={5} _hover={{ background: "#e6eaec" }}>
                <Text fontSize="xl">OUT</Text>
              </Tab>
              <Tab borderRadius={5} _hover={{ background: "#e6eaec" }}>
                <Text fontSize="xl">RETURN</Text>
              </Tab>
              <Tab borderRadius={5} _hover={{ background: "#e6eaec" }}>
                <Text fontSize="xl">CREATE ITEM</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <In />
              </TabPanel>
              <TabPanel>
                <Out />
              </TabPanel>
              <TabPanel>
                <Return />
              </TabPanel>
              <TabPanel>
                <CreateItem />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>

        <div
          onClick={() =>
            window.open(
              "https://docs.google.com/spreadsheets/d/1wIKV8SyYJJfzyS7INWyOPtzM7BFYe0vbk0kHp5Sd-CQ/edit#gid=162947881",
              "target: _blank"
            )
          }
          className="spreadsheet"
        >
          Spread Sheet
        </div>
      </div>
    </>
  );
};

export default Homepage;
