// components/SelectSlider.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

export const Slider = ({
  min,
  max,
  sliderLabel,
  handleSliderChange,
  sliderValue
}) => {
  

  const makeSliderChange = (event) => {
    handleSliderChange(parseInt(event.target.value));
  };

  return (
    <div className="slider">      
      <div className="slider-container">
        <label htmlFor="slider" className="slider-label">
          {sliderLabel}
        </label>
        <input
          type="range"
          id="slider"
          min={min}
          max={max}
          value={sliderValue}
          onChange={makeSliderChange}
          className="slider"
        />
        <span className="slider-value">{sliderValue}</span>
      </div>
    </div>
  );
};
