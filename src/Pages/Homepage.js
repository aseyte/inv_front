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
} from "@chakra-ui/react";
import In from "../Components/In";
import Out from "../Components/Out";
import Return from "../Components/Return";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [alerts, setAlerts] = useState(false);

  const navigate = useNavigate("");

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
          onClick={() => navigate("/bin-card")}
          className="bin-card"
        >
          Bin Card
        </div>

        <div
          onClick={() => navigate("/inventory")}
          className="inventory"
        >
          Inventory
        </div>
      </div>
    </>
  );
};

export default Homepage;
