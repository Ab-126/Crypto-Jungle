import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span onClick={onClick} className="selectButton" style={{
      border: "1px solid #347C2C",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: 'Montserrat Alternates',
      cursor: 'pointer',
      backgroundColor: selected ? '#347C2C' : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      width: "22%",
      margin: 5
    }}>
      {children}
    </span>
  );
};

export default SelectButton;
