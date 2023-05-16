import React, { useState } from "react";
import styled from "styled-components";
import { calculateSettings } from '../pages/api/calculateSettings';


const Form = () => {
  // an array of numbers from 0.5 to 20.5 in increments of 0.5
  const hardnessOptions = Array.from(Array(41).keys()).map((num) => {
    return { value: num / 2, label: num / 2 };
  });

  const diskOptions = [
    { value: "732", label: "732" },
    { value: "366", label: "366" },
    { value: "244", label: "244" },
    { value: "183", label: "183" },
    { value: "146", label: "146" },
    { value: "122", label: "122" },
    { value: "105", label: "105" },
    { value: "92", label: "92" },
  ];
  
  const waterSystems = [
    { value: "", label: "Choose Your Water System", saltTankOptions: [] },
    { value: "Q237", label: "Q237s ( Well and City)", saltTankOptions: ["18 x 33", "18 x 35", "12 x 16 x 20", "11 x 11 x 38"], diskOptions: diskOptions, saltSettingOptions: [1.0, 1.25] },
    { value: "2030s", label: "2030s (Well and City)", saltTankOptions: [1, 2, 3, 4, 5, 6] },
    { value: "2040s OD", label: "*2040s OD* (Well & City)", saltTankOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { value: "2060s", label: "2060s (Best For Iron) (Well)", saltTankOptions: hardnessOptions },
    { value: "2060s OD", label: "2060s OD (Well & City)", saltTankOptions: hardnessOptions },
    { value: "2100s", label: "2100s (Best For Iron)(Well & City)", saltTankOptions: hardnessOptions },
    { value: "2100s OD", label: "2100s OD", saltTankOptions: hardnessOptions },
    { value: "2175s", label: "2175s (Best For Iron)", saltTankOptions: hardnessOptions },
    { value: "4040s OD", label: "* 4040s OD * (City Only)", saltTankOptions: hardnessOptions },
    { value: "4060s OD", label: "4060s OD AC (City Only)", saltTankOptions: hardnessOptions },
    { value: "4060s OD MAC", label: "4060s OD MAC (Ceramic)(Well)", saltTankOptions: hardnessOptions },
    
  ];

  
    
  const [waterSystemIndex, setWaterSystemIndex] = useState(0);
  const [saltTank, setSaltTank] = useState("");
  const [gridPlate, setGridPlate] = useState(false);
  const [hardness, setHardness] = useState(0);
  const [iron, setIron] = useState(0);
  const [manganese, setManganese] = useState(0);
  const [reverseOsmosis, setReverseOsmosis] = useState(false);
  const [compensatedHardness, setCompensatedHardness] = useState(0);
  const [diskOption, setDiskOption] = useState(0);
  const [saltSetting, setSaltSetting] = useState(0);
  const [float, setFloat] = useState(0);
  const [adjustTube, setAdjustTube] = useState(0);
  const [calculatedCompensatedHardness, setCalculatedCompensatedHardness] = useState(false);


  const [saltAmount, setSaltAmount] = useState(0);
  const [open, setOpen] = useState(false);


  const handleSubmitCompensatedHardness = (e) => {
    e.preventDefault();
    console.log(waterSystems[waterSystemIndex].value, saltTank, gridPlate, hardness, iron, manganese, reverseOsmosis, compensatedHardness);
    if (waterSystems[waterSystemIndex].value !== "" && saltTank !== "") {
      setSaltAmount(calculateSettings());
      setCalculatedCompensatedHardness(true);
      // setOpen(true);
    } else {
      alert("Machine Type and Setting are required fields");
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // calculate adjust tube and float cup
    setAdjustTube(1.5);
    setFloat("7 1/2");
    setOpen(true);
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
      <FormContainer onSubmit={handleSubmitCompensatedHardness}> 
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
        <Label htmlFor="salt-tank">Salt Tank</Label>
        <SelectBox id="salt-tank" onChange={(e) => setSaltTank(e.target.value)}>
          <option value="">Select your Salt Tank</option>
          {waterSystems[waterSystemIndex].saltTankOptions.map((saltTank) => (
            <option key={saltTank} value={saltTank}>
              {saltTank}
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
        {/* <Label htmlFor="compensated-hardness">Compensated Hardness: {compensatedHardness}</Label>
        <RangeInput id="compensated-hardness" onChange={(e) => setCompensatedHardness(e.target.value)} min="0" max="100" type="range" value={compensatedHardness}></RangeInput> */}
        <FormSubmitButton>Calculate Compensated Hardness</FormSubmitButton>
      </FormContainer>
      {calculatedCompensatedHardness && (
        <FormContainer onSubmit={handleFinalSubmit}> 
          <Label htmlFor="disk-options">Disk Options</Label>
          <SelectBox id="disk-options" onChange={(e) => setDiskOption(e.target.value)}>
            <option value="">Choose Your Disk Option</option>
            {waterSystems[waterSystemIndex].diskOptions.map((diskOption) => (
              <option key={diskOption.value} value={diskOption.value}> 
                {diskOption.label}
              </option>
            ))}
          </SelectBox>
          <Label htmlFor="salt-setting">Salt Setting</Label>
          <SelectBox id="salt-setting" onChange={(e) => setSaltSetting(e.target.value)}>
            <option value="">Choose Your Salt Setting</option>
            {waterSystems[waterSystemIndex].saltSettingOptions.map((saltSetting) => (
              <option key={saltSetting} value={saltSetting}> 
                {saltSetting}
              </option>
            ))}
          </SelectBox>
          
          <FormSubmitButton>Calculate Compensated Hardness</FormSubmitButton> 
        </FormContainer>
      )}
      
      {open && (
        <Overlay>
          <Modal>
            <p>Float Height: {float}</p>
            <p>Adjust Tube Height: {adjustTube}</p>
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
