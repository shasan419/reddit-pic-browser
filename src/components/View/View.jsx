import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function View() {
  const location = useLocation();
  const { imageData } = location.state;

  useEffect(() => {
    console.log(imageData);
  });
  return <h1>View</h1>;
}

export default View;
