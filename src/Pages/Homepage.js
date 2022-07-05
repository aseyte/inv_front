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
import ModalContainer from "../Components/ModalContainer";

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
              <Tab>
                <Text fontSize="xl">In</Text>
              </Tab>
              <Tab>
                <Text fontSize="xl">Out</Text>
              </Tab>
              <Tab>
                <Text fontSize="xl">Create Item</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>In</p>
              </TabPanel>
              <TabPanel>
                <p>Out</p>
              </TabPanel>
              <TabPanel>
                <CreateItem />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </div>
    </>
  );
};

export default Homepage;
