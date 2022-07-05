import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const ModalContainer = () => {
  return (
    <div className="modal-container">
      <Alert
        w="container.md"
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        borderRadius={4}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Created Item!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Added one (1) item to database
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ModalContainer;
