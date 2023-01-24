import { useEffect, useRef } from "react";

export const useClickOutside = (handler) => {
  let domNode = useRef();

  let maybeHandler = (event) => {
    if (domNode.current && !domNode.current.contains(event.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });
  return domNode;
};

// const handleClickOutside = (event) => {
//   if (ref.current && !ref.current.contains(event.target)) {
//     toggleVisibility();
//   }
// };
