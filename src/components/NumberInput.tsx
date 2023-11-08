import React from "react";
import "./NumberInput.scss";

interface NumberInputProps {
  value?: number;
  onValueChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onValueChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 0) {
      onValueChange(Number(e.target.value));
    }
  };

  return (
    <div className="input-with-buttons">
      <input
        className="input"
        type="number"
        min="1"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumberInput;
