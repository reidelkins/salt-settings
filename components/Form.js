import React, { useState } from "react";
import styled from "styled-components";
import { calculateSettings } from '../pages/api/calculateSettings';


const Form = () => {
  // an array of numbers from 0.5 to 20.5 in increments of 0.5
  const hardnessOptions = Array.from(Array(41).keys()).map((num) => {
    return { value: num / 2, label: num / 2 };
  });
  const waterSystems = [
    { value: "", label: "Choose Your Water System", settingOptions: [] },
    { value: "Silver", label: "Silver", settingOptions: [1, 2, 3, 4, 5, 6] },
    { value: "Silver HE", label: "Silver HE", settingOptions: [1, 2, 3, 4, 5, 6] },
    { value: "Platinum", label: "Platinum", settingOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { value: "Q850-OD", label: "Q850-OD", settingOptions: hardnessOptions },
    { value: "S650-OD", label: "S650-OD", settingOptions: hardnessOptions },
    { value: "S150", label: "S150", settingOptions: hardnessOptions },
    { value: "S250", label: "S250", settingOptions: hardnessOptions },
    { value: "S250-OD", label: "S250-OD", settingOptions: hardnessOptions },
    { value: "S350", label: "S350", settingOptions: hardnessOptions },
    { value: "S550", label: "S550", settingOptions: hardnessOptions }, 
  ];

  const [waterSystemIndex, setWaterSystemIndex] = useState(0);
  const [setting, setSetting] = useState("");
  const [gridPlate, setGridPlate] = useState(false);
  const [hardness, setHardness] = useState(0);
  const [iron, setIron] = useState(0);
  const [manganese, setManganese] = useState(0);
  const [reverseOsmosis, setReverseOsmosis] = useState(false);
  const [compensatedHardness, setCompensatedHardness] = useState(0);


  const [saltAmount, setSaltAmount] = useState(0);
  const [open, setOpen] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(waterSystems[waterSystemIndex].value, setting, gridPlate, hardness, iron, manganese, reverseOsmosis, compensatedHardness);
    if (waterSystems[waterSystemIndex].value !== "" && setting !== "") {
      setOpen(true);
      setSaltAmount(calculateSettings());
    } else {
      alert("Machine Type and Setting are required fields");
    }
  };

  const handleGridPlateClick = () => {
    setGridPlate(!gridPlate);
  };

  const handleReverseOsmosisClick = () => {
    setReverseOsmosis(!reverseOsmosis);
  };


  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <FormContainer onSubmit={handleSubmit}> 
        <Label htmlFor="name">Machine Type</Label>
        <SelectBox
          id="water-system"
          onChange={(e) => {
            const selectedWaterSystemIndex = waterSystems.findIndex(
              (system) => system.value === e.target.value
            );
            setWaterSystemIndex(
              selectedWaterSystemIndex !== -1 ? selectedWaterSystemIndex : 0
            );
          }}
        >
          {waterSystems.map((waterSystem) => (
            <option key={waterSystem.value} value={waterSystem.value}>
              {waterSystem.label}
            </option>
          ))}
        </SelectBox>
        <Label htmlFor="setting">Setting</Label>
        <SelectBox id="setting" onChange={(e) => setSetting(e.target.value)}>
          <option value="">Select your setting</option>
          {waterSystems[waterSystemIndex].settingOptions.map((setting) => (
            <option key={setting} value={setting}>
              {setting}
            </option>
          ))}
        </SelectBox>
        <Label htmlFor="gridPlate">Grid Plate</Label>
        <input type="checkbox" value={gridPlate} onClick={()=>handleGridPlateClick()}/>
        {/* <CheckboxContainer>
          <HiddenCheckbox id="gridPlate" type="checkbox" checked={gridPlate} />
          <StyledCheckbox checked={gridPlate}/>
        </CheckboxContainer> */}
        <Label htmlFor="hardness">Hardness: {hardness}</Label>
        <RangeInput id="hardness" onChange={(e) => setHardness(e.target.value)} min="0" max="100" type="range" value={hardness}></RangeInput>
        <Label htmlFor="iron">Iron: {iron}</Label>
        <RangeInput id="iron" onChange={(e) => setIron(e.target.value)} min="0" max="200" type="range" value={iron}></RangeInput>
        <Label htmlFor="manganese">Manganese: {manganese}</Label>
        <RangeInput id="manganese" onChange={(e) => setManganese(e.target.value)} min="0" max="200" type="range" value={manganese}></RangeInput>
        <Label htmlFor="reverse-osmosis">Reverse Osmosis</Label>
        <input type="checkbox" value={reverseOsmosis} onClick={()=>handleReverseOsmosisClick()}/>
        <Label htmlFor="compensated-hardness">Compensated Hardness: {compensatedHardness}</Label>
        <RangeInput id="compensated-hardness" onChange={(e) => setCompensatedHardness(e.target.value)} min="0" max="100" type="range" value={compensatedHardness}></RangeInput>
        <FormSubmitButton>Get Salt Settings</FormSubmitButton>
      </FormContainer> 
      {open && (
        <Overlay>
          <Modal>
            <p>Salt Amount: {saltAmount}</p>
            <FormSubmitButton onClick={handleClose}>Close</FormSubmitButton>
          </Modal>
        </Overlay>
      )}
    </>
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

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding:0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? "#00cb79" : "#fff")};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #00cb79;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // make sure this is higher than the rest of your elements
`;

// This is the modal itself
const Modal = styled.div`
  width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;


export default Form;
