import React, { useState } from "react";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "./useClickOutside";

const DeleteModal = ({ id, setDeleteModal, toast }) => {
  const [isClick, setIsClick] = useState(false);
  const { setAppState } = useAuth();
  const handleDelete = async () => {
    setIsClick(true);
    try {
      const response = await api.delete(`/api/auth/user-delete/${id}`);
      if (response.data.ok) {
        toast({
          title: "Deleted User",
          description: "Successfully deleted one (1) pending user.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setAppState("Deleted user");
        setTimeout(() => setAppState(""), 500);
        setIsClick(false);
        setDeleteModal(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsClick(false);
    }
  };

  const domNod = useClickOutside(() => {
    setDeleteModal(false);
  });
  return (
    <div className="modal-container">
      <div ref={domNod} className="modal">
        <h1>Delete Pending User</h1>
        <p>
          You are about to delete this user permanently. Once deleted you will
          no longer be able to retrieve this record.
        </p>
        <div className="modal-btns">
          <button onClick={() => setDeleteModal(false)} className="gray">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={isClick ? "red-disable" : "red"}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
