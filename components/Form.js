import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { calculateSettings, calculateAdjustTubeAndFloat } from '../pages/api/calculateSettings';


const Form = () => {
  
  const saltTankOptions = ["18 x 33", "18 x 35", "12 x 16 x 20", "11 x 11 x 38"];
  
  const waterSystems = [
    { value: "", label: "Choose Your Water System" },
    { value: "Q237", label: "Q237s ( Well and City)" },
    { value: "2030s", label: "2030s (Well and City)"  },
    { value: "2040s OD", label: "*2040s OD* (Well & City)" },
    { value: "2060s", label: "2060s (Best For Iron) (Well)"},
    { value: "2060s OD", label: "2060s OD (Well & City)" },
    { value: "2100s", label: "2100s (Best For Iron)(Well & City)" },
    { value: "2100s OD", label: "2100s OD"},
    { value: "2175s", label: "2175s (Best For Iron)"  },
    { value: "4040s OD", label: "* 4040s OD * (City Only)" },
    { value: "4060s OD", label: "4060s OD AC (City Only)" },
    { value: "4060s OD MAC", label: "4060s OD MAC (Ceramic)(Well)" },
    
  ];
    
  const [waterSystemIndex, setWaterSystemIndex] = useState(0);
  const [saltTank, setSaltTank] = useState("");
  const [gridPlate, setGridPlate] = useState(false);
  const [hardness, setHardness] = useState(0);
  const [iron, setIron] = useState(0); 
  const [manganese, setManganese] = useState(0);
  const [reverseOsmosis, setReverseOsmosis] = useState(false);
  const [compensatedHardness, setCompensatedHardness] = useState(0);
  const [settingRecomendations, setSettingRecomendations] = useState([]);

  const [setting, setSetting] = useState(0);
  
  const [saltSetting, setSaltSetting] = useState(0);
  const [diskNumber, setDiskNumber] = useState(0);
  const [float, setFloat] = useState(0);
  const [adjustTube, setAdjustTube] = useState(0);
  const [calculatedCompensatedHardness, setCalculatedCompensatedHardness] = useState(false);


  const [open, setOpen] = useState(false); 


  const handleSubmitCompensatedHardness = (e) => {
    e.preventDefault();
    console.log(waterSystems[waterSystemIndex].value, saltTank, gridPlate, hardness, iron, manganese, reverseOsmosis, compensatedHardness);
    if (waterSystems[waterSystemIndex].value !== "" && saltTank !== "") {
      const {calculatedHardness, pairs} = calculateSettings(waterSystems[waterSystemIndex].value, saltTank, gridPlate, hardness, iron, manganese, reverseOsmosis);
      console.log(calculatedHardness, pairs);
      setSettingRecomendations(pairs);
      setCompensatedHardness(calculatedHardness);
      setCalculatedCompensatedHardness(true);
      
    } else { 
      alert("Machine Type and Setting are required fields"); 
    }
  };

  useEffect(() => {
    if (calculatedCompensatedHardness) {
      const secondStep = document.getElementById("secondStep");
      secondStep.scrollIntoView({ behavior: 'smooth' });
    }    
  }, [calculatedCompensatedHardness]);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // calculate adjust tube and float cup
    setSaltSetting(settingRecomendations.saltSettings[setting[0]]);
    console.log(setting[2])
    setDiskNumber(setting[2]);
    const {adjustTube, float} = calculateAdjustTubeAndFloat(setting[0], saltTank, waterSystems[waterSystemIndex].value, gridPlate);
    setAdjustTube(adjustTube);
    setFloat(float);
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
        <Label htmlFor="name">Water System</Label>
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
          {saltTankOptions.map((saltTank) => (
            <option key={saltTank} value={saltTank}>
              {saltTank}
            </option>
          ))}
        </SelectBox>
        <Label htmlFor="gridPlate">Do You Have A Grid Plate</Label>
        <YesNoContainer>
          <div>
            <label htmlFor="gridPlateYes">Yes</label>
            <input 
                type="radio" 
                id="gridPlateYes"
                checked={gridPlate} 
                onChange={()=>handleGridPlateClick()}
            />
          </div>
          <div>
              <label htmlFor="gridPlateNo">No</label>
              <input 
                  type="radio" 
                  id="gridPlateNo"
                  checked={!gridPlate} 
                  onChange={()=>handleGridPlateClick()}
              />
          </div>          
        </YesNoContainer>
        <Label htmlFor="hardness">
          Hardness (gpg):
          <NumberInput 
            type="number" 
            min="0" 
            max="150" 
            step="1" 
            value={hardness} 
            onChange={(e) => setHardness(e.target.value)}
          />
        
        </Label>
        <RangeInput id="hardness" onChange={(e) => setHardness(e.target.value)} min="0" max="150" type="range" value={hardness}></RangeInput>
        <Label htmlFor="iron">
          Iron (ppm):
          <NumberInput 
            type="number" 
            min="0" 
            max="20" 
            step="0.1" 
            value={iron} 
            onChange={(e) => setIron(parseFloat(e.target.value))}
          />  
        </Label>
        <RangeInput 
          id="iron" 
          onChange={(e) => setIron(e.target.value / 10)} 
          min="0" 
          max="200" 
          step="1"
          type="range" 
          value={iron * 10}
        />
        <Label htmlFor="manganese">
          Manganese (ppm): 
          <NumberInput 
            type="number" 
            min="0" 
            max="20" 
            step="0.1" 
            value={manganese} 
            onChange={(e) => setManganese(parseFloat(e.target.value))}
          />
        </Label>
        
        <RangeInput 
          id="manganese" 
          onChange={(e) => setManganese(e.target.value / 10)} 
          min="0" 
          max="200" 
          step="1"
          type="range" 
          value={manganese * 10}
        />
        <Label htmlFor="reverse-osmosis">Is There A Reverse Osmosis System</Label>
        <YesNoContainer>
          <div>
            <label htmlFor="reverse-osmosis-yes">Yes</label>
            <input 
                type="radio" 
                id="reverse-osmosis-yes"
                checked={reverseOsmosis} 
                onChange={()=>handleReverseOsmosisClick()}
            />
          </div>
          <div>
              <label htmlFor="reverse-osmosis-no">No</label>
              <input 
                  type="radio" 
                  id="reverse-osmosis-no"
                  checked={!reverseOsmosis} 
                  onChange={()=>handleReverseOsmosisClick()}
              />
          </div>          
        </YesNoContainer>
        {/* <Label htmlFor="compensated-hardness">Compensated Hardness: {compensatedHardness}</Label>
        <RangeInput id="compensated-hardness" onChange={(e) => setCompensatedHardness(e.target.value)} min="0" max="100" type="range" value={compensatedHardness}></RangeInput> */}
        <FormSubmitButton>Calculate Compensated Hardness</FormSubmitButton>
      </FormContainer>

      {calculatedCompensatedHardness && (
        <FormContainer id="secondStep" onSubmit={handleFinalSubmit}>
          <Label htmlFor="compensated-hardness">Compensated Hardness: {compensatedHardness}</Label>
          <Label htmlFor="setting-recs">Setting Recommendations</Label>
          <SelectBox id="settings-recs" onChange={(e) => setSetting(e.target.value)}>
            <option value="">Select a Setting Combination</option>
            {settingRecomendations.pairs.map((settingRec, index) => (
              <option key={index} value={settingRec}>
                Salt Setting: {settingRecomendations.saltSettings[settingRec[0]]} - Disk #{settingRec[1]} - Recommended Hardness: {settingRec[2]} gpg
              </option>
            ))}
            
          </SelectBox>          
          
          <FormSubmitButton>Get All Settings</FormSubmitButton> 
        </FormContainer>
      )}
      
      {open && (
        <Overlay>
          <Modal>
            <p>Salt Setting: {saltSetting}</p>
            <p>Disk #{diskNumber}</p>
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

const NumberInput = styled.input`
  width: 50px;
  margin-left: 10px;
  border: 0;
  outline: none;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
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

const YesNoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  margin: 20px;
`;


const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
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
