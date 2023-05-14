import React, { useState } from "react";
import styled from "styled-components";

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, age, gender, height);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor="name">Machine Type</Label>
      <SelectBox id="name" onChange={(e) => setName(e.target.value)}>
        <option value="">Choose Your Water System</option>
        <option value="John Doe">John Doe</option>
        <option value="Jane Doe">Jane Doe</option>
      </SelectBox>
      
      <Label htmlFor="gender">Setting</Label>
      <SelectBox id="gender" onChange={(e) => setGender(e.target.value)}>
        <option value="">Select your setting</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </SelectBox>
      <Label htmlFor="age">Age: {age}</Label>
      <RangeInput id="age" onChange={(e) => setAge(e.target.value)} min="0" max="100" type="range"></RangeInput>
      <Label htmlFor="height">Height: {height}</Label>
      <RangeInput id="height" onChange={(e) => setHeight(e.target.value)} min="0" max="200" type="range"></RangeInput>
      <FormSubmitButton>Submit</FormSubmitButton>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 10% auto;
`;

const SelectBox = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 15px;
  outline: none;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 15px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  &::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
`;


const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const FormSubmitButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #00cb79;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  margin-top: 20px;
`;

export default Form;
