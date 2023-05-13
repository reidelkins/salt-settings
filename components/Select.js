// components/SelectSlider.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

export const Select= ({
  options,  
  selectLabel,
  handleSelectChange,
  selectValue,
}) => {

  const makeSelectChange = (event) => {
    handleSelectChange(event.target.value);
  };

  return (
    <SelectContainer>
      <SelectLabel>{selectLabel}</SelectLabel>
      <SelectInput
        id="select"
        value={selectValue}
        onChange={makeSelectChange}
      >
        {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </SelectInput>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const SelectInput = styled.select`
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px 15px;
  background-color: #fff;
  outline: none;  
`;

const SelectOption = styled.option`
  padding: 10px 15px;
  color: #ccc;
  cursor: pointer;
  
  &:hover {
    color: #fff;
    background-color: #ccc;
  }
`;
