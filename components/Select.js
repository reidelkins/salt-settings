// components/SelectSlider.tsx
import React, { useState } from 'react';
import '../styles/SelectSlider.module.css';


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
    <div className="select">
      <div className="select-container">
        <label htmlFor="select" className="select-label">
          {selectLabel}
        </label>
        <select
          id="select"
          value={selectValue}
          onChange={makeSelectChange}
          className="select"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>      
    </div>
  );
};
