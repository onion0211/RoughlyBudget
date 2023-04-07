import { useState } from "react";
import { TextInput } from "react-native";

const CustomInput = () => {
  const [budget, setBudget] = useState({});
  const handleChange = () => {
    setBudget();
  };
  return (
    <TextInput
    // style={}
    />
  );
};
